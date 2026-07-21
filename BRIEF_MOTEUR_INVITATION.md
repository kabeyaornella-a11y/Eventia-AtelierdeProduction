# BRIEF COMPLET — Moteur d'invitation Eventia Studio

## Contexte & mission

**Eventia Signature** est une maison d'art immersif spécialisée dans les
expériences digitales de mariage. Le moteur d'invitation (Studio Eventia)
est l'outil interne utilisé par Ornelle (fondatrice) pour composer les
expériences de ses clients.

Ce n'est pas un outil self-service pour les couples. C'est un **éditeur
professionnel interne**, utilisé uniquement par l'équipe Eventia.

---

## Ce qu'est le Studio Eventia

Un **éditeur visuel de page d'invitation** — pense à un Webflow/Framer
mais 100 % dédié aux expériences Eventia Signature.

L'interface est divisée en deux zones :
- **Gauche** : panneau latéral collapsible (réductible / rouvrable) avec
  la liste de tous les blocs disponibles + leur configuration
- **Droite** : aperçu en temps réel de l'invitation telle qu'elle
  apparaîtra sur le téléphone du convive

---

## Architecture de l'interface

### Panneau latéral (sidebar gauche)

**Mode Bibliothèque** (vue par défaut) :
- Liste de tous les blocs disponibles
- Chaque bloc = une ligne avec case à cocher (activé / désactivé)
- Blocs automatiquement cochés selon la formule choisie (Essentielle /
  Signature / Exception)
- Drag & drop pour réordonner les blocs dans la liste
- Clic sur un bloc → bascule en Mode Configuration

**Mode Configuration** (quand un bloc est sélectionné) :
- Retour vers la bibliothèque (flèche)
- Nom du bloc en titre
- Onglets de configuration : Contenu · Typographie · Médias · Animation
- Aperçu du bloc en miniature

**Bouton réduire/rouvrir** : chevron ou flèche pour cacher le panneau
entier et avoir l'aperçu en plein écran.

### Aperçu en direct (droite)

- Rendu en format mobile (375px de large, centré)
- Se met à jour en temps réel à chaque modification
- Scroll pour voir l'invitation complète
- Bouton "Plein écran" pour voir sans le panneau
- Indicateur de section active au scroll

---

## Liste complète des blocs disponibles

### Blocs inclus par formule

| Bloc | Essentielle | Signature | Exception |
|---|---|---|---|
| 01 · Vidéo Intro | ✓ | ✓ | ✓ |
| 02 · Titre & Noms | ✓ | ✓ | ✓ |
| 03 · Date & Lieu | ✓ | ✓ | ✓ |
| 04 · Compte à rebours | ✓ | ✓ | ✓ |
| 05 · RSVP | ✓ | ✓ | ✓ |
| 06 · Plan & Accès | ✓ | ✓ | ✓ |
| 07 · Lien de partage | ✓ | ✓ | ✓ |
| 08 · Dress Code | — | ✓ | ✓ |
| 09 · Notre Histoire | — | ✓ | ✓ |
| 10 · Galerie Photos | — | ✓ | ✓ |
| 11 · Empreintes | — | ✓ | ✓ |
| 12 · Transport & Hébergements | — | — | ✓ |
| 13 · Menu | — | — | ✓ |
| 14 · Programme / Activités | — | — | ✓ |
| 15 · Liste de souhaits | — | — | ✓ |
| 16 · Album Live | — | — | ✓ |
| 17 · Playlist | — | — | ✓ |
| 18 · FAQ | — | — | ✓ |
| 19 · Livre Audio | — | — | ✓ |
| 20 · Remerciements | — | — | ✓ |

> Tous les blocs peuvent être manuellement cochés/décochés
> indépendamment de la formule.

---

## Détail de chaque bloc

