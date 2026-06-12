import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import { findModelByName } from "@/lib/cloudinary-models";

export type LightboxExperience = {
  slug: string;
  name: string;
  story: string;
  image: string;
  univers?: string;
  priceFrom?: number;
  video?: string;
};

type Props = {
  experience: LightboxExperience | null;
  onClose: () => void;
};

/**
 * Ouverture immersive plein écran.
 * Fondu élégant, zoom léger, vidéo Cloudinary si dispo, sinon image.
 */
export function ExperienceLightbox({ experience, onClose }: Props) {
  useEffect(() => {
    if (!experience) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [experience, onClose]);

  if (!experience) return null;
  const video = experience.video ?? findModelByName(experience.name)?.video;

  return (
    <div
      className="fixed inset-0 z-[80] bg-cacao/95 backdrop-blur-md flex items-center justify-center px-4 py-10 md:py-16 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={experience.name}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 size-11 grid place-items-center rounded-full bg-ivory/10 hover:bg-ivory/20 text-ivory transition-colors"
        aria-label="Fermer"
      >
        <X className="size-5" />
      </button>

      <div
        className="relative w-full max-w-5xl bg-cacao text-ivory shadow-soft overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animationDuration: "600ms" }}
      >
        <div className="relative aspect-video w-full bg-cacao overflow-hidden">
          {video ? (
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover animate-zoom-soft"
            />
          ) : (
            <img
              src={experience.image}
              alt={experience.name}
              className="absolute inset-0 w-full h-full object-cover animate-zoom-soft"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cacao via-cacao/30 to-transparent" />
        </div>

        <div className="px-6 md:px-12 py-8 md:py-10 text-center">
          <div className="eyebrow !text-primary-soft">Ouverture immersive</div>
          <h2 className="font-display text-3xl md:text-5xl mt-3 leading-tight">{experience.name}</h2>
          <p className="font-serif-soft italic text-base md:text-lg text-ivory/85 mt-4 max-w-2xl mx-auto leading-relaxed">
            {experience.story}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/experiences/$slug" params={{ slug: experience.slug }} onClick={onClose}>
              <GoldButton>Découvrir l'expérience</GoldButton>
            </Link>
            <Link to="/configurateur" onClick={onClose}>
              <OutlineButton className="!border-ivory/60 !text-ivory hover:!border-primary-soft hover:!text-primary-soft">
                Composer la mienne
              </OutlineButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
