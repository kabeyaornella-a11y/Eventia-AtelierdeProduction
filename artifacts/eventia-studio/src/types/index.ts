export type BlockType =
  | 'video_intro'
  | 'title_names'
  | 'date_venue'
  | 'countdown'
  | 'rsvp'
  | 'map_access'
  | 'share_link'
  | 'dress_code'
  | 'our_story'
  | 'gallery'
  | 'empreintes'
  | 'transport'
  | 'menu'
  | 'program'
  | 'wishlist'
  | 'live_album'
  | 'playlist'
  | 'faq'
  | 'audio_book'
  | 'thanks'
  | 'text_free'; // Zone de texte libre positionnable

export type Formula = 'essentielle' | 'signature' | 'exception';
export type CollectionSlug = 'voiles' | 'seuils' | 'ecrins' | 'union';

/* ─── Layer (calque) ─────────────────────────────── */

export type LayerKind = 'text' | 'photo' | 'icon' | 'frame';

export interface Layer {
  id: string;
  kind: LayerKind;
  // Source
  src?: string;       // data URL — photos, frames uploadés
  emoji?: string;     // icônes bibliothèque
  text?: string;      // zone de texte libre
  // Position dans le bloc (% relatif au conteneur)
  x: number;          // 0–100
  y: number;          // 0–100
  width: number;      // 10–100 (% de la largeur du conteneur)
  rotation: number;   // degrés
  opacity: number;    // 0–1
  zIndex: number;
  // Texte / icône
  fontSize: number;   // px
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  textAlign: 'left' | 'center' | 'right';
}

export function makeDefaultLayer(kind: LayerKind, extra?: Partial<Layer>): Layer {
  return {
    id: `layer_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    kind,
    x: 10,
    y: 10,
    width: 40,
    rotation: 0,
    opacity: 1,
    zIndex: 1,
    fontSize: kind === 'icon' ? 36 : 16,
    fontFamily: 'Cormorant Garamond',
    color: '#F9F6F1',
    bold: false,
    italic: false,
    textAlign: 'center',
    text: kind === 'text' ? 'Votre texte ici' : undefined,
    emoji: kind === 'icon' ? '✦' : undefined,
    ...extra,
  };
}

/* ─── Typography ─────────────────────────────────── */

export interface FontStyle {
  family: string;
  size: number;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  highlight: string;
  letterSpacing: number;
  lineHeight: number;
  align: 'left' | 'center' | 'right';
}

export interface BlockTypography {
  combo: string;
  title: FontStyle;
  subtitle: FontStyle;
  body: FontStyle;
  other: FontStyle;
}

export interface BlockAnimation {
  trigger: 'scroll' | 'fixed';
  entrance: 'none' | 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'typewriter';
  photoEffect: 'none' | 'kenBurns' | 'zoomCinematic' | 'parallax';
  textEffect: 'none' | 'wordByWord' | 'letterByLetter' | 'fadeProgressive' | 'underlineAnimated';
}

export interface BlockMedia {
  video?: string;
  images: string[];
  icons: string[];
  audio?: string;
}

export type BlockContent = Record<string, string | number | boolean | string[] | null | undefined>;

/* ─── Block ──────────────────────────────────────── */

export interface Block {
  id: string;
  type: BlockType;
  enabled: boolean;
  content: BlockContent;
  typography: BlockTypography;
  animation: BlockAnimation;
  media: BlockMedia;
  layers: Layer[]; // calques compositables
}

/* ─── Meta ───────────────────────────────────────── */

export interface BlockMeta {
  type: BlockType;
  number: number;
  label: string;
  icon: string;
  description: string;
  formulaMin: Formula;
}

export interface FontCombo {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  body: string;
  other: string;
}

export const FONT_SIZES = [8, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96] as const;

export const FONT_COMBOS: FontCombo[] = [
  { id: 'maison_classique', label: 'Maison Classique',  title: 'Cormorant Garamond', subtitle: 'Cormorant Garamond', body: 'Jost',    other: 'Great Vibes' },
  { id: 'cinematique',      label: 'Cinématique',       title: 'Playfair Display',   subtitle: 'Playfair Display',   body: 'Lato',    other: 'Pinyon Script' },
  { id: 'contemporain',     label: 'Contemporain',      title: 'DM Serif Display',   subtitle: 'DM Serif Text',      body: 'DM Sans', other: 'Sacramento' },
  { id: 'minimaliste',      label: 'Minimaliste',       title: 'EB Garamond',        subtitle: 'EB Garamond',        body: 'Inter',   other: 'Tangerine' },
  { id: 'romantique',       label: 'Romantique',        title: 'Libre Baskerville',  subtitle: 'Libre Baskerville',  body: 'Nunito',  other: 'Dancing Script' },
];

export const ENTRANCE_OPTIONS = [
  { value: 'none',       label: 'Aucun' },
  { value: 'fadeIn',     label: 'Fondu' },
  { value: 'slideUp',    label: 'Glissement vers le haut' },
  { value: 'slideLeft',  label: 'Glissement gauche' },
  { value: 'slideRight', label: 'Glissement droite' },
  { value: 'zoomIn',     label: 'Zoom in' },
  { value: 'typewriter', label: 'Machine à écrire (texte)' },
];

export const PHOTO_EFFECT_OPTIONS = [
  { value: 'none',          label: 'Aucun' },
  { value: 'kenBurns',      label: 'Ken Burns (zoom lent)' },
  { value: 'zoomCinematic', label: 'Zoom cinématique' },
  { value: 'parallax',      label: 'Parallaxe au scroll' },
];

export const TEXT_EFFECT_OPTIONS = [
  { value: 'none',              label: 'Aucun' },
  { value: 'wordByWord',        label: 'Mot par mot' },
  { value: 'letterByLetter',    label: 'Lettre par lettre' },
  { value: 'fadeProgressive',   label: 'Fondu progressif' },
  { value: 'underlineAnimated', label: 'Soulignement animé' },
];

export const DEFAULT_FONT_STYLE: FontStyle = {
  family: 'Cormorant Garamond',
  size: 24,
  color: '#F9F6F1',
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  highlight: '',
  letterSpacing: 0,
  lineHeight: 1.4,
  align: 'center',
};

export function makeDefaultTypography(combo: FontCombo): BlockTypography {
  return {
    combo: combo.id,
    title:    { ...DEFAULT_FONT_STYLE, family: combo.title,    size: 48, color: '#F9F6F1', letterSpacing: 0 },
    subtitle: { ...DEFAULT_FONT_STYLE, family: combo.subtitle, size: 22, color: '#C9A96E', italic: true, letterSpacing: 2 },
    body:     { ...DEFAULT_FONT_STYLE, family: combo.body,     size: 14, color: 'rgba(249,246,241,0.7)', letterSpacing: 1.5, lineHeight: 1.7 },
    other:    { ...DEFAULT_FONT_STYLE, family: combo.other,    size: 36, color: '#C9A96E' },
  };
}

export const DEFAULT_ANIMATION: BlockAnimation = {
  trigger: 'scroll',
  entrance: 'fadeIn',
  photoEffect: 'none',
  textEffect: 'none',
};
