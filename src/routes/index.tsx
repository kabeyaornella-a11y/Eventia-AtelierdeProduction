import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CreditCard, Infinity as InfinityIcon, BellRing, RefreshCw, Wallet, ShieldCheck,
  Eye, Heart, Sparkles, Gift, ArrowRight,
} from "lucide-react";
import { SiteLayout, Section, SectionHead, GoldButton, OutlineButton } from "@/components/site/SiteLayout";
import heroImg from "@/assets/hero-couple-voiles-v2.jpg";
import atelierImg from "@/assets/atelier-papeterie.jpg";
import { collections, experiences, saveTheDateFormats, offers, reassurance } from "@/lib/eventia-data";
import { loadDraft } from "@/lib/configurateur-store";
import {
  Marquee,
  CollectionCardPremium,
  SaveTheDateCardPremium,
  SignatureDuMois,
  ExperienceLightbox,
  EyeInteractionBlock,
  type LightboxExperience,
} from "@/components/site/premium";

// Vague 4. Signature du mois (mock : édition se termine dans 30 jours)
const SIGNATURE_ENDS_AT = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eventia Signature — Maison d'expériences digitales" },
      { name: "description", content: "Des expériences digitales élégantes pour annoncer, accueillir et marquer les esprits. Mariages, naissances, événements heureux." },
      { property: "og:title", content: "Eventia Signature — Maison d'expériences digitales" },
      { property: "og:description", content: "Des expériences digitales élégantes pour annoncer, accueillir et marquer les esprits." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://www.eventiasignature.fr/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

const ROTATING_WORDS = ["se révèle", "s'ouvre", "se partage", "se vit", "se transmet"];

// Mock metadata exemples pour SaveTheDate (modèles officiels de la collection)
const STD_MOCK: Record<string, { date: string; lieu: string; theme: string }> = {
  diy: { date: "21 juin 2026", lieu: "Domaine de Chantilly", theme: "Pétales de Roses" },
  personnalise: { date: "12 septembre 2026", lieu: "Château de Vaux", theme: "L'Écrin" },
  "sur-mesure": { date: "Date sur devis", lieu: "Lieu sur mesure", theme: "Direction artistique dédiée" },
};

function HomePage() {
  const [wordIdx, setWordIdx] = useState(0);
  const [draftStep, setDraftStep] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxExperience | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    const d = loadDraft();
    if (d && (d.eventType || d.univers || d.expSlug)) setDraftStep(d.step);
    return () => clearInterval(id);
  }, []);

  // Parallax shimmer doux et performant (rAF + scroll passive)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        const sh = shimmerRef.current;
        const hr = heroRef.current;
        if (sh && hr) {
          const rect = hr.getBoundingClientRect();
          // n'agit que tant que le hero est visible
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const y = Math.max(-200, Math.min(0, rect.top * 0.25));
            sh.style.transform = `translate3d(0, ${y}px, 0)`;
          }
        }
        pending = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <SiteLayout>
      {/* HERO. fullscreen mobile, immersif */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* background image fullscreen mobile + dégradés plus profonds */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src={heroImg}
            alt=""
            aria-hidden
            width={1200}
            height={1600}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-cacao/55 via-cacao/25 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Shimmer parallax doré (desktop + mobile) */}
        <div
          ref={shimmerRef}
          aria-hidden
          className="absolute inset-x-0 -top-32 h-[120%] pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(212,176,122,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(184,138,58,0.12) 0%, transparent 55%)",
          }}
        />

        {/* particles */}
        <div className="particles hidden md:block">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 4.3) % 100}%`,
                animationDuration: `${10 + (i % 7) * 2}s`,
                animationDelay: `${(i % 9) * -1.5}s`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-20 lg:pt-12 lg:pb-24 min-h-[88vh] lg:min-h-0 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="space-y-7 animate-fade-up text-ivory lg:text-foreground">
            <div className="eyebrow !text-primary-soft lg:!text-primary">Haute couture digitale</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Une annonce qui<br />
              <span className="relative inline-block min-h-[1.1em]">
                <span key={wordIdx} className="italic text-primary-soft lg:text-primary animate-word-in inline-block">
                  {ROTATING_WORDS[wordIdx]}
                </span>
              </span>
            </h1>
            <p className="font-serif-soft text-lg md:text-xl text-ivory/90 lg:text-muted-foreground max-w-xl leading-relaxed">
              Des expériences digitales élégantes pour annoncer, accueillir et marquer les esprits.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/experiences"><GoldButton>Découvrir les univers</GoldButton></Link>
              <Link to="/configurateur">
                <OutlineButton className="!border-ivory/60 !text-ivory hover:!border-primary-soft hover:!text-primary-soft lg:!border-foreground/40 lg:!text-foreground lg:hover:!border-primary lg:hover:!text-primary">
                  Composer la mienne
                </OutlineButton>
              </Link>
              <Link to="/comparer" className="text-xs tracking-[0.22em] uppercase self-center text-ivory/90 lg:text-foreground/70 hover:text-primary">
                Comparer
              </Link>
            </div>

            {draftStep !== null && (
              <Link to="/configurateur" className="mt-4 inline-flex items-center gap-3 bg-ivory/95 lg:bg-ivory border border-primary/30 px-5 py-3 shadow-soft group">
                <Sparkles className="size-4 text-primary" />
                <div className="text-left">
                  <div className="eyebrow text-primary">Reprendre ma composition</div>
                  <div className="text-xs text-muted-foreground">Étape {draftStep + 1} sur 8. sauvegardée sur cet appareil</div>
                </div>
                <ArrowRight className="size-4 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* desktop visual + cartes flottantes */}
          <div className="hidden lg:block relative">
            <div className="relative overflow-hidden shadow-soft">
              <img
                src={heroImg}
                alt="Couple élégant marchant vers une ouverture de voiles monumentale, particules dorées"
                width={1600}
                height={1280}
                fetchPriority="high"
                decoding="async"
                className="w-full h-[620px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-cacao/30 to-transparent" />
            </div>
            <div className="absolute -left-10 top-10 bg-ivory shadow-soft px-4 py-3 w-44 animate-float-slow" style={{ ['--rot' as never]: '-4deg' }}>
              <div className="eyebrow text-[10px]">Save The Date</div>
              <div className="font-serif-soft italic text-sm mt-1">Un teaser sur mesure</div>
            </div>
            <div className="absolute -right-6 top-32 bg-ivory shadow-soft px-4 py-3 w-44 animate-float-slow" style={{ ['--rot' as never]: '3deg', animationDelay: '-2s' }}>
              <div className="eyebrow text-[10px]">Les Seuils</div>
              <div className="font-serif-soft italic text-sm mt-1">Un passage qui s'ouvre</div>
            </div>
            <div className="absolute -left-4 bottom-20 bg-ivory shadow-soft px-4 py-3 w-44 animate-float-slow" style={{ ['--rot' as never]: '2deg', animationDelay: '-4s' }}>
              <div className="eyebrow text-[10px]">Les Voiles</div>
              <div className="font-serif-soft italic text-sm mt-1">Une lumière qui apparaît</div>
            </div>
            <div className="absolute -right-10 bottom-6 bg-ivory shadow-soft px-4 py-3 w-44 animate-float-slow" style={{ ['--rot' as never]: '-3deg', animationDelay: '-1s' }}>
              <div className="eyebrow text-[10px]">L'Union</div>
              <div className="font-serif-soft italic text-sm mt-1">Deux histoires partagées</div>
            </div>
          </div>
        </div>

        {/* reassurance strip */}
        <div className="relative border-y border-border/60 bg-ivory/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 grid grid-cols-2 md:grid-cols-6 gap-y-4 gap-x-6">
            {[
              { icon: CreditCard, label: reassurance[0] },
              { icon: ShieldCheck, label: reassurance[1] },
              { icon: InfinityIcon, label: reassurance[2] },
              { icon: BellRing, label: reassurance[3] },
              { icon: RefreshCw, label: reassurance[4] },
              { icon: Wallet, label: reassurance[5] },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-xs text-foreground/80">
                <Icon className="size-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE. bandeau défilant signature */}
      <Marquee />

      {/* COLLECTIONS. Vague 2 : cards premium */}
      <Section>
        <SectionHead
          eyebrow="Nos univers"
          title="Quatre univers pour révéler votre histoire."
          intro="Chaque univers est une direction artistique complète. atmosphère, lumière, typographies, musique."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {collections.map((c) => (
            <CollectionCardPremium
              key={c.slug}
              name={c.name}
              tagline={c.tagline}
              image={c.image}
              href={`/${c.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* EXPÉRIENCES. visuel œil interactif demandé */}
      <EyeInteractionBlock
        eyebrow="La signature Eventia"
        title="Vos invités ne reçoivent pas une invitation. Ils entrent dans votre univers."
        intro="Un regard, une lumière, un seuil à franchir. Chaque expérience est pensée comme une première émotion avant le jour J."
      />

      {/* SIGNATURE DU MOIS. Vague 4 : Eventia Atelier */}
      <Section>
        <SignatureDuMois
          title="Coffret Aube Céleste. Édition d'Atelier"
          story="Une pièce signée Eventia Atelier : papier coton, dorure à chaud, cachet de cire monogrammé. Pensée pour accompagner vos Save The Date les plus précieux."
          image={atelierImg}
          edition="Édition limitée · Juin 2026"
          remaining={28}
          endsAt={SIGNATURE_ENDS_AT}
          href="/atelier"
        />
      </Section>

      {/* SAVE THE DATE. Vague 2 : cards premium prêtes pour mock */}
      <div className="bg-gradient-to-b from-ivory/40 via-background to-ivory/40 border-y border-border/60">
        <Section className="!py-24">
          <SectionHead
            eyebrow="Save The Date"
            title="Annoncer avant de révéler."
            intro="Une première émotion à partager avant l'invitation complète."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto">
            {saveTheDateFormats.map((f) => {
              const mock = STD_MOCK[f.slug];
              return (
                <SaveTheDateCardPremium
                  key={f.slug}
                  name={f.name.replace("Save The Date ", "")}
                  tagline={f.tagline}
                  price={f.price}
                  image={f.image}
                  href={`/save-the-date/${f.slug}`}
                  badge={f.slug === "personnalise" ? "La plus choisie" : f.slug === "sur-mesure" ? "Signature" : undefined}
                  date={mock?.date}
                  lieu={mock?.lieu}
                  theme={mock?.theme}
                />
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/save-the-date"><OutlineButton>Découvrir l'édition</OutlineButton></Link>
          </div>
        </Section>
      </div>


      {/* EXPÉRIENCES */}
      <Section>
        <SectionHead
          eyebrow="Nos expériences"
          title="Des expériences qui ne se regardent pas, elles se vivent."
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {experiences.slice(0, 6).map((e) => (
            <button
              type="button"
              key={e.slug}
              onClick={() =>
                setLightbox({
                  slug: e.slug,
                  name: e.name,
                  story: e.story,
                  image: e.image,
                  univers: collections.find((c) => c.slug === e.univers)?.name,
                  priceFrom: e.priceFrom,
                })
              }
              className="group block text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden shadow-soft">
                <img src={e.image} alt={e.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-cacao/85 via-cacao/30 to-transparent text-ivory">
                  <div className="font-display text-lg">{e.name}</div>
                  <div className="text-[11px] eyebrow !text-primary-soft mt-1">{collections.find((c) => c.slug === e.univers)?.name}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-primary-soft opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="size-3" /> Voir l'expérience
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/experiences"><GoldButton>Toutes les expériences</GoldButton></Link>
        </div>
      </Section>

      {/* PILIERS */}
      <div className="bg-ivory/60 border-y border-border/60">
        <Section className="!py-24">
          <SectionHead eyebrow="Notre signature" title="Pourquoi Eventia Signature est différente." />
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { num: "I", title: "Émotion", text: "Chaque détail raconte une émotion unique." },
              { num: "II", title: "Design", text: "Une direction artistique élégante et raffinée." },
              { num: "III", title: "Fluidité", text: "Une plateforme intuitive pour vos invités, sans stress." },
              { num: "IV", title: "Accompagnement", text: "Notre équipe vous accompagne à chaque étape." },
            ].map((p) => (
              <div key={p.num} className="space-y-3">
                <div className="font-display text-5xl text-primary leading-none">{p.num}</div>
                <div className="font-display text-xl">{p.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* OFFRES */}
      <Section>
        <SectionHead eyebrow="Nos offres" title="Choisissez le niveau d'expérience qui vous ressemble." />
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div
              key={o.slug}
              className={`relative p-8 border ${o.recommended ? "border-primary bg-ivory shadow-gold scale-[1.02]" : "border-border bg-ivory shadow-soft"}`}
            >
              {o.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-ivory text-[10px] tracking-[0.22em] uppercase">
                  Recommandée
                </div>
              )}
              <div className="font-display text-2xl">{o.name}</div>
              <div className="font-serif-soft italic text-sm text-muted-foreground mt-1">{o.tagline}</div>
              <div className="mt-6 font-display text-5xl text-primary">{o.price} €</div>
              <ul className="mt-7 space-y-3 text-sm text-foreground/85">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/configurateur" className="mt-8 block">
                <GoldButton className="w-full">Choisir</GoldButton>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* MOMENTS */}
      <div className="bg-ivory/60 border-t border-border/60">
        <Section className="!py-20">
          <SectionHead eyebrow="Tous les moments" title="Pour tous les moments heureux de la vie." center />
          <div className="grid grid-cols-3 md:grid-cols-8 gap-y-8 gap-x-4 text-center">
            {[
              { icon: Heart, label: "Mariage" },
              { icon: Sparkles, label: "Fiançailles" },
              { icon: Gift, label: "Naissance" },
              { icon: Heart, label: "Baptême" },
              { icon: Sparkles, label: "Anniversaire" },
              { icon: Gift, label: "Baby Shower" },
              { icon: Sparkles, label: "Gender Reveal" },
              { icon: Heart, label: "Sur mesure" },
            ].map((m) => (
              <div key={m.label} className="space-y-2">
                <div className="mx-auto size-12 grid place-items-center rounded-full border border-primary/30 text-primary">
                  <m.icon className="size-5" />
                </div>
                <div className="text-xs tracking-wide">{m.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <ExperienceLightbox experience={lightbox} onClose={() => setLightbox(null)} />
    </SiteLayout>
  );
}
