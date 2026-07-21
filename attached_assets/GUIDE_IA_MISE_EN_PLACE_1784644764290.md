# GUIDE POUR IA — Mise en place complète Eventia Signature

*Document de passation technique — à lire intégralement avant d’agir*

-----

## 0. QUI TU AIDES ET COMMENT LUI PARLER

Tu aides **Nella**, fondatrice solo d’Eventia Signature. Elle travaille depuis **iPhone/iPad**. Tes réponses doivent être :

- Courtes, scannable, avec emojis
- En **français exclusivement**
- Toujours concrètes : livrable ou action, jamais juste de la théorie
- Tutoiement naturel
- Mode manager : honnête, direct, recadre si besoin
- Montre avant de valider. Maximum 2-3 variantes.

-----

## 1. CE QUI EXISTE DÉJÀ — NE PAS RECRÉER

### 1.1 Système de production (GitHub)

**Repo** : `kabeyaornella-a11y/marie-paul-yann-v2` · branche `main`

Ce pipeline est **complet et fonctionnel**. Ne pas le réécrire.

```
_template/index.html          12 067 lignes · 53 tokens {{}} · 12 blocs conditionnels
_template/countdown/          Countdown tokenisé
_template/scratch/            Scratch (machine à sous) tokenisé
_template/univers/            5 CSS collections + 3 variantes (palettes correctes)
config/tiers.json             3 paliers + 12 options tarifées
couples/marie-paul-yann.json  Couple de référence complet
scripts/build.js              Pipeline Node.js → génère dist/<couple>/
scripts/tokenize.py           Extrait 53 tokens de index.html vers _template/
scripts/google-sheets-webhook.js  Apps Script RSVP → Google Sheets
netlify/functions/rsvp.js     Netlify Function : Resend + Sheets + Deploy Hook
GUIDE.md                      5 workflows opérationnels
```

**Logique des blocs** (config/tiers.json) :

```
blocs_actifs = union(palier.blocs_inclus, couple.commande.options_achetees)
```

|Palier       |Prix|Blocs inclus par défaut                |
|-------------|----|---------------------------------------|
|L’Essentielle|179€|9 blocs de base                        |
|La Signature |269€|+ notre-histoire, dresscode, empreintes|
|L’Exception  |549€|+ hebergements, autour, cadeaux        |

**6 blocs optionnels payants** (+15-20€/unité) : `transport` `menu` `photos-galerie` `faq` `playlist` `livre-audio`
→ **HTML manquant** pour ces 6 blocs. C’est une tâche à faire (voir section 4).

### 1.2 Invitation en production

- **URL** : <https://mariage-mariepaul-yann.netlify.app/>
- **Couple** : Marie-Paul & Yann · mariage 22 mai 2027
- **Univers** : Versailles d’Or
- **Statut RSVP** : Netlify Function déployée mais variables d’env manquantes (voir section 2)

### 1.3 Assets Cloudinary

**Cloud ID** : `didid8vcu`
**~70 SVG uploadés**, tous taggués `eventia`

Récupérer la liste complète :

```
cloudinary search expression="tags:eventia" max_results=500
```

Dossiers existants :

```
les-seuils/ornements/      les-seuils/versailles-or/   les-seuils/textures/
les-voiles/ornements/      les-voiles/textures/
les-ecrins/ornements/      les-ecrins/textures/
l-union/ornements/         l-union/textures/
save-the-date/ornements/
shared/icones/             shared/separateurs/          shared/cadres/
```

-----

## 2. TÂCHE PRIORITAIRE — Variables d’environnement Netlify

**Site concerné** : mariage-mariepaul-yann.netlify.app

**Aller dans** : Netlify Dashboard → Site → Site configuration → Environment variables

**Configurer ces 7 variables** :

```
RESEND_API_KEY          → Créer sur resend.com (gratuit, 3000 emails/mois)
                          Format : re_xxxxxxxxxxxxxxxxxxxx

EMAIL_FROM              → Marie-Paul & Yann <rsvp@eventiasignature.fr>
                          (ou onboarding@resend.dev pour tester sans domaine vérifié)

OWNER_EMAIL             → kabeyaornella@gmail.com

COUPLE_NAMES            → Marie-Paul & Yann

WEDDING_DATE            → samedi 22 mai 2027

SHEETS_WEBHOOK_URL      → URL Apps Script Google Sheets (voir 2.1)

NETLIFY_DEPLOY_HOOK_URL → URL hook Netlify (voir 2.2)
```

### 2.1 Créer le Google Sheet RSVP

