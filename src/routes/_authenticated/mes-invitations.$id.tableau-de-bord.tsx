import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import {
  ArrowLeft,
  Users,
  MailOpen,
  MailQuestion,
  Check,
  X,
  HelpCircle,
  Baby,
  UserCheck,
  Car,
  Copy,
  Plus,
  Trash2,
  Pencil,
  Table as TableIcon,
  Image as ImageIcon,
  Mic,
  Loader2,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { getDashboardStats } from "@/lib/dashboard.functions";
import { addGuest, bulkAddGuests, updateGuestTable, deleteGuest } from "@/lib/guest-list.functions";
import { listPendingGalleryForOwner } from "@/lib/admin-extras.functions";
import { moderateGalleryPhoto } from "@/lib/gallery.functions";
import { listPendingAudioForOwner, moderateAudioMessage } from "@/lib/audio-messages.functions";
import { exportGuestsCsv, exportSummaryPdf } from "@/lib/guest-exports";

export const Route = createFileRoute("/_authenticated/mes-invitations/$id/tableau-de-bord")({
  head: () => ({
    meta: [{ title: "Suivi RSVP — Eventia Signature" }, { name: "robots", content: "noindex" }],
  }),
  component: GuestDashboard,
});

type Tab = "apercu" | "invites" | "table" | "galerie";

function GuestDashboard() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const fetchStats = useServerFn(getDashboardStats);

  const { data, isLoading } = useQuery({
    queryKey: ["guest-dashboard", id],
    queryFn: () => fetchStats({ data: { invitation_id: id } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["guest-dashboard", id] });

  const [tab, setTab] = useState<Tab>("apercu");

  if (isLoading) {
    return (
      <SiteLayout>
        <Section>
          <div className="py-20 text-center text-muted-foreground">Chargement…</div>
        </Section>
      </SiteLayout>
    );
  }
  if (!data) {
    return (
      <SiteLayout>
        <Section>
          <div className="py-20 text-center">Invitation introuvable</div>
        </Section>
      </SiteLayout>
    );
  }

  const { invitation, guests, rsvps, stats, allergies } = data;

  const tabs: Array<{ id: Tab; label: string; icon: typeof Users }> = [
    { id: "apercu", label: "Aperçu", icon: Users },
    { id: "invites", label: "Invités", icon: MailOpen },
    { id: "table", label: "Plan de table", icon: TableIcon },
    { id: "galerie", label: "Galerie & messages", icon: ImageIcon },
  ];

  return (
    <SiteLayout>
      <Section>
        <Link
          to="/tableau-de-bord"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="size-4" /> Tableau de bord
        </Link>

        <div className="mb-8">
          <div className="eyebrow text-primary">Suivi RSVP</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">{invitation.couple_names}</h1>
          <p className="font-serif-soft italic text-muted-foreground mt-2">
            {new Date(invitation.event_date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 mb-10 border-b border-border/60 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase ${
                tab === t.id
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              <t.icon className="size-3.5" /> {t.label}
            </button>
          ))}
        </nav>

        {tab === "apercu" && (
          <OverviewTab
            stats={stats}
            allergies={allergies}
            guests={guests}
            invitation={invitation}
          />
        )}
        {tab === "invites" && (
          <GuestsTab
            invitationId={id}
            guests={guests}
            invitationToken={invitation.token as string | undefined}
            onChange={invalidate}
          />
        )}
        {tab === "table" && (
          <TablePlanTab guests={guests} onChange={invalidate} invitationId={id} />
        )}
        {tab === "galerie" && <GalleryAudioTab invitationId={id} />}
      </Section>
    </SiteLayout>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  tone?: "default" | "success" | "danger" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "text-emerald-700"
      : tone === "danger"
        ? "text-destructive"
        : tone === "warning"
          ? "text-amber-700"
          : "text-primary";
  return (
    <div className="bg-ivory border border-primary/15 p-5 shadow-soft">
      <div className="flex items-center justify-between mb-2">
        <div className="eyebrow text-[10px] text-muted-foreground">{label}</div>
        <Icon className={`size-4 ${toneClass}`} />
      </div>
      <div className={`font-display text-3xl ${toneClass}`}>{value}</div>
    </div>
  );
}

function OverviewTab({
  stats,
  allergies,
  guests,
  invitation,
}: {
  stats: Awaited<ReturnType<typeof getDashboardStats>>["stats"];
  allergies: Array<{ name: string; allergies: string }>;
  guests: Awaited<ReturnType<typeof getDashboardStats>>["guests"];
  invitation: Awaited<ReturnType<typeof getDashboardStats>>["invitation"];
}) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-xl mb-4">Invitations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={Users} label="Invitations envoyées" value={stats.guestsListed} />
          <KpiCard icon={MailOpen} label="Ouvertes" value={stats.opened} tone="success" />
          <KpiCard
            icon={MailQuestion}
            label="Pas encore ouvertes"
            value={stats.notOpened}
            tone="warning"
          />
          <KpiCard
            icon={HelpCircle}
            label="Ouvertes, sans réponse"
            value={stats.openedNoResponse}
            tone="warning"
          />
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl mb-4">Réponses</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={Check} label="Confirmations" value={stats.confirmed} tone="success" />
          <KpiCard icon={X} label="Refus" value={stats.declined} tone="danger" />
          <KpiCard icon={HelpCircle} label="Peut-être" value={stats.maybe} tone="warning" />
          <KpiCard icon={Car} label="Besoin de transport" value={stats.transportNeeded} />
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl mb-4">Têtes à table (confirmés)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={UserCheck} label="Adultes" value={stats.adultsConfirmed} />
          <KpiCard icon={Baby} label="Enfants" value={stats.childrenConfirmed} />
          <KpiCard
            icon={Users}
            label="Total convives"
            value={stats.totalGuestsConfirmed}
            tone="success"
          />
        </div>
        {stats.rsvpsWithoutGuest > 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            Dont {stats.rsvpsWithoutGuest} réponse{stats.rsvpsWithoutGuest > 1 ? "s" : ""} de
            personne{stats.rsvpsWithoutGuest > 1 ? "s" : ""} non présente
            {stats.rsvpsWithoutGuest > 1 ? "s" : ""} dans votre liste d'invités (à ajouter si
            besoin, onglet "Invités").
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Allergies & régimes — pour le traiteur</h2>
          <ExportButtons
            invitation={invitation}
            guests={guests}
            stats={stats}
            allergies={allergies}
          />
        </div>
        {allergies.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune allergie déclarée pour le moment.</p>
        ) : (
          <ul className="bg-ivory border border-primary/10 divide-y divide-border/60">
            {allergies.map((a, i) => (
              <li key={i} className="px-4 py-3 flex justify-between text-sm">
                <span className="font-medium">{a.name}</span>
                <span className="text-muted-foreground">{a.allergies}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function statusLabel(g: { opened_at: string | null; rsvp_id: string | null }): {
  label: string;
  className: string;
} {
  if (!g.opened_at) return { label: "Pas ouvert", className: "bg-muted text-muted-foreground" };
  if (!g.rsvp_id)
    return { label: "Ouvert, sans réponse", className: "bg-amber-100 text-amber-800" };
  return { label: "A répondu", className: "bg-emerald-100 text-emerald-800" };
}

function GuestsTab({
  invitationId,
  guests,
  invitationToken,
  onChange,
}: {
  invitationId: string;
  guests: Array<{
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    group_label: string | null;
    expected_adults: number;
    expected_children: number;
    guest_token: string;
    opened_at: string | null;
    table_number: string | null;
    rsvp_id: string | null;
  }>;
  invitationToken?: string;
  onChange: () => void;
}) {
  const create = useServerFn(addGuest);
  const bulkCreate = useServerFn(bulkAddGuests);
  const updateTable = useServerFn(updateGuestTable);
  const remove = useServerFn(deleteGuest);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    group_label: "",
    expected_adults: 1,
    expected_children: 0,
  });
  const [bulkText, setBulkText] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tableDraft, setTableDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function handleAdd() {
    if (!form.name.trim()) return;
    setBusy(true);
    try {
      await create({ data: { invitation_id: invitationId, ...form } });
      toast.success("Invité ajouté");
      setForm({
        name: "",
        email: "",
        phone: "",
        group_label: "",
        expected_adults: 1,
        expected_children: 0,
      });
      onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  async function handleBulkAdd() {
    const lines = bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return;
    const parsed = lines.map((line) => {
      const [name, email, group] = line.split(",").map((p) => p?.trim() ?? "");
      return {
        name: name || line,
        email: email || "",
        phone: "",
        group_label: group || "",
        expected_adults: 1,
        expected_children: 0,
      };
    });
    setBusy(true);
    try {
      await bulkCreate({ data: { invitation_id: invitationId, guests: parsed } });
      toast.success(`${parsed.length} invité(s) ajouté(s)`);
      setBulkText("");
      setShowBulk(false);
      onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveTable(g: (typeof guests)[number]) {
    try {
      await updateTable({
        data: {
          id: g.id,
          invitation_id: invitationId,
          table_number: tableDraft[g.id] ?? g.table_number ?? "",
        },
      });
      toast.success("Table enregistrée");
      setEditingId(null);
      onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  }

  async function handleDelete(gid: string) {
    try {
      await remove({ data: { id: gid, invitation_id: invitationId } });
      toast.success("Invité retiré");
      onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  }

  function personalizedLink(guestToken: string) {
    if (typeof window === "undefined" || !invitationToken) return "";
    return `${window.location.origin}/invitation/${invitationToken}?g=${guestToken}`;
  }

  async function copyLink(guestToken: string) {
    const url = personalizedLink(guestToken);
    if (!url) return;
    await navigator.clipboard.writeText(url);
    toast.success("Lien personnalisé copié");
  }

  return (
    <div className="space-y-8">
      <div className="bg-ivory border border-primary/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Ajouter un invité</h2>
          <button
            onClick={() => setShowBulk((v) => !v)}
            className="text-xs text-primary hover:underline"
          >
            {showBulk ? "Ajout simple" : "Import en masse"}
          </button>
        </div>

        {showBulk ? (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Un invité par ligne, format libre :{" "}
              <code>Nom, email (optionnel), groupe (optionnel)</code>
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={6}
              placeholder={"Camille Martin, camille@mail.com, Famille Martin\nJulien Petit,, Amis"}
              className="w-full px-4 py-3 bg-background border border-border text-sm font-mono"
            />
            <GoldButton onClick={handleBulkAdd} disabled={busy}>
              {busy ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Plus className="size-4 mr-2" />
              )}
              Importer
            </GoldButton>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              placeholder="Nom *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 bg-background border border-border text-sm"
            />
            <input
              placeholder="Groupe (ex. Famille Martin)"
              value={form.group_label}
              onChange={(e) => setForm({ ...form, group_label: e.target.value })}
              className="px-3 py-2 bg-background border border-border text-sm"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-3 py-2 bg-background border border-border text-sm"
            />
            <input
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="px-3 py-2 bg-background border border-border text-sm"
            />
            <div className="sm:col-span-2">
              <GoldButton onClick={handleAdd} disabled={busy || !form.name.trim()}>
                {busy ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="size-4 mr-2" />
                )}
                Ajouter
              </GoldButton>
            </div>
          </div>
        )}
      </div>

      <div className="bg-ivory border border-primary/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/5 text-left">
            <tr>
              <th className="p-3 eyebrow text-[10px]">Invité</th>
              <th className="p-3 eyebrow text-[10px]">Groupe</th>
              <th className="p-3 eyebrow text-[10px]">Statut</th>
              <th className="p-3 eyebrow text-[10px]">Table</th>
              <th className="p-3 eyebrow text-[10px]">Lien perso</th>
              <th className="p-3 eyebrow text-[10px]"></th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g) => {
              const status = statusLabel(g);
              const isEditing = editingId === g.id;
              return (
                <tr key={g.id} className="border-t border-border/40">
                  <td className="p-3">
                    <div className="font-medium">{g.name}</div>
                    {g.email && <div className="text-xs text-muted-foreground">{g.email}</div>}
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{g.group_label ?? "—"}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] uppercase tracking-[0.1em] px-2 py-1 ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="p-3">
                    {isEditing ? (
                      <input
                        autoFocus
                        value={tableDraft[g.id] ?? g.table_number ?? ""}
                        onChange={(e) => setTableDraft({ ...tableDraft, [g.id]: e.target.value })}
                        onBlur={() => handleSaveTable(g)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveTable(g)}
                        className="w-20 px-2 py-1 border border-border text-xs"
                      />
                    ) : (
                      <button
                        onClick={() => setEditingId(g.id)}
                        className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        {g.table_number || "—"} <Pencil className="size-3" />
                      </button>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => copyLink(g.guest_token)}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Copy className="size-3" /> Copier
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {guests.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-muted-foreground">
                  Aucun invité ajouté pour l'instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TablePlanTab({
  guests,
  onChange,
  invitationId,
}: {
  guests: Array<{ id: string; name: string; table_number: string | null; rsvp_id: string | null }>;
  onChange: () => void;
  invitationId: string;
}) {
  const updateTable = useServerFn(updateGuestTable);

  const confirmedGuests = guests.filter((g) => g.rsvp_id);
  const grouped = new Map<string, typeof guests>();
  for (const g of confirmedGuests) {
    const key = g.table_number?.trim() || "Non assignés";
    grouped.set(key, [...(grouped.get(key) ?? []), g]);
  }
  const tables = Array.from(grouped.entries()).sort(([a], [b]) => {
    if (a === "Non assignés") return 1;
    if (b === "Non assignés") return -1;
    return a.localeCompare(b);
  });

  async function assign(guestId: string, tableNumber: string) {
    try {
      await updateTable({
        data: { id: guestId, invitation_id: invitationId, table_number: tableNumber },
      });
      onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Regroupement par table pour les invités confirmés (Onglet "Invités" pour changer la table de
        quelqu'un — le champ se sauvegarde automatiquement).
      </p>
      {confirmedGuests.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun invité confirmé pour l'instant.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map(([tableName, list]) => (
            <div key={tableName} className="bg-ivory border border-primary/15 p-5">
              <h3 className="font-display text-lg mb-3">{tableName}</h3>
              <ul className="space-y-1 text-sm">
                {list.map((g) => (
                  <li key={g.id} className="flex items-center justify-between gap-2">
                    <span>{g.name}</span>
                    <input
                      placeholder="Table"
                      defaultValue={g.table_number ?? ""}
                      onBlur={(e) => {
                        if (e.target.value !== (g.table_number ?? "")) assign(g.id, e.target.value);
                      }}
                      className="w-16 px-1.5 py-0.5 border border-border text-xs"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type PendingPhoto = {
  id: string;
  guest_name: string | null;
  caption: string | null;
  image_url: string;
  approved: boolean;
};
type PendingAudio = {
  id: string;
  guest_name: string | null;
  audio_url: string;
  duration_seconds: number | null;
  approved: boolean;
};

function GalleryAudioTab({ invitationId }: { invitationId: string }) {
  const fetchPhotos = useServerFn(listPendingGalleryForOwner);
  const moderatePhoto = useServerFn(moderateGalleryPhoto);
  const fetchAudio = useServerFn(listPendingAudioForOwner);
  const moderateAudio = useServerFn(moderateAudioMessage);

  const photosQ = useQuery({
    queryKey: ["dash-photos", invitationId],
    queryFn: () => fetchPhotos({ data: { invitation_id: invitationId } }),
  });
  const audioQ = useQuery({
    queryKey: ["dash-audio", invitationId],
    queryFn: () => fetchAudio({ data: { invitation_id: invitationId } }),
  });

  async function actPhoto(id: string, approved: boolean) {
    await moderatePhoto({ data: { id, approved } });
    photosQ.refetch();
  }
  async function actAudio(id: string, approved: boolean) {
    await moderateAudio({ data: { id, approved } });
    audioQ.refetch();
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-xl mb-4 flex items-center gap-2">
          <ImageIcon className="size-5 text-primary" /> Photos à modérer
        </h2>
        {photosQ.isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (photosQ.data?.photos ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune photo en attente.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {((photosQ.data?.photos ?? []) as PendingPhoto[]).map((p) => (
              <div key={p.id} className="border border-border overflow-hidden bg-background">
                <img src={p.image_url} alt="" className="w-full h-32 object-cover" />
                <div className="p-2 flex gap-1">
                  <button
                    onClick={() => actPhoto(p.id, true)}
                    className="flex-1 text-[10px] uppercase tracking-[0.15em] bg-primary/10 text-primary py-1"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => actPhoto(p.id, false)}
                    className="flex-1 text-[10px] uppercase tracking-[0.15em] bg-destructive/10 text-destructive py-1"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-xl mb-4 flex items-center gap-2">
          <Mic className="size-5 text-primary" /> Messages vocaux à modérer
        </h2>
        {audioQ.isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (audioQ.data?.messages ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun message en attente.</p>
        ) : (
          <ul className="space-y-2">
            {((audioQ.data?.messages ?? []) as PendingAudio[]).map((m) => (
              <li
                key={m.id}
                className="bg-ivory border border-primary/10 p-4 flex items-center gap-4"
              >
                <div className="flex-1">
                  {m.guest_name && <div className="text-sm font-medium mb-1">{m.guest_name}</div>}
                  <audio src={m.audio_url} controls className="w-full max-w-xs" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => actAudio(m.id, true)}
                    className="text-[10px] uppercase tracking-[0.15em] bg-primary/10 text-primary px-3 py-1.5"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => actAudio(m.id, false)}
                    className="text-[10px] uppercase tracking-[0.15em] bg-destructive/10 text-destructive px-3 py-1.5"
                  >
                    Retirer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ExportButtons({
  invitation,
  guests,
  stats,
  allergies,
}: {
  invitation: Awaited<ReturnType<typeof getDashboardStats>>["invitation"];
  guests: Awaited<ReturnType<typeof getDashboardStats>>["guests"];
  stats: Awaited<ReturnType<typeof getDashboardStats>>["stats"];
  allergies: Array<{ name: string; allergies: string }>;
}) {
  return (
    <div className="flex gap-2">
      <OutlineButton onClick={() => exportGuestsCsv(invitation.couple_names, guests as never)}>
        <FileSpreadsheet className="size-4 mr-2" /> Excel (CSV)
      </OutlineButton>
      <OutlineButton
        onClick={() =>
          exportSummaryPdf(invitation.couple_names, invitation.event_date, stats, allergies)
        }
      >
        <FileText className="size-4 mr-2" /> PDF récap
      </OutlineButton>
    </div>
  );
}
