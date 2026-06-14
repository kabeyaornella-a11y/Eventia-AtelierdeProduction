// Centralised content data for Eventia Signature
import ecrinsImg from "@/assets/collection-ecrins.jpg";
import portesImg from "@/assets/collection-portes.jpg";
import voilesImg from "@/assets/collection-voiles.jpg";
import unionImg from "@/assets/collection-union.jpg";
import versaillesImg from "@/assets/exp-versailles.jpg";
import aubeImg from "@/assets/exp-aube-celeste.jpg";
import brumeImg from "@/assets/exp-brume-royale.jpg";
import heritageImg from "@/assets/exp-heritage-royal.jpg";
import lumiereImg from "@/assets/exp-lumiere-soie.jpg";
import jardinImg from "@/assets/exp-jardin-suspendu.jpg";
import sultanImg from "@/assets/exp-sultan-noir.jpg";
import operaImg from "@/assets/exp-opera-blanc.jpg";
import etoileImg from "@/assets/exp-etoile-orient.jpg";
import veloursImg from "@/assets/exp-velours-imperial.jpg";
import palaisImg from "@/assets/exp-palais-minuit.jpg";
import reveImg from "@/assets/exp-reve-ivoire.jpg";
import stdVideoImg from "@/assets/std-video.jpg";
import stdCineImg from "@/assets/std-cinematique.jpg";
import stdSurImg from "@/assets/std-surmesure.jpg";

export type Collection = {
  slug: "ecrins" | "portes" | "voiles" | "union";
  name: string;
  tagline: string;
  description: string;
  manifesto: string;
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "voiles",
    name: "Les Voiles",
    tagline: "Un voile qui se soulève.",
    description: "Une lumière qui apparaît. Une annonce qui se révèle avec douceur.",
    manifesto:
      "Un voile qui se soulève. Une lumière qui apparaît. Une annonce qui se révèle avec douceur.",
    image: voilesImg,
  },
  {
    slug: "portes",
    name: "Les Seuils",
    tagline: "Un passage.",
    description: "Une ouverture. Le moment où une histoire commence.",
    manifesto: "Un passage. Une ouverture. Le moment où une histoire commence.",
    image: portesImg,
  },
  {
    slug: "ecrins",
    name: "Les Écrins",
    tagline: "Pensé pour révéler ce qui compte le plus.",
    description: "Une expérience délicate, intime et précieuse.",
    manifesto:
      "Un écrin pensé pour révéler ce qui compte le plus. Une expérience délicate, intime et précieuse.",
    image: ecrinsImg,
  },
  {
    slug: "union",
    name: "L'Union",
    tagline: "Deux histoires.",
    description: "Deux chemins. Une célébration partagée avec ceux qui comptent.",
    manifesto: "Deux histoires. Deux chemins. Une célébration partagée avec ceux qui comptent.",
    image: unionImg,
  },
];

export type Experience = {
  slug: string;
  name: string;
  univers: Collection["slug"];
  ambiance: string;
  story: string;
  inspiration: string;
  palette: string[];
  music: string;
  image: string;
  gallery?: string[];
  priceFrom: number;
  immersion: "Délicate" | "Signature" | "Spectaculaire";
};

