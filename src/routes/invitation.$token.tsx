import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Heart, Music, Image as ImageIcon, BookOpen, MapPin, Check, Send } from "lucide-react";
import heroImg from "@/assets/exp-aube-celeste.jpg";
import voilesImg from "@/assets/collection-voiles.jpg";
import jardinImg from "@/assets/exp-jardin-suspendu.jpg";
import operaImg from "@/assets/exp-opera-blanc.jpg";
import reveImg from "@/assets/exp-reve-ivoire.jpg";
import { getInvitationBundle, submitRsvp, addPlaylistTrack } from "@/lib/invitation.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/invitation/$token")({
  head: ({ params }) => ({
    meta: [
      { title: `Vous êtes invité·e — Eventia` },
      {
        name: "description",
        content: `Invitation Eventia ${params.token}. RSVP, playlist et galerie.`,
      },
      { property: "og:title", content: "Vous êtes invité·e à un moment Eventia" },
      {
        property: "og:description",
        content:
          "Confirmez votre présence, ajoutez votre morceau, partagez vos plus belles photos.",
      },
      { property: "og:image", content: heroImg },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InvitationPage,
});

type Invitation = {
  id: string;
  token: string;
  couple_names: string;
  event_date: string;
  venue: string | null;
  hero_url: string | null;
  message: string | null;
  allow_playlist: boolean;
  allow_gallery: boolean;
};
type Track = { id: string; title: string; artist: string | null; suggested_by: string | null };

function InvitationPage() {
  const { token } = Route.useParams();
  const fetchBundle = useServerFn(getInvitationBundle);
  const sendRsvp = useServerFn(submitRsvp);
  const sendTrack = useServerFn(addPlaylistTrack);

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [rsvp, setRsvp] = useState<"yes" | "no" | "maybe" | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");

  const refresh = async () => {
    try {
      const res = await fetchBundle({ data: { token } });
      setInvitation(res.invitation as Invitation | null);
      setPlaylist((res.playlist ?? []) as Track[]);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    refresh(); /* eslint-disable-next-line */
  }, [token]);

  // Données affichées (réelles ou fallback démo)
  const couple = invitation?.couple_names ?? "Camille & Adrien";
  const venue = invitation?.venue ?? "Château de Vaux-le-Pénil · 17h";
  const heroSrc = invitation?.hero_url || heroImg;
  const allowPlaylist = invitation?.allow_playlist ?? true;
  const allowGallery = invitation?.allow_gallery ?? true;

  const eventDate = useMemo(() => {
    if (invitation?.event_date) return new Date(invitation.event_date);
    const seed = token.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
    return new Date(Date.now() + (30 + (seed % 90)) * 86400000);
  }, [invitation, token]);

  const daysLeft = Math.max(0, Math.ceil((eventDate.getTime() - Date.now()) / 86400000));

  const submit = async () => {
    if (!rsvp || !name.trim()) return;
    setSubmitting(true);
    try {
      if (invitation) {
        await sendRsvp({
          data: {
            token,
            guest_name: name.trim(),
            guest_email: email.trim(),
            status: rsvp,
            guests_count: guestCount,
            message: message.trim(),
          },
        });
      }
      setDone(true);
      toast.success("Réponse envoyée");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur d'envoi");
    } finally {
      setSubmitting(false);
    }
  };

  const addSong = async () => {
    if (!song.trim()) return;
    const optimistic: Track = {
      id: `tmp-${Date.now()}`,
      title: song.trim(),
      artist: artist.trim() || null,
      suggested_by: name.trim() || null,
    };
    setPlaylist((s) => [optimistic, ...s].slice(0, 30));
    const t = song.trim();
    const a = artist.trim();
    setSong("");
    setArtist("");
    if (!invitation) return;
    try {
      await sendTrack({ data: { token, title: t, artist: a, suggested_by: name.trim() } });
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur ajout titre");
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Chargement…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <img src={heroSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-cacao/40 via-cacao/20 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-ivory">
          <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/80 mb-4">
            Vous êtes invité·e
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">{couple}</h1>
          {invitation?.message && (
            <p className="font-serif-soft italic text-lg md:text-2xl mt-4 max-w-lg">
              "{invitation.message}"
            </p>
          )}
          <div className="mt-8 flex gap-6 md:gap-10 text-ivory">
            {[
              { v: daysLeft, l: "jours" },
              { v: eventDate.getDate(), l: eventDate.toLocaleString("fr-FR", { month: "long" }) },
              { v: eventDate.getFullYear(), l: "année" },
            ].map((b) => (
              <div key={b.l} className="text-center">
                <div className="font-display text-3xl md:text-5xl">{b.v}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-80">{b.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-ivory/80">
            <MapPin className="size-3.5" /> {venue}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20 space-y-24">
        <section id="rsvp" className="text-center">
          <div className="eyebrow text-primary">RSVP</div>
          <h2 className="font-display text-4xl mt-2">Confirmez votre présence</h2>
          <p className="font-serif-soft italic text-muted-foreground mt-3">
            Réponse souhaitée avant le{" "}
            {new Date(eventDate.getTime() - 14 * 86400000).toLocaleDateString("fr-FR")}.
          </p>

          {done ? (
            <div className="mt-10 bg-ivory border border-primary/20 p-10 shadow-soft">
              <Check className="size-10 text-primary mx-auto" />
              <h3 className="font-display text-2xl mt-4">Merci {name.split(" ")[0]}</h3>
              <p className="font-serif-soft italic text-muted-foreground mt-2">
                Votre réponse a été reçue.
              </p>
            </div>
          ) : (
            <div className="mt-10 bg-ivory border border-primary/15 p-8 md:p-10 shadow-soft text-left space-y-6">
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { v: "yes", l: "Avec joie" },
                    { v: "maybe", l: "Peut-être" },
                    { v: "no", l: "Avec regret" },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setRsvp(o.v)}
                    className={`px-3 py-4 text-xs tracking-[0.18em] uppercase border ${rsvp === o.v ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"}`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  placeholder="Prénom & Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border text-sm"
                />
                <input
                  placeholder="Email (optionnel)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Convives
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                  className="w-24 px-3 py-3 bg-background border border-border text-sm"
                />
              </div>

              <textarea
                placeholder="Un mot doux pour les mariés…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border text-sm font-serif-soft italic"
              />

              <button
                onClick={submit}
                disabled={!rsvp || !name.trim() || submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs tracking-[0.22em] uppercase text-ivory bg-primary hover:bg-cacao disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-gold"
              >
                <Send className="size-4" /> {submitting ? "Envoi…" : "Envoyer ma réponse"}
              </button>
            </div>
          )}
        </section>

        {allowPlaylist && (
          <section>
            <div className="text-center mb-8">
              <Music className="size-5 text-primary mx-auto mb-2" />
              <div className="eyebrow text-primary">Playlist collaborative</div>
              <h2 className="font-display text-4xl mt-2">Quel morceau aimeriez-vous danser ?</h2>
            </div>
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 mb-4">
              <input
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Titre"
                className="px-4 py-3 bg-ivory border border-border text-sm"
              />
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artiste (optionnel)"
                className="px-4 py-3 bg-ivory border border-border text-sm"
              />
              <button
                onClick={addSong}
                className="px-5 py-3 text-xs tracking-[0.18em] uppercase text-ivory bg-primary hover:bg-cacao"
              >
                Ajouter
              </button>
            </div>
            <ul className="bg-ivory border border-primary/10 divide-y divide-border/60">
              {playlist.length === 0 && (
                <li className="px-4 py-6 text-center text-sm font-serif-soft italic text-muted-foreground">
                  Soyez le premier à proposer un morceau.
                </li>
              )}
              {playlist.map((t) => (
                <li key={t.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="font-serif-soft italic">
                    {t.artist ? `${t.artist} — ${t.title}` : t.title}
                    {t.suggested_by && (
                      <span className="text-muted-foreground text-xs ml-2">
                        par {t.suggested_by}
                      </span>
                    )}
                  </span>
                  <Music className="size-3.5 text-primary/60" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {allowGallery && (
          <section>
            <div className="text-center mb-8">
              <ImageIcon className="size-5 text-primary mx-auto mb-2" />
              <div className="eyebrow text-primary">Galerie live</div>
              <h2 className="font-display text-4xl mt-2">Partagez vos plus belles images</h2>
              <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
                Le jour J, vos clichés viendront ici, ensemble, comme un livre d'or vivant.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[voilesImg, jardinImg, operaImg, reveImg, heroImg, voilesImg].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-muted">
                  <img src={src} alt="" className="w-full h-full object-cover opacity-90" />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-ivory border border-primary/15 p-10 text-center">
          <BookOpen className="size-5 text-primary mx-auto mb-2" />
          <div className="eyebrow text-primary">Livre audio</div>
          <h2 className="font-display text-3xl mt-2">L'histoire des mariés</h2>
          <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
            Une histoire racontée à deux voix, à écouter avant le grand jour.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-[0.22em] uppercase text-foreground border border-foreground/40 hover:border-primary hover:text-primary">
            <Heart className="size-4" /> Écouter (4 min 12)
          </button>
        </section>

        <footer className="text-center text-[11px] tracking-[0.22em] uppercase text-muted-foreground pt-10 border-t border-border">
          Invitation Eventia · {token}
        </footer>
      </main>
    </div>
  );
}
