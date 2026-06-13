import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/site/CollectionPage";
import img from "@/assets/collection-portes.jpg";
export const Route = createFileRoute("/portes")({
  head: () => ({
    meta: [
      { title: "Les Seuils — Eventia Signature" },
      { name: "description", content: "Un passage. Une ouverture. Le moment où une histoire commence." },
      { property: "og:title", content: "Les Seuils — Eventia Signature" },
      { property: "og:description", content: "Un passage. Une ouverture. Le moment où une histoire commence." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/portes" }],
  }),
  component: () => <CollectionPage slug="portes" />,
});