1. Créer un Google Sheet vide
1. Extensions → Apps Script → Éditeur de script
1. Coller le contenu de `scripts/google-sheets-webhook.js` du repo
1. Déployer → Nouveau déploiement → Application Web
1. Accès : “Tout le monde”
1. Copier l’URL → variable `SHEETS_WEBHOOK_URL`

### 2.2 Créer le Deploy Hook Netlify

1. Netlify Dashboard → Site → Site configuration → Build hooks
1. Clic “Add build hook” → nom : “RSVP Auto-rebuild”
1. Copier l’URL → variable `NETLIFY_DEPLOY_HOOK_URL`

### 2.3 Créer la clé Resend

1. Aller sur resend.com → créer compte gratuit
1. Dashboard → API Keys → Create API Key
1. Permissions : Sending access
1. Copier la clé → variable `RESEND_API_KEY`
1. Si domaine perso : Domains → Add domain → suivre les instructions DNS

### 2.4 Tester le RSVP

Après avoir configuré les variables, faire un redéploiement Netlify puis tester le formulaire RSVP. Vérifier :

- Email de confirmation reçu par l’invité test
- Email de notification reçu sur [kabeyaornella@gmail.com](mailto:kabeyaornella@gmail.com)
- Nouvelle ligne dans Google Sheets

-----

## 3. TÂCHE 2 — Compléter les assets Cloudinary manquants

**Assets partiellement uploadés — finaliser** :

Ces icônes sont générées mais pas encore sur Cloudinary :

```
shared/icones/champagne-bouteille
shared/icones/fleur
shared/icones/danse
shared/icones/coeur
shared/icones/check-oui
shared/icones/fleche-droite
```

**Convention d’upload** — toujours taguer ainsi :

```json
{
  "public_id": "shared/icones/[nom]",
  "tags": ["eventia", "shared", "icone", "[nom]"],
  "resource_type": "image"
}
```

**Assets prioritaires à créer ensuite** (par collection) :

|Collection   |Assets manquants                                                 |
|-------------|-----------------------------------------------------------------|
|Les Voiles   |textures/brume-voile, ornements/papillons                        |
|Les Écrins   |ornements/broche, ornements/sertissage                           |
|L’Union      |ornements/livre-album, ornements/timbre-postal                   |
|Save the Date|ornements/cachet-postal, separateurs/confettis-ligne             |
|Shared       |icones/allergie, icones/famille, icones/playlist, icones/rsvp-non|

**Format SVG obligatoire** : `viewBox` adapté · stroke `#C9A24A` (doré standard) · fill=“none” · opacities légères · pas de texte (sauf exceptions)

-----

## 4. TÂCHE 3 — Designer les 6 blocs HTML manquants

Ces 6 blocs sont déclarés dans `config/tiers.json` mais leur HTML n’existe pas dans `_template/index.html`. Il faut les créer et les insérer entre les marqueurs :

```html
<!-- BLOC:transport:START -->
[HTML À CRÉER ICI]
<!-- BLOC:transport:END -->
```

### Spécifications par bloc

**BLOC : transport** (option +15€)

- Section pour informations navette / covoiturage
- Tokens : `{{TRANSPORT_INFO}}`, `{{TRANSPORT_LIEN}}`, `{{TRANSPORT_HORAIRES}}`
- Design : icône voiture/bus · fond collection · couleur accent
- CTA : “Réserver ma place” ou “Voir l’itinéraire”

**BLOC : menu** (option +15€)

- Section pour afficher le menu du repas
- Tokens : `{{MENU_ENTREE}}`, `{{MENU_PLAT}}`, `{{MENU_DESSERT}}`, `{{MENU_VIN}}`
- Design : carte de menu élégante · typographie Cormorant Garamond
- Option allergies : champ dans le formulaire RSVP existant (déjà présent)

**BLOC : photos-galerie** (option +20€)

- Galerie photos du couple (avant mariage ou jour J après upload)
- Tokens : `{{GALERIE_CLOUDINARY_URL}}` (JSON array)
- Design : grille masonry ou carousel · lazy loading · fullscreen au clic

**BLOC : faq** (option +15€)

- Questions fréquentes des invités
- Tokens : `{{FAQ_ITEMS}}` (JSON array {question, reponse})
- Design : accordéon animé · icône `+` doré · fond légèrement différencié

**BLOC : playlist** (option +15€)

- Playlist collaborative Spotify
- Tokens : `{{PLAYLIST_SPOTIFY_URL}}`, `{{PLAYLIST_TITRE}}`
- Design : embed Spotify ou lien stylisé · icône musique · CTA “Ajouter une chanson”

**BLOC : livre-audio** (option +20€)

