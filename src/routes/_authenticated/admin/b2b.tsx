import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listB2BLeads, updateB2BLeadStatus } from "@/lib/admin-extras.functions";
import { toast } from "sonner";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/b2b")({
  head: () => ({ meta: [{ title: "Admin · Demandes B2B — Eventia" }] }),
  component: AdminB2BPage,
});

type Lead = {
  id: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string | null;
  event_type: string | null;
  guests_count: number | null;
  budget: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

function AdminB2BPage() {
  const fetchAll = useServerFn(listB2BLeads);
  const updateStatus = useServerFn(updateB2BLeadStatus);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const r = await fetchAll({ data: {} });
      setLeads(r.leads as Lead[]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id: string, status: "new" | "contacted" | "won" | "lost") => {
    try {
      await updateStatus({ data: { id, status } });
      toast.success("Mis à jour");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-serif">Demandes B2B</h1>
        </header>
        {loading ? (
          <p>Chargement…</p>
        ) : leads.length === 0 ? (
          <p className="text-muted-foreground">Aucune demande pour l'instant.</p>
        ) : (
          <div className="space-y-3">
            {leads.map((l) => (
              <article key={l.id} className="bg-card border rounded-xl p-5">
                <header className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="font-serif text-xl">{l.company}</h2>
                    <p className="text-sm text-muted-foreground">
                      {l.contact_name} · {l.email} {l.phone && `· ${l.phone}`}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wider px-2 py-1 rounded bg-muted">
                    {l.status}
                  </span>
                </header>
                <p className="text-sm grid grid-cols-3 gap-2 mb-2">
                  {l.event_type && (
                    <span>
                      <strong>Type:</strong> {l.event_type}
                    </span>
                  )}
                  {l.guests_count && (
                    <span>
                      <strong>Invités:</strong> {l.guests_count}
                    </span>
                  )}
                  {l.budget && (
                    <span>
                      <strong>Budget:</strong> {l.budget}
                    </span>
                  )}
                </p>
                {l.message && <p className="text-sm bg-muted/50 p-3 rounded mt-2">{l.message}</p>}
                <div className="flex gap-2 mt-3">
                  {(["new", "contacted", "won", "lost"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(l.id, s)}
                      disabled={l.status === s}
                      className="text-xs px-3 py-1 rounded border hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
