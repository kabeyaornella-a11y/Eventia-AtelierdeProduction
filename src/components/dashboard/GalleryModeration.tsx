import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPendingGalleryForOwner } from "@/lib/admin-extras.functions";
import { moderateGalleryPhoto } from "@/lib/gallery.functions";
import { toast } from "sonner";
import { Check, X, Camera } from "lucide-react";

export function GalleryModeration({ invitationId }: { invitationId: string }) {
  const fetchPhotos = useServerFn(listPendingGalleryForOwner);
  const moderate = useServerFn(moderateGalleryPhoto);
  const q = useQuery({
    queryKey: ["gallery-mod", invitationId],
    queryFn: () => fetchPhotos({ data: { invitation_id: invitationId } }),
  });
  const [busy, setBusy] = useState<string | null>(null);
  const photos = q.data?.photos ?? [];

  const act = async (id: string, approved: boolean) => {
    setBusy(id);
    try {
      await moderate({ data: { id, approved } });
      toast.success(approved ? "Photo approuvée" : "Photo retirée");
      q.refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(null);
    }
  };

  if (q.isLoading) return <p className="text-sm text-muted-foreground">Chargement…</p>;
  if (photos.length === 0)
    return <p className="text-sm text-muted-foreground">Aucune photo à modérer.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {photos.map((p: any) => (
        <article key={p.id} className="border rounded-lg overflow-hidden bg-background">
          <img src={p.image_url} alt="" className="w-full h-32 object-cover" />
          <div className="p-2 text-xs">
            {p.guest_name && <p className="font-semibold">{p.guest_name}</p>}
            {p.caption && <p className="text-muted-foreground line-clamp-2">{p.caption}</p>}
            <div className="flex gap-1 mt-2">
              <button
                disabled={busy === p.id || p.approved}
                onClick={() => act(p.id, true)}
                className="flex-1 inline-flex items-center justify-center gap-1 bg-primary/10 text-primary text-xs py-1 rounded disabled:opacity-50"
              >
                <Check className="w-3 h-3" /> {p.approved ? "OK" : "Valider"}
              </button>
              <button
                disabled={busy === p.id}
                onClick={() => act(p.id, false)}
                className="flex-1 inline-flex items-center justify-center gap-1 bg-destructive/10 text-destructive text-xs py-1 rounded disabled:opacity-50"
              >
                <X className="w-3 h-3" /> Retirer
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
