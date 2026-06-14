import { describe, it, expect } from "vitest";

// eventia-data imports asset files via Vite, mock them to avoid bundler dependency
vi.mock("@/assets/collection-ecrins.jpg", () => ({ default: "/assets/collection-ecrins.jpg" }));
vi.mock("@/assets/collection-portes.jpg", () => ({ default: "/assets/collection-portes.jpg" }));
vi.mock("@/assets/collection-voiles.jpg", () => ({ default: "/assets/collection-voiles.jpg" }));
vi.mock("@/assets/collection-union.jpg", () => ({ default: "/assets/collection-union.jpg" }));
vi.mock("@/assets/exp-versailles.jpg", () => ({ default: "/assets/exp-versailles.jpg" }));
vi.mock("@/assets/exp-aube-celeste.jpg", () => ({ default: "/assets/exp-aube-celeste.jpg" }));
vi.mock("@/assets/exp-brume-royale.jpg", () => ({ default: "/assets/exp-brume-royale.jpg" }));
vi.mock("@/assets/exp-heritage-royal.jpg", () => ({ default: "/assets/exp-heritage-royal.jpg" }));
vi.mock("@/assets/exp-lumiere-soie.jpg", () => ({ default: "/assets/exp-lumiere-soie.jpg" }));
vi.mock("@/assets/exp-jardin-suspendu.jpg", () => ({ default: "/assets/exp-jardin-suspendu.jpg" }));
vi.mock("@/assets/exp-sultan-noir.jpg", () => ({ default: "/assets/exp-sultan-noir.jpg" }));
vi.mock("@/assets/exp-opera-blanc.jpg", () => ({ default: "/assets/exp-opera-blanc.jpg" }));
vi.mock("@/assets/exp-etoile-orient.jpg", () => ({ default: "/assets/exp-etoile-orient.jpg" }));
vi.mock("@/assets/exp-velours-imperial.jpg", () => ({ default: "/assets/exp-velours-imperial.jpg" }));
vi.mock("@/assets/exp-palais-minuit.jpg", () => ({ default: "/assets/exp-palais-minuit.jpg" }));
vi.mock("@/assets/exp-reve-ivoire.jpg", () => ({ default: "/assets/exp-reve-ivoire.jpg" }));
vi.mock("@/assets/std-video.jpg", () => ({ default: "/assets/std-video.jpg" }));
vi.mock("@/assets/std-cinematique.jpg", () => ({ default: "/assets/std-cinematique.jpg" }));
vi.mock("@/assets/std-surmesure.jpg", () => ({ default: "/assets/std-surmesure.jpg" }));

import { collections, experiences, offers } from "../eventia-data";

describe("collections", () => {
  it("has exactly 4 collections", () => {
    expect(collections).toHaveLength(4);
  });

  it("each collection has a unique slug", () => {
    const slugs = collections.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(collections.length);
  });

  it("each collection has required fields", () => {
    for (const c of collections) {
      expect(c.slug).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.tagline).toBeTruthy();
      expect(c.image).toBeTruthy();
    }
  });
});

describe("experiences", () => {
  it("has at least one experience per collection", () => {
    const collectionSlugs = collections.map((c) => c.slug);
    for (const slug of collectionSlugs) {
      const exp = experiences.filter((e) => e.univers === slug);
      expect(exp.length).toBeGreaterThan(0);
    }
  });

  it("each experience belongs to a valid collection", () => {
    const validSlugs = new Set(collections.map((c) => c.slug));
    for (const e of experiences) {
      expect(validSlugs.has(e.univers)).toBe(true);
    }
  });

  it("each experience has a unique slug", () => {
    const slugs = experiences.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(experiences.length);
  });
});

describe("offers", () => {
  it("has at least 2 offers", () => {
    expect(offers.length).toBeGreaterThanOrEqual(2);
  });

  it("at most one offer is recommended", () => {
    const recommended = offers.filter((o) => o.recommended);
    expect(recommended.length).toBeLessThanOrEqual(1);
  });

  it("each offer has a price", () => {
    for (const o of offers) {
      expect(typeof o.price).toBe("number");
      expect(o.price).toBeGreaterThan(0);
    }
  });
});
