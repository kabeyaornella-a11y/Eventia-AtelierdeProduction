import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { OutlineButton } from "@/components/site/SiteLayout";
import { cloudinaryPoster } from "@/lib/cloudinary-models";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  video: string;
  videoLabel?: string;
  href: string;
  cta?: string;
};

/**
 * Bloc éditorial immersif. fond cacao, grain et halo doré conservés pour
 * l'atmosphère premium, mais le visuel central est désormais une véritable
 * animation Eventia (Cloudinary) présentée comme une pièce encadrée,
 * plutôt qu'un œil illustré.
 */
export function ThresholdShowcase({
  eyebrow = "La signature Eventia",
  title,
  intro,
  video,
  videoLabel,
  href,
  cta = "Découvrir cette collection",
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden bg-cacao text-ivory">
      {/* halo doré */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 15%, rgba(212,176,122,0.22) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(184,138,58,0.14) 0%, transparent 55%)",
        }}
      />
      {/* grain subtil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,_white_1px,_transparent_1px)] [background-size:3px_3px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28 grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-xl">
          <div className="eyebrow !text-primary-soft">{eyebrow}</div>
          <h3 className="font-display text-3xl md:text-5xl mt-4 leading-tight">{title}</h3>
          {intro && (
            <p className="font-serif-soft italic text-lg text-ivory/80 mt-5 leading-relaxed">
              {intro}
            </p>
          )}
          <div className="gold-rule mt-8" />
          <Link to={href} className="inline-block mt-8">
            <OutlineButton className="!border-ivory/40 !text-ivory hover:!border-primary-soft hover:!text-primary-soft">
              {cta}
            </OutlineButton>
          </Link>
        </div>

        {/* visuel encadré */}
        <div
          ref={frameRef}
          className={`relative transition-all duration-[1100ms] ease-out ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
          }`}
        >
          <div className="relative aspect-[4/5] md:aspect-[5/6] max-w-md mx-auto overflow-hidden shadow-gold border border-primary-soft/25">
            <video
              src={video}
              poster={cloudinaryPoster(video)}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cacao/40 via-transparent to-transparent" />
          </div>
          {/* repères dorés, style cartel de musée */}
          <span
            aria-hidden
            className="absolute -top-3 -left-3 size-8 border-t border-l border-primary-soft/60"
          />
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 size-8 border-b border-r border-primary-soft/60"
          />
          {videoLabel && (
            <div className="absolute bottom-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 px-3 py-1.5 bg-ivory/95 text-cacao text-[10px] tracking-[0.22em] uppercase">
              {videoLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
