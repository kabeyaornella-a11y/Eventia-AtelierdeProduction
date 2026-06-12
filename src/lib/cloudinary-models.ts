// Catalogue centralisé des animations Cloudinary Eventia Signature
export type CloudinaryModel = {
  slug: string;
  name: string;
  video: string;
};

export const ecrinsModels: CloudinaryModel[] = [
  { slug: "elegance-eucalyptus", name: "Élégance Eucalyptus", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775560998/les-ecrins/Elegance-Eucalyptus.mp4" },
  { slug: "velours-royal", name: "Velours Royal", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775561000/les-ecrins/Velours-Royal.mp4" },
  { slug: "lumiere-de-soie", name: "Lumière de Soie", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775561000/les-ecrins/Lumiere-de-Soie.mp4" },
  { slug: "onyx-royal", name: "Onyx Royal", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775561001/les-ecrins/Onyx-Royal.mp4" },
];

export const unionModels: CloudinaryModel[] = [
  { slug: "entree-sacree", name: "L'Entrée Sacrée", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775501186/l-union/L-Entree-Sacree.mp4" },
  { slug: "chemin-des-promesses", name: "Le Chemin des Promesses", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775501182/l-union/Le-Chemin-des-Promesses.mp4" },
  { slug: "promesse-dhorizon", name: "Promesse d'Horizon", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775501186/l-union/Promesse-d-Horizon.mp4" },
  { slug: "danse-sous-les-etoiles", name: "Danse sous les Étoiles", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775501187/l-union/Danse-sous-les-Etoiles.mp4" },
];

export const voilesModels: CloudinaryModel[] = [
  { slug: "nude-eternel", name: "Nude Éternel", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775508029/les-voiles/Nude-Eternel.mp4" },
  { slug: "aube-celeste", name: "Aube Céleste", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775508032/les-voiles/Aube-Celeste.mp4" },
  { slug: "passion-imperiale", name: "Passion Impériale", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775508826/les-voiles/Passion-Imperiale.mp4" },
  { slug: "lumiere-pure", name: "Lumière Pure", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775510415/les-voiles/Lumiere-Pure.mp4" },
  { slug: "reve-lavande", name: "Rêve Lavande", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775508826/les-voiles/Reve-Lavande.mp4" },
  { slug: "eclipse-royale", name: "Éclipse Royale", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775508034/les-voiles/Eclipse-Royale.mp4" },
  { slug: "noche-divine", name: "Noche Divine", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775508033/les-voiles/Noche-Divine.mp4" },
];

export const seuilsModels: CloudinaryModel[] = [
  { slug: "versailles-dor", name: "Versailles d'Or", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775227111/les-seuils/Versailles-Or.mp4" },
  { slug: "heritage-sacre", name: "L'Héritage Sacré", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775227109/les-seuils/Heritage-Sacre.mp4" },
  { slug: "sultana-noire", name: "Sultana Noire", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775227111/les-seuils/Sultana-Noire.mp4" },
  { slug: "divina", name: "Divina", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775227111/les-seuils/Divina.mp4" },
  { slug: "pure-majeste", name: "Pure Majesté", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775227105/les-seuils/Pure-Majeste.mp4" },
  { slug: "elegance-royale", name: "Élégance Royale", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1775227108/les-seuils/Elegance-Royale.mp4" },
];

export const saveTheDateModels: CloudinaryModel[] = [
  { slug: "ecrin", name: "L'Écrin", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265257/L_%C3%A9crin-savethedate_kznzhv.mp4" },
  { slug: "petales-de-roses", name: "Pétales de Roses", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265434/Petales-savethedate_jctfsd.mp4" },
  { slug: "feux-dartifices", name: "Feux d'Artifices", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265436/Firework-savethedate_dvbtxo.mp4" },
  { slug: "alliances-dorees", name: "Alliances Dorées", video: "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265437/Alliances-savethedate_wm2wzt.mp4" },
];

export const allModels: CloudinaryModel[] = [
  ...ecrinsModels, ...unionModels, ...voilesModels, ...seuilsModels, ...saveTheDateModels,
];

/** Poster (première frame JPG) dérivé d'une URL vidéo Cloudinary — évite le flash noir avant lecture. */
export function cloudinaryPoster(videoUrl: string): string {
  return videoUrl
    .replace("/q_auto/f_auto/", "/so_0,q_auto/")
    .replace(/\.mp4(\?.*)?$/, ".jpg");
}

/** Recherche tolérante par nom (case/accents/tirets-insensible). */
export function findModelByName(name: string): CloudinaryModel | undefined {
  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const target = norm(name);
  return allModels.find((m) => norm(m.name) === target || norm(m.slug) === target);
}
