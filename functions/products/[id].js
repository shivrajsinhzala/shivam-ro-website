// functions/products/[id].js
// Dynamic fallback for any product in D1 that was not statically pre-rendered at build time.
import { parseProduct } from '../_utils.js';

export async function onRequestGet({ params, env, request }) {
  const rawId = params.id;
  if (!rawId) {
    return new Response('Not found', { status: 404 });
  }
  const id = rawId.replace(/\/$/, '');

  try {
    // 1. Query live D1 database first so updates and live edits reflect immediately!
    const row = await env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
    
    if (!row || row.is_active === 0) {
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Product Not Found - Shivam Water Solution</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f0f7ff; color: #0f172a; text-align: center; padding: 80px 20px; }
            a { color: #0284c7; text-decoration: none; font-weight: bold; }
            .btn { display: inline-block; background: #0284c7; color: #fff; padding: 12px 24px; border-radius: 8px; margin-top: 20px; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>404 - Product Not Found</h1>
          <p>The RO water purifier or part you are looking for does not exist in our catalog.</p>
          <a href="/products" class="btn">Browse All Products</a>
        </body>
        </html>
      `, {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
        }
      });
    }

    const p = parseProduct(row);
    const baseUrl = 'https://shivamwatersolution.in';
    const productUrl = `${baseUrl}/products/${p.id}`;
    const rawImg = (p.images && p.images[0]) ? p.images[0] : '/assets/product_domestic.webp';
    const absoluteImg = rawImg.startsWith('http')
      ? rawImg
      : `${baseUrl}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`;

    const title = p.meta_title || `${p.name} RO Water Purifier | Shivam Water Solution Morbi`;
    const description = p.meta_desc || `${p.tagline || p.description || ''} • ${p.capacity || '10L Storage'} • ${p.warranty || '1 Year Warranty'}. Free installation & home delivery across Morbi & Rajkot.`;

    const displayCategory = p.category === 'domestic'
      ? 'Domestic RO'
      : p.category === 'commercial'
      ? 'Commercial & UTC'
      : p.category === 'spares'
      ? 'Filters & Spares'
      : (p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'Water Purifier');

    const defaultWaText = `Hello Shivam Water Solution (Dilipbhai),\n\nI am interested in inquiring about the *${p.name}* ${p.category === 'commercial' ? 'Commercial RO Plant' : p.category === 'spares' ? 'Filter Spare Part' : 'RO Water Purifier'}.\n\n*Model Specs:* ${p.capacity || 'Standard Capacity'} | ${p.warranty || '1 Year Warranty'}\n*Services:* Free Delivery & Free Installation in Morbi / Rajkot\n\n*Product Details & Photo Link:* ${productUrl}`;
    const waMsg = p.wa ? `${p.wa}\n\nProduct Details & Photo Link: ${productUrl}` : defaultWaText;
    const waUrl = `https://wa.me/919173096727?text=${encodeURIComponent(waMsg)}`;

    const priceValue = p.price || (p.category === 'commercial' ? "45000" : p.category === 'spares' ? "450" : "6999");

    const productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${p.name} RO Water Purifier`,
      "image": [absoluteImg],
      "description": p.description || p.tagline || `${p.name} with advanced multi-stage RO purification.`,
      "sku": p.id,
      "mpn": p.id,
      "brand": {
        "@type": "Brand",
        "name": "Shivam Water Solution"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "19",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "url": productUrl,
        "priceCurrency": "INR",
        "price": priceValue,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "LocalBusiness",
          "name": "Shivam Water Solution",
          "telephone": "+919173096727",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vajepar Main Road",
            "addressLocality": "Morbi",
            "addressRegion": "Gujarat",
            "postalCode": "363641",
            "addressCountry": "IN"
          }
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "INR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN",
            "addressRegion": ["Gujarat"]
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 1,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "IN",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        }
      }
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/products` },
        { "@type": "ListItem", "position": 3, "name": p.name, "item": productUrl }
      ]
    };

    const featuresListHtml = (p.features && p.features.length > 0)
      ? `
        <h3 class="features-head-detail">Key Features</h3>
        <ul class="features-list-detail">
          ${p.features.map(f => `
            <li>
              <svg class="icon-turquoise" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${escapeHtml(f)}</span>
            </li>
          `).join('')}
        </ul>
      `
      : '';

    const specsKeys = (p.specs && typeof p.specs === 'object') ? Object.keys(p.specs) : [];
    const specsTableHtml = specsKeys.length > 0
      ? `
        <div class="specs-section-detail glass-card mt-5">
          <h2 class="specs-title-detail">Technical Specifications</h2>
          <div class="specs-table-wrapper">
            <table class="specs-table">
              <tbody>
                ${specsKeys.map(k => `
                  <tr>
                    <th>${escapeHtml(k)}</th>
                    <td>${escapeHtml(String(p.specs[k]))}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `
      : '';

    const thumbnailsHtml = (p.images && p.images.length > 1)
      ? `
        <div class="product-thumbnails-grid">
          ${p.images.map((img, idx) => `
            <button type="button" class="product-thumbnail-btn glass-card ${idx === 0 ? 'active' : ''}" onclick="setMainImage('${escapeHtml(img)}', this)" aria-label="View product image ${idx + 1}">
              <img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)} thumbnail ${idx + 1}" class="product-thumbnail-img" width="80" height="80" onerror="this.src='/assets/product_domestic.webp'" />
            </button>
          `).join('')}
        </div>
      `
      : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(productUrl)}">
  
  <!-- Open Graph / WhatsApp -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(productUrl)}">
  <meta property="og:title" content="${escapeHtml(p.name)} | Shivam Water Solution Morbi">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(absoluteImg)}">
  <meta property="og:site_name" content="Shivam Water Solution - Morbi & Rajkot">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(p.name)} | Shivam Water Solution">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(absoluteImg)}">

  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  
  <script type="application/ld+json">${JSON.stringify(productJsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>

  <style>
    :root {
      --color-primary: hsl(220, 90%, 45%);
      --color-secondary: hsl(200, 95%, 42%);
      --color-accent: hsl(180, 85%, 42%);
      --color-accent-hover: hsl(180, 85%, 35%);
      --color-whatsapp: hsl(142, 70%, 28%);
      --color-whatsapp-hover: hsl(142, 70%, 22%);
      --bg-dark-1: hsl(0, 0%, 100%);
      --bg-dark-2: hsl(200, 35%, 96%);
      --text-light-1: hsl(222, 47%, 12%);
      --text-light-2: hsl(222, 20%, 26%);
      --text-light-3: hsl(222, 15%, 34%);
      --glass-bg: rgba(255, 255, 255, 0.85);
      --glass-border: rgba(0, 180, 255, 0.12);
      --font-display: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
      --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; background-color: var(--bg-dark-2); }
    body { font-family: var(--font-body); color: var(--text-light-2); line-height: 1.6; min-height: 100vh; display: flex; flex-direction: column; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; width: 100%; }

    /* Announcement Bar */
    .announcement-bar { background: hsl(200, 30%, 93%); border-bottom: 1px solid var(--glass-border); padding: 8px 0; font-size: 0.8rem; }
    .announcement-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
    .contact-info { display: flex; align-items: center; gap: 12px; }
    .announce-link { color: var(--text-light-1); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
    .announce-text { display: inline-flex; align-items: center; gap: 6px; color: var(--text-light-2); }
    .announce-badge { background: rgba(0, 180, 255, 0.08); color: var(--color-primary); padding: 2px 10px; border-radius: 20px; font-weight: 600; border: 1px solid rgba(0, 180, 255, 0.12); }
    .divider { color: rgba(0, 0, 0, 0.1); }
    .text-turquoise { color: var(--color-accent); }

    /* Header */
    .main-header { position: sticky; top: 0; z-index: 100; background: var(--glass-bg); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--glass-border); padding: 15px 0; }
    .header-container { display: flex; justify-content: space-between; align-items: center; }
    .logo-area { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--text-light-1); }
    .header-logo { height: 42px; width: auto; object-fit: contain; display: block; }
    .desktop-nav { display: flex; align-items: center; gap: 24px; }
    .nav-link { text-decoration: none; color: var(--text-light-2); font-weight: 600; font-size: 0.95rem; transition: color 0.2s ease; }
    .nav-link:hover { color: var(--color-primary); }
    .header-actions { display: flex; align-items: center; gap: 12px; }
    .menu-toggle-btn { background: transparent; border: none; color: var(--text-light-1); cursor: pointer; display: none; padding: 6px; }

    /* Buttons */
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 28px; border-radius: 50px; font-family: var(--font-display); font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
    .btn-primary { background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%); color: #ffffff; box-shadow: 0 4px 14px rgba(0, 90, 255, 0.2); }
    .btn-primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 24px rgba(0, 90, 255, 0.35); }
    .btn-outline { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }
    .btn-outline:hover { border-color: var(--color-primary); background: var(--color-primary); color: #ffffff; transform: translateY(-2px); }
    .btn-whatsapp { background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #ffffff; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25); }
    .btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4); }
    .btn-sm { padding: 8px 20px; font-size: 0.85rem; }
    .btn-lg { padding: 16px 36px; font-size: 1.05rem; border-radius: 50px; }
    .w-full { width: 100%; }
    .justify-center { justify-content: center; }
    .mt-3 { margin-top: 12px; }
    .mt-4 { margin-top: 16px; }
    .mt-5 { margin-top: 24px; }

    /* Product Details */
    .product-detail-page { padding: 40px 0 80px; flex: 1; }
    .product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    .glass-card { background: var(--bg-dark-1); border: 1px solid var(--glass-border); border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); }
    .product-image-section { padding: 24px; text-align: center; position: relative; }
    .main-detail-img { width: 100%; max-width: 360px; height: 360px; object-fit: contain; margin: 0 auto; display: block; }
    .product-thumbnails-grid { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
    .product-thumbnail-btn { width: 72px; height: 72px; padding: 4px; border-radius: 12px; border: 2px solid var(--glass-border); background: var(--bg-dark-1); cursor: pointer; }
    .product-thumbnail-btn.active { border-color: var(--color-primary); }
    .product-thumbnail-img { width: 100%; height: 100%; object-fit: contain; }

    .share-floating-btn { position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background: #ffffff; border: 1px solid var(--glass-border); color: var(--text-light-2); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.2s; }
    .share-floating-btn:hover { background: var(--color-primary); color: #fff; transform: scale(1.05); }
    .share-floating-btn.copied { background: #22c55e; color: #fff; border-color: #22c55e; }
    .share-tooltip { display: none; }

    .share-action-bar { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; border-radius: 50px; background: rgba(0, 180, 255, 0.06); border: 1px solid var(--glass-border); color: var(--color-primary); font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; }
    .share-action-bar:hover { background: rgba(0, 180, 255, 0.12); }
    .share-action-bar.copied { background: #22c55e; color: #fff; border-color: #22c55e; }

    .category-tag { display: inline-block; padding: 6px 14px; border-radius: 20px; background: rgba(0, 180, 255, 0.08); color: var(--color-primary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .product-title-detail { font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--text-light-1); margin: 0 0 6px; line-height: 1.2; }
    .product-tagline-detail { font-size: 1.05rem; color: var(--color-secondary); font-weight: 600; margin: 0 0 18px; }
    .key-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
    .key-badge { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: hsl(200, 35%, 98%); border: 1px solid var(--glass-border); border-radius: 10px; font-size: 0.88rem; font-weight: 600; color: var(--text-light-2); }
    .product-desc-detail { font-size: 1rem; line-height: 1.6; color: var(--text-light-2); margin-bottom: 24px; }
    .features-head-detail { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; margin: 24px 0 12px; color: var(--text-light-1); }
    .features-list-detail { list-style: none; padding: 0; margin: 0 0 28px; }
    .features-list-detail li { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-light-2); font-size: 0.95rem; }
    .icon-turquoise { color: var(--color-accent); flex-shrink: 0; }

    /* Specs Table */
    .specs-section-detail { padding: 28px; }
    .specs-title-detail { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--text-light-1); margin-bottom: 18px; }
    .specs-table-wrapper { overflow-x: auto; }
    .specs-table { width: 100%; border-collapse: collapse; text-align: left; }
    .specs-table tr { border-bottom: 1px solid rgba(0, 0, 0, 0.06); }
    .specs-table th { padding: 12px 16px; color: var(--text-light-3); font-weight: 600; width: 35%; font-size: 0.92rem; }
    .specs-table td { padding: 12px 16px; color: var(--text-light-1); font-weight: 600; font-size: 0.92rem; }

    /* Footer */
    .footer-section { background: hsl(200, 30%, 93%); border-top: 1px solid var(--glass-border); padding: 50px 0 20px; color: var(--text-light-2); font-size: 0.9rem; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1.5fr 1.5fr; gap: 32px; margin-bottom: 40px; }
    .footer-brand .brand-desc { color: var(--text-light-3); font-size: 0.88rem; line-height: 1.5; }
    .footer-links h3, .footer-contact-details h3, .footer-map h3 { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text-light-1); margin-bottom: 14px; }
    .footer-links-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .footer-links-list a { color: var(--text-light-2); text-decoration: none; transition: color 0.2s; }
    .footer-links-list a:hover { color: var(--color-primary); }
    .contact-details-list { display: flex; flex-direction: column; gap: 12px; }
    .contact-detail-item { display: flex; gap: 10px; align-items: flex-start; }
    .detail-title { font-size: 0.75rem; color: var(--text-light-3); font-weight: 600; text-transform: uppercase; margin: 0; }
    .detail-val { font-size: 0.88rem; font-weight: 600; color: var(--text-light-1); margin: 0; }
    .link-val { color: var(--color-primary); text-decoration: none; }
    .footer-bottom { text-align: center; border-top: 1px solid var(--glass-border); padding-top: 20px; color: var(--text-light-3); font-size: 0.82rem; }
    .footer-social { display: flex; gap: 10px; }
    .footer-social a { width: 36px; height: 36px; border-radius: 50%; background: #ffffff; border: 1px solid var(--glass-border); display: inline-flex; align-items: center; justify-content: center; color: var(--text-light-1); text-decoration: none; transition: all 0.2s; }
    .footer-social a:hover { background: var(--color-primary); color: #fff; }

    /* Floating Mobile CTAs */
    .floating-ctas { display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-top: 1px solid var(--glass-border); padding: 10px 16px; z-index: 99; box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06); gap: 10px; }
    .floating-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; border-radius: 50px; font-family: var(--font-display); font-weight: 700; font-size: 0.9rem; text-decoration: none; color: #fff; }
    .float-call { background: var(--color-primary); }
    .float-whatsapp { background: #25D366; }

    /* Mobile Menu Drawer */
    .mobile-menu-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(10, 25, 50, 0.4); backdrop-filter: blur(8px); z-index: 105; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
    .mobile-menu-overlay.open { opacity: 1; pointer-events: auto; }
    .mobile-menu { position: fixed; top: 0; right: -300px; width: 280px; height: 100vh; background: #ffffff; padding: 20px; display: flex; flex-direction: column; gap: 20px; transition: right 0.3s ease; z-index: 106; box-shadow: -5px 0 25px rgba(0,0,0,0.1); }
    .mobile-menu-overlay.open .mobile-menu { right: 0; }
    .mobile-menu-header { display: flex; justify-content: space-between; align-items: center; }
    .close-menu-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light-1); }
    .mobile-nav-links { display: flex; flex-direction: column; gap: 14px; }
    .mobile-nav-link { text-decoration: none; color: var(--text-light-1); font-weight: 600; font-size: 1rem; }

    @media (max-width: 992px) {
      .desktop-nav { display: none !important; }
      .menu-toggle-btn { display: flex !important; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .product-detail-grid { grid-template-columns: 1fr; gap: 28px; }
      .floating-ctas { display: flex; }
      .product-detail-page { padding-bottom: 100px; }
      .footer-grid { grid-template-columns: 1fr; gap: 24px; }
    }
  </style>
</head>
<body>
  <!-- Top Announcement Bar -->
  <div class="announcement-bar">
    <div class="container announcement-content">
      <div class="contact-info">
        <a href="tel:+919173096727" class="announce-link">
          <svg class="text-turquoise" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>+91 91730 96727</span>
        </a>
        <span class="divider">|</span>
        <span class="announce-text">
          <svg class="text-turquoise" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
        </span>
      </div>
      <div class="announce-badge">
        Emergency Service Available
      </div>
    </div>
  </div>

  <!-- Main Header -->
  <header class="main-header">
    <div class="container header-container">
      <a href="/" class="logo-area">
        <img src="/assets/logo_horizontal_transparent.png" alt="Shivam Water Solution" class="header-logo" width="220" height="50" onerror="this.style.display='none'">
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <a href="/#services" class="nav-link">Services</a>
        <a href="/products" class="nav-link">Products</a>
        <a href="/#purity" class="nav-link">Why RO?</a>
        <a href="/#about" class="nav-link">Why Us</a>
        <a href="/#faq" class="nav-link">FAQs</a>
        <a href="/blogs" class="nav-link">Blogs</a>
        <a href="/#contact" class="nav-link">Contact</a>
      </nav>

      <div class="header-actions">
        <a href="tel:+919173096727" class="btn btn-outline btn-sm header-call-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call Now
        </a>
        <button class="menu-toggle-btn" aria-label="Toggle Navigation Menu" onclick="document.getElementById('mobile-drawer').classList.add('open')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobile-drawer" class="mobile-menu-overlay" onclick="if(event.target===this) this.classList.remove('open')">
    <div class="mobile-menu">
      <div class="mobile-menu-header">
        <img src="/assets/logo_horizontal_transparent.png" alt="Shivam Water Solution" height="34" style="height:34px;width:auto;">
        <button class="close-menu-btn" onclick="document.getElementById('mobile-drawer').classList.remove('open')">&times;</button>
      </div>
      <nav class="mobile-nav-links">
        <a href="/#services" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">Services</a>
        <a href="/products" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">Products</a>
        <a href="/#purity" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">Why RO?</a>
        <a href="/#about" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">Why Us</a>
        <a href="/#faq" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">FAQs</a>
        <a href="/blogs" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">Blogs</a>
        <a href="/#contact" class="mobile-nav-link" onclick="document.getElementById('mobile-drawer').classList.remove('open')">Contact</a>
      </nav>
      <div style="margin-top:auto;display:flex;flex-direction:column;gap:10px;">
        <a href="tel:+919173096727" class="btn btn-primary w-full">Call Dilip Bhai</a>
        <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp w-full">WhatsApp Enquiry</a>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="product-detail-page">
    <div class="container">
      <div style="margin-bottom: 24px;">
        <a href="/products" class="announce-link" style="display:inline-flex;align-items:center;gap:8px;color:var(--color-primary);font-weight:600;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Products Catalog
        </a>
      </div>

      <div class="product-detail-grid">
        <!-- Gallery Section -->
        <div class="product-gallery-container">
          <div class="product-image-section glass-card">
            <button type="button" class="share-floating-btn" id="share-btn-top" onclick="triggerShare()" aria-label="Share product" title="Share product link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>

            <img id="main-img" src="${escapeHtml(rawImg)}" alt="${escapeHtml(p.name)}" class="main-detail-img" width="400" height="400" />
          </div>
          ${thumbnailsHtml}
        </div>

        <!-- Product Info Section -->
        <div class="product-info-section">
          <span class="category-tag">${escapeHtml(displayCategory)}</span>
          <h1 class="product-title-detail">${escapeHtml(p.name)}</h1>
          <p class="product-tagline-detail">${escapeHtml(p.tagline || 'Pure Protection in Every Drop.')}</p>

          <div class="key-badges">
            <div class="key-badge">
              <svg class="text-turquoise" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span>Capacity: ${escapeHtml(p.capacity || '10-12L Storage')}</span>
            </div>
            <div class="key-badge">
              <svg class="text-turquoise" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Warranty: ${escapeHtml(p.warranty || '1 Year Comprehensive Warranty')}</span>
            </div>
          </div>

          <p class="product-desc-detail">${escapeHtml(p.description || '')}</p>

          ${featuresListHtml}

          <div class="action-buttons-detail">
            <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg w-full justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>Inquire / Order on WhatsApp</span>
            </a>
            <a href="tel:+919173096727" class="btn btn-outline btn-lg w-full justify-center mt-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call Dilipbhai (+91 91730 96727)</span>
            </a>
            <button type="button" class="share-action-bar mt-3" id="share-bar-btn" onclick="triggerShare()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <span id="share-bar-text">Share This Product Link</span>
            </button>
          </div>
        </div>
      </div>

      ${specsTableHtml}
    </div>
  </main>

  <!-- Floating CTAs (Mobile) -->
  <div class="floating-ctas">
    <a href="tel:+919173096727" class="floating-btn float-call" aria-label="Call Dilip Bhai Now">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span>Call Now</span>
    </a>
    <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer" class="floating-btn float-whatsapp" aria-label="Order on WhatsApp">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span>WhatsApp</span>
    </a>
  </div>

  <!-- Full Footer -->
  <footer class="footer-section" id="contact">
    <div class="container footer-container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-brand">
          <a href="/" class="logo-area">
            <img src="/assets/logo_horizontal_transparent.png" alt="Shivam Water Solution" class="footer-logo" loading="lazy" width="220" height="50" style="height:46px;width:auto;object-fit:contain;">
          </a>
          <p class="mt-4 brand-desc">
            Providing pure, sweet, and mineral-balanced drinking water to thousands of homes and ceramic factories in Morbi & Rajkot. Quality and service are our priorities.
          </p>
          <div class="footer-social mt-4">
            <a href="https://www.instagram.com/shivam_enterprise7691" target="_blank" rel="noopener noreferrer" aria-label="Instagram Account Link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="tel:+919173096727" aria-label="Call Dilip Bhai Directly">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="https://wa.me/919173096727" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat Link">
              <svg viewBox="0 0 24 24" style="width:18px;height:18px;"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul class="footer-links-list">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Our Services</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/#about">Why Us</a></li>
            <li><a href="/#faq">FAQs</a></li>
            <li><a href="/blogs">Water Blogs</a></li>
          </ul>
        </div>

        <!-- Contact Details -->
        <div class="footer-contact-details">
          <h3>Contact Details</h3>
          <div class="contact-details-list">
            <div class="contact-detail-item">
              <svg class="text-turquoise" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <div>
                <p class="detail-title">Proprietor</p>
                <p class="detail-val">Dilip Bhai</p>
              </div>
            </div>
            
            <div class="contact-detail-item">
              <svg class="text-turquoise" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <p class="detail-title">Phone & WhatsApp</p>
                <a href="tel:+919173096727" class="detail-val link-val">+91 91730 96727</a>
              </div>
            </div>
            
            <div class="contact-detail-item">
              <svg class="text-turquoise" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <p class="detail-title">Shop Address</p>
                <p class="detail-val">Vajepar Main Road, Morbi - 363641, Gujarat, India.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Business Hours -->
        <div class="footer-map">
          <h3>Business Hours</h3>
          <div class="contact-details-list">
            <div class="contact-detail-item">
              <svg class="text-turquoise" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>
                <p class="detail-title">Timings</p>
                <p class="detail-val">Monday - Saturday: 9:00 AM - 8:00 PM <br>(Sunday Closed)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Shivam Water Solution. All Rights Reserved. Morbi & Rajkot, Gujarat.</p>
      </div>
    </div>
  </footer>

  <script>
    function setMainImage(src, btn) {
      document.getElementById('main-img').src = src;
      document.querySelectorAll('.product-thumbnail-btn').forEach(b => b.classList.remove('active'));
      if(btn) btn.classList.add('active');
    }

    async function triggerShare() {
      var url = window.location.href;
      var title = document.title;
      if (navigator.share) {
        try {
          await navigator.share({ title: title, text: 'Check out this RO purifier from Shivam Water Solution Morbi!', url: url });
          return;
        } catch (e) {}
      }
      try {
        await navigator.clipboard.writeText(url);
        var btn1 = document.getElementById('share-btn-top');
        var btn2 = document.getElementById('share-bar-btn');
        var txt2 = document.getElementById('share-bar-text');
        if(btn1) btn1.classList.add('copied');
        if(btn2) btn2.classList.add('copied');
        if(txt2) txt2.innerText = 'Product Link Copied to Clipboard! ✓';
        setTimeout(function() {
          if(btn1) btn1.classList.remove('copied');
          if(btn2) btn2.classList.remove('copied');
          if(txt2) txt2.innerText = 'Share This Product Link';
        }, 3000);
      } catch (err) {}
    }
  </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
      },
    });
  } catch (e) {
    return new Response(`Server error: ${e.message}`, { status: 500 });
  }
}

export async function onRequestHead(context) {
  const res = await onRequestGet(context);
  return new Response(null, {
    status: res.status,
    headers: res.headers,
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
