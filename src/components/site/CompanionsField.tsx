import { UserPlus, Baby, X } from "lucide-react";

export type Companion = { name: string; type: "adult" | "child"; allergies: string };

/**
 * Liste nominative d'accompagnants pour un RSVP — remplace le simple
 * compteur numérique. Décision produit du 2026-07-19 : donne au couple une
 * vraie donnée exploitable (traiteur, plan de table) plutôt qu'un total.
 * Partagé entre invitation.$token.tsx et rsvp.$token.tsx.
 */
export function CompanionsField({
  value,
  onChange,
}: {
  value: Companion[];
  onChange: (v: Companion[]) => void;
}) {
  const add = (type: Companion["type"]) => onChange([...value, { name: "", type, allergies: "" }]);
  const update = (i: number, patch: Partial<Companion>) => {
    const next = [...value];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Accompagnants ({value.length + 1} personne{value.length ? "s" : ""} au total)
      </label>
      {value.length > 0 && (
        <div className="space-y-2 mt-3">
          {value.map((c, i) => (
            <div key={i} className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-center">
              <input
                placeholder={c.type === "child" ? "Prénom de l'enfant" : "Prénom de l'accompagnant"}
                value={c.name}
                onChange={(e) => update(i, { name: e.target.value })}
                className="px-3 py-2 bg-background border border-border text-sm"
              />
              <input
                placeholder="Allergie (optionnel)"
                value={c.allergies}
                onChange={(e) => update(i, { allergies: e.target.value })}
                className="px-3 py-2 bg-background border border-border text-sm"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Retirer"
                className="p-2 text-muted-foreground hover:text-destructive"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-3">
        <button
          type="button"
          onClick={() => add("adult")}
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <UserPlus className="size-3.5" /> Ajouter un adulte
        </button>
        <button
          type="button"
          onClick={() => add("child")}
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <Baby className="size-3.5" /> Ajouter un enfant
        </button>
      </div>
    </div>
  );
}
