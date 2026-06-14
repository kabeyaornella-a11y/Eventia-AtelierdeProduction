import { describe, it, expect } from "vitest";
import { getGumroadUrl, buildGumroadCheckout, GUMROAD_LINKS } from "../gumroad-links";

describe("getGumroadUrl", () => {
  it("returns the correct URL for a known key", () => {
    expect(getGumroadUrl("essentielle")).toBe(GUMROAD_LINKS["essentielle"]);
  });

  it("falls back to gumroad.com for an unknown key", () => {
    expect(getGumroadUrl("nonexistent")).toBe("https://gumroad.com");
  });
});

describe("buildGumroadCheckout", () => {
  it("always adds wanted=true to the URL", () => {
    const url = buildGumroadCheckout("essentielle");
    expect(url).toContain("wanted=true");
  });

  it("appends email when provided", () => {
    const url = buildGumroadCheckout("essentielle", { email: "test@example.com" });
    expect(url).toContain("email=test%40example.com");
  });

  it("appends ref when provided", () => {
    const url = buildGumroadCheckout("signature", { ref: "REF-123" });
    expect(url).toContain("ref=REF-123");
  });

  it("falls back gracefully for an unknown key (still returns a valid URL)", () => {
    const url = buildGumroadCheckout("nonexistent");
    expect(url).toContain("gumroad.com");
    expect(url).toContain("wanted=true");
  });

  it("builds a valid URL object from the result", () => {
    const url = buildGumroadCheckout("signature", { email: "a@b.com", ref: "XYZ" });
    expect(() => new URL(url)).not.toThrow();
  });
});
