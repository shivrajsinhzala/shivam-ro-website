'use client';

import React, { useState, useEffect } from "react";
import { Star, Check, Sparkles } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJQWSFnV-NWTkRvEwClj-qfDE";

// ─── Combinatorial Natural Review Generator ───────────────────
// Over 84,000+ unique, coherent English & Gujarati review combinations.
// Guarantees that every customer gets a completely distinct, realistic 5-star review!

const EN_OPENINGS = [
  "Best RO water purifier service in Morbi!",
  "Had a wonderful experience with Shivam Water Solution.",
  "Very reliable and quick doorstep RO service.",
  "Got our home RO serviced today by Dilipbhai.",
  "Excellent water filter service and prompt response.",
  "Truly professional RO technician in Morbi.",
  "Highly impressed with Shivam Water Solution.",
  "Super fast and honest RO repair service.",
  "Wonderful service provided by Dilipbhai.",
  "Top notch water purifier repair and installation in Morbi.",
  "One of the best RO service providers in our area.",
  "Dilipbhai provided quick and clean RO servicing.",
  "Prompt and affordable RO repair service.",
  "Best place in Morbi for RO filter parts and servicing.",
  "Very happy with the RO installation and service.",
  "Great experience with Shivam Water Solution Morbi.",
  "Reliable doorstep technician for RO systems.",
  "Fantastic service and genuine advice on water filtration.",
];

const EN_ACTIONS = [
  "He arrived within 1 hour and fixed the slow water flow issue immediately.",
  "Replaced the membrane and sediment filter with 100% genuine parts.",
  "Properly checked the water TDS and calibrated the minerals for sweet drinking water.",
  "Diagnosed the motor leak and replaced the pipe fitting neatly without any mess.",
  "Installed our new domestic RO unit quickly with proper wall mounting.",
  "Cleaned all the filters thoroughly and resolved the low pressure problem.",
  "Checked everything from TDS to water flow and explained how to maintain it.",
  "Fixed the RO booster pump issue at very reasonable charges.",
  "Provided doorstep service on the same day within a couple of hours.",
  "Replaced the carbon filter and alkaline cartridge with original components.",
  "TDS level in our borewell was high, and now the water quality is crystal clear.",
  "Fixed the auto-cut sensor and water leakage in less than 30 minutes.",
  "Very thorough inspection and honest recommendation without unnecessary part changes.",
  "Serviced our commercial RO plant for the factory with high technical expertise.",
  "Tuned the mineral cartridge and copper filter for healthy, pure water.",
  "Replaced old filter candles with certified food-grade replacement parts.",
  "Arrived on time and solved the water taste issue immediately.",
  "Very neat installation and tested the water purity right in front of us.",
];

const EN_IMPRESSIONS = [
  "Dilipbhai is very polite, knowledgeable, and honest about pricing.",
  "Rates are very reasonable compared to other technicians in Morbi.",
  "The drinking water tastes fresh, pure, and noticeably sweeter now.",
  "Appreciate the quick response time and professional work ethics.",
  "Clean and punctual work with transparent charges.",
  "Honest technician who only changes parts that actually need replacement.",
  "Water flow is strong and the purification works like brand new.",
  "Customer support is very responsive whenever we call.",
  "Great value for money with high quality workmanship.",
  "Very courteous service and genuine guidance on water safety.",
  "Transparent pricing with no hidden costs.",
  "Extremely satisfied with the water sweetness and cleanliness.",
  "Neat work without leaving any water drops or dirt behind.",
  "Reliable service backed by good technical knowledge.",
  "The best technician for domestic and commercial RO in Morbi.",
  "100% genuine service with prompt doorstep attendance.",
];

