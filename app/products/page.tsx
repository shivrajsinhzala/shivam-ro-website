import React from "react";
import type { Metadata } from "next";
import ProductsGrid from "@/components/ProductsGrid";

export const metadata: Metadata = {
  title: "Our RO Purifier Catalog - Shivam Water Solution Morbi",
  description: "Browse and search through 18+ premium domestic, commercial, and under-sink RO water purifiers by Shivam Water Solution. Find the perfect filter for your home or factory in Morbi & Rajkot.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Our RO Purifier Catalog - Shivam Water Solution Morbi",
    description: "Browse and search through 18+ premium domestic, commercial, and under-sink RO water purifiers by Shivam Water Solution. Find the perfect filter for your home or factory in Morbi & Rajkot.",
    url: "https://shivamwatersolution.in/products",
    images: [
      {
        url: "/assets/logo_with_bg.png",
        width: 1200,
        height: 630,
        alt: "Shivam Water Solution Catalog",
      },
    ],
  },
};

export default function ProductsPage() {
  return (
    <div className="products-detail-page">
      <ProductsGrid />
    </div>
  );
}
