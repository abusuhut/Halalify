"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-ink mb-1">{t.email}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-line rounded-xl px-4 py-2.5 text-sm bg-off-white focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">{t.password}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-line rounded-xl px-4 py-2.5 text-sm bg-off-white focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-light transition-colors disabled:opacity-50"
      >
        {loading ? "…" : t.signIn}
      </button>
      {error && <p className="text-sm text-haram">{error}</p>}
    </form>
  );
}
