import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitB2BLead } from "@/lib/b2b.functions";
import { toast } from "sonner";
import { Building2, Send } from "lucide-react";

export const Route = createFileRoute("/entreprises")({
  head: () => ({
    meta: [
      { title: "Eventia pour les entreprises. événements signature" },
      {
        name: "description",
        content:
          "Solutions B2B Eventia : séminaires, lancements, galas. Devis sur mesure pour vos événements premium.",
      },
      { property: "og:title", content: "Eventia B2B. événements signature pour entreprises" },
      {
        property: "og:description",
        content:
          "Invitations, coffrets, expériences live. Sur mesure pour vos collaborateurs et clients.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/entreprises" }],
  }),
  component: B2BPage,
});

function B2BPage() {
  const submit = useServerFn(submitB2BLead);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact_name: "",
    email: "",
    phone: "",
    event_type: "",
    guests_count: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({
        data: {
          company: form.company,
          contact_name: form.contact_name,
          email: form.email,
          phone: form.phone || undefined,
          event_type: form.event_type || undefined,
          guests_count: form.guests_count ? Number(form.guests_count) : undefined,
          budget: form.budget || undefined,
          message: form.message || undefined,
        },
      });
      toast.success("Demande envoyée. Notre équipe vous recontacte sous 24 h.");
      setForm({
        company: "",
        contact_name: "",
        email: "",
        phone: "",
        event_type: "",
        guests_count: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <Building2 className="w-10 h-10 mx-auto mb-4 text-primary" />
        <h1 className="text-5xl font-serif mb-4">Eventia pour les entreprises</h1>
        <p className="text-lg text-muted-foreground">
          Séminaires, lancements produits, galas, soirées clients. Nous concevons des expériences
          signature qui marquent vos invités et incarnent votre marque.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-16">
        {[
          {
            title: "Invitations premium",
            body: "Cartons imprimés, scratch reveal, QR personnalisés. Aux couleurs de votre marque.",
          },
          {
            title: "Coffrets & accessoires",
            body: "Boîtes assorties, stickers, goodies. sourcing inclus.",
          },
          {
            title: "Expérience live",
            body: "Mur photo, playlist participative, RSVP digital, écran live le jour J.",
          },
        ].map((c) => (
          <article key={c.title} className="bg-card border rounded-2xl p-6">
            <h2 className="font-serif text-xl mb-2">{c.title}</h2>
            <p className="text-sm text-muted-foreground">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-serif text-center mb-6">Recevez votre devis</h2>
        <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-6 grid gap-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input
              required
              maxLength={150}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Société *"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              required
              maxLength={120}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Nom complet *"
              value={form.contact_name}
              onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              required
              type="email"
              maxLength={200}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Email pro *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              maxLength={40}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              maxLength={80}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Type d'événement"
              value={form.event_type}
              onChange={(e) => setForm({ ...form, event_type: e.target.value })}
            />
            <input
              type="number"
              min={1}
              max={100000}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Nb invités"
              value={form.guests_count}
              onChange={(e) => setForm({ ...form, guests_count: e.target.value })}
            />
            <input
              maxLength={80}
              className="border rounded-md px-3 py-2 bg-background"
              placeholder="Budget estimé"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />
          </div>
          <textarea
            maxLength={2000}
            rows={4}
            className="border rounded-md px-3 py-2 bg-background"
            placeholder="Décrivez votre projet"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-6 py-3 disabled:opacity-60"
          >
            {loading ? (
              "Envoi…"
            ) : (
              <>
                <Send className="w-4 h-4" /> Envoyer la demande
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
