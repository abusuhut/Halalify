"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <form onSubmit={handleSubmit} className="max-w-sm">
      <label className="block text-sm font-medium mb-1">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-line rounded-md px-3 py-2 text-sm mb-3 bg-white"
      />
      <label className="block text-sm font-medium mb-1">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border border-line rounded-md px-3 py-2 text-sm mb-4 bg-white"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-teal text-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-light disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
      {error && <p className="text-sm text-stamp-red mt-3">{error}</p>}
    </form>
  );
}
