"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function BarcodeScanner() {
  const router = useRouter();
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

  // iOS requires the camera to be started directly from a user tap —
  // so we wait for a button press instead of auto-starting on page load.
  async function handleStartCamera() {
    setError(null);
    setStarted(true);
    hasNavigatedRef.current = false;

    try {
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const codeReader = new BrowserMultiFormatReader();

      const controls = await codeReader.decodeFromConstraints(
        {
          video: { facingMode: { ideal: "environment" } },
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
      setError(
        "Couldn't access the camera. Check camera permissions in your phone's Settings app, or enter the barcode manually below."
      );
      setStarted(false);
    }
  }

  return (
    <div>
      <div className="relative w-full aspect-[4/3] bg-ink/5 rounded-lg overflow-hidden border border-line flex items-center justify-center">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
        />
        {!started && (
          <button
            onClick={handleStartCamera}
            className="relative z-10 bg-teal text-paper px-5 py-3 rounded-md text-sm font-medium hover:bg-teal-light"
          >
            Tap to start camera
          </button>
        )}
        {started && !scanning && !error && (
          <p className="relative z-10 text-sm text-ink/50 bg-paper/80 px-3 py-1 rounded">
            Starting camera…
          </p>
        )}
      </div>
      {error && <p className="text-sm text-stamp-red mt-3">{error}</p>}
    </div>
  );
}