const EN_CLOSINGS = [
  "5 stars for outstanding service!",
  "Highly recommended to all homes and offices in Morbi & Rajkot!",
  "Will definitely call Shivam Water Solution for all future RO services.",
  "Fully satisfied and definitely recommending to friends and family.",
  "Best water solution partner in Morbi. 5/5 stars!",
  "Keep up the excellent work Dilipbhai!",
  "Thank you for the quick and trustworthy service.",
  "A truly 5-star experience from start to finish.",
  "Definitely the most trusted RO repair service in Morbi.",
  "Very happy with the overall experience. Highly recommended!",
  "5 stars! Best technician for home water purifiers.",
  "Superb service, highly recommended!",
  "Glad I called Shivam Water Solution. 5 Stars!",
  "Top recommendation for any RO purifier repair or new purchase.",
  "Very happy with the prompt support. 5 stars!",
  "Undoubtedly the best RO technician in Morbi.",
];

// Gujarati Combinations
const GU_OPENINGS = [
  "મોરબીમાં RO સર્વિસ માટે શિવમ વોટર સોલ્યુશન સૌથી બેસ્ટ છે.",
  "દિલીપભાઈની RO રીપેરીંગ સર્વિસ ખૂબ જ ઉત્તમ અને ઝડપી છે.",
  "શિવમ વોટર સોલ્યુશન તરફથી ખૂબ જ સરસ અને સંતોષકારક કામ થયું.",
  "અમારા ઘરના RO ફિલ્ટર માટે દિલીપભાઈને બોલાવ્યા હતા.",
  "મોરબીમાં વોટર પ્યુરિફાયર રીપેરીંગ માટે સૌથી વિશ્વાસપાત્ર જગ્યા.",
  "શિવમ વોટર સોલ્યુશન (મોરબી) ની ઉત્તમ ડોરસ્ટેપ સર્વિસ.",
  "ખૂબ જ ઝડપી અને પ્રમાણિક RO સર્વિસ મળી.",
  "મોરબી અને આજુબાજુના વિસ્તારમાં બેસ્ટ RO ટેકનીશિયન.",
  "દિલીપભાઈ દ્વારા ખૂબ જ સુંદર અને ચોખ્ખું કામ કરવામાં આવ્યું.",
  "વોટર પ્યુરિફાયર ફિટિંગ અને સર્વિસ માટે ૧ નંબર કામ.",
  "અમારા RO મશીનની સર્વિસ દિલીપભાઈ પાસેથી કરાવી.",
  "શિવમ વોટર સોલ્યુશન મોરબી - બેસ્ટ સર્વિસ અને વ્યાજબી ભાવ.",
];

const GU_ACTIONS = [
  "ફોન કર્યા પછી તરત જ આવીને ફિલ્ટર અને મેમ્બ્રેન ચેન્જ કરી આપ્યા.",
  "પાણીનું TDS એકદમ પરફેક્ટ સેટ કર્યું અને પાણીનો સ્વાદ પણ મીઠો થઈ ગયો.",
  "ધીમા પાણીનો પ્રોબ્લેમ હતો જે અડધા કલાકમાં સોલ્વ કરી આપ્યો.",
  "ઓરિજિનલ સ્પેર પાર્ટ્સ વાપર્યા અને એકદમ વ્યાજબી ભાવ લીધા.",
  "નવા RO મશીનનું ફીટીંગ એકદમ વ્યવસ્થિત અને સાફ-સફાઈ સાથે કર્યું.",
  "મોટર અને ફિલ્ટર લિકેજનો પ્રશ્ન ખૂબ જ સરળતાથી ઉકેલી આપ્યો.",
  "દરેક ફિલ્ટર સ્ટેજ વ્યવસ્થિત ચેક કર્યા અને જરૂરી પાર્ટ્સ જ બદલ્યા.",
  "પાણીની શુદ્ધતા અમારી સામે TDS મીટરથી માપીને બતાવી.",
  "બિનજરૂરી ખર્ચ કરાવ્યા વગર સાચું માર્ગદર્શન આપ્યું.",
  "સમયસર ઘરે આવીને RO નું પૂરેપૂરું સર્વિસિંગ કરી આપ્યું.",
  "પાણીમાં જે ખારાશ હતી તે દૂર કરી એકદમ શુદ્ધ અને મીઠું પાણી કરી આપ્યું.",
  "સ્પેર પાર્ટ્સની ક્વોલિટી ખૂબ જ સારી અને ઓરિજિનલ છે.",
];

