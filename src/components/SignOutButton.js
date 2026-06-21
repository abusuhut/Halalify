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
      className="text-sm text-ink/50 hover:text-ink underline"
    >
      Sign out
    </button>
  );
}
