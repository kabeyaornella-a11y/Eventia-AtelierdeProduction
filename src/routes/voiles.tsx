import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/site/CollectionPage";
import img from "@/assets/collection-voiles.jpg";
export const Route = createFileRoute("/voiles")({
  head: () => ({
    meta: [
      { title: "Les Voiles — Eventia Signature" },
      {
        name: "description",
        content: "Univers poétique, aérien, lumineux. La signature d'Eventia.",
      },
      { property: "og:title", content: "Les Voiles — Eventia Signature" },
      { property: "og:description", content: "Univers poétique et lumineux." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/voiles" }],
  }),
  component: () => <CollectionPage slug="voiles" />,
});
