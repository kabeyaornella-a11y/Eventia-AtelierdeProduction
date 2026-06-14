import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { listMyInvitations } from "@/lib/my-invitations.functions";
import { listMyOrders } from "@/lib/orders.functions";
import { listMyEmails } from "@/lib/emails.functions";
import {
  Sparkles,
  Calendar,
  Mail,
  CreditCard,
  Eye,
  Wand2,
  Heart,
  Send,
  Camera,
} from "lucide-react";
import { GalleryModeration } from "@/components/dashboard/GalleryModeration";

export const Route = createFileRoute("/_authenticated/tableau-de-bord")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Tableau de bord — Eventia Signature" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const STATUS_LABEL: Record<string, string> = {
  briefing: "Briefing",
  design: "En création",
  review: "Revue couple",
  ready: "Prête à livrer",
  delivered: "Livrée",
};

function Dashboard() {
  const fetchInv = useServerFn(listMyInvitations);
  const fetchOrders = useServerFn(listMyOrders);
  const fetchEmails = useServerFn(listMyEmails);

  const inv = useQuery({ queryKey: ["my-invitations"], queryFn: () => fetchInv() });
  const orders = useQuery({ queryKey: ["my-orders"], queryFn: () => fetchOrders() });
  const emails = useQuery({ queryKey: ["my-emails"], queryFn: () => fetchEmails() });

  const invitations = inv.data?.invitations ?? [];
  const orderList = orders.data?.orders ?? [];
  const emailList = emails.data?.emails ?? [];

  const upcoming = invitations
    .map((i) => ({ ...i, when: new Date(i.event_date) }))
    .filter((i) => i.when.getTime() > Date.now())
    .sort((a, b) => a.when.getTime() - b.when.getTime())[0];

  return (
    <SiteLayout>
      <Section>
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-ivory to-primary/5 border border-primary/15 p-8 md:p-10 mb-10 shadow-soft">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="eyebrow text-primary flex items-center gap-2">
            <Sparkles className="size-3.5" /> Espace mariés
          </div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Tableau de bord</h1>
          <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-xl">
            {upcoming
              ? `Votre célébration approche — ${upcoming.when.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.`
              : "Bienvenue dans votre atelier privé. Composez, suivez et partagez en toute sérénité."}
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Kpi icon={<Heart className="size-5" />} label="Invitations" value={invitations.length} />
          <Kpi
            icon={<CreditCard className="size-5" />}
            label="Commandes"
            value={orderList.length}
          />
          <Kpi
            icon={<Calendar className="size-5" />}
            label="Prochain événement"
            value={
              upcoming
                ? upcoming.when.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
                : "—"
            }
          />
          <Kpi
            icon={<Mail className="size-5" />}
            label="Emails envoyés"
            value={emailList.filter((e) => e.status === "sent").length}
          />
        </div>

        {/* Invitations production */}
        <h2 className="font-display text-2xl mb-4">Mes invitations en production</h2>
        {invitations.length === 0 ? (
          <div className="bg-ivory border border-border p-8 text-center mb-10">
            <Sparkles className="size-5 text-primary mx-auto mb-3" />
            <p className="font-serif-soft italic text-muted-foreground mb-4">
              Aucune invitation pour l'instant.
            </p>
            <Link to="/mes-invitations" search={{ new: true }}>
              <GoldButton>Créer une invitation</GoldButton>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {invitations.map((i) => {
              const inv = i as typeof i & {
                theme?: string | null;
                production_status?: string;
                progress?: number;
              };
              return (
                <div key={inv.id} className="bg-ivory border border-primary/10 p-5 shadow-soft">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-display text-xl">{inv.couple_names}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(inv.event_date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase bg-primary/10 text-primary px-2 py-1">
                      {STATUS_LABEL[inv.production_status ?? "briefing"] ?? "Briefing"}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                    <span>Avancement</span>
                    <span>{inv.progress ?? 0}%</span>
                  </div>
                  <div className="h-1.5 bg-muted relative mb-4">
                    <div
                      className="h-1.5 bg-primary transition-all"
                      style={{ width: `${inv.progress ?? 0}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/studio/$id" params={{ id: inv.id }}>
                      <OutlineButton>
                        <Wand2 className="size-4 mr-2" /> Studio
                      </OutlineButton>
                    </Link>
                    <a href={`/invitation/${inv.token}`} target="_blank" rel="noreferrer">
                      <OutlineButton>
                        <Eye className="size-4 mr-2" /> Aperçu
                      </OutlineButton>
                    </a>
                    <Link to="/decorations" search={{ theme: inv.theme ?? "" }}>
                      <OutlineButton>Décor</OutlineButton>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Orders + payment */}
        <h2 className="font-display text-2xl mb-4">Commandes & paiement</h2>
        <div className="bg-ivory border border-border mb-10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-muted-foreground">
              <tr>
                <th className="text-left p-3">Référence</th>
                <th className="text-left p-3">Formule</th>
                <th className="text-left p-3">Statut</th>
                <th className="text-right p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">
                    Aucune commande
                  </td>
                </tr>
              ) : (
                orderList.map((o) => (
                  <tr key={o.ref} className="border-t border-border">
                    <td className="p-3 font-mono text-xs">{o.ref}</td>
                    <td className="p-3 capitalize">{o.formula}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] tracking-[0.18em] uppercase px-2 py-1 ${o.status === "paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                      >
                        {o.status === "paid" ? "Payé" : o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-display">{o.total_eur} €</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Emails */}
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Send className="size-5" /> Emails automatiques
        </h2>
        <div className="bg-ivory border border-border">
          {emailList.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              Aucun email pour l'instant.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {emailList.slice(0, 10).map((e) => (
                <li key={e.id} className="p-3 flex justify-between items-center text-sm">
                  <div>
                    <div className="capitalize">{e.template.replace(/_/g, " ")}</div>
                    <div className="text-xs text-muted-foreground">{e.recipient}</div>
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.18em] uppercase px-2 py-1 ${e.status === "sent" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {e.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {invitations.length > 0 && (
          <>
            <h2 className="font-display text-2xl mb-4 mt-10 flex items-center gap-2">
              <Camera className="size-5" /> Galerie souvenirs — modération
            </h2>
            {invitations.map((i) => (
              <div key={i.id} className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">{i.couple_names}</div>
                <GalleryModeration invitationId={i.id} />
              </div>
            ))}
          </>
        )}
      </Section>
    </SiteLayout>
  );
}

function Kpi({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-ivory border border-primary/10 p-5 shadow-soft">
      <div className="flex items-center gap-2 text-primary mb-2">
        {icon}
        <div className="eyebrow text-xs">{label}</div>
      </div>
      <div className="font-display text-3xl">{value}</div>
    </div>
  );
}
