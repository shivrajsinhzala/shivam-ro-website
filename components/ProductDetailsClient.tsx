'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Phone, Package, Shield, ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  badge?: string;
  category: string;
  tagline?: string;
  capacity?: string;
  warranty?: string;
  description?: string;
  features?: string[];
  specs?: Record<string, string>;
  images?: string[];
  wa?: string;
}

export default function ProductDetailsClient({ initialProduct }: { initialProduct: Product }) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    setProduct(initialProduct);
    setActiveImageIndex(0);
  }, [initialProduct]);

  const images = product.images && product.images.length > 0 ? product.images : ["/assets/product_domestic.webp"];
  const safeIndex = activeImageIndex >= 0 && activeImageIndex < images.length ? activeImageIndex : 0;
  const imgSrc = images[safeIndex];
  const waUrl = `https://wa.me/919173096727?text=${encodeURIComponent(product.wa || `Hi Shivam Water Solution, I am interested in a quote for the ${product.name} water purifier.`)}`;

  const displayCategory = product.category === "domestic" 
    ? "Domestic RO" 
    : product.category === "commercial" 
    ? "Commercial & UTC" 
    : product.category === "spares"
    ? "Filters & Spares"
    : (product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Water Purifier");

  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: "24px" }}>
          <Link 
            href="/products" 
            className="announce-link" 
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            Back to Products Catalog
          </Link>
        </div>

        <div className="product-detail-grid">
          {/* Left: Product Image & Gallery */}
          <div className="product-gallery-container">
            <div className="product-image-section glass-card">
              <img 
                src={imgSrc} 
                alt={product.name} 
                className="main-detail-img" 
                width="400" 
                height="400" 
                style={{ objectFit: "contain", display: "block", margin: "0 auto" }}
                fetchPriority="high"
              />
            </div>
            {images.length > 1 && (
              <div className="product-thumbnails-grid">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`product-thumbnail-btn glass-card ${idx === safeIndex ? 'active' : ''}`}
                    aria-label={`View product image ${idx + 1}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`} 
                      className="product-thumbnail-img"
                      width="80"
                      height="80"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/assets/product_domestic.webp"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="product-info-section">
            <span className="category-tag">
              <span>{displayCategory}</span>
            </span>
            
            <h1 className="product-title-detail" style={{ fontFamily: "var(--font-display)" }}>
              <span>{product.name}</span>
            </h1>

            <p className="product-tagline-detail">
              <span>{product.tagline}</span>
            </p>

            <div className="key-badges">
              <div className="key-badge">
                <Package className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                <span>
                  <span>Capacity: {product.capacity}</span>
                </span>
              </div>
              <div className="key-badge">
                <Shield className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                <span>
                  <span>Warranty: {product.warranty}</span>
                </span>
              </div>
            </div>

            <p className="product-desc-detail">
              <span>{product.description}</span>
            </p>

            {product.features && product.features.length > 0 && (
              <>
                <h3 className="features-head-detail">
                  <span>Key Features</span>
                </h3>
                <ul className="features-list-detail">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "8px", verticalAlign: "middle" }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="action-buttons-detail">
              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg w-full justify-center"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <svg className="icon-whatsapp-svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Inquire / Order on WhatsApp</span>
              </a>
              <a 
                href="tel:+919173096727" 
                className="btn btn-outline btn-lg w-full justify-center mt-3"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Phone size={18} />
                <span>Call Dilip Bhai Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="specs-section-detail glass-card mt-5">
            <h2 className="specs-title-detail" style={{ fontFamily: "var(--font-display)" }}>
              <span>Technical Specifications</span>
            </h2>
            <div className="specs-table-wrapper">
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
