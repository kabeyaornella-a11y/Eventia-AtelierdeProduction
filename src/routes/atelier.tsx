import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteLayout, Section, SectionHead, GoldButton } from "@/components/site/SiteLayout";
import { atelierProducts } from "@/lib/eventia-data";
import { submitAtelierRequest } from "@/lib/atelier.functions";
import img from "@/assets/atelier-papeterie.jpg";
import { Check, Send } from "lucide-react";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "Eventia Atelier. Papeterie & objets signature" },
      {
        name: "description",
        content:
          "L'art du détail, la beauté du tangible. Papeterie, signalétique, gravure, cadeaux invités, objets sur mesure.",
      },
      { property: "og:title", content: "Eventia Atelier" },
      { property: "og:description", content: "L'art du détail, la beauté du tangible." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/atelier" }],
  }),
  component: AtelierPage,
});

const CATEGORIES = ["Tous", "Papier", "Signalétique", "Cadeaux", "Objets"] as const;

function AtelierPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Tous");
  const filtered = useMemo(
    () => (cat === "Tous" ? atelierProducts : atelierProducts.filter((p) => p.category === cat)),
    [cat],
  );

  const submit = useServerFn(submitAtelierRequest);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    request_type: "papeterie" as "papeterie" | "gravure" | "objets" | "autre",
    details: "",
    budget: "",
    event_date: "",
  });
  const [done, setDone] = useState(false);

  const mut = useMutation({
    mutationFn: () => submit({ data: form }),
    onSuccess: () => {
      setDone(true);
      toast.success("Demande envoyée. Notre atelier vous recontacte sous 48 h.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Une erreur est survenue"),
  });

  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <img
          src={img}
          alt="Eventia Atelier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/30 to-cacao/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-14 text-ivory">
            <div className="eyebrow !text-primary-soft mb-3">Eventia Atelier</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
              L'art du détail, la beauté du tangible.
            </h1>
            <p className="font-serif-soft italic text-xl text-ivory/90 mt-4 max-w-2xl">
              Le digital sublime l'instant. Le papier, l'objet, le geste. prolongent le souvenir.
            </p>
          </div>
        </div>
      </section>

      <Section className="max-w-4xl text-center">
        <div className="eyebrow mb-4">Manifeste de l'Atelier</div>
        <p className="font-serif-soft italic text-2xl md:text-3xl text-foreground/90 leading-relaxed">
          Chaque pièce sortie de notre Atelier est conçue comme un fragment de votre histoire. un
          papier que l'on caresse, un cachet que l'on brise, un objet que l'on garde.
        </p>
        <div className="gold-rule mx-auto mt-10" />
      </Section>

      <div className="bg-ivory/60 border-y border-border/60">
        <Section>
          <SectionHead
            eyebrow="Catalogue"
            title="Notre catalogue Atelier"
            intro="Filtrez par catégorie pour parcourir l'univers complet de nos pièces."
          />
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 text-xs eyebrow border transition-colors ${cat === c ? "bg-primary text-ivory border-primary" : "bg-background border-border hover:border-primary"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div key={p.name} className="bg-background shadow-soft p-7 flex flex-col">
                <div className="eyebrow text-[10px] mb-2">{p.category}</div>
                <div className="font-display text-2xl">{p.name}</div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                  {p.description}
                </p>
                <div className="mt-5 pt-5 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">À partir de</span>
                  <span className="font-display text-2xl text-primary">{p.priceFrom} €</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* DEVIS ATELIER */}
      <Section id="devis" className="max-w-3xl">
        <SectionHead
          eyebrow="Devis sur-mesure"
          title="Composer une commande Atelier"
          intro="Décrivez votre projet. Notre direction artistique vous répond sous 48 h."
        />
        {done ? (
          <div className="bg-ivory border border-primary/20 p-10 text-center shadow-soft">
            <Check className="size-10 text-primary mx-auto" />
            <h3 className="font-display text-2xl mt-4">Merci {form.name.split(" ")[0]}</h3>
            <p className="font-serif-soft italic text-muted-foreground mt-2 max-w-md mx-auto">
              Votre demande est enregistrée. Notre atelier vous contacte à l'adresse {form.email}.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mut.mutate();
            }}
            className="bg-ivory border border-primary/15 p-8 md:p-10 shadow-soft space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                placeholder="Prénom & Nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-4 py-3 bg-background border border-border text-sm"
                maxLength={120}
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="px-4 py-3 bg-background border border-border text-sm"
                maxLength={255}
              />
              <input
                placeholder="Téléphone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="px-4 py-3 bg-background border border-border text-sm"
                maxLength={40}
              />
              <input
                type="date"
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                className="px-4 py-3 bg-background border border-border text-sm"
              />
            </div>
            <div>
              <label className="eyebrow text-xs">Type de demande</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                {(["papeterie", "gravure", "objets", "autre"] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setForm({ ...form, request_type: t })}
                    className={`px-3 py-3 text-xs uppercase tracking-[0.18em] border ${form.request_type === t ? "border-primary bg-primary/5 text-primary" : "border-border"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <input
              placeholder="Budget estimé (optionnel)"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border text-sm"
              maxLength={60}
            />
            <textarea
              required
              rows={5}
              minLength={10}
              maxLength={2000}
              placeholder="Décrivez votre projet : quantité, ambiance, contraintes, inspirations…"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border text-sm font-serif-soft italic"
            />
            <GoldButton type="submit" disabled={mut.isPending} className="w-full">
              <Send className="size-4 mr-2" /> {mut.isPending ? "Envoi…" : "Envoyer ma demande"}
            </GoldButton>
            <p className="text-[11px] text-muted-foreground text-center">
              Réponse personnalisée de notre atelier sous 48 h.
            </p>
          </form>
        )}
      </Section>

      <div className="bg-cacao text-ivory">
        <Section className="text-center">
          <div className="eyebrow !text-primary-soft mb-3">Direction artistique</div>
          <h2 className="font-display text-4xl md:text-5xl">Un accompagnement de bout en bout</h2>
          <p className="font-serif-soft italic text-lg text-ivory/80 mt-4 max-w-2xl mx-auto">
            Notre direction artistique conçoit avec vous une collection cohérente, du faire-part au
            coffret témoin.
          </p>
          <div className="mt-10">
            <Link to="/contact">
              <GoldButton>Nous contacter</GoldButton>
            </Link>
          </div>
        </Section>
      </div>
    </SiteLayout>
  );
}
