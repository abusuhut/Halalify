import { Fraunces, Inter, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Halalify — 할랄 스캐너 | Halal Scanner Korea",
  description:
    "Scan a barcode to check if a product contains haram ingredients. 바코드를 스캔하여 할랄 여부를 확인하세요. Mahsulotning halolligini tekshiring.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${fraunces.variable} ${inter.variable} ${notoKR.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <header className="border-b border-line bg-white sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              <span className="font-display text-xl font-semibold text-teal">
                Halalify
              </span>
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-ink-light hover:text-teal transition-colors"
            >
              Moderator
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="divider mt-16 bg-off-white">
          <div className="max-w-3xl mx-auto px-5 py-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink-light">
              <div>
                <p className="font-semibold text-ink mb-1">Halalify</p>
                <p>할랄 성분 검사기 · Halal ingredient checker · Halol tekshiruvchi</p>
              </div>
              <div className="text-xs text-ink-light/70 sm:text-right">
                <p>Data from Open Food Facts</p>
                <p className="mt-1">
                  &ldquo;Not Certified&rdquo; ≠ Halal guarantee
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}