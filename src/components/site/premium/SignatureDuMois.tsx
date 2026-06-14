import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cloudinaryPoster } from "@/lib/cloudinary-models";

type Props = {
  title: string;
  story: string;
  image?: string;
  video?: string;
  edition?: string;
  remaining?: number;
  endsAt?: Date;
  href?: string;
  cta?: string;
};

function useCountdown(target?: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (!target || now === null) return null;
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function SignatureDuMois({
  title,
  story,
  image,
  video,
  edition = "À l'honneur",
  remaining,
  endsAt,
  href = "#",
  cta = "Découvrir cette expérience",
}: Props) {
  const cd = useCountdown(endsAt);

  return (
    <div className="relative overflow-hidden border border-primary/20 shadow-gold bg-ivory">
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-0">
        {/* Visuel */}
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          {video ? (
            <video
              src={video}
              poster={cloudinaryPoster(video)}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ivory/20 md:to-ivory/40" />

          {/* Badge édition */}
          <div className="absolute top-5 left-5 px-3 py-1.5 bg-ivory/95 backdrop-blur-sm border border-primary/20">
            <span className="eyebrow text-primary text-[9px]">{edition}</span>
          </div>

          {/* Ornement script superposé */}
          <div className="absolute bottom-5 left-5 right-5 text-center pointer-events-none">
            <div className="font-script text-3xl text-ivory/70 drop-shadow leading-none">
              {title}
            </div>
          </div>
        </div>

        {/* Panneau texte */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-ivory">
          {/* Ornement supérieur */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-primary/25" />
            <div className="size-[5px] rounded-full bg-primary/60" />
            <div className="h-px flex-1 bg-primary/25" />
          </div>

          <div className="eyebrow text-[10px] text-center mb-3">Le modèle du mois</div>
          <h3 className="font-display text-3xl md:text-4xl leading-tight text-center">{title}</h3>

          <p className="font-serif-soft italic text-sm text-muted-foreground mt-5 leading-relaxed text-center">
            {story}
          </p>

          {typeof remaining === "number" && (
            <div className="mt-6 text-center">
              <span className="font-display text-3xl text-primary">{remaining}</span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                pièces restantes
              </span>
            </div>
          )}

          {cd && (
            <div className="mt-6 grid grid-cols-4 gap-2">
              {[
                { v: cd.days, l: "jours" },
                { v: cd.hours, l: "heures" },
                { v: cd.minutes, l: "min" },
                { v: cd.seconds, l: "sec" },
              ].map((u) => (
                <div
                  key={u.l}
                  className="text-center border border-primary/20 bg-champagne/20 py-3"
                >
                  <div className="font-display text-2xl text-primary leading-none">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <a
              href={href}
              className="group/cta inline-flex items-center gap-3 px-7 py-3 bg-primary text-ivory text-[11px] tracking-[0.22em] uppercase hover:bg-gold-deep transition-colors"
            >
              {cta}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
