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
        placeholder="Type barcode number (e.g. 8801234567890)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-line rounded-md px-3 py-2 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
      />
      <button
        type="submit"
        className="bg-teal text-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-light"
      >
        Look up
      </button>
    </form>
  );
}
