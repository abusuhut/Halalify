"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function BarcodeScanner() {
  const router = useRouter();
  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
      const scanner = scannerRef.current;
      if (scanner && isRunningRef.current) {
        isRunningRef.current = false;
        scanner.stop().catch(() => {});
      }
    };
  }, []);

  // iOS Safari refuses to start the camera unless it's triggered directly
  // by a user tap — so we wait for a button press instead of auto-starting.
  async function handleStartCamera() {
    setError(null);
    setStarted(true);

    try {
      const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import(
        "html5-qrcode"
      );
      if (!containerRef.current) return;

      const scanner = new Html5Qrcode(containerRef.current.id, {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.QR_CODE,
        ],
        verbose: false,
      });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 280, height: 180 },
        },
        (decodedText) => {
          isRunningRef.current = false;
          scanner
            .stop()
            .catch(() => {})
            .finally(() => {
              router.push(`/product/${decodedText}`);
            });
        },
        () => {
          // per-frame "not found yet" callback — ignore, this fires constantly
        }
      );
      isRunningRef.current = true;
      setScanning(true);
    } catch (e) {
      setError(
        "Couldn't access the camera. Check camera permissions in your phone's Settings app, or enter the barcode manually below."
      );
      setStarted(false);
    }
  }

  return (
    <div>
      <div
        id="barcode-reader"
        ref={containerRef}
        className="w-full aspect-[4/3] bg-ink/5 rounded-lg overflow-hidden border border-line flex items-center justify-center"
      >
        {!started && (
          <button
            onClick={handleStartCamera}
            className="bg-teal text-paper px-5 py-3 rounded-md text-sm font-medium hover:bg-teal-light"
          >
            Tap to start camera
          </button>
        )}
      </div>
      {error && <p className="text-sm text-stamp-red mt-3">{error}</p>}
      {started && !error && !scanning && (
        <p className="text-sm text-ink/50 mt-3">Starting camera…</p>
      )}
    </div>
  );
}