### 01 · Vidéo Intro
- Vidéo pré-chargée par collection (Voiles / Seuils / Écrins / Union)
- Ornelle sélectionne la collection → la vidéo se charge automatiquement
- URL Cloudinary de la vidéo (seul endroit où URL est accepté)
- Options : lecture auto, lecture en boucle, son activé/désactivé
- Overlay de texte possible par-dessus la vidéo

### 02 · Titre & Noms
- Champs : Prénom 1 / Prénom 2 / "&" personnalisable / Surnom ou texte
  d'accroche
- Séparateur (esperluette, tiret, autre symbole)
- Position du texte : centré / gauche / droite

### 03 · Date & Lieu
- Date complète (jour, mois, année) — format personnalisable
- Heure
- Nom du lieu
- Ville, pays
- Format d'affichage : compact / développé / avec ornements

### 04 · Compte à rebours
- Calcul automatique depuis la date saisie dans le bloc 03
- Affichage : jours / heures / minutes / secondes
- Style : chiffres / texte / mixte

### 05 · RSVP
- Questions configurables (présence, nombre de personnes, régime
  alimentaire, message)
- Destinataire des réponses : email Ornelle
- Message de confirmation personnalisable

### 06 · Plan & Accès
- Adresse de la cérémonie + adresse de la réception (2 points possibles)
- Lien Google Maps / Waze personnalisé
- Texte d'accès complémentaire

### 07 · Dress Code
- Champ texte libre
- Upload d'une image d'ambiance
- Palette de couleurs suggérées (color swatches)
- Animation : défilement / fade-in

### 08 · Notre Histoire
- Timeline : chaque entrée = date + texte + photo optionnelle
- Nombre d'entrées libre
- Layout : vertical / alterné gauche-droite

