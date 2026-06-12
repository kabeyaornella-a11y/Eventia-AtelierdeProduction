import { ArrowUpRight } from "lucide-react";

type Props = {
  name: string;
  tagline: string;
  image: string;
  href?: string;
  eyebrow?: string;
};

export function CollectionCardPremium({
  name,
  tagline,
  image,
  href = "#",
  eyebrow = "Collection",
}: Props) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden shadow-soft hover:shadow-gold transition-shadow duration-500"
    >
      <div className="aspect-[3/4] overflow-hidden bg-champagne/20">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={900}
          height={1200}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-cacao/90 via-cacao/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-ivory">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="eyebrow !text-ivory/75 text-[10px]">{eyebrow}</div>
            <div className="font-display text-2xl md:text-3xl mt-1 leading-tight truncate">
              {name}
            </div>
            <div className="font-serif-soft italic text-sm opacity-90 mt-1 line-clamp-1">
              {tagline}
            </div>
          </div>
          <div className="size-10 shrink-0 rounded-full bg-ivory/15 backdrop-blur grid place-items-center border border-ivory/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:border-primary">
            <ArrowUpRight className="size-4 text-ivory" />
          </div>
        </div>
        <div className="mt-4 h-px w-12 bg-primary-soft transition-all duration-500 group-hover:w-24" />
      </div>
    </a>
  );
}
