"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import BarcodeScanner from "@/components/BarcodeScanner";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient geometric-bg relative overflow-hidden">
        {/* Gold top line */}
        <div className="gold-line" />
        <div className="max-w-3xl mx-auto px-5 py-14 text-center relative z-10">
          {/* Arabic bismillah-style ornament */}
          <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
            <div className="h-px w-12 bg-gold-light" />
            <span className="text-gold-light text-lg">✦</span>
            <div className="h-px w-12 bg-gold-light" />
          </div>
          <p className="text-gold-light text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {t.tagline}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-cream font-semibold leading-tight mb-4">
            {t.hero}
          </h1>
          <p className="text-green-pale/70 text-base max-w-md mx-auto">
            {t.subtitle}
          </p>
          {/* Gold bottom ornament */}
          <div className="flex items-center justify-center gap-3 mt-8 opacity-40">
            <div className="h-px w-8 bg-gold-light" />
            <span className="text-gold-light text-xs">◆</span>
            <div className="h-px w-8 bg-gold-light" />
          </div>
        </div>
        <div className="gold-line" />
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-5 py-8">

        {/* Scanner Card */}
        <div className="card-elevated mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-green-pale border border-green-mid/20 flex items-center justify-center text-sm">
              📷
            </div>
            <p className="text-sm font-semibold text-ink">{t.scanLabel}</p>
          </div>
          <BarcodeScanner />
        </div>

        {/* Divider with ornament */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-line" />
          <span className="text-ink-faint text-xs">or · 또는 · yoki</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        {/* Manual Entry */}
        <div className="card mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-green-pale border border-green-mid/20 flex items-center justify-center text-sm">
              ⌨️
            </div>
            <p className="text-sm font-semibold text-ink">{t.manualLabel}</p>
          </div>
          <ManualBarcodeForm />
        </div>

        {/* Status Cards */}
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint text-center mb-4">
          How it works
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl p-4 bg-haram-pale border border-haram/10">
            <div className="w-8 h-8 rounded-full bg-haram/10 flex items-center justify-center text-base mb-3">❌</div>
            <p className="font-semibold text-haram text-sm mb-1">{t.haram}</p>
            <p className="text-xs text-ink-light leading-relaxed">{t.haramDesc}</p>
          </div>
          <div className="rounded-xl p-4 bg-amber-pale border border-amber/10">
            <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center text-base mb-3">⚠️</div>
            <p className="font-semibold text-amber text-sm mb-1">{t.notCertified}</p>
            <p className="text-xs text-ink-light leading-relaxed">{t.notCertifiedDesc}</p>
          </div>
          <div className="rounded-xl p-4 bg-halal-pale border border-halal/10">
            <div className="w-8 h-8 rounded-full bg-halal/10 flex items-center justify-center text-base mb-3">✅</div>
            <p className="font-semibold text-halal text-sm mb-1">{t.halalCertified}</p>
            <p className="text-xs text-ink-light leading-relaxed">{t.halalCertifiedDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
