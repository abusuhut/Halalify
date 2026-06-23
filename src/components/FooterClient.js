"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function FooterClient() {
  const { t } = useLanguage();

  return (
    <footer className="divider mt-16 bg-off-white">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink-light">
          <div>
            <p className="font-semibold text-ink mb-1">Halalify</p>
            <p>{t.footerDesc}</p>
          </div>
          <div className="text-xs text-ink-light/70 sm:text-right">
            <p>{t.footerData}</p>
            <p className="mt-1">{t.footerDisclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
