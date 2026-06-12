import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
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
    <div className="relative overflow-hidden bg-gradient-to-br from-ivory via-background to-accent/40 border border-primary/20 shadow-gold">
      <div className="grid md:grid-cols-[1.05fr_1fr] gap-0">
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
          <div className="absolute inset-0 bg-gradient-to-r from-cacao/30 to-transparent md:from-transparent md:to-ivory/30" />
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-ivory/95 backdrop-blur text-primary text-[10px] tracking-[0.22em] uppercase flex items-center gap-2">
            <Sparkles className="size-3" />
            {edition}
          </div>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="eyebrow">Le modèle du mois</div>
          <h3 className="font-display text-3xl md:text-4xl mt-3 leading-tight">{title}</h3>
          <p className="font-serif-soft italic text-base text-muted-foreground mt-4 leading-relaxed">
            {story}
          </p>
          {typeof remaining === "number" && (
            <div className="mt-6 text-sm text-foreground/80">
              <span className="font-display text-2xl text-primary">{remaining}</span>{" "}
              <span className="text-xs tracking-wide uppercase">pièces restantes</span>
            </div>
          )}
          {cd && (
            <div className="mt-6 grid grid-cols-4 gap-2 max-w-xs">
              {[
                { v: cd.days, l: "jours" },
                { v: cd.hours, l: "heures" },
                { v: cd.minutes, l: "min" },
                { v: cd.seconds, l: "sec" },
              ].map((u) => (
                <div key={u.l} className="text-center bg-ivory border border-border/60 py-3">
                  <div className="font-display text-2xl text-primary leading-none">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          )}
          <a
            href={href}
            className="mt-8 inline-flex items-center gap-3 self-start px-7 py-3 bg-primary text-ivory text-xs tracking-[0.22em] uppercase hover:bg-gold-deep transition-colors"
          >
            {cta}
          </a>
        </div>
      </div>
    </div>
  );
}
