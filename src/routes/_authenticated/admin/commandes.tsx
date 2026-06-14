import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminListOrders, adminUpdateOrderStatus } from "@/lib/admin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/commandes")({
  component: AdminCommandes,
});

const STATUSES = ["draft", "pending", "paid", "cancelled", "delivered"] as const;

function AdminCommandes() {
  const fetchOrders = useServerFn(adminListOrders);
  const updateStatus = useServerFn(adminUpdateOrderStatus);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders(),
  });

  async function handleChange(id: string, status: string) {
    try {
      await updateStatus({ data: { id, status: status as any } });
      toast.success("Statut mis à jour");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur");
    }
  }

  if (isLoading) return <div className="text-center text-muted-foreground py-20">Chargement…</div>;
  const orders = data?.orders ?? [];

  return (
    <div className="bg-ivory border border-primary/15 shadow-soft overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-primary/5">
          <tr className="text-left">
            <th className="p-4 eyebrow text-[10px]">Ref</th>
            <th className="p-4 eyebrow text-[10px]">Email</th>
            <th className="p-4 eyebrow text-[10px]">Formule</th>
            <th className="p-4 eyebrow text-[10px]">Total</th>
            <th className="p-4 eyebrow text-[10px]">Statut</th>
            <th className="p-4 eyebrow text-[10px]">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id} className="border-t border-border/40">
              <td className="p-4 font-mono text-xs">{o.ref}</td>
              <td className="p-4">{o.email}</td>
              <td className="p-4 capitalize">{o.formula}</td>
              <td className="p-4 font-display text-primary">{o.total_eur} €</td>
              <td className="p-4">
                <select
                  value={o.status}
                  onChange={(e) => handleChange(o.id, e.target.value)}
                  className="border border-border/60 bg-background px-2 py-1 text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4 text-xs text-muted-foreground">
                {new Date(o.created_at).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="p-12 text-center text-muted-foreground">
                Aucune commande
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
