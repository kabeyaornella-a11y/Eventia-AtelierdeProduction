import { useEffect, useRef } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

/**
 * Bloc immersif avec un œil qui suit le curseur — version optimisée :
 * - rAF throttle (1 update par frame max)
 * - transform direct sur la ref (pas de re-render React)
 * - écoute seulement quand le bloc est visible (IntersectionObserver)
 * - désactivé sur prefers-reduced-motion
 */
export function EyeInteractionBlock({
  eyebrow = "Des expériences qui nous ressemblent",
  title,
  intro,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pupil = pupilRef.current;
    const shimmer = shimmerRef.current;
    if (!wrap || !pupil) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let visible = false;
    let raf = 0;
    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    const tick = () => {
      // easing doux pour un rendu premium
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      pupil.style.transform = `translate3d(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px), 0)`;
      if (shimmer) {
        shimmer.style.transform = `translate3d(${currentX * 0.6}px, ${currentY * 0.6}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      const rect = wrap.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      const max = 16;
      targetX = Math.max(-max, Math.min(max, dx * 50));
      targetY = Math.max(-max, Math.min(max, dy * 50));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.15 },
    );
    io.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden bg-cacao text-ivory px-6 md:px-12 py-24 md:py-32"
    >
      {/* halo doré qui suit légèrement le regard */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, var(--color-primary-soft) 0%, transparent 55%)",
        }}
      />
      {/* grain subtil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,_white_1px,_transparent_1px)] [background-size:3px_3px]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="mx-auto mb-10 relative w-32 h-32 md:w-40 md:h-40 will-change-transform">
          <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full drop-shadow-[0_8px_24px_rgba(184,138,58,0.3)]">
            <defs>
              <radialGradient id="eye-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-ivory)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--color-champagne)" stopOpacity="0.9" />
              </radialGradient>
            </defs>
            <ellipse cx="80" cy="80" rx="76" ry="46" fill="url(#eye-gradient)" />
            <ellipse cx="80" cy="80" rx="76" ry="46" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" />
          </svg>
          <div
            ref={pupilRef}
            className="absolute top-1/2 left-1/2 size-12 md:size-14 rounded-full bg-cacao grid place-items-center shadow-[0_4px_12px_rgba(0,0,0,0.4)] will-change-transform"
            style={{ transform: "translate3d(-50%, -50%, 0)" }}
          >
            <div className="size-3 rounded-full bg-primary-soft animate-shimmer-gold" />
          </div>
        </div>
        <div className="eyebrow !text-primary-soft">{eyebrow}</div>
        <h3 className="font-display text-3xl md:text-5xl mt-4 leading-tight">{title}</h3>
        {intro && (
          <p className="font-serif-soft italic text-lg text-ivory/80 mt-5 max-w-xl mx-auto leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
