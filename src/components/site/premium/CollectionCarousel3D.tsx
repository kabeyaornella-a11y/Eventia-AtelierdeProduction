import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Collection } from "@/lib/eventia-data";

type CardState = "active" | "prev" | "next" | "hidden";

function getState(i: number, active: number, n: number): CardState {
  if (i === active) return "active";
  if (i === (active + 1) % n) return "next";
  if (i === (active + n - 1) % n) return "prev";
  return "hidden";
}

export function CollectionCarousel3D({ collections }: { collections: Collection[] }) {
  const [active, setActive] = useState(0);
  const n = collections.length;

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + n) % n);

  return (
    <div>
      {/* Zone 3D */}
      <div className="c3-wrap">
        {collections.map((c, i) => {
          const state = getState(i, active, n);
          const isActive = state === "active";
          return (
            <div
              key={c.slug}
              className="c3-item"
              data-state={state}
              onClick={() => !isActive && setActive(i)}
            >
              <Link
                to={`/${c.slug}`}
                className="c3-card"
                onClick={(e) => !isActive && e.preventDefault()}
                tabIndex={isActive ? 0 : -1}
              >
                {/* Image */}
                <img
                  className="c3-photo"
                  src={c.image}
                  alt={c.name}
                  loading={i === 0 ? "eager" : "lazy"}
                  width={640}
                  height={480}
                />

                {/* Corps */}
                <div className="px-[18px] py-4 flex flex-col text-left">
                  {/* Ornement */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="size-[5px] rounded-full bg-primary/60 shrink-0" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  </div>

                  <span className="eyebrow text-[9px] text-primary mb-1.5">Collection</span>
                  <h3 className="font-display text-[clamp(20px,4vw,26px)] font-light text-cacao leading-[1.1] mb-1.5">
                    {c.name}
                  </h3>
                  <p className="font-serif-soft italic text-[clamp(13px,2.8vw,15px)] leading-[1.55] text-foreground/70 mb-2.5">
                    {c.tagline}
                  </p>
                  {c.description && (
                    <p className="text-[11px] text-foreground/55 leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                  )}

                  {/* CTA visible uniquement sur la carte active */}
                  <div className="mt-3 pt-3 border-t border-primary/15 flex items-center gap-1.5">
                    <span className="eyebrow text-[9px] text-primary">Découvrir</span>
                    <span className="text-primary text-xs">→</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="c3-nav">
        <button type="button" className="c3-arrow" aria-label="Précédent" onClick={() => go(-1)}>
          ‹
        </button>
        {collections.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`c3-dot${i === active ? " is-active" : ""}`}
            aria-label={c.name}
            onClick={() => setActive(i)}
          />
        ))}
        <button type="button" className="c3-arrow" aria-label="Suivant" onClick={() => go(1)}>
          ›
        </button>
      </div>
    </div>
  );
}
