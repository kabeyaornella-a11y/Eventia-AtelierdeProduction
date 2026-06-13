import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, Section, SectionHead } from "@/components/site/SiteLayout";
import { collections, experiences } from "@/lib/eventia-data";
import { MagazineGallery } from "@/components/site/premium/MagazineGallery";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Expériences — Eventia Signature" },
      { name: "description", content: "Toutes nos expériences signature. Filtrez par univers, ambiance et niveau d'immersion." },
      { property: "og:title", content: "Expériences — Eventia Signature" },
      { property: "og:description", content: "Trouvez l'expérience qui vous ressemble." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/experiences" }],
  }),
  component: ExperiencesIndex,
});

function ExperiencesIndex() {
  const [univers, setUnivers] = useState<string>("all");
  const [immersion, setImmersion] = useState<string>("all");
  const filtered = useMemo(
    () =>
      experiences.filter(
        (e) => (univers === "all" || e.univers === univers) && (immersion === "all" || e.immersion === immersion),
      ),
    [univers, immersion],
  );

  return (
    <SiteLayout>
      {/* Hero éditorial */}
      <Section className="text-center max-w-4xl">
        <SectionHead
          eyebrow="Catalogue éditorial"
          title="Les expériences signées Eventia."
        />
        <p className="font-serif-soft italic text-lg md:text-xl text-muted-foreground mt-4 leading-relaxed">
          Quatre univers, une vingtaine d'expériences. Chaque composition est pensée
          comme une scène de cinéma : un décor, une lumière, un récit qui se déploie.
        </p>
        <div className="gold-rule mx-auto mt-10" />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <select
            value={univers}
            onChange={(e) => setUnivers(e.target.value)}
            className="px-4 py-2.5 bg-ivory border border-border text-sm"
          >
            <option value="all">Tous les univers</option>
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select
            value={immersion}
            onChange={(e) => setImmersion(e.target.value)}
            className="px-4 py-2.5 bg-ivory border border-border text-sm"
          >
            <option value="all">Tous les niveaux d'immersion</option>
            <option value="Délicate">Délicate</option>
            <option value="Signature">Signature</option>
            <option value="Spectaculaire">Spectaculaire</option>
          </select>
          <button
            onClick={() => { setUnivers("all"); setImmersion("all"); }}
            className="text-xs eyebrow text-primary"
          >
            Réinitialiser
          </button>
        </div>

        <MagazineGallery items={filtered} collections={collections} />
      </Section>
    </SiteLayout>
  );
}

