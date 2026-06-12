// Liens Gumroad — à remplacer par les URLs réelles depuis ton dashboard Gumroad.
// Format attendu : https://gumroad.com/l/xxxxx ou https://eventia.gumroad.com/l/xxxxx
// Tu peux modifier directement ce fichier sans toucher au reste du code.

export const GUMROAD_LINKS: Record<string, string> = {
  // Formules principales (configurateur + page Offres)
  essentielle: "https://gumroad.com/l/eventia-essentielle",
  signature: "https://gumroad.com/l/eventia-signature",
  exception: "https://gumroad.com/l/eventia-exception",

  // Save The Date — 3 formats (slugs alignés sur src/lib/eventia-data.ts)
  "std-diy": "https://gumroad.com/l/eventia-std-diy",
  "std-personnalise": "https://gumroad.com/l/eventia-std-personnalise",
  "std-sur-mesure": "https://gumroad.com/l/eventia-std-sur-mesure",
};

export function getGumroadUrl(key: string): string {
  return GUMROAD_LINKS[key] ?? "https://gumroad.com";
}

/**
 * Construit une URL Gumroad avec pré-remplissage email + référence interne.
 * Gumroad accepte ?email= et ?wanted=true (skip overlay).
 */
export function buildGumroadCheckout(key: string, opts: { email?: string; ref?: string } = {}) {
  const base = getGumroadUrl(key);
  try {
    const url = new URL(base);
    url.searchParams.set("wanted", "true");
    if (opts.email) url.searchParams.set("email", opts.email);
    if (opts.ref) url.searchParams.set("ref", opts.ref);
    return url.toString();
  } catch {
    return base;
  }
}
