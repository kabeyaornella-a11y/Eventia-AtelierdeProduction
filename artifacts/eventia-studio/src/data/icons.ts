export interface IconItem {
  id: string;
  label: string;
  emoji: string;
  category: 'fleurs' | 'nature' | 'amour' | 'celebration' | 'mariage' | 'formes';
}

export const ICON_LIBRARY: IconItem[] = [
  // Fleurs
  { id: 'rose',        label: 'Rose',           emoji: '🌹', category: 'fleurs' },
  { id: 'pivoine',     label: 'Pivoine',         emoji: '🌸', category: 'fleurs' },
  { id: 'hibiscus',    label: 'Hibiscus',        emoji: '🌺', category: 'fleurs' },
  { id: 'bouquet',     label: 'Bouquet',         emoji: '💐', category: 'fleurs' },
  { id: 'tournesol',   label: 'Tournesol',       emoji: '🌻', category: 'fleurs' },
  { id: 'marguerite',  label: 'Marguerite',      emoji: '🌼', category: 'fleurs' },
  { id: 'tulipe',      label: 'Tulipe',          emoji: '🌷', category: 'fleurs' },
  { id: 'lotus',       label: 'Lotus',           emoji: '🪷', category: 'fleurs' },
  // Nature
  { id: 'feuillage',   label: 'Feuillage',       emoji: '🌿', category: 'nature' },
  { id: 'feuille',     label: 'Feuille',         emoji: '🍃', category: 'nature' },
  { id: 'ble',         label: 'Blé',             emoji: '🌾', category: 'nature' },
  { id: 'papillon',    label: 'Papillon',        emoji: '🦋', category: 'nature' },
  { id: 'colombe',     label: 'Colombe',         emoji: '🕊️', category: 'nature' },
  { id: 'lune',        label: 'Lune',            emoji: '🌙', category: 'nature' },
  { id: 'etoile',      label: 'Étoile',          emoji: '⭐', category: 'nature' },
  { id: 'soleil',      label: 'Soleil',          emoji: '☀️', category: 'nature' },
  { id: 'nuage',       label: 'Nuage',           emoji: '☁️', category: 'nature' },
  { id: 'montagne',    label: 'Montagne',        emoji: '🏔️', category: 'nature' },
  // Amour
  { id: 'coeur',       label: 'Cœur',            emoji: '❤️', category: 'amour' },
  { id: 'coeur_rose',  label: 'Cœur rose',       emoji: '💗', category: 'amour' },
  { id: 'infini',      label: 'Infini',          emoji: '♾️', category: 'amour' },
  { id: 'diamant',     label: 'Diamant',         emoji: '💎', category: 'amour' },
  { id: 'baiser',      label: 'Baiser',          emoji: '💋', category: 'amour' },
  { id: 'envie',       label: 'Désir',           emoji: '🫦', category: 'amour' },
  // Célébration
  { id: 'coupes',      label: 'Coupes',          emoji: '🥂', category: 'celebration' },
  { id: 'champagne',   label: 'Champagne',       emoji: '🍾', category: 'celebration' },
  { id: 'ruban',       label: 'Ruban',           emoji: '🎀', category: 'celebration' },
  { id: 'etincelle',   label: 'Étincelles',      emoji: '✨', category: 'celebration' },
  { id: 'feux',        label: 'Feux',            emoji: '🎆', category: 'celebration' },
  { id: 'confetti',    label: 'Confettis',       emoji: '🎊', category: 'celebration' },
  { id: 'musique',     label: 'Musique',         emoji: '🎵', category: 'celebration' },
  { id: 'ballon',      label: 'Ballon',          emoji: '🎈', category: 'celebration' },
  // Mariage
  { id: 'alliance',    label: 'Alliance',        emoji: '💍', category: 'mariage' },
  { id: 'mariee',      label: 'Mariée',          emoji: '👰', category: 'mariage' },
  { id: 'marie',       label: 'Marié',           emoji: '🤵', category: 'mariage' },
  { id: 'couple',      label: 'Couple',          emoji: '👫', category: 'mariage' },
  { id: 'eglise',      label: 'Cérémonie',       emoji: '💒', category: 'mariage' },
  { id: 'gateau',      label: 'Gâteau',          emoji: '🎂', category: 'mariage' },
  { id: 'carte',       label: 'Carte',           emoji: '💌', category: 'mariage' },
  // Formes décoratives
  { id: 'losange',     label: 'Losange',         emoji: '◆', category: 'formes' },
  { id: 'etoile6',     label: 'Étoile 6pts',     emoji: '✦', category: 'formes' },
  { id: 'fleche_bas',  label: 'Flèche bas',      emoji: '↓', category: 'formes' },
  { id: 'croix',       label: 'Croix ornée',     emoji: '✚', category: 'formes' },
  { id: 'fleur4',      label: 'Fleur 4pts',      emoji: '✿', category: 'formes' },
  { id: 'vague',       label: 'Vague',           emoji: '〰', category: 'formes' },
  { id: 'point',       label: 'Point',           emoji: '·', category: 'formes' },
  { id: 'trefle',      label: 'Trèfle',          emoji: '☘️', category: 'formes' },
];

export const ICON_CATEGORIES: { id: IconItem['category']; label: string }[] = [
  { id: 'fleurs',      label: '🌸 Fleurs' },
  { id: 'nature',      label: '🌿 Nature' },
  { id: 'amour',       label: '❤️ Amour' },
  { id: 'celebration', label: '🥂 Fête' },
  { id: 'mariage',     label: '💍 Mariage' },
  { id: 'formes',      label: '◆ Formes' },
];