- Message audio/vidéo du couple
- Tokens : `{{AUDIO_URL}}`, `{{AUDIO_DUREE}}`
- Design : player audio custom (Canvas/Web Audio API) · waveform animée · couleurs collection

### Convention HTML pour chaque bloc

```html
<!-- BLOC:nom-bloc:START -->
<section id="nom-bloc" class="section-eventia bloc-optionnel">
  <div class="container-eventia">
    <div class="titre-section">
      <div class="ornement-separateur"><!-- SVG Cloudinary --></div>
      <h2 class="titre-section-h2">{{BLOC_TITRE}}</h2>
    </div>
    <!-- Contenu spécifique -->
  </div>
</section>
<!-- BLOC:nom-bloc:END -->
```

-----

## 5. TÂCHE 4 — Créer une nouvelle invitation client

Une fois les tâches 1-3 faites, voici le workflow complet pour une nouvelle commande :

### Étape 1 — Créer le JSON couple

```bash
cp couples/marie-paul-yann.json couples/prenom1-prenom2.json
```

**Structure du JSON** (compléter toutes les sections) :

```json
{
  "_meta": {
    "id": "sophie-thomas-2027",
    "slug": "sophie-thomas",
    "univers": "les-voiles",
    "date_creation": "2026-06-11"
  },
  "couple": {
    "prenom_1": "Sophie",
    "prenom_2": "Thomas",
    "prenoms": "Sophie & Thomas",
    "prenoms_html": "Sophie<br>&amp;<br>Thomas",
    "initiales": "S&T",
    "phrase_hero": "Notre amour, votre invitation"
  },
  "date": {
    "iso": "2027-09-18",
    "longue": "samedi 18 septembre 2027",
    "courte": "18.09.2027",
    "rsvp_limite": "18 août 2027",
    "compte_a_rebours_cible": "2027-09-18T15:00:00"
  },
  "lieux": {
    "civil_nom": "Mairie du 16ème",
    "civil_adresse": "71 Avenue Henri Martin, 75016 Paris",
    "civil_maps": "https://maps.google.com/?q=...",
    "reception_nom": "Château de la Marquise",
    "reception_adresse": "123 Route des Vignes, 77300 Fontainebleau",
    "reception_maps": "https://maps.google.com/?q=..."
  },
  "media": {
    "video_ouverture": "https://res.cloudinary.com/didid8vcu/video/upload/les-voiles/[NOM].mp4",
    "photo_hero": "https://res.cloudinary.com/didid8vcu/image/upload/[COUPLE]/photo-hero.webp",
    "photo_finale": "https://res.cloudinary.com/didid8vcu/image/upload/[COUPLE]/photo-finale.webp"
  },
  "programme": [
    {"heure": "14h30", "titre": "Cérémonie civile", "lieu": "Mairie du 16ème", "icone": "eglise"},
    {"heure": "16h00", "titre": "Cocktail", "lieu": "Château de la Marquise", "icone": "coupe-champagne"},
    {"heure": "19h00", "titre": "Dîner", "lieu": "Grande Salle", "icone": "gateau-mariage"},
    {"heure": "22h00", "titre": "Soirée dansante", "lieu": "Salle de Bal", "icone": "musique"}
  ],
  "rsvp": {
    "formspree_id": "xpznxxxx",
    "date_limite": "18 août 2027"
  },
  "seo": {
    "titre": "Sophie & Thomas — Mariage 18 septembre 2027",
    "description": "Nous vous invitons à célébrer notre mariage le 18 septembre 2027."
  },
  "commande": {
    "palier": "signature",
    "options_achetees": ["hebergements", "playlist"],
    "prix_total": 339
  }
}
```

### Étape 2 — Builder et tester

```bash
cd kabeyaornella-a11y/marie-paul-yann-v2

# Vérifier sans générer
node scripts/build.js --couple=sophie-thomas --dry-run

# Générer dans dist/
node scripts/build.js --couple=sophie-thomas

# Prévisualiser en local
npx serve dist/sophie-thomas
# → Ouvrir http://localhost:3000
```

### Étape 3 — Déployer sur Netlify

```bash
# Créer un nouveau site Netlify pour ce couple
netlify deploy --prod --dir=dist/sophie-thomas --site=mariage-sophie-thomas

# OU déployer manuellement via l'interface Netlify :
# Drag & drop du dossier dist/sophie-thomas dans netlify.com/drop
```

### Étape 4 — Configurer les variables d’env du nouveau site

Répéter les variables de la section 2, adaptées au couple.

-----

## 6. ARCHITECTURE COMPLÈTE DU SYSTÈME

