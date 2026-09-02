'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductDetailsClient from '@/components/ProductDetailsClient';

export default function NotFound() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const match = path.match(/^\/products\/([^/]+)/);
      if (match && match[1]) {
        const id = match[1];
        fetch(`/api/products/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error('Not found in database');
            return res.json();
          })
          .then((data) => {
            if (data && data.id) {
              setProduct({
                id: data.id,
                name: data.name || data.name_en || '',
                badge: data.badge || data.badge_en || '',
                category: data.category || 'domestic',
                tagline: data.tagline || data.tagline_en || '',
                capacity: data.capacity || data.capacity_en || '',
                warranty: data.warranty || data.warranty_en || '',
                description: data.description || data.description_en || '',
                features: data.features || data.features_en || [],
                specs: data.specs || data.specs_en || {},
                images: data.images || ['/assets/product_domestic.webp'],
                wa: data.wa,
              });
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
        return;
      }
    }
    setLoading(false);
  }, []);

  if (product) {
    return <ProductDetailsClient initialProduct={product} />;
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-light-2)', fontSize: '1.2rem' }}>Loading product details...</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', color: '#fff' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-light-2)' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-light-3)', maxWidth: '500px', margin: '0 auto 24px' }}>
        The page or product you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
      <Link href="/products" className="btn btn-primary" style={{ display: 'inline-flex', padding: '12px 24px', borderRadius: '10px', background: 'var(--color-primary)', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
        Browse RO Purifiers
      </Link>
    </div>
  );
}
