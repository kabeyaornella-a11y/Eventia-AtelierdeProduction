import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listApprovedGallery, submitGalleryPhoto } from "@/lib/gallery.functions";
import { createGalleryUploadUrl } from "@/lib/gallery-upload.functions";
import { toast } from "sonner";
import { Camera, Send, Upload } from "lucide-react";

export const Route = createFileRoute("/galerie/$token")({
  head: ({ params }) => ({
    meta: [
      { title: "Galerie souvenirs — Eventia" },
      { name: "description", content: `Partagez vos photos de l'événement ${params.token}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GalleryPage,
});

type Photo = { id: string; guest_name: string | null; caption: string | null; image_url: string; created_at: string };

function GalleryPage() {
  const { token } = Route.useParams();
  const fetchList = useServerFn(listApprovedGallery);
  const submit = useServerFn(submitGalleryPhoto);
  const createUpload = useServerFn(createGalleryUploadUrl);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [form, setForm] = useState({ guest_name: "", caption: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList({ data: { token } }).then((r) => setPhotos(r.photos as Photo[])).catch(() => {});
  }, [token, fetchList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Choisis une photo");
    if (file.size > 10 * 1024 * 1024) return toast.error("Photo trop lourde (max 10 Mo)");
    setLoading(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const { path, url } = await createUpload({ data: { token, ext } });
      const upRes = await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      if (!upRes.ok) throw new Error("Upload échoué");
      const publicRef = `storage://${path}`;
      await submit({ data: { token, ...form, image_url: publicRef } });
      toast.success("Merci ! Ta photo est en attente de validation.");
      setForm({ guest_name: "", caption: "" });
      setFile(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <Camera className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h1 className="text-4xl font-serif mb-2">Galerie souvenirs</h1>
          <p className="text-muted-foreground">Partage tes plus beaux clichés de la soirée.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-6 mb-10 grid gap-3 max-w-xl mx-auto">
          <input className="input border rounded-md px-3 py-2 bg-background" placeholder="Ton prénom (optionnel)"
            value={form.guest_name} onChange={(e) => setForm({ ...form, guest_name: e.target.value })} maxLength={80} />
          <label className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
            <Upload className="w-6 h-6 mx-auto mb-2 text-primary" />
            <span className="text-sm">{file ? file.name : "Cliquer pour choisir une photo"}</span>
            <input type="file" accept="image/*" className="hidden" required
              onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <textarea className="input border rounded-md px-3 py-2 bg-background" placeholder="Une légende ? (optionnel)"
            value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} maxLength={280} rows={2} />
          <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-4 py-2 disabled:opacity-60">
            {loading ? "Envoi…" : (<><Send className="w-4 h-4" /> Envoyer</>)}
          </button>
        </form>

        {photos.length === 0 ? (
          <p className="text-center text-muted-foreground">Aucune photo publiée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((p) => (
              <figure key={p.id} className="rounded-xl overflow-hidden bg-muted">
                <img src={p.image_url} alt={p.caption ?? "Souvenir"} loading="lazy" className="w-full h-56 object-cover" />
                {(p.caption || p.guest_name) && (
                  <figcaption className="text-xs p-2">
                    {p.guest_name && <strong>{p.guest_name} · </strong>}
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
