/**
 * Modèle de données du contenu d'invitation ("blocks"), partagé entre le
 * Studio (édition) et la page invité (affichage).
 *
 * Structure de référence établie le 2026-07-19 après audit de la mécanique
 * concurrente (The Digital Yes, The Digital Invite) : ossature commune
 * Programme / Dress code / Hébergement / Transport / Cadeaux / FAQ.
 */

export type ProgrammeItem = { time: string; title: string; description: string };
export type FaqItem = { q: string; a: string };
export type TitledBlock = { title: string; description: string };
export type AccommodationOption = {
  name: string;
  area: string;
  notes: string;
  promo_code?: string;
  booking_url?: string;
};

export type InvitationBlocks = {
  hero_title?: string;
  hero_subtitle?: string;
  welcome_message?: string;
  story?: string;
  programme?: ProgrammeItem[];
  dress_code?: TitledBlock;
  faq?: FaqItem[];
  gifts?: TitledBlock;
  /** v2 : liste structurée. Les invitations générées avant le 2026-07-19
   * peuvent encore stocker une chaîne libre — toujours lire via
   * `normalizeAccommodations`. */
  accommodations?: AccommodationOption[] | string;
  transport?: TitledBlock;
  thank_you?: string;
  /** Image de cadre ornemental (PNG, centre transparent) pour habiller les
   * cartes d'info (hébergement...) façon écrin. Optionnel — sans elle, les
   * cartes restent dans le style actuel. À choisir dans la Médiathèque admin
   * (onglet Décorations) ou coller une URL Cloudinary directement. */
  frame_url?: string;
};

/** Convertit un ancien bloc "accommodations" texte libre en liste v2. */
export function normalizeAccommodations(
  value: InvitationBlocks["accommodations"],
): AccommodationOption[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    return [{ name: "Hébergement", area: "", notes: value, promo_code: "", booking_url: "" }];
  }
  return [];
}
