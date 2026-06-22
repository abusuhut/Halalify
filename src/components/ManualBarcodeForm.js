"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManualBarcodeForm() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/product/${trimmed}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        inputMode="numeric"
        placeholder="e.g. 8801234567890"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-line rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal bg-off-white"
      />
      <button
        type="submit"
        className="bg-teal text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-light transition-colors"
      >
        Check
      </button>
    </form>
  );
}