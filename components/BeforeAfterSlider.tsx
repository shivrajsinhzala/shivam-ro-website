'use client';

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, Wrench } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".slider-handle")) return;
    handleMove(e.clientX);
  };

  return (
    <section className="slider-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">See The Purity In Action</h2>
          <div className="heading-underline"></div>
          <p className="section-desc">
            Drag the slider horizontally to compare a severely clogged, muddy filter cartridge after 6 months of Morbi water usage with a brand new, pure white filter. Regular servicing protects your health!
          </p>
        </div>

        <div className="slider-wrapper glass-card">
          <div 
            className="before-after-container" 
            ref={containerRef}
            onClick={handleClick}
            style={{ position: "relative", overflow: "hidden", cursor: "ew-resize" }}
          >
            {/* Before (Dirty) Image */}
            <img 
              src="/assets/dirty_filter.webp" 
              alt="Dirty water filter cartridge showing heavy soil buildup" 
              className="image-before" 
              width="600" 
              height="600" 
              style={{ display: "block", width: "100%", height: "auto", userSelect: "none", pointerEvents: "none" }}
            />
            
            {/* After (Clean) Image overlay container */}
            <div 
              className="image-after-overlay"
              style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                pointerEvents: "none",
                clipPath: `inset(0 0 0 ${sliderPosition}%)`
              }}
            >
              <img 
                src="/assets/clean_filter.webp" 
                alt="Brand new clean white water filter cartridge" 
                className="image-after" 
                width="600" 
                height="600"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            
            {/* The Drag Handle */}
            <div 
              className="slider-handle"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              style={{ 
                left: `${sliderPosition}%`, 
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "4px",
                transform: "translateX(-50%)",
                cursor: "ew-resize",
                zIndex: 10
              }}
            >
              <div className="handle-line"></div>
              <div className="handle-circle" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowLeftRight size={14} className="icon-sm" />
              </div>
              <div className="handle-line"></div>
            </div>
            
            {/* Labels */}
            <div className="slider-label label-before">
              6 Months Used Filter
            </div>
            <div className="slider-label label-after">
              Brand New Filter
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5">
          <a 
            href="https://wa.me/919173096727?text=Hi%20Shivam%20Water%20Solution,%20I%20want%20to%20book%20a%20Filter%20Replacement%20service%20for%20my%20home." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <Wrench size={16} />
            Book Filter Replacement
          </a>
        </div>
      </div>
    </section>
  );
}
