import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Heart, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Section, GoldButton } from "@/components/site/SiteLayout";
import { getInvitationByRsvpToken, submitRsvp } from "@/lib/rsvp.functions";

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
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!done || status === "no") return;
    let cancelled = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelled) return;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#D8AE67", "#F7EFE3", "#C8A76A", "#211914", "#fff"],
        scalar: 1.1,
      });
      setTimeout(() => {
        if (!cancelled) confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 }, colors: ["#D8AE67", "#F7EFE3"] });
      }, 400);
    });
    return () => { cancelled = true; };
  }, [done, status]);

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
          guests_count: guests,
          message,
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
            <div className="eyebrow text-primary">RSVP</div>
            <h1 className="font-display text-4xl mt-2">{inv.couple_names}</h1>
            <p className="font-serif-soft italic text-muted-foreground mt-2">
              {new Date(inv.event_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {inv.venue ? ` · ${inv.venue}` : ""}
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
              <div>
                <label className="text-xs eyebrow">Nombre de convives</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full mt-1 px-4 py-3 bg-background border border-border text-sm"
                />
              </div>
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
            <GoldButton type="submit" disabled={busy} className="w-full">
              {busy && <Loader2 className="size-4 mr-2 animate-spin" />} Envoyer ma réponse
            </GoldButton>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}