```
COMMANDE CLIENT
      ↓
couples/[prenom1-prenom2].json  ← Remplir ce fichier
      ↓
node scripts/build.js --couple=[slug]
      ↓
1. Lit JSON couple + config/tiers.json
2. Calcule blocs actifs (palier + options)
3. Copie _template/ → dist/[slug]/
4. Supprime blocs inactifs (regex)
5. Injecte CSS univers (fin de body)
6. Remplace 53 tokens {{NOM}}
      ↓
dist/[slug]/index.html  ← Invitation complète prête à déployer
      ↓
netlify deploy --prod --dir=dist/[slug]
      ↓
INVITATION EN LIGNE ✓
      ↓
RSVP invité → /.netlify/functions/rsvp
      ↓
┌─────────────────────────────────────┐
│ 1. Email confirmation → invité      │
│ 2. Email notification → Nella       │
│ 3. Ligne Google Sheets              │
│ 4. Redéploiement Netlify auto       │
└─────────────────────────────────────┘
```

-----

## 7. IDENTITÉ VISUELLE — RÉFÉRENCE RAPIDE

### Typographies

```css
font-family: 'Cormorant Garamond', serif;  /* Titres principaux */
font-family: 'Great Vibes', cursive;        /* Prénoms, accents */
font-family: 'Jost', sans-serif;           /* Corps de texte */
```

### Palettes par collection

```css
/* Versailles d'Or */
--ev-bg: #F4E8D5;  --ev-accent: #C9A24A;  --ev-text: #6B1E2C;

/* Les Seuils */
--ev-bg: #E8DED0;  --ev-accent: #D9B35F;  --ev-text: #3A2B26;

/* Les Voiles */
--ev-bg: #FFFBF4;  --ev-accent: #CFAF67;  --ev-text: #D8B6A6;

/* Les Écrins */
--ev-bg: #FAF3EA;  --ev-accent: #D1AA5C;  --ev-text: #C49A9D;

/* L'Union */
--ev-bg: #F6EEE2;  --ev-accent: #B88A3A;  --ev-text: #6A4538;

/* Save the Date */
--ev-bg: #FFF8EE;  --ev-accent: #C79B3B;  --ev-text: #4A302C;
```

### Videos Cloudinary (URLs de production)

```
Les Seuils/Versailles d'Or : v1775227111/les-seuils/Versailles-Or.mp4
Les Seuils/L'Héritage Sacré : v1775227109/les-seuils/Heritage-Sacre.mp4
Les Voiles/Nude Éternel : v1775508029/les-voiles/Nude-Eternel.mp4
Les Voiles/Aube Céleste : v1775508032/les-voiles/Aube-Celeste.mp4
Les Écrins/Élégance Eucalyptus : v1775560998/les-ecrins/Elegance-Eucalyptus.mp4
L'Union/L'Entrée Sacrée : v1775501186/l-union/Entree-Sacree.mp4
Save the Date/L'Écrin : v1776265257/L_%C3%A9crin-savethedate_kznzhv.mp4
Save the Date/Pétales : v1776265434/Petales-savethedate_jctfsd.mp4
```

Base URL : `https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/`

-----

## 8. ERREURS FRÉQUENTES À ÉVITER

|Erreur                                       |Correct                                       |
|---------------------------------------------|----------------------------------------------|
|Recréer le pipeline build.js                 |Il existe déjà dans le repo                   |
|Confondre les palettes collections           |Toujours vérifier dans _template/univers/*.css|
|Uploader des assets sans tag `eventia`       |Toujours taguer : eventia + collection + type |
|Modifier index.html de production directement|Modifier _template/ puis rebuilder            |
|Oublier le –dry-run avant build              |Toujours tester d’abord                       |
|Créer des fichiers sans les présenter à Nella|Montrer avant de finaliser                    |

-----

## 9. ORDRE D’EXÉCUTION RECOMMANDÉ

```
SÉQUENCE PRIORITAIRE :

① Configurer variables Netlify M-P & Y (section 2)
   → Tester RSVP en production
   → ⏱ ~30 min

② Designer les 6 blocs HTML manquants (section 4)
   → Les ajouter dans _template/index.html
   → Commit + push GitHub
   → ⏱ ~2-3h

③ Finir upload assets Cloudinary (section 3)
   → ~15 icônes restantes + assets collection prioritaires
   → ⏱ ~1h

④ Créer la première invitation vrai client (section 5)
   → JSON couple → build → deploy
   → ⏱ ~1h

⑤ Site eventiasignature.fr (pages collections, tarifs, contact)
   → ⏱ session dédiée
```

-----

*Document de passation IA — Eventia Signature · 11 juin 2026*
*Tout ce qui précède est opérationnel. Exécuter dans l’ordre.*