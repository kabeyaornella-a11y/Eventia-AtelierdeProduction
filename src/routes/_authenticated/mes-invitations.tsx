import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { z } from "zod";
import {
  listMyInvitations,
  upsertMyInvitation,
  deleteMyInvitation,
  getMyInvitation,
} from "@/lib/my-invitations.functions";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { Heart, Plus, ExternalLink, Copy, Trash2, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

const searchSchema = z.object({
  edit: z.string().uuid().optional(),
  new: z.coerce.boolean().optional(),
  order: z.string().uuid().optional(),
});

export const Route = createFileRoute("/_authenticated/mes-invitations")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Mes invitations — Eventia Signature" },
      { name: "description", content: "Créez et gérez vos invitations digitales Eventia." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MesInvitations,
});

function MesInvitations() {
  const search = Route.useSearch();
  if (search.edit || search.new) return <InvitationEditor invitationId={search.edit} orderId={search.order} />;
  return <InvitationList />;
}

function InvitationList() {
  const fetchAll = useServerFn(listMyInvitations);
  const delFn = useServerFn(deleteMyInvitation);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["my-invitations"], queryFn: () => fetchAll() });
  const invitations = data?.invitations ?? [];

  async function copyLink(token: string) {
    const url = `${window.location.origin}/invitation/${token}`;
    await navigator.clipboard.writeText(url);
    toast.success("Lien copié");
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette invitation ? Les RSVP et la playlist seront perdus.")) return;
    try {
      await delFn({ data: { id } });
      toast.success("Invitation supprimée");
      qc.invalidateQueries({ queryKey: ["my-invitations"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur");
    }
  }

  return (
    <SiteLayout>
      <Section>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="eyebrow text-primary">Espace client</div>
            <h1 className="font-display text-4xl md:text-5xl mt-2">Mes invitations</h1>
            <p className="font-serif-soft italic text-muted-foreground mt-2">
              Créez, partagez, suivez les RSVP.
            </p>
          </div>
          <Link to="/mes-invitations" search={{ new: true }}>
            <GoldButton>
              <Plus className="size-4 mr-2" /> Nouvelle invitation
            </GoldButton>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Chargement…</div>
        ) : invitations.length === 0 ? (
          <div className="bg-ivory border border-primary/15 p-12 text-center shadow-soft">
            <Sparkles className="size-6 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl">Aucune invitation</h2>
            <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
              Créez votre première invitation digitale en quelques minutes.
            </p>
            <Link to="/mes-invitations" search={{ new: true }} className="inline-block mt-6">
              <GoldButton><Plus className="size-4 mr-2" /> Créer une invitation</GoldButton>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border/60 bg-ivory border border-primary/15 shadow-soft">
            {invitations.map((inv: any) => (
              <li key={inv.id} className="p-6 md:p-8 flex items-center justify-between flex-wrap gap-4">
                <div className="min-w-0 flex-1">
                  <div className="eyebrow text-primary text-[10px] flex items-center gap-2">
                    <Heart className="size-3" /> {new Date(inv.event_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="font-display text-2xl mt-1 truncate">{inv.couple_names}</div>
                  {inv.venue && <div className="text-xs text-muted-foreground mt-1 truncate">{inv.venue}</div>}
                  <div className="font-mono text-[10px] text-muted-foreground mt-2 truncate">/{inv.token}</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => copyLink(inv.token)} title="Copier le lien" className="inline-flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-[0.18em] border border-primary/30 text-primary hover:bg-primary/5">
                    <Copy className="size-3.5" /> Lien
                  </button>
                  <Link to="/invitation/$token" params={{ token: inv.token }} target="_blank">
                    <OutlineButton><ExternalLink className="size-3.5 mr-1" /> Voir</OutlineButton>
                  </Link>
                  <Link to="/mes-invitations" search={{ edit: inv.id }}>
                    <GoldButton>Modifier</GoldButton>
                  </Link>
                  <button onClick={() => handleDelete(inv.id)} title="Supprimer" className="p-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </SiteLayout>
  );
}

function InvitationEditor({ invitationId, orderId }: { invitationId?: string; orderId?: string }) {
  const fetchOne = useServerFn(getMyInvitation);
  const save = useServerFn(upsertMyInvitation);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState({
    couple_names: "",
    event_date: "",
    venue: "",
    hero_url: "",
    message: "",
    allow_playlist: true,
    allow_gallery: true,
  });
  const [loading, setLoading] = useState(!!invitationId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!invitationId) return;
    fetchOne({ data: { id: invitationId } })
      .then(({ invitation }) => {
        setForm({
          couple_names: invitation.couple_names ?? "",
          event_date: invitation.event_date ? new Date(invitation.event_date).toISOString().slice(0, 16) : "",
          venue: invitation.venue ?? "",
          hero_url: invitation.hero_url ?? "",
          message: invitation.message ?? "",
          allow_playlist: invitation.allow_playlist ?? true,
          allow_gallery: invitation.allow_gallery ?? true,
        });
      })
      .catch((e) => toast.error(e?.message ?? "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [invitationId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { token } = await save({
        data: {
          id: invitationId,
          order_id: orderId,
          ...form,
        },
      });
      toast.success(invitationId ? "Invitation enregistrée" : "Invitation créée");
      qc.invalidateQueries({ queryKey: ["my-invitations"] });
      const url = `${window.location.origin}/invitation/${token}`;
      navigator.clipboard.writeText(url).catch(() => {});
      navigate({ to: "/mes-invitations", search: {} });
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <SiteLayout><Section><div className="text-center text-muted-foreground py-20">Chargement…</div></Section></SiteLayout>;

  return (
    <SiteLayout>
      <Section>
        <Link to="/mes-invitations" search={{}} className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="size-3.5" /> Retour
        </Link>
        <div className="mb-8">
          <div className="eyebrow text-primary">Espace client</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">
            {invitationId ? "Modifier l'invitation" : "Nouvelle invitation"}
          </h1>
        </div>

        <form onSubmit={handleSave} className="bg-ivory border border-primary/15 shadow-soft p-6 md:p-10 space-y-6 max-w-3xl">
          <Field label="Noms du couple *">
            <input
              required
              maxLength={200}
              value={form.couple_names}
              onChange={(e) => setForm({ ...form, couple_names: e.target.value })}
              placeholder="Marie & Antoine"
              className="w-full px-4 py-3 border border-primary/20 bg-background focus:outline-none focus:border-primary"
            />
          </Field>

          <Field label="Date & heure de l'événement *">
            <input
              required
              type="datetime-local"
              value={form.event_date}
              onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              className="w-full px-4 py-3 border border-primary/20 bg-background focus:outline-none focus:border-primary"
            />
          </Field>

          <Field label="Lieu">
            <input
              maxLength={300}
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              placeholder="Château de Bellevue, Provence"
              className="w-full px-4 py-3 border border-primary/20 bg-background focus:outline-none focus:border-primary"
            />
          </Field>

          <Field label="Image hero (URL)">
            <input
              type="url"
              maxLength={800}
              value={form.hero_url}
              onChange={(e) => setForm({ ...form, hero_url: e.target.value })}
              placeholder="https://…"
              className="w-full px-4 py-3 border border-primary/20 bg-background focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1 italic">Collez l'URL d'une photo. L'upload direct arrive avec le Batch 4 (galerie).</p>
          </Field>

          <Field label="Message aux invités">
            <textarea
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Nous avons hâte de vous accueillir…"
              className="w-full px-4 py-3 border border-primary/20 bg-background focus:outline-none focus:border-primary font-serif-soft italic"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <Toggle label="Playlist participative" checked={form.allow_playlist} onChange={(v) => setForm({ ...form, allow_playlist: v })} />
            <Toggle label="Galerie photos invités" checked={form.allow_gallery} onChange={(v) => setForm({ ...form, allow_gallery: v })} />
          </div>

          <div className="flex gap-3 pt-4 border-t border-border/40">
            <GoldButton type="submit" disabled={saving}>
              {saving ? "Enregistrement…" : invitationId ? "Enregistrer" : "Créer l'invitation"}
            </GoldButton>
            <Link to="/mes-invitations" search={{}}>
              <OutlineButton type="button">Annuler</OutlineButton>
            </Link>
          </div>
        </form>
      </Section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="eyebrow text-primary text-[10px] mb-2">{label}</div>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-4 border border-primary/15 hover:border-primary/40">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-primary" />
      <span className="text-sm">{label}</span>
    </label>
  );
}
