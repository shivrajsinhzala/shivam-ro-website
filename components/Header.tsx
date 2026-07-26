'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Wrench, Droplet, Activity, ShieldCheck, HelpCircle, BookOpen, Mail } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Helper to determine if we should prefix with /
  const getLink = (hash: string) => {
    if (pathname === "/") {
      return hash;
    }
    return `/${hash}`;
  };

  const navLinks = [
    { label: "Services", href: getLink("#services"), icon: Wrench },
    { label: "Products", href: "/products", icon: Droplet },
    { label: "Why RO?", href: getLink("#purity"), icon: Activity },
    { label: "Why Us", href: getLink("#about"), icon: ShieldCheck },
    { label: "FAQs", href: getLink("#faq"), icon: HelpCircle },
    { label: "Blogs", href: "/blogs", icon: BookOpen },
    { label: "Contact", href: getLink("#contact"), icon: Mail },
  ];

  return (
    <>
      <header className="main-header">
        <div className="container header-container">
          <Link href="/" className="logo-area" onClick={closeMenu}>
            <img src="/assets/logo_horizontal_transparent.png" alt="Shivam Water Solution Logo" className="header-logo" width="220" height="50" style={{ width: "auto", objectFit: "contain" }} />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a href="tel:+919173096727" className="btn btn-outline btn-sm header-call-btn" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Phone size={14} />
              Call Now
            </a>
            
            <button className="menu-toggle-btn" aria-label="Toggle Navigation Menu" onClick={toggleMenu}>
              <Menu className="menu-icon" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`} onClick={(e) => {
        if (e.target === e.currentTarget) closeMenu();
      }}>
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <div className="logo-area">
              <img src="/assets/logo_horizontal_transparent.png" alt="Shivam Water Solution Logo" className="header-logo" width="160" height="36" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
            </div>
            <button className="close-menu-btn" aria-label="Close Menu" onClick={closeMenu}>
              <X size={20} />
            </button>
          </div>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.label} href={link.href} className="mobile-nav-link" onClick={closeMenu}>
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mobile-menu-actions">
            <a href="tel:+919173096727" className="btn btn-primary w-full text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <Phone size={16} />
              Call Dilip Bhai
            </a>
            <a 
              href="https://wa.me/919173096727?text=Hi%20Shivam%20Water%20Solution,%20I%20have%20an%20enquiry%20about%20your%20water%20filter%20services." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-center mt-3"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <svg className="icon-whatsapp-svg" viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
