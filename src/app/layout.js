import { Fraunces, Inter, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterClient from "@/components/FooterClient";
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
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <LanguageProvider>
          {/* Header */}
          <header className="bg-green-deep border-b border-green-mid/30 sticky top-0 z-50">
            <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center text-base">
                  🔍
                </div>
                <span className="font-display text-xl font-semibold text-cream tracking-tight">
                  Halalify
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <Link
                  href="/admin"
                  className="text-sm font-medium text-green-pale/60 hover:text-green-pale transition-colors"
                >
                  Mod
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>
          <FooterClient />
        </LanguageProvider>
      </body>
    </html>
  );
}