export const experiences: Experience[] = [
  {
    slug: "versailles-dor",
    name: "Versailles d'Or",
    univers: "portes",
    ambiance: "Royal français",
    story:
      "Une porte de palais s'ouvre dans une lumière champagne. L'annonce devient une entrée solennelle dans l'univers du mariage.",
    inspiration: "Versailles, dorures anciennes, salons de château, lumière de fin d'après-midi",
    palette: ["#120B08", "#2A1711", "#F7EFE3", "#D8B873", "#C8A76A"],
    music: "Piano et cordes, majestueux et doux",
    image: versaillesImg,
    gallery: [versaillesImg, heritageImg, veloursImg],
    priceFrom: 269,
    immersion: "Spectaculaire",
  },
  {
    slug: "heritage-sacre",
    name: "L'Héritage Sacré",
    univers: "portes",
    ambiance: "Patrimonial",
    story:
      "Une ouverture chaude, enracinée et symbolique. Les matières anciennes donnent à l'annonce une profondeur presque cérémonielle.",
    inspiration: "Portes sculptées, héritage familial, lumière ambrée, mémoire des lignées",
    palette: ["#2A1711", "#6A4538", "#B88A3A", "#F7EFE3"],
    music: "Cordes graves et percussions feutrées",
    image: heritageImg,
    gallery: [heritageImg, versaillesImg, sultanImg],
    priceFrom: 269,
    immersion: "Spectaculaire",
  },
  {
    slug: "sultana-noire",
    name: "Sultana Noire",
    univers: "portes",
    ambiance: "Oriental chic",
    story:
      "Un seuil noir et or, profond, mystérieux et raffiné. L'expérience installe une présence forte sans jamais tomber dans l'excès.",
    inspiration: "Palais oriental, velours noir, arabesques dorées, lumière nocturne",
    palette: ["#0F0B08", "#2B1A12", "#8B6A2E", "#B88A3A", "#E9D5B5"],
    music: "Oud discret, cordes lentes, souffle nocturne",
    image: sultanImg,
    gallery: [sultanImg, etoileImg, palaisImg],
    priceFrom: 269,
    immersion: "Spectaculaire",
  },
  {
    slug: "divina",
    name: "Divina",
    univers: "portes",
    ambiance: "Céleste",
    story:
      "Une lumière claire traverse une architecture sacrée. Le rendu reste pur, noble et apaisé.",
    inspiration: "Portes blanches, architecture céleste, lumière ivoire, atmosphère bénie",
    palette: ["#FFF8EC", "#F7EFE3", "#D8B873", "#C8A76A"],
    music: "Piano, violon et nappes très douces",
    image: operaImg,
    gallery: [operaImg, reveImg, lumiereImg],
    priceFrom: 269,
    immersion: "Signature",
  },
  {
    slug: "pure-majeste",
    name: "Pure Majesté",
    univers: "portes",
    ambiance: "Minimal royal",
    story:
      "Une scène plus épurée, sculptée par le blanc, l'ivoire et l'or. La majesté vient du silence et de la précision.",
    inspiration:
      "Architecture blanche, dorure fine, luxe minimal, composition parfaitement centrée",
    palette: ["#FFFFFF", "#FBF8F4", "#E9D5B5", "#D4B07A"],
    music: "Piano clair, cordes tenues",
    image: reveImg,
    gallery: [reveImg, operaImg, versaillesImg],
    priceFrom: 269,
    immersion: "Signature",
  },
  {
    slug: "elegance-royale",
    name: "Élégance Royale",
    univers: "portes",
    ambiance: "Chic parisien",
    story:
      "Un seuil clair, sophistiqué, presque haussmannien. L'annonce prend une allure de réception privée très élégante.",
    inspiration: "Paris, salons classiques, bleu pâle, ivoire, dorure discrète",
    palette: ["#F7EFE3", "#E9D5B5", "#B8AFC7", "#B88A3A"],
    music: "Piano jazz élégant et cordes légères",
    image: brumeImg,
    gallery: [brumeImg, versaillesImg, operaImg],
    priceFrom: 269,
    immersion: "Signature",
  },
  {
    slug: "nude-eternel",
    name: "Nude Éternel",
    univers: "voiles",
    ambiance: "Nude couture",
    story:
      "Des teintes douces, de la lumière et un voile qui laisse apparaître l'annonce avec une élégance contemporaine.",
    inspiration: "Soie nude, lumière naturelle, mariage éditorial contemporain",
    palette: ["#FBF8F4", "#F2E7D5", "#E9D5B5", "#D4B07A"],
    music: "Piano doux, textures aériennes",
    image: aubeImg,
    gallery: [aubeImg, lumiereImg, reveImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "aube-celeste",
    name: "Aube Céleste",
    univers: "voiles",
    ambiance: "Lumineuse",
    story:
      "Une aube se lève derrière des voiles clairs. L'expérience respire la tendresse, la lumière et la promesse.",
    inspiration: "Aube, voiles ivoire, lumière nacrée, atmosphère romantique",
    palette: ["#FBF8F4", "#F7E0DA", "#E9D5B5", "#D4B07A"],
    music: "Piano contemplatif et cordes fines",
    image: aubeImg,
    gallery: [aubeImg, lumiereImg, reveImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "passion-imperiale",
    name: "Passion Impériale",
    univers: "voiles",
    ambiance: "Solaire",
    story:
      "Une lumière chaude, intense et profonde. L'annonce devient un moment de présence et de chaleur maîtrisée.",
    inspiration: "Rouge profond, or doux, chaleur provençale, réception familiale premium",
    palette: ["#3A0A0A", "#6B1A1A", "#B88A3A", "#F7EFE3"],
    music: "Cordes chaudes, piano émotionnel",
    image: veloursImg,
    gallery: [veloursImg, sultanImg, aubeImg],
    priceFrom: 179,
    immersion: "Signature",
  },
  {
    slug: "lumiere-pure",
    name: "Lumière Pure",
    univers: "voiles",
    ambiance: "Épurée",
    story:
      "Une expérience douce et silencieuse, portée par la clarté, l'espace et une lumière presque méditative.",
    inspiration: "Minimalisme luxueux, art contemporain, ivoire et lumière blanche",
    palette: ["#FFFFFF", "#FBF8F4", "#E9D5B5", "#D4B07A"],
    music: "Piano minimal et nappes lumineuses",
    image: lumiereImg,
    gallery: [lumiereImg, reveImg, operaImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "reve-lavande",
    name: "Rêve Lavande",
    univers: "voiles",
    ambiance: "Bord de mer",
    story:
      "Un voile lavande traverse un horizon doux. L'annonce se déploie comme une respiration entre ciel, vent et promesse.",
    inspiration: "Lavande pâle, horizon marin, poésie du grand air",
    palette: ["#F7EFE3", "#DCD4F2", "#C7B49A", "#8B7355"],
    music: "Violon doux et piano léger",
    image: reveImg,
    gallery: [reveImg, aubeImg, brumeImg],
    priceFrom: 179,
    immersion: "Signature",
  },
  {
    slug: "eclipse-royale",
    name: "Éclipse Royale",
    univers: "voiles",
    ambiance: "Prestige Riviera",
    story:
      "La lumière se retire puis revient, comme un horizon qui révèle l'union. Un univers fort, solaire et spectaculaire.",
    inspiration: "Ciel profond, Riviera, pierre dorée, panorama de destination wedding",
    palette: ["#0A0F2E", "#1B2A6E", "#C7B49A", "#FBF8F4"],
    music: "Piano et violon cinématographiques",
    image: palaisImg,
    gallery: [palaisImg, etoileImg, versaillesImg],
    priceFrom: 179,
    immersion: "Spectaculaire",
  },
  {
    slug: "noche-divine",
    name: "Noche Divine",
    univers: "voiles",
    ambiance: "Nocturne douce",
    story:
      "Une nuit profonde et élégante, traversée d'une lumière délicate. La célébration semble déjà commencer sous les étoiles.",
    inspiration: "Nuit bleutée, étoiles, château de charme, lumière ancienne",
    palette: ["#0A0F2E", "#1B2A6E", "#C8A76A", "#FFF8EC"],
    music: "Piano nocturne et cordes lentes",
    image: palaisImg,
    gallery: [palaisImg, brumeImg, aubeImg],
    priceFrom: 179,
    immersion: "Signature",
  },
  {
    slug: "elegance-eucalyptus",
    name: "Élégance Eucalyptus",
    univers: "ecrins",
    ambiance: "Végétal chic",
    story:
      "Un écrin vert tendre et ivoire. L'annonce se révèle avec fraîcheur, retenue et raffinement naturel.",
    inspiration: "Eucalyptus, jardin romantique, papier coton, dorure fine",
    palette: ["#FBF8F4", "#E8EAD8", "#7A8C6F", "#C7B49A"],
    music: "Piano jazz léger et harpe",
    image: jardinImg,
    gallery: [jardinImg, brumeImg, lumiereImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "velours-royal",
    name: "Velours Royal",
    univers: "ecrins",
    ambiance: "Velours profond",
    story:
      "Une matière sombre, noble et enveloppante. L'annonce prend la douceur d'un coffret précieux.",
    inspiration: "Velours, dorure, réception généreuse, Bordeaux et château",
    palette: ["#120B08", "#3A0A0A", "#B88A3A", "#F7EFE3"],
    music: "Piano soul instrumental et cordes chaudes",
    image: veloursImg,
    gallery: [veloursImg, sultanImg, versaillesImg],
    priceFrom: 179,
    immersion: "Signature",
  },
  {
    slug: "lumiere-de-soie",
    name: "Lumière de Soie",
    univers: "ecrins",
    ambiance: "Soie claire",
    story:
      "Une lumière glisse sur la matière, comme sur une étoffe précieuse. La révélation reste douce, intime et très féminine.",
    inspiration: "Soie, Loire, jardin, émotion délicate",
    palette: ["#FBF8F4", "#E9D5B5", "#D4B07A", "#FFF8EC"],
    music: "Piano romantique et cordes fines",
    image: lumiereImg,
    gallery: [lumiereImg, aubeImg, reveImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "onyx-royal",
    name: "Onyx Royal",
    univers: "ecrins",
    ambiance: "Noir précieux",
    story:
      "Un écrin noir, profond et doré. L'expérience parle aux couples qui recherchent une noblesse plus adulte et plus racée.",
    inspiration: "Onyx, pierre ancienne, Bourgogne, doré sobre",
    palette: ["#0F0B08", "#2A1711", "#B88A3A", "#E9D5B5"],
    music: "Jazz piano instrumental, très feutré",
    image: sultanImg,
    gallery: [sultanImg, palaisImg, veloursImg],
    priceFrom: 179,
    immersion: "Signature",
  },
  {
    slug: "entree-sacree",
    name: "L'Entrée Sacrée",
    univers: "union",
    ambiance: "Solennelle",
    story:
      "Deux chemins se rejoignent dans une lumière calme. L'expérience met l'accent sur l'alliance et le sens du moment.",
    inspiration: "Cérémonie, passage, lumière chaude, promesse partagée",
    palette: ["#FBF8F4", "#F2E7D5", "#B88A3A", "#6A4538"],
    music: "Cordes lentes et piano de cérémonie",
    image: heritageImg,
    gallery: [heritageImg, versaillesImg, reveImg],
    priceFrom: 179,
    immersion: "Signature",
  },
  {
    slug: "chemin-des-promesses",
    name: "Le Chemin des Promesses",
    univers: "union",
    ambiance: "Narrative",
    story:
      "Un chemin s'ouvre devant les invités. L'annonce raconte moins une date qu'une avancée vers une promesse.",
    inspiration: "Allée, lumière, narration, marche vers le jour J",
    palette: ["#F7EFE3", "#E9D5B5", "#C8A76A", "#4B3A2A"],
    music: "Piano progressif et cordes lumineuses",
    image: jardinImg,
    gallery: [jardinImg, aubeImg, lumiereImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "promesse-dhorizon",
    name: "Promesse d'Horizon",
    univers: "union",
    ambiance: "Ouverte",
    story:
      "Un horizon clair et respirant. L'expérience donne à l'union une sensation d'élan, de liberté et de projection.",
    inspiration: "Horizon, ciel clair, destination wedding, promesse ouverte",
    palette: ["#FBF8F4", "#DCD4F2", "#C7B49A", "#8B7355"],
    music: "Guitare douce, piano et cordes légères",
    image: brumeImg,
    gallery: [brumeImg, reveImg, aubeImg],
    priceFrom: 179,
    immersion: "Délicate",
  },
  {
    slug: "danse-sous-les-etoiles",
    name: "Danse sous les Étoiles",
    univers: "union",
    ambiance: "Nocturne festive",
    story:
      "Une nuit élégante, un mouvement, une lumière. L'expérience annonce une célébration vivante et mémorable.",
    inspiration: "Étoiles, soirée, piste de danse, champagne, lumière en mouvement",
    palette: ["#0A0F2E", "#1B2A6E", "#C8A76A", "#FFF8EC"],
    music: "Jazz orchestral instrumental et cordes",
    image: palaisImg,
    gallery: [palaisImg, etoileImg, veloursImg],
    priceFrom: 179,
    immersion: "Signature",
  },
];

export type SaveTheDateFormat = {
  slug: "diy" | "personnalise" | "sur-mesure";
  name: string;
  tagline: string;
  description: string;
  story: string;
  details: string[];
  price: number;
  delay: string;
  image: string;
  video?: string;
};

export const saveTheDateFormats: SaveTheDateFormat[] = [
  {
    slug: "diy",
    name: "Save The Date DIY",
    tagline: "Personnalisation autonome.",
    description: "Vous composez votre annonce vous-même, depuis nos modèles signature.",
    story:
      "Une base éditoriale prête à recevoir vos noms, votre date et votre lieu. Vous ajustez les textes, nous garantissons la mise en scène.",
    details: [
      "Modèle signature au choix",
      "Personnalisation autonome",
      "Partage par lien instantané",
      "Mises à jour illimitées",
    ],
    price: 29,
    delay: "Disponible immédiatement",
    image: stdVideoImg,
    video:
      "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265434/Petales-savethedate_jctfsd.mp4",
  },
  {
    slug: "personnalise",
    name: "Save The Date Personnalisé",
    tagline: "Création réalisée par Eventia.",
    description: "Notre studio compose votre Save The Date à partir de vos informations.",
    story:
      "Vous partagez votre histoire, nous prenons le relais. Mise en page, typographies, rythme, musique : tout est ajusté par notre direction artistique.",
    details: [
      "Composition par notre studio",
      "Direction artistique ajustée",
      "Une révision incluse",
      "Livraison soignée",
    ],
    price: 59,
    delay: "Livraison sous 7 jours",
    image: stdCineImg,
    video:
      "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265257/L_%C3%A9crin-savethedate_kznzhv.mp4",
  },
  {
    slug: "sur-mesure",
    name: "Save The Date Sur Mesure",
    tagline: "Création exclusive.",
    description: "Une pièce pensée avec vous, sans modèle préexistant.",
    story:
      "Nous concevons votre Save The Date à partir d'une page blanche. Direction artistique dédiée, narration écrite avec vous, atmosphère composée pièce par pièce.",
    details: [
      "Direction artistique dédiée",
      "Création originale exclusive",
      "Révisions sur mesure",
      "Suivi personnalisé",
    ],
    price: 89,
    delay: "Sur devis",
    image: stdSurImg,
    video:
      "https://res.cloudinary.com/didid8vcu/video/upload/q_auto/f_auto/v1776265437/Alliances-savethedate_wm2wzt.mp4",
  },
];

export const offers = [
  {
    slug: "essentielle",
    name: "L'Essentielle",
    price: 179,
    tagline: "L'élégance fondamentale.",
    description: "Tout ce qu'il faut pour annoncer avec grâce, sans superflu.",
    features: [
      "Invitation digitale signature",
      "RSVP & suivi en temps réel",
      "Programme intégré",
      "Lieux & itinéraires",
      "Envoi illimité",
      "Modifications possibles à vie",
    ],
  },
  {
    slug: "signature",
    name: "La Signature",
    price: 269,
    tagline: "L'expérience complète Eventia.",
    description:
      "L'offre la plus choisie. Le récit complet, du Save The Date au coffre-fort souvenirs.",
    recommended: true,
    features: [
      "Tout de L'Essentielle",
      "Galerie Live des invités",
      "Playlist collaborative",
      "Plan de table interactif",
      "QR Codes imprimables",
      "Confirmations en temps réel",
    ],
  },
  {
    slug: "exception",
    name: "L'Exception",
    price: 549,
    tagline: "La haute couture digitale.",
    description: "Pour ceux qui ne veulent rien laisser au hasard. L'expérience absolue.",
    features: [
      "Tout de La Signature",
      "Livre Audio des messages",
      "Hébergements & activités",
      "Multi-langues",
      "Support prioritaire dédié",
      "Coffre-fort souvenirs à vie",
    ],
  },
];

export const reassurance = [
  "Paiement unique",
  "Sans abonnement",
  "Envoi illimité",
  "Confirmations en temps réel",
  "Modifications possibles",
  "Paiement en 3 ou 4 fois sans frais",
  "Compatible France et international",
];

export const eventTypes = [
  "Mariage",
  "Fiançailles",
  "Naissance",
  "Baptême",
  "Anniversaire",
  "Baby Shower",
  "Gender Reveal",
  "Sur mesure",
];

export const modules = [
  { id: "rsvp", name: "RSVP & suivi invités", price: 0, included: true },
  { id: "programme", name: "Programme intégré", price: 0, included: true },
  { id: "lieux", name: "Lieux & itinéraires", price: 0, included: true },
  { id: "galerie", name: "Galerie Live", price: 29 },
  { id: "playlist", name: "Playlist collaborative", price: 29 },
  { id: "plan", name: "Plan de table interactif", price: 39 },
  { id: "audio", name: "Livre Audio", price: 49 },
  { id: "hebergements", name: "Hébergements", price: 29 },
  { id: "activites", name: "Activités locales", price: 29 },
  { id: "qr", name: "QR Codes imprimables", price: 19 },
  { id: "multi", name: "Multi-langues", price: 39 },
];

export const atelierProducts = [
  {
    name: "Papeterie",
    description: "Faire-parts, cartons et livrets imprimés.",
    priceFrom: 4.5,
    category: "Papier",
  },
  {
    name: "Menus",
    description: "Menus imprimés sur papier signature.",
    priceFrom: 3.5,
    category: "Papier",
  },
  {
    name: "Marque-places",
    description: "Calligraphie, dorure à chaud, papier coton.",
    priceFrom: 3.5,
    category: "Papier",
  },
  {
    name: "Plans de table",
    description: "Plans imprimés et panneaux d'affichage.",
    priceFrom: 39,
    category: "Signalétique",
  },
  {
    name: "QR codes imprimés",
    description: "QR codes ciselés sur papier, acrylique ou bois.",
    priceFrom: 13,
    category: "Signalétique",
  },
  {
    name: "Welcome boards",
    description: "Panneaux d'accueil personnalisés.",
    priceFrom: 49,
    category: "Signalétique",
  },
  {
    name: "Panneaux",
    description: "Panneaux directionnels et d'honneur.",
    priceFrom: 39,
    category: "Signalétique",
  },
  {
    name: "Signalétique",
    description: "Ensemble signalétique cohérent pour votre lieu.",
    priceFrom: 89,
    category: "Signalétique",
  },
  {
    name: "Gravure",
    description: "Gravure laser sur bois, acrylique, métal.",
    priceFrom: 35,
    category: "Objets",
  },
  {
    name: "Vinyle",
    description: "Découpes vinyle pour vitres, miroirs, panneaux.",
    priceFrom: 25,
    category: "Objets",
  },
  {
    name: "Cadeaux personnalisés",
    description: "Cadeaux invités composés à votre image.",
    priceFrom: 8.5,
    category: "Cadeaux",
  },
  {
    name: "Coffrets témoins",
    description: "Coffrets pour vos témoins et proches.",
    priceFrom: 49,
    category: "Cadeaux",
  },
  {
    name: "Coffrets invités",
    description: "Coffrets d'accueil pour vos invités.",
    priceFrom: 28,
    category: "Cadeaux",
  },
];

export const partnerCategories = [
  "Wedding Planners",
  "Photographes",
  "Lieux de réception",
  "Traiteurs",
  "Décorateurs",
  "DJ & musiciens",
  "Vidéastes",
  "Créateurs",
];

export const faq = [
  {
    q: "Faut-il télécharger une application ?",
    a: "Aucune. Tout fonctionne dans le navigateur, pour vous et vos invités. Un simple lien suffit.",
  },
  {
    q: "Puis-je envoyer l'invitation à tous mes invités ?",
    a: "Oui, l'envoi est illimité et sans surcoût. Lien personnalisé, email ou QR Code.",
  },
  {
    q: "Peut-on modifier les informations après l'envoi ?",
    a: "Oui, toutes les modifications sont possibles à tout moment, en temps réel, sans limite.",
  },
  {
    q: "Le paiement est-il unique ?",
    a: "Oui. Paiement unique, sans abonnement. Possibilité en 3 ou 4 fois sans frais.",
  },
  {
    q: "Les RSVP sont-ils suivis en temps réel ?",
    a: "Oui, chaque réponse vous est notifiée instantanément dans votre espace client.",
  },
  {
    q: "Peut-on créer une expérience sur mesure ?",
    a: "Bien sûr. Notre direction artistique conçoit une expérience écrite à partir de votre histoire, sans modèle préexistant.",
  },
  {
    q: "Proposez-vous aussi des objets physiques ?",
    a: "Oui, via Eventia Atelier : papeterie, signalétique, coffrets, gravure et bien plus.",
  },
  {
    q: "Combien de temps avant l'événement faut-il commander ?",
    a: "Idéalement 2 à 3 mois avant. Mais nous savons aussi travailler en délais courts.",
  },
  {
    q: "Peut-on personnaliser entièrement les textes ?",
    a: "Oui, chaque ligne est personnalisable. Nous proposons aussi un accompagnement rédactionnel.",
  },
  {
    q: "Les invités peuvent-ils répondre depuis leur mobile ?",
    a: "Oui, l'expérience est pensée mobile-first. Aucun téléchargement nécessaire.",
  },
  {
    q: "Peut-on inviter dans plusieurs langues ?",
    a: "Oui, avec l'offre L'Exception ou en module additionnel. Jusqu'à 6 langues simultanées.",
  },
  {
    q: "Comment fonctionne la Galerie Live ?",
    a: "Vos invités envoient leurs photos via un lien dédié. Tout s'affiche en temps réel sur l'expérience.",
  },
  {
    q: "Et la Playlist collaborative ?",
    a: "Chaque invité peut proposer des titres avant l'événement. Vous validez. Le DJ a tout en main.",
  },
  {
    q: "Peut-on imprimer des QR Codes pour la salle ?",
    a: "Oui, nous livrons des QR Codes prêts à imprimer ou en version acrylique via l'Atelier.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Hébergement européen, chiffrement SSL, conformité RGPD complète. Vos invités ne sont jamais sollicités.",
  },
  {
    q: "Que se passe-t-il après l'événement ?",
    a: "L'expérience reste accessible. Avec L'Exception, vous bénéficiez d'un coffre-fort souvenirs à vie.",
  },
  {
    q: "Puis-je tester avant d'acheter ?",
    a: "Oui, nous proposons une démo personnalisée gratuite. Contactez-nous.",
  },
  {
    q: "Comment se passe l'accompagnement ?",
    a: "Un référent unique vous accompagne du brief à l'événement. Échanges illimités.",
  },
  {
    q: "Peut-on commander uniquement l'Atelier ?",
    a: "Oui, l'Atelier est accessible indépendamment des expériences digitales.",
  },
  {
    q: "Travaillez-vous avec des wedding planners ?",
    a: "Oui, nous avons un programme partenaires dédié. Conditions spécifiques sur demande.",
  },
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Aucun. Le tarif annoncé est le tarif final. Tout est inclus.",
  },
  {
    q: "Puis-je changer d'offre en cours de route ?",
    a: "Oui, vous pouvez évoluer vers une offre supérieure à tout moment. Vous ne payez que la différence.",
  },
];

// Les vidéos Cloudinary officielles sont centralisées dans src/lib/cloudinary-models.ts (source unique).
