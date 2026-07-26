'use client';

import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Minimum display time for smooth visual experience
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms fade transition
      return () => clearTimeout(removeTimer);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? 'fade-out' : ''}`} aria-hidden="true">
      <div className="preloader-content">
        {/* Logo and Spinner Wrapper */}
        <div className="preloader-logo-wrap">
          {/* Glowing Animated Water Spinner Ring */}
          <div className="spinner-ring"></div>
          <div className="spinner-ring-inner"></div>
          
          {/* Centered Brand Mark */}
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

      <style jsx>{`
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 99999;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s ease;
          pointer-events: all;
        }

        .preloader-overlay.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .preloader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          text-align: center;
          padding: 20px;
        }

        .preloader-logo-wrap {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #0090ff;
          border-right-color: #00b4ff;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          box-shadow: 0 0 15px rgba(0, 144, 255, 0.15);
        }

        .spinner-ring-inner {
          position: absolute;
          width: 82%;
          height: 82%;
          border-radius: 50%;
          border: 3px solid transparent;
          border-bottom-color: #00d2ff;
          border-left-color: #0050ff;
          animation: spin-reverse 0.9s linear infinite;
        }

        .preloader-icon-box {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .preloader-mark-img {
          width: 64px;
          height: auto;
          object-fit: contain;
        }

        .preloader-brand-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .preloader-text-logo {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .preloader-bar {
          width: 160px;
          height: 4px;
          background: rgba(0, 144, 255, 0.12);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .preloader-progress {
          width: 45%;
          height: 100%;
          background: linear-gradient(90deg, #0050ff 0%, #00b4ff 50%, #00d2ff 100%);
          border-radius: 10px;
          animation: shimmy 1.4s ease-in-out infinite;
        }

        .preloader-subtitle {
          font-size: 0.82rem;
          font-weight: 600;
          color: #0090ff;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(0, 144, 255, 0.2)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 12px rgba(0, 180, 255, 0.45)); }
        }

        @keyframes shimmy {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        @media (max-width: 576px) {
          .preloader-logo-wrap {
            width: 100px;
            height: 100px;
          }
          .preloader-icon-box {
            width: 52px;
            height: 52px;
          }
          .preloader-mark-img {
            width: 52px;
          }
          .preloader-text-logo {
            height: 34px;
          }
          .preloader-bar {
            width: 130px;
          }
        }
      `}</style>
    </div>
  );
}
