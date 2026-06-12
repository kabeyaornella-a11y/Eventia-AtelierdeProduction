import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-14`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed font-serif-soft">
          {intro}
        </p>
      )}
    </div>
  );
}

export function GoldButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-7 py-3.5 text-xs tracking-[0.22em] uppercase text-ivory bg-primary hover:bg-cacao transition-colors shadow-gold ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-7 py-3.5 text-xs tracking-[0.22em] uppercase text-foreground border border-foreground/40 hover:border-primary hover:text-primary transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
