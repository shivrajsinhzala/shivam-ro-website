import React from "react";
import type { Metadata } from "next";
import ReviewPageClient from "@/components/ReviewPageClient";

export const metadata: Metadata = {
  title: "Rate & Review Shivam Water Solution on Google ⭐⭐⭐⭐⭐",
  description: "Share your valuable 5-star review for Shivam Water Solution Morbi. Choose from quick templates or write your own review on Google Maps.",
  alternates: {
    canonical: "https://shivamwatersolution.in/review",
  },
  openGraph: {
    title: "Rate & Review Shivam Water Solution on Google ⭐⭐⭐⭐⭐",
    description: "Leave your 5-star review for Shivam Water Solution RO Purifier sales and service in Morbi & Rajkot.",
    url: "https://shivamwatersolution.in/review",
    siteName: "Shivam Water Solution",
    type: "website",
  },
};

export default function ReviewPage() {
  return <ReviewPageClient />;
}
