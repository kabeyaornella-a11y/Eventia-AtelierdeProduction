import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section, SectionHead, GoldButton } from "@/components/site/SiteLayout";
import { saveTheDateFormats } from "@/lib/eventia-data";
import { ModelGrid } from "@/components/site/ModelGrid";
import { saveTheDateModels } from "@/lib/cloudinary-models";

export const Route = createFileRoute("/save-the-date/")({
  head: () => ({
    meta: [
      { title: "Save The Date — Eventia Signature" },
      { name: "description", content: "Annoncer avant de révéler. Trois formules Save The Date — DIY 29 €, Personnalisé 59 €, Sur mesure 89 € — et quatre modèles signature : L'Écrin, Pétales de Roses, Feux d'Artifices, Alliances Dorées." },
      { property: "og:title", content: "Save The Date — Eventia Signature" },
      { property: "og:description", content: "Annoncez avant de révéler." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.fr/save-the-date" }],
  }),
  component: () => (
    <SiteLayout>
      <Section>
        <SectionHead
          eyebrow="Save The Date"
          title="Une première émotion à partager."
          intro="Avant l'invitation complète, une annonce singulière. Trois formules, quatre modèles signature, une même exigence."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {saveTheDateFormats.map((f) => (
            <Link
              key={f.slug}
              to="/save-the-date/$format"
              params={{ format: f.slug }}
              className="group block bg-ivory shadow-soft overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img src={f.image} alt={f.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="font-display text-2xl">{f.name.replace("Save The Date ", "")}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">{f.description}</p>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="font-display text-2xl text-primary">{f.price} €</span>
                  <span className="text-[10px] eyebrow">Découvrir →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link to="/configurateur"><GoldButton>Composer mon Save The Date</GoldButton></Link>
        </div>
      </Section>
      <ModelGrid eyebrow="La collection Save The Date" title="Quatre modèles signature" models={saveTheDateModels} />
    </SiteLayout>
  ),
});
