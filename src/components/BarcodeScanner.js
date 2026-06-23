"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BarcodeScanner() {
  const router = useRouter();
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const hasNavigatedRef = useRef(false);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    return () => { if (controlsRef.current) controlsRef.current.stop(); };
  }, []);

  async function handleStartCamera() {
    setError(null);
    setStarted(true);
    hasNavigatedRef.current = false;

    try {
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const { BarcodeFormat, DecodeHintType } = await import("@zxing/library");

      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.EAN_13, BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A, BarcodeFormat.UPC_E,
      ]);

      const codeReader = new BrowserMultiFormatReader(hints);
      const controls = await codeReader.decodeFromConstraints(
        { video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false },
        videoRef.current,
        (result) => {
          if (result && !hasNavigatedRef.current) {
            hasNavigatedRef.current = true;
            controlsRef.current?.stop();
            router.push(`/product/${result.getText()}`);
          }
        }
      );
      controlsRef.current = controls;
      setScanning(true);
    } catch (e) {
      setError(t.cameraError);
      setStarted(false);
    }
  }

  return (
    <div>
      <div className="relative w-full aspect-[4/3] bg-ivory-dark rounded-xl overflow-hidden border border-line flex items-center justify-center">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
        {!started && (
          <button
            onClick={handleStartCamera}
            className="relative z-10 bg-green-deep text-cream px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-mid transition-colors shadow-md flex items-center gap-2"
          >
            <span>📷</span> {t.tapToStart}
          </button>
        )}
        {started && !scanning && !error && (
          <p className="relative z-10 text-sm text-ink-light bg-cream/90 px-4 py-2 rounded-lg shadow-sm">
            {t.startingCamera}
          </p>
        )}
        {scanning && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-28 border-2 border-gold rounded-lg opacity-70" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-haram mt-3 bg-haram-pale px-3 py-2 rounded-lg">{error}</p>}
    </div>
  );
}
