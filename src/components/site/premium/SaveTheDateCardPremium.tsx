import { CalendarDays, MapPin, Palette } from "lucide-react";

type Props = {
  name: string;
  tagline?: string;
  price: number;
  image: string;
  href?: string;
  badge?: string;
  /** Mock metadata (Vague 3) */
  date?: string;
  lieu?: string;
  theme?: string;
  /** Empty state when no preview is available */
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
      <div className="relative flex flex-col bg-ivory/60 border border-dashed border-primary/30 shadow-soft">
        <div className="aspect-square grid place-items-center bg-gradient-to-br from-champagne/20 to-ivory">
          <div className="text-center px-6">
            <div className="eyebrow text-primary text-[10px]">Bientôt</div>
            <div className="font-display text-xl mt-2 leading-tight text-foreground/70">
              Nouveau format en préparation
            </div>
          </div>
        </div>
        <div className="p-5 text-center border-t border-border/40">
          <div className="font-serif-soft italic text-sm text-muted-foreground">
            Notre direction artistique imagine la prochaine pièce.
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      className="group relative flex flex-col bg-ivory shadow-soft hover:shadow-gold transition-shadow duration-500 overflow-hidden"
    >
      {badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-cacao/85 text-ivory text-[10px] tracking-[0.22em] uppercase">
          {badge}
        </div>
      )}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/40 via-transparent to-transparent opacity-90" />
      </div>
      <div className="flex-1 p-5 text-center border-t border-border/40 flex flex-col">
        <div className="font-display text-xl leading-tight">{name}</div>
        {tagline && (
          <div className="font-serif-soft italic text-xs text-muted-foreground mt-1.5 line-clamp-2 min-h-[2.4em]">
            {tagline}
          </div>
        )}

        {(date || lieu || theme) && (
          <ul className="mt-3 space-y-1.5 text-[11px] text-foreground/75 text-left mx-auto">
            {date && (
              <li className="flex items-center gap-2">
                <CalendarDays className="size-3 text-primary shrink-0" />
                <span className="font-serif-soft italic">{date}</span>
              </li>
            )}
            {lieu && (
              <li className="flex items-center gap-2">
                <MapPin className="size-3 text-primary shrink-0" />
                <span className="font-serif-soft italic">{lieu}</span>
              </li>
            )}
            {theme && (
              <li className="flex items-center gap-2">
                <Palette className="size-3 text-primary shrink-0" />
                <span className="font-serif-soft italic">{theme}</span>
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-4 inline-flex items-center gap-2 justify-center">
          <span className="gold-rule" />
          <span className="eyebrow text-primary text-[10px]">dès {price} €</span>
          <span className="gold-rule" />
        </div>
      </div>
    </a>
  );
}
