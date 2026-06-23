"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const LANGS = ["en", "ko", "uz"];

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-warm-gray rounded-xl p-1">
      {LANGS.map((l) => {
        const t = translations[l];
        const isActive = lang === l;
        return (
          <button
            key={l}
            onClick={() => changeLanguage(l)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? "bg-white text-teal shadow-sm"
                : "text-ink-light hover:text-ink"
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
