// Client Supabase navigateur (clé publique uniquement).
// Variables d'environnement publiques : .env → VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
import { createClient } from "@supabase/supabase-js";

// Clé anon publique (safe à exposer côté client — c'est sa fonction)
// Utilisée en fallback si la variable d'env est absente ou dans un format non-JWT
const _ANON_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cWJpaG90cmNmYmtueWR4cG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NTM2OTQsImV4cCI6MjA5NjUyOTY5NH0.9wE0rQNPGbzuK56dTtAqspvty-vL7puzzJJvXHv0VRA";

const _PROJECT_URL = "https://nxqbihotrcfbknydxpny.supabase.co";

const SUPABASE_URL = (
  (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "") ??
  _PROJECT_URL
);

const _rawKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY
) as string | undefined;

// N'utilise la variable d'env que si c'est un JWT valide (commence par "eyJ")
const SUPABASE_PUBLISHABLE_KEY: string =
  _rawKey?.startsWith("eyJ") ? _rawKey : _ANON_JWT;

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

// La fonction Netlify tourne sur Node.js 20, qui n'expose pas `WebSocket` en
// global (ajouté nativement seulement à partir de Node 22). Le constructeur de
// SupabaseClient instancie systématiquement un RealtimeClient et lève une
// exception synchrone si aucun WebSocket n'est disponible — ce qui fait planter
// TOUT rendu SSR ("This page didn't load" sur toutes les pages).
// `import.meta.env.SSR` est une constante connue au build : Vite élimine cette
// branche (et donc l'import de "ws") du bundle navigateur, où WebSocket existe
// nativement.
const realtimeOptions = import.meta.env.SSR
  ? { transport: (await import("ws")).default as unknown as typeof WebSocket }
  : undefined;

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_PUBLISHABLE_KEY || "placeholder-key",
  {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: realtimeOptions,
  }
);
