'use client';

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import productsData from "@/data/products.json";

export default function FloatingCTAs() {
  const pathname = usePathname();
  const [waUrl, setWaUrl] = useState("https://wa.me/919173096727?text=Hello%20Shivam%20Water%20Solution%20(Dilipbhai),%20I%20would%20like%20to%20inquire%20about%20RO%20purifier%20sales,%20doorstep%20servicing,%20or%20repair.");

  useEffect(() => {
    if (!pathname) return;

    // Check if on a specific product detail page: /products/[id]
    const match = pathname.match(/\/products\/([^\/]+)/);
    if (match && match[1]) {
      const prodId = match[1];
      const product = productsData.find((p) => p.id === prodId);
      const prodUrl = `https://shivamwatersolution.in/products/${prodId}`;
      
      if (product) {
        const msg = `Hello Shivam Water Solution (Dilipbhai),\n\nI am interested in inquiring about the *${product.name}* ${product.category === 'commercial' ? 'Commercial RO Plant' : product.category === 'spares' ? 'Filter Spare Part' : 'RO Water Purifier'}.\n\n*Model Specs:* ${product.capacity || 'Standard Capacity'} | ${product.warranty || '1 Year Warranty'}\n*Services:* Free Delivery & Free Installation in Morbi / Rajkot\n\n*Product Details & Photo Link:* ${prodUrl}`;
        setWaUrl(`https://wa.me/919173096727?text=${encodeURIComponent(msg)}`);
        return;
      } else {
        const msg = `Hello Shivam Water Solution (Dilipbhai),\n\nI am viewing this product model on your website and would like to inquire:\n\n*Product Details & Photo Link:* ${prodUrl}`;
        setWaUrl(`https://wa.me/919173096727?text=${encodeURIComponent(msg)}`);
        return;
      }
    }

    // Check if on the main products catalog listing page: /products
    if (pathname.startsWith("/products")) {
      const msg = `Hello Shivam Water Solution (Dilipbhai),\n\nI am browsing your RO Water Purifiers & Commercial Plants catalog on your website (https://shivamwatersolution.in/products) and would like to inquire about pricing and models.`;
      setWaUrl(`https://wa.me/919173096727?text=${encodeURIComponent(msg)}`);
      return;
    }

    // Default Home / General page message
    const defaultMsg = `Hello Shivam Water Solution (Dilipbhai),\n\nI would like to inquire about RO purifier sales, doorstep servicing, or repair in Morbi / Rajkot.`;
    setWaUrl(`https://wa.me/919173096727?text=${encodeURIComponent(defaultMsg)}`);
  }, [pathname]);

  return (
    <div className="floating-ctas">
      <a 
        href="tel:+919173096727" 
        className="floating-btn float-call" 
        aria-label="Call Dilip Bhai Now" 
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
      >
        <Phone size={18} />
        <span>Call Now</span>
      </a>
      <a 
        href={waUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-btn float-whatsapp" 
        aria-label="WhatsApp Chat Now"
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
      >
        <svg className="icon-whatsapp-svg fill-current" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
