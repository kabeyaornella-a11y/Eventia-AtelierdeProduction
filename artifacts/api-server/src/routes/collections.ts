import { Router } from "express";

const router = Router();

const COLLECTIONS = [
  {
    id: 1,
    slug: "voiles",
    name: "Les Voiles",
    description: "Aérien · Délicat · Textile. Une douceur enveloppante, comme du tulle qui s'envole.",
    videoUrl: "https://res.cloudinary.com/eventia/video/upload/v1/collections/voiles.mp4",
    previewImageUrl: "/__mockup/images/collection-voiles.jpg",
  },
  {
    id: 2,
    slug: "seuils",
    name: "Les Seuils",
    description: "Passages · Portes · Transitions. L'entre-deux, le moment suspendu avant de franchir.",
    videoUrl: "https://res.cloudinary.com/eventia/video/upload/v1/collections/seuils.mp4",
    previewImageUrl: "/__mockup/images/collection-seuils.jpg",
  },
  {
    id: 3,
    slug: "ecrins",
    name: "Les Écrins",
    description: "Joaillerie · Précieux · Écrin. Chaque détail, un bijou. Chaque séquence, une gemme.",
    videoUrl: "https://res.cloudinary.com/eventia/video/upload/v1/collections/ecrins.mp4",
    previewImageUrl: "/__mockup/images/collection-ecrins.jpg",
  },
  {
    id: 4,
    slug: "union",
    name: "L'Union",
    description: "Chaleur · Famille · Promesse. La force de deux histoires qui se rejoignent.",
    videoUrl: "https://res.cloudinary.com/eventia/video/upload/v1/collections/union.mp4",
    previewImageUrl: "/__mockup/images/collection-union.jpg",
  },
];

router.get("/collections", (_req, res) => {
  res.json(COLLECTIONS);
});

export default router;
