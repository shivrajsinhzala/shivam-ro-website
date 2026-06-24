import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Water Quality, RO Maintenance & Health Advice - Shivam Water Solution",
  description: "Expert articles to help you keep your family safe with pure, healthy water. Learn about TDS levels, active copper cartridges, RO maintenance, and health tips in Morbi & Rajkot.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Water Quality, RO Maintenance & Health Advice - Shivam Water Solution",
    description: "Expert articles to help you keep your family safe with pure, healthy water. Learn about TDS levels, active copper cartridges, RO maintenance, and health tips in Morbi & Rajkot.",
    url: "https://shivamwatersolution.in/blogs",
    images: [
      {
        url: "/assets/logo_with_bg.png",
        width: 1200,
        height: 630,
        alt: "Shivam Water Solution Blogs",
      },
    ],
  },
};

export default function BlogsPage() {
  return (
    <div className="blog-detail-container mt-6">
      <div className="container">
        
        {/* Page Hero Header */}
        <div className="blog-page-header text-center" style={{ marginBottom: "50px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 800, marginBottom: "12px", color: "var(--text-light-1)" }}>
            Water Quality, RO Maintenance & Health Advice
          </h1>
          <p className="section-desc">
            Expert articles to help you keep your family safe with pure, healthy water.
          </p>
        </div>

        {/* Blog Articles Feed */}
        <div className="blog-articles-list" style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "800px", margin: "0 auto" }}>
          {blogs.map((blog) => (
            <article key={blog.slug} className="blog-article-card glass-card" style={{ padding: "30px" }}>
              <div className="article-meta" style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
                <span className="meta-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-light-3)" }}>
                  <Calendar size={14} /> 
                  {blog.date}
                </span>
                <span className="meta-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-light-3)" }}>
                  <User size={14} /> 
                  By {blog.author}
                </span>
                <span className="meta-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-light-3)" }}>
                  <Clock size={14} /> 
                  {blog.readTime}
                </span>
              </div>
              
              <h2 className="article-title" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, marginBottom: "12px" }}>
                <Link href={`/blogs/${blog.slug}`} className="blog-title-link">
                  {blog.title}
                </Link>
              </h2>
              
              <div className="article-body" style={{ color: "var(--text-light-2)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "20px" }}>
                {blog.summary}
              </div>
              
              <div className="article-cta" style={{ borderTop: "none", paddingTop: 0, marginTop: "16px" }}>
                <Link href={`/blogs/${blog.slug}`} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Read Full Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center" style={{ marginTop: "40px", marginBottom: "40px" }}>
          <Link href="/" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}
