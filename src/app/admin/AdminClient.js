"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import LoginForm from "@/components/LoginForm";
import SignOutButton from "@/components/SignOutButton";
import StatusStamp from "@/components/StatusStamp";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default function AdminClient({ user, moderatorRow, recent }) {
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="max-w-sm mx-auto px-5 py-16">
        <div className="text-center mb-8">
          <p className="text-3xl mb-2">🔐</p>
          <h1 className="font-display text-2xl text-ink font-semibold mb-1">
            {t.moderatorSignIn}
          </h1>
          <p className="text-sm text-ink-light">{t.adminOnly}</p>
        </div>
        <div className="card shadow-sm">
          <LoginForm />
        </div>
      </div>
    );
  }

  if (!moderatorRow) {
    return (
      <div className="max-w-sm mx-auto px-5 py-16 text-center">
        <p className="text-3xl mb-3">🚫</p>
        <h1 className="font-display text-2xl text-haram font-semibold mb-2">
          {t.notAuthorized}
        </h1>
        <p className="text-sm text-ink-light mb-4">
          {t.signedInAs} {user.email} — {t.notAuthorizedDesc}
        </p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink font-semibold">
            {t.moderatorDashboard}
          </h1>
          <p className="text-sm text-ink-light mt-0.5">
            {user.email} · <span className="capitalize">{moderatorRow.role}</span>
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="card shadow-sm mb-6">
        <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <span>🔍</span> {t.lookUpProduct}
        </p>
        <ManualBarcodeForm />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-ink-light mb-3">
        {t.recentlyScanned}
      </p>
      <div className="card shadow-sm overflow-hidden p-0">
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-sm text-ink-light text-center">
            {t.noProducts}
          </p>
        ) : (
          <div className="divide-y divide-line">
            {recent.map((p) => (
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
