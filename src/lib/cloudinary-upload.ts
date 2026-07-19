/**
 * Upload direct navigateur → Cloudinary via un "unsigned upload preset".
 * Aucune clé secrète n'est exposée côté client — le preset définit lui-même
 * les contraintes acceptées (dossier, taille, formats) côté Cloudinary.
 *
 * Prérequis (à créer une fois dans le dashboard Cloudinary du compte
 * "didid8vcu", Settings → Upload → Upload presets → Add upload preset,
 * signing mode "Unsigned") puis à renseigner dans les variables
 * d'environnement :
 *   VITE_CLOUDINARY_CLOUD_NAME=didid8vcu
 *   VITE_CLOUDINARY_UPLOAD_PRESET=<nom du preset>
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "didid8vcu";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  resource_type: "image" | "video" | "raw";
  format: string;
};

export function isCloudinaryUploadConfigured(): boolean {
  return !!UPLOAD_PRESET;
}

/** Upload un fichier (image ou vidéo) vers Cloudinary, dans le dossier donné. */
export async function uploadToCloudinary(
  file: File,
  folder: string,
): Promise<CloudinaryUploadResult> {
  if (!UPLOAD_PRESET) {
    throw new Error(
      "Upload Cloudinary non configuré — variable VITE_CLOUDINARY_UPLOAD_PRESET manquante.",
    );
  }
  const resourceType = file.type.startsWith("video/") ? "video" : "image";
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", UPLOAD_PRESET);
  body.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
    method: "POST",
    body,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Échec de l'upload Cloudinary (${res.status}) : ${txt.slice(0, 200)}`);
  }
  return (await res.json()) as CloudinaryUploadResult;
}

/** Dérive l'URL poster (1ère frame JPG) d'une vidéo Cloudinary uploadée. */
export function posterFromVideoUrl(videoUrl: string): string {
  return videoUrl.replace("/upload/", "/upload/so_0,q_auto/").replace(/\.\w+$/, ".jpg");
}
