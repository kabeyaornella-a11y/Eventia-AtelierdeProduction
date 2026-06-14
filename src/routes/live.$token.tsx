import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getInvitationBundle } from "@/lib/invitation.functions";
import { listApprovedGallery } from "@/lib/gallery.functions";
import { listTracks } from "@/lib/playlist.functions";
import { getLiveData, postTimeCapsule } from "@/lib/live.functions";
import { buildQrUrl } from "@/lib/qr";
import { Heart, Music, Camera, Clock, BedDouble, Bus, Lock, Send } from "lucide-react";

export const Route = createFileRoute("/live/$token")({
  head: () => ({
    meta: [{ title: "Live — Eventia" }, { name: "robots", content: "noindex" }],
  }),
  component: LivePage,
});

function useCountdown(target: string | null) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  if (!target) return null;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, live: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
    live: false,
  };
}

type Tab = "programme" | "hebergements" | "transports" | "capsule" | "galerie";

function LivePage() {
  const { token } = Route.useParams();
  const getBundle = useServerFn(getInvitationBundle);
  const getPhotos = useServerFn(listApprovedGallery);
  const getMusic = useServerFn(listTracks);
  const getLive = useServerFn(getLiveData);
  const postCapsule = useServerFn(postTimeCapsule);

  const [bundle, setBundle] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [live, setLive] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("programme");

  const reload = async () => {
    try {
      const [b, p, t, l] = await Promise.all([
        getBundle({ data: { token } }),
        getPhotos({ data: { token } }),
        getMusic({ data: { token } }),
        getLive({ data: { token } }),
      ]);
      setBundle(b);
      setPhotos(p.photos);
      setTracks(t.tracks);
      setLive(l);
    } catch {}
  };

  useEffect(() => {
    let alive = true;
    reload();
    const i = setInterval(() => alive && reload(), 30000);
    return () => {
      alive = false;
      clearInterval(i);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const cd = useCountdown(bundle?.invitation?.event_date ?? null);
  const galleryUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/galerie/${bundle?.invitation?.rsvp_token ?? token}`
      : "";
  const rsvpUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/rsvp/${bundle?.invitation?.rsvp_token ?? token}`
      : "";

  const [capsuleForm, setCapsuleForm] = useState({ author_name: "", message: "", unlock_at: "" });
  const capsuleMut = useMutation({
    mutationFn: () =>
      postCapsule({
        data: {
          token,
          author_name: capsuleForm.author_name,
          message: capsuleForm.message,
          unlock_at: capsuleForm.unlock_at ? new Date(capsuleForm.unlock_at).toISOString() : "",
        },
      }),
    onSuccess: () => {
      toast.success("Message déposé dans la capsule.");
      setCapsuleForm({ author_name: "", message: "", unlock_at: "" });
      reload();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erreur"),
  });

  const tabs: Array<{ id: Tab; label: string; icon: any }> = [
    { id: "programme", label: "Programme", icon: Clock },
    { id: "hebergements", label: "Hébergements", icon: BedDouble },
    { id: "transports", label: "Transports", icon: Bus },
    { id: "capsule", label: "Time capsule", icon: Lock },
    { id: "galerie", label: "Galerie", icon: Camera },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {bundle?.invitation?.hero_url && (
          <img
            src={bundle.invitation.hero_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="relative text-center px-6">
          <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h1 className="text-5xl md:text-7xl font-serif">
            {bundle?.invitation?.couple_names ?? "Live"}
          </h1>
          {cd && !cd.live && (
            <div className="mt-6 flex justify-center gap-4 text-2xl tabular-nums">
              <span>
                <strong>{cd.d}</strong>j
              </span>
              <span>
                <strong>{cd.h}</strong>h
              </span>
              <span>
                <strong>{cd.m}</strong>m
              </span>
              <span>
                <strong>{cd.s}</strong>s
              </span>
            </div>
          )}
          {cd?.live && (
            <p className="mt-6 text-2xl text-primary inline-flex items-center gap-2">
              <Clock className="w-5 h-5" /> C'est maintenant
            </p>
          )}
        </div>
      </section>

      <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm uppercase tracking-[0.18em] border-b-2 whitespace-nowrap transition-colors ${
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {tab === "programme" && (
          <section className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-2xl p-6 text-center">
              <Camera className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h2 className="font-serif text-xl mb-2">Galerie souvenirs</h2>
              <img
                src={buildQrUrl(galleryUrl, 240)}
                alt="QR Galerie"
                className="mx-auto rounded-lg bg-white p-2"
              />
              <p className="text-sm text-muted-foreground mt-3">Scannez pour partager vos photos</p>
            </div>
            <div className="bg-card border rounded-2xl p-6 text-center">
              <Music className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h2 className="font-serif text-xl mb-2">Playlist</h2>
              <img
                src={buildQrUrl(rsvpUrl, 240)}
                alt="QR Playlist"
                className="mx-auto rounded-lg bg-white p-2"
              />
              <p className="text-sm text-muted-foreground mt-3">Proposez votre morceau</p>
            </div>
            <div className="bg-card border rounded-2xl p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h2 className="font-serif text-xl mb-2">RSVP</h2>
              <img
                src={buildQrUrl(rsvpUrl, 240)}
                alt="QR RSVP"
                className="mx-auto rounded-lg bg-white p-2"
              />
              <p className="text-sm text-muted-foreground mt-3">Confirmez votre présence</p>
            </div>
          </section>
        )}

        {tab === "hebergements" && (
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-center mb-6">Où dormir</h2>
            {(live?.accommodations ?? []).length === 0 ? (
              <p className="text-center text-muted-foreground">
                Les mariés n'ont pas encore renseigné d'hébergement.
              </p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-4">
                {live.accommodations.map((a: any) => (
                  <li key={a.id} className="bg-card border rounded-2xl p-6">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-xl">{a.name}</h3>
                      {a.price_per_night && (
                        <span className="text-primary text-sm">{a.price_per_night} € / nuit</span>
                      )}
                    </div>
                    {a.type && (
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
                        {a.type}
                      </p>
                    )}
                    {a.address && <p className="text-sm mt-2">{a.address}</p>}
                    {a.notes && (
                      <p className="text-sm italic text-muted-foreground mt-2">{a.notes}</p>
                    )}
                    {a.contact_phone && <p className="text-xs mt-2">Tél. {a.contact_phone}</p>}
                    {a.booking_url && (
                      <a
                        href={a.booking_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 text-sm text-primary underline"
                      >
                        Réserver →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "transports" && (
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-center mb-6">Navettes & trajets</h2>
            {(live?.transports ?? []).length === 0 ? (
              <p className="text-center text-muted-foreground">
                Aucun transport renseigné pour le moment.
              </p>
            ) : (
              <ul className="divide-y border rounded-2xl bg-card">
                {live.transports.map((t: any) => (
                  <li key={t.id} className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg">{t.type}</span>
                      {t.scheduled_at && (
                        <span className="text-sm text-muted-foreground">
                          {new Date(t.scheduled_at).toLocaleString("fr-FR")}
                        </span>
                      )}
                    </div>
                    {(t.departure || t.arrival) && (
                      <p className="text-sm mt-2">
                        {t.departure} {t.arrival && `→ ${t.arrival}`}
                      </p>
                    )}
                    {t.info && (
                      <p className="text-sm italic text-muted-foreground mt-1">{t.info}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "capsule" && (
          <section className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-center mb-3">Time capsule</h2>
            <p className="text-center text-muted-foreground italic mb-8">
              Déposez un mot pour les mariés. Il leur sera révélé à la date qu'ils ont choisie.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                capsuleMut.mutate();
              }}
              className="bg-card border rounded-2xl p-6 space-y-3"
            >
              <input
                required
                placeholder="Votre nom"
                value={capsuleForm.author_name}
                onChange={(e) => setCapsuleForm({ ...capsuleForm, author_name: e.target.value })}
                className="w-full px-4 py-3 bg-background border rounded text-sm"
                maxLength={120}
              />
              <textarea
                required
                rows={5}
                placeholder="Votre message…"
                value={capsuleForm.message}
                onChange={(e) => setCapsuleForm({ ...capsuleForm, message: e.target.value })}
                className="w-full px-4 py-3 bg-background border rounded text-sm italic"
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={capsuleMut.isPending}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded text-sm uppercase tracking-[0.18em] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> {capsuleMut.isPending ? "Envoi…" : "Déposer mon mot"}
              </button>
            </form>

            <div className="mt-10 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.22em] text-muted-foreground text-center">
                Messages déjà déposés
              </h3>
              {(live?.timeCapsule ?? []).length === 0 ? (
                <p className="text-center text-muted-foreground text-sm">
                  Soyez le premier à laisser un mot.
                </p>
              ) : (
                <ul className="space-y-2">
                  {live.timeCapsule.map((m: any) => (
                    <li
                      key={m.id}
                      className="bg-card border rounded-xl p-4 flex items-center justify-between"
                    >
                      <span className="font-serif">{m.author_name}</span>
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {m.locked && m.unlock_at
                          ? `S'ouvre le ${new Date(m.unlock_at).toLocaleDateString("fr-FR")}`
                          : "Déposé"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {tab === "galerie" && (
          <section>
            <h2 className="font-serif text-3xl mb-6 text-center">Mur photos en direct</h2>
            {photos.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Les premières photos arrivent bientôt.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {photos.slice(0, 48).map((p) => (
                  <img
                    key={p.id}
                    src={p.image_url}
                    alt=""
                    className="w-full h-44 object-cover rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
            {tracks.length > 0 && (
              <>
                <h3 className="font-serif text-2xl mt-12 mb-4 text-center">Playlist proposée</h3>
                <ul className="divide-y border rounded-2xl bg-card max-w-3xl mx-auto">
                  {tracks.slice(0, 40).map((t) => (
                    <li key={t.id} className="px-4 py-3 flex justify-between text-sm">
                      <span>
                        <strong>{t.title}</strong> — {t.artist}
                      </span>
                      {t.suggested_by && (
                        <span className="text-muted-foreground">par {t.suggested_by}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
