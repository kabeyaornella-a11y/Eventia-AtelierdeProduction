import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  Heart,
  Music,
  Image as ImageIcon,
  BookOpen,
  MapPin,
  Check,
  Send,
  Clock,
  Shirt,
  BedDouble,
  Car,
  Gift,
  Ticket,
  ExternalLink,
  Upload,
  Mic,
} from "lucide-react";
import heroImg from "@/assets/exp-aube-celeste.jpg";
import { getInvitationBundle, submitRsvp, addPlaylistTrack } from "@/lib/invitation.functions";
import { listApprovedGallery, submitGalleryPhoto } from "@/lib/gallery.functions";
import { createGalleryUploadUrl } from "@/lib/gallery-upload.functions";
import {
  createAudioUploadUrl,
  submitAudioMessage,
  listApprovedAudioMessages,
} from "@/lib/audio-messages.functions";
import { AudioRecorder } from "@/components/site/AudioRecorder";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { InvitationBlocks } from "@/lib/invitation-blocks";
import { normalizeAccommodations } from "@/lib/invitation-blocks";
import { CompanionsField, type Companion } from "@/components/site/CompanionsField";
import { Reveal } from "@/components/site/Reveal";
import { FramedCard } from "@/components/site/FramedCard";
import { markGuestOpened } from "@/lib/guest-list.functions";

const searchSchema = z.object({ g: z.string().optional() });

