import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section, SectionHead, GoldButton } from "@/components/site/SiteLayout";
import { saveTheDateFormats } from "@/lib/eventia-data";
import { ModelGrid } from "@/components/site/ModelGrid";
import { saveTheDateModels } from "@/lib/cloudinary-models";

function EnvelopeHero() {
  return (
    <div className="flex justify-center py-10 select-none" aria-hidden="true">
      <div className="relative" style={{ width: 260, height: 170, perspective: "900px" }}>
        {/* Corps de l'enveloppe */}
        <svg viewBox="0 0 260 170" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <rect
            x="1.5"
            y="1.5"
            width="257"
            height="167"
            fill="oklch(0.975 0.012 80)"
            stroke="oklch(0.625 0.105 60)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          {/* Plis latéraux */}
          <polygon
            points="1.5,1.5 1.5,168.5 96,92"
            fill="oklch(0.625 0.105 60)"
            fillOpacity="0.05"
          />
          <polygon
            points="258.5,1.5 258.5,168.5 164,92"
            fill="oklch(0.625 0.105 60)"
            fillOpacity="0.05"
          />
          {/* Pli inférieur */}
          <polygon
            points="1.5,168.5 130,100 258.5,168.5"
            fill="oklch(0.625 0.105 60)"
            fillOpacity="0.07"
          />
        </svg>

        {/* Carte qui monte */}
        <div
          className="absolute left-8 right-8 bg-[oklch(0.88_0.052_80)] border border-primary/25 shadow-gold
                     flex flex-col items-center justify-center gap-1 animate-letter-rise"
          style={{ height: 76, bottom: "28%" }}
        >
          <div className="eyebrow text-[8px]">Save The Date</div>
          <div className="font-script text-xl text-primary mt-0.5">Eventia Signature</div>
          <div className="gold-rule mt-1" />
        </div>

        {/* Rabat qui s'ouvre */}
        <div className="absolute top-0 left-0 w-full" style={{ height: 90, perspective: "900px" }}>
          <svg
            viewBox="0 0 260 90"
            className="w-full animate-envelope-lid"
            style={{ height: 90, transformOrigin: "top center", display: "block" }}
            aria-hidden="true"
          >
            <polygon
              points="1.5,1.5 258.5,1.5 130,87"
              fill="oklch(0.952 0.022 78)"
              stroke="oklch(0.625 0.105 60)"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/save-the-date/")({
  head: () => ({
    meta: [
      { title: "Save The Date — Eventia Signature" },
      {
        name: "description",
        content:
          "Annoncer avant de révéler. Trois formules Save The Date — DIY 29 €, Personnalisé 59 €, Sur mesure 89 € — et quatre modèles signature : L'Écrin, Pétales de Roses, Feux d'Artifices, Alliances Dorées.",
      },
      { property: "og:title", content: "Save The Date — Eventia Signature" },
      { property: "og:description", content: "Annoncez avant de révéler." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/save-the-date" }],
  }),
  component: () => (
    <SiteLayout>
      <Section>
        <SectionHead
          eyebrow="Save The Date"
          title="Une première émotion à partager."
          intro="Avant l'invitation complète, une annonce singulière. Trois formules, quatre modèles signature, une même exigence."
        />
        <EnvelopeHero />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {saveTheDateFormats.map((f) => (
            <Link
              key={f.slug}
              to="/save-the-date/$format"
              params={{ format: f.slug }}
              className="group block bg-ivory shadow-soft overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="font-display text-2xl">{f.name.replace("Save The Date ", "")}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                  {f.description}
                </p>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="font-display text-2xl text-primary">{f.price} €</span>
                  <span className="text-[10px] eyebrow">Découvrir →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link to="/configurateur">
            <GoldButton>Composer mon Save The Date</GoldButton>
          </Link>
        </div>
      </Section>
      <ModelGrid
        eyebrow="La collection Save The Date"
        title="Quatre modèles signature"
        models={saveTheDateModels}
      />
    </SiteLayout>
  ),
});
