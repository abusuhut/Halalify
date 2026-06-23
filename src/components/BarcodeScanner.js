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
    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
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
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
      ]);

      const codeReader = new BrowserMultiFormatReader(hints);

      const controls = await codeReader.decodeFromConstraints(
        {
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        },
        videoRef.current,
        (result) => {
          if (result && !hasNavigatedRef.current) {
            hasNavigatedRef.current = true;
            const barcode = result.getText();
            controlsRef.current?.stop();
            router.push(`/product/${barcode}`);
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
      <div className="relative w-full aspect-[4/3] bg-ink/5 rounded-xl overflow-hidden border border-line flex items-center justify-center">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        />
        {!started && (
          <button
            onClick={handleStartCamera}
            className="relative z-10 bg-teal text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-teal-light transition-colors"
          >
            {t.tapToStart}
          </button>
        )}
        {started && !scanning && !error && (
          <p className="relative z-10 text-sm text-ink/50 bg-white/80 px-3 py-1 rounded">
            {t.startingCamera}
          </p>
        )}
      </div>
      {error && <p className="text-sm text-haram mt-3">{error}</p>}
    </div>
  );
}
