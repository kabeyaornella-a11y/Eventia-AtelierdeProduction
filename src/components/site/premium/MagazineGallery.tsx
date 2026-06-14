import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Experience, Collection } from "@/lib/eventia-data";
import { findModelByName } from "@/lib/cloudinary-models";

type Item = {
  exp: Experience;
  universName?: string;
};

const RATIOS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/5]",
];
const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-12",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-7",
];

const INTERLUDES = [
  {
    eyebrow: "Intention",
    title: "Chaque expérience est composée à la main par notre studio.",
    note: "De la première esquisse au dernier cachet de cire.",
  },
  {
    eyebrow: "Détail",
    title: "Aucun modèle n'est dupliqué entre deux couples.",
    note: "Votre récit reste unique, vos invités le savent.",
  },
  {
    eyebrow: "Signature",
    title: "La lumière, la matière, le silence — tout est choisi.",
    note: "Une direction artistique qui se voit dans chaque image.",
  },
];

function LazyVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      muted
      loop
      playsInline
      autoPlay={visible}
      preload="none"
      className={className}
    />
  );
}

export function MagazineGallery({
  items,
  collections,
  showCollection = true,
}: {
  items: Experience[];
  collections?: Collection[];
  showCollection?: boolean;
}) {
  const tiles: Array<
    { kind: "exp"; data: Item } | { kind: "interlude"; data: (typeof INTERLUDES)[number] }
  > = [];
  items.forEach((exp, i) => {
    tiles.push({
      kind: "exp",
      data: { exp, universName: collections?.find((c) => c.slug === exp.univers)?.name },
    });
    if ((i + 1) % 6 === 0 && i < items.length - 1) {
      tiles.push({ kind: "interlude", data: INTERLUDES[Math.floor(i / 6) % INTERLUDES.length] });
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
      {tiles.map((tile, i) => {
        if (tile.kind === "interlude") {
          return (
            <div
              key={`int-${i}`}
              className="md:col-span-12 my-6 md:my-12 text-center max-w-3xl mx-auto px-4"
            >
              <div className="eyebrow text-primary mb-4">{tile.data.eyebrow}</div>
              <h3 className="font-display text-3xl md:text-4xl leading-tight text-foreground/90">
                "{tile.data.title}"
              </h3>
              <div className="gold-rule mx-auto mt-6" />
              <p className="font-serif-soft italic text-sm text-muted-foreground mt-4">
                {tile.data.note}
              </p>
            </div>
          );
        }
        const expIdx = tiles.slice(0, i).filter((t) => t.kind === "exp").length;
        const ratio = RATIOS[expIdx % RATIOS.length];
        const span = SPANS[expIdx % SPANS.length];
        const { exp, universName } = tile.data;
        const model = findModelByName(exp.name);
        return (
          <Link
            key={exp.slug}
            to="/experiences/$slug"
            params={{ slug: exp.slug }}
            className={`group block ${span}`}
          >
            <div className={`relative ${ratio} overflow-hidden bg-cacao/5`}>
              {model ? (
                <LazyVideo
                  src={model.video}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <img
                  src={exp.image}
                  alt={exp.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-ivory">
                {showCollection && universName && (
                  <div className="eyebrow !text-primary-soft text-[10px] mb-2">{universName}</div>
                )}
                <h3 className="font-display text-2xl md:text-3xl leading-tight">{exp.name}</h3>
                <div className="font-serif-soft italic text-sm text-ivory/85 mt-2 line-clamp-2 max-w-md">
                  {exp.story}
                </div>
                <div className="flex items-center justify-between mt-4 text-[10px] tracking-[0.22em] uppercase text-ivory/70">
                  <span>{exp.immersion}</span>
                  <span>à partir de {exp.priceFrom} €</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
