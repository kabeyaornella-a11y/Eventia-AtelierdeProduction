import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Heart, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Section, GoldButton } from "@/components/site/SiteLayout";
import { getInvitationByRsvpToken, submitRsvp } from "@/lib/rsvp.functions";
import { CompanionsField, type Companion } from "@/components/site/CompanionsField";

export const Route = createFileRoute("/rsvp/$token")({
  head: ({ params }) => ({
    meta: [
      { title: "RSVP — Eventia Signature" },
      { name: "description", content: "Confirmez votre présence à l'invitation." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `https://www.eventiasignature.com/rsvp/${params.token}` }],
  }),
  component: RsvpPage,
});

function RsvpPage() {
  const { token } = Route.useParams();
  const fetchInv = useServerFn(getInvitationByRsvpToken);
  const submit = useServerFn(submitRsvp);

  const { data, isLoading, error } = useQuery({
    queryKey: ["rsvp-inv", token],
    queryFn: () => fetchInv({ data: { token } }),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"yes" | "no" | "maybe">("yes");
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [allergies, setAllergies] = useState("");
  const [needsTransport, setNeedsTransport] = useState(false);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot anti-spam, doit rester vide
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await submit({
        data: {
          token,
          guest_name: name,
          guest_email: email,
          status,
          companions,
          allergies,
          needs_transport: needsTransport,
          message,
          company,
        },
      });
      setDone(true);
      toast.success("Merci pour votre réponse 🤍");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  if (isLoading)
    return (
      <SiteLayout>
        <Section>
          <div className="py-20 text-center">Chargement…</div>
        </Section>
      </SiteLayout>
    );
  if (error || !data)
    return (
      <SiteLayout>
        <Section>
          <div className="py-20 text-center">Lien invalide.</div>
        </Section>
      </SiteLayout>
    );

  const inv = data.invitation;

  if (done)
    return (
      <SiteLayout>
        <Section>
          <div className="max-w-md mx-auto text-center py-12">
            <Check className="size-10 mx-auto text-primary mb-4" />
            <h1 className="font-display text-3xl mb-2">Réponse enregistrée</h1>
            <p className="font-serif-soft italic text-muted-foreground">
              Les mariés en seront notifiés.
            </p>
          </div>
        </Section>
      </SiteLayout>
    );

  return (
    <SiteLayout>
      <Section>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <Heart className="size-6 text-primary mx-auto mb-3" />
            <div className="eyebrow text-primary">Réponse rapide</div>
            <h1 className="font-display text-4xl mt-2">{inv.couple_names}</h1>
            <p className="font-serif-soft italic text-muted-foreground mt-2">
              {new Date(inv.event_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {inv.venue ? ` · ${inv.venue}` : ""}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Vous voulez revoir tous les détails (programme, hébergement, cadeaux…) ?{" "}
              <a href={`/invitation/${inv.token}`} className="text-primary hover:underline">
                Ouvrir l'invitation complète
              </a>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-ivory border border-primary/10 shadow-soft p-6 space-y-4"
          >
            <div>
              <label className="text-xs eyebrow">Votre nom *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-background border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs eyebrow">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-background border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs eyebrow">Votre réponse</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {(["yes", "maybe", "no"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-3 text-sm border ${status === s ? "border-primary bg-primary/5 text-primary" : "border-border"}`}
                  >
                    {s === "yes" ? "Présent" : s === "maybe" ? "Peut-être" : "Absent"}
                  </button>
                ))}
              </div>
            </div>
            {status !== "no" && (
              <>
                <div>
                  <label className="text-xs eyebrow">Vos allergies ou régime alimentaire</label>
                  <input
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full mt-1 px-4 py-3 bg-background border border-border text-sm"
                  />
                </div>
                <CompanionsField value={companions} onChange={setCompanions} />
                <label className="flex items-center gap-3 text-sm text-foreground/80">
                  <input
                    type="checkbox"
                    checked={needsTransport}
                    onChange={(e) => setNeedsTransport(e.target.checked)}
                    className="size-4 accent-primary"
                  />
                  J'aurai besoin d'un transport vers le lieu
                </label>
              </>
            )}
            <div>
              <label className="text-xs eyebrow">Message (optionnel)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full mt-1 px-4 py-3 bg-background border border-border text-sm font-serif-soft"
              />
            </div>
            {/* Honeypot anti-spam : invisible pour un humain. */}
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <label htmlFor="company">Ne pas remplir</label>
              <input
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <GoldButton type="submit" disabled={busy} className="w-full">
              {busy && <Loader2 className="size-4 mr-2 animate-spin" />} Envoyer ma réponse
            </GoldButton>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}
