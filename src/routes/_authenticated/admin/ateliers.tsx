import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminListAteliers, adminUpdateAtelierStatus } from "@/lib/admin.functions";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/ateliers")({
  component: AdminAteliers,
});

const STATUSES = ["new", "contacted", "scheduled", "won", "lost"] as const;

function AdminAteliers() {
  const fetchAteliers = useServerFn(adminListAteliers);
  const updateStatus = useServerFn(adminUpdateAtelierStatus);
  const qc = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-ateliers"],
    queryFn: () => fetchAteliers(),
  });

  async function handleChange(id: string, status: string) {
    try {
      await updateStatus({ data: { id, status: status as any } });
      toast.success("Statut mis à jour");
      qc.invalidateQueries({ queryKey: ["admin-ateliers"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur");
    }
  }

  if (isLoading) return <div className="text-center text-muted-foreground py-20">Chargement…</div>;
  const ateliers = data?.ateliers ?? [];

  return (
    <div className="space-y-3">
      {ateliers.map((a: any) => (
        <div key={a.id} className="bg-ivory border border-primary/15 p-5 shadow-soft">
          <div className="flex flex-wrap items-start gap-4 justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="font-display text-xl">{a.name}</div>
                <span className="eyebrow text-[10px] text-primary">{a.request_type}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {a.email} {a.phone && `· ${a.phone}`}
                {a.event_date && ` · ${new Date(a.event_date).toLocaleDateString("fr-FR")}`}
                {a.budget && ` · ${a.budget}`}
              </div>
              <button
                onClick={() => setOpenId(openId === a.id ? null : a.id)}
                className="text-xs text-primary mt-2 underline"
              >
                {openId === a.id ? "Masquer" : "Voir le message"}
              </button>
              {openId === a.id && (
                <p className="font-serif-soft text-sm mt-3 whitespace-pre-wrap">{a.details}</p>
              )}
            </div>
            <select
              value={a.status}
              onChange={(e) => handleChange(a.id, e.target.value)}
              className="border border-border/60 bg-background px-2 py-1 text-xs"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      {ateliers.length === 0 && (
        <div className="text-center text-muted-foreground py-20">Aucune demande</div>
      )}
    </div>
  );
}
