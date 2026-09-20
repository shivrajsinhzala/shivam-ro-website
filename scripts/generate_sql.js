const fs = require('fs');
const path = require('path');

const products = [
  {
    id: 'newater-1000lph',
    name_en: 'NEWATER Industrial RO Plant 1000 LPH',
    name_gu: 'ન્યુવોટર ઇન્ડસ્ટ્રીયલ આરઓ પ્લાન્ટ 1000 LPH',
    badge_en: '1000 LPH Industrial',
    badge_gu: '1000 LPH ઇન્ડસ્ટ્રીયલ',
    category: 'commercial',
    images: ['/api/images/products/newater-1000lph.jpeg'],
    tagline_en: 'High Performance • Reliable • Efficient Industrial RO Plant',
    tagline_gu: 'ઉચ્ચ કામગીરી • વિશ્વસનીય • કાર્યક્ષમ ઔદ્યોગિક આરઓ પ્લાન્ટ',
    capacity_en: '1000 LPH Flow Rate',
    capacity_gu: '1000 LPH ક્ષમતા',
    warranty_en: '1 Year Warranty',
    warranty_gu: '1 વર્ષ વોરંટી',
    description_en: 'NEWATER 1000 LPH Industrial RO Plant is engineered for high-performance, reliable, and efficient water purification using advanced Reverse Osmosis technology. Designed for pure and safe water in industrial applications. Features a compact skid-mounted SS frame, Willo 1.0 HP raw water pump, dual FRP media filters (1354 size), Shimge/Lubi 2 HP vertical multistage high-pressure pump, 4x NEWATER-4040 membranes, and a digital atomization control panel with online TDS monitoring.',
    description_gu: 'NEWATER 1000 LPH ઇન્ડસ્ટ્રીયલ આરઓ પ્લાન્ટ ઉચ્ચ કામગીરી, વિશ્વસનીય અને કાર્યક્ષમ શુદ્ધિકરણ માટે અદ્યતન રિવર્સ ઓસ્મોસિસ ટેકનોલોજી સાથે ડિઝાઇન કરવામાં આવ્યો છે. તેમાં સ્ટેનલેસ સ્ટીલ સ્કિડ માઉન્ટેડ ફ્રેમ, વિલો 1.0 HP પંપ, ડ્યુઅલ FRP ફિલ્ટર્સ, શિમગે/લુબી 2 HP વર્ટિકલ મલ્ટીસ્ટેજ પંપ, 4x 4040 મેમ્બ્રેન અને ઓનલાઇન TDS મીટર સાથેનું ડિજિટલ કંટ્રોલ પેનલ છે.',
    features_en: [
      '1000 LPH Pure Water Output - Consistent & Reliable Performance',
      'High Quality Components - Long Life, Corrosion Resistant & Low Maintenance',
      'Advanced RO Technology - Superior Purification with High Rejection Rate',
      'Fully Automatic Operation - Digital Control Panel with Online TDS Monitoring',
      'Energy Efficient - Optimized Design for Maximum Savings',
      'Compact Stainless Steel (SS) Skid Mounted System for Easy Installation & Service'
    ],
    features_gu: [],
    specs_en: {
      'Raw Water Pump': 'Centrifugal, Make: Willo, 1.0 HP, 1 Phase',
      'Sand Media Filter': 'Size 1354, FRP, Capacity 100 Ltrs',
      'Carbon Media Filter': 'Size 1354, FRP, Capacity 100 Ltrs',
      'Valve': 'Multi-Port Valve of 1.00" - 2 Numbers',
      'Dosing System': 'Anti-Scalent Chemical (NSF Approved)',
      'Micron Cartridge Filter': 'Total: Two, Jumbo 20"',
      'High Pressure Pump': 'Vertical Multi Stage, Shimge/Lubi - 2 HP Motor (I or III Phase)',
      'Pressure Tube': 'FRP, Size 4080 - 2 Numbers',
      'Membrane': 'Make: NEWATER-4040*4 (4 Nos)',
      'Pressure Gauges': 'Five, Glycerin Fill 0-21 kg/cm²',
      'Flow Meters': 'Two for Production & Rejection',
      'Atomization Panel Board': 'Digital Panel Board with Online TDS Meter',
      'LPS (Low Pressure Switch)': 'Low Pressure Switch to Control Dry Run of Pump',
      'SV (Solenoid Valve)': 'To Stop Drain Water When System Stops',
      'Floty': 'For Atomization of Product Water Tank',
      'Piping': 'One Lot of FRP',
      'Skid Frame': 'Stainless Steel (SS)',
      'Feed Water TDS': '< 2000 ppm',
      'Operating Pressure': '10 - 15 kg/cm²',
      'Operating Temperature': '5 - 45 °C',
      'Recovery Rate': '50 - 75% (Approx.)',
      'pH Range': '6.5 - 8.5',
      'Power Supply': '220 / 415 V AC, 50 Hz',
      'Applications': 'Boiler Feed Water, Cooling Towers, Pharmaceutical Industries, Food & Beverage Industry, Chemical & Process Industries, Textile & Electroplating Units, Laboratories & Hospitals'
    },
    specs_gu: {},
    meta_title: 'NEWATER Industrial RO Plant 1000 LPH - Shivam Water Solution Morbi',
    meta_desc: 'Buy NEWATER Industrial RO Plant 1000 LPH in Morbi & Rajkot. 1000 LPH heavy commercial and industrial water purification plant with Willo pump and 4040 membranes. Sales, installation, and repair by Shivam Water Solution.',
    sort_order: 312,
    is_active: 1
  },
  {
    id: 'newater-2000lph',
    name_en: 'NEWATER Industrial RO System 2000 LPH',
    name_gu: 'ન્યુવોટર ઇન્ડસ્ટ્રીયલ આરઓ સિસ્ટમ 2000 LPH',
    badge_en: '2000 LPH Industrial',
    badge_gu: '2000 LPH ઇન્ડસ્ટ્રીયલ',
    category: 'commercial',
    images: ['/api/images/products/newater-2000lph.jpeg'],
    tagline_en: 'Pure Water. Powerful Solution. Reliable Performance. Pure Results.',
    tagline_gu: 'શુદ્ધ પાણી. શક્તિશાળી ઉકેલ. વિશ્વસનીય કામગીરી.',
    capacity_en: '2000 LPH Flow Rate',
    capacity_gu: '2000 LPH ક્ષમતા',
    warranty_en: '1 Year Warranty',
    warranty_gu: '1 વર્ષ વોરંટી',
    description_en: 'Engineered for efficiency and built for reliability, the NEWATER 2000 LPH Industrial RO System delivers high-quality purified water for a wide range of industrial applications. Built with high-recovery architecture, premium FRP and SS components, Kirloskar 1.5 HP 3-phase raw water pump, dual 1454 FRP vessels (150L capacity each), Lubi 4 HP vertical multi-stage high pressure pump, 2x TFC-8040 membranes in 8080 FRP tube, and digital control panel with online TDS monitoring.',
    description_gu: 'કાર્યક્ષમતા અને વિશ્વસનીયતા માટે નિર્મિત, NEWATER 2000 LPH ઇન્ડસ્ટ્રીયલ આરઓ સિસ્ટમ ઔદ્યોગિક વપરાશ માટે ઉચ્ચ ગુણવત્તાવાળું શુદ્ધ પાણી પૂરું પાડે છે. તેમાં કિર્લોસ્કર 1.5 HP થ્રી-ફેઝ પંપ, ડ્યુઅલ 1454 FRP ફિલ્ટર્સ (150 લિટર), લુબી 4 HP વર્ટિકલ મલ્ટીસ્ટેજ પંપ, 2x TFC-8040 મેમ્બ્રેન અને ઓનલાઇન TDS મોનિટરિંગ સાથે ડિજિટલ પેનલ છે.',
    features_en: [
      'High Recovery - Efficient Design for Maximum Water Recovery and Minimum Wastage',
      'Premium Components - Made with High-Quality FRP, SS & Industrial Grade Components',
      'Advanced Control - Digital Panel with Online TDS Meter for Real-Time Monitoring',
      'Reliable Operation - Fully Automatic Operation with Safety Protection',
      'Corrosion Resistant - Long-Lasting FRP & Stainless Steel Construction',
      'Energy Efficient - Optimized Design for Low Power Consumption'
    ],
    features_gu: [],
    specs_en: {
      'Raw Water Pump': 'Centrifugal, Make: Kirloskar, 1.5 HP, III Phase',
      'Sand Media Filter': 'Size 1454, FRP, Capacity 150 Ltrs',
      'Carbon Media Filter': 'Size 1454, FRP, Capacity 150 Ltrs',
      'Valve': 'MPV of 1.5" - 2 Numbers',
      'Dosing System': 'Anti-Scalent Chemical (NSF Approved)',
      'Micron Cartridge Filter': 'Total: Two, Jumbo 20"',
      'High Pressure Pump': 'Vertical Multi Stage, Make: Lubi - 4 HP Motor, III Phase',
      'Pressure Tube': 'FRP, Size 8080',
      'Membrane': 'TFC-8040*2 (2 Nos)',
      'Pressure Gauges': 'Five, Glycerin Fill 0-21 kg/cm²',
      'Flow Meters': 'Two for Production & Rejection',
      'Atomization Panel Board': 'Digital Panel Board with Online TDS Meter',
      'LPS (Low Pressure Switch)': 'Low Pressure Switch to Control Dry Run of Pump',
      'Floty': 'For Atomization of Product Water Tank',
      'Piping': 'One Lot of FRP',
      'Skid Frame': 'Stainless Steel (SS)',
      'Applications': 'Boiler Feed Water, Pharmaceutical Industry, Cooling Towers, Food & Beverage Industry, Electronics Industry, Textile Industry, General Industrial Use'
    },
    specs_gu: {},
    meta_title: 'NEWATER Industrial RO System 2000 LPH - Shivam Water Solution Morbi',
    meta_desc: 'Buy NEWATER Industrial RO System 2000 LPH in Morbi & Rajkot. 2000 LPH high-recovery industrial reverse osmosis system with Kirloskar pump and TFC-8040 membranes. Sales, installation, and AMC by Shivam Water Solution.',
    sort_order: 314,
    is_active: 1
  },
  {
    id: 'newater-5000lph',
    name_en: 'NEWATER Industrial RO System 5000 LPH',
    name_gu: 'ન્યુવોટર ઇન્ડસ્ટ્રીયલ આરઓ સિસ્ટમ 5000 LPH',
    badge_en: '5000 LPH Fully Automatic',
    badge_gu: '5000 LPH ફુલ્લી ઓટોમેટિક',
    category: 'commercial',
    images: ['/api/images/products/newater-5000lph.jpeg'],
    tagline_en: 'Fully Automatic Industrial RO System - Consistent High Purity Water',
    tagline_gu: 'સંપૂર્ણ ઓટોમેટિક ઇન્ડસ્ટ્રીયલ આરઓ સિસ્ટમ - સતત ઉચ્ચ શુદ્ધતા ધરાવતું પાણી',
    capacity_en: '5000 LPH Flow Rate',
    capacity_gu: '5000 LPH ક્ષમતા',
    warranty_en: '1 Year Warranty',
    warranty_gu: '1 વર્ષ વોરંટી',
    description_en: 'NEWATER 5000 LPH Industrial RO System is a heavy-duty, fully automatic water purification plant engineered for large-scale industrial operations. Removes up to 98–99% of dissolved salts, TDS, and impurities. Equipped with Kirloskar 3.0 HP 3-phase pump, heavy Size 3672 FRP Dual Media Filter, Auto MPV 2.0", Filter Bag Assembly, Lubi/Shimge 7.5 HP vertical multi-stage pump, 5x TFC-8040 membranes in 8080 and 80120 FRP housings, solenoid valve, and SS-304 heavy skid frame.',
    description_gu: 'NEWATER 5000 LPH ઇન્ડસ્ટ્રીયલ આરઓ સિસ્ટમ મોટા પાયાના ઔદ્યોગિક કામગીરી માટે એક સંપૂર્ણ ઓટોમેટિક વોટર પ્યુરિફિકેશન પ્લાન્ટ છે. તે 98-99% ઓગળેલા ક્ષારો, TDS અને અશુદ્ધિઓને દૂર કરે છે. કિર્લોસ્કર 3.0 HP પંપ, સાઈઝ 3672 FRP ડ્યુઅલ મીડિયા ફિલ્ટર, ઓટો MPV 2.0", લુબી/શિમગે 7.5 HP વર્ટિકલ મલ્ટીસ્ટેજ પંપ, 5x TFC-8040 મેમ્બ્રેન અને SS-304 સ્ટેનલેસ સ્ટીલ સ્કિડ સાથે સજ્જ છે.',
    features_en: [
      'Pure & Safe Water - Removes up to 98–99% of Dissolved Salts, TDS, Hardness and Impurities',
      'Fully Automatic - PLC Based Smart Control Panel for Unattended Operation and System Protection',
      'High Recovery - Optimized Design for Higher Water Recovery and Low Operating Cost',
      'Rust Free & Durable - High Quality FRP Vessel, SS Frame & Corrosion Resistant Components for Long Life',
      'Consistent Output - Delivers Consistent Quality Water for Critical Industrial Processes',
      'Low Maintenance - Easy Operation, Minimal Maintenance and Low Downtime for Better Efficiency'
    ],
    features_gu: [],
    specs_en: {
      'Raw Water Pump': 'Make: Kirloskar, 3.0 HP, III Phase',
      'Dual Media Filter': 'Size 3672, FRP',
      'Valve': 'Auto MPV of 2.0"',
      'Dosing System': 'Anti-Scalent Chemical (NSF Approved)',
      'Micron Cartridge Filter': 'Total: Two, Jumbo 20"',
      'Filter Bag Assembly': 'Total: Two, Jumbo 20"',
      'High Pressure Pump': 'Vertical Multi Stage, Make: Lubi/Shimge - 7.5 HP Motor, III Phase',
      'Pressure Tube': 'FRP, Size 8080 and 80120',
      'Membrane': 'TFC-8040*5 (5 Nos)',
      'Pressure Gauges': 'Five, Glycerin Fill 0-21 kg/cm²',
      'Flow Meters': 'Two for Production & Rejection',
      'Atomization Panel Board': 'Digital Panel Board with Online TDS Meter',
      'LPS (Low Pressure Switch)': 'Low Pressure Switch to Control Dry Run of Pump',
      'Floty': 'For Atomization of Product Water Tank',
      'Solenoid Valve': 'One Solenoid Valve',
      'Piping': 'One Lot of FRP and SS for High Pressure',
      'Skid Frame': 'Stainless Steel SS-304',
      'Salt Rejection Rate': 'Up to 98 - 99% of Dissolved Salts & TDS',
      'Applications': 'Pharmaceuticals, Chemical Industry, Food & Beverages, Boiler Feed Water, Electronics & Electroplating, Commercial & Institutional'
    },
    specs_gu: {},
    meta_title: 'NEWATER Industrial RO System 5000 LPH - Shivam Water Solution Morbi',
    meta_desc: 'Buy NEWATER Industrial RO System 5000 LPH in Morbi & Rajkot. Heavy-duty 5000 LPH fully automatic industrial water purification system for factories and commercial establishments. Sales, installation, and AMC by Shivam Water Solution.',
    sort_order: 316,
    is_active: 1
  }
];

