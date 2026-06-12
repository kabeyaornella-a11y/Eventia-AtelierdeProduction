import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "@/lib/admin.functions";
import { ShoppingBag, Mail, Heart, Users, Euro, Clock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function StatCard({ icon: Icon, label, value, hint }: any) {
  return (
    <div className="bg-ivory border border-primary/15 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="eyebrow text-primary text-[10px]">{label}</div>
        <Icon className="size-4 text-primary/60" />
      </div>
      <div className="font-display text-4xl mt-3">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-2">{hint}</div>}
    </div>
  );
}

function AdminDashboard() {
  const fetchStats = useServerFn(getAdminStats);
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fetchStats() });

  if (isLoading) return <div className="text-center text-muted-foreground py-20">Chargement…</div>;
  if (!data) return null;

  return (
    <div>
      <div className="mb-6">
        <div className="eyebrow text-primary">Administration</div>
        <h1 className="font-display text-3xl md:text-4xl mt-1">Vue d'ensemble</h1>
        <p className="font-serif-soft italic text-muted-foreground mt-2">Pilotage en temps réel de l'atelier Eventia Signature.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={ShoppingBag} label="Commandes" value={data.ordersCount} hint={`${data.pendingOrders} en attente`} />
        <StatCard icon={Euro} label="Chiffre d'affaires payé" value={`${data.totalRevenue} €`} />
        <StatCard icon={Mail} label="Demandes atelier" value={data.ateliersCount} hint={`${data.pendingAteliers} nouvelles`} />
        <StatCard icon={Heart} label="Invitations" value={data.invitationsCount} />
        <StatCard icon={Users} label="Réponses RSVP" value={data.rsvpsCount} />
        <StatCard icon={Clock} label="Dernière mise à jour" value={new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} />
      </div>
    </div>
  );
}

