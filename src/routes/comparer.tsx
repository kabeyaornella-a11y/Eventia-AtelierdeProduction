import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, X, ArrowRight } from "lucide-react";
import { SiteLayout, Section, SectionHead, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { experiences, collections } from "@/lib/eventia-data";

export const Route = createFileRoute("/comparer")({
  head: () => ({
    meta: [
      { title: "Comparer les expériences — Eventia Signature" },
      { name: "description", content: "Mettez côte à côte jusqu'à trois expériences Eventia : palette, ambiance, immersion, prix. Trouvez celle qui vous ressemble." },
      { property: "og:title", content: "Comparer les expériences — Eventia Signature" },
      { property: "og:description", content: "Comparez palette, ambiance et immersion." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/comparer" }],
  }),
  component: ComparerPage,
});

function ComparerPage() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (slug: string) => {
    setPicked((cur) => {
      if (cur.includes(slug)) return cur.filter((s) => s !== slug);
      if (cur.length >= 3) return cur;
      return [...cur, slug];
    });
  };

  const selected = picked.map((s) => experiences.find((e) => e.slug === s)!).filter(Boolean);

  return (
    <SiteLayout>
      <Section>
        <SectionHead
          eyebrow="Atelier de comparaison"
          title="Mettez vos coups de cœur côte à côte"
          intro="Sélectionnez jusqu'à trois expériences pour comparer leurs palettes, leurs ambiances et leurs prix. Une lecture éditoriale pour faire émerger l'évidence."
        />

        {/* Sélecteur */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-14">
          {experiences.map((e) => {
            const active = picked.includes(e.slug);
            const disabled = !active && picked.length >= 3;
            return (
              <button
                key={e.slug}
                onClick={() => toggle(e.slug)}
                disabled={disabled}
                className={`relative text-left overflow-hidden border transition ${active ? "border-primary shadow-gold" : "border-border hover:border-primary/40"} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <img src={e.image} alt={e.name} className="w-full h-24 object-cover" />
                <div className="p-2">
                  <div className="font-display text-sm truncate">{e.name}</div>
                  <div className="text-[10px] text-muted-foreground">{e.ambiance}</div>
                </div>
                <div className={`absolute top-2 right-2 size-6 grid place-items-center rounded-full ${active ? "bg-primary text-ivory" : "bg-ivory/80 text-foreground"}`}>
                  {active ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Comparatif */}
        {selected.length === 0 ? (
          <div className="text-center font-serif-soft italic text-muted-foreground py-20 border border-dashed border-border">
            Choisissez vos premières expériences pour commencer la comparaison.
          </div>
        ) : (
          <div className={`grid gap-6 ${selected.length === 1 ? "md:grid-cols-1 max-w-md mx-auto" : selected.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {selected.map((e) => {
              const col = collections.find((c) => c.slug === e.univers);
              return (
                <article key={e.slug} className="bg-ivory border border-primary/15 shadow-soft overflow-hidden flex flex-col">
                  <div className="relative">
                    <img src={e.image} alt={e.name} className="w-full h-56 object-cover" />
                    <button onClick={() => toggle(e.slug)} className="absolute top-3 right-3 size-7 grid place-items-center bg-ivory/90 text-foreground hover:text-primary">
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div>
                      <div className="eyebrow text-primary">{col?.name}</div>
                      <h3 className="font-display text-2xl mt-1">{e.name}</h3>
                      <p className="font-serif-soft italic text-sm text-muted-foreground mt-2">{e.story}</p>
                    </div>

                    <Field label="Ambiance" value={e.ambiance} />
                    <Field label="Immersion" value={e.immersion} />
                    <Field label="Musique" value={e.music} />
                    <Field label="Inspiration" value={e.inspiration} />

                    <div>
                      <div className="eyebrow mb-2">Palette</div>
                      <div className="flex gap-1.5">
                        {e.palette.map((h: string) => (
                          <span key={h} className="block size-7 border border-border" style={{ backgroundColor: h }} aria-label={h} />
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 mt-auto">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="eyebrow">À partir de</div>
                          <div className="font-display text-3xl text-primary">{e.priceFrom} €</div>
                        </div>
                        <Link to="/experiences/$slug" params={{ slug: e.slug }} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                          Découvrir <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {selected.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/configurateur"><GoldButton>Composer mon expérience</GoldButton></Link>
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/60 pb-2">
      <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{label}</div>
      <div className="text-sm mt-1">{value}</div>
    </div>
  );
}
