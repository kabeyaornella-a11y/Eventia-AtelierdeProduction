import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_ITEMS = [
  "Haute couture digitale",
  "Direction artistique sur mesure",
  "Save The Date signature",
  "Galerie Live des invités",
  "Livre Audio des proches",
  "Plan de table interactif",
  "Confirmations en temps réel",
  "Accompagnement dédié",
];

type Props = { items?: string[]; speedSeconds?: number };

export function Marquee({ items = DEFAULT_ITEMS, speedSeconds }: Props) {
  const [duration, setDuration] = useState(speedSeconds ?? 38);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);

    if (speedSeconds) return () => mq.removeEventListener?.("change", onChange);

    const compute = () => {
      const w = window.innerWidth;
      // vitesse fluide ajustée au viewport
      if (w < 480) setDuration(20);
      else if (w < 768) setDuration(26);
      else if (w < 1280) setDuration(32);
      else setDuration(38);
    };
    compute();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.("change", onChange);
      cancelAnimationFrame(raf);
    };
  }, [speedSeconds]);

  // Sur mobile, on réduit le nombre d'items dupliqués pour soulager le rendu
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-primary/15 bg-gradient-to-r from-ivory via-champagne/30 to-ivory">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div
        className="flex gap-8 sm:gap-12 md:gap-16 py-4 md:py-6 whitespace-nowrap will-change-transform"
        style={{
          animation: reduced ? "none" : `marquee-x ${duration}s linear infinite`,
          transform: reduced ? "translateX(0)" : undefined,
          backfaceVisibility: "hidden",
        }}
      >
        {loop.map((label, i) => (
          <div key={i} className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Sparkles className="size-3 sm:size-3.5 text-primary animate-shimmer-gold" />
            <span className="font-serif-soft italic text-[14px] sm:text-[15px] md:text-[17px] tracking-wide text-foreground/80">
              {label}
            </span>
            <span className="inline-block w-8 sm:w-10 h-px bg-gradient-to-r from-primary/60 to-transparent" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
