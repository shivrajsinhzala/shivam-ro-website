export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string; // HTML string
  ctaText: string;
  ctaWhatsAppMessage: string;
  prevSlug: string | null;
  nextSlug: string | null;
}

export const blogs: BlogPost[] = [
  {
    slug: "safe-tds-range",
    title: "Safe TDS Range for Drinking Water in Morbi & Rajkot",
    metaTitle: "Safe TDS Range for Drinking Water in Morbi & Rajkot - Shivam Water Solution",
    metaDesc: "What is the safe TDS range for drinking water? Understand TDS standards, health implications, and how to calibrate your RO system in Morbi and Rajkot.",
    date: "June 2026",
    readTime: "5 Min Read",
    author: "Dilip Bhai",
    summary: "Water is crucial for our survival, but not all water is safe for drinking. One of the most important parameters of water quality is TDS, or Total Dissolved Solids. In regions like Morbi and Rajkot, where groundwater is heavily loaded with natural minerals and industrial by-products, understanding the ideal TDS range is vital...",
    content: `
      <p>Water is crucial for our survival, but not all water is safe for drinking. One of the most important parameters of water quality is TDS, or <strong>Total Dissolved Solids</strong>. In regions like Morbi and Rajkot, where groundwater is heavily loaded with natural minerals and industrial by-products, understanding TDS is vital for protecting your family's health.</p>
      
      <h3>What is TDS and Why Does it Matter?</h3>
      <p>TDS refers to the concentration of dissolved inorganic salts and organic matter in water. Common constituents include calcium, magnesium, sodium, potassium, carbonates, bicarbonates, chlorides, and sulphates. A moderate amount of these minerals is necessary for human health and gives water its natural taste. However, very high TDS levels can make water hard, salty, and potentially hazardous over time.</p>
      
      <h3>Recommended TDS Level Guidelines</h3>
      <p>According to the Bureau of Indian Standards (BIS) and the World Health Organization (WHO), here is how water TDS is classified (measured in mg/L or ppm):</p>
      <ul>
        <li><strong>Below 50 ppm:</strong> Too low. Water of this level is highly acidic and lacks essential minerals like calcium and magnesium. It has a flat, bland taste and can strip minerals from your body.</li>
        <li><strong>50 to 150 ppm:</strong> Ideal range. This is the sweet spot for drinking water. It is light, refreshing, safe, and retains a healthy mineral balance.</li>
        <li><strong>150 to 300 ppm:</strong> Good. Safe for general consumption and has a standard taste.</li>
        <li><strong>300 to 500 ppm:</strong> Acceptable. Safe to drink, but might feel heavy or slightly hard.</li>
        <li><strong>Above 500 ppm:</strong> Poor quality. Not recommended for drinking. Water feels hard, leaves white scales on utensils, and has a bitter/salty taste.</li>
        <li><strong>Above 1000 ppm:</strong> Unfit for consumption. Drinking this water long-term places heavy stress on the kidneys and can lead to kidney stones and digestive issues.</li>
      </ul>
      
      <h3>The Situation in Morbi & Rajkot</h3>
      <p>In Morbi (Ravapar, Vavdi, Lakhdhirpur) and parts of Rajkot, the raw groundwater TDS ranges between 800 ppm to over 2500 ppm. This makes domestic RO (Reverse Osmosis) purifiers a absolute necessity rather than a luxury. An RO membrane filters out up to 90-95% of these dissolved salts.</p>
      
      <h3>How to Maintain the Ideal TDS?</h3>
      <p>Modern RO systems from Shivam Water Solution are equipped with a <strong>TDS Controller (or Modulator)</strong>. This valve allows service technicians to blend a tiny, safe amount of filtered water back into the RO water, calibrating the final output to the ideal 80-120 ppm range. This maintains both health benefits and the taste of your water.</p>
      
      <h3>Conclusion</h3>
      <p>Make sure to get your RO water tested regularly. If the water tastes different or feels heavy, your filters may be exhausted, causing the TDS to spike. At Shivam Water Solution, we provide free digital TDS testing for homes in Morbi.</p>
    `,
    ctaText: "Book a Free Water TDS Test on WhatsApp",
    ctaWhatsAppMessage: "Hi Shivam Water Solution, I want to get my drinking water TDS tested.",
    prevSlug: null,
    nextSlug: "active-copper-cartridge",
  },
  {
    slug: "active-copper-cartridge",
    title: "Why Active Copper Cartridges are Essential for Modern RO Systems",
    metaTitle: "Why Active Copper Cartridges are Essential for Modern RO Systems - Shivam Water Solution",
    metaDesc: "Discover how Active Copper Cartridges enrich your RO filtered water with essential copper ions, boosting immunity and digestion. Shivam Water Solution explains.",
    date: "June 2026",
    readTime: "4 Min Read",
    author: "Dilip Bhai",
    summary: "Reverse Osmosis (RO) systems are extremely effective at removing dissolved impurities, heavy metals, and micro-contaminants from water. However, the purification process is so rigorous that it also strips out natural minerals. Learn why Active Copper Cartridges are the ultimate solution to enrich your drinking water...",
    content: `
      <p>Reverse Osmosis (RO) systems are extremely effective at removing dissolved impurities, heavy metals, and micro-contaminants from water. However, the purification process is so rigorous that it also strips out natural minerals, making the water slightly acidic. To solve this problem, modern purifiers incorporate <strong>Active Copper Cartridges</strong>. Here's why this technology is a must-have for your home water purifier.</p>
      
      <h3>What is an Active Copper Cartridge?</h3>
      <p>An Active Copper Cartridge is a post-purification filter that infuses controlled, health-safe quantities of copper ions into the water after it has passed through the RO membrane. This ensures that the water stored in your purifier's tank is enriched with the therapeutic properties of copper.</p>
      
      <h3>1. The Ayurvedic Legacy Meets Modern Science</h3>
      <p>For thousands of years, Ayurveda has recommended storing drinking water in copper vessels (Tambu). Copper is an essential trace mineral required by the human body for overall metabolism. Active copper filters recreate this ancient practice instantly, saving you the daily task of cleaning and filling copper jugs.</p>
      
      <h3>2. Natural Anti-Bacterial Protection</h3>
      <p>Copper exhibits a natural oligodynamic effect—meaning it has a sterilizing effect on bacteria and viruses. When copper ions dissolve into the water, they rupture the cell walls of harmful microbes. This acts as an additional layer of natural disinfection, preventing bacterial growth inside the storage tank.</p>
      
      <h3>3. Boosts Immunity and Digestion</h3>
      <p>Copper is known to help stimulate the digestive system, reduce stomach infections, and aid in body detox. It also assists in the production of red blood cells, maintains healthy skin and hair, and boosts the body's immune response to fight common seasonal infections.</p>
      
      <h3>4. Restores Essential pH Balance</h3>
      <p>RO filtered water can have an acidic pH (below 7.0) due to mineral removal. The Active Copper Cartridge containing natural minerals raises the pH level, converting acidic water into alkaline water. Alkaline water is easier for body cells to absorb, ensuring superior hydration.</p>
      
      <h3>Maintenance and Filter Lifespan</h3>
      <p>Active Copper Cartridges gradually dissolve copper ions into the water, meaning the mineral media gets depleted over time. For optimal health benefits, copper filters should be replaced every <strong>10 to 12 months</strong>, depending on usage. If you purchase a premium RO model (like the Aqua 2090 or Olly Arise) from Shivam Water Solution, we pre-install active copper tech to guarantee healthy water.</p>
    `,
    ctaText: "Inquire about Copper Filter Upgrades",
    ctaWhatsAppMessage: "Hi Shivam Water Solution, I am interested in upgrading my RO with a Copper Filter.",
    prevSlug: "safe-tds-range",
    nextSlug: "needs-servicing",
  },
  {
    slug: "needs-servicing",
    title: "5 Signs Your RO Water Purifier Needs Immediate Servicing",
    metaTitle: "5 Signs Your RO Purifier Needs Immediate Servicing - Shivam Water Solution",
    metaDesc: "Is your water taste changing or flow slow? Learn the 5 warning signs that your RO water purifier needs urgent filter replacement or servicing in Morbi.",
    date: "June 2026",
    readTime: "5 Min Read",
    author: "Dilip Bhai",
    summary: "Water purifiers play a critical role in filtering out heavy metals, excess salt, and chemical impurities from our drinking water. However, like any mechanical filtration system, RO membranes and sediment filters wear out over time. Learn the primary warning signs like changes in water taste, slow output, constant noises, or elevated TDS levels...",
    content: `
      <p>Water purifiers play a critical role in filtering out heavy metals, excess salt, and chemical impurities from our drinking water. However, like any mechanical filtration system, RO membranes and sediment filters wear out over time. Delaying servicing can expose your family to hard water contaminants and bacterial infections.</p>
      
      <h3>1. A Distinct Change in Water Taste or Odor</h3>
      <p>If your drinking water suddenly tastes slightly salty, bitter, or has a metallic taste, it is a primary sign that the activated carbon filter or the RO membrane has stopped absorbing chlorine and organic compounds. The sweet taste of pure water should always remain consistent.</p>
      
      <h3>2. Drastically Slower Water Output</h3>
      <p>Does it take twice as long to fill a water bottle or storage tank? Clogged sediment filters or pre-carbon filters restrict the water flow. If left unresolved, this puts excessive pressure on the booster pump, which can burn out the SMPS power supply.</p>
      
      <h3>3. Excessive Wastewater Discharge</h3>
      <p>When filter cartridges become heavily clogged, the RO system has to push more water through the waste line to filter out impurities, leading to massive water wastage. Replacing clogged cartridges instantly restores efficiency.</p>
      
      <h3>4. Constant Vibrations or Loud Noises</h3>
      <p>If you hear constant humming, vibrating, or clicking sounds from under the cabinet, the booster pump is struggling due to choked filter cartridges or air blocks. Prompt filter replacement prevents costly pump repairs.</p>
      
      <h3>5. Rise in Water Hardness (TDS Levels)</h3>
      <p>Groundwater TDS levels in Morbi are notoriously high (often 1200+). You should check your output water TDS using a digital TDS pen. If it rises above 150, the membrane is exhausted and must be replaced immediately to protect kidney health.</p>
    `,
    ctaText: "Book Filter Service on WhatsApp",
    ctaWhatsAppMessage: "Hi Shivam Water Solution, I read your blog and I think my RO filter needs replacement.",
    prevSlug: "active-copper-cartridge",
    nextSlug: "alkaline-copper",
  },
  {
    slug: "alkaline-copper",
    title: "The Health Benefits of Alkaline and Copper Charged Drinking Water",
    metaTitle: "Health Benefits of Alkaline & Copper Charged Water - Shivam Water Solution",
    metaDesc: "Discover how active copper technology and alkaline mineralizers in your RO water purifier improve immunity, pH balance, and overall health.",
    date: "May 2026",
    readTime: "4 Min Read",
    author: "Dilip Bhai",
    summary: "While traditional RO purifiers are highly effective at removing impurities, they also strip away some essential minerals during filtration. Modern RO purifiers integrate Alkaline Cartridges and Active Copper Chambers to balance water pH levels, boost immunity, improve cell hydration, and utilize ancient Ayurvedic copper science...",
    content: `
      <p>While traditional RO purifiers are highly effective at removing impurities, they also strip away some essential minerals during filtration, making the water acidic. Modern RO purifiers integrate <strong>Alkaline Cartridges</strong> and <strong>Active Copper Chambers</strong> to restore these essential elements.</p>

      <h3>1. Maintaining Healthy pH Balance</h3>
      <p>Normal tap water has a neutral pH of 7.0. Acidic diets, pollution, and carbonated beverages increase acidity inside our body. Alkaline RO purifiers raise the pH of water to a healthy 8.0 to 9.5. Drinking alkaline water helps neutralize excess acid in the stomach, reducing acid reflux and improving digestion.</p>

      <h3>2. Boost Immunity and Metabolism</h3>
      <p>Water with active alkaline minerals is highly bio-available, meaning it is absorbed faster by body cells. Enhanced cellular hydration boosts energy levels, speeds up digestion, and flushes out metabolic toxins much faster.</p>

      <h3>3. Anti-Bacterial Power of Copper (Tambu)</h3>
      <p>For centuries, Ayurveda has recommended storing water in copper vessels. Modern Active Copper filters run water through a certified copper charge chamber. Copper naturally deactivates viruses, bacteria, and fungi on contact, acting as a secondary natural disinfection barrier. It also helps reduce inflammation and supports joint health.</p>

      <h3>Recommendation</h3>
      <p>When buying a new domestic RO system in Morbi, always look for models like the <strong>Aqua 2090 Unique Elegant</strong> or the <strong>Olly Aqua Arise</strong>, which feature built-in Copper + Zinc + Alkaline mineralizers to give you pure, sweet, and healthy water.</p>
    `,
    ctaText: "Inquire About Alkaline RO on WhatsApp",
    ctaWhatsAppMessage: "Hi Shivam Water Solution, I want to know more about Alkaline and Copper RO purifiers.",
    prevSlug: "needs-servicing",
    nextSlug: "industrial-ro-ceramic",
  },
  {
    slug: "industrial-ro-ceramic",
    title: "Industrial RO Plants for Ceramic Factories in Morbi",
    metaTitle: "Industrial RO Plants for Ceramic Factories in Morbi - Shivam Water Solution",
    metaDesc: "Morbi's ceramic industries demand high-quality water for manufacturing and worker health. Learn why heavy-duty industrial RO plants are essential.",
    date: "May 2026",
    readTime: "5 Min Read",
    author: "Dilip Bhai",
    summary: "Morbi is globally recognized as the second largest ceramic tiles manufacturing hub in the world. While factories leverage state-of-the-art machinery, they require massive quantities of pure, demineralized water to prepare slips, formulate glazes, and supply safe drinking water to their large workforces...",
    content: `
      <p>Morbi is globally recognized as the second largest ceramic tiles manufacturing hub in the world, hosting over 800 ceramic factories. While these factories leverage state-of-the-art machinery and raw materials to make tiles, there is one invisible, vital ingredient that keeps operations running smoothly: <strong>pure water</strong>. Here is why heavy-duty industrial and commercial RO plants are absolutely essential for Morbi's ceramic manufacturers.</p>

      <h3>1. The Demands of Ceramic Tile Manufacturing</h3>
      <p>Water is used extensively throughout the ceramic manufacturing process, especially in slip preparation (clay mixing), glaze formulation, and cooling systems. The groundwater in Morbi's industrial zones (like Lakhdhirpur Road, Ghuntu, and Pipali Road) is extremely hard, with TDS levels often exceeding 2000 ppm.</p>
      <p>Using raw groundwater has severe impacts:</p>
      <ul>
        <li><strong>Glaze Defects:</strong> High salt content reacts with ceramic chemicals, leading to uneven glazes, pinholes, and color variation on tiles.</li>
        <li><strong>Machinery Scaling:</strong> Calcium and magnesium deposits clog nozzle sprayers in glazing lines and cause severe scaling inside boiler tubes, leading to frequent breakdowns.</li>
      </ul>
      <p>Using RO purified water guarantees consistent quality and protects multi-million rupee machinery.</p>

      <h3>2. Providing Safe Drinking Water to the Workforce</h3>
      <p>Ceramic factories in Morbi employ hundreds of thousands of workers who reside in nearby labor colonies. Providing them with safe, clean, and disease-free drinking water is a core responsibility. Standard domestic filters cannot cope with the sheer volume of water required. A commercial RO system (ranging from 250 LPH to 2000 LPH) connected to water coolers ensures that workers have access to cold, pure drinking water, reducing absenteeism due to waterborne illnesses.</p>

      <h3>3. High Capacity Custom RO Solutions</h3>
      <p>Industrial RO plants differ significantly from domestic filters. They utilize high-pressure stainless steel vertical pumps, large commercial membrane vessels (like 4040 or 8040 membranes), and advanced sand/carbon media pre-filters. Systems are custom-designed based on the specific inlet water TDS level and daily LPH (Litres Per Hour) demand.</p>

      <h3>4. Essential Maintenance and AMC Contracts</h3>
      <p>Because industrial RO plants run almost continuously under harsh water conditions, regular servicing is critical. Pre-filters must be backwashed daily, and chemical anti-scalant dosing pumps must be filled to prevent membrane clogging. An Annual Maintenance Contract (AMC) with local experts ensures that high-pressure pumps and membranes are inspected regularly, preventing costly emergency shut-downs.</p>

      <h3>Conclusion</h3>
      <p>Shivam Water Solution has years of hands-on experience designing, installing, and servicing commercial and industrial RO systems across Morbi's ceramic manufacturing belt. We understand the local groundwater conditions like no other.</p>
    `,
    ctaText: "Get a Commercial RO Plant Consultation",
    ctaWhatsAppMessage: "Hi Shivam Water Solution, I need a quote for a Commercial/Industrial RO plant.",
    prevSlug: "alkaline-copper",
    nextSlug: "groundwater-morbi",
  },
  {
    slug: "groundwater-morbi",
    title: "Understanding Groundwater Quality and High TDS Levels in Morbi",
    metaTitle: "Groundwater Quality & High TDS Levels in Morbi - Shivam Water Solution",
    metaDesc: "Learn about groundwater TDS levels in Morbi (Ravapar, Mahendranagar, Lakhdhirpur) and why a TDS controller in your RO is crucial for safe drinking water.",
    date: "April 2026",
    readTime: "5 Min Read",
    author: "Dilip Bhai",
    summary: "Morbi is globally famous as a ceramic hub, but industrialization and geographic conditions have deeply affected the groundwater table. Learn about localized TDS levels across Ravapar Road, Mahendranagar, and Lakhdhirpur Road, and discover the ideal drinking water TDS ranges using modulators...",
    content: `
      <p>Morbi is globally famous as a ceramic manufacturing hub. However, heavy industrialization and geographic conditions have deeply affected the groundwater table. The groundwater hardness, measured as Total Dissolved Solids (TDS), is extremely high across residential and industrial zones.</p>

      <h3>What is TDS?</h3>
      <p>TDS refers to the inorganic salts (principally calcium, magnesium, potassium, sodium, bicarbonates, chlorides, and sulfates) dissolved in water. While body needs trace minerals, drinking water with extremely high TDS causes long-term health concerns.</p>

      <h3>Groundwater Reality in Morbi Areas</h3>
      <ul>
        <li><strong>Ravapar Road & Vavdi Road:</strong> Residential societies here report groundwater TDS between 1000 and 1500. Water feels hard, soap doesn't lather easily, and scaling is common on bathroom tiles.</li>
        <li><strong>Mahendranagar & Shanala Road:</strong> Rapidly expanding suburbs experience TDS levels ranging from 1200 to 1800. Drinking this water raw can lead to kidney stones, hair fall, and dry skin.</li>
        <li><strong>Lakhdhirpur Road & Ghuntu Road:</strong> Ceramic industrial belts show groundwater TDS reaching up to 2500+. Factories operating here require heavy-duty multi-stage commercial or industrial RO plants (250 LPH, 500 LPH, or 1000 LPH) to supply safe drinking water to labor quarters.</li>
      </ul>

      <h3>What is the Ideal Drinking Water TDS?</h3>
      <p>According to the World Health Organization (WHO), water below 300 TDS is excellent. Raw groundwater in Morbi is unsafe for direct drinking. A professionally maintained RO purifier uses a <strong>TDS Controller (Modulator)</strong> to stabilize the final drinking water between <strong>80 TDS and 120 TDS</strong>. This ensures that the water remains light, sweet, and retains just the right amount of healthy minerals.</p>
    `,
    ctaText: "Request Free Water TDS Testing",
    ctaWhatsAppMessage: "Hi Shivam Water Solution, please tell me more about water testing in my area.",
    prevSlug: "industrial-ro-ceramic",
    nextSlug: null,
  },
];

import generatedBlogsData from "./blogs_generated.json";

export function getCombinedBlogs(): BlogPost[] {
  const generatedBlogs: BlogPost[] = (generatedBlogsData as any[]).map((gb) => ({
    slug: gb.slug,
    title: gb.title,
    metaTitle: gb.metaTitle || gb.title,
    metaDesc: gb.metaDesc || gb.excerpt,
    date: gb.date || "Recent",
    readTime: gb.readTime || "4 Min Read",
    author: gb.author || "Dilipbhai (Proprietor, Shivam Water Solution)",
    summary: gb.excerpt || gb.title,
    content: gb.content ? gb.content.replace(/\n/g, '<br/>').replace(/## (.*?)\n/g, '<h3>$1</h3>').replace(/# (.*?)\n/g, '<h2>$1</h2>') : "",
    ctaText: "Inquire / Book Service on WhatsApp",
    ctaWhatsAppMessage: `Hi Shivam Water Solution, I read your article "${gb.title}" and would like to inquire.`,
    prevSlug: null,
    nextSlug: null,
  }));

  const all = [...generatedBlogs, ...blogs];
  return all;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const combined = getCombinedBlogs();
  return combined.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  const combined = getCombinedBlogs();
  return combined.map((b) => b.slug);
}
