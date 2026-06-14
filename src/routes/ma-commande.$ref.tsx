import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Download, ArrowLeft, Sparkles, Copy, Check } from "lucide-react";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { getOrder, type SavedOrder } from "@/lib/configurateur-store";
import { getOrderByRef } from "@/lib/orders.functions";
import { collections, experiences, offers, modules } from "@/lib/eventia-data";
import { toast } from "sonner";

export const Route = createFileRoute("/ma-commande/$ref")({
  head: ({ params }) => ({
    meta: [
      { title: `Commande ${params.ref} — Eventia Signature` },
      {
        name: "description",
        content: "Récapitulatif premium de votre commande Eventia Signature.",
      },
      { property: "og:title", content: `Commande ${params.ref} — Eventia Signature` },
      { property: "og:description", content: "Votre composition Eventia, prête à partager." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MaCommandePage,
});

function MaCommandePage() {
  const { ref } = Route.useParams();
  const fetchOrder = useServerFn(getOrderByRef);
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchOrder({ data: { ref } });
        if (cancelled) return;
        if (res.order) {
          const cfg = (res.order.config ?? {}) as Partial<SavedOrder>;
          setOrder({
            ref: res.order.ref,
            total: res.order.total_eur,
            createdAt: new Date(res.order.created_at).getTime(),
            step: cfg.step ?? 6,
            eventType: cfg.eventType ?? "",
            univers: cfg.univers ?? "",
            expSlug: res.order.experience_slug ?? cfg.expSlug ?? "",
            formula: res.order.formula ?? cfg.formula ?? "signature",
            activeModules: cfg.activeModules ?? [],
            palette: cfg.palette ?? "Aube Céleste",
            date: cfg.date ?? "",
            contact: cfg.contact ?? { nom: "", email: "", phone: "" },
            updatedAt: cfg.updatedAt ?? Date.now(),
          });
        } else {
          setOrder(getOrder(ref));
        }
      } catch {
        setOrder(getOrder(ref));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ref, fetchOrder]);

  if (loading) {
    return (
      <SiteLayout>
        <Section className="text-center">
          <div className="eyebrow">Chargement…</div>
          <h1 className="font-display text-3xl mt-3">Commande {ref}</h1>
        </Section>
      </SiteLayout>
    );
  }

  if (!order) {
    return (
      <SiteLayout>
        <Section className="text-center">
          <div className="eyebrow">Référence introuvable</div>
          <h1 className="font-display text-4xl mt-4">Commande {ref}</h1>
          <p className="font-serif-soft italic text-muted-foreground mt-3 max-w-md mx-auto">
            Cette référence n'est plus disponible. Vérifiez le lien ou recomposez votre expérience.
          </p>
          <Link to="/configurateur" className="inline-block mt-8">
            <GoldButton>Composer une expérience</GoldButton>
          </Link>
        </Section>
      </SiteLayout>
    );
  }

  const exp = experiences.find((e) => e.slug === order.expSlug);
  const col = collections.find((c) => c.slug === order.univers);
  const off = offers.find((o) => o.slug === order.formula);
  const mods = modules.filter((m) => order.activeModules.includes(m.id));

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    let y = 60;

    doc.setTextColor(184, 138, 58);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("EVENTIA SIGNATURE", 40, y);
    doc.text(order.ref, W - 40, y, { align: "right" });
    y += 30;
    doc.setDrawColor(184, 138, 58);
    doc.line(40, y, W - 40, y);
    y += 40;

    doc.setTextColor(43, 26, 18);
    doc.setFont("times", "normal");
    doc.setFontSize(28);
    doc.text(exp?.name ?? "Votre expérience", 40, y);
    y += 28;

    doc.setFontSize(11);
    doc.setTextColor(75, 58, 42);
    doc.text(
      `${col?.name ?? "—"}  ·  ${off?.name ?? "—"}  ·  ${order.eventType || "Événement"}`,
      40,
      y,
    );
    y += 36;

    const rows: [string, string][] = [
      ["Référence", order.ref],
      ["Destinataire", order.contact.nom || "—"],
      ["Email", order.contact.email || "—"],
      ["Téléphone", order.contact.phone || "—"],
      ["Date événement", order.date || "—"],
      ["Palette", order.palette],
      ["Univers", col?.name ?? "—"],
      ["Expérience", exp?.name ?? "—"],
      ["Formule", off?.name ?? "—"],
    ];
    doc.setFontSize(11);
    rows.forEach(([k, v]) => {
      doc.setTextColor(120, 110, 95);
      doc.text(k, 40, y);
      doc.setTextColor(43, 26, 18);
      doc.text(v, 200, y);
      y += 18;
    });

    y += 14;
    doc.setTextColor(184, 138, 58);
    doc.setFontSize(10);
    doc.text("MODULES", 40, y);
    y += 16;
    doc.setTextColor(43, 26, 18);
    mods.forEach((m) => {
      doc.setFontSize(11);
      doc.text(`• ${m.name}`, 50, y);
      doc.text(m.included ? "Inclus" : `+${m.price} €`, W - 40, y, { align: "right" });
      y += 16;
    });

    y += 24;
    doc.setDrawColor(184, 138, 58);
    doc.line(40, y, W - 40, y);
    y += 28;
    doc.setFont("times", "normal");
    doc.setFontSize(22);
    doc.setTextColor(184, 138, 58);
    doc.text("Total", 40, y);
    doc.text(`${order.total} €`, W - 40, y, { align: "right" });
    y += 18;
    doc.setFontSize(9);
    doc.setTextColor(120, 110, 95);
    doc.text("Paiement en 3 ou 4 fois sans frais. Notre atelier vous contacte sous 24h.", 40, y);

    doc.save(`eventia-${order.ref}.pdf`);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <SiteLayout>
      <Section>
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/configurateur"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" /> Modifier ma composition
          </Link>
          <div className="eyebrow text-primary">Référence {order.ref}</div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10">
          <div>
            {exp && (
              <div className="relative overflow-hidden shadow-soft mb-8">
                <img src={exp.image} alt={exp.name} className="w-full h-72 md:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cacao/60 via-cacao/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <div className="eyebrow text-ivory/80">{col?.name}</div>
                  <h1 className="font-display text-4xl md:text-5xl">{exp.name}</h1>
                  <p className="font-serif-soft italic mt-2 max-w-xl">{exp.story}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-primary mb-3">
              <Sparkles className="size-4" />
              <div className="eyebrow">Modules sélectionnés</div>
            </div>
            <ul className="divide-y divide-border/60 text-sm">
              {mods.map((m) => (
                <li key={m.id} className="flex justify-between py-3">
                  <span>{m.name}</span>
                  <span className="text-muted-foreground">
                    {m.included ? "Inclus" : `+${m.price} €`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="bg-ivory border border-primary/15 shadow-soft p-8 self-start">
            <div className="eyebrow">Votre commande</div>
            <h2 className="font-display text-3xl mt-1">{off?.name}</h2>
            <div className="font-display text-5xl text-primary mt-3">{order.total} €</div>
            <div className="text-xs text-muted-foreground">Paiement en 3 ou 4 fois sans frais</div>

            <dl className="mt-6 space-y-2 text-sm">
              <Row label="Événement" value={order.eventType || "—"} />
              <Row label="Univers" value={col?.name ?? "—"} />
              <Row label="Palette" value={order.palette} />
              <Row label="Date" value={order.date || "—"} />
              <Row label="Destinataire" value={order.contact.nom || "—"} />
              <Row label="Email" value={order.contact.email || "—"} />
            </dl>

            <div className="mt-6 space-y-3">
              <GoldButton onClick={downloadPdf} className="w-full">
                <Download className="size-4 mr-2" /> Télécharger en PDF
              </GoldButton>
              <OutlineButton
                onClick={() => {
                  navigator.clipboard?.writeText(shareUrl);
                  setCopied(true);
                  toast.success("Lien copié");
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full"
              >
                {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                {copied ? "Copié" : "Copier le lien"}
              </OutlineButton>
            </div>
            <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">
              Commande enregistrée. Notre atelier vous contacte sous 24 h pour la production.
            </p>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground text-right">{value}</span>
    </div>
  );
}
