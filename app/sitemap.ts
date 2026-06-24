import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import productsData from "@/data/products.json";
import { getAllBlogSlugs } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shivamwatersolution.in";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
