"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import StatusStamp from "@/components/StatusStamp";
import CertifyForm from "@/components/CertifyForm";

export default function ProductClient({ product, barcode, isModerator }) {
  const { t } = useLanguage();

  const STATUS_DESC = {
    haram: t.haramStatusDesc,
    not_certified: t.notCertifiedStatusDesc,
    halal_certified: t.halalStatusDesc,
  };

  const STATUS_BG = {
    haram: "bg-haram-pale border-haram/20",
    not_certified: "bg-amber-pale border-amber/20",
    halal_certified: "bg-halal-pale border-halal/20",
  };

  if (!product || product.off_found === false) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-teal hover:underline mb-8">
          {t.back}
        </Link>
        <div className="card text-center py-12">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="font-display text-2xl text-ink font-semibold mb-2">
            {t.productNotFound}
          </h1>
          <p className="text-sm text-ink/60 mb-4">
            <span className="font-mono bg-warm-gray px-2 py-0.5 rounded">{barcode}</span>{" "}
            {t.productNotFoundDesc}
          </p>
          <a
            href={`https://world.openfoodfacts.org/cgi/product.pl?type=add&code=${barcode}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-teal underline"
          >
            {t.addToOFF}
          </a>
        </div>
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

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-teal hover:underline mb-6">
        {t.back}
      </Link>

      {/* Product header */}
      <div className="card shadow-sm mb-4">
        <div className="flex gap-5 items-start">
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-24 h-24 object-contain bg-warm-gray rounded-xl border border-line flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            {product.brand && (
              <p className="text-xs font-semibold text-ink-light uppercase tracking-wider mb-1">
                {product.brand}
              </p>
            )}
            <h1 className="font-display text-2xl text-ink font-semibold leading-tight mb-3">
              {product.product_name}
            </h1>
            <StatusStamp status={product.status} size="lg" />
          </div>
        </div>
      </div>

      {/* Status description */}
      <div className={`rounded-xl border p-4 mb-4 ${STATUS_BG[product.status]}`}>
        <p className="text-sm text-ink/80">{STATUS_DESC[product.status]}</p>
      </div>

      {/* Haram ingredients */}
      {product.haram_ingredients_found?.length > 0 && (
        <div className="card border-haram/30 bg-haram-pale mb-4">
          <p className="text-sm font-semibold text-haram mb-2">
            ❌ {t.haramDetected}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.haram_ingredients_found.map((ing) => (
              <span key={ing} className="bg-haram/10 text-haram text-xs font-medium px-2.5 py-1 rounded-full border border-haram/20">
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ambiguous ingredients */}
      {product.ambiguous_ingredients_found?.length > 0 && (
        <div className="card border-amber/30 bg-amber-pale mb-4">
          <p className="text-sm font-semibold text-amber mb-2">
            ⚠️ {t.ambiguous}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.ambiguous_ingredients_found.map((ing) => (
              <span key={ing} className="bg-amber/10 text-amber text-xs font-medium px-2.5 py-1 rounded-full border border-amber/20">
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certificate note */}
      {product.status === "halal_certified" && product.certificate_note && (
        <div className="card border-halal/30 bg-halal-pale mb-4">
          <p className="text-sm font-semibold text-halal mb-1">
            ✅ {t.certRef}
          </p>
          <p className="text-sm text-ink/70">{product.certificate_note}</p>
        </div>
      )}

      {/* Full ingredients */}
      {product.ingredients_text && (
        <div className="card mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-light mb-2">
            {t.fullIngredients}
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">
            {product.ingredients_text}
          </p>
        </div>
      )}

      {/* Moderator controls */}
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
