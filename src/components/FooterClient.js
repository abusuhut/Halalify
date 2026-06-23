"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FooterClient() {
  const { t } = useLanguage();

  return (
    <footer className="bg-green-deep geometric-bg mt-16">
      <div className="gold-line" />
      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="font-display text-xl text-cream font-semibold mb-1">Halalify</p>
            <p className="text-green-pale/60 text-sm">{t.footerDesc}</p>
          </div>
          <div className="text-right">
            <Link href="/admin" className="text-green-pale/50 hover:text-green-pale text-sm transition-colors">
              {t.moderator} →
            </Link>
            <p className="text-green-pale/40 text-xs mt-2">{t.footerData}</p>
            <p className="text-green-pale/40 text-xs mt-0.5">{t.footerDisclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
