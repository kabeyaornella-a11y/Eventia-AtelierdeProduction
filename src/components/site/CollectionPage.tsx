import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { Collection } from "@/lib/eventia-data";
import { collections, experiences } from "@/lib/eventia-data";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { ModelGrid } from "@/components/site/ModelGrid";
import {
  ecrinsModels,
  seuilsModels,
  voilesModels,
  unionModels,
  cloudinaryPoster,
} from "@/lib/cloudinary-models";
import {
  ExperienceLightbox,
  type LightboxExperience,
} from "@/components/site/premium/ExperienceLightbox";
import { MagazineGallery } from "@/components/site/premium/MagazineGallery";

const collectionModels: Record<Collection["slug"], { models: typeof ecrinsModels; label: string }> =
  {
    ecrins: { models: ecrinsModels, label: "Les Écrins · animations signature" },
    portes: { models: seuilsModels, label: "Les Seuils · révélations cinématographiques" },
    voiles: { models: voilesModels, label: "Les Voiles · poésie en mouvement" },
    union: { models: unionModels, label: "L'Union · l'instant qui scelle" },
  };

const pillars: Record<
  Collection["slug"],
  { title: string; lines: string[]; palette: string[]; mood: string }
> = {
  ecrins: {
    title: "Le geste de l'orfèvre",
    lines: [
      "Cachets de cire et calligraphie à la plume.",
      "Papier coton, dorure à chaud, pliage à la main.",
      "Une émotion confidentielle, comme un bijou rare.",
    ],
    palette: ["#FBF8F4", "#F2E7D5", "#E9D5B5", "#D4B07A", "#B88A3A"],
    mood: "Précieux · Intime · Délicat",
  },
  portes: {
    title: "Le seuil que l'on franchit",
    lines: [
      "Architecture, lumière dorée, attente théâtrale.",
      "Un effet de révélation cinématographique.",
      "L'annonce devient un événement à part entière.",
    ],
    palette: ["#F7EFE3", "#E9D5B5", "#D4B07A", "#B88A3A", "#4B3A2A"],
    mood: "Majestueux · Théâtral · Spectaculaire",
  },
  voiles: {
    title: "La danse de la lumière",
    lines: [
      "Tissus suspendus, transparences, souffles dorés.",
      "Chaque image respire, chaque mouvement chante.",
      "Pour les âmes rêveuses et les unions couture.",
    ],
    palette: ["#FBF8F4", "#F7E0DA", "#E9D5B5", "#D4B07A", "#C7B49A"],
    mood: "Poétique · Aérien · Lumineux",
  },
  union: {
    title: "Deux histoires, une lumière",
    lines: [
      "Les regards qui se croisent, les mains qui se trouvent.",
      "L'intime devient sublime, sans jamais s'effacer.",
      "La collection la plus humaine de notre maison.",
    ],
    palette: ["#FBF8F4", "#F2E7D5", "#E9D5B5", "#D4B07A", "#8B6A4E"],
    mood: "Émotion · Fusion · Destin",
  },
};

