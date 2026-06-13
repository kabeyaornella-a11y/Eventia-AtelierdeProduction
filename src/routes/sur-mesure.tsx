import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout, GoldButton } from "@/components/site/SiteLayout";
import img from "@/assets/sur-mesure.jpg";

export const Route = createFileRoute("/sur-mesure")({
  head: () => ({
    meta: [
      { title: "Sur Mesure — Eventia Signature" },
      { name: "description", content: "Une création unique, pensée uniquement pour votre histoire." },
      { property: "og:title", content: "Sur Mesure — Eventia Signature" },
      { property: "og:description", content: "Direction artistique dédiée." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/sur-mesure" }],
  }),
  component: () => (
    <SiteLayout>
      <section className="grid lg:grid-cols-2 gap-0">
        <div className="h-[460px] lg:h-[720px] overflow-hidden">
          <img src={img} alt="Sur mesure" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center px-6 lg:px-16 py-20">
          <div className="max-w-xl space-y-6">
            <div className="eyebrow">Sur mesure</div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight">Une création pensée uniquement pour votre histoire.</h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Chaque détail, chaque émotion, chaque mot raconte votre univers. Notre direction artistique compose une expérience entièrement unique, avec un accompagnement personnalisé du premier échange à votre événement.
            </p>
            <ul className="space-y-3 text-sm">
              {["Direction artistique dédiée", "Accompagnement personnalisé", "Expérience entièrement unique", "Modules à la carte"].map((f) => (
                <li key={f} className="flex gap-3"><Check className="size-4 text-primary mt-0.5" /><span>{f}</span></li>
              ))}
            </ul>
            <Link to="/contact"><GoldButton>Demander une création sur mesure</GoldButton></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
});
