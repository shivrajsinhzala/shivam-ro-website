'use client';

import React, { useEffect, useState, useRef } from "react";
import { Users, Factory, Clock3 } from "lucide-react";

export default function StatsCounter() {
  const [families, setFamilies] = useState(0);
  const [plants, setPlants] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          
          const familyEnd = 1000;
          const plantEnd = 70;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setFamilies(Math.floor(progress * familyEnd));
            setPlants(Math.floor(progress * plantEnd));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setFamilies(familyEnd);
              setPlants(plantEnd);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="stats-section" ref={containerRef}>
      <div className="container stats-container">
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon-wrap">
              <Users className="text-turquoise" size={24} />
            </div>
            <div className="stat-number">{families}+</div>
            <p className="stat-label">Happy Families</p>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon-wrap">
              <Factory className="text-turquoise" size={24} />
            </div>
            <div className="stat-number">{plants}+</div>
            <p className="stat-label">Industrial Plants</p>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon-wrap">
              <Clock3 className="text-turquoise" size={24} />
            </div>
            <div className="stat-number-text">24 Hr</div>
            <p className="stat-label">Quick Support</p>
          </div>
        </div>
        <div className="stats-quote">
          &quot;Trust, quality and transparency is our true identity.&quot;
        </div>
      </div>
    </section>
  );
}
