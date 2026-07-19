import type { ReactNode } from "react";

/**
 * Carte encadrée façon écrin : une illustration de cadre (PNG à centre
 * transparent) posée en overlay, le contenu vivant dans la zone transparente.
 * Sans `frameUrl`, retombe simplement sur le style de carte standard —
 * aucune invitation existante n'est affectée tant qu'aucun cadre n'est
 * configuré dans le Studio.
 */
export function FramedCard({
  frameUrl,
  children,
  className = "",
}: {
  frameUrl?: string;
  children: ReactNode;
  className?: string;
}) {
  if (!frameUrl) {
    return (
      <div className={`bg-ivory border border-primary/15 p-6 shadow-soft ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <img
        src={frameUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
      />
      <div className="relative m-[14%] text-center">{children}</div>
    </div>
  );
}
