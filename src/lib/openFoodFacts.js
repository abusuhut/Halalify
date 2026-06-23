/**
 * Fetch a product from Open Food Facts by barcode.
 * Docs: https://openfoodfacts.github.io/openfoodfacts-server/api/
 */
export async function fetchFromOpenFoodFacts(barcode) {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(
      barcode
    )}.json?fields=product_name,brands,image_url,ingredients_text,ingredients_text_ko,ingredients_text_en`,
    {
      headers: {
        // OFF asks API consumers to identify themselves
        "User-Agent": "HalalScannerKorea/1.0 (contact: set-your-email-here)",
      },
      // Open Food Facts data changes rarely per-barcode; cache briefly
      next: { revalidate: 60 * 60 },
    }
  );

  if (!res.ok) {
    console.error(
      `[OFF] HTTP ${res.status} for barcode ${barcode}: ${await res
        .text()
        .catch(() => "")}`
    );
    return { found: false };
  }

  const data = await res.json();

  if (data.status !== 1 || !data.product) {
    console.error(
      `[OFF] No product for barcode ${barcode}. status=${data.status} status_verbose=${data.status_verbose}`
    );
    return { found: false };
  }

  const p = data.product;
  // Prefer Korean ingredients text if present, fall back to English, then default
  const ingredientsText =
    p.ingredients_text_ko || p.ingredients_text_en || p.ingredients_text || "";

  return {
    found: true,
    productName: p.product_name || "Unknown product",
    brand: p.brands || "",
    imageUrl: p.image_url || null,
    ingredientsText,
  };
}
