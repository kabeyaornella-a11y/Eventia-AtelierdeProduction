import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { SiteLayout, Section } from "@/components/site/SiteLayout";
import { listDecorations, recommendDecorations } from "@/lib/decorations.functions";
import { Sparkles, ExternalLink, Package } from "lucide-react";

const searchSchema = z.object({ theme: z.string().optional().default("") });

export const Route = createFileRoute("/_authenticated/decorations")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Décorations — Eventia Signature" }, { name: "robots", content: "noindex" }],
  }),
  component: DecorationsPage,
});

function DecorationsPage() {
  const { theme } = useSearch({ from: "/_authenticated/decorations" });
  const fetchAll = useServerFn(listDecorations);
  const fetchRec = useServerFn(recommendDecorations);

  const all = useQuery({ queryKey: ["decorations-all"], queryFn: () => fetchAll() });
  const rec = useQuery({
    queryKey: ["decorations-rec", theme],
    queryFn: () => fetchRec({ data: { theme } }),
    enabled: !!theme,
  });

  const recList = rec.data?.decorations ?? [];
  const allList = all.data?.decorations ?? [];

  return (
    <SiteLayout>
      <Section>
        <div className="eyebrow text-primary">Atelier · accessoires & coffrets</div>
        <h1 className="font-display text-4xl md:text-5xl mt-2 mb-3">Décorations</h1>
        <p className="font-serif-soft italic text-muted-foreground mb-10">
          Trouvez les décorations compatibles avec le thème de votre invitation.
        </p>

        {theme && (
          <div className="mb-12">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Sparkles className="size-5" />
              <h2 className="font-display text-2xl">
                Recommandé pour : <span className="italic capitalize">{theme}</span>
              </h2>
            </div>
            {recList.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-ivory border border-border p-4">
                Aucune décoration référencée pour ce thème — élargissez la sélection ci-dessous.
              </p>
            ) : (
              <Grid items={recList} />
            )}
          </div>
        )}

        <h2 className="font-display text-2xl mb-4">Catalogue complet</h2>
        <Grid items={allList} />
      </Section>
    </SiteLayout>
  );
}

function Grid({
  items,
}: {
  items: Array<{
    id: string;
    name: string;
    category: string;
    themes: string[];
    description: string | null;
    price_eur: number | null;
    supplier: string | null;
    supplier_url: string | null;
    image_url: string | null;
  }>;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((d) => (
        <div key={d.id} className="bg-ivory border border-primary/10 p-5 shadow-soft">
          <div className="flex items-start gap-3 mb-2">
            <div className="size-10 bg-primary/10 text-primary grid place-items-center">
              <Package className="size-5" />
            </div>
            <div className="flex-1">
              <div className="font-display text-lg">{d.name}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                {d.category}
              </div>
            </div>
            {d.price_eur !== null && (
              <div className="font-display text-primary">{d.price_eur} €</div>
            )}
          </div>
          {d.description && <p className="text-xs text-muted-foreground mb-3">{d.description}</p>}
          <div className="flex flex-wrap gap-1 mb-3">
            {d.themes.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 bg-background border border-border">
                {t}
              </span>
            ))}
          </div>
          {d.supplier && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              {d.supplier_url ? (
                <a
                  href={d.supplier_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary inline-flex items-center gap-1"
                >
                  {d.supplier} <ExternalLink className="size-3" />
                </a>
              ) : (
                d.supplier
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
