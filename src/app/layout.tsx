import type { Metadata } from "next";
import { Allison, Baskervville, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

const baskervville = Baskervville({
  variable: "--font-baskervville",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const allison = Allison({
  variable: "--font-allison",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "DRESSCODE — Maison de stylisme",
    template: "%s — DRESSCODE",
  },
  description:
    "DRESSCODE, maison de stylisme : tenues sur-mesure, shootings photo et relookings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${baskervville.variable} ${inter.variable} ${allison.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-dc-bg font-sans text-dc-white antialiased">
        <CartProvider>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-dc-accent focus:px-4 focus:py-2 focus:text-dc-white"
          >
            Aller au contenu
          </a>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
