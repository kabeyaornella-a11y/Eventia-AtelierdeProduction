import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/site/CollectionPage";
import ecrinsImg from "@/assets/collection-ecrins.jpg";
export const Route = createFileRoute("/ecrins")({
  head: () => ({
    meta: [
      { title: "Les Écrins — Eventia Signature" },
      {
        name: "description",
        content: "Univers précieux, intime, délicat. Cachets de cire, papeterie, calligraphie.",
      },
      { property: "og:title", content: "Les Écrins — Eventia Signature" },
      { property: "og:description", content: "Univers précieux, intime, délicat." },
      { property: "og:image", content: ecrinsImg },
    ],
    links: [{ rel: "canonical", href: "https://www.eventiasignature.com/ecrins" }],
  }),
  component: () => <CollectionPage slug="ecrins" />,
});