export const Route = createFileRoute("/invitation/$token")({
  validateSearch: searchSchema,
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
  blocks: InvitationBlocks | null;
  intro_video_url: string | null;
};
type Track = { id: string; title: string; artist: string | null; suggested_by: string | null };

/** Compte à rebours en direct J / H / M / S jusqu'à une date donnée. */
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

type Photo = { id: string; guest_name: string | null; caption: string | null; image_url: string };

function InvitationPage() {
  const { token } = Route.useParams();
  const { g: guestToken } = Route.useSearch();
  const fetchBundle = useServerFn(getInvitationBundle);
  const sendRsvp = useServerFn(submitRsvp);
  const sendTrack = useServerFn(addPlaylistTrack);
  const fetchGallery = useServerFn(listApprovedGallery);
  const createUploadUrl = useServerFn(createGalleryUploadUrl);
  const sendPhotoData = useServerFn(submitGalleryPhoto);
  const markOpened = useServerFn(markGuestOpened);
  const createAudioUrl = useServerFn(createAudioUploadUrl);
  const sendAudioData = useServerFn(submitAudioMessage);
  const fetchAudioMessages = useServerFn(listApprovedAudioMessages);

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [audioMessages, setAudioMessages] = useState<
    Array<{
      id: string;
      guest_name: string | null;
      audio_url: string;
      duration_seconds: number | null;
    }>
  >([]);
  const [loaded, setLoaded] = useState(false);
  const [splashDismissed, setSplashDismissed] = useState(false);

  const [rsvp, setRsvp] = useState<"yes" | "no" | "maybe" | null>(null);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allergies, setAllergies] = useState("");
  const [needsTransport, setNeedsTransport] = useState(false);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot anti-spam, doit rester vide
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");

  const refresh = async () => {
    try {
      const res = await fetchBundle({ data: { token } });
      setInvitation(res.invitation as Invitation | null);
      setPlaylist((res.playlist ?? []) as Track[]);
      const gallery = await fetchGallery({ data: { token } }).catch(() => ({ photos: [] }));
      setPhotos((gallery.photos ?? []) as Photo[]);
      const audio = await fetchAudioMessages({ data: { token } }).catch(() => ({ messages: [] }));
      setAudioMessages(audio.messages ?? []);
      if (guestToken) {
        const opened = await markOpened({ data: { token, guest_token: guestToken } }).catch(() => ({
          guest: null,
        }));
        if (opened.guest?.name) setName(opened.guest.name);
      }
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
  const blocks = invitation?.blocks ?? null;
  const accommodations = useMemo(() => normalizeAccommodations(blocks?.accommodations), [blocks]);

  const eventDate = useMemo(() => {
    if (invitation?.event_date) return new Date(invitation.event_date);
    const seed = token.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
    return new Date(Date.now() + (30 + (seed % 90)) * 86400000);
  }, [invitation, token]);

  const countdown = useCountdown(eventDate);

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
            companions,
            allergies: allergies.trim(),
            needs_transport: needsTransport,
            message: message.trim(),
            company,
            guest_token: guestToken ?? "",
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

  const sendPhoto = async () => {
    if (!galleryFile) return;
    if (galleryFile.size > 10 * 1024 * 1024) {
      toast.error("Photo trop lourde (max 10 Mo)");
      return;
    }
    setGalleryUploading(true);
    try {
      const ext = (galleryFile.name.split(".").pop() || "jpg").toLowerCase();
      const { path, url } = await createUploadUrl({ data: { token, ext } });
      const upRes = await fetch(url, {
        method: "PUT",
        body: galleryFile,
        headers: { "Content-Type": galleryFile.type },
      });
      if (!upRes.ok) throw new Error("Upload échoué");
      await sendPhotoData({
        data: { token, guest_name: name.trim() || undefined, image_url: `storage://${path}` },
      });
      toast.success("Merci ! Ta photo est en attente de validation.");
      setGalleryFile(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur d'envoi");
    } finally {
      setGalleryUploading(false);
    }
  };

  const sendAudio = async (blob: Blob, ext: string, durationSeconds: number) => {
    try {
      const { path, url } = await createAudioUrl({ data: { token, ext } });
      const upRes = await fetch(url, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": blob.type || "audio/webm" },
      });
      if (!upRes.ok) throw new Error("Envoi échoué");
      await sendAudioData({
        data: {
          token,
          guest_name: name.trim() || undefined,
          audio_url: path,
          duration_seconds: durationSeconds,
        },
      });
      toast.success("Merci ! Ton message est en attente de validation.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur d'envoi");
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Chargement…
      </div>
    );
  }

  const showSplash = !!invitation?.intro_video_url && !splashDismissed;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showSplash && (
        <button
          type="button"
          onClick={() => setSplashDismissed(true)}
          aria-label="Découvrir l'invitation"
          className="fixed inset-0 z-50 cursor-pointer bg-cacao text-ivory"
        >
          <video
            src={invitation?.intro_video_url ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cacao/30 via-transparent to-cacao/60" />
          <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-2">
            <span className="text-[11px] tracking-[0.3em] uppercase text-ivory/90">
              Toucher pour découvrir
            </span>
            <span className="size-2 rounded-full border border-ivory/70 animate-pulse" />
          </div>
        </button>
      )}

      <header className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <img src={heroSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-cacao/40 via-cacao/20 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-ivory">
          <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/80 mb-4">
            Vous êtes invité·e
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">
            {blocks?.hero_title || couple}
          </h1>
          {(blocks?.hero_subtitle || invitation?.message) && (
            <p className="font-serif-soft italic text-lg md:text-2xl mt-4 max-w-lg">
              "{blocks?.hero_subtitle || invitation?.message}"
            </p>
          )}
          <div className="mt-8 flex gap-4 md:gap-8 text-ivory">
            {[
              { v: countdown.days, l: "jours" },
              { v: countdown.hours, l: "heures" },
              { v: countdown.minutes, l: "minutes" },
              { v: countdown.seconds, l: "secondes" },
            ].map((b) => (
              <div key={b.l} className="text-center">
                <div className="font-display text-3xl md:text-5xl tabular-nums">
                  {String(b.v).padStart(2, "0")}
                </div>
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
        {blocks?.welcome_message && (
          <Reveal>
            <section className="text-center">
              <p className="font-serif-soft italic text-lg md:text-xl leading-relaxed text-foreground/90 max-w-xl mx-auto whitespace-pre-line">
                {blocks.welcome_message}
              </p>
            </section>
          </Reveal>
        )}

        {blocks?.story && (
          <Reveal>
            <section className="text-center">
              <div className="eyebrow text-primary">Notre histoire</div>
              <p className="font-serif-soft italic text-base md:text-lg leading-relaxed text-foreground/90 max-w-xl mx-auto mt-4 whitespace-pre-line">
                {blocks.story}
              </p>
            </section>
          </Reveal>
        )}

        {!!blocks?.programme?.length && (
          <Reveal>
            <section>
              <div className="text-center mb-10">
                <Clock className="size-5 text-primary mx-auto mb-2" />
                <div className="eyebrow text-primary">Programme</div>
                <h2 className="font-display text-4xl mt-2">Le déroulé de la journée</h2>
              </div>
              <ol className="space-y-6">
                {blocks.programme.map((step, i) => (
                  <li key={i} className="flex gap-5 items-start">
                    <div className="font-display text-lg text-primary w-16 shrink-0 text-right">
                      {step.time}
                    </div>
                    <div className="w-px self-stretch bg-primary/20 shrink-0" />
                    <div>
                      <h3 className="font-display text-xl">{step.title}</h3>
                      {step.description && (
                        <p className="font-serif-soft italic text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        )}

        {blocks?.dress_code && (blocks.dress_code.title || blocks.dress_code.description) && (
          <Reveal>
            <section className="text-center">
              <Shirt className="size-5 text-primary mx-auto mb-2" />
              <div className="eyebrow text-primary">Dress code</div>
              <h2 className="font-display text-4xl mt-2">
                {blocks.dress_code.title || "Tenue de la journée"}
              </h2>
              {blocks.dress_code.description && (
                <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
                  {blocks.dress_code.description}
                </p>
              )}
            </section>
          </Reveal>
        )}

        {!!accommodations.length && (
          <Reveal>
            <section>
              <div className="text-center mb-10">
                <BedDouble className="size-5 text-primary mx-auto mb-2" />
                <div className="eyebrow text-primary">Hébergement</div>
                <h2 className="font-display text-4xl mt-2">Où poser ses valises</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {accommodations.map((opt, i) => (
                  <FramedCard key={i} frameUrl={blocks?.frame_url}>
                    {opt.area && (
                      <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                        {opt.area}
                      </div>
                    )}
                    <h3 className="font-display text-xl">{opt.name}</h3>
                    {opt.notes && (
                      <p className="font-serif-soft italic text-sm text-muted-foreground mt-2">
                        {opt.notes}
                      </p>
                    )}
                    {opt.promo_code && (
                      <p className="text-xs mt-3">
                        Code&nbsp;:{" "}
                        <span className="font-mono bg-primary/10 text-primary px-2 py-0.5">
                          {opt.promo_code}
                        </span>
                      </p>
                    )}
                    {opt.booking_url && (
                      <a
                        href={opt.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-primary mt-4 hover:underline"
                      >
                        Réserver <ExternalLink className="size-3" />
                      </a>
                    )}
                  </FramedCard>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {blocks?.transport && (blocks.transport.title || blocks.transport.description) && (
          <Reveal>
            <section className="text-center">
              <Car className="size-5 text-primary mx-auto mb-2" />
              <div className="eyebrow text-primary">Transport</div>
              <h2 className="font-display text-4xl mt-2">
                {blocks.transport.title || "Comment venir"}
              </h2>
              {blocks.transport.description && (
                <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
                  {blocks.transport.description}
                </p>
              )}
            </section>
          </Reveal>
        )}

        {blocks?.gifts && (blocks.gifts.title || blocks.gifts.description) && (
          <Reveal>
            <section className="bg-ivory border border-primary/15 p-10 text-center">
              <Gift className="size-5 text-primary mx-auto mb-2" />
              <div className="eyebrow text-primary">Cadeaux</div>
              <h2 className="font-display text-3xl mt-2">
                {blocks.gifts.title || "Liste de cadeaux"}
              </h2>
              {blocks.gifts.description && (
                <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
                  {blocks.gifts.description}
                </p>
              )}
            </section>
          </Reveal>
        )}

        {allowPlaylist && (
          <Reveal>
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
          </Reveal>
        )}

        {allowGallery && (
          <Reveal>
            <section>
              <div className="text-center mb-8">
                <ImageIcon className="size-5 text-primary mx-auto mb-2" />
                <div className="eyebrow text-primary">Galerie live</div>
                <h2 className="font-display text-4xl mt-2">Partagez vos plus belles images</h2>
                <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
                  Le jour J, vos clichés viennent ici, ensemble, comme un livre d'or vivant.
                </p>
              </div>

              <div className="grid sm:grid-cols-[1fr_auto] gap-2 mb-6 max-w-md mx-auto">
                <label className="flex items-center gap-2 px-4 py-3 bg-ivory border border-border text-sm cursor-pointer truncate">
                  <Upload className="size-4 shrink-0 text-primary" />
                  <span className="truncate">
                    {galleryFile ? galleryFile.name : "Choisir une photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setGalleryFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                <button
                  onClick={sendPhoto}
                  disabled={!galleryFile || galleryUploading}
                  className="px-5 py-3 text-xs tracking-[0.18em] uppercase text-ivory bg-primary hover:bg-cacao disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {galleryUploading ? "Envoi…" : "Envoyer"}
                </button>
              </div>

              {photos.length === 0 ? (
                <p className="text-center text-sm font-serif-soft italic text-muted-foreground">
                  Soyez le premier à partager une photo.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {photos.slice(0, 9).map((p) => (
                    <div key={p.id} className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={p.image_url}
                        alt={p.caption ?? ""}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-6">
                <a
                  href={`/galerie/${token}`}
                  className="text-xs tracking-[0.18em] uppercase text-primary hover:underline"
                >
                  Voir toute la galerie
                </a>
              </div>
            </section>
          </Reveal>
        )}

        {!!blocks?.faq?.length && (
          <Reveal>
            <section>
              <div className="text-center mb-8">
                <Ticket className="size-5 text-primary mx-auto mb-2" />
                <div className="eyebrow text-primary">Questions fréquentes</div>
                <h2 className="font-display text-4xl mt-2">Tout ce qu'il faut savoir</h2>
              </div>
              <Accordion
                type="single"
                collapsible
                className="bg-ivory border border-primary/10 px-2"
              >
                {blocks.faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="font-display text-base px-3">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-serif-soft italic text-muted-foreground px-3">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </Reveal>
        )}

        <Reveal>
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
                  {blocks?.thank_you || "Votre réponse a été reçue."}
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
                <input
                  placeholder="Vos allergies ou régime alimentaire (optionnel)"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border text-sm"
                />

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

                <textarea
                  placeholder="Un mot doux pour les mariés…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border text-sm font-serif-soft italic"
                />

                {/* Honeypot anti-spam : invisible pour un humain, jamais rempli sauf par un bot. */}
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
        </Reveal>

        <Reveal>
          <section>
            <div className="text-center mb-8">
              <Mic className="size-5 text-primary mx-auto mb-2" />
              <div className="eyebrow text-primary">Guestbook vocal</div>
              <h2 className="font-display text-4xl mt-2">Un mot de vive voix pour les mariés</h2>
              <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
                Laissez un message vocal — les mariés l'écouteront précieusement après le grand
                jour.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <AudioRecorder onSend={sendAudio} />
            </div>
            {audioMessages.length > 0 && (
              <ul className="max-w-md mx-auto mt-6 space-y-3">
                {audioMessages.slice(0, 10).map((m) => (
                  <li key={m.id} className="bg-ivory border border-primary/10 p-4">
                    {m.guest_name && (
                      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        {m.guest_name}
                      </div>
                    )}
                    <audio src={m.audio_url} controls className="w-full" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </Reveal>

        <Reveal>
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
        </Reveal>

        <footer className="text-center text-[11px] tracking-[0.22em] uppercase text-muted-foreground pt-10 border-t border-border">
          Invitation Eventia · {token}
        </footer>
      </main>
    </div>
  );
}
