"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CertifyForm({ barcode, currentStatus, currentNote }) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(currentNote || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

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
      setMessage("✅ Saved successfully");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage("❌ " + (data.error || "Something went wrong."));
    }
  }

  return (
    <div className="card border-teal/20 bg-teal-pale mt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-teal mb-4">
        🔧 Moderator controls
      </p>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-ink mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-line rounded-xl px-3 py-2.5 text-sm mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal/40"
        >
          <option value="not_certified">⚠️ Not Certified</option>
          <option value="halal_certified">✅ Halal Certified</option>
          <option value="haram">❌ Haram (manual override)</option>
        </select>

        <label className="block text-sm font-medium text-ink mb-1">
          Certificate reference (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full border border-line rounded-xl px-3 py-2.5 text-sm mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal/40"
          placeholder="e.g. Korea Muslim Federation certificate #1234"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-teal text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-light transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>

        {message && (
          <p className="text-sm text-ink/70 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}