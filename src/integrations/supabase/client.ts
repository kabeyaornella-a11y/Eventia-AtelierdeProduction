// Client Supabase navigateur (clé publique uniquement).
// Variables d'environnement publiques : .env → VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

// Important : ce module est importé par AuthProvider dans __root.tsx, donc évalué
// pour CHAQUE page (y compris en SSR). Si les variables d'env ne sont pas définies
// au moment du build (oubli côté Netlify), `createClient(undefined, undefined)`
// lève immédiatement une exception et fait planter le rendu de TOUT le site.
// On retombe donc sur des valeurs placeholder : le site continue de s'afficher,
// seules les fonctionnalités liées à Supabase (connexion, espace client, admin…)
// resteront indisponibles tant que les vraies variables ne sont pas configurées.
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY manquantes — " +
      "le client Supabase utilise des valeurs placeholder. " +
      "Configurez ces variables dans Netlify puis redéployez (cache vidé)."
  );
}

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_PUBLISHABLE_KEY || "placeholder-key",
  {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
