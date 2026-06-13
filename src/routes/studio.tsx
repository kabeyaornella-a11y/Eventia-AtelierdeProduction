import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, Section, SectionHead } from "@/components/site/SiteLayout";
import { listPortfolio } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Eventia Signature" },
      { name: "description", content: "Le portfolio éditorial du Studio Eventia. Mariages, événements et créations signées par notre direction artistique." },
      { property: "og:title", content: "Studio — Eventia Signature" },
      { property: "og:description", content: "Les réalisations du Studio Eventia." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/studio" }],
  }),
  component: StudioPage,
});

const RATIOS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[16/10]", "aspect-square"];
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-12", "md:col-span-6"];

function StudioPage() {
  const fetch = useServerFn(listPortfolio);
  const { data, isLoading } = useQuery({ queryKey: ["portfolio"], queryFn: () => fetch() });
  const items = data?.items ?? [];

  return (
    <SiteLayout>
      <Section className="text-center max-w-4xl">
        <SectionHead eyebrow="Studio Eventia" title="Le portfolio." />
        <p className="font-serif-soft italic text-lg md:text-xl text-muted-foreground mt-4 leading-relaxed">
          Les réalisations passées du Studio. Chaque projet est composé sur mesure
          par notre direction artistique, écrit à partir d'une histoire singulière.
        </p>
        <div className="gold-rule mx-auto mt-10" />
      </Section>

      <Section className="pt-0">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Chargement…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground italic max-w-xl mx-auto">
            Le portfolio sera publié prochainement. En attendant, parcourez nos
            expériences signature.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {items.map((item, i) => (
              <Link
                key={item.id}
                to="/studio/$slug"
                params={{ slug: item.slug }}
                className={`group block ${SPANS[i % SPANS.length]}`}
              >
                <div className={`relative ${RATIOS[i % RATIOS.length]} overflow-hidden bg-cacao/5`}>
                  {item.hero_url && (
                    <img
                      src={item.hero_url}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/10 to-transparent" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-ivory">
                    {item.category && <div className="eyebrow !text-primary-soft text-[10px] mb-2">{item.category}</div>}
                    <h3 className="font-display text-2xl md:text-3xl leading-tight">{item.title}</h3>
                    {item.year && <div className="text-[11px] tracking-[0.22em] uppercase text-ivory/70 mt-3">{item.year}</div>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
