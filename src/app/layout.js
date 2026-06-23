import { Fraunces, Inter, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
        <LanguageProvider>
          <header className="border-b border-line bg-white sticky top-0 z-50">
            <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <span className="text-2xl">🔍</span>
                <span className="font-display text-xl font-semibold text-teal">
                  Halalify
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <Link
                  href="/admin"
                  className="text-sm font-medium text-ink-light hover:text-teal transition-colors hidden sm:block"
                >
                  Moderator
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

// Client footer that reads translations
import FooterClient from "@/components/FooterClient";
