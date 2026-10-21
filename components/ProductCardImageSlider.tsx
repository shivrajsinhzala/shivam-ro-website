'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardImageSliderProps {
  images?: string[];
  name: string;
  productId: string;
  badge?: string;
  priority?: boolean;
}

export default function ProductCardImageSlider({
  images,
  name,
  productId,
  badge,
  priority = false,
}: ProductCardImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const validImages = images && images.length > 0 ? images : ["/assets/product_domestic.webp"];
  const hasMultiple = validImages.length > 1;
  const safeIndex = currentIndex >= 0 && currentIndex < validImages.length ? currentIndex : 0;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || !hasMultiple) return;
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;

    // Detect horizontal swipe intention
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 12) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(diffX) > 35) {
      if (diffX < 0) {
        // Swiped left -> next
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
      } else {
        // Swiped right -> prev
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      isSwiping.current = false;
    }, 80);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isSwiping.current) {
      e.preventDefault();
    }
  };

  return (
    <div className="product-card-slider-wrapper">
      {badge && (
        <div className="product-badge">
          <span>{badge}</span>
        </div>
      )}

      <Link
        href={`/products/${productId}`}
        className="product-img-wrap product-slider-card-wrap"
        style={{ cursor: "pointer", display: "flex" }}
        onClick={handleLinkClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label={`View ${name} details`}
      >
        <div
          className="card-slider-track"
          style={{
            transform: `translateX(-${safeIndex * 100}%)`,
          }}
        >
          {validImages.map((img, idx) => (
            <div key={idx} className="card-slider-slide">
              <img
                src={img}
                alt={`${name} - Photo ${idx + 1}`}
                loading={priority && idx === 0 ? "eager" : "lazy"}
                width="400"
                height="400"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/product_domestic.webp";
                }}
              />
            </div>
          ))}
        </div>

        {/* Slide navigation arrows */}
        {hasMultiple && (
          <>
            <button
              type="button"
              className="card-slider-arrow card-slider-prev"
              onClick={handlePrev}
              aria-label="Previous image"
              title="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="card-slider-arrow card-slider-next"
              onClick={handleNext}
              aria-label="Next image"
              title="Next image"
            >
              <ChevronRight size={16} />
            </button>

            {/* Pagination dots */}
            <div className="card-slider-dots">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`card-slider-dot ${idx === safeIndex ? "active" : ""}`}
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Subtle Counter pill on hover */}
            <div className="card-slider-counter">
              {safeIndex + 1}/{validImages.length}
            </div>
          </>
        )}
      </Link>
    </div>
  );
}
