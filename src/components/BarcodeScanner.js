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

  useEffect(() => {
    let isMounted = true;

    async function safeStop() {
      const scanner = scannerRef.current;
      if (scanner && isRunningRef.current) {
        isRunningRef.current = false;
        try {
          await scanner.stop();
        } catch {
          // Camera may already be stopped/torn down — safe to ignore.
        }
      }
    }

    async function start() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (!isMounted || !containerRef.current) return;

        const scanner = new Html5Qrcode(containerRef.current.id);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
          },
          (decodedText) => {
            // Found a barcode — stop and navigate to the product page
            safeStop().finally(() => {
              router.push(`/product/${decodedText}`);
            });
          },
          () => {
            // per-frame "not found yet" callback — ignore, this fires constantly
          }
        );
        isRunningRef.current = true;
        if (isMounted) setScanning(true);
      } catch (e) {
        if (isMounted) {
          setError(
            "Couldn't access the camera. Check camera permissions, or enter the barcode manually below."
          );
        }
      }
    }

    start();

    return () => {
      isMounted = false;
      safeStop();
    };
  }, [router]);

  return (
    <div>
      <div
        id="barcode-reader"
        ref={containerRef}
        className="w-full aspect-[4/3] bg-ink/5 rounded-lg overflow-hidden border border-line"
      />
      {error && <p className="text-sm text-stamp-red mt-3">{error}</p>}
      {!error && !scanning && (
        <p className="text-sm text-ink/50 mt-3">Starting camera…</p>
      )}
    </div>
  );
}