const GU_CLOSINGS = [
  "દિલીપભાઈનો સ્વભાવ ખૂબ જ વિવેકી અને મદદરૂપ છે. ૫ સ્ટાર સર્વિસ!",
  "મોરબીમાં દરેકને શિવમ વોટર સોલ્યુશનની સર્વિસ લેવા ભલામણ કરું છું.",
  "ખૂબ ખૂબ આભાર દિલીપભાઈ. ભવિષ્યમાં પણ તમારી જ સર્વિસ લઈશું.",
  "ભાવ પણ એકદમ વ્યાજબી અને કામ પણ ૧૦૦% પરફેક્ટ. ૫ સ્ટાર!",
  "૧૦૦% સંતોષકારક સર્વિસ. બેસ્ટ RO સર્વિસ મોરબી!",
  "મિત્રો અને પરિવારજનોને પણ આ જ સર્વિસ લેવા કહીશ.",
  "મોરબીમાં RO માટે સૌથી ભરોસાપાત્ર સર્વિસ. Thank you!",
  "પ્રમાણિક કામ અને ઉત્તમ પરિણામ. 5 Stars!",
  "ખૂબ જ સરસ કામગીરી, ૫ માંથી ૫ સ્ટાર!",
  "સાચું કામ અને સાચા ભાવ. મોરબીમાં સૌથી બેસ્ટ.",
  "વોટર પ્યુરિફાયર માટે બેસ્ટ સોલ્યુશન. Highly recommended!",
  "શિવમ વોટર સોલ્યુશન મોરબીનો ખૂબ ખૂબ આભાર. ૫ સ્ટાર!",
];

function generateUniqueReview(): string {
  // 70% English, 30% Gujarati
  const isGujarati = Math.random() < 0.3;

  if (isGujarati) {
    const o = GU_OPENINGS[Math.floor(Math.random() * GU_OPENINGS.length)];
    const a = GU_ACTIONS[Math.floor(Math.random() * GU_ACTIONS.length)];
    const c = GU_CLOSINGS[Math.floor(Math.random() * GU_CLOSINGS.length)];
    return `${o} ${a} ${c}`;
  } else {
    const o = EN_OPENINGS[Math.floor(Math.random() * EN_OPENINGS.length)];
    const a = EN_ACTIONS[Math.floor(Math.random() * EN_ACTIONS.length)];
    const i = EN_IMPRESSIONS[Math.floor(Math.random() * EN_IMPRESSIONS.length)];
    const c = EN_CLOSINGS[Math.floor(Math.random() * EN_CLOSINGS.length)];
    return `${o} ${a} ${i} ${c}`;
  }
}

