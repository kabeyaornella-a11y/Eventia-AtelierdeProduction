import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Sparkles, Save, ArrowLeft, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, Section, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { getMyInvitation } from "@/lib/my-invitations.functions";
import { generateInvitationContent, saveInvitationBlocks } from "@/lib/studio.functions";
import { collections } from "@/lib/eventia-data";
import type { InvitationBlocks as Blocks, AccommodationOption } from "@/lib/invitation-blocks";
import { normalizeAccommodations } from "@/lib/invitation-blocks";

export const Route = createFileRoute("/_authenticated/studio/$id")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Studio — Eventia Signature" }, { name: "robots", content: "noindex" }],
  }),
  component: StudioPage,
});

function StudioPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchInv = useServerFn(getMyInvitation);
  const generate = useServerFn(generateInvitationContent);
  const save = useServerFn(saveInvitationBlocks);

  const { data, isLoading } = useQuery({
    queryKey: ["invitation", id],
    queryFn: () => fetchInv({ data: { id } }),
  });

  const inv = data?.invitation;
  const [theme, setTheme] = useState<string>("");
  const [blocks, setBlocks] = useState<Blocks>({});
  const [tone, setTone] = useState<"elegant" | "romantique" | "festif" | "minimal">("elegant");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (inv) {
      setTheme(inv.theme ?? collections[0]?.slug ?? "bloom");
      const loaded = (inv.blocks as Blocks) ?? {};
      setBlocks({ ...loaded, accommodations: normalizeAccommodations(loaded.accommodations) });
    }
  }, [inv]);

  if (isLoading)
    return (
      <SiteLayout>
        <Section>
          <div className="py-20 text-center text-muted-foreground">Chargement…</div>
        </Section>
      </SiteLayout>
    );
  if (!inv)
    return (
      <SiteLayout>
        <Section>
          <div className="py-20 text-center">Invitation introuvable</div>
        </Section>
      </SiteLayout>
    );

  async function handleGenerate() {
    setBusy(true);
    try {
      const res = await generate({
        data: {
          invitation_id: id,
          theme,
          couple_names: inv!.couple_names,
          event_date: inv!.event_date,
          venue: inv!.venue ?? "",
          tone,
          language: "fr",
        },
      });
      const generated = res.blocks as Blocks;
      setBlocks({
        ...generated,
        accommodations: normalizeAccommodations(generated.accommodations),
      });
      toast.success("Contenu généré ✨");
      qc.invalidateQueries({ queryKey: ["invitation", id] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur IA");
    } finally {
      setBusy(false);
    }
  }

  async function handleSave(status?: "design" | "review" | "ready") {
    setBusy(true);
    try {
      await save({
        data: {
          invitation_id: id,
          blocks: blocks as Record<string, never>,
          theme,
          production_status: status,
          progress: status === "ready" ? 100 : status === "review" ? 75 : 40,
        },
      });
      toast.success("Enregistré");
      qc.invalidateQueries({ queryKey: ["invitation", id] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <Section>
        <button
          onClick={() => navigate({ to: "/tableau-de-bord" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="size-4" /> Tableau de bord
        </button>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow text-primary">Studio d'assemblage</div>
            <h1 className="font-display text-4xl md:text-5xl mt-2">{inv.couple_names}</h1>
            <p className="font-serif-soft italic text-muted-foreground mt-2">
              {new Date(inv.event_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {inv.venue ? ` · ${inv.venue}` : ""}
            </p>
          </div>
          <a href={`/invitation/${inv.token}`} target="_blank" rel="noreferrer">
            <OutlineButton>
              <Eye className="size-4 mr-2" /> Aperçu live
            </OutlineButton>
          </a>
        </div>

        {/* AI generator */}
        <div className="bg-ivory shadow-soft p-6 md:p-8 mb-8 border border-primary/10">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="size-5" />
            <div className="eyebrow">Générer le contenu automatiquement</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground">Thème</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
              >
                {collections.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
                <option value="mediterraneen">Méditerranéen</option>
                <option value="floral">Floral</option>
                <option value="day-night">Day & Night</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Ton</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as typeof tone)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
              >
                <option value="elegant">Élégant</option>
                <option value="romantique">Romantique</option>
                <option value="festif">Festif</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
            <div className="flex items-end">
              <GoldButton onClick={handleGenerate} disabled={busy} className="w-full">
                {busy ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="size-4 mr-2" />
                )}
                Générer avec l'IA
              </GoldButton>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Le texte généré peut être édité ci-dessous avant validation.
          </p>
        </div>

        {/* Blocks editor */}
        <div className="space-y-6">
          <BlockText
            label="Titre hero"
            value={blocks.hero_title ?? ""}
            onChange={(v) => setBlocks({ ...blocks, hero_title: v })}
          />
          <BlockText
            label="Sous-titre hero"
            value={blocks.hero_subtitle ?? ""}
            onChange={(v) => setBlocks({ ...blocks, hero_subtitle: v })}
          />
          <BlockArea
            label="Message d'accueil"
            value={blocks.welcome_message ?? ""}
            onChange={(v) => setBlocks({ ...blocks, welcome_message: v })}
          />
          <BlockArea
            label="Notre histoire"
            value={blocks.story ?? ""}
            onChange={(v) => setBlocks({ ...blocks, story: v })}
            rows={6}
          />

          <ProgrammeEditor
            value={blocks.programme ?? []}
            onChange={(v) => setBlocks({ ...blocks, programme: v })}
          />

          <BlockText
            label="Dress code — titre"
            value={blocks.dress_code?.title ?? ""}
            onChange={(v) =>
              setBlocks({
                ...blocks,
                dress_code: { title: v, description: blocks.dress_code?.description ?? "" },
              })
            }
          />
          <BlockArea
            label="Dress code — description"
            value={blocks.dress_code?.description ?? ""}
            onChange={(v) =>
              setBlocks({
                ...blocks,
                dress_code: { title: blocks.dress_code?.title ?? "", description: v },
              })
            }
          />

          <FaqEditor value={blocks.faq ?? []} onChange={(v) => setBlocks({ ...blocks, faq: v })} />

          <BlockText
            label="Cadeaux — titre"
            value={blocks.gifts?.title ?? ""}
            onChange={(v) =>
              setBlocks({
                ...blocks,
                gifts: { title: v, description: blocks.gifts?.description ?? "" },
              })
            }
          />
          <BlockArea
            label="Cadeaux — description"
            value={blocks.gifts?.description ?? ""}
            onChange={(v) =>
              setBlocks({ ...blocks, gifts: { title: blocks.gifts?.title ?? "", description: v } })
            }
          />

          <AccommodationsEditor
            value={normalizeAccommodations(blocks.accommodations)}
            onChange={(v) => setBlocks({ ...blocks, accommodations: v })}
          />

          <BlockText
            label="Transport — titre"
            value={blocks.transport?.title ?? ""}
            onChange={(v) =>
              setBlocks({
                ...blocks,
                transport: { title: v, description: blocks.transport?.description ?? "" },
              })
            }
          />
          <BlockArea
            label="Transport — description"
            value={blocks.transport?.description ?? ""}
            onChange={(v) =>
              setBlocks({
                ...blocks,
                transport: { title: blocks.transport?.title ?? "", description: v },
              })
            }
          />

          <BlockArea
            label="Message de remerciement"
            value={blocks.thank_you ?? ""}
            onChange={(v) => setBlocks({ ...blocks, thank_you: v })}
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-border">
          <OutlineButton onClick={() => handleSave("design")} disabled={busy}>
            <Save className="size-4 mr-2" /> Sauver brouillon
          </OutlineButton>
          <OutlineButton onClick={() => handleSave("review")} disabled={busy}>
            Envoyer en revue
          </OutlineButton>
          <GoldButton onClick={() => handleSave("ready")} disabled={busy}>
            Marquer comme prêt à livrer
          </GoldButton>
        </div>
      </Section>
    </SiteLayout>
  );
}

function BlockText({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="eyebrow text-xs">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 px-4 py-3 bg-ivory border border-border text-sm"
      />
    </div>
  );
}
function BlockArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="eyebrow text-xs">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full mt-2 px-4 py-3 bg-ivory border border-border text-sm font-serif-soft"
      />
    </div>
  );
}
function ProgrammeEditor({
  value,
  onChange,
}: {
  value: Blocks["programme"];
  onChange: (v: NonNullable<Blocks["programme"]>) => void;
}) {
  const items = value ?? [];
  return (
    <div>
      <label className="eyebrow text-xs">Programme de la journée</label>
      <div className="space-y-2 mt-2">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <input
              value={it.time}
              onChange={(e) => {
                const c = [...items];
                c[i] = { ...c[i], time: e.target.value };
                onChange(c);
              }}
              placeholder="14:00"
              className="col-span-2 px-3 py-2 bg-ivory border border-border text-sm"
            />
            <input
              value={it.title}
              onChange={(e) => {
                const c = [...items];
                c[i] = { ...c[i], title: e.target.value };
                onChange(c);
              }}
              placeholder="Cérémonie"
              className="col-span-3 px-3 py-2 bg-ivory border border-border text-sm"
            />
            <input
              value={it.description}
              onChange={(e) => {
                const c = [...items];
                c[i] = { ...c[i], description: e.target.value };
                onChange(c);
              }}
              placeholder="Description"
              className="col-span-6 px-3 py-2 bg-ivory border border-border text-sm"
            />
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="col-span-1 text-xs text-muted-foreground hover:text-destructive"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...items, { time: "", title: "", description: "" }])}
          className="text-xs text-primary hover:underline"
        >
          + Ajouter une étape
        </button>
      </div>
    </div>
  );
}
function AccommodationsEditor({
  value,
  onChange,
}: {
  value: AccommodationOption[];
  onChange: (v: AccommodationOption[]) => void;
}) {
  const items = value ?? [];
  return (
    <div>
      <label className="eyebrow text-xs">Hébergements</label>
      <div className="space-y-3 mt-2">
        {items.map((it, i) => (
          <div key={i} className="border border-border p-3 bg-ivory space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                value={it.name}
                onChange={(e) => {
                  const c = [...items];
                  c[i] = { ...c[i], name: e.target.value };
                  onChange(c);
                }}
                placeholder="Nom de l'hôtel/lieu"
                className="px-3 py-2 bg-background border border-border text-sm"
              />
              <input
                value={it.area}
                onChange={(e) => {
                  const c = [...items];
                  c[i] = { ...c[i], area: e.target.value };
                  onChange(c);
                }}
                placeholder="Quartier / distance"
                className="px-3 py-2 bg-background border border-border text-sm"
              />
            </div>
            <textarea
              value={it.notes}
              onChange={(e) => {
                const c = [...items];
                c[i] = { ...c[i], notes: e.target.value };
                onChange(c);
              }}
              placeholder="Notes (type d'hébergement, ambiance...)"
              rows={2}
              className="w-full px-3 py-2 bg-background border border-border text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={it.promo_code ?? ""}
                onChange={(e) => {
                  const c = [...items];
                  c[i] = { ...c[i], promo_code: e.target.value };
                  onChange(c);
                }}
                placeholder="Code promo (optionnel)"
                className="px-3 py-2 bg-background border border-border text-sm font-mono"
              />
              <input
                value={it.booking_url ?? ""}
                onChange={(e) => {
                  const c = [...items];
                  c[i] = { ...c[i], booking_url: e.target.value };
                  onChange(c);
                }}
                placeholder="Lien de réservation (optionnel)"
                className="px-3 py-2 bg-background border border-border text-sm"
              />
            </div>
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Supprimer
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            onChange([...items, { name: "", area: "", notes: "", promo_code: "", booking_url: "" }])
          }
          className="text-xs text-primary hover:underline"
        >
          + Ajouter un hébergement
        </button>
      </div>
    </div>
  );
}
function FaqEditor({
  value,
  onChange,
}: {
  value: Blocks["faq"];
  onChange: (v: NonNullable<Blocks["faq"]>) => void;
}) {
  const items = value ?? [];
  return (
    <div>
      <label className="eyebrow text-xs">FAQ</label>
      <div className="space-y-3 mt-2">
        {items.map((it, i) => (
          <div key={i} className="border border-border p-3 bg-ivory">
            <input
              value={it.q}
              onChange={(e) => {
                const c = [...items];
                c[i] = { ...c[i], q: e.target.value };
                onChange(c);
              }}
              placeholder="Question"
              className="w-full px-3 py-2 bg-background border border-border text-sm mb-2"
            />
            <textarea
              value={it.a}
              onChange={(e) => {
                const c = [...items];
                c[i] = { ...c[i], a: e.target.value };
                onChange(c);
              }}
              placeholder="Réponse"
              rows={2}
              className="w-full px-3 py-2 bg-background border border-border text-sm"
            />
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-xs text-muted-foreground hover:text-destructive mt-1"
            >
              Supprimer
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...items, { q: "", a: "" }])}
          className="text-xs text-primary hover:underline"
        >
          + Ajouter une question
        </button>
      </div>
    </div>
  );
}
