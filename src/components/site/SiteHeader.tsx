import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, UserCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-admin";

const navLinks = [
  { to: "/experiences", label: "Univers" },
  { to: "/save-the-date", label: "Save The Date" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/atelier", label: "Atelier" },
  { to: "/entreprises", label: "Entreprises" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-wide">Eventia</span>
          <span className="eyebrow mt-1">Signature</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <span className="text-xs eyebrow">FR</span>
          {user && (
            <Link
              to="/tableau-de-bord"
              className="text-xs tracking-[0.18em] uppercase text-foreground/80 hover:text-primary"
            >
              Tableau de bord
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:text-cacao"
              aria-label="Admin"
            >
              <ShieldCheck className="size-4" /> Admin
            </Link>
          )}
          <Link
            to={user ? "/mes-commandes" : "/auth"}
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-foreground/80 hover:text-primary"
            aria-label="Espace client"
          >
            <UserCircle2 className="size-4" />
            {user ? "Mon espace" : "Connexion"}
          </Link>
          <Link
            to="/configurateur"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.22em] uppercase text-ivory bg-primary hover:bg-cacao transition-colors"
          >
            Commencer
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-ivory">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base text-foreground/90 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border/60" />
            {user && (
              <Link
                to="/tableau-de-bord"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-base text-foreground/90 hover:text-primary"
              >
                <UserCircle2 className="size-4" /> Tableau de bord
              </Link>
            )}
            <Link
              to={user ? "/mes-commandes" : "/auth"}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-base text-foreground/90 hover:text-primary"
            >
              <UserCircle2 className="size-4" />
              {user ? "Mon espace client" : "Espace client / Connexion"}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-base text-primary hover:text-cacao"
              >
                <ShieldCheck className="size-4" /> Espace admin
              </Link>
            )}
            <Link
              to="/configurateur"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-xs tracking-[0.22em] uppercase text-ivory bg-primary"
            >
              Commencer
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
