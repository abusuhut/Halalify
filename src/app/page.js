"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import BarcodeScanner from "@/components/BarcodeScanner";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* ── HERO ── */}
      <div className="hero-gradient geometric-bg relative overflow-hidden">
        <div className="gold-line" />
        <div className="max-w-3xl mx-auto px-5 pt-16 pb-12 relative z-10">

          {/* Top ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold/70 text-sm tracking-[0.3em] font-medium uppercase">Halalify</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Main headline */}
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl sm:text-6xl text-cream font-semibold leading-[1.1] mb-5">
              Know what&apos;s<br />
              <span className="text-gold-light italic">in your food.</span>
            </h1>
            <p className="text-green-pale/70 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
            {[
              { num: "3M+", label: "Products" },
              { num: "3", label: "Languages" },
              { num: "100%", label: "Free" },
            ].map((s) => (
              <div key={s.label} className="text-center border border-green-mid/30 rounded-xl py-3 px-2 bg-green-deep/30 backdrop-blur">
                <p className="font-display text-2xl text-gold-light font-semibold">{s.num}</p>
                <p className="text-green-pale/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-3 opacity-30">
            <div className="h-px w-16 bg-gold-light" />
            <span className="text-gold-light text-xs">◆</span>
            <div className="h-px w-16 bg-gold-light" />
          </div>
        </div>
        <div className="gold-line" />
      </div>

      {/* ── SCAN SECTION ── */}
      <div className="max-w-2xl mx-auto px-5 py-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">{t.scanLabel}</p>
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="card-elevated mb-6">
          <BarcodeScanner />
        </div>

        {/* Or divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-ink-faint font-medium px-2">or · 또는 · yoki</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        {/* Manual entry */}
        <div className="card mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint mb-3">{t.manualLabel}</p>
          <ManualBarcodeForm />
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-line" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">How it works</p>
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "❌", label: t.haram, desc: t.haramDesc, bg: "bg-haram-pale", border: "border-haram/10", color: "text-haram" },
            { icon: "⚠️", label: t.notCertified, desc: t.notCertifiedDesc, bg: "bg-amber-pale", border: "border-amber/10", color: "text-amber" },
            { icon: "✅", label: t.halalCertified, desc: t.halalCertifiedDesc, bg: "bg-halal-pale", border: "border-halal/10", color: "text-halal" },
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl p-5 border ${item.bg} ${item.border}`}>
              <div className="text-2xl mb-3">{item.icon}</div>
              <p className={`font-semibold text-sm mb-2 ${item.color}`}>{item.label}</p>
              <p className="text-xs text-ink-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── TRUST SECTION ── */}
        <div className="rounded-2xl bg-green-deep geometric-bg overflow-hidden">
          <div className="gold-line" />
          <div className="p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold/70 mb-4">Our Promise</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: "🛡️", title: "Honest, not optimistic", desc: "We never say 'Halal' without a real certificate. If we don't know, we say so." },
                { icon: "📖", title: "Transparent logic", desc: "You can see exactly which ingredients triggered every result." },
                { icon: "🔄", title: "Community data", desc: "Powered by Open Food Facts — millions of products, openly maintained." },
                { icon: "🆓", title: "Always free", desc: "No account needed. No ads. Just scan and know." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-cream font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-green-pale/60 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="gold-line" />
        </div>
      </div>
    </div>
  );
}