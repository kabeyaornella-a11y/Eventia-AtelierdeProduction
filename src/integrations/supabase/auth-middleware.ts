// Middleware serveur : exige une session Supabase valide.
// Fournit aux handlers : context.supabase (client lié au jeton utilisateur, RLS active)
// et context.userId. Utilisé par les server functions protégées (admin, espace client…).
import process from "node:process";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader, setResponseStatus } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import WS from "ws";

function getPublicConfig() {
  const url = process.env.SUPABASE_URL ?? (import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const anonKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);
  if (!url || !anonKey) {
    throw new Error(
      "Supabase non configuré : définissez VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }
  return { url, anonKey };
}

export const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const authHeader = getRequestHeader("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      setResponseStatus(401);
      throw new Error("Unauthorized: missing Supabase session");
    }

    const { url, anonKey } = getPublicConfig();
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
      // Node.js 20 (runtime des fonctions Netlify) n'a pas de WebSocket natif :
      // sans ce transport, le constructeur SupabaseClient lève immédiatement.
      realtime: { transport: WS as unknown as typeof WebSocket },
    });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      setResponseStatus(401);
      throw new Error("Unauthorized: invalid Supabase session");
    }

    return next({
      context: {
        supabase,
        userId: data.user.id,
        userEmail: data.user.email ?? null,
      },
    });
  },
);
