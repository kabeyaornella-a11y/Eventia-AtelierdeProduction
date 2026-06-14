// Client Supabase ADMIN — serveur uniquement (.server.ts : jamais bundlé côté client).
// Utilise la clé service role : contourne la RLS, à n'employer que dans les server functions.
// Lecture des env au premier accès (compatible Workers où env se lie au moment de la requête).
import process from "node:process";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import WS from "ws";

let _admin: SupabaseClient | null = null;

function getAdmin(): SupabaseClient {
  if (_admin) return _admin;
  const url = process.env.SUPABASE_URL ?? (import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin non configuré : définissez SUPABASE_URL (ou VITE_SUPABASE_URL) et SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  _admin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Node.js 20 (runtime des fonctions Netlify) n'a pas de WebSocket natif :
    // sans ce transport, le constructeur SupabaseClient lève immédiatement.
    realtime: { transport: WS as unknown as typeof WebSocket },
  });
  return _admin;
}

/** Proxy lazy : `supabaseAdmin.from(...)` crée le client au premier appel. */
export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getAdmin(), prop, receiver);
  },
});
