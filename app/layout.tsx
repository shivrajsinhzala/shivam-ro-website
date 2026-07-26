import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import CacheBuster from "@/components/CacheBuster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Water Solution - Best RO Service & Repair in Morbi & Rajkot",
  description: "Professional RO water filter sales, installation, AMC, and repair services in Morbi, Rajkot, and Gujarat. Certified technicians, genuine parts, and fast 24h installation.",
  keywords: [
    "RO Service in Morbi",
    "Best RO Service in Morbi",
    "RO Repair Morbi",
    "Water Purifier Repair Morbi",
    "RO Installation Morbi",
    "RO Water Filter Shop Morbi",
    "RO AMC Morbi",
    "RO Technician Morbi",
    "Commercial RO Plant Morbi",
    "RO Service Rajkot",
    "RO Repair Rajkot",
    "Best RO Repair in Rajkot",
    "Water Purifier Service Rajkot",
    "Water Purifier Repair Rajkot",
    "Doorstep RO Service Rajkot"
  ],
  metadataBase: new URL("https://shivamwatersolution.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/assets/logo.png" }
    ]
  },
  openGraph: {
    title: "Shivam Water Solution - Best RO Service & Repair in Morbi & Rajkot",
    description: "Professional RO water filter sales, installation, AMC, and repair services in Morbi, Rajkot, and Gujarat. Certified technicians, genuine parts, and fast 24h installation.",
    url: "https://shivamwatersolution.in",
    siteName: "Shivam Water Solution",
    images: [
      {
        url: "/assets/logo_with_bg.png",
        width: 1200,
        height: 630,
        alt: "Shivam Water Solution",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <CacheBuster />
        {children}
      </body>
    </html>
  );
}
