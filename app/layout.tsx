import type { Metadata } from "next";
import { Cormorant_Garamond, Roboto_Mono, Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Julie Ann Tiron | Aspiring Backend Developer · Cybersecurity Professional",
  description: "IT Student | Aspiring Cybersecurity Professional & Backend Developer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${robotoMono.variable}`}>{children}</body>
    </html>
  );
}