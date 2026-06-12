# Déploiement Eventia Signature

## Netlify
Build command : `npm run build`
Publish directory : `dist/client`

Le projet contient aussi `netlify.toml` avec les réglages de base.

## Variables nécessaires
Pour activer Supabase et les formulaires :

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Pour Gumroad : compléter les liens produits dans `src/lib/gumroad-links.ts` si les liens définitifs changent.

## Modifications incluses

- Vidéos Cloudinary officielles intégrées sur les collections.
- Galerie des expériences remplacée progressivement par les vidéos quand un modèle Cloudinary existe.
- Pages détaillées enrichies pour chaque expérience.
- Contact relié au serveur Supabase via le flux de leads existant.
- SEO renforcé : langue FR, meta descriptions, keywords, sitemap, robots.txt.
