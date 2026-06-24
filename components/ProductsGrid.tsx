'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Droplet, Shield } from "lucide-react";
import productsData from "@/data/products.json";

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
  images?: string[];
  wa?: string;
}

export default function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState<Product[]>(productsData);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            name: p.name || p.name_en || "",
            badge: p.badge || p.badge_en || "",
            category: p.category || "domestic",
            tagline: p.tagline || p.tagline_en || "",
            capacity: p.capacity || p.capacity_en || "",
            warranty: p.warranty || p.warranty_en || "",
            description: p.description || p.description_en || "",
            features: p.features || p.features_en || [],
            images: p.images || [],
            wa: p.wa || `Hi Shivam Water Solution, I am interested in a price quote for the ${p.name_en || p.name} water purifier model.`,
          }));
          setProducts(mapped);
        }
      })
      .catch((err) => {
        console.warn("Using offline fallback products data:", err);
      });
  }, []);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matches = products
      .filter(p => {
        const matchesCat = activeCategory === "all" || p.category === activeCategory;
        const nameMatch = p.name.toLowerCase().includes(query.toLowerCase());
        return matchesCat && nameMatch;
      })
      .map(p => p.name)
      .slice(0, 5);

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      (p.tagline && p.tagline.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query) ||
      (p.capacity && p.capacity.toLowerCase().includes(query)) ||
      (p.features && p.features.some(f => f.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header Banner & Search */}
      <section className="products-search-section">
        <div className="container">
          <h1 className="text-gradient" style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 800, marginBottom: "8px" }}>
            Explore Our RO Purifiers
          </h1>
          <p className="section-desc" style={{ maxWidth: "650px", margin: "0 auto 30px" }}>
            Find and compare the best RO systems for your kitchen or commercial space. Search by model name or key purification technology.
          </p>

          {/* Dynamic Search Container with Autocomplete */}
          <div className="search-container" ref={searchContainerRef}>
            <div className="search-bar-wrap">
              <span className="search-icon-wrap">
                <Search style={{ width: "20px", height: "20px" }} />
              </span>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by name, features, technology..." 
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
              />
            </div>
            
            {/* Autocomplete Dropdown List */}
            {showSuggestions && (
              <div className="autocomplete-dropdown" style={{ display: "block" }}>
                {suggestions.map((name, idx) => (
                  <div 
                    key={idx} 
                    className="autocomplete-suggestion"
                    onClick={() => handleSuggestionClick(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="products-tabs" style={{ marginBottom: "40px" }}>
            <button 
              className={`tab-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setSuggestions([]);
              }}
            >
              All Products
            </button>
            <button 
              className={`tab-btn ${activeCategory === "domestic" ? "active" : ""}`}
              onClick={() => {
                setActiveCategory("domestic");
                setSearchQuery("");
                setSuggestions([]);
              }}
            >
              Domestic RO
            </button>
            <button 
              className={`tab-btn ${activeCategory === "commercial" ? "active" : ""}`}
              onClick={() => {
                setActiveCategory("commercial");
                setSearchQuery("");
                setSuggestions([]);
              }}
            >
              Commercial & UTC
            </button>
            <button 
              className={`tab-btn ${activeCategory === "spares" ? "active" : ""}`}
              onClick={() => {
                setActiveCategory("spares");
                setSearchQuery("");
                setSuggestions([]);
              }}
            >
              Filters & Spares
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid listing all 18 items */}
      <section className="products-section" style={{ paddingTop: 0 }}>
        <div className="container">
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
                <svg style={{ width: "48px", height: "48px", marginBottom: "16px", color: "var(--color-primary)", opacity: 0.6 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <h3 style={{ fontFamily: "var(--font-display)" }}>No Purifiers Found</h3>
                <p style={{ color: "var(--text-light-3)", marginTop: "8px" }}>We couldn&apos;t find any models matching your search. Try searching for &quot;Alkaline&quot;, &quot;Under Sink&quot;, or select another category tab.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
