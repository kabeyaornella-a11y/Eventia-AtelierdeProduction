import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

/** Liste publique du catalogue de décorations. */
export const listDecorations = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("decorations")
    .select("id, name, category, themes, description, image_url, price_eur, supplier, supplier_url")
    .order("category", { ascending: true });
  if (error) throw new Error(error.message);
  return { decorations: data ?? [] };
});

/** Recommande des décorations compatibles avec un thème. */
export const recommendDecorations = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ theme: z.string().min(1).max(64) }).parse(i))
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabase
      .from("decorations")
      .select("id, name, category, themes, description, image_url, price_eur, supplier, supplier_url")
      .contains("themes", [data.theme]);
    if (error) throw new Error(error.message);
    return { decorations: rows ?? [] };
  });
