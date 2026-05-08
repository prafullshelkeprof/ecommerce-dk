import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Din Butik – Kvalitetsvarer leveret til din dør",
    template: "%s | Din Butik",
  },
  description:
    "Oplev vores udvalg af kvalitetsprodukter. Hurtig levering i hele Danmark. Fri fragt ved køb over 499 kr.",
  keywords: ["online shopping", "Danmark", "kvalitetsvarer", "fri fragt"],
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "Din Butik",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
