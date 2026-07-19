import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Companion = { name: string; type: "adult" | "child"; allergies?: string };
type Rsvp = {
  id: string;
  guest_name: string;
  guest_email: string | null;
  status: "yes" | "no" | "maybe";
  guests_count: number;
  companions: Companion[] | null;
  allergies: string | null;
  needs_transport: boolean;
  message: string | null;
  guest_id: string | null;
  created_at: string;
};
type Guest = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  group_label: string | null;
  expected_adults: number;
  expected_children: number;
  guest_token: string;
  opened_at: string | null;
  table_number: string | null;
  rsvp_id: string | null;
};

/**
 * Toutes les statistiques du tableau de bord marié en un seul appel :
 * suivi d'ouverture, confirmations, décompte adultes/enfants, allergies
 * consolidées, plan de table brut. Le calcul se fait ici (pas côté client)
 * pour n'avoir qu'une seule source de vérité.
 */
export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => z.object({ invitation_id: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const { data: inv } = await context.supabase
      .from("invitations")
      .select("id, token, couple_names, event_date")
      .eq("id", data.invitation_id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!inv) throw new Error("Invitation introuvable");

    const [{ data: guestsRaw }, { data: rsvpsRaw }] = await Promise.all([
      context.supabase
        .from("invitation_guests")
        .select(
          "id, name, email, phone, group_label, expected_adults, expected_children, guest_token, opened_at, table_number, rsvp_id",
        )
        .eq("invitation_id", data.invitation_id),
      context.supabase
        .from("rsvps")
        .select(
          "id, guest_name, guest_email, status, guests_count, companions, allergies, needs_transport, message, guest_id, created_at",
        )
        .eq("invitation_id", data.invitation_id)
        .order("created_at", { ascending: false }),
    ]);

    const guests = (guestsRaw ?? []) as Guest[];
    const rsvps = (rsvpsRaw ?? []) as Rsvp[];

    const confirmed = rsvps.filter((r) => r.status === "yes");
    const declined = rsvps.filter((r) => r.status === "no");
    const maybe = rsvps.filter((r) => r.status === "maybe");

    let adults = 0;
    let children = 0;
    let transportNeeded = 0;
    const allergies: Array<{ name: string; allergies: string }> = [];

    for (const r of confirmed) {
      adults += 1; // le répondant principal compte comme un adulte
      if (r.allergies) allergies.push({ name: r.guest_name, allergies: r.allergies });
      for (const c of r.companions ?? []) {
        if (c.type === "child") children += 1;
        else adults += 1;
        if (c.allergies)
          allergies.push({
            name: c.name || `Accompagnant de ${r.guest_name}`,
            allergies: c.allergies,
          });
      }
      if (r.needs_transport) transportNeeded += 1;
    }

    const openedCount = guests.filter((g) => !!g.opened_at).length;
    const openedNoResponse = guests.filter((g) => g.opened_at && !g.rsvp_id).length;
    const rsvpsWithoutGuest = rsvps.filter((r) => !r.guest_id).length;

    const rsvpById = new Map(rsvps.map((r) => [r.id, r]));
    const guestsWithRsvp = guests.map((g) => ({
      ...g,
      rsvp: g.rsvp_id ? (rsvpById.get(g.rsvp_id) ?? null) : null,
    }));

    return {
      invitation: inv,
      guests: guestsWithRsvp,
      rsvps,
      stats: {
        guestsListed: guests.length,
        opened: openedCount,
        notOpened: guests.length - openedCount,
        openedNoResponse,
        confirmed: confirmed.length,
        declined: declined.length,
        maybe: maybe.length,
        totalResponses: rsvps.length,
        rsvpsWithoutGuest,
        adultsConfirmed: adults,
        childrenConfirmed: children,
        totalGuestsConfirmed: adults + children,
        transportNeeded,
      },
      allergies,
    };
  });
