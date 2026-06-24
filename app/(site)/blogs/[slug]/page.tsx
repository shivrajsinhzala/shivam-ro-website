import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { blogs, getBlogBySlug, getAllBlogSlugs } from "@/data/blogs";

// Generate static params for all blog slugs
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  return {
    title: blog.metaTitle,
    description: blog.metaDesc,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDesc,
      url: `https://shivamwatersolution.in/blogs/${slug}`,
      images: [
        {
          url: "/assets/logo_with_bg.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const waUrl = `https://wa.me/919173096727?text=${encodeURIComponent(blog.ctaWhatsAppMessage)}`;

  // Find prev/next blog objects for titles
  const prevBlog = blog.prevSlug ? getBlogBySlug(blog.prevSlug) : null;
  const nextBlog = blog.nextSlug ? getBlogBySlug(blog.nextSlug) : null;

  return (
    <div className="blog-detail-container mt-6">
      <div className="container">
        <div className="blog-articles-list" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <article className="blog-article-card glass-card" style={{ padding: "30px" }}>
            {/* Meta Tags */}
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

            {/* Article Title */}
            <h1 className="article-title" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginTop: 0, marginBottom: "24px", color: "var(--text-light-1)" }}>
              {blog.title}
            </h1>

            {/* Article Body */}
            <div
              className="article-body"
              style={{ color: "var(--text-light-2)", fontSize: "1rem", lineHeight: 1.75 }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* WhatsApp CTA */}
            <div className="article-cta" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", marginTop: "32px" }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <svg className="icon-whatsapp-svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}>
                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {blog.ctaText}
              </a>
            </div>
          </article>

        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "800px", margin: "40px auto" }}>
          {prevBlog ? (
            <Link href={`/blogs/${prevBlog.slug}`} className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ArrowLeft size={16} />
              Previous Article
            </Link>
          ) : (
            <span className="btn btn-outline" style={{ opacity: 0.5, cursor: "not-allowed", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ArrowLeft size={16} />
              Newest Article
            </span>
          )}

          <Link href="/blogs" className="btn btn-outline">
            All Blogs
          </Link>

          {nextBlog ? (
            <Link href={`/blogs/${nextBlog.slug}`} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Next Article
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span className="btn btn-outline" style={{ opacity: 0.5, cursor: "not-allowed", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Oldest Article
              <ArrowRight size={16} />
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
