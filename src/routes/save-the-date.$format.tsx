import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { saveTheDateFormats, type SaveTheDateFormat } from "@/lib/eventia-data";
import { GumroadButton } from "@/components/site/GumroadButton";
import { ModelGrid } from "@/components/site/ModelGrid";
import { saveTheDateModels } from "@/lib/cloudinary-models";
import { Check } from "lucide-react";

export const Route = createFileRoute("/save-the-date/$format")({
  head: ({ params }) => {
    const f = saveTheDateFormats.find((x) => x.slug === params.format);
    const title = f ? `${f.name} — Eventia Signature` : "Save The Date — Eventia Signature";
    const desc = f?.description ?? "Save The Date signature Eventia.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(f ? [{ property: "og:image" as const, content: f.image }] : []),
      ],
      links: [{ rel: "canonical", href: `https://www.eventiasignature.fr/save-the-date/${params.format}` }],
    };
  },
  loader: ({ params }) => {
    const f = saveTheDateFormats.find((x) => x.slug === params.format);
    if (!f) throw notFound();
    return f;
  },
  component: SaveTheDateDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <Section>
        <div className="text-center">
          <h1 className="font-display text-4xl">Format introuvable</h1>
          <Link to="/save-the-date" className="mt-6 inline-block text-primary">← Tous les formats</Link>
        </div>
      </Section>
    </SiteLayout>
  ),
});

function SaveTheDateDetail() {
  const f = Route.useLoaderData() as SaveTheDateFormat | undefined;
  if (!f) return null;
  const others = saveTheDateFormats.filter((x) => x.slug !== f.slug);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={f.image} alt={f.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/30 to-cacao/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-16 text-ivory">
            <div className="eyebrow !text-primary-soft mb-3">Save The Date</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">{f.name.replace("Save The Date ", "")}</h1>
            <p className="font-serif-soft italic text-xl text-ivory/90 mt-3 max-w-2xl">{f.tagline}</p>
          </div>
        </div>
      </section>

      {/* HISTOIRE + DETAILS */}
      <Section>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14">
          <div>
            <div className="eyebrow mb-3">Histoire du format</div>
            <p className="font-serif-soft italic text-2xl text-foreground/90 leading-relaxed">{f.story}</p>
            <div className="mt-10 flex items-center gap-6">
              <div>
                <div className="eyebrow text-[10px]">À partir de</div>
                <div className="font-display text-4xl text-primary mt-1">{f.price} €</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="eyebrow text-[10px]">Délai</div>
                <div className="font-serif-soft italic text-lg mt-1">{f.delay}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              <GumroadButton productKey={`std-${f.slug}`}>Acheter. {f.price} €</GumroadButton>
              <Link to="/configurateur"><OutlineButton>Composer sur mesure</OutlineButton></Link>
            </div>
          </div>
          <div className="bg-ivory shadow-soft p-8">
            <div className="eyebrow mb-5">Ce qui est inclus</div>
            <ul className="space-y-4">
              {f.details.map((d: string) => (
                <li key={d} className="flex gap-3 text-sm text-foreground/85">
                  <Check className="size-4 text-primary mt-0.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* MODÈLES SIGNATURE. preuve produit en vidéo */}
      <div className="bg-ivory/40 border-t border-border/60">
        <ModelGrid
          eyebrow="Choisissez votre mise en scène"
          title="Les quatre modèles de la collection"
          models={saveTheDateModels}
        />
      </div>

      {/* OTHER FORMATS */}
      <div className="bg-ivory/60 border-t border-border/60">
        <Section>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Autres formats</div>
            <h2 className="font-display text-3xl">Explorez les autres Save The Date</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link key={o.slug} to="/save-the-date/$format" params={{ format: o.slug }} className="group block bg-background shadow-soft overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.image} alt={o.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="font-display text-xl">{o.name.replace("Save The Date ", "")}</div>
                  <div className="font-serif-soft italic text-sm text-muted-foreground mt-1">À partir de {o.price} €</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </SiteLayout>
  );
}
