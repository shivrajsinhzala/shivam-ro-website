'use client';

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jayesh Patel",
    location: "Ravapar Road, Morbi",
    text: "Best service in Morbi! Dilip Bhai arrived within 3 hours of my call. He checked the TDS levels, replaced the filters using original spare parts, and charged a very reasonable price. Highly recommended."
  },
  {
    name: "Ramesh Bhai",
    location: "Lakhdhirpur Road, Morbi",
    text: "We installed an industrial 500 LPH RO plant for our ceramic unit. The setup is extremely clean, works on a fully automatic electric control panel, and the TDS is stabilized at 90. Excellent maintenance support."
  },
  {
    name: "Hina Ben Shah",
    location: "Shanala Road, Morbi",
    text: "Perfect advice and very neat work. They installed our under-sink UTC system. Now our modular kitchen looks completely clean without any purifier blockages on the counter. The water tastes sweet."
  },
  {
    name: "Mansukh Bhai Prajapati",
    location: "Mahendranagar, Morbi",
    text: "Groundwater TDS in Mahendranagar was over 1600. Dilip Bhai recommended the Alkaline RO with Copper technology. The taste is outstanding now, and he completed the installation within 24 hours."
  },
  {
    name: "Kirti Bhai Patel",
    location: "Vavdi Road, Morbi",
    text: "Our RO stopped working suddenly on a hot Sunday afternoon. Called Shivam Water Solution, and Dilip Bhai sent a technician immediately. He replaced the membrane on the spot. Truly emergency service!"
  },
  {
    name: "Amit Rajpara",
    location: "Ghuntu Road, Morbi",
    text: "We took an Annual Maintenance Contract (AMC) for all water coolers and RO filters in our factory staff quarters. Dilip Bhai's team does regular checking every month. Very reliable after-sales support."
  }
];

export default function TestimonialsCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="heading-underline"></div>
        </div>

        <div className="carousel-wrapper">
          <div className="testimonial-carousel">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className={`testimonial-slide ${idx === currentIdx ? "active" : ""}`}
                style={{ 
                  display: idx === currentIdx ? "block" : "none",
                  opacity: idx === currentIdx ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out"
                }}
              >
                <div className="rating-stars" style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" style={{ color: "hsl(35, 90%, 48%)" }} />
                  ))}
                </div>
                <p className="testimonial-text">&quot;{t.text}&quot;</p>
                <div className="customer-info">
                  <div className="customer-name">{t.name}</div>
                  <p className="customer-location">{t.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button className="carousel-control prev" aria-label="Previous Review" onClick={handlePrev} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={20} />
          </button>
          <button className="carousel-control next" aria-label="Next Review" onClick={handleNext} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={20} />
          </button>
          
          {/* Dots Indicators */}
          <div className="carousel-dots">
            {testimonials.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIdx ? "active" : ""}`}
                onClick={() => setCurrentIdx(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
