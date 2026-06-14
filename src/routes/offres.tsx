import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { SiteLayout, Section, SectionHead, GoldButton } from "@/components/site/SiteLayout";
import { offers, reassurance } from "@/lib/eventia-data";
import { GumroadButton } from "@/components/site/GumroadButton";

export const Route = createFileRoute("/offres")({
  head: () => ({
    meta: [
      { title: "Offres — Eventia Signature" },
      {
        name: "description",
        content:
          "Trois offres signature : L'Essentielle, La Signature, L'Exception. Sans abonnement, paiement unique.",
      },
      { property: "og:title", content: "Offres — Eventia Signature" },
      { property: "og:description", content: "Trois offres signature, sans abonnement." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/offres" }],
  }),
  component: OffresPage,
});

function OffresPage() {
  return (
    <SiteLayout>
      <Section>
        <SectionHead
          eyebrow="Nos offres"
          title="Trois manières d'entrer dans la maison."
          intro="Trois niveaux d'expérience, une même exigence. Paiement unique, sans abonnement, modifiable à vie."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {offers.map((o) => (
            <div
              key={o.slug}
              className={`relative p-10 ${
                o.recommended
                  ? "bg-cacao text-ivory shadow-gold border border-primary lg:scale-[1.04] lg:-my-2 z-10"
                  : "bg-ivory border border-border shadow-soft"
              }`}
            >
              {o.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-ivory text-[10px] tracking-[0.22em] uppercase">
                  Recommandée
                </div>
              )}
              <div className={`eyebrow text-[10px] ${o.recommended ? "!text-primary-soft" : ""}`}>
                Offre
              </div>
              <div className="font-display text-3xl mt-2">{o.name}</div>
              <div
                className={`font-serif-soft italic text-base mt-1 ${o.recommended ? "text-ivory/80" : "text-muted-foreground"}`}
              >
                {o.tagline}
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span
                  className={`font-display text-6xl ${o.recommended ? "text-primary-soft" : "text-primary"}`}
                >
                  {o.price}
                </span>
                <span className="text-2xl">€</span>
              </div>
              <div
                className={`text-xs mt-1 ${o.recommended ? "text-ivory/70" : "text-muted-foreground"}`}
              >
                Paiement unique · 3 ou 4× sans frais
              </div>

              <p
                className={`mt-6 text-sm leading-relaxed ${o.recommended ? "text-ivory/85" : "text-foreground/80"}`}
              >
                {o.description}
              </p>

              <div className={`my-8 h-px ${o.recommended ? "bg-ivory/15" : "bg-border"}`} />

              <ul className="space-y-3.5 text-sm">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check
                      className={`size-4 mt-0.5 shrink-0 ${o.recommended ? "text-primary-soft" : "text-primary"}`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-2">
                <Link to="/configurateur" className="block">
                  <GoldButton
                    className={`w-full ${o.recommended ? "!bg-primary-soft !text-cacao hover:!bg-ivory" : ""}`}
                  >
                    Composer {o.name}
                  </GoldButton>
                </Link>
                <GumroadButton
                  productKey={o.slug}
                  variant={o.recommended ? "outline" : "outline"}
                  className={`w-full ${o.recommended ? "!border-primary-soft !text-primary-soft hover:!bg-ivory/10" : ""}`}
                >
                  Acheter maintenant
                </GumroadButton>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="mt-20 bg-ivory border border-border p-8 shadow-soft">
          <div className="text-center eyebrow mb-6">L'engagement Eventia</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reassurance.map((r) => (
              <div key={r} className="flex items-center gap-3 text-sm text-foreground/85">
                <Sparkles className="size-4 text-primary shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
