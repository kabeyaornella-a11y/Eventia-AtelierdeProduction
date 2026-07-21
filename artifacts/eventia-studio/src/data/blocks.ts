import type { BlockMeta, BlockType, Formula } from '../types';

export const BLOCK_META: BlockMeta[] = [
  { type: 'video_intro',  number: 1,  label: 'Vidéo Intro',          icon: '🎬', description: 'Vidéo cinématique d\'ouverture de la collection',       formulaMin: 'essentielle' },
  { type: 'title_names',  number: 2,  label: 'Titre & Noms',         icon: '✦',  description: 'Prénoms des mariés et titre principal',                  formulaMin: 'essentielle' },
  { type: 'date_venue',   number: 3,  label: 'Date & Lieu',          icon: '📍', description: 'Date, heure et lieu de la cérémonie',                    formulaMin: 'essentielle' },
  { type: 'countdown',    number: 4,  label: 'Compte à rebours',     icon: '⏳', description: 'Timer animé jusqu\'au jour J',                           formulaMin: 'essentielle' },
  { type: 'rsvp',         number: 5,  label: 'RSVP',                 icon: '✉️', description: 'Formulaire de réponse des convives',                     formulaMin: 'essentielle' },
  { type: 'map_access',   number: 6,  label: 'Plan & Accès',         icon: '🗺️', description: 'Carte et informations d\'accès',                         formulaMin: 'essentielle' },
  { type: 'share_link',   number: 7,  label: 'Lien de partage',      icon: '🔗', description: 'Bouton de partage de l\'expérience',                     formulaMin: 'essentielle' },
  { type: 'dress_code',   number: 8,  label: 'Dress Code',           icon: '👗', description: 'Consignes vestimentaires et palette de couleurs',        formulaMin: 'signature' },
  { type: 'our_story',    number: 9,  label: 'Notre Histoire',       icon: '💫', description: 'Timeline de l\'histoire des mariés',                     formulaMin: 'signature' },
  { type: 'gallery',      number: 10, label: 'Galerie Photos',       icon: '🖼️', description: 'Galerie de photos des mariés',                           formulaMin: 'signature' },
  { type: 'empreintes',   number: 11, label: 'Empreintes',           icon: '◆',  description: 'Icônes et illustrations personnalisées de la collection', formulaMin: 'signature' },
  { type: 'transport',    number: 12, label: 'Transport & Héberg.',  icon: '🚌', description: 'Navette, hôtels, covoiturage',                           formulaMin: 'exception' },
  { type: 'menu',         number: 13, label: 'Menu',                 icon: '🍽️', description: 'Menu complet du repas',                                  formulaMin: 'exception' },
  { type: 'program',      number: 14, label: 'Programme',            icon: '📅', description: 'Déroulé et activités de la journée',                     formulaMin: 'exception' },
  { type: 'wishlist',     number: 15, label: 'Liste de souhaits',    icon: '🎁', description: 'Liste de cadeaux et souhaits',                           formulaMin: 'exception' },
  { type: 'live_album',   number: 16, label: 'Album Live',           icon: '📸', description: 'QR Code pour les photos des convives',                   formulaMin: 'exception' },
  { type: 'playlist',     number: 17, label: 'Playlist',             icon: '🎵', description: 'Lien Spotify / suggestions musicales',                   formulaMin: 'exception' },
  { type: 'faq',          number: 18, label: 'FAQ',                  icon: '💬', description: 'Questions fréquentes en accordéon',                      formulaMin: 'exception' },
  { type: 'audio_book',   number: 19, label: 'Livre Audio',          icon: '🎙️', description: 'Message vocal ou livre audio des mariés',                formulaMin: 'exception' },
  { type: 'thanks',       number: 20, label: 'Remerciements',        icon: '🤍', description: 'Mot de clôture et signature des mariés',                 formulaMin: 'exception' },
];

export const FORMULA_BLOCKS: Record<Formula, BlockType[]> = {
  essentielle: ['video_intro','title_names','date_venue','countdown','rsvp','map_access','share_link'],
  signature: ['video_intro','title_names','date_venue','countdown','rsvp','map_access','share_link','dress_code','our_story','gallery','empreintes'],
  exception: ['video_intro','title_names','date_venue','countdown','rsvp','map_access','share_link','dress_code','our_story','gallery','empreintes','transport','menu','program','wishlist','live_album','playlist','faq','audio_book','thanks'],
};

export const FORMULA_LABELS: Record<Formula, string> = {
  essentielle: 'L\'Essentielle',
  signature: 'La Signature',
  exception: 'L\'Exception',
};

export function getBlockMeta(type: BlockType): BlockMeta {
  return BLOCK_META.find(b => b.type === type)!;
}

export function isBlockInFormula(type: BlockType, formula: Formula): boolean {
  return FORMULA_BLOCKS[formula].includes(type);
}
