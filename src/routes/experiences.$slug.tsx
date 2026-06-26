import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { experiences, collections, type Experience } from "@/lib/eventia-data";
import { findModelByName, cloudinaryPoster } from "@/lib/cloudinary-models";

export const Route = createFileRoute("/experiences/$slug")({
  head: ({ params }) => {
    const e = experiences.find((x) => x.slug === params.slug);
    const title = e ? `${e.name} — Eventia Signature` : "Expérience — Eventia Signature";
    const desc = e?.story ?? "Expérience signature Eventia.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(e ? [{ property: "og:image" as const, content: e.image }] : []),
      ],
      links: [
        { rel: "canonical", href: `https://www.eventiasignature.com/experiences/${params.slug}` },
      ],
    };
  },
  loader: ({ params }) => {
    const e = experiences.find((x) => x.slug === params.slug);
    if (!e) throw notFound();
    return e;
  },
  component: ExperiencePage,
  notFoundComponent: () => (
    <SiteLayout>
      <Section>
        <div className="text-center">
          <h1 className="font-display text-4xl">Expérience introuvable</h1>
          <Link to="/experiences" className="mt-6 inline-block text-primary">
            ← Toutes les expériences
          </Link>
        </div>
      </Section>
    </SiteLayout>
  ),
});

function ExperiencePage() {
  const e = Route.useLoaderData() as Experience | undefined;
  if (!e) return null;
  const c = collections.find((x) => x.slug === e.univers)!;
  const related = experiences
    .filter((x) => x.univers === e.univers && x.slug !== e.slug)
    .slice(0, 3);
  const gallery = e.gallery ?? [e.image];
  const video = findModelByName(e.name);

  return (
    <SiteLayout>
      {/* HERO. vidéo Cloudinary officielle si disponible */}
      <section className="relative h-[78vh] min-h-[540px] overflow-hidden">
        {video ? (
          <video
            src={video.video}
            poster={cloudinaryPoster(video.video)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img src={e.image} alt={e.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/30 to-cacao/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-16 text-ivory">
            <div className="eyebrow !text-primary-soft mb-3">
              {c.name} · {e.immersion}
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">{e.name}</h1>
            <div className="font-serif-soft italic text-xl text-ivory/90 mt-3">{e.ambiance}</div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE DETAILLEE */}
      <Section className="max-w-5xl">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div className="bg-ivory border border-border p-8 shadow-soft">
            <div className="eyebrow text-primary mb-4">Expérience détaillée</div>
            <h2 className="font-display text-4xl leading-tight">Ce que vos invités vont vivre.</h2>
            <p className="font-serif-soft italic text-lg text-muted-foreground mt-5 leading-relaxed">
              Une ouverture immersive, une révélation des prénoms, une date mise en scène, les
              informations essentielles, puis une réponse RSVP fluide.
            </p>
          </div>
          <div className="grid gap-3 text-sm">
            {[
              "Ouverture cinématographique",
              "Révélation du couple",
              "Date et compte à rebours",
              "Lieu, programme et itinéraire",
              "RSVP premium",
              "Remerciement final",
            ].map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-4 bg-background border border-border px-5 py-4"
              >
                <span className="font-display text-2xl text-primary">0{i + 1}</span>
                <span className="tracking-wide">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* NOTRE HISTOIRE */}
      <div className="bg-cacao/3 border-y border-primary/10">
        <Section className="max-w-4xl">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Notre histoire</div>
            <div className="font-script text-5xl md:text-6xl text-primary/30 leading-none select-none">
              &ldquo;
            </div>
          </div>

          <p className="font-serif-soft text-2xl md:text-3xl italic text-foreground/90 leading-relaxed text-center">
            {e.story}
          </p>

          <div className="gold-rule mx-auto mt-8" />

          <div className="mt-10 grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <div className="eyebrow text-[10px]">L'univers</div>
              <p className="font-serif-soft italic text-base text-foreground/80 leading-relaxed">
                {c.manifesto}
              </p>
            </div>
            <div className="space-y-2">
              <div className="eyebrow text-[10px]">L'ambiance</div>
              <p className="font-serif-soft italic text-base text-foreground/80 leading-relaxed">
                {e.inspiration}
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* PALETTE & MUSIQUE */}
      <div className="bg-ivory/60 border-y border-border/60">
        <Section>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="eyebrow">Palette</div>
              <div className="flex gap-2 flex-wrap">
                {e.palette.map((h: string) => (
                  <div
                    key={h}
                    className="size-14 rounded-full border border-border shadow-soft"
                    style={{ backgroundColor: h }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="eyebrow">Musique</div>
              <p className="font-serif-soft italic text-lg text-foreground/85 leading-relaxed">
                {e.music}
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* GALERIE */}
      <Section>
        <div className="text-center mb-10">
          <div className="eyebrow mb-3">Galerie</div>
          <h2 className="font-display text-3xl md:text-4xl">L'univers en images</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {gallery.map((src: string, i: number) => (
            <div key={i} className="aspect-[4/5] overflow-hidden shadow-soft">
              <img
                src={src}
                alt={`${e.name}. vue ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="bg-cacao text-ivory">
        <Section className="text-center">
          <div className="eyebrow !text-primary-soft mb-3">Votre événement</div>
          <h2 className="font-display text-4xl md:text-5xl">Composer {e.name}</h2>
          <p className="font-serif-soft italic text-lg text-ivory/80 mt-4">
            À partir de <span className="text-primary-soft">{e.priceFrom} €</span>. paiement unique,
            sans abonnement.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/configurateur">
              <GoldButton>Composer cette expérience</GoldButton>
            </Link>
            <Link to="/contact">
              <OutlineButton className="!border-ivory/60 !text-ivory hover:!border-primary-soft hover:!text-primary-soft">
                Parler à notre équipe
              </OutlineButton>
            </Link>
          </div>
        </Section>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <Section>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Aussi dans {c.name}</div>
            <h2 className="font-display text-3xl">Explorez d'autres expériences</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/experiences/$slug"
                params={{ slug: r.slug }}
                className="group block bg-ivory shadow-soft overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {findModelByName(r.name) ? (
                    <video
                      src={findModelByName(r.name)!.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="font-display text-xl">{r.name}</div>
                  <div className="font-serif-soft italic text-sm text-muted-foreground mt-1">
                    À partir de {r.priceFrom} €
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </SiteLayout>
  );
}
