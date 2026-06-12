// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // En dehors du bac à sable Lovable, le plugin Nitro n'est pas activé par défaut
  // (voir @lovable.dev/vite-tanstack-config). On l'active explicitement avec le
  // preset "netlify" pour générer les Netlify Functions nécessaires au SSR
  // (loaders, server functions Supabase, API routes /api/*).
  nitro: {
    preset: "netlify",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
