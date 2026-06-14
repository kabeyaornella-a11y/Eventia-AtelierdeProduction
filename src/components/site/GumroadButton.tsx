import { ExternalLink } from "lucide-react";
import { buildGumroadCheckout } from "@/lib/gumroad-links";

interface Props {
  productKey: string;
  email?: string;
  ref?: string;
  children?: React.ReactNode;
  variant?: "gold" | "outline";
  className?: string;
}

export function GumroadButton({
  productKey,
  email,
  ref,
  children = "Acheter",
  variant = "gold",
  className = "",
}: Props) {
  const href = buildGumroadCheckout(productKey, { email, ref });
  const base =
    variant === "gold"
      ? "bg-primary text-ivory hover:bg-cacao shadow-gold"
      : "border border-primary/40 text-primary hover:bg-primary/5";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs tracking-[0.22em] uppercase transition-colors ${base} ${className}`}
    >
      {children} <ExternalLink className="size-3.5" />
    </a>
  );
}