### 09 · Galerie Photos
- Upload multiple (jusqu'à 20 photos)
- Layout : grille / masonry / carrousel / filmstrip
- Légendes optionnelles
- Effet : zoom au hover, lightbox au clic

### 10 · Empreintes personnalisées
- Icônes / illustrations personnalisées de la collection
- Upload d'icônes SVG ou PNG
- Placement dans la mise en page

### 11 · Transport & Hébergements
- Plusieurs options (bus navette, hôtels, covoiturage…)
- Par option : nom, description, lien externe, icône

### 12 · Menu
- Entrée / Plat / Dessert / Fromages / Boissons
- Champs texte par course
- Titre du menu personnalisable
- Photo optionnelle

### 13 · Programme / Activités
- Timeline de la journée
- Par étape : heure, intitulé, lieu, description courte
- Icône par étape (sélectionnable depuis bibliothèque)

### 14 · Liste de souhaits / Cadeaux
- Lien externe vers liste (Babylist, Amazon, etc.)
- Ou liste manuelle : item + description + lien
- Message personnalisé

### 15 · Album Live
- QR Code généré automatiquement
- Instructions pour les convives
- Lien de l'album

### 16 · Playlist
- Lien Spotify / Apple Music
- Ou ajout manuel de suggestions (artiste + chanson)

### 17 · FAQ
- Accordéon : question + réponse
- Nombre de Q&A libre

### 18 · Livre Audio / Message vocal
- Upload d'un fichier audio (MP3, AAC)
- Lecteur audio intégré avec style Eventia
- Texte d'accompagnement

### 19 · Remerciements
- Texte libre de fin
- Photo optionnelle
- Signature / initiales des mariés

---

## Configuration typographique (par bloc)

### Combos de polices prédéfinies
Chaque combo = 4 polices : Titre / Sous-titre / Corps / Ornements

| Combo | Titre | Sous-titre | Corps | Ornements |
|---|---|---|---|---|
| Maison Classique | Cormorant Garamond | Cormorant Garamond Italic | Jost Light | Great Vibes |
| Cinématique | Playfair Display | Playfair Display Italic | Lato | Pinyon Script |
| Contemporain | DM Serif Display | DM Serif Text | DM Sans | Sacramento |
| Minimaliste | EB Garamond | EB Garamond Italic | Inter | Tangerine |
| Romantique | Libre Baskerville | Libre Baskerville Italic | Nunito | Dancing Script |

### Configuration individuelle (onglets Titre / Sous-titre / Corps / Autre)
Pour chaque niveau typographique, l'utilisateur peut régler :

- **Police** : liste déroulante (toutes Google Fonts + polices du combo)
- **Taille** : valeurs exactes en px — liste déroulante ou champ numérique
  Options : 8 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 18 · 20 · 22 · 24 ·
  28 · 32 · 36 · 40 · 48 · 56 · 64 · 72 · 80 · 96
- **Couleur** : color picker avec couleurs Eventia en favoris +
  champ HEX/RGB
- **Style** : Gras (B) · Italique (I) · Souligné (U) · Barré (S) ·
  Surligné (H avec couleur)
- **Espacement** : letter-spacing (0 à 10px) · line-height (1 à 3)
- **Alignement** : gauche / centré / droite

---

## Médias & uploads (par bloc)

### Types d'upload acceptés
- **Vidéo** : MP4, MOV (max 100MB) → uniquement bloc Vidéo Intro
- **Photo unique** : JPG, PNG, WEBP (max 10MB)
- **Photos multiples** : jusqu'à 20 fichiers
- **Icônes** : SVG, PNG transparent (max 2MB)
- **Cadres / Overlays** : PNG transparent

### Pas d'URL sauf :
- Bloc 01 Vidéo Intro : URL Cloudinary de la vidéo de collection
- Bloc 06 Plan : URL Google Maps / Waze
- Bloc 14 Liste de souhaits : URL externe
- Bloc 15 Album Live : URL de l'album
- Bloc 16 Playlist : URL Spotify / Apple Music

### Templates par bloc
Chaque bloc dispose de 3 à 5 layouts prédéfinis (templates visuels).
Sélectionner un template = appliquer sa mise en page + ses styles par
défaut, que l'on peut ensuite personnaliser.

---

## Animations & effets

### Trigger d'apparition (par bloc)
- **Au scroll** : le bloc s'anime quand il entre dans le viewport
- **Fixe** : tout est visible dès le chargement, sans animation d'entrée

### Effets d'entrée (par bloc)
- Fondu (fade in)
- Glissement vers le haut (slide up)
- Glissement latéral (slide left / right)
- Zoom in
- Apparition progressive lettre par lettre (texte uniquement)
- Aucun

### Effets sur les photos
- Ken Burns (zoom lent + translation)
- Zoom cinématique (zoom fort, lent)
- Parallaxe au scroll
- Aucun

### Effets sur les textes
- Apparition mot à mot
- Apparition lettre par lettre
- Fondu progressif
- Soulignement animé
- Aucun

---

## Données & persistence

- Chaque invitation = un enregistrement Supabase
  - id, couple_id, collection, formule, blocs (JSON), statut, lien_unique
- Les uploads vont dans Supabase Storage (ou Cloudinary)
- Le lien unique généré = `exp.eventiasignature.com/{slug-couple}`
- Statut : brouillon / en cours / livré / archivé

---

## Stack technique

- **React + Vite** (TypeScript)
- **@dnd-kit** pour le drag & drop des blocs
- **Zustand** pour le state de l'éditeur
- **Supabase** pour les données + storage
- Pas de Tailwind — inline styles cohérents avec la charte Eventia

---

## Charte visuelle de l'éditeur

L'interface de l'éditeur suit la même charte qu'Eventia Signature :
- Fond UI : `#1A1110` (très sombre) pour le panneau latéral
- Fond preview : `#0E0E0E` simulant un téléphone
- Or : `#C9A96E` pour les accents, les labels actifs, les CTA
- Texte UI : `rgba(249,246,241,0.8)`
- Bordures : `rgba(201,169,110,0.15)`
- Sélection active : fond `rgba(201,169,110,0.12)`, bordure gauche `#C9A96E`
- Polices UI : Jost (labels, boutons), Cormorant Garamond (titres de section)
