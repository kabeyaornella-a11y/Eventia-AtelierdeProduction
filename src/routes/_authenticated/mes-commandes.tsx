import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listMyOrders } from "@/lib/orders.functions";
import { claimFirstAdmin } from "@/lib/admin.functions";
import { useIsAdmin } from "@/hooks/use-admin";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { useAuth, signOut } from "@/hooks/use-auth";
import { LogOut, ArrowRight, ExternalLink, Sparkles, ShieldCheck, Heart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/mes-commandes")({
  head: () => ({
    meta: [
      { title: "Mes commandes — Eventia Signature" },
      { name: "description", content: "Retrouvez vos compositions et commandes Eventia Signature." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MesCommandes,
});

function MesCommandes() {
  const fetchOrders = useServerFn(listMyOrders);
  const claim = useServerFn(claimFirstAdmin);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchOrders(),
  });

  const orders = data?.orders ?? [];

  async function handleClaim() {
    try {
      const { claimed } = await claim();
      if (claimed) {
        toast.success("Vous êtes désormais administrateur ✨");
        qc.invalidateQueries({ queryKey: ["admin-status"] });
      } else {
        toast.info("Un administrateur existe déjà.");
      }
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
            <h1 className="font-display text-4xl md:text-5xl mt-2">Mes commandes</h1>
            {user?.email && <p className="font-serif-soft italic text-muted-foreground mt-2">{user.email}</p>}
          </div>
          <div className="flex items-center gap-5">
            <Link
              to="/mes-invitations"
              search={{}}
              className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-primary hover:text-cacao"
            >
              <Heart className="size-3.5" /> Mes invitations
            </Link>
            <button
              onClick={async () => { await signOut(); navigate({ to: "/" }); }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-muted-foreground hover:text-primary"
            >
              <LogOut className="size-3.5" /> Se déconnecter
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Chargement…</div>
        ) : orders.length === 0 ? (
          <div className="bg-ivory border border-primary/15 p-12 text-center shadow-soft">
            <Sparkles className="size-6 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl">Aucune composition pour l'instant</h2>
            <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
              Composez votre première expérience Eventia en 8 étapes.
            </p>
            <Link to="/configurateur" className="inline-block mt-6">
              <GoldButton>Commencer une composition <ArrowRight className="size-4 ml-2" /></GoldButton>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border/60 bg-ivory border border-primary/15 shadow-soft">
            {orders.map((o) => (
              <li key={o.ref} className="p-6 md:p-8 flex items-center justify-between flex-wrap gap-6">
                <div>
                  <div className="eyebrow text-primary text-[10px]">{o.ref}</div>
                  <div className="font-display text-2xl mt-1 capitalize">{o.formula}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(o.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    {" · "}
                    <span className="capitalize">{o.status}</span>
                  </div>
                </div>
                <div className="font-display text-3xl text-primary">{o.total_eur} €</div>
                <div className="flex gap-2 flex-wrap">
                  <Link to="/ma-commande/$ref" params={{ ref: o.ref }}>
                    <OutlineButton>Voir le détail</OutlineButton>
                  </Link>
                  {o.status === "paid" && (
                    <Link to="/mes-invitations" search={{ new: true, order: (o as any).id }}>
                      <GoldButton><Heart className="size-4 mr-2" /> Créer l'invitation</GoldButton>
                    </Link>
                  )}
                  {o.gumroad_url && o.status !== "paid" && (
                    <a href={o.gumroad_url} target="_blank" rel="noopener noreferrer">
                      <GoldButton>Payer <ExternalLink className="size-4 ml-2" /></GoldButton>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isAdmin && (
          <div className="mt-12 p-5 border border-dashed border-primary/30 text-center">
            <p className="text-xs text-muted-foreground mb-3 tracking-wide">
              Premier accès propriétaire ? Activez votre compte administrateur (une seule fois).
            </p>
            <button
              onClick={handleClaim}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs tracking-[0.22em] uppercase border border-primary text-primary hover:bg-primary hover:text-ivory"
            >
              <ShieldCheck className="size-3.5" /> Devenir administrateur
            </button>
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