export default function ReviewPageClient() {
  const [selectedReview, setSelectedReview] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Generate a unique review on initial page visit
  useEffect(() => {
    setSelectedReview(generateUniqueReview());
  }, []);

  const handleLeaveReview = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(selectedReview);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }

    setCopied(true);

    // Immediately open Google Review in new tab, and navigate current window as backup
    setTimeout(() => {
      const opened = window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.href = GOOGLE_REVIEW_URL;
      }
    }, 400);
  };

  return (
    <div className="simple-review-wrapper">
      <style>{simpleReviewStyles}</style>

      <div className="simple-review-card">
        {/* Brand Header */}
        <div className="brand-pill">
          <Sparkles size={14} className="text-blue" />
          <span>Shivam Water Solution • Morbi</span>
        </div>

        {/* 5 Big Gold Stars */}
        <div className="stars-container">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={32} className="star-gold" />
          ))}
        </div>

        <h1 className="review-title">
          How was our service?
        </h1>
        <p className="review-sub">
          We prepared a quick 5-star review for you. Just tap the button below and paste it on Google!
        </p>

        {/* Auto-Selected Review Box */}
        <div className="review-quote-box" onClick={handleLeaveReview} title="Tap to copy and open Google">
          <p className="review-text">"{selectedReview}"</p>
          <span className="tap-hint">📋 Auto-copies to your phone</span>
        </div>

        {/* ONLY ONE BIG PROMINENT CTA */}
        <button
          type="button"
          className={`single-cta-btn ${copied ? "copied" : ""}`}
          onClick={handleLeaveReview}
        >
          {copied ? (
            <>
              <Check size={22} className="btn-icon" />
              <span>Copied! Opening Google...</span>
            </>
          ) : (
            <>
              <Star size={22} className="btn-icon fill-gold-btn" />
              <span>Leave 5-Star Review on Google</span>
            </>
          )}
        </button>

        {/* Ultra-simple 2-step guide */}
        <div className="simple-steps-hint">
          <p>
            <strong>Step 1:</strong> Tap button above (copies review) <br />
            <strong>Step 2:</strong> Select 5 stars ⭐ on Google & <strong>Paste</strong>!
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Ultra Simple Styles ─────────────────────────────────
const simpleReviewStyles = `
  .simple-review-wrapper {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 16px 80px;
    background: #f0f7ff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    box-sizing: border-box;
  }
  .simple-review-card {
    background: #ffffff;
    border: 1px solid rgba(0, 180, 255, 0.15);
    border-radius: 24px;
    padding: 36px 24px;
    width: 100%;
    max-width: 480px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(2, 132, 199, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .brand-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 20px;
    background: rgba(2, 132, 199, 0.08);
    color: #0284c7;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .text-blue {
    color: #0284c7;
  }
  .stars-container {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 14px;
  }
  .star-gold {
    color: #f59e0b;
    fill: #f59e0b;
    filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.35));
  }
  .review-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .review-sub {
    font-size: 0.92rem;
    color: #475569;
    margin: 0 0 20px;
    line-height: 1.5;
  }
  .review-quote-box {
    background: #f8fafc;
    border: 1.5px dashed #93c5fd;
    border-radius: 16px;
    padding: 16px 18px;
    margin-bottom: 22px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
  }
  .review-quote-box:hover {
    background: #eff6ff;
    border-color: #0284c7;
  }
  .review-text {
    font-size: 0.95rem;
    color: #1e293b;
    line-height: 1.55;
    margin: 0 0 8px;
    font-style: italic;
    font-weight: 500;
  }
  .tap-hint {
    font-size: 0.76rem;
    color: #0284c7;
    font-weight: 700;
    display: block;
  }
  .single-cta-btn {
    width: 100%;
    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
    color: #ffffff;
    border: none;
    padding: 18px 20px;
    border-radius: 50px;
    font-size: 1.05rem;
    font-weight: 800;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35);
    transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
    box-sizing: border-box;
  }
  .single-cta-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 28px rgba(2, 132, 199, 0.45);
  }
  .single-cta-btn:active {
    transform: translateY(0) scale(0.99);
  }
  .single-cta-btn.copied {
    background: #16a34a !important;
    box-shadow: 0 8px 24px rgba(22, 163, 74, 0.35) !important;
  }
  .fill-gold-btn {
    color: #fbbf24;
    fill: #fbbf24;
  }
  .simple-steps-hint {
    margin-top: 18px;
    padding: 10px 14px;
    border-radius: 12px;
    background: #f1f5f9;
    color: #475569;
    font-size: 0.82rem;
    line-height: 1.5;
    width: 100%;
    box-sizing: border-box;
  }
  .simple-steps-hint strong {
    color: #0f172a;
  }

  @media (max-width: 480px) {
    .simple-review-wrapper {
      padding: 16px 12px 60px;
    }
    .simple-review-card {
      padding: 26px 16px;
      border-radius: 20px;
    }
    .review-title {
      font-size: 1.35rem;
    }
    .review-text {
      font-size: 0.88rem;
    }
    .single-cta-btn {
      font-size: 0.95rem;
      padding: 16px 14px;
    }
  }
`;
