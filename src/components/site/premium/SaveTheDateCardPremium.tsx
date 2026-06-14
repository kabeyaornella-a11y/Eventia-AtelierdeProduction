import { CalendarDays, MapPin, Palette } from "lucide-react";

type Props = {
  name: string;
  tagline?: string;
  price: number;
  image: string;
  href?: string;
  badge?: string;
  date?: string;
  lieu?: string;
  theme?: string;
  empty?: boolean;
};

export function SaveTheDateCardPremium({
  name,
  tagline,
  price,
  image,
  href = "#",
  badge,
  date,
  lieu,
  theme,
  empty = false,
}: Props) {
  if (empty) {
    return (
      <div className="relative flex flex-col bg-ivory border border-primary/20 shadow-soft">
        <div className="aspect-[3/4] grid place-items-center bg-gradient-to-br from-champagne/20 to-ivory">
          <div className="text-center px-6 space-y-3">
            <div className="flex items-center gap-2 justify-center">
              <div className="h-px w-8 bg-primary/30" />
              <div className="size-[5px] rounded-full bg-primary/50" />
              <div className="h-px w-8 bg-primary/30" />
            </div>
            <div className="eyebrow text-primary text-[10px]">Bientôt</div>
            <div className="font-display text-xl leading-tight text-foreground/70">
              Nouveau format en préparation
            </div>
            <div className="font-serif-soft italic text-xs text-muted-foreground">
              Notre direction artistique imagine la prochaine pièce.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      className="group relative flex flex-col bg-ivory border border-primary/20 shadow-soft hover:shadow-gold hover:border-primary/40 transition-all duration-500 overflow-hidden"
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-primary/90 text-ivory text-[9px] tracking-[0.22em] uppercase">
          {badge}
        </div>
      )}

      {/* Image portrait */}
      <div className="relative aspect-[3/4] overflow-hidden shrink-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={600}
          height={800}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/60 via-cacao/10 to-transparent" />

        {/* Watermark doré en bas de l'image */}
        <div className="absolute bottom-0 inset-x-0 p-4 text-center">
          <div className="font-script text-2xl text-ivory/90 leading-tight drop-shadow">{name}</div>
        </div>
      </div>

      {/* Panneau contenu */}
      <div className="flex flex-col px-5 py-5">
        {/* Ornement doré */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-primary/30" />
          <div className="size-[5px] rounded-full bg-primary/70 shrink-0" />
          <div className="h-px flex-1 bg-primary/30" />
        </div>

        <div className="eyebrow text-[9px] text-center text-primary/80">Save The Date</div>
        <div className="font-display text-lg text-center mt-1 leading-tight">{name}</div>
        {tagline && (
          <div className="font-serif-soft italic text-[11px] text-muted-foreground text-center mt-1.5 line-clamp-2">
            {tagline}
          </div>
        )}

        {/* Métadonnées invitation */}
        {(date || lieu || theme) && (
          <ul className="mt-4 space-y-1.5">
            {date && (
              <li className="flex items-center gap-2 text-[11px]">
                <CalendarDays className="size-3 text-primary shrink-0" />
                <span className="font-serif-soft italic text-foreground/75">{date}</span>
              </li>
            )}
            {lieu && (
              <li className="flex items-center gap-2 text-[11px]">
                <MapPin className="size-3 text-primary shrink-0" />
                <span className="font-serif-soft italic text-foreground/75">{lieu}</span>
              </li>
            )}
            {theme && (
              <li className="flex items-center gap-2 text-[11px]">
                <Palette className="size-3 text-primary shrink-0" />
                <span className="font-serif-soft italic text-foreground/75">{theme}</span>
              </li>
            )}
          </ul>
        )}

        {/* Prix */}
        <div className="mt-4 pt-4 border-t border-primary/15 flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="eyebrow text-[10px] text-primary">dès {price} €</span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>
      </div>
    </a>
  );
}
