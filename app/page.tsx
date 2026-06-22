import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle, 
  Phone, 
  Info, 
  Filter, 
  Shield, 
  Sparkles, 
  Home, 
  Factory, 
  Wrench, 
  Clock, 
  Award, 
  CheckSquare, 
  Percent 
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import StatsCounter from "@/components/StatsCounter";
import FeaturedProducts from "@/components/FeaturedProducts";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FaqAccordion from "@/components/FaqAccordion";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-bg-wrapper">
          <img 
            src="/assets/hero_bg.webp" 
            alt="Modern Kitchen Countertop with RO Purifier" 
            className="hero-bg-img" 
            fetchPriority="high" 
            width="1024" 
            height="1024" 
          />
        </div>
        {/* Interactive Background Particles */}
        <div className="water-particles">
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
        </div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <ShieldCheck className="text-turquoise icon-sm" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
              <span>Morbi & Rajkot&apos;s Most Trusted RO Brand</span>
            </div>
            
            <h1 className="hero-title">
              Pure Water,<br /><span className="text-gradient">Better Health.</span>
            </h1>
            
            <p className="hero-subtitle">
              Professional RO Water Filter Sales, Installation, AMC & Repair Services in Morbi, Rajkot, and across Gujarat. Get service within 24 hours.
            </p>

            {/* Trust Points Grid */}
            <div className="hero-trust-grid">
              <div className="trust-item">
                <CheckCircle className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                <span>Install in 24 Hours</span>
              </div>
              <div className="trust-item">
                <CheckCircle className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                <span>Certified Technicians</span>
              </div>
              <div className="trust-item">
                <CheckCircle className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                <span>100% Genuine Spares</span>
              </div>
              <div className="trust-item">
                <CheckCircle className="text-turquoise" size={16} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                <span>1 to 3 Years Warranty</span>
              </div>
            </div>

            <div className="hero-actions">
              <a 
                href="https://wa.me/919173096727?text=Hi%20Shivam%20Water%20Solution,%20I%20am%20interested%20in%20your%20RO%20services.%20Please%20contact%20me." 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <svg className="icon-whatsapp-svg" viewBox="0 0 24 24" style={{ width: "20px", height: "20px" }}><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Now
              </a>
              <a href="tel:+919173096727" className="btn btn-outline btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>

          {/* Service Booking Form Card */}
          <BookingForm />
        </div>
      </section>

      {/* Statistics Section */}
      <StatsCounter />

      {/* Featured Product Catalog Section */}
      <FeaturedProducts />

      {/* Morbi Water Quality Challenge Section */}
      <section className="purity-section" id="purity">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Morbi Ground Water Quality Challenge</h2>
            <div className="heading-underline"></div>
            <p className="section-desc">
              Underground water in Morbi and surrounding ceramic regions is heavily contaminated with high dissolved salts (TDS) and chemicals. Direct consumption is unsafe and leads to major health hazards.
            </p>
          </div>

          <div className="purity-grid">
            {/* Impurities Pie Chart Visual */}
            <div className="purity-visual-area glass-card">
              <h3 className="purity-subhead text-center">Key Contaminants in Local Water</h3>
              
              <div className="chart-container">
                <div className="pie-chart"></div>
                <div className="chart-legends">
                  <div className="legend-item">
                    <span className="legend-color color-salt"></span>
                    <span className="legend-text">High Salt (TDS) - 55%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color color-chemical"></span>
                    <span className="legend-text">Chemical Pollution - 25%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color color-bacteria"></span>
                    <span className="legend-text">Bacteria & Mud - 20%</span>
                  </div>
                </div>
              </div>
              <p className="chart-footnote text-center">
                * Based on local borewell water sample reports.
              </p>
            </div>

            {/* TDS Comparison Graph */}
            <div className="tds-graph-area glass-card">
              <h3 className="purity-subhead text-center">Water TDS Level Comparison</h3>
              
              <div className="tds-bars">
                <div className="tds-bar-group">
                  <div className="tds-label-row">
                    Tap / Normal Borewell Water
                    <span className="tds-val val-unhealthy">700+ TDS</span>
                  </div>
                  <div className="tds-bar-bg">
                    <div className="tds-bar-fill fill-red" style={{ width: "90%" }}></div>
                  </div>
                  <div className="tds-status status-red font-display">Dangerous / Unhealthy</div>
                </div>
                
                <div className="tds-bar-group">
                  <div className="tds-label-row">
                    Standard Filtered Water
                    <span className="tds-val val-heavy">300+ TDS</span>
                  </div>
                  <div className="tds-bar-bg">
                    <div className="tds-bar-fill fill-orange" style={{ width: "55%" }}></div>
                  </div>
                  <div className="tds-status status-orange font-display">Hard Water / Hard to Digest</div>
                </div>
                
                <div className="tds-bar-group">
                  <div className="tds-label-row">
                    Shivam Alkaline RO Water
                    <span className="tds-val val-perfect">80-120 TDS</span>
                  </div>
                  <div className="tds-bar-bg">
                    <div className="tds-bar-fill fill-green" style={{ width: "25%" }}></div>
                  </div>
                  <div className="tds-status status-green font-display">Perfect for Body / Healthy</div>
                </div>
              </div>
              
              <div className="tds-quote-box">
                <Info className="text-turquoise icon-md" size={24} style={{ flexShrink: 0 }} />
                <p className="tds-quote-text">
                  &quot;Scientific standard: Water with TDS between 80 to 120 is highly beneficial for health and acts as nectar for your family.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Stage Purity Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Threefold Purity Process</h2>
            <div className="heading-underline"></div>
          </div>
          
          <div className="process-cards-grid">
            <div className="process-card glass-card">
              <div className="process-step-num">01</div>
              <div className="process-icon-wrap">
                <Filter className="text-turquoise" size={24} />
              </div>
              <h3>Filtration</h3>
              <p>
                Suspended dirt, mud, sand, rust, and physical impurities dissolved in water are completely removed at the first stage.
              </p>
            </div>
            
            <div className="process-card glass-card active">
              <div className="process-step-num">02</div>
              <div className="process-icon-wrap">
                <Shield className="text-turquoise" size={24} />
              </div>
              <h3>Purification</h3>
              <p>
                Advanced RO membrane destroys harmful bacteria, viruses, chlorine, toxic heavy metals, and chemicals from their roots.
              </p>
            </div>
            
            <div className="process-card glass-card">
              <div className="process-step-num">03</div>
              <div className="process-icon-wrap">
                <Sparkles className="text-turquoise" size={24} />
              </div>
              <h3>Mineral Control</h3>
              <p>
                Maintains and balances essential natural alkaline minerals like Calcium and Magnesium necessary for your joints and bones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Filter Comparison Slider */}
      <BeforeAfterSlider />

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Professional Services</h2>
            <div className="heading-underline"></div>
            <p className="section-desc">
              From quick repairs to complete brand-new installations, we provide guaranteed solution for all types and brands of water purifiers.
            </p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card glass-card">
              <div className="service-icon">
                <Home size={24} />
              </div>
              <h3>Domestic RO Sales & Install</h3>
              <p>
                Sales of top-quality domestic alkaline RO purifiers with copper charge, installed professionally in your home within 24 hours.
              </p>
              <a 
                href="https://wa.me/919173096727?text=Hi%20Shivam%20Water%20Solution,%20I%20am%20interested%20in%20buying%20or%20installing%20a%20Domestic%20RO%20at%20my%20home." 
                target="_blank" 
                rel="noopener noreferrer"
                className="service-link"
              >
                Enquire Now &rarr;
              </a>
            </div>

            {/* Service 2 */}
            <div className="service-card glass-card">
              <div className="service-icon">
                <Factory size={24} />
              </div>
              <h3>Commercial & Industrial Plants</h3>
              <p>
                Custom setup and AMC contracts for high-capacity RO systems (100 LPH to 10,000+ LPH) for Morbi ceramic factories and offices.
              </p>
              <a 
                href="https://wa.me/919173096727?text=Hi%20Shivam%20Water%20Solution,%20I%20am%20interested%20in%20Commercial%20or%20Industrial%20RO%20Plant%20solutions." 
                target="_blank" 
                rel="noopener noreferrer"
                className="service-link"
              >
                Enquire Now &rarr;
              </a>
            </div>

            {/* Service 3 */}
            <div className="service-card glass-card">
              <div className="service-icon">
                <Wrench size={24} />
              </div>
              <h3>RO Repair & Servicing</h3>
              <p>
                Solving leakage, electrical issues, low flow rate, and bad water taste problems for all major RO brands with quick doorstep visits.
              </p>
              <a 
                href="https://wa.me/919173096727?text=Hi%20Shivam%20Water%20Solution,%20my%20RO%20needs%20repair%20service." 
                target="_blank" 
                rel="noopener noreferrer"
                className="service-link"
              >
                Enquire Now &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Business Strengths Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose Shivam Water Solution?</h2>
            <div className="heading-underline"></div>
          </div>

          <div className="about-grid">
            <div className="about-content-left">
              <div className="strength-card glass-card">
                <div className="strength-icon">
                  <Clock className="text-turquoise" size={24} />
                </div>
                <div className="strength-text">
                  <h3>Installation Within 24 Hours</h3>
                  <p>
                    We value your time. Most installations and service requests are completed on the same day or within 24 hours of booking.
                  </p>
                </div>
              </div>

              <div className="strength-card glass-card">
                <div className="strength-icon">
                  <Award className="text-turquoise" size={24} />
                </div>
                <div className="strength-text">
                  <h3>Certified & Experienced Technicians</h3>
                  <p>
                    Our staff is certified and highly trained in handling simple household RO issues to complex industrial setups.
                  </p>
                </div>
              </div>

              <div className="strength-card glass-card">
                <div className="strength-icon">
                  <ShieldCheck className="text-turquoise" size={24} />
                </div>
                <div className="strength-text">
                  <h3>1 to 3 Years Product Warranty</h3>
                  <p>
                    Enjoy complete peace of mind with robust manufacturer and company warranties on all our models and new parts.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-content-right">
              <div className="strength-card glass-card">
                <div className="strength-icon">
                  <CheckSquare className="text-turquoise" size={24} />
                </div>
                <div className="strength-text">
                  <h3>100% Genuine Spare Parts</h3>
                  <p>
                    We never compromise. Only food-grade pipes, high pressure copper booster pumps, and quality filtering media are used.
                  </p>
                </div>
              </div>

              <div className="strength-card glass-card">
                <div className="strength-icon">
                  <Home className="text-turquoise" size={24} />
                </div>
                <div className="strength-text">
                  <h3>On-Site Home & Factory Visit</h3>
                  <p>
                    No need to carry your machine anywhere. We complete repairs, diagnostics, and filter replacements directly at your location.
                  </p>
                </div>
              </div>

              <div className="strength-card glass-card">
                <div className="strength-icon">
                  <Percent className="text-turquoise" size={24} />
                </div>
                <div className="strength-text">
                  <h3>Affordable & Honest Pricing</h3>
                  <p>
                    No hidden fees, no duplicate parts. Transparent quotes and high-quality services at competitive local prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Timeline Process */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">How Our Service Works</h2>
            <div className="heading-underline"></div>
          </div>

          <div className="timeline-grid">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <h3>Contact Dilip Bhai</h3>
              <p>Call or WhatsApp us at +91 91730 96727 with your requirements or issue.</p>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <h3>Schedule Visit</h3>
              <p>We arrange a doorstep technician visit at a time convenient for you within 24 hours.</p>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <h3>Service & Repair</h3>
              <p>Our certified tech inspects, replaces filters, or repairs the machine on-site using genuine spares.</p>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <h3>Worry-Free Purity</h3>
              <p>Check TDS levels post-service, receive a warranty card, and enjoy healthy drinking water.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* FAQ Accordion Section */}
      <FaqAccordion />

      {/* Educational Blog Section */}
      <section className="blog-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Water Purity & RO Safety Tips</h2>
            <div className="heading-underline"></div>
          </div>

          <div className="blog-grid">
            {/* Post 1 */}
            <article className="blog-card glass-card">
              <div className="blog-content">
                <span className="blog-date">June 2026</span>
                <h3>5 Signs Your RO Filter Needs Replacement</h3>
                <p>
                  If you notice slow water flow, change in taste, bad odor, or continuous wastewater running, it&apos;s time to change your cartridges...
                </p>
                <Link href="/blogs/needs-servicing" className="blog-link">
                  Read More &rarr;
                </Link>
              </div>
            </article>

            {/* Post 2 */}
            <article className="blog-card glass-card">
              <div className="blog-content">
                <span className="blog-date">May 2026</span>
                <h3>Benefits of Alkaline & Copper Charged RO Water</h3>
                <p>
                  Adding active copper and alkaline elements balance water pH levels, boost immunity, improve digestion, and keep your body energized...
                </p>
                <Link href="/blogs/alkaline-copper" className="blog-link">
                  Read More &rarr;
                </Link>
              </div>
            </article>

            {/* Post 3 */}
            <article className="blog-card glass-card">
              <div className="blog-content">
                <span className="blog-date">April 2026</span>
                <h3>Understanding High TDS Levels in Morbi Water</h3>
                <p>
                  Why drinking water above 300 TDS damages kidneys and teeth over time, and how modern RO technology brings it down to a healthy 90 TDS...
                </p>
                <Link href="/blogs/groundwater-morbi" className="blog-link">
                  Read More &rarr;
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
