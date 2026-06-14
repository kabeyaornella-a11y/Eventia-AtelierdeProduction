import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-ivory/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="font-display text-2xl">Eventia</div>
          <div className="eyebrow">Signature</div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mt-4">
            Maison d'expériences digitales pour les événements heureux de la vie.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Univers</div>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>
              <Link to="/ecrins" className="hover:text-primary">
                Les Écrins
              </Link>
            </li>
            <li>
              <Link to="/portes" className="hover:text-primary">
                Les Seuils
              </Link>
            </li>
            <li>
              <Link to="/voiles" className="hover:text-primary">
                Les Voiles
              </Link>
            </li>
            <li>
              <Link to="/union" className="hover:text-primary">
                L'Union
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Maison</div>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>
              <Link to="/experiences" className="hover:text-primary">
                Expériences
              </Link>
            </li>
            <li>
              <Link to="/tarifs" className="hover:text-primary">
                Tarifs
              </Link>
            </li>
            <li>
              <Link to="/offres" className="hover:text-primary">
                Offres
              </Link>
            </li>
            <li>
              <Link to="/sur-mesure" className="hover:text-primary">
                Sur mesure
              </Link>
            </li>
            <li>
              <Link to="/atelier" className="hover:text-primary">
                Atelier
              </Link>
            </li>
            <li>
              <Link to="/entreprises" className="hover:text-primary">
                Entreprises
              </Link>
            </li>
            <li>
              <Link to="/partenaires" className="hover:text-primary">
                Partenaires
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>bonjour@eventiasignature.com</li>
            <li>+33 (0)1 00 00 00 00</li>
            <li>Paris, France</li>
            <li className="pt-2">
              <Link to="/faq" className="hover:text-primary">
                Questions fréquentes
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Nous écrire
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Eventia Signature. Maison d'expériences</div>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-primary">
              Mentions légales
            </Link>
            <Link to="/cgv" className="hover:text-primary">
              CGV
            </Link>
            <Link to="/confidentialite" className="hover:text-primary">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
