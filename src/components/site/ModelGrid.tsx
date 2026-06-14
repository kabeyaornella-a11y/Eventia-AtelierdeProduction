import { useEffect, useRef, useState } from "react";
import type { CloudinaryModel } from "@/lib/cloudinary-models";
import { cloudinaryPoster } from "@/lib/cloudinary-models";

function ModelVideoCard({ model }: { model: CloudinaryModel }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="group relative overflow-hidden bg-cacao/5 border border-primary/10 aspect-[3/4]">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-cacao/10" />}
      {inView && (
        <video
          src={model.video}
          poster={cloudinaryPoster(model.video)}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-cacao/70 via-transparent to-transparent" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-ivory">
        <div className="text-[10px] tracking-[0.28em] uppercase opacity-80">Modèle signature</div>
        <div className="font-display text-xl mt-1">{model.name}</div>
      </figcaption>
    </figure>
  );
}

export function ModelGrid({ models, title, eyebrow }: { models: CloudinaryModel[]; title: string; eyebrow?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <div className="text-center mb-12">
        {eyebrow && <div className="eyebrow text-primary">{eyebrow}</div>}
        <h2 className="font-display text-4xl md:text-5xl mt-2">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {models.map((m) => <ModelVideoCard key={m.slug} model={m} />)}
      </div>
    </section>
  );
}
