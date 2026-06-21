/**
 * Decide a product's status from its ingredients text.
 *
 * Rules (deliberately conservative — see project README):
 *  - If a clearly haram ingredient is found  -> "haram" (automatic, final)
 *  - Otherwise, if it's already certified by a moderator -> keep "halal_certified"
 *  - Otherwise -> "not_certified" (we never auto-declare something halal;
 *    that requires a human moderator with an actual certificate)
 *
 * @param {string} ingredientsText - raw ingredients string from Open Food Facts
 * @param {string[]} haramKeywords - list of unambiguous haram keywords
 * @param {string[]} ambiguousKeywords - list of "depends on source" keywords
 * @param {string|null} existingStatus - current status in our DB, if any
 */
export function analyzeIngredients(
  ingredientsText,
  haramKeywords,
  ambiguousKeywords,
  existingStatus = null
) {
  const text = (ingredientsText || "").toLowerCase();

  const haramFound = haramKeywords.filter((kw) =>
    text.includes(kw.toLowerCase())
  );
  const ambiguousFound = ambiguousKeywords.filter((kw) =>
    text.includes(kw.toLowerCase())
  );

  if (haramFound.length > 0) {
    return {
      status: "haram",
      haramIngredientsFound: haramFound,
      ambiguousIngredientsFound: ambiguousFound,
    };
  }

  // Never auto-upgrade to halal_certified — only a moderator action does that.
  // But if it WAS certified and still has no haram ingredients, keep it certified.
  if (existingStatus === "halal_certified") {
    return {
      status: "halal_certified",
      haramIngredientsFound: [],
      ambiguousIngredientsFound: ambiguousFound,
    };
  }

  return {
    status: "not_certified",
    haramIngredientsFound: [],
    ambiguousIngredientsFound: ambiguousFound,
  };
}

export const STATUS_LABELS = {
  haram: {
    label: "Haram",
    color: "red",
    description: "Contains an ingredient that is not halal.",
  },
  not_certified: {
    label: "Not Certified",
    color: "gray",
    description:
      "No haram ingredients were detected, but this product has no halal certificate on file. This is not a halal claim.",
  },
  halal_certified: {
    label: "Halal Certified",
    color: "green",
    description: "Verified halal-certified by a moderator.",
  },
};
