"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ManualBarcodeForm() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) router.push(`/product/${trimmed}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        inputMode="numeric"
        placeholder={t.manualPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-line rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-mid/30 focus:border-green-mid bg-ivory transition-colors"
      />
      <button
        type="submit"
        className="bg-green-deep text-cream px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-mid transition-colors shadow-sm"
      >
        {t.checkButton}
      </button>
    </form>
  );
}
