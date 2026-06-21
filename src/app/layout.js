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
  title: "Halal Scan Korea — barcode halal checker",
  description:
    "Scan a barcode to check if a product sold in Korea contains haram ingredients.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${notoKR.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <header className="cert-rule border-b-2 border-teal">
          <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
            <Link href="/" className="font-display text-xl tracking-tight text-teal">
              Halal Scan <span className="text-stamp-amber">Korea</span>
            </Link>
            <nav className="text-sm font-medium">
              <Link href="/admin" className="text-teal/70 hover:text-teal">
                Moderator
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="cert-rule border-t border-line mt-16">
          <div className="max-w-3xl mx-auto px-5 py-6 text-xs text-ink/50">
            Ingredient data from Open Food Facts. &ldquo;Not Certified&rdquo;
            means no haram ingredient was detected — it is not a halal
            guarantee.
          </div>
        </footer>
      </body>
    </html>
  );
}
