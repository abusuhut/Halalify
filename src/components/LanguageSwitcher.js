"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const LANGS = ["en", "ko", "uz"];

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-green-mid/30 backdrop-blur rounded-xl p-1">
      {LANGS.map((l) => {
        const t = translations[l];
        const isActive = lang === l;
        return (
          <button
            key={l}
            onClick={() => changeLanguage(l)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? "bg-gold text-green-deep shadow-sm"
                : "text-cream/60 hover:text-cream"
            }`}
          >
            <span>{t.flag}</span>
            <span className="hidden sm:inline">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
}
