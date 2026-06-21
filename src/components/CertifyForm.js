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
      setMessage("Saved.");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error || "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line rounded-lg p-5 bg-white/50 mt-6"
    >
      <p className="text-xs uppercase tracking-widest text-teal font-medium mb-3">
        Moderator controls
      </p>

      <label className="block text-sm font-medium mb-1">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border border-line rounded-md px-3 py-2 text-sm mb-3 bg-white"
      >
        <option value="not_certified">Not Certified</option>
        <option value="halal_certified">Halal Certified</option>
        <option value="haram">Haram (manual override)</option>
      </select>

      <label className="block text-sm font-medium mb-1">
        Certificate note (e.g. issuing body, reference number)
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className="w-full border border-line rounded-md px-3 py-2 text-sm mb-3 bg-white"
        placeholder="e.g. Korea Muslim Federation certificate #1234"
      />

      <button
        type="submit"
        disabled={saving}
        className="bg-teal text-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-light disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>

      {message && <p className="text-sm text-ink/60 mt-2">{message}</p>}
    </form>
  );
}