export function CollectionPage({ slug }: { slug: Collection["slug"] }) {
  const c = collections.find((x) => x.slug === slug)!;
  const exps = experiences.filter((e) => e.univers === slug);
  const p = pillars[slug];
  const [lightbox, setLightbox] = useState<LightboxExperience | null>(null);

  // Premier modèle vidéo de la collection = ouverture immersive
  const firstModel = collectionModels[slug].models[0];
  const heroExp: LightboxExperience = exps[0]
    ? {
        slug: exps[0].slug,
        name: c.name,
        story: c.manifesto,
        image: c.image,
        univers: slug,
        priceFrom: exps[0].priceFrom,
        video: firstModel?.video,
      }
    : {
        slug: "",
        name: c.name,
        story: c.manifesto,
        image: c.image,
        univers: slug,
        video: firstModel?.video,
      };

  return (
    <SiteLayout>
      {/* HERO immersif */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        {firstModel ? (
          <video
            src={firstModel.video}
            poster={cloudinaryPoster(firstModel.video)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/30 to-cacao/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-16 text-ivory">
            <div className="eyebrow !text-primary-soft mb-4">Collection</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">{c.name}</h1>
            <div className="font-serif-soft italic text-xl md:text-2xl text-ivory/90 mt-4">
              {c.tagline}
            </div>
            <button
              onClick={() => setLightbox(heroExp)}
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-ivory/10 hover:bg-primary-soft/20 border border-ivory/30 hover:border-primary-soft text-ivory backdrop-blur-sm transition-colors text-sm tracking-[0.22em] uppercase"
            >
              <span className="grid place-items-center size-8 rounded-full bg-primary-soft/30 group-hover:bg-primary-soft/50">
                <Play className="size-3.5 fill-current ml-0.5" />
              </span>
              Voir l'expérience
            </button>
          </div>
        </div>
      </section>

      {/* MANIFESTE */}
      <Section className="max-w-4xl text-center">
        <div className="eyebrow mb-4">Manifeste</div>
        <p className="font-serif-soft text-2xl md:text-3xl text-foreground/90 leading-relaxed italic">
          {c.manifesto}
        </p>
        <div className="gold-rule mx-auto mt-10" />
      </Section>

      {/* PILIERS + PALETTE */}
      <div className="bg-ivory/60 border-y border-border/60">
        <Section>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <div className="eyebrow">{p.mood}</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">{p.title}</h2>
              <ul className="space-y-4 font-serif-soft italic text-lg text-muted-foreground">
                {p.lines.map((l) => (
                  <li key={l} className="pl-6 border-l-2 border-primary/40">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="eyebrow">Palette signature</div>
              <div className="grid grid-cols-5 gap-3">
                {p.palette.map((h) => (
                  <div
                    key={h}
                    className="aspect-square shadow-soft"
                    style={{ backgroundColor: h }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-background p-5 shadow-soft">
                  <div className="eyebrow text-[10px] mb-2">Typographie</div>
                  <div className="font-display text-2xl">Playfair</div>
                  <div className="font-serif-soft italic text-sm text-muted-foreground">
                    Cormorant Garamond
                  </div>
                </div>
                <div className="bg-background p-5 shadow-soft">
                  <div className="eyebrow text-[10px] mb-2">Atmosphère</div>
                  <div className="font-serif-soft italic text-base text-foreground/85">
                    {p.mood}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* MODÈLES CLOUDINARY. vidéos signature de la collection */}
      <ModelGrid
        eyebrow={collectionModels[slug].label}
        title="Les modèles de la collection"
        models={collectionModels[slug].models}
      />

      {/* EXPÉRIENCES — galerie magazine */}
      {exps.length > 0 && (
        <Section>
          <div className="text-center mb-14">
            <div className="eyebrow mb-3">Expériences {c.name}</div>
            <h2 className="font-display text-3xl md:text-5xl">Les expressions de cet univers</h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>
          <MagazineGallery items={exps} showCollection={false} />
        </Section>
      )}

      {/* CTA */}
      <div className="bg-cacao text-ivory">
        <Section className="text-center">
          <div className="eyebrow !text-primary-soft mb-4">Votre histoire</div>
          <h2 className="font-display text-4xl md:text-5xl">
            Composez votre expérience dans {c.name}
          </h2>
          <p className="font-serif-soft italic text-lg text-ivory/80 mt-4 max-w-2xl mx-auto">
            Notre configurateur vous guide en 8 étapes vers une expérience à votre image.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/configurateur">
              <GoldButton>Composer dans {c.name}</GoldButton>
            </Link>
            <Link to="/experiences">
              <OutlineButton className="!border-ivory/60 !text-ivory hover:!border-primary-soft hover:!text-primary-soft">
                Voir toutes les expériences
              </OutlineButton>
            </Link>
          </div>
        </Section>
      </div>

      <ExperienceLightbox experience={lightbox} onClose={() => setLightbox(null)} />
    </SiteLayout>
  );
}
