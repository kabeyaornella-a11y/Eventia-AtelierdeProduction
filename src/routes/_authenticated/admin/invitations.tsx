import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminListInvitations } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/invitations")({
  component: AdminInvitations,
});

function AdminInvitations() {
  const fetchInvs = useServerFn(adminListInvitations);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-invitations"],
    queryFn: () => fetchInvs(),
  });

  if (isLoading) return <div className="text-center text-muted-foreground py-20">Chargement…</div>;
  const invs = data?.invitations ?? [];

  return (
    <div className="bg-ivory border border-primary/15 shadow-soft overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-primary/5 text-left">
          <tr>
            <th className="p-4 eyebrow text-[10px]">Couple</th>
            <th className="p-4 eyebrow text-[10px]">Date</th>
            <th className="p-4 eyebrow text-[10px]">Lieu</th>
            <th className="p-4 eyebrow text-[10px]">Token</th>
            <th className="p-4 eyebrow text-[10px]">Lien</th>
          </tr>
        </thead>
        <tbody>
          {invs.map((i: any) => (
            <tr key={i.id} className="border-t border-border/40">
              <td className="p-4 font-display">{i.couple_names}</td>
              <td className="p-4 text-xs">{new Date(i.event_date).toLocaleDateString("fr-FR")}</td>
              <td className="p-4 text-xs">{i.venue ?? "—"}</td>
              <td className="p-4 font-mono text-xs">{i.token}</td>
              <td className="p-4">
                <Link
                  to="/invitation/$token"
                  params={{ token: i.token }}
                  className="text-primary underline text-xs"
                >
                  Ouvrir
                </Link>
              </td>
            </tr>
          ))}
          {invs.length === 0 && (
            <tr>
              <td colSpan={5} className="p-12 text-center text-muted-foreground">
                Aucune invitation
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
