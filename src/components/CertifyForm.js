"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CertifyForm({ barcode, currentStatus, currentNote }) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(currentNote || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const { t } = useLanguage();

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode, status, certificateNote: note }),
    });

    setSaving(false);

    if (res.ok) {
      setMessage(t.savedSuccess);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage("❌ " + (data.error || "Something went wrong."));
    }
  }

  return (
    <div className="card border-green-mid/20 bg-green-pale mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green-mid mb-4">
        🔧 {t.moderatorControls}
      </p>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-ink mb-1">{t.status}</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-line rounded-xl px-3 py-2.5 text-sm mb-3 bg-cream focus:outline-none focus:ring-2 focus:ring-green-mid/30"
        >
          <option value="not_certified">⚠️ {t.notCertified}</option>
          <option value="halal_certified">✅ {t.halalCertified}</option>
          <option value="haram">❌ {t.haram} (manual override)</option>
        </select>

        <label className="block text-sm font-medium text-ink mb-1">{t.certNote}</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full border border-line rounded-xl px-3 py-2.5 text-sm mb-3 bg-cream focus:outline-none focus:ring-2 focus:ring-green-mid/30"
          placeholder={t.certPlaceholder}
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-green-deep text-cream px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-mid transition-colors disabled:opacity-50 shadow-sm"
        >
          {saving ? t.saving : t.saveChanges}
        </button>

        {message && <p className="text-sm text-ink-mid mt-2">{message}</p>}
      </form>
    </div>
  );
}
