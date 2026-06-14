import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Plus, Sparkles } from "lucide-react";
import { SiteLayout, Section, SectionHead, GoldButton } from "@/components/site/SiteLayout";
import { saveTheDateFormats, offers, modules, reassurance } from "@/lib/eventia-data";
import { GumroadButton } from "@/components/site/GumroadButton";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs — Eventia Signature" },
      {
        name: "description",
        content:
          "Découvrez tous nos tarifs : Save The Date dès 29 €, Expériences digitales dès 179 €. Paiement unique, sans abonnement.",
      },
      { property: "og:title", content: "Tarifs — Eventia Signature" },
      {
        property: "og:description",
        content: "Save The Date dès 29 € · Expériences digitales dès 179 €. Paiement unique.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/tarifs" }],
  }),
  component: TarifsPage,
});

function TarifsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <Section>
        <SectionHead
          eyebrow="Tarifs"
          title="Une transparence totale, une exigence constante."
          intro="Pas d'abonnement. Pas de frais cachés. Le prix annoncé est le prix final — paiement unique ou fractionné sans frais."
        />

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {["Paiement unique", "Sans abonnement", "3 ou 4× sans frais", "Modifications à vie", "Envoi illimité"].map((t) => (
            <span
              key={t}
              className="px-4 py-1.5 bg-ivory border border-primary/20 text-[11px] tracking-[0.16em] uppercase text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Save The Date ── */}
      <Section>
        <SectionHead
          eyebrow="Save The Date"
          title="Annoncez la date avec élégance."
          intro="Trois formules pour annoncer votre mariage, de l'autonomie totale à la création exclusive par notre studio."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-2">
          {saveTheDateFormats.map((f, i) => {
            const highlighted = i === 1;
            return (
              <div
                key={f.slug}
                className={`relative flex flex-col p-10 ${
                  highlighted
                    ? "bg-cacao text-ivory shadow-gold border border-primary lg:scale-[1.03] lg:-my-2 z-10"
                    : "bg-ivory border border-border shadow-soft"
                }`}
              >
                {highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-ivory text-[10px] tracking-[0.22em] uppercase whitespace-nowrap">
                    La plus choisie
                  </div>
                )}
                <div className={`eyebrow text-[10px] ${highlighted ? "!text-primary-soft" : ""}`}>
                  Save The Date
                </div>
                <div className="font-display text-2xl mt-2">{f.name}</div>
                <p
                  className={`font-serif-soft italic text-sm mt-1 ${highlighted ? "text-ivory/75" : "text-muted-foreground"}`}
                >
                  {f.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`font-display text-5xl ${highlighted ? "text-primary-soft" : "text-primary"}`}
                  >
                    {f.price}
                  </span>
                  <span className="text-xl">€</span>
                </div>
                <div
                  className={`text-[11px] mt-1 ${highlighted ? "text-ivory/60" : "text-muted-foreground"}`}
                >
                  {f.delay}
                </div>

                <div className={`my-6 h-px ${highlighted ? "bg-ivory/15" : "bg-border"}`} />

                <ul className="space-y-3 text-sm flex-1">
                  {f.details.map((d) => (
                    <li key={d} className="flex gap-2.5 items-start">
                      <Check
                        className={`size-4 mt-0.5 shrink-0 ${highlighted ? "text-primary-soft" : "text-primary"}`}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link to="/save-the-date" className="block">
                    <GoldButton
                      className={`w-full ${highlighted ? "!bg-primary-soft !text-cacao hover:!bg-ivory" : ""}`}
                    >
                      Découvrir
                    </GoldButton>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Expériences digitales ── */}
      <Section>
        <SectionHead
          eyebrow="Expériences digitales"
          title="L'invitation qui devient une expérience."
          intro="Du lien d'invitation aux galeries en temps réel — trois niveaux pour accompagner chaque moment de votre événement."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start mt-2">
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-ivory text-[10px] tracking-[0.22em] uppercase whitespace-nowrap">
                  Recommandée
                </div>
              )}
              <div
                className={`eyebrow text-[10px] ${o.recommended ? "!text-primary-soft" : ""}`}
              >
                Expérience
              </div>
              <div className="font-display text-3xl mt-2">{o.name}</div>
              <p
                className={`font-serif-soft italic text-base mt-1 ${o.recommended ? "text-ivory/80" : "text-muted-foreground"}`}
              >
                {o.tagline}
              </p>

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
                  variant="outline"
                  className={`w-full ${o.recommended ? "!border-primary-soft !text-primary-soft hover:!bg-ivory/10" : ""}`}
                >
                  Acheter maintenant
                </GumroadButton>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Modules additionnels ── */}
      <Section>
        <SectionHead
          eyebrow="Modules"
          title="Enrichissez votre expérience."
          intro="Certains modules sont inclus dans nos offres. D'autres peuvent être ajoutés à la carte — à tout moment, avant ou après l'achat."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <div
              key={m.id}
              className={`flex items-center justify-between p-5 border ${
                m.included
                  ? "bg-ivory/60 border-primary/20"
                  : "bg-background border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                {m.included ? (
                  <Check className="size-4 text-primary shrink-0" />
                ) : (
                  <Plus className="size-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm">{m.name}</span>
              </div>
              <span
                className={`text-sm font-medium ${m.included ? "text-primary" : "text-foreground/70"}`}
              >
                {m.included ? "Inclus" : `+${m.price} €`}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tableau comparatif ── */}
      <Section>
        <SectionHead
          eyebrow="Comparer"
          title="Toutes les offres côte à côte."
          intro="Une vue d'ensemble pour choisir le niveau qui correspond à votre vision."
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 pr-8 font-normal text-muted-foreground w-1/2">Fonctionnalité</th>
                {offers.map((o) => (
                  <th
                    key={o.slug}
                    className={`py-4 px-4 text-center font-normal ${o.recommended ? "text-primary" : "text-foreground/80"}`}
                  >
                    <div className="font-display text-base">{o.name}</div>
                    <div className={`text-xs mt-0.5 ${o.recommended ? "text-primary" : "text-muted-foreground"}`}>
                      {o.price} €
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Invitation digitale signature", values: [true, true, true] },
                { label: "RSVP & suivi invités", values: [true, true, true] },
                { label: "Programme intégré", values: [true, true, true] },
                { label: "Lieux & itinéraires", values: [true, true, true] },
                { label: "Envoi illimité", values: [true, true, true] },
                { label: "Modifications à vie", values: [true, true, true] },
                { label: "Galerie Live des invités", values: [false, true, true] },
                { label: "Playlist collaborative", values: [false, true, true] },
                { label: "Plan de table interactif", values: [false, true, true] },
                { label: "QR Codes imprimables", values: [false, true, true] },
                { label: "Livre Audio des messages", values: [false, false, true] },
                { label: "Hébergements & activités", values: [false, false, true] },
                { label: "Multi-langues (6)", values: [false, false, true] },
                { label: "Support prioritaire dédié", values: [false, false, true] },
                { label: "Coffre-fort souvenirs à vie", values: [false, false, true] },
              ].map((row) => (
                <tr key={row.label} className="border-b border-border/50 hover:bg-ivory/40 transition-colors">
                  <td className="py-3.5 pr-8 text-foreground/80">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="py-3.5 px-4 text-center">
                      {v ? (
                        <Check className="size-4 text-primary mx-auto" />
                      ) : (
                        <span className="text-border text-lg leading-none">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/configurateur">
            <GoldButton>Commencer ma composition</GoldButton>
          </Link>
          <Link
            to="/comparer"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-foreground/40 text-sm tracking-[0.12em] hover:border-primary hover:text-primary transition-colors"
          >
            Comparer les expériences
          </Link>
        </div>
      </Section>

      {/* ── Reassurance ── */}
      <Section>
        <div className="bg-ivory border border-border p-8 shadow-soft">
          <div className="text-center eyebrow mb-6">L'engagement Eventia</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reassurance.map((r) => (
              <div key={r} className="flex items-center gap-3 text-sm text-foreground/85">
                <Sparkles className="size-4 text-primary shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground font-serif-soft italic">
              Une question sur nos tarifs ?
            </p>
            <Link
              to="/contact"
              className="inline-block mt-2 text-sm text-primary underline underline-offset-4 hover:text-cacao transition-colors"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
