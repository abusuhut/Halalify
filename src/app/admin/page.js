import Link from "next/link";
import { createServerSupabase } from "@/lib/supabaseServer";
import { createAdminClient } from "@/lib/supabaseAdmin";
import LoginForm from "@/components/LoginForm";
import SignOutButton from "@/components/SignOutButton";
import StatusStamp from "@/components/StatusStamp";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="max-w-sm mx-auto px-5 py-16">
        <h1 className="font-display text-2xl text-teal mb-1">
          Moderator sign in
        </h1>
        <p className="text-sm text-ink/60 mb-6">
          Accounts are created by the site admin in Supabase — there&apos;s
          no public sign-up.
        </p>
        <LoginForm />
      </div>
    );
  }

  const { data: moderatorRow } = await supabase
    .from("moderators")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!moderatorRow) {
    return (
      <div className="max-w-sm mx-auto px-5 py-16">
        <h1 className="font-display text-2xl text-stamp-red mb-2">
          Not authorized
        </h1>
        <p className="text-sm text-ink/60 mb-4">
          You&apos;re signed in as {user.email}, but this account isn&apos;t
          in the moderators list.
        </p>
        <SignOutButton />
      </div>
    );
  }

  // Recent products, for quick access
  const admin = createAdminClient();
  const { data: recent } = await admin
    .from("products")
    .select("barcode, product_name, status, updated_at")
    .order("updated_at", { ascending: false })
    .limit(20);

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl text-teal">
          Moderator dashboard
        </h1>
        <SignOutButton />
      </div>
      <p className="text-sm text-ink/60 mb-8">
        Signed in as {user.email} ({moderatorRow.role})
      </p>

      <p className="text-sm font-medium text-ink/60 mb-2">
        Jump to a product
      </p>
      <ManualBarcodeForm />

      <p className="text-xs uppercase tracking-widest text-ink/40 font-medium mt-10 mb-3">
        Recently scanned
      </p>
      <div className="divide-y divide-line border border-line rounded-lg overflow-hidden">
        {(recent || []).map((p) => (
          <Link
            key={p.barcode}
            href={`/product/${p.barcode}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-white/50 text-sm"
          >
            <span>
              {p.product_name || (
                <span className="text-ink/40 font-mono">{p.barcode}</span>
              )}
            </span>
            <StatusStamp status={p.status} />
          </Link>
        ))}
        {(!recent || recent.length === 0) && (
          <p className="px-4 py-6 text-sm text-ink/40">
            No products scanned yet.
          </p>
        )}
      </div>
    </div>
  );
}
