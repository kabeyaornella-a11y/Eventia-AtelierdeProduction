// Local-only persistence for the configurateur (no backend)
import { modules } from "./eventia-data";

const DRAFT_KEY = "eventia.configurateur.draft";
const ORDERS_KEY = "eventia.orders";

export type ConfigDraft = {
  step: number;
  eventType: string;
  univers: string;
  expSlug: string;
  formula: string;
  activeModules: string[];
  palette: string;
  date: string;
  contact: { nom: string; email: string; phone: string };
  updatedAt: number;
};

export type SavedOrder = ConfigDraft & {
  ref: string;
  total: number;
  createdAt: number;
};

export const emptyDraft = (): ConfigDraft => ({
  step: 0,
  eventType: "",
  univers: "",
  expSlug: "",
  formula: "signature",
  activeModules: modules.filter((m) => m.included).map((m) => m.id),
  palette: "Aube Céleste",
  date: "",
  contact: { nom: "", email: "", phone: "" },
  updatedAt: Date.now(),
});

const isBrowser = () => typeof window !== "undefined";

export function loadDraft(): ConfigDraft | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as ConfigDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(d: ConfigDraft) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...d, updatedAt: Date.now() }));
  } catch {
    // ignore
  }
}

export function clearDraft() {
  if (!isBrowser()) return;
  localStorage.removeItem(DRAFT_KEY);
}

export function generateRef(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `EVT-${year}-${code}`;
}

export function loadOrders(): Record<string, SavedOrder> {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, SavedOrder>) : {};
  } catch {
    return {};
  }
}

export function saveOrder(order: SavedOrder) {
  if (!isBrowser()) return;
  const orders = loadOrders();
  orders[order.ref] = order;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrder(ref: string): SavedOrder | null {
  return loadOrders()[ref] ?? null;
}
