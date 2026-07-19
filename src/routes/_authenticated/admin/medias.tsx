import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Film, Package, Upload, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { listVideoModels, createVideoModel, deleteVideoModel } from "@/lib/video-models.functions";
import { listDecorations, createDecoration, deleteDecoration } from "@/lib/decorations.functions";

type Decoration = { id: string; name: string; category: string; image_url: string | null };
import {
  uploadToCloudinary,
  isCloudinaryUploadConfigured,
  posterFromVideoUrl,
} from "@/lib/cloudinary-upload";

export const Route = createFileRoute("/_authenticated/admin/medias")({
  component: MediasPage,
});

const COLLECTIONS = [
  { value: "ecrins", label: "Les Écrins" },
  { value: "union", label: "L'Union" },
  { value: "voiles", label: "Les Voiles" },
  { value: "seuils", label: "Les Seuils" },
  { value: "save-the-date", label: "Save the Date" },
] as const;

function MediasPage() {
  const [tab, setTab] = useState<"videos" | "decorations">("videos");
  const configured = isCloudinaryUploadConfigured();

  return (
    <div>
      <div className="mb-6">
        <div className="eyebrow text-primary">Médiathèque</div>
        <h1 className="font-display text-3xl md:text-4xl mt-1">Illustrations, cadres & vidéos</h1>
        <p className="font-serif-soft italic text-muted-foreground mt-2">
          Ajoutez vous-même un nouveau modèle vidéo animé ou une décoration — sans passer par un
          développeur.
        </p>
      </div>

      {!configured && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 text-amber-900 text-sm p-4 mb-8">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
          <span>
            L'upload direct n'est pas encore configuré (variable{" "}
            <code>VITE_CLOUDINARY_UPLOAD_PRESET</code> manquante). Tant que ce n'est pas fait,
            demandez à Claude d'ajouter le média pour vous.
          </span>
        </div>
      )}

      <div className="flex gap-2 mb-8 border-b border-border/60 pb-3">
        <button
          onClick={() => setTab("videos")}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase ${tab === "videos" ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}
        >
          <Film className="size-3.5" /> Vidéos animées
        </button>
        <button
          onClick={() => setTab("decorations")}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase ${tab === "decorations" ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}
        >
          <Package className="size-3.5" /> Décorations
        </button>
      </div>

      {tab === "videos" ? (
        <VideosTab configured={configured} />
      ) : (
        <DecorationsTab configured={configured} />
      )}
    </div>
  );
}

function VideosTab({ configured }: { configured: boolean }) {
  const qc = useQueryClient();
  const fetchAll = useServerFn(listVideoModels);
  const create = useServerFn(createVideoModel);
  const remove = useServerFn(deleteVideoModel);

  const { data, isLoading } = useQuery({ queryKey: ["video-models"], queryFn: () => fetchAll() });

  const [collection, setCollection] = useState<(typeof COLLECTIONS)[number]["value"]>("voiles");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleUpload() {
    if (!file || !name.trim() || !slug.trim()) return;
    setBusy(true);
    try {
      const uploaded = await uploadToCloudinary(file, `models/${collection}`);
      await create({
        data: {
          collection,
          slug: slug.trim(),
          name: name.trim(),
          video_url: uploaded.secure_url,
          poster_url: posterFromVideoUrl(uploaded.secure_url),
        },
      });
      toast.success("Vidéo ajoutée au catalogue");
      setName("");
      setSlug("");
      setFile(null);
      qc.invalidateQueries({ queryKey: ["video-models"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await remove({ data: { id } });
      toast.success("Supprimée");
      qc.invalidateQueries({ queryKey: ["video-models"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  }

  return (
    <div>
      <div className="bg-ivory border border-primary/10 p-6 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs eyebrow">Collection</label>
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value as typeof collection)}
              className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
            >
              {COLLECTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs eyebrow">Identifiant (slug)</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex. brume-doree"
              className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs eyebrow">Nom affiché</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex. Brume Dorée"
            className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
          />
        </div>
        <div>
          <label className="text-xs eyebrow">Fichier vidéo</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full mt-1 text-sm"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!configured || busy || !file || !name.trim() || !slug.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.18em] uppercase text-ivory bg-primary hover:bg-cacao disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}{" "}
          Uploader & ajouter
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-10">Chargement…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data?.custom ?? []).map((m) => (
            <div key={m.id} className="bg-ivory border border-primary/10 p-4 shadow-soft">
              {m.poster_url && (
                <img src={m.poster_url} alt="" className="w-full aspect-video object-cover mb-3" />
              )}
              <div className="font-display text-lg">{m.name}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-3">
                {m.collection} · {m.slug}
              </div>
              <button
                onClick={() => handleDelete(m.id)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" /> Supprimer
              </button>
            </div>
          ))}
          {(data?.custom ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full">
              Aucun ajout depuis l'admin pour l'instant — le catalogue existant reste inchangé.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function DecorationsTab({ configured }: { configured: boolean }) {
  const qc = useQueryClient();
  const fetchAll = useServerFn(listDecorations);
  const create = useServerFn(createDecoration);
  const remove = useServerFn(deleteDecoration);

  const { data, isLoading } = useQuery({
    queryKey: ["decorations-all"],
    queryFn: () => fetchAll(),
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [themes, setThemes] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleUpload() {
    if (!file || !name.trim() || !category.trim()) return;
    setBusy(true);
    try {
      const uploaded = await uploadToCloudinary(file, "decorations");
      await create({
        data: {
          name: name.trim(),
          category: category.trim(),
          themes: themes
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          description: description.trim(),
          image_url: uploaded.secure_url,
        },
      });
      toast.success("Décoration ajoutée");
      setName("");
      setCategory("");
      setThemes("");
      setDescription("");
      setFile(null);
      qc.invalidateQueries({ queryKey: ["decorations-all"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await remove({ data: { id } });
      toast.success("Supprimée");
      qc.invalidateQueries({ queryKey: ["decorations-all"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  }

  return (
    <div>
      <div className="bg-ivory border border-primary/10 p-6 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs eyebrow">Nom</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex. Voilage ivoire"
              className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs eyebrow">Catégorie</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="ex. cadre, voilage, illustration"
              className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs eyebrow">Thèmes compatibles (séparés par des virgules)</label>
          <input
            value={themes}
            onChange={(e) => setThemes(e.target.value)}
            placeholder="ex. voiles, union"
            className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
          />
        </div>
        <div>
          <label className="text-xs eyebrow">Description (optionnel)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full mt-1 px-3 py-2 bg-background border border-border text-sm"
          />
        </div>
        <div>
          <label className="text-xs eyebrow">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full mt-1 text-sm"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!configured || busy || !file || !name.trim() || !category.trim()}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.18em] uppercase text-ivory bg-primary hover:bg-cacao disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}{" "}
          Uploader & ajouter
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-10">Chargement…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data?.decorations ?? []).map((d: Decoration) => (
            <div key={d.id} className="bg-ivory border border-primary/10 p-4 shadow-soft">
              {d.image_url && (
                <img src={d.image_url} alt="" className="w-full aspect-square object-cover mb-3" />
              )}
              <div className="font-display text-lg">{d.name}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-3">
                {d.category}
              </div>
              <button
                onClick={() => handleDelete(d.id)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" /> Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
