import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Section, SectionHead } from "@/components/site/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/lib/eventia-data";

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes — Eventia Signature" },
      {
        name: "description",
        content:
          "22 réponses claires aux questions les plus courantes sur les expériences digitales Eventia, l'Atelier et l'accompagnement.",
      },
      { property: "og:title", content: "Questions fréquentes. Eventia" },
      { property: "og:description", content: "Nous répondons à vos questions." },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/faq" }],
  }),
  component: () => (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <Section className="max-w-3xl">
        <SectionHead
          eyebrow="FAQ"
          title="Questions fréquentes"
          intro={`${faq.length} réponses claires pour tout savoir avant de composer votre expérience.`}
        />
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-ivory shadow-soft border-0 px-6"
            >
              <AccordionTrigger className="text-left font-serif-soft text-lg italic">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </SiteLayout>
  ),
});
