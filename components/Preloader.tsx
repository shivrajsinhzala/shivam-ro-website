'use client';

import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? 'fade-out' : ''}`} aria-hidden="true">
      <div className="preloader-content">
        {/* Logo and Spinner Wrapper */}
        <div className="preloader-logo-wrap">
          <div className="spinner-ring"></div>
          <div className="spinner-ring-inner"></div>
          
          <div className="preloader-icon-box">
            <img 
              src="/assets/logo_mark.png" 
              alt="Shivam Water Solution" 
              className="preloader-mark-img" 
              width="64" 
              height="64"
            />
          </div>
        </div>

        {/* Brand Text & Loading Indicator */}
        <div className="preloader-brand-info">
          <img 
            src="/assets/logo_horizontal_transparent.png" 
            alt="Shivam Water Solution" 
            className="preloader-text-logo"
            width="200"
            height="44"
          />
          <div className="preloader-bar">
            <div className="preloader-progress"></div>
          </div>
          <span className="preloader-subtitle">Loading Purity & Health...</span>
        </div>
      </div>
    </div>
  );
}
