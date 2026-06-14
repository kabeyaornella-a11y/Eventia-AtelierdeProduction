import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Section, SectionHead, GoldButton } from "@/components/site/SiteLayout";
import { partnerCategories } from "@/lib/eventia-data";
import img from "@/assets/partenaires.jpg";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "Partenaires — Eventia Signature" },
      {
        name: "description",
        content:
          "Développons ensemble des expériences mémorables. Programme partenaire pour wedding planners, photographes, lieux.",
      },
      { property: "og:title", content: "Partenaires — Eventia Signature" },
      { property: "og:description", content: "Programme partenaire haut de gamme." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/partenaires" }],
  }),
  component: () => (
    <SiteLayout>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="eyebrow">Programme partenaires</div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight">
              Développons ensemble des expériences mémorables.
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Rejoignez notre réseau de partenaires et offrez le meilleur à vos clients. Visibilité,
              recommandations, commissions, ressources marketing.
            </p>
            <div className="grid sm:grid-cols-3 gap-5 pt-4">
              {[
                { t: "Visibilité", d: "Mettez en avant votre savoir-faire." },
                { t: "Recommandations", d: "Recommandez Eventia à vos clients." },
                { t: "Commissions", d: "Bénéficiez d'un programme attractif." },
              ].map((b) => (
                <div key={b.t} className="bg-ivory shadow-soft p-5">
                  <div className="font-display text-lg">{b.t}</div>
                  <p className="text-xs text-muted-foreground mt-1">{b.d}</p>
                </div>
              ))}
            </div>
            <Link to="/contact">
              <GoldButton>Proposer un partenariat</GoldButton>
            </Link>
          </div>
          <div className="overflow-hidden shadow-soft">
            <img src={img} alt="Partenaires" className="w-full h-[520px] object-cover" />
          </div>
        </div>
      </Section>
      <div className="bg-ivory/60 border-y border-border/60">
        <Section className="!py-20">
          <SectionHead title="Tous nos métiers" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {partnerCategories.map((p) => (
              <div key={p} className="bg-background shadow-soft py-8">
                <div className="font-serif-soft italic text-lg">{p}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </SiteLayout>
  ),
});
