"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function StatusStamp({ status, size = "md" }) {
  const { t } = useLanguage();

  const STYLES = {
    haram: { icon: "❌", label: t.haram, className: "haram" },
    not_certified: { icon: "⚠️", label: t.notCertified, className: "not_certified" },
    halal_certified: { icon: "✅", label: t.halalCertified, className: "halal_certified" },
  };

  const style = STYLES[status] || STYLES.not_certified;
  const isLarge = size === "lg";

  return (
    <span className={`status-badge ${style.className} ${isLarge ? "text-lg px-5 py-2.5" : "text-sm"}`}>
      {style.icon} {style.label}
    </span>
  );
}
