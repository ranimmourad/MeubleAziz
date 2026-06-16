import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { CatalogProvider } from "@/context/CatalogContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Meuble Aziz — Meubles & Décoration sur mesure",
  description:
    "Meuble Aziz : meubles TV modernes, cuisines sur mesure, dressings, coiffeuses, chambres et meubles muraux. L'élégance de votre intérieur, notre passion.",
  icons: { icon: "/images/brand/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${cormorant.variable} font-sans antialiased`}>
        <CatalogProvider>
          <StoreProvider>{children}</StoreProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
