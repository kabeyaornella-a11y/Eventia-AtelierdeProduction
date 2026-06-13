import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, ChevronLeft, ChevronRight, Sparkles, RotateCcw } from "lucide-react";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { toast } from "sonner";
import { collections, offers } from "@/lib/eventia-data";
import { loadDraft, saveDraft, clearDraft, saveOrder, generateRef } from "@/lib/configurateur-store";
import { createMyOrder } from "@/lib/orders.functions";
import { useAuth } from "@/hooks/use-auth";
import { buildGumroadCheckout } from "@/lib/gumroad-links";

export const Route = createFileRoute("/configurateur")({
  head: () => ({
    meta: [
      { title: "Configurateur — Eventia Signature" },
      { name: "description", content: "Composez votre expérience Eventia en 6 étapes : collection, formule, besoins, langues, informations, paiement." },
      { property: "og:title", content: "Configurateur — Eventia Signature" },
      { property: "og:description", content: "Composez votre expérience en 6 étapes." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/configurateur" }],
  }),
  component: Configurateur,
});

const STEPS = ["Collection", "Formule", "Besoins", "Langues", "Informations", "Paiement"];

type Benefit = { id: string; label: string };
const BENEFITS: Benefit[] = [
  { id: "programme", label: "Présenter le programme" },
  { id: "hebergements", label: "Partager les hébergements" },
  { id: "photos", label: "Recevoir les photos des invités" },
  { id: "playlist", label: "Créer une playlist collaborative" },
  { id: "messages", label: "Recevoir des messages vocaux" },
  { id: "deplacements", label: "Faciliter les déplacements" },
  { id: "faq", label: "Répondre aux questions fréquentes" },
  { id: "rsvp", label: "Gérer les confirmations de présence" },
];

type Language = { code: string; label: string };
const LANGUAGES: Language[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "Anglais" },
  { code: "es", label: "Espagnol" },
  { code: "ar", label: "Arabe" },
  { code: "it", label: "Italien" },
  { code: "pt", label: "Portugais" },
];

function Configurateur() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [univers, setUnivers] = useState<string>("");
  const [formula, setFormula] = useState<string>("signature");
  const [benefits, setBenefits] = useState<string[]>(["rsvp", "programme"]);
  const [languages, setLanguages] = useState<string[]>(["fr"]);
  const [infos, setInfos] = useState({ prenom1: "", prenom2: "", date: "", email: "" });
  const hydrated = useRef(false);

  useEffect(() => {
    const d = loadDraft();
    if (d) {
      setStep(Math.min(d.step, STEPS.length - 1));
      setUnivers(d.univers);
      setFormula(d.formula || "signature");
      if (Array.isArray(d.activeModules) && d.activeModules.length) setBenefits(d.activeModules);
      const contact = d.contact || { nom: "", email: "", phone: "" };
      const [p1, p2] = (contact.nom || "").split(" & ");
      setInfos({
        prenom1: p1 || "",
        prenom2: p2 || "",
        date: d.date || "",
        email: contact.email || "",
      });
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveDraft({
      step,
      eventType: "",
      univers,
      expSlug: "",
      formula,
      activeModules: benefits,
      palette: languages.join(","),
      date: infos.date,
      contact: {
        nom: [infos.prenom1, infos.prenom2].filter(Boolean).join(" & "),
        email: infos.email,
        phone: "",
      },
      updatedAt: Date.now(),
    });
  }, [step, univers, formula, benefits, languages, infos]);

  const selectedFormula = offers.find((o) => o.slug === formula);
  const total = selectedFormula?.price ?? 0;

  const canNext = () => {
    if (step === 0) return Boolean(univers);
    if (step === 1) return Boolean(formula);
    if (step === 3) return languages.length > 0;
    if (step === 4) return Boolean(infos.prenom1 && infos.prenom2 && infos.date && infos.email);
    return true;
  };

  const next = () => {
    if (!canNext()) {
      toast.error("Veuillez compléter cette étape avant de continuer.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const resetAll = () => {
    clearDraft();
    setStep(0);
    setUnivers("");
    setFormula("signature");
    setBenefits(["rsvp", "programme"]);
    setLanguages(["fr"]);
    setInfos({ prenom1: "", prenom2: "", date: "", email: "" });
    toast.success("Composition réinitialisée");
  };

  const toggleBenefit = (id: string) =>
    setBenefits((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const toggleLanguage = (code: string) =>
    setLanguages((cur) => (cur.includes(code) ? cur.filter((x) => x !== code) : [...cur, code]));

  const { user } = useAuth();
  const createOrder = useServerFn(createMyOrder);

  const confirmOrder = async () => {
    if (!canNext()) return;
    const ref = generateRef();
    const gumroadUrl = buildGumroadCheckout(formula, { email: infos.email, ref });
    saveOrder({
      ref,
      total,
      createdAt: Date.now(),
      step,
      eventType: "",
      univers,
      expSlug: "",
      formula,
      activeModules: benefits,
      palette: languages.join(","),
      date: infos.date,
      contact: {
        nom: [infos.prenom1, infos.prenom2].filter(Boolean).join(" & "),
        email: infos.email,
        phone: "",
      },
      updatedAt: Date.now(),
    });
    if (user) {
      try {
        await createOrder({
          data: {
            ref,
            email: infos.email,
            formula,
            experience_slug: null,
            total_eur: total,
            gumroad_url: gumroadUrl,
            config: { univers, formula, benefits, languages, infos },
          },
        });
      } catch (e) {
        console.warn("Order sync failed (saved locally)", e);
      }
    }
    clearDraft();
    toast.success(`Commande ${ref} confirmée`);
    navigate({ to: "/ma-commande/$ref", params: { ref } });
  };

  return (
    <SiteLayout>
      <Section>
        <div className="flex items-center justify-between mb-4">
          <div className="eyebrow text-primary">Composition en cours, sauvegarde automatique</div>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary"
          >
            <RotateCcw className="size-3" /> Réinitialiser
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-3">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 shrink-0 ${
                  i === step ? "text-primary" : i < step ? "text-foreground/70" : "text-muted-foreground/60"
                }`}
              >
                <div
                  className={`size-7 grid place-items-center rounded-full text-xs ${
                    i === step ? "bg-primary text-ivory" : i < step ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="text-xs tracking-wide hidden md:block">{label}</div>
              </div>
            ))}
          </div>
          <div className="h-px bg-border relative">
            <div className="h-px bg-primary transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-ivory shadow-soft p-8 md:p-12 min-h-[460px]">
          {step === 0 && (
            <Step
              title="Choisissez votre collection"
              intro="Quatre univers, quatre directions artistiques."
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {collections.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setUnivers(c.slug)}
                    className={`overflow-hidden text-left border ${
                      univers === c.slug ? "border-primary shadow-gold" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={c.image} alt={c.name} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <div className="font-display text-lg">{c.name}</div>
                      <div className="font-serif-soft italic text-xs text-muted-foreground">{c.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step
              title="Choisissez votre formule"
              intro="Trois niveaux d'expérience, du plus essentiel au plus complet."
            >
              <div className="grid md:grid-cols-3 gap-4">
                {offers.map((o) => (
                  <button
                    key={o.slug}
                    onClick={() => setFormula(o.slug)}
                    className={`p-6 border text-left ${
                      formula === o.slug ? "border-primary shadow-gold bg-background" : "border-border bg-background"
                    }`}
                  >
                    {o.recommended && <div className="eyebrow text-[10px] mb-2">Recommandée</div>}
                    <div className="font-display text-2xl">{o.name}</div>
                    <div className="font-display text-3xl text-primary mt-2">{o.price} €</div>
                    <div className="font-serif-soft italic text-xs text-muted-foreground mt-2">{o.tagline}</div>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step
              title="Vos besoins"
              intro="Sélectionnez ce qui compte pour votre événement."
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {BENEFITS.map((b) => {
                  const active = benefits.includes(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBenefit(b.id)}
                      className={`flex items-center justify-between p-4 border text-left ${
                        active ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <span className="text-sm">{b.label}</span>
                      {active && <Check className="size-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Tous les besoins sélectionnés sont intégrés à votre expérience sans surcoût.
              </p>
            </Step>
          )}

          {step === 3 && (
            <Step
              title="Langues"
              intro="Choisissez les langues dans lesquelles vos invités vivront l'expérience."
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LANGUAGES.map((l) => {
                  const active = languages.includes(l.code);
                  return (
                    <button
                      key={l.code}
                      onClick={() => toggleLanguage(l.code)}
                      className={`px-4 py-5 border text-sm ${
                        active ? "border-primary bg-primary/5 text-primary" : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <div className="font-display text-lg">{l.code.toUpperCase()}</div>
                      <div className="font-serif-soft italic text-xs mt-1">{l.label}</div>
                    </button>
                  );
                })}
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step
              title="Vos informations"
              intro="Quelques détails pour personnaliser votre expérience."
            >
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                <Field label="Prénom 1">
                  <input
                    value={infos.prenom1}
                    onChange={(e) => setInfos({ ...infos, prenom1: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-sm"
                  />
                </Field>
                <Field label="Prénom 2">
                  <input
                    value={infos.prenom2}
                    onChange={(e) => setInfos({ ...infos, prenom2: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-sm"
                  />
                </Field>
                <Field label="Date de l'événement">
                  <input
                    type="date"
                    value={infos.date}
                    onChange={(e) => setInfos({ ...infos, date: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-sm"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={infos.email}
                    onChange={(e) => setInfos({ ...infos, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-sm"
                  />
                </Field>
              </div>
            </Step>
          )}

          {step === 5 && (
            <Step
              title="Paiement"
              intro="Récapitulatif et validation de votre commande."
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3 text-sm">
                  <Row label="Collection" value={collections.find((c) => c.slug === univers)?.name || "—"} />
                  <Row label="Formule" value={selectedFormula?.name || "—"} />
                  <Row label="Besoins" value={`${benefits.length} sélectionné${benefits.length > 1 ? "s" : ""}`} />
                  <Row label="Langues" value={languages.map((c) => c.toUpperCase()).join(", ") || "—"} />
                  <Row label="Prénoms" value={`${infos.prenom1} & ${infos.prenom2}`} />
                  <Row label="Date" value={infos.date || "—"} />
                  <Row label="Email" value={infos.email || "—"} />
                </div>
                <div className="bg-background p-6 border border-border space-y-5">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="size-4" />
                    <div className="eyebrow">Validation</div>
                  </div>
                  <div className="font-display text-5xl text-primary">{total} €</div>
                  <div className="text-xs text-muted-foreground">
                    Paiement unique, possible en 3 ou 4 fois sans frais. Votre commande est revue par notre atelier sous 24 heures avant production.
                  </div>
                  <GoldButton onClick={confirmOrder} className="w-full">
                    Confirmer ma commande
                  </GoldButton>
                </div>
              </div>
            </Step>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <OutlineButton onClick={prev} disabled={step === 0}>
            <ChevronLeft className="size-4 mr-2" /> Précédent
          </OutlineButton>
          {step < STEPS.length - 1 && (
            <GoldButton onClick={next}>
              Continuer <ChevronRight className="size-4 ml-2" />
            </GoldButton>
          )}
        </div>
      </Section>
    </SiteLayout>
  );
}

function Step({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        {intro && <p className="font-serif-soft italic text-muted-foreground mt-2">{intro}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="eyebrow mb-2">{label}</div>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
