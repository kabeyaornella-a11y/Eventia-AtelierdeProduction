import { jsPDF } from "jspdf";

type Companion = { name: string; type: "adult" | "child"; allergies?: string };
type Rsvp = {
  id: string;
  guest_name: string;
  status: "yes" | "no" | "maybe";
  companions: Companion[] | null;
  allergies: string | null;
  needs_transport: boolean;
};
type Guest = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  group_label: string | null;
  expected_adults: number;
  expected_children: number;
  opened_at: string | null;
  table_number: string | null;
  rsvp_id: string | null;
  rsvp: Rsvp | null;
};

function csvCell(v: string | number | null | undefined): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Export CSV (ouvrable dans Excel/Sheets) de la liste d'invités, une ligne par personne (avec accompagnants). */
export function exportGuestsCsv(coupleNames: string, guests: Guest[]) {
  const header = [
    "Nom",
    "Groupe",
    "Table",
    "Statut",
    "Adultes attendus",
    "Enfants attendus",
    "Réponse",
    "Allergies",
    "Transport",
    "Email",
    "Téléphone",
  ];
  const rows: string[][] = [];

  for (const g of guests) {
    const status = !g.opened_at ? "Pas ouvert" : !g.rsvp_id ? "Ouvert, sans réponse" : "A répondu";
    const reponse = g.rsvp
      ? g.rsvp.status === "yes"
        ? "Confirmé"
        : g.rsvp.status === "no"
          ? "Décliné"
          : "Peut-être"
      : "—";
    rows.push([
      g.name,
      g.group_label ?? "",
      g.table_number ?? "",
      status,
      String(g.expected_adults),
      String(g.expected_children),
      reponse,
      g.rsvp?.allergies ?? "",
      g.rsvp?.needs_transport ? "Oui" : "",
      g.email ?? "",
      g.phone ?? "",
    ]);
    for (const c of g.rsvp?.companions ?? []) {
      rows.push([
        `  ↳ ${c.name || "Accompagnant"}`,
        g.group_label ?? "",
        g.table_number ?? "",
        "",
        c.type === "adult" ? "1" : "",
        c.type === "child" ? "1" : "",
        "",
        c.allergies ?? "",
        "",
        "",
        "",
      ]);
    }
  }

  const csv = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  const safeName = coupleNames.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  // BOM UTF-8 : nécessaire pour qu'Excel détecte l'encodage et affiche
  // correctement les accents (sinon "Réponse" devient "RÃ©ponse").
  const bom = "﻿";
  download(`invites-${safeName || "eventia"}.csv`, `${bom}${csv}`, "text/csv;charset=utf-8");
}

type Stats = {
  guestsListed: number;
  opened: number;
  notOpened: number;
  openedNoResponse: number;
  confirmed: number;
  declined: number;
  maybe: number;
  adultsConfirmed: number;
  childrenConfirmed: number;
  totalGuestsConfirmed: number;
  transportNeeded: number;
};

/** Export PDF récapitulatif : KPIs + liste des allergies (pour le traiteur/prestataires). */
export function exportSummaryPdf(
  coupleNames: string,
  eventDate: string,
  stats: Stats,
  allergies: Array<{ name: string; allergies: string }>,
) {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(20);
  doc.text(coupleNames, 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(120);
  doc.text(
    new Date(eventDate).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    20,
    y,
  );
  doc.setTextColor(0);
  y += 14;

  doc.setFontSize(14);
  doc.text("Récapitulatif des invitations", 20, y);
  y += 8;
  doc.setFontSize(10);
  const lines = [
    `Invitations envoyées : ${stats.guestsListed}`,
    `Ouvertes : ${stats.opened}  ·  Pas encore ouvertes : ${stats.notOpened}  ·  Ouvertes sans réponse : ${stats.openedNoResponse}`,
    `Confirmations : ${stats.confirmed}  ·  Refus : ${stats.declined}  ·  Peut-être : ${stats.maybe}`,
    `Convives confirmés : ${stats.totalGuestsConfirmed} (${stats.adultsConfirmed} adultes, ${stats.childrenConfirmed} enfants)`,
    `Besoin de transport : ${stats.transportNeeded}`,
  ];
  for (const line of lines) {
    doc.text(line, 20, y);
    y += 7;
  }
  y += 8;

  doc.setFontSize(14);
  doc.text("Allergies & régimes déclarés", 20, y);
  y += 8;
  doc.setFontSize(10);
  if (allergies.length === 0) {
    doc.text("Aucune allergie déclarée.", 20, y);
  } else {
    for (const a of allergies) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${a.name} — ${a.allergies}`, 20, y);
      y += 7;
    }
  }

  const safeName = coupleNames.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`recap-${safeName || "eventia"}.pdf`);
}
