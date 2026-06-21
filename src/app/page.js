import BarcodeScanner from "@/components/BarcodeScanner";
import ManualBarcodeForm from "@/components/ManualBarcodeForm";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <p className="text-xs uppercase tracking-widest text-stamp-amber font-medium mb-3">
        Scan before you buy
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-teal leading-tight mb-4">
        Is it halal? Scan the barcode.
      </h1>
      <p className="text-ink/70 max-w-xl mb-10">
        Point your camera at a product&apos;s barcode. We check the
        ingredients against known haram items. If we find nothing, we say so
        plainly — that&apos;s not the same as a halal guarantee.
      </p>

      <div className="grid sm:grid-cols-[1.2fr_1fr] gap-8 items-start">
        <BarcodeScanner />
        <div>
          <p className="text-sm font-medium text-ink/60 mb-2">
            Camera not working?
          </p>
          <ManualBarcodeForm />
        </div>
      </div>

      <div className="cert-rule mt-16 pt-8 grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-display text-stamp-red text-lg mb-1">Haram</p>
          <p className="text-ink/60">
            A known haram ingredient (pork, alcohol, etc.) was found.
          </p>
        </div>
        <div>
          <p className="font-display text-stamp-amber text-lg mb-1">
            Not Certified
          </p>
          <p className="text-ink/60">
            No haram ingredient found, but there&apos;s no halal certificate
            on file.
          </p>
        </div>
        <div>
          <p className="font-display text-stamp-green text-lg mb-1">
            Halal Certified
          </p>
          <p className="text-ink/60">
            Verified by a moderator against an actual halal certificate.
          </p>
        </div>
      </div>
    </div>
  );
}
