'use client';

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How often should I replace RO filter cartridges?",
    answer: "In Morbi, due to high TDS and chemical impurities, outer pre-filter cartridge should be replaced every 3 to 6 months. Main internal carbon and sediment filters should be changed every 9 to 12 months for healthy filtration."
  },
  {
    question: "What is AMC and how is it beneficial for my home?",
    answer: "AMC stands for Annual Maintenance Contract. It covers 3 to 4 scheduled service visits a year, free replacement of basic filters, and emergency repairs. It ensures you never drink dirty water by keeping your purifier clean and certified."
  },
  {
    question: "Do you service other brands of RO water purifiers?",
    answer: "Yes, we provide expert servicing, membrane changes, and repairs for all major brands (including Kent, Aquaguard, Pureit, Livpure, etc.) and non-branded customized models using high quality genuine spares."
  },
  {
    question: "What is the warranty on new RO machine installation?",
    answer: "We offer 1 year of complete company warranty on our domestic RO models and up to 2 years of warranty support on commercial models. All spare parts replaced also come with a warranty."
  },
  {
    question: "Can you install commercial RO plants in ceramic units in Morbi?",
    answer: "Yes, we specialize in high capacity industrial RO systems (250 LPH, 500 LPH, to 10,000+ LPH) built on heavy stainless steel frames with fully automatic control systems, tailored for the unique hard water conditions of Morbi ceramic factories."
  }
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="heading-underline"></div>
        </div>

        <div className="faq-accordion-wrap">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`faq-item glass-card ${isOpen ? "active" : ""}`}>
                <button className="faq-toggle" onClick={() => toggleFaq(idx)} style={{ outline: "none" }}>
                  <span className="faq-question">{faq.question}</span>
                  <ChevronDown className="faq-chevron" size={18} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform var(--transition-normal)" }} />
                </button>
                <div 
                  className="faq-answer"
                  style={{ 
                    maxHeight: isOpen ? "160px" : "0px",
                    transition: "max-height var(--transition-normal), padding var(--transition-normal)"
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
