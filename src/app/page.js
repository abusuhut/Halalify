import BarcodeScanner from "@/components/BarcodeScanner";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-pale text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <span>🇰🇷</span>
          <span>Korea&apos;s Halal Product Scanner</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-ink font-semibold leading-tight mb-3">
          Is it <span className="text-teal">halal?</span>
        </h1>
        <p className="text-ink-light text-lg mb-1">
          바코드를 스캔하여 할랄 여부를 확인하세요
        </p>
        <p className="text-ink-light/70 text-sm">
          Mahsulot barkodini skanerlang va halolligini tekshiring
        </p>
      </div>

      <div className="card mb-4 shadow-sm">
        <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <span>📷</span>
          <span>Scan barcode · 바코드 스캔 · Barkod skanerlash</span>
        </p>
        <BarcodeScanner />
      </div>

      <div className="card mb-10 shadow-sm">
        <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
          <span>⌨️</span>
          <span>Enter manually · 직접 입력 · Qo&apos;lda kiritish</span>
        </p>
        <ManualBarcodeForm />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-4 bg-haram-pale border border-haram/20">
          <span className="status-badge haram mb-3 text-sm">❌ Haram</span>
          <p className="text-sm text-ink/70 mt-2">
            Contains a known haram ingredient (pork, alcohol, etc.)
          </p>
          <p className="text-xs text-ink/50 mt-1">돼지고기, 알코올 등 포함</p>
        </div>
        <div className="rounded-xl p-4 bg-amber-pale border border-amber/20">
          <span className="status-badge not_certified mb-3 text-sm">⚠️ Not Certified</span>
          <p className="text-sm text-ink/70 mt-2">
            No haram ingredient found, but no halal certificate on file.
          </p>
          <p className="text-xs text-ink/50 mt-1">할랄 인증 없음 — 안전 보장 아님</p>
        </div>
        <div className="rounded-xl p-4 bg-halal-pale border border-halal/20">
          <span className="status-badge halal_certified mb-3 text-sm">✅ Halal Certified</span>
          <p className="text-sm text-ink/70 mt-2">
            Verified halal by a moderator with a real certificate.
          </p>
          <p className="text-xs text-ink/50 mt-1">할랄 인증 확인됨</p>
        </div>
      </div>
    </div>
  );
}