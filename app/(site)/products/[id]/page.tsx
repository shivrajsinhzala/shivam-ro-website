import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductDetailsClient from "@/components/ProductDetailsClient";

// Next.js static params generation
export async function generateStaticParams() {
  return productsData.map((p) => ({
    id: p.id,
  }));
}

// Generate dynamic metadata for Open Graph & WhatsApp Link Previews
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);
  if (!product) return {};

  const baseUrl = "https://shivamwatersolution.in";
  let rawImg = product.images?.[0] || "/assets/product_domestic.webp";
  let cleanAssetImg = rawImg.replace("/api/images/products/", "/assets/");
  let absoluteImg = cleanAssetImg.startsWith("http") 
    ? cleanAssetImg 
    : `${baseUrl}${cleanAssetImg.startsWith("/") ? "" : "/"}${cleanAssetImg}`;

  const isJpg = absoluteImg.endsWith(".jpg") || absoluteImg.endsWith(".jpeg");
  const imgMimeType = isJpg ? "image/jpeg" : absoluteImg.endsWith(".webp") ? "image/webp" : "image/png";

  const title = product.meta_title || `${product.name} RO Water Purifier | Shivam Water Solution Morbi`;
  const description = product.meta_desc || `${product.tagline || product.description || ''} • ${product.capacity || '10L Storage'} • ${product.warranty || '1 Year Warranty'}. Free installation & home delivery across Morbi & Rajkot.`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${baseUrl}/products/${id}`,
    },
    openGraph: {
      title: `${product.name} | Shivam Water Solution Morbi`,
      description: description,
      url: `${baseUrl}/products/${id}`,
      siteName: "Shivam Water Solution - Morbi & Rajkot",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: absoluteImg,
          secureUrl: absoluteImg,
          type: imgMimeType,
          width: 800,
          height: 800,
          alt: `${product.name} RO Water Purifier photo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Shivam Water Solution`,
      description: description,
      images: [absoluteImg],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const mappedProduct = {
    id: product.id,
    name: product.name,
    badge: product.badge,
    category: product.category,
    tagline: product.tagline,
    capacity: product.capacity,
    warranty: product.warranty,
    description: product.description,
    features: product.features,
    specs: (product.specs || {}) as unknown as Record<string, string>,
    images: product.images,
    wa: product.wa,
  };

  return <ProductDetailsClient initialProduct={mappedProduct} />;
}
