import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, Section } from "@/components/site/SiteLayout";
import { getPortfolioBySlug } from "@/lib/portfolio.functions";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/studio/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Studio Eventia` },
      { property: "og:title", content: `${params.slug} — Studio Eventia` },
    ],
  }),
  component: StudioDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <Section className="text-center">
        <h1 className="font-display text-4xl">Projet introuvable</h1>
        <Link to="/studio" className="text-primary mt-4 inline-block">Retour au portfolio</Link>
      </Section>
    </SiteLayout>
  ),
});

function StudioDetail() {
  const { slug } = Route.useParams();
  const fetch = useServerFn(getPortfolioBySlug);
  const { data, isLoading } = useQuery({ queryKey: ["portfolio", slug], queryFn: () => fetch({ data: { slug } }) });
  const item = data?.item;

  if (isLoading) {
    return (
      <SiteLayout>
        <Section className="text-center text-muted-foreground">Chargement…</Section>
      </SiteLayout>
    );
  }

  if (!item) throw notFound();

  const gallery: string[] = Array.isArray(item.gallery_urls) ? (item.gallery_urls as string[]) : [];

  return (
    <SiteLayout>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        {item.hero_url && <img src={item.hero_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/90 via-cacao/40 to-cacao/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-14 text-ivory">
            <Link to="/studio" className="inline-flex items-center gap-2 text-sm eyebrow !text-primary-soft mb-4">
              <ArrowLeft className="w-4 h-4" /> Studio
            </Link>
            {item.category && <div className="eyebrow !text-primary-soft mb-3">{item.category}</div>}
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">{item.title}</h1>
            {item.year && <div className="text-[11px] tracking-[0.22em] uppercase text-ivory/70 mt-4">{item.year}</div>}
          </div>
        </div>
      </section>

      {item.story && (
        <Section className="max-w-3xl">
          <p className="font-serif-soft italic text-xl md:text-2xl leading-relaxed text-foreground/90 whitespace-pre-line">
            {item.story}
          </p>
          <div className="gold-rule mx-auto mt-10" />
        </Section>
      )}

      {gallery.length > 0 && (
        <Section className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                loading="lazy"
                className={`w-full object-cover ${i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"}`}
              />
            ))}
          </div>
        </Section>
      )}
    </SiteLayout>
  );
}
