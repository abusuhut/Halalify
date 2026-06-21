import { createAdminClient } from "@/lib/supabaseAdmin";
import { fetchFromOpenFoodFacts } from "@/lib/openFoodFacts";
import { analyzeIngredients } from "@/lib/haramCheck";

export async function getOrCreateProduct(barcode) {
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("products")
    .select("*")
    .eq("barcode", barcode)
    .maybeSingle();

  if (existing) {
    return existing;
  }

  let off;
  try {
    off = await fetchFromOpenFoodFacts(barcode);
  } catch (e) {
    console.error(`[OFF] fetch threw for barcode ${barcode}:`, e);
    off = { found: false };
  }

  if (!off.found) {
    const { data: notFoundRow } = await supabase
      .from("products")
      .insert({
        barcode,
        product_name: null,
        off_found: false,
        status: "not_certified",
      })
      .select()
      .single();

    return notFoundRow;
  }

  const [{ data: haramRows }, { data: ambiguousRows }] = await Promise.all([
    supabase.from("haram_keywords").select("keyword"),
    supabase.from("ambiguous_keywords").select("keyword"),
  ]);

  const haramKeywords = (haramRows || []).map((r) => r.keyword);
  const ambiguousKeywords = (ambiguousRows || []).map((r) => r.keyword);

  const analysis = analyzeIngredients(
    off.ingredientsText,
    haramKeywords,
    ambiguousKeywords
  );

  const { data: saved } = await supabase
    .from("products")
    .insert({
      barcode,
      product_name: off.productName,
      brand: off.brand,
      image_url: off.imageUrl,
      ingredients_text: off.ingredientsText,
      status: analysis.status,
      haram_ingredients_found: analysis.haramIngredientsFound,
      ambiguous_ingredients_found: analysis.ambiguousIngredientsFound,
      off_found: true,
    })
    .select()
    .single();

  return saved;
}