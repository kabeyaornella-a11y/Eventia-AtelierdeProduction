# Eventia Signature — Site vitrine

Site vitrine premium pour Eventia Signature, studio de faire-part digitaux haut de gamme.

## Stack technique

| Couche          | Technologie                                                    |
| --------------- | -------------------------------------------------------------- |
| Framework       | TanStack Start 1.167+ (React 19, Vite 7)                       |
| Routing         | TanStack Router (file-based)                                   |
| CSS             | Tailwind CSS 4 + oklch palette                                 |
| Base de données | Supabase (PostgreSQL + Auth + RLS)                             |
| Vidéos          | Cloudinary (q_auto/f_auto, lazy load via IntersectionObserver) |
| Emails          | Resend (via `RESEND_API_KEY`)                                  |
| Paiement        | Gumroad webhook (token timing-safe)                            |
| Déploiement     | Netlify (preset Nitro)                                         |
| Tests           | Vitest                                                         |
| Lint / Format   | ESLint + Prettier                                              |

## Démarrage local

```bash
cp .env.example .env
# Renseigner les variables Supabase, Resend, Gumroad…

npm install
npm run dev
```

## Variables d'environnement

Voir `.env.example` pour la liste complète. Minimum requis :

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

Variables optionnelles :

| Variable                 | Usage                                          |
| ------------------------ | ---------------------------------------------- |
| `GUMROAD_WEBHOOK_SECRET` | Vérification des pings Gumroad                 |
| `RESEND_API_KEY`         | Envoi d'emails de confirmation                 |
| `VITE_CALENDLY_URL`      | Bouton "Réserver un appel" sur la page Contact |

## Scripts disponibles

```bash
npm run dev      # Serveur de développement (port 3000)
npm run build    # Build de production
npm run lint     # ESLint
npm run format   # Prettier (écriture)
npm test         # Vitest (suite de tests)
```

## Structure

```
src/
  assets/          images statiques
  components/
    site/
      premium/     composants UI signature (galerie, carousel, cards…)
  integrations/
    supabase/      client + types générés
  lib/             utilitaires (eventia-data, cloudinary-models, rate-limit…)
  routes/          pages + API routes (TanStack Router file-based)
  styles.css       Tailwind + animations personnalisées + carousel 3D
```

## Déploiement Netlify

Le build produit un bundle Nitro. Netlify détecte automatiquement le preset via `netlify.toml`.

Les headers de sécurité (CSP, HSTS, X-Frame-Options…) sont définis dans `netlify.toml`.

## Webhooks

- **Gumroad** : `POST /api/public/gumroad?token=<secret>` — rate-limité à 30 req/min par IP.
- **Email worker** : `POST /api/public/email-worker` — protégé par `apikey: <SUPABASE_SERVICE_ROLE_KEY>`.
