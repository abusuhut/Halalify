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
    haram: "bg-haram-pale border-haram/15",
    not_certified: "bg-amber-pale border-amber/15",
    halal_certified: "bg-halal-pale border-halal/15",
  };

  if (!product || product.off_found === false) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-green-mid hover:text-green-deep transition-colors mb-8 font-medium">
          {t.back}
        </Link>
        <div className="card-elevated text-center py-14">
          <div className="w-16 h-16 rounded-full bg-ivory-dark border border-line flex items-center justify-center text-3xl mx-auto mb-4">🔍</div>
          <h1 className="font-display text-2xl text-ink font-semibold mb-2">{t.productNotFound}</h1>
          <p className="text-sm text-ink-light mb-6">
            <span className="font-mono bg-ivory-dark px-2 py-0.5 rounded text-xs">{barcode}</span>
            {" "}{t.productNotFoundDesc}
          </p>
          <a
            href={`https://world.openfoodfacts.org/cgi/product.pl?type=add&code=${barcode}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-green-mid hover:text-green-deep underline font-medium"
          >
            {t.addToOFF}
          </a>
        </div>
        {isModerator && (
          <CertifyForm barcode={barcode} currentStatus={product?.status || "not_certified"} currentNote={product?.certificate_note} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-green-mid hover:text-green-deep transition-colors mb-6 font-medium">
        {t.back}
      </Link>

      {/* Product header card */}
      <div className="card-elevated mb-4">
        <div className="flex gap-5 items-start">
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-24 h-24 object-contain bg-ivory-dark rounded-xl border border-line flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            {product.brand && (
              <p className="text-xs font-semibold text-ink-faint uppercase tracking-wider mb-1">{product.brand}</p>
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
        <p className="text-sm text-ink/75 leading-relaxed">{STATUS_DESC[product.status]}</p>
      </div>

      {/* Haram ingredients */}
      {product.haram_ingredients_found?.length > 0 && (
        <div className="card border-haram/15 bg-haram-pale mb-4">
          <p className="text-sm font-semibold text-haram mb-3">❌ {t.haramDetected}</p>
          <div className="flex flex-wrap gap-2">
            {product.haram_ingredients_found.map((ing) => (
              <span key={ing} className="bg-white/70 text-haram text-xs font-medium px-3 py-1.5 rounded-full border border-haram/20">
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ambiguous ingredients */}
      {product.ambiguous_ingredients_found?.length > 0 && (
        <div className="card border-amber/15 bg-amber-pale mb-4">
          <p className="text-sm font-semibold text-amber mb-3">⚠️ {t.ambiguous}</p>
          <div className="flex flex-wrap gap-2">
            {product.ambiguous_ingredients_found.map((ing) => (
              <span key={ing} className="bg-white/70 text-amber text-xs font-medium px-3 py-1.5 rounded-full border border-amber/20">
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certificate note */}
      {product.status === "halal_certified" && product.certificate_note && (
        <div className="card border-halal/15 bg-halal-pale mb-4">
          <p className="text-sm font-semibold text-halal mb-1">✅ {t.certRef}</p>
          <p className="text-sm text-ink-mid">{product.certificate_note}</p>
        </div>
      )}

      {/* Full ingredients */}
      {product.ingredients_text && (
        <div className="card mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint mb-3">{t.fullIngredients}</p>
          <p className="text-sm text-ink-light leading-relaxed">{product.ingredients_text}</p>
        </div>
      )}

      {isModerator && (
        <CertifyForm barcode={product.barcode} currentStatus={product.status} currentNote={product.certificate_note} />
      )}
    </div>
  );
}
