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
  | 'thanks';

export type Formula = 'essentielle' | 'signature' | 'exception';

export type CollectionSlug = 'voiles' | 'seuils' | 'ecrins' | 'union';

export interface FontStyle {
  family: string;
  size: number; // px
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  highlight: string; // empty = none, else background color
  letterSpacing: number; // px
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
  video?: string;   // Cloudinary URL (video_intro only) or data URL
  images: string[]; // data URLs (upload)
  icons: string[];  // data URLs (upload)
  audio?: string;   // data URL (audio_book)
}

// Content fields vary by block type — typed as generic KV
export type BlockContent = Record<string, string | number | boolean | string[] | null | undefined>;

export interface Block {
  id: string;
  type: BlockType;
  enabled: boolean;
  content: BlockContent;
  typography: BlockTypography;
  animation: BlockAnimation;
  media: BlockMedia;
}

// Static block metadata
export interface BlockMeta {
  type: BlockType;
  number: number;
  label: string;
  icon: string; // emoji
  description: string;
  formulaMin: Formula; // minimum formula that includes this block
}

// Font combo definition
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
  { id: 'maison_classique',  label: 'Maison Classique',  title: 'Cormorant Garamond', subtitle: 'Cormorant Garamond', body: 'Jost',              other: 'Great Vibes' },
  { id: 'cinematique',       label: 'Cinématique',       title: 'Playfair Display',   subtitle: 'Playfair Display',   body: 'Lato',              other: 'Pinyon Script' },
  { id: 'contemporain',      label: 'Contemporain',      title: 'DM Serif Display',   subtitle: 'DM Serif Text',      body: 'DM Sans',           other: 'Sacramento' },
  { id: 'minimaliste',       label: 'Minimaliste',       title: 'EB Garamond',        subtitle: 'EB Garamond',        body: 'Inter',             other: 'Tangerine' },
  { id: 'romantique',        label: 'Romantique',        title: 'Libre Baskerville',  subtitle: 'Libre Baskerville',  body: 'Nunito',            other: 'Dancing Script' },
];

export const ENTRANCE_OPTIONS = [
  { value: 'none',        label: 'Aucun' },
  { value: 'fadeIn',      label: 'Fondu' },
  { value: 'slideUp',     label: 'Glissement vers le haut' },
  { value: 'slideLeft',   label: 'Glissement gauche' },
  { value: 'slideRight',  label: 'Glissement droite' },
  { value: 'zoomIn',      label: 'Zoom in' },
  { value: 'typewriter',  label: 'Machine à écrire (texte)' },
];

export const PHOTO_EFFECT_OPTIONS = [
  { value: 'none',           label: 'Aucun' },
  { value: 'kenBurns',       label: 'Ken Burns (zoom lent)' },
  { value: 'zoomCinematic',  label: 'Zoom cinématique' },
  { value: 'parallax',       label: 'Parallaxe au scroll' },
];

export const TEXT_EFFECT_OPTIONS = [
  { value: 'none',               label: 'Aucun' },
  { value: 'wordByWord',         label: 'Mot par mot' },
  { value: 'letterByLetter',     label: 'Lettre par lettre' },
  { value: 'fadeProgressive',    label: 'Fondu progressif' },
  { value: 'underlineAnimated',  label: 'Soulignement animé' },
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
    title: { ...DEFAULT_FONT_STYLE, family: combo.title, size: 48, color: '#F9F6F1', letterSpacing: 0 },
    subtitle: { ...DEFAULT_FONT_STYLE, family: combo.subtitle, size: 22, color: '#C9A96E', italic: true, letterSpacing: 2 },
    body: { ...DEFAULT_FONT_STYLE, family: combo.body, size: 14, color: 'rgba(249,246,241,0.7)', letterSpacing: 1.5, lineHeight: 1.7 },
    other: { ...DEFAULT_FONT_STYLE, family: combo.other, size: 36, color: '#C9A96E' },
  };
}

export const DEFAULT_ANIMATION: BlockAnimation = {
  trigger: 'scroll',
  entrance: 'fadeIn',
  photoEffect: 'none',
  textEffect: 'none',
};
