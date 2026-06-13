import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/site/CollectionPage";
import img from "@/assets/collection-union.jpg";
export const Route = createFileRoute("/union")({
  head: () => ({
    meta: [
      { title: "L'Union — Eventia Signature" },
      { name: "description", content: "Deux histoires deviennent une. La collection de la rencontre." },
      { property: "og:title", content: "L'Union — Eventia Signature" },
      { property: "og:description", content: "La collection de la rencontre." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/union" }],
  }),
  component: () => <CollectionPage slug="union" />,
});
