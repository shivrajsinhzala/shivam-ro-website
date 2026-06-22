'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Droplet, Shield } from "lucide-react";
import productsData from "@/data/products.json";

export default function FeaturedProducts() {
  const [filter, setFilter] = useState("all");

  const featuredIds = ["aqua-2090", "alica-pure", "aqua-touch", "olly-arise", "aqua-c3", "hi-flo"];
  
  // Filter products that are in our featuredIds list
  const featuredProducts = productsData.filter(p => featuredIds.includes(p.id));

  // Filter based on active tab
  const filteredProducts = featuredProducts.filter(p => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Explore Our Product Catalog</h2>
          <div className="heading-underline"></div>
          <p className="section-desc">
            Browse through 18 premium models from our brochure. Click any product to view its individual specifications page and request a custom quote.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="products-tabs">
          <button 
            className={`tab-btn ${filter === "all" ? "active" : ""}`} 
            onClick={() => setFilter("all")}
          >
            All Products
          </button>
          <button 
            className={`tab-btn ${filter === "domestic" ? "active" : ""}`} 
            onClick={() => setFilter("domestic")}
          >
            Domestic RO
          </button>
          <button 
            className={`tab-btn ${filter === "commercial" ? "active" : ""}`} 
            onClick={() => setFilter("commercial")}
          >
            Commercial & UTC
          </button>
          <button 
            className={`tab-btn ${filter === "spares" ? "active" : ""}`} 
            onClick={() => setFilter("spares")}
          >
            Filters & Spares
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((p) => {
            const imgSrc = (p.images && p.images[0]) ? p.images[0] : "/assets/product_domestic.webp";
            const waEnMsg = `Hi Shivam Water Solution, I am interested in a quote for the ${p.name} water purifier.`;
            const waUrl = `https://wa.me/919173096727?text=${encodeURIComponent(waEnMsg)}`;
            
            return (
              <div key={p.id} className="product-card glass-card" style={{ display: "flex" }}>
                {p.badge && (
                  <div className="product-badge">
                    <span>{p.badge}</span>
                  </div>
                )}
                <div className="product-img-wrap">
                  <img src={imgSrc} alt={p.name} loading="lazy" width="400" height="400" style={{ objectFit: "contain" }} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    <span>{p.name}</span>
                  </h3>
                  <p className="product-desc">
                    <span>{p.tagline}</span>
                  </p>
                  
                  <div className="product-card-specs">
                    <div className="spec-pill">
                      <Droplet size={14} />
                      <span>{p.capacity}</span>
                    </div>
                    <div className="spec-pill">
                      <Shield size={14} />
                      <span>{p.warranty}</span>
                    </div>
                  </div>

                  <div className="card-action-row">
                    <Link href={`/products/${p.id}`} className="btn btn-outline btn-sm">
                      <span>View Details</span>
                    </Link>
                    <a 
                      href={waUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-whatsapp btn-sm"
                      style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      <svg className="icon-whatsapp-svg icon-xs" viewBox="0 0 24 24" style={{ width: "14px", height: "14px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredProducts.length === 0 && (
            <div className="no-results" style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px" }}>
              <h3 style={{ fontFamily: "var(--font-display)" }}>No Featured Purifiers</h3>
              <p style={{ color: "var(--text-light-3)", marginTop: "8px" }}>
                There are no featured purifiers in this category. Click &quot;View All 18+ Models&quot; to browse our full selection.
              </p>
            </div>
          )}
        </div>

        <div className="explore-products-btn">
          <Link href="/products" className="btn btn-primary btn-lg">
            View All 18+ Models with Search &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
