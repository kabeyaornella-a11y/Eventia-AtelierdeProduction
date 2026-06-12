import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listPortfolio = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("portfolio_items")
    .select("id, slug, title, hero_url, category, year, story, display_order")
    .eq("published", true)
    .order("display_order")
    .order("created_at", { ascending: false });
  return { items: data ?? [] };
});

export const getPortfolioBySlug = createServerFn({ method: "GET" })
  .inputValidator((i) => z.object({ slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/) }).parse(i))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: item } = await supabaseAdmin
      .from("portfolio_items")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    return { item };
  });
