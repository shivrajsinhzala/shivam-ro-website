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

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);
  if (!product) return {};

  return {
    title: product.meta_title || `${product.name} - Shivam Water Solution Morbi`,
    description: product.meta_desc || product.description,
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: product.meta_title || `${product.name} - Shivam Water Solution Morbi`,
      description: product.meta_desc || product.description,
      url: `https://shivamwatersolution.in/products/${id}`,
      images: [
        {
          url: product.images?.[0] || "/assets/product_domestic.webp",
          width: 400,
          height: 400,
          alt: product.name,
        },
      ],
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
    specs: product.specs,
    images: product.images,
    wa: product.wa,
  };

  return <ProductDetailsClient initialProduct={mappedProduct} />;
}
