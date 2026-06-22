import Link from "next/link";
import { createServerSupabase } from "@/lib/supabaseServer";
import { createAdminClient } from "@/lib/supabaseAdmin";
import LoginForm from "@/components/LoginForm";
import SignOutButton from "@/components/SignOutButton";
import StatusStamp from "@/components/StatusStamp";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="max-w-sm mx-auto px-5 py-16">
        <div className="text-center mb-8">
          <p className="text-3xl mb-2">🔐</p>
          <h1 className="font-display text-2xl text-ink font-semibold mb-1">
            Moderator sign in
          </h1>
          <p className="text-sm text-ink-light">
            Accounts are created by the site admin only
          </p>
        </div>
        <div className="card shadow-sm">
          <LoginForm />
        </div>
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
      <div className="max-w-sm mx-auto px-5 py-16 text-center">
        <p className="text-3xl mb-3">🚫</p>
        <h1 className="font-display text-2xl text-haram font-semibold mb-2">
          Not authorized
        </h1>
        <p className="text-sm text-ink-light mb-4">
          Signed in as {user.email}, but this account isn&apos;t a moderator.
        </p>
        <SignOutButton />
      </div>
    );
  }

  const admin = createAdminClient();
  const { data: recent } = await admin
    .from("products")
    .select("barcode, product_name, status, updated_at")
    .order("updated_at", { ascending: false })
    .limit(20);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink font-semibold">
            Moderator dashboard
          </h1>
          <p className="text-sm text-ink-light mt-0.5">
            {user.email} · <span className="capitalize">{moderatorRow.role}</span>
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="card shadow-sm mb-6">
        <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <span>🔍</span> Look up a product by barcode
        </p>
        <ManualBarcodeForm />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-ink-light mb-3">
        Recently scanned products
      </p>
      <div className="card shadow-sm overflow-hidden p-0">
        {(recent || []).length === 0 ? (
          <p className="px-5 py-8 text-sm text-ink-light text-center">
            No products scanned yet.
          </p>
        ) : (
          <div className="divide-y divide-line">
            {(recent || []).map((p) => (
              <Link
                key={p.barcode}
                href={`/product/${p.barcode}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-off-white transition-colors text-sm"
              >
                <span className="text-ink font-medium truncate mr-4">
                  {p.product_name || (
                    <span className="text-ink-light font-mono">{p.barcode}</span>
                  )}
                </span>
                <StatusStamp status={p.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}