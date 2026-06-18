import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCartCount } from "@/lib/cart";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Temir | Modern Clothing for Every Generation",
    template: "%s | Temir",
  },
  description:
    "Discover stylish, comfortable clothing for children, teenagers, youths, and adults. Shop new arrivals and exclusive promotions at Temir.",
  keywords: ["Temir", "clothing", "fashion", "kids wear", "adult fashion", "Nigeria"],
  openGraph: {
    title: "Temir | Modern Clothing for Every Generation",
    description: "Premium fashion for the whole family.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cartCount = 0;
  try {
    cartCount = await getCartCount();
  } catch {
    cartCount = 0;
  }

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <Navbar cartCount={cartCount} />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
