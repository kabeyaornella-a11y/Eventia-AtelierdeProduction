# Plan d'action — Eventia Studio
_Mis à jour le 21 juillet 2026_

---

## Architecture globale

```
Site vitrine (Eventia-Signature-Officiel / Netlify)
    └── Formulaire de contact → POST /api/contact-requests
                                        ↓
                        API Server (Railway — toujours actif)
                                        ↓
                            Base de données PostgreSQL (Replit DB)
                                        ↑
Studio (Eventia-AtelierdeProduction / Netlify)
    └── Dashboard → Onglet "Demandes" → Convertir → Créer l'expérience
    └── Éditeur → Publier → génère /invitations/[slug]/index.html
                                        ↓
                            Invitation accessible en ligne (Netlify CDN)
```

---

## Phase 1 — Stabilisation (FAIT ✅)
- [x] Éditeur de blocs complet (texte, médias, RSVP, timeline, gallery…)
- [x] Système de calques (layers) : texte libre, photo, icône, cadre
- [x] Drag-to-reorder blocs + layers dans l'aperçu
- [x] Resize des layers (poignée coin bas-droit)
- [x] 48 icônes mariage · 5 templates timeline
- [x] Slug URL éditable par invitation
- [x] Table `contact_requests` créée en base
- [x] Route API `/api/contact-requests` (GET / POST / PATCH / DELETE)
- [x] Dashboard : onglet "Demandes" avec statuts et action "Créer l'expérience"
- [x] Repo corrigé → github.com/kabeyaornella-a11y/Eventia-AtelierdeProduction
- [x] `railway.json` configuré pour le déploiement API

---

## Phase 2 — Déployer l'API (priorité immédiate)

### Étapes Railway (15 min)
1. Aller sur https://railway.app → New Project → Deploy from GitHub repo
2. Sélectionner `Eventia-AtelierdeProduction`
3. Variables d'environnement à ajouter dans Railway :
   - `DATABASE_URL` = (copier depuis Replit Secrets)
   - `PORT` = 8080
   - `NODE_ENV` = production
4. Récupérer l'URL Railway (ex: `https://eventia-api.up.railway.app`)
5. Mettre cette URL dans le Studio Netlify comme variable `VITE_API_BASE`

### Mettre à jour la config Netlify (Studio)
```toml
# netlify.toml
[build.environment]
  VITE_API_BASE = "https://eventia-api.up.railway.app"
```

---

## Phase 3 — Viewer d'invitation (priorité #1 produit)

Le vrai livrable : la page mobile que les invités reçoivent par SMS/WhatsApp.

### À construire
- Route publique `/invitations/[slug]` → rendu en lecture seule
- Moteur GSAP/Three.js pour les animations
- Rendu de tous les BlockTypes (video_intro, title_names, countdown, RSVP…)
- RSVP : formulaire → POST `/api/rsvp` → stocké en DB
- Partage : meta OG + lien court

### Estimation effort : 2–3 semaines à temps plein

---

## Phase 4 — Connecter le site vitrine

### Côté site vitrine (Eventia-Signature-Officiel)
Ajouter dans le formulaire de contact :

```javascript
// Exemple — à adapter à ton framework vitrine
await fetch('https://eventia-api.up.railway.app/api/contact-requests', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name1: form.prenomPartner1,
    name2: form.prenomPartner2,
    email: form.email,
    phone: form.telephone,
    eventDate: form.dateMariage,
    guestCount: form.nombreInvites,
    collection: form.collection,      // si tu as un sélecteur sur le site
    formula: form.formule,            // idem
    message: form.message,
    source: 'vitrine',
  }),
});
```

### Côté Studio
- Dashboard → onglet "Demandes" → badge doré si nouvelles demandes
- Bouton "✦ Créer l'expérience" → ouvre automatiquement le formulaire
  New Invitation pré-rempli avec les infos du couple

---

## Phase 5 — Site vitrine (en parallèle)

### Pages à créer
- [ ] Page d'accueil avec démo d'une vraie invitation (iframe ou vidéo)
- [ ] Page Collections (Voiles, Seuils, Écrins, Union)
- [ ] Page Formules (Essentielle, Signature, Exception) avec tarifs
- [ ] Page Contact avec le formulaire branché sur l'API
- [ ] Page À propos / Ornelle

### Priorité absolue : la démo
→ Une fausse invitation fictive (Sophie & Alexandre) visible sur la page d'accueil.
→ C'est ce qui vend. Avant les tarifs, avant les textes.

---

## Phase 6 — Premiers clients (objectif dans 4-6 semaines)

### Actions hors code
- [ ] 3 invitations "démo" créées dans le Studio (une par collection)
- [ ] Partager les démos à ton réseau de wedding planners
- [ ] Tarifs définis et validés (3 formules × 4 collections = 12 combinaisons, ou simplifier)
- [ ] Processus client documenté : brief → création → validation → publication → remise

### Ce que le client reçoit
1. URL personnalisée : `invitation.eventiasignature.fr/sophie-alexandre`
2. QR code (générable depuis l'URL)
3. Aperçu avant publication (lien "draft")

---

## Ce qui est gelé (reprendre plus tard)

- ~~Bibliothèque d'icônes plus grande~~
- ~~Templates de calques pré-conçus~~
- ~~Supabase Storage pour les médias~~
- ~~Export PDF des invitations~~
- ~~Multi-langue~~

---

## Récapitulatif des priorités

| # | Quoi | Quand | Effort |
|---|------|-------|--------|
| 1 | Déployer l'API sur Railway | Cette semaine | 1h |
| 2 | Viewer d'invitation (page mobile publique) | Semaines 1-3 | Gros |
| 3 | Site vitrine avec démo | Semaines 2-4 | Moyen |
| 4 | Connecter formulaire vitrine → Studio | Après vitrine | 2h |
| 5 | Premiers clients | Semaine 5+ | Business |
