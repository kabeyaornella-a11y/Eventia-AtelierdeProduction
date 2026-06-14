import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates conflicting Tailwind classes (last wins)", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("filters falsy values", () => {
    expect(cn("foo", false && "bar", undefined, null as never, "baz")).toBe("foo baz");
  });

  it("handles conditional objects", () => {
    expect(cn({ "font-bold": true, italic: false })).toBe("font-bold");
  });

  it("returns empty string when no valid classes", () => {
    expect(cn(false as never, undefined)).toBe("");
  });
});