function escapeSql(val) {
  if (val === null || val === undefined) return "''";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

let sql = '-- Add NEWATER Industrial RO products\n';

for (const p of products) {
  sql += `
INSERT INTO products
  (id, name_en, name_gu, badge_en, badge_gu, category,
   images, tagline_en, tagline_gu, capacity_en, capacity_gu,
   warranty_en, warranty_gu, description_en, description_gu,
   features_en, features_gu, specs_en, specs_gu,
   meta_title, meta_desc, sort_order, is_active)
VALUES (
  ${escapeSql(p.id)},
  ${escapeSql(p.name_en)},
  ${escapeSql(p.name_gu)},
  ${escapeSql(p.badge_en)},
  ${escapeSql(p.badge_gu)},
  ${escapeSql(p.category)},
  ${escapeSql(JSON.stringify(p.images))},
  ${escapeSql(p.tagline_en)},
  ${escapeSql(p.tagline_gu)},
  ${escapeSql(p.capacity_en)},
  ${escapeSql(p.capacity_gu)},
  ${escapeSql(p.warranty_en)},
  ${escapeSql(p.warranty_gu)},
  ${escapeSql(p.description_en)},
  ${escapeSql(p.description_gu)},
  ${escapeSql(JSON.stringify(p.features_en))},
  ${escapeSql(JSON.stringify(p.features_gu))},
  ${escapeSql(JSON.stringify(p.specs_en))},
  ${escapeSql(JSON.stringify(p.specs_gu))},
  ${escapeSql(p.meta_title)},
  ${escapeSql(p.meta_desc)},
  ${p.sort_order},
  ${p.is_active}
)
ON CONFLICT(id) DO UPDATE SET
  name_en = excluded.name_en,
  name_gu = excluded.name_gu,
  badge_en = excluded.badge_en,
  badge_gu = excluded.badge_gu,
  category = excluded.category,
  images = excluded.images,
  tagline_en = excluded.tagline_en,
  tagline_gu = excluded.tagline_gu,
  capacity_en = excluded.capacity_en,
  capacity_gu = excluded.capacity_gu,
  warranty_en = excluded.warranty_en,
  warranty_gu = excluded.warranty_gu,
  description_en = excluded.description_en,
  description_gu = excluded.description_gu,
  features_en = excluded.features_en,
  features_gu = excluded.features_gu,
  specs_en = excluded.specs_en,
  specs_gu = excluded.specs_gu,
  meta_title = excluded.meta_title,
  meta_desc = excluded.meta_desc,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
`;
}

const sqlPath = path.join(__dirname, 'add_products.sql');
fs.writeFileSync(sqlPath, sql, 'utf-8');
console.log(`Generated SQL to ${sqlPath}`);
