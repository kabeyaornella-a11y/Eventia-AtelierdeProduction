import { ArrowUpRight } from "lucide-react";

type Props = {
  name: string;
  tagline: string;
  description?: string;
  image: string;
  href?: string;
  eyebrow?: string;
};

export function CollectionCardPremium({
  name,
  tagline,
  description,
  image,
  href = "#",
  eyebrow = "Collection",
}: Props) {
  return (
    <a
      href={href}
      className="group flex flex-col bg-ivory shadow-soft hover:shadow-gold transition-shadow duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-champagne/20 relative shrink-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={900}
          height={675}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cacao/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Panneau contenu */}
      <div className="flex-1 flex flex-col px-5 py-5 border-t border-primary/15">
        {/* ornement doré */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-primary/30" />
          <div className="size-[5px] rounded-full bg-primary/70 shrink-0" />
          <div className="h-px flex-1 bg-primary/30" />
        </div>

        <div className="eyebrow text-[10px] text-center">{eyebrow}</div>
        <div className="font-display text-2xl text-center mt-2 leading-tight tracking-tight">
          {name}
        </div>
        <div className="font-serif-soft italic text-xs text-muted-foreground text-center mt-2 line-clamp-2 min-h-[2.5em]">
          {tagline}
        </div>

        {description && (
          <p className="text-[11px] text-foreground/65 text-center mt-3 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-5 flex items-center justify-center gap-1.5">
          <span className="eyebrow text-[10px] text-primary">Découvrir</span>
          <ArrowUpRight className="size-3 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
