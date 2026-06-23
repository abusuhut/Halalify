"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import BarcodeScanner from "@/components/BarcodeScanner";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-pale text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <span>🇰🇷</span>
          <span>{t.tagline}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-ink font-semibold leading-tight mb-3">
          {t.hero.split("halal").length > 1 ? (
            <>
              {t.hero.split(/halal|할랄|halol/i)[0]}
              <span className="text-teal">
                {t.lang === "ko" ? "할랄" : t.lang === "uz" ? "halol" : "halal"}
              </span>
              {t.hero.split(/halal|할랄|halol/i)[1]}
            </>
          ) : (
            t.hero
          )}
        </h1>
        <p className="text-ink-light text-lg">{t.subtitle}</p>
      </div>

      {/* Scanner Card */}
      <div className="card mb-4 shadow-sm">
        <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <span>📷</span>
          <span>{t.scanLabel}</span>
        </p>
        <BarcodeScanner />
      </div>

      {/* Manual Entry */}
      <div className="card mb-10 shadow-sm">
        <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <span>⌨️</span>
          <span>{t.manualLabel}</span>
        </p>
        <ManualBarcodeForm />
      </div>

      {/* Status explanation */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-4 bg-haram-pale border border-haram/20">
          <span className="status-badge haram text-sm">❌ {t.haram}</span>
          <p className="text-sm text-ink/70 mt-3">{t.haramDesc}</p>
        </div>
        <div className="rounded-xl p-4 bg-amber-pale border border-amber/20">
          <span className="status-badge not_certified text-sm">⚠️ {t.notCertified}</span>
          <p className="text-sm text-ink/70 mt-3">{t.notCertifiedDesc}</p>
        </div>
        <div className="rounded-xl p-4 bg-halal-pale border border-halal/20">
          <span className="status-badge halal_certified text-sm">✅ {t.halalCertified}</span>
          <p className="text-sm text-ink/70 mt-3">{t.halalCertifiedDesc}</p>
        </div>
      </div>
    </div>
  );
}
