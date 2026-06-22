"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-ink-light hover:text-haram transition-colors border border-line px-3 py-1.5 rounded-lg"
    >
      Sign out
    </button>
  );
}