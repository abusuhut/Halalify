import Link from "next/link";
import { getOrCreateProduct } from "@/lib/getOrCreateProduct";
import { createServerSupabase } from "@/lib/supabaseServer";
import StatusStamp from "@/components/StatusStamp";
import CertifyForm from "@/components/CertifyForm";
import { STATUS_LABELS } from "@/lib/haramCheck";

export default async function ProductPage({ params }) {
  const { barcode } = await params;
  const product = await getOrCreateProduct(barcode);

  // Check if the current visitor is a logged-in moderator
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isModerator = false;
  if (user) {
    const { data: moderatorRow } = await supabase
      .from("moderators")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    isModerator = !!moderatorRow;
  }

  if (!product || product.off_found === false) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12">
        <Link href="/" className="text-sm text-teal hover:underline">
          ← Scan another
        </Link>
        <h1 className="font-display text-3xl text-teal mt-4 mb-2">
          Product not found
        </h1>
        <p className="text-ink/60 mb-6">
          Barcode <span className="font-mono">{barcode}</span> wasn&apos;t
          found in Open Food Facts. You can add it there directly, or a
          moderator can certify it manually below.
        </p>
        <a
          href={`https://world.openfoodfacts.org/cgi/product.pl?type=add&code=${barcode}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-teal underline"
        >
          Add this product to Open Food Facts ↗
        </a>

        {isModerator && (
          <CertifyForm
            barcode={barcode}
            currentStatus={product?.status || "not_certified"}
            currentNote={product?.certificate_note}
          />
        )}
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[product.status];

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <Link href="/" className="text-sm text-teal hover:underline">
        ← Scan another
      </Link>

      <div className="flex flex-col sm:flex-row gap-6 items-start mt-6">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-32 h-32 object-contain bg-white rounded-md border border-line"
          />
        )}
        <div>
          <p className="text-xs uppercase tracking-widest text-ink/40 font-medium mb-1">
            {product.brand || "Unknown brand"}
          </p>
          <h1 className="font-display text-3xl text-teal mb-3">
            {product.product_name}
          </h1>
          <StatusStamp status={product.status} size="lg" />
        </div>
      </div>

      <p className="text-ink/70 mt-6 max-w-xl">{statusInfo.description}</p>

      {product.haram_ingredients_found?.length > 0 && (
        <div className="mt-6 p-4 rounded-md bg-stamp-red/5 border border-stamp-red/30">
          <p className="text-sm font-medium text-stamp-red mb-1">
            Haram ingredient(s) detected
          </p>
          <p className="text-sm text-ink/70">
            {product.haram_ingredients_found.join(", ")}
          </p>
        </div>
      )}

      {product.ambiguous_ingredients_found?.length > 0 && (
        <div className="mt-4 p-4 rounded-md bg-stamp-amber/5 border border-stamp-amber/30">
          <p className="text-sm font-medium text-stamp-amber mb-1">
            Ambiguous ingredient(s) — source unclear
          </p>
          <p className="text-sm text-ink/70">
            {product.ambiguous_ingredients_found.join(", ")}
          </p>
        </div>
      )}

      {product.status === "halal_certified" && product.certificate_note && (
        <div className="mt-4 p-4 rounded-md bg-stamp-green/5 border border-stamp-green/30">
          <p className="text-sm font-medium text-stamp-green mb-1">
            Certificate reference
          </p>
          <p className="text-sm text-ink/70">{product.certificate_note}</p>
        </div>
      )}

      {product.ingredients_text && (
        <div className="mt-8 cert-rule pt-6">
          <p className="text-xs uppercase tracking-widest text-ink/40 font-medium mb-2">
            Full ingredients
          </p>
          <p className="text-sm text-ink/70 font-[family-name:var(--font-kr)]">
            {product.ingredients_text}
          </p>
        </div>
      )}

      {isModerator && (
        <CertifyForm
          barcode={product.barcode}
          currentStatus={product.status}
          currentNote={product.certificate_note}
        />
      )}
    </div>
  );
}
