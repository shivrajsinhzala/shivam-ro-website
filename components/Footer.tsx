import React from "react";
import Link from "next/link";
import { User, PhoneCall, MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link href="/" className="logo-area">
              <img src="/assets/logo_without_bg.webp" alt="Shivam Water Solution Logo" className="footer-logo" loading="lazy" width="48" height="48" style={{ objectFit: "contain" }} />
              <div className="brand-text">
                <span className="brand-name">Shivam Water</span>
                <span className="brand-sub">Solution</span>
              </div>
            </Link>
            <p className="mt-4 brand-desc">
              Providing pure, sweet, and mineral-balanced drinking water to thousands of homes and ceramic factories in Morbi & Rajkot. Quality and service are our priorities.
            </p>
            <div className="footer-social mt-4">
              <a href="https://www.instagram.com/shivam_enterprise7691" target="_blank" rel="noopener noreferrer" aria-label="Instagram Account Link" className="social-instagram" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "18px", height: "18px" }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="tel:+919173096727" aria-label="Call Dilip Bhai Directly" className="social-phone" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={18} />
              </a>
              <a href="https://wa.me/919173096727" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat Link" className="social-whatsapp" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg className="icon-whatsapp-svg" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/#services">Our Services</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/#about">Why Us</Link>
              </li>
              <li>
                <Link href="/#faq">FAQs</Link>
              </li>
              <li>
                <Link href="/blogs">Water Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-details">
            <h3>Contact Details</h3>
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <User className="text-turquoise" size={20} />
                <div>
                  <p className="detail-title">Proprietor</p>
                  <p className="detail-val">Dilip Bhai</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <PhoneCall className="text-turquoise" size={20} />
                <div>
                  <p className="detail-title">Phone & WhatsApp</p>
                  <a href="tel:+919173096727" className="detail-val link-val">+91 91730 96727</a>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <MapPin className="text-turquoise" size={20} />
                <div>
                  <p className="detail-title">Shop Address</p>
                  <p className="detail-val address-val">
                    Vajepar Main Road, Morbi - 363641, Gujarat, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="footer-map">
            <h3>Business Hours</h3>
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <Clock className="text-turquoise" size={20} />
                <div>
                  <p className="detail-title">Timings</p>
                  <p className="detail-val">
                    Monday - Saturday: 9:00 AM - 8:00 PM <br />(Sunday Closed)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Block */}
        <div className="map-section-wrap mt-5">
          <div className="map-wrapper glass-card">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.821463678999!2d70.83242697530754!3d22.809078479324032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598d5f9d856441%3A0x317caa3f96024cbc!2sShivam%20RO%20Purifier!5e0!3m2!1sen!2sin!4v1782314579450!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Shivam RO Purifier - Google Maps location in Morbi">
            </iframe>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="footer-bottom text-center mt-5">
          <p className="copyright-text">
            &copy; 2026 Shivam Water Solution. All Rights Reserved. | Designed by <a href="https://shivrajsinh.in" target="_blank" rel="noopener noreferrer" className="designer-link">Shivrajsinh.in</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
