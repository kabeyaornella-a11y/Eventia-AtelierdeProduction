import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitB2BLead } from "@/lib/b2b.functions";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiteLayout, Section, GoldButton } from "@/components/site/SiteLayout";
import { toast } from "sonner";
import img from "@/assets/contact-editorial.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Eventia Signature" },
      {
        name: "description",
        content:
          "Contactez Eventia Signature pour créer une expérience digitale premium : mariage, save the date, RSVP, album photo live et demande sur mesure.",
      },
      { property: "og:title", content: "Contact — Eventia Signature" },
      { property: "og:description", content: "Parlons de votre événement." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submitLead = useServerFn(submitB2BLead);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    tel: "",
    date: "",
    type: "Mariage",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLead({
        data: {
          company: "Particulier",
          contact_name: form.nom,
          email: form.email,
          phone: form.tel || undefined,
          event_type: form.type || undefined,
          message:
            [form.date ? `Date envisagée : ${form.date}` : "", form.message]
              .filter(Boolean)
              .join("\n\n") || undefined,
        },
      });
      toast.success("Merci. votre demande a bien été transmise.");
      setForm({ nom: "", email: "", tel: "", date: "", type: "Mariage", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "La demande n'a pas pu être envoyée.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      {/* HERO éditorial */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/80 via-cacao/30 to-cacao/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-14 text-ivory">
            <div className="eyebrow !text-primary-soft mb-3">Contact</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
              Parlons de votre événement.
            </h1>
            <p className="font-serif-soft italic text-xl text-ivory/90 mt-4 max-w-2xl">
              Notre direction artistique vous accompagne, du premier mot jusqu'au dernier souvenir.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-14">
          {/* FORM */}
          <div className="bg-ivory p-8 lg:p-12 shadow-soft">
            <div className="eyebrow mb-3">Votre demande</div>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Écrivez-nous</h2>
            <p className="text-muted-foreground mb-8">
              Nous vous répondons personnellement sous 24 heures ouvrées.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Prénom & Nom"
                  required
                  value={form.nom}
                  onChange={(v) => setForm({ ...form, nom: v })}
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Field
                  label="Téléphone"
                  type="tel"
                  value={form.tel}
                  onChange={(v) => setForm({ ...form, tel: v })}
                />
                <Field
                  label="Date envisagée"
                  type="date"
                  value={form.date}
                  onChange={(v) => setForm({ ...form, date: v })}
                />
              </div>
              <div>
                <label className="eyebrow text-[10px] mb-1.5 block">Type d'événement</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-primary"
                >
                  {[
                    "Mariage",
                    "Fiançailles",
                    "Naissance",
                    "Baptême",
                    "Anniversaire",
                    "Sur mesure",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="eyebrow text-[10px] mb-1.5 block">Votre message</label>
                <textarea
                  rows={5}
                  placeholder="Parlez-nous de votre vision…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <GoldButton type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? "Envoi en cours" : "Envoyer ma demande"}
              </GoldButton>
            </form>
          </div>

          {/* SIDE */}
          <div className="space-y-6">
            <div className="bg-cacao text-ivory p-8 shadow-gold">
              <div className="eyebrow !text-primary-soft mb-4">Maison Eventia</div>
              <h3 className="font-display text-2xl">Un accompagnement signature</h3>
              <p className="font-serif-soft italic text-ivory/85 mt-3 leading-relaxed">
                Chaque demande est étudiée par notre direction artistique. Réponse personnelle,
                jamais automatique.
              </p>
            </div>

            <div className="bg-ivory shadow-soft p-6 space-y-5">
              <Info
                icon={<Mail className="size-5 text-primary" />}
                label="Par email"
                value="bonjour@eventiasignature.com"
              />
              <Info
                icon={<Phone className="size-5 text-primary" />}
                label="Par téléphone"
                value="+33 (0)1 00 00 00 00"
              />
              <Info
                icon={<MapPin className="size-5 text-primary" />}
                label="Adresse"
                value="Paris · France"
              />
              <Info
                icon={<Clock className="size-5 text-primary" />}
                label="Horaires"
                value="Lun · Ven 10h. 19h"
              />
            </div>

            <div className="bg-ivory shadow-soft p-6">
              <div className="eyebrow text-[10px] mb-2">Wedding planners</div>
              <p className="text-sm text-foreground/80">
                Programme partenaires dédié. Conditions avantageuses sur demande.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow text-[10px] mb-1.5 block">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="eyebrow text-[10px]">{label}</div>
        <div className="text-sm mt-0.5">{value}</div>
      </div>
    </div>
  );
}
