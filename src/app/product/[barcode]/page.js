import { getOrCreateProduct } from "@/lib/getOrCreateProduct";
import { createServerSupabase } from "@/lib/supabaseServer";
import ProductClient from "./ProductClient";

export default async function ProductPage({ params }) {
  const { barcode } = await params;
  const product = await getOrCreateProduct(barcode);

  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  let isModerator = false;
  if (user) {
    const { data: moderatorRow } = await supabase
      .from("moderators")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    isModerator = !!moderatorRow;
  }

  return (
    <ProductClient
      product={product}
      barcode={barcode}
      isModerator={isModerator}
    />
  );
}
