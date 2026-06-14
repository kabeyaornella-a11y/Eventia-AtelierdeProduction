import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  getOwnerLiveData,
  upsertAccommodation,
  deleteAccommodation,
  upsertTransport,
  deleteTransport,
  recordCheckin,
} from "@/lib/live.functions";
import { SiteLayout, Section, GoldButton } from "@/components/site/SiteLayout";
import { ArrowLeft, BedDouble, Bus, Lock, QrCode, Trash2, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/mes-invitations/$id/live")({
  head: () => ({
    meta: [{ title: "Eventia Live — Back-office" }, { name: "robots", content: "noindex" }],
  }),
  component: LiveBackOffice,
});

function LiveBackOffice() {
  const { id } = Route.useParams();
  const fetchData = useServerFn(getOwnerLiveData);
  const upAcc = useServerFn(upsertAccommodation);
  const delAcc = useServerFn(deleteAccommodation);
  const upTr = useServerFn(upsertTransport);
  const delTr = useServerFn(deleteTransport);
  const checkin = useServerFn(recordCheckin);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["owner-live", id],
    queryFn: () => fetchData({ data: { invitation_id: id } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["owner-live", id] });

  const accMut = useMutation({
    mutationFn: (payload: any) => upAcc({ data: payload }),
    onSuccess: () => {
      toast.success("Hébergement enregistré");
      invalidate();
    },
    onError: (e: any) => toast.error(e?.message ?? "Erreur"),
  });
  const accDelMut = useMutation({
    mutationFn: (aid: string) => delAcc({ data: { id: aid, invitation_id: id } }),
    onSuccess: () => {
      toast.success("Supprimé");
      invalidate();
    },
  });
  const trMut = useMutation({
    mutationFn: (payload: any) => upTr({ data: payload }),
    onSuccess: () => {
      toast.success("Transport enregistré");
      invalidate();
    },
    onError: (e: any) => toast.error(e?.message ?? "Erreur"),
  });
  const trDelMut = useMutation({
    mutationFn: (tid: string) => delTr({ data: { id: tid, invitation_id: id } }),
    onSuccess: () => {
      toast.success("Supprimé");
      invalidate();
    },
  });
  const checkinMut = useMutation({
    mutationFn: (name: string) => checkin({ data: { invitation_id: id, guest_name: name } }),
    onSuccess: () => {
      toast.success("Invité pointé");
      invalidate();
    },
    onError: (e: any) => toast.error(e?.message ?? "Erreur"),
  });

  const [accForm, setAccForm] = useState({
    name: "",
    address: "",
    type: "",
    price_per_night: "",
    booking_url: "",
    notes: "",
    contact_phone: "",
  });
  const [trForm, setTrForm] = useState({
    type: "",
    departure: "",
    arrival: "",
    scheduled_at: "",
    info: "",
  });
  const [checkinName, setCheckinName] = useState("");

  return (
    <SiteLayout>
      <Section>
        <Link
          to="/mes-invitations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à mes invitations
        </Link>
        <div className="eyebrow mb-2">Eventia Live</div>
        <h1 className="font-display text-4xl md:text-5xl mb-2">Back-office Live</h1>
        <p className="font-serif-soft italic text-muted-foreground mb-12">
          Renseignez vos hébergements, transports, et pointez vos invités le jour J.
        </p>

        {isLoading && <p className="text-center text-muted-foreground">Chargement…</p>}

        {!isLoading && data && (
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Hébergements */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BedDouble className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl">Hébergements</h2>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  accMut.mutate(
                    {
                      invitation_id: id,
                      name: accForm.name,
                      address: accForm.address,
                      type: accForm.type,
                      price_per_night: accForm.price_per_night
                        ? Number(accForm.price_per_night)
                        : null,
                      booking_url: accForm.booking_url,
                      notes: accForm.notes,
                      contact_phone: accForm.contact_phone,
                    },
                    {
                      onSuccess: () =>
                        setAccForm({
                          name: "",
                          address: "",
                          type: "",
                          price_per_night: "",
                          booking_url: "",
                          notes: "",
                          contact_phone: "",
                        }),
                    },
                  );
                }}
                className="bg-ivory border border-border p-5 space-y-3 mb-6"
              >
                <input
                  required
                  placeholder="Nom de l'hébergement"
                  value={accForm.name}
                  onChange={(e) => setAccForm({ ...accForm, name: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <input
                  placeholder="Adresse"
                  value={accForm.address}
                  onChange={(e) => setAccForm({ ...accForm, address: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Type (hôtel, gîte…)"
                    value={accForm.type}
                    onChange={(e) => setAccForm({ ...accForm, type: e.target.value })}
                    className="px-3 py-2 border text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Prix / nuit (€)"
                    value={accForm.price_per_night}
                    onChange={(e) => setAccForm({ ...accForm, price_per_night: e.target.value })}
                    className="px-3 py-2 border text-sm"
                  />
                </div>
                <input
                  placeholder="Lien de réservation"
                  value={accForm.booking_url}
                  onChange={(e) => setAccForm({ ...accForm, booking_url: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <input
                  placeholder="Téléphone"
                  value={accForm.contact_phone}
                  onChange={(e) => setAccForm({ ...accForm, contact_phone: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <textarea
                  rows={2}
                  placeholder="Notes"
                  value={accForm.notes}
                  onChange={(e) => setAccForm({ ...accForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <GoldButton type="submit" disabled={accMut.isPending} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </GoldButton>
              </form>
              <ul className="space-y-2">
                {data.accommodations.map((a: any) => (
                  <li
                    key={a.id}
                    className="bg-card border p-4 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-serif">{a.name}</div>
                      <div className="text-xs text-muted-foreground">{a.address}</div>
                      {a.price_per_night && (
                        <div className="text-xs text-primary">{a.price_per_night} €/nuit</div>
                      )}
                    </div>
                    <button
                      onClick={() => accDelMut.mutate(a.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Transports */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl">Transports & navettes</h2>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  trMut.mutate(
                    {
                      invitation_id: id,
                      type: trForm.type,
                      departure: trForm.departure,
                      arrival: trForm.arrival,
                      scheduled_at: trForm.scheduled_at
                        ? new Date(trForm.scheduled_at).toISOString()
                        : "",
                      info: trForm.info,
                    },
                    {
                      onSuccess: () =>
                        setTrForm({
                          type: "",
                          departure: "",
                          arrival: "",
                          scheduled_at: "",
                          info: "",
                        }),
                    },
                  );
                }}
                className="bg-ivory border border-border p-5 space-y-3 mb-6"
              >
                <input
                  required
                  placeholder="Type (navette, train…)"
                  value={trForm.type}
                  onChange={(e) => setTrForm({ ...trForm, type: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Départ"
                    value={trForm.departure}
                    onChange={(e) => setTrForm({ ...trForm, departure: e.target.value })}
                    className="px-3 py-2 border text-sm"
                  />
                  <input
                    placeholder="Arrivée"
                    value={trForm.arrival}
                    onChange={(e) => setTrForm({ ...trForm, arrival: e.target.value })}
                    className="px-3 py-2 border text-sm"
                  />
                </div>
                <input
                  type="datetime-local"
                  value={trForm.scheduled_at}
                  onChange={(e) => setTrForm({ ...trForm, scheduled_at: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <textarea
                  rows={2}
                  placeholder="Info complémentaire"
                  value={trForm.info}
                  onChange={(e) => setTrForm({ ...trForm, info: e.target.value })}
                  className="w-full px-3 py-2 border text-sm"
                />
                <GoldButton type="submit" disabled={trMut.isPending} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </GoldButton>
              </form>
              <ul className="space-y-2">
                {data.transports.map((t: any) => (
                  <li
                    key={t.id}
                    className="bg-card border p-4 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="font-serif">{t.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.departure} {t.arrival && `→ ${t.arrival}`}
                      </div>
                      {t.scheduled_at && (
                        <div className="text-xs text-primary">
                          {new Date(t.scheduled_at).toLocaleString("fr-FR")}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => trDelMut.mutate(t.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Check-in */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl">Check-in invités</h2>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!checkinName.trim()) return;
                  checkinMut.mutate(checkinName, { onSuccess: () => setCheckinName("") });
                }}
                className="bg-ivory border border-border p-5 flex gap-3 mb-6"
              >
                <input
                  required
                  placeholder="Nom de l'invité"
                  value={checkinName}
                  onChange={(e) => setCheckinName(e.target.value)}
                  className="flex-1 px-3 py-2 border text-sm"
                />
                <GoldButton type="submit" disabled={checkinMut.isPending}>
                  <Check className="w-4 h-4 mr-2" />
                  Pointer
                </GoldButton>
              </form>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                {data.checkins.length} invité{data.checkins.length > 1 ? "s" : ""} pointé
                {data.checkins.length > 1 ? "s" : ""}
              </div>
              <ul className="divide-y border bg-card max-h-96 overflow-auto">
                {data.checkins.map((c: any) => (
                  <li key={c.id} className="px-4 py-2 flex justify-between text-sm">
                    <span>{c.guest_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.checked_in_at).toLocaleTimeString("fr-FR")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Time capsule */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl">Time capsule</h2>
              </div>
              <p className="text-sm italic text-muted-foreground mb-4">
                Les messages déposés par vos invités. Ceux dont la date d'ouverture est passée vous
                sont accessibles.
              </p>
              <ul className="space-y-2">
                {data.timeCapsule.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Aucun message déposé pour le moment.
                  </p>
                )}
                {data.timeCapsule.map((m: any) => {
                  const locked = m.unlock_at && new Date(m.unlock_at).getTime() > Date.now();
                  return (
                    <li key={m.id} className="bg-card border p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif">{m.author_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {locked
                            ? `S'ouvre le ${new Date(m.unlock_at).toLocaleDateString("fr-FR")}`
                            : "Disponible"}
                        </span>
                      </div>
                      {locked ? (
                        <p className="text-sm italic text-muted-foreground flex items-center gap-2">
                          <Lock className="w-3 h-3" /> Message scellé
                        </p>
                      ) : (
                        <p className="text-sm">{m.message}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
