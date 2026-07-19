import { createFileRoute, Outlet, Link, redirect } from "@tanstack/react-router";
import { getMyAdminStatus } from "@/lib/admin.functions";
import { SiteLayout, Section } from "@/components/site/SiteLayout";
import {
  LayoutDashboard,
  ShoppingBag,
  Mail,
  Heart,
  Building2,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { isAdmin } = await getMyAdminStatus();
      if (!isAdmin) throw redirect({ to: "/mes-commandes" });
    } catch (e: any) {
      if (e?.isRedirect) throw e;
      throw redirect({ to: "/mes-commandes" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const tabs = [
    { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/commandes" as const, label: "Commandes", icon: ShoppingBag, exact: false },
    { to: "/admin/ateliers" as const, label: "Ateliers", icon: Mail, exact: false },
    { to: "/admin/invitations" as const, label: "Invitations", icon: Heart, exact: false },
    { to: "/admin/medias" as const, label: "Médiathèque", icon: ImageIcon, exact: false },
    { to: "/admin/b2b" as const, label: "B2B", icon: Building2, exact: false },
  ];
  return (
    <SiteLayout>
      <Section className="pt-12">
        <div className="mb-10">
          <div className="eyebrow text-primary">Back-office</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Admin Eventia</h1>
        </div>
        <nav className="flex flex-wrap gap-2 mb-10 border-b border-border/60 pb-4">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeOptions={{ exact: t.exact }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase text-foreground/70 hover:text-primary hover:bg-primary/5"
              activeProps={{ className: "text-primary bg-primary/10" }}
            >
              <t.icon className="size-3.5" /> {t.label}
            </Link>
          ))}
        </nav>
        <Outlet />
      </Section>
    </SiteLayout>
  );
}
