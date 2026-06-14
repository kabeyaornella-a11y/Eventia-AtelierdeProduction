// Middleware global (functionMiddleware dans src/start.ts) :
// côté client, attache le jeton de session Supabase en header Authorization
// sur chaque appel de server function. Côté serveur, requireSupabaseAuth le vérifie.
import { createMiddleware } from "@tanstack/react-start";

export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let headers: HeadersInit = {};
    try {
      const { supabase } = await import("./client");
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) headers = { Authorization: `Bearer ${token}` };
    } catch {
      // pas de session disponible : la server function décidera si l'auth est requise
    }
    return next({ headers });
  },
);
