const fs = require('fs');
const path = require('path');

// 1. Detailed Product Database (18 products matching brochure PDFs)
const products = [
  {
    id: "aqua-2090",
    name: "Aqua 2090 Unique Elegant",
    nameGu: "એકવા ૨૦૯૦ યુનિક એલિગન્ટ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp", // We can use product_domestic.webp as base
    tagline: "RO + Copper + Alkaline Technology",
    taglineGu: "RO + કોપર + આલ્કલાઇન ટેકનોલોજી",
    capacity: "10 Ltrs Detachable Tank",
    capacityGu: "૧૦ લીટર ડીટેચેબલ ટાંકી",
    warranty: "1 Year Full Warranty",
    warrantyGu: "૧ વર્ષ ફુલ વોરંટી",
    description: "Featuring a detachable storage tank for easy cleaning, the Aqua 2090 integrates state-of-the-art Alkaline and Copper purification to ensure sweet, mineral-rich drinking water.",
    descriptionGu: "સરળ સફાઈ માટે ડીટેચેબલ ટાંકી ધરાવતું એકવા ૨૦૯૦ મશીન આલ્કલાઇન અને કોપર પ્યુરિફિકેશન સાથે આવે છે, જે તમને મીઠું અને મિનરલયુક્ત પાણી પૂરું પાડે છે.",
    features: ["10-Stage Filtration", "pH Balancer", "Premium Grey Finish", "Dust Proof Cabinet"],
    featuresGu: ["૧૦-સ્ટેજ ફિલ્ટરેશન", "pH બેલેન્સર", "પ્રીમિયમ ગ્રે ફિનિશ", "ડસ્ટ પ્રૂફ કેબિનેટ"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + Copper + Alkaline + TDS Control",
      "Cabinet Material": "Food Grade ABS Plastic",
      "Installation Type": "Wall Mounted / Counter Top",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + કોપર + આલ્કલાઇન + TDS કંટ્રોલ",
      "કેબિનેટ મટીરીયલ": "ફૂડ ગ્રેડ ABS પ્લાસ્ટિક",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ / કાઉન્ટર ટોપ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-9090",
    name: "Aqua 9090 Smart LED",
    nameGu: "એકવા ૯૦૯૦ સ્માર્ટ LED",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Trendy & Classic Design with Invisible Screw",
    taglineGu: "અદ્રશ્ય સ્ક્રૂ સાથે ટ્રેન્ડી અને ક્લાસિક ડિઝાઇન",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર ટાંકી",
    warranty: "1 Year Full Warranty",
    warrantyGu: "૧ વર્ષ ફુલ વોરંટી",
    description: "Designed with an invisible screw structure and unbreakable food-grade cabinet, the Aqua 9090 has built-in smart LED indicators that reflect live power and tank states.",
    descriptionGu: "અદ્રશ્ય સ્ક્રૂ અને મજબૂત ફૂડ-ગ્રેડ કેબિનેટ સાથે બનેલું એકવા ૯૦૯૦ મશીન સ્માર્ટ LED ઇન્ડિકેટર્સ સાથે આવે છે, જે મશીનની ચાલુ સ્થિતિ દર્શાવે છે.",
    features: ["Smart LED Indicators", "Heavy Food Grade ABS Cabinet", "Invisible Screw Design", "Easy Service Structure"],
    featuresGu: ["સ્માર્ટ LED ઇન્ડિકેટર્સ", "હેવી ફૂડ ગ્રેડ ABS કેબિનેટ", "અદ્રશ્ય સ્ક્રૂ ડિઝાઇન", "સર્વિસ કરવામાં સરળ"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + UV + Carbon + Sediment",
      "Cabinet Material": "Unbreakable Food-Grade ABS",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + કાર્બન + સેડીમેન્ટ",
      "કેબિનેટ મટીરીયલ": "મજબૂત ફૂડ-ગ્રેડ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "alica-pure",
    name: "Alica Pure Premium",
    nameGu: "એલિકા પ્યોર પ્રીમિયમ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Health, Delicacy & Beauty Redefined",
    taglineGu: "સ્વાસ્થ્ય, સ્વાદ અને સુંદરતાનો ત્રિવેણી સંગમ",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર ક્ષમતા",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "The Alica Pure RO combines elegant black and white aesthetics with 7 stages of deep filtration to remove hard water salts (TDS) and chemicals efficiently.",
    descriptionGu: "એલિકા પ્યોર RO સિસ્ટમ બ્લેક અને વ્હાઇટ આકર્ષક દેખાવ સાથે ૭-સ્ટેજ ફિલ્ટરેશન પ્રદાન કરે છે, જે ક્ષાર અને કેમિકલને સચોટ રીતે દૂર કરે છે.",
    features: ["Elegant Dual Tone Design", "High-Flow Rate Output", "Advanced Carbon Polishers", "Wall Mounted Fitting"],
    featuresGu: ["આકર્ષક ડ્યુઅલ ટોન ડિઝાઇન", "હાઇ-ફ્લો રેટ આઉટપુટ", "એડવાન્સ કાર્બન ફિલ્ટર", "દિવાલ પર ફીટીંગ"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + Carbon + Pre-Filter",
      "Cabinet Material": "Food-Grade Plastic",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + કાર્બન + પ્રી-ફિલ્ટર",
      "કેબિનેટ મટીરીયલ": "ફૂડ-ગ્રેડ પ્લાસ્ટિક",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-touch",
    name: "Aqua Touch Metallic",
    nameGu: "એકવા ટચ મેટાલિક",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "100% Food Grade ABS Plastic with Unbreakable Tank",
    taglineGu: "૧૦૦% ફૂડ ગ્રેડ ABS પ્લાસ્ટિક અને મજબૂત ટાંકી",
    capacity: "12 Ltrs Storage",
    capacityGu: "૧૨ લીટર ટાંકી",
    warranty: "1 Year Full Warranty",
    warrantyGu: "૧ વર્ષ ફુલ વોરંટી",
    description: "Available in Metallic Black, Metallic Grey, and Blue, the Aqua Touch Series features a heavy-duty unbreakable storage tank and multi-stage mineralizers.",
    descriptionGu: "મેટાલિક બ્લેક, ગ્રે અને બ્લુ કલરમાં ઉપલબ્ધ, એકવા ટચ સિરીઝ હેવી-ડ્યુટી મજબૂત ટાંકી અને મલ્ટી-સ્ટેજ મિનરલાઇઝર્સ સાથે આવે છે.",
    features: ["Metallic Black / Grey / Blue Options", "Unbreakable Storage Tank", "100% Food Grade Plastic", "TDS Adjuster Valve"],
    featuresGu: ["મેટાલિક બ્લેક / ગ્રે / બ્લુ કલર ઓપ્શન", "અનબ્રેકેબલ ટાંકી", "૧૦૦% ફૂડ ગ્રેડ પ્લાસ્ટિક", "TDS એડજસ્ટર વાલ્વ"],
    specs: {
      "Storage Capacity": "12 Litres",
      "Purification Type": "RO + UV + Alkaline + Minerals",
      "Cabinet Material": "ABS Food Grade",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૨ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + આલ્કલાઇન + મિનરલ્સ",
      "કેબિનેટ મટીરીયલ": "ABS ફૂડ ગ્રેડ",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "olly-arise",
    name: "Olly Aqua Arise Series",
    nameGu: "ઓલી એકવા અરાઇઝ સિરીઝ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Zinc + Copper + Alkaline Technology",
    taglineGu: "ઝિંક + કોપર + આલ્કલાઇન ટેકનોલોજી",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર સંગ્રહ ક્ષમતા",
    warranty: "1 Year Complete Warranty",
    warrantyGu: "૧ વર્ષ પૂરી વોરંટી",
    description: "The Arise Midnight Black features a patent design, 7 stages of advanced filter purification, smart LED indicators, and combines Copper with Zinc to enrich water properties.",
    descriptionGu: "અરાઇઝ મિડનાઇટ બ્લેક મશીન ૭-સ્ટેજ એડવાન્સ ફિલ્ટર અને સ્માર્ટ LED લાઇટ્સ સાથે આવે છે. તે પાણીમાં કોપર અને ઝિંક ભેળવી સ્વાસ્થ્યવર્ધક બનાવે છે.",
    features: ["Patent Design No. 408714-001", "7-Stage Active Purity", "Smart LED indicators", "Zinc & Copper Mineral Cartridge"],
    featuresGu: ["પેટન્ટ ડિઝાઇન નં. 408714-001", "૭-સ્ટેજ એક્ટિવ ફિલ્ટરેશન", "સ્માર્ટ LED ઇન્ડિકેટર્સ", "ઝિંક અને કોપર મિનરલ કાર્ટ્રિજ"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + UV + Zinc + Copper + Alkaline",
      "Cabinet Material": "Heavy ABS Cabinet",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + ઝિંક + કોપર + આલ્કલાઇન",
      "કેબિનેટ મટીરીયલ": "હેવી ABS કેબિનેટ",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "brio-ro",
    name: "Brio RO Purifier",
    nameGu: "બ્રિઓ RO પ્યુરિફાયર",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "High Pressure Pump with 13-Layer Membrane",
    taglineGu: "૧૩-લેયર મેમ્બ્રેન અને હેવી પ્રેશર બૂસ્ટર પંપ",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર સંગ્રહ",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "Equipped with a Grand Forest pump, Bodeer fittings, and a 13-layer imported membrane. Features a heavy UV barrel of 190g to kill all bacteria instantly.",
    descriptionGu: "બ્રિઓ RO સિસ્ટમ ગ્રાન્ડ ફોરેસ્ટ પંપ, ૧૩-લેયર ઇમ્પોર્ટેડ મેમ્બ્રેન અને ૧૯૦ ગ્રામની હેવી UV બેરલ સાથે આવે છે, જે પાણીના કીટાણુઓનો નાશ કરે છે.",
    features: ["Grand Forest Pump", "13-Layer Imported Membrane", "Heavy 190g UV Barrel", "Axiom/Lucent SMPS Power Protection"],
    featuresGu: ["ગ્રાન્ડ ફોરેસ્ટ પંપ", "૧૩-લેયર ઇમ્પોર્ટેડ મેમ્બ્રેન", "હેવી ૧૯૦ ગ્રામ UV બેરલ", "SMPS પાવર પ્રોટેક્શન"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + UV + TDS Controller",
      "Cabinet Material": "Premium ABS",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + TDS કંટ્રોલર",
      "કેબિનેટ મટીરીયલ": "પ્રીમિયમ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-flip",
    name: "Aqua Flip (Raga Series)",
    nameGu: "એકવા ફ્લિપ (રાગા સિરીઝ)",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "13 Ltr Detachable Storage in Vibrant Colors",
    taglineGu: "૧૩ લીટર ડીટેચેબલ ટાંકી અને આકર્ષક કલર્સ",
    capacity: "13 Ltrs Detachable Tank",
    capacityGu: "૧૩ લીટર ડીટેચેબલ ટાંકી",
    warranty: "1 Year Complete Warranty",
    warrantyGu: "૧ વર્ષ પૂરી વોરંટી",
    description: "The Aqua Flip is the largest cabinet model featuring a 13 Ltr detachable tank. Available in Aqua Green, Blue, Purple, Metallic Black, Ruby Pink, Daytona Silver, and Rolex Green.",
    descriptionGu: "૧૩ લીટરની મોટી ક્ષમતા ધરાવતી ડીટેચેબલ ટાંકી અને આકર્ષક આધુનિક કલર્સ (જેમ કે રૂબી પિંક, સિલ્વર, ગ્રીન વગેરે) માં ઉપલબ્ધ પ્રીમિયમ મશીન.",
    features: ["Large 13L Capacity", "Multiple Pastel & Metallic Colors", "Detachable Easy Clean Tank", "Copper charge technology"],
    featuresGu: ["મોટી ૧૩ લીટર ટાંકી", "વિવિધ મેટાલિક કલર ઓપ્શન", "સરળ સફાઈ માટે ડીટેચેબલ ટાંકી", "કોપર ચાર્જ ટેકનોલોજી"],
    specs: {
      "Storage Capacity": "13 Litres",
      "Purification Type": "RO + UV + Alkaline + Copper",
      "Cabinet Material": "ABS Food Grade",
      "Installation Type": "Wall Mounted / Counter Top",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૩ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + આલ્કલાઇન + કોપર",
      "કેબિનેટ મટીરીયલ": "ABS ફૂડ ગ્રેડ",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ / કાઉન્ટર ટોપ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-jade",
    name: "Aqua Jade Purifier",
    nameGu: "એકવા જેડ પ્યુરિફાયર",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Safe & Healthy Water with LED Indicator",
    taglineGu: "LED ઇન્ડિકેટર સાથે સુરક્ષિત અને સ્વસ્થ પાણી",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર ટાંકી",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "Aqua Jade offers elegant contours, insect-proof cabinet housing, wall-mount design, and 12-15 Ltr/Hr purification flow rate. Available in Aqua Green, Black, Comrade Blue, and Grey.",
    descriptionGu: "એકવા જેડ આકર્ષક વળાંકો, ઇન્સેક્ટ-પ્રૂફ બોડી હાઉસિંગ અને ૧૨ થી ૧૫ લીટર પ્રતિ કલાકની ઉત્તમ ગાળણ ક્ષમતા ધરાવે છે. બ્લુ, ગ્રીન, બ્લેક અને ગ્રે કલરમાં ઉપલબ્ધ.",
    features: ["Insect Proof Cabinet", "LED Status Indicator", "Wall Mount Space Saving", "12-15 Ltr/Hr Flow Rate"],
    featuresGu: ["જીવજંતુ રક્ષિત બોડી", "LED સ્ટેટસ ઇન્ડિકેટર", "જગ્યા બચાવતું ફીટીંગ", "૧૨-૧૫ લીટર/કલાક ગાળણ ક્ષમતા"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + Carbon + UV + Alkaline",
      "Cabinet Material": "Food Grade ABS",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + કાર્બન + UV + આલ્કલાઇન",
      "કેબિનેટ મટીરીયલ": "ફૂડ ગ્રેડ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-mars",
    name: "Aqua Mars Detachable",
    nameGu: "એકવા માર્સ ડીટેચેબલ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Modern Cabinet Design with 9 Ltr Detachable Tank",
    taglineGu: "૯ લીટર ડીટેચેબલ ટાંકી સાથે આધુનિક કેબિનેટ ડિઝાઇન",
    capacity: "9 Ltrs Detachable Tank",
    capacityGu: "૯ લીટર ડીટેચેબલ ટાંકી",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "Designed by Nile, Aqua Mars features a modern design, unbreakable structural cabinet, and detachable tank. Available in Aqua Green, Stone Badge, Black, Premium Grey, and Blue.",
    descriptionGu: "નાઇલ બ્રાન્ડનું એકવા માર્સ મજબૂત બોડી ફ્રેમ અને ૯ લીટરની ડીટેચેબલ ટાંકી સાથે આવે છે. સ્ટોન ગ્રે, બ્લેક, ગ્રીન અને બ્લુ કલરમાં ઉપલબ્ધ.",
    features: ["9L Detachable Tank", "Unbreakable Structural Cabinet", "LED Status Lights", "Modern Counter Top / Wall mount"],
    featuresGu: ["૯ લીટર ડીટેચેબલ ટાંકી", "અનબ્રેકેબલ કેબિનેટ", "LED સ્ટેટસ ઇન્ડિકેટર", "કાઉન્ટર ટોપ / વોલ માઉન્ટેડ"],
    specs: {
      "Storage Capacity": "9 Litres",
      "Purification Type": "RO + UV + Alkaline + Minerals",
      "Cabinet Material": "Unbreakable Food-grade ABS",
      "Installation Type": "Wall Mounted / Counter Top",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૯ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + આલ્કલાઇન + મિનરલ્સ",
      "કેબિનેટ મટીરીયલ": "મજબૂત ફૂડ-ગ્રેડ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ / કાઉન્ટર ટોપ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-c3",
    name: "Aqua C3 UTC Under-Counter",
    nameGu: "એકવા C3 UTC અંડર-કાઉન્ટર",
    category: "commercial",
    categoryEn: "Commercial & UTC",
    categoryGu: "કોમર્શિયલ અને સિંક-મશીન",
    image: "assets/product_under_sink.webp",
    tagline: "Sleek, Out-of-Sight Design with Separate Faucet",
    taglineGu: "કિચન પ્લેટફોર્મ નીચે અદ્રશ્ય ફિટિંગ અને આધુનિક લુક",
    capacity: "12 to 25 Ltr/Hr Purification",
    capacityGu: "૧૨ થી ૨૫ લીટર/કલાક ગાળણ ક્ષમતા",
    warranty: "1 Year Complete Warranty",
    warrantyGu: "૧ વર્ષ પૂરી વોરંટી",
    description: "The Aqua C3 UTC is designed for premium modular kitchens. Hidden under the sink, it saves valuable counter space and connects directly to a high-finish sink faucet.",
    descriptionGu: "મોર્ડન મોડ્યુલર રસોડા માટે ખાસ ડિઝાઇન કરેલી સિસ્ટમ જે સિંક નીચે ફીટ થઈ જાય છે અને ઉપર માત્ર આકર્ષક કળાવવાળો નળ રહે છે.",
    features: ["Out of Sight Under-Counter Design", "High Capacity 12-25 L/Hr", "7-Stage Deep Purification", "Frees up Kitchen Counter Space"],
    featuresGu: ["સિંક નીચે અદ્રશ્ય ફિટિંગ", "૧૨-૨૫ લીટર/કલાક ક્ષમતા", "૭-સ્ટેજ ઊંડાણપૂર્વક શુદ્ધિકરણ", "રસોડામાં પ્લેટફોર્મ સ્પેસ બચાવે છે"],
    specs: {
      "Storage Capacity": "8 to 12 Litres External Tank",
      "Purification Type": "RO + UV + Carbon + Alkaline (Optional)",
      "Cabinet Material": "Under-Sink Compact Frame",
      "Installation Type": "Under the Counter (UTC)",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૮ થી ૧૨ લીટર બાહ્ય ટાંકી",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + કાર્બન + આલ્કલાઇન (વિકલ્પ)",
      "કેબિનેટ મટીરીયલ": "UTC સિંક અંદર કોમ્પેક્ટ ફ્રેમ",
      "ઇન્સ્ટોલેશન પ્રકાર": "અંડર ધ કાઉન્ટર (UTC)",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-klick",
    name: "Aqua Klick Pro",
    nameGu: "એકવા ક્લિક પ્રો",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Elegant Cabinet Design with LED Indicators",
    taglineGu: "LED ઇન્ડિકેટર્સ અને આકર્ષક કેબિનેટ ડિઝાઇન",
    capacity: "9 Ltrs Storage",
    capacityGu: "૯ લીટર ટાંકી ક્ષમતા",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "Designed by Keshav Industries, Aqua Klick Pro features a food-grade material body, LED indicators, and supports both wall-mounting and table-top layouts.",
    descriptionGu: "કેશવ ઇન્ડસ્ટ્રીઝનું એકવા ક્લિક પ્રો મશીન ફૂડ ગ્રેડ મટીરીયલ, LED ઇન્ડિકેટર અને આકર્ષક ગ્રે/વ્હાઇટ બોડી ડિઝાઇન સાથે આવે છે.",
    features: ["Food Grade ABS Body", "Elegant Compact Cabinet", "LED Power/Status Indicators", "Wall Mount or Table top"],
    featuresGu: ["ફૂડ ગ્રેડ ABS બોડી", "આકર્ષક કોમ્પેક્ટ કેબિનેટ", "LED પાવર/સ્ટેટસ ઇન્ડિકેટર", "વોલ માઉન્ટેડ / ટેબલ ટોપ"],
    specs: {
      "Storage Capacity": "9 Litres",
      "Purification Type": "RO + Carbon + Sediment + UV",
      "Cabinet Material": "Food GradeABS Plastic",
      "Installation Type": "Wall Mounted / Table Top",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૯ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + કાર્બન + સેડીમેન્ટ + UV",
      "કેબિનેટ મટીરીયલ": "ફૂડ ગ્રેડ ABS પ્લાસ્ટિક",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ / ટેબલ ટોપ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "dolphine-kool",
    name: "Dolphine Kool",
    nameGu: "ડોલ્ફીન કુલ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Enjoy the Taste of Purity with Dolphin Cabinets",
    taglineGu: "ડોલ્ફીન કેબિનેટ સાથે શુદ્ધતાના મીઠા સ્વાદનો આનંદ",
    capacity: "9 Ltrs Storage",
    capacityGu: "૯ લીટર સંગ્રહ",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "A classic and highly durable domestic RO cabinet system, Dolphine Kool provides 100% pure drinking water with multi-stage mineralizers.",
    descriptionGu: "ટકાઉ અને ક્લાસિક ઘરેલુ RO કેબિનેટ સિસ્ટમ જે ૧૦૦% શુદ્ધ આલ્કલાઇન અને મીઠું પીવાનું પાણી પૂરું પાડે છે.",
    features: ["Classic Dolphin Design", "9L Food Grade Storage Tank", "Multi-stage Alkaline Filtration", "Compact and Leakproof"],
    featuresGu: ["ક્લાસિક ડોલ્ફીન ડિઝાઇન", "૯ લીટર સંગ્રહ ક્ષમતા", "મલ્ટી-સ્ટેજ આલ્કલાઇન ફિલ્ટર", "કોમ્પેક્ટ અને લીકપ્રૂફ બોડી"],
    specs: {
      "Storage Capacity": "9 Litres",
      "Purification Type": "RO + Carbon + Alkaline + Minerals",
      "Cabinet Material": "ABS Plastic",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૯ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + કાર્બન + આલ્કલાઇન + મિનરલ્સ",
      "કેબિનેટ મટીરીયલ": "ABS પ્લાસ્ટિક",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "neptune-metallic",
    name: "Neptune Metallic",
    nameGu: "નેપ્ચ્યુન મેટાલિક",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Sleek Charcoal Metallic Premium Look",
    taglineGu: "આકર્ષક ચારકોલ મેટાલિક પ્રીમિયમ લુક",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર ક્ષમતા",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "The Neptune Metallic offers a sleek, dark charcoal-grey transparent design that seamlessly matches modern kitchen layouts while delivering high rejection rates.",
    descriptionGu: "નેપ્ચ્યુન મેટાલિક ચારકોલ ટ્રાન્સપરન્ટ ડિઝાઇન સાથે આવે છે, જે રસોડાને પ્રીમિયમ લુક આપે છે અને ક્ષારને સંપૂર્ણ કાબૂમાં રાખે છે.",
    features: ["Sleek Charcoal Design", "Transparent Tank Cover", "High Flow Booster Pump", "Advanced Sediment Filter"],
    featuresGu: ["ચારકોલ ટ્રાન્સપરન્ટ લુક", "ટાંકીની અંદર જોઈ શકાય તેવી બોડી", "હાઇ પ્રેશર બૂસ્ટર પંપ", "એડવાન્સ સેડીમેન્ટ ફિલ્ટર"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + UV + Carbon + TDS Adjuster",
      "Cabinet Material": "ABS Food Grade",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + કાર્બન + TDS એડજસ્ટર",
      "કેબિનેટ મટીરીયલ": "ABS ફૂડ ગ્રેડ",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-era",
    name: "Aqua Era Cabinet",
    nameGu: "એકવા ઇરા કેબિનેટ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Pure. Premium. Powerful. Silk Color Editions",
    taglineGu: "શુદ્ધ. પ્રીમિયમ. શક્તિશાળી. સિલ્ક કલર એડિશન્સ",
    capacity: "9 Ltrs Storage Tank",
    capacityGu: "૯ લીટર સ્ટોરેજ ટાંકી",
    warranty: "1 Year Complete Warranty",
    warrantyGu: "૧ વર્ષ પૂરી વોરંટી",
    description: "Aqua Era is a luxurious front-ribbed premium model. Available in Silk Beige, Silk Blue, Forest Blue, Urban Grey, and Charcoal Black. Fits beautifully in modern homes.",
    descriptionGu: "એકવા ઇરા આગળ રીબ્ડ ગ્લાસ લુક ધરાવતું પ્રીમિયમ મશીન છે. સિલ્ક બેજ, બ્લુ, ગ્રે અને બ્લેક જેવા ક્લાસી કલર ઓપ્શનમાં ઉપલબ્ધ.",
    features: ["Silk Beige / Blue / Forest Blue Options", "Modern Front-Ribbed Design", "LED Status Bar Indicator", "9L Detachable Tank"],
    featuresGu: ["સિલ્ક બેજ / બ્લુ / ફોરેસ્ટ બ્લુ કલર્સ", "આધુનિક ફ્રન્ટ-રીબ્ડ લુક", "LED સ્ટેટસ બાર ઇન્ડિકેટર", "૯ લીટર સ્ટોરેજ ટાંકી"],
    specs: {
      "Storage Capacity": "9 Litres",
      "Purification Type": "RO + UV + UF + Copper + Alkaline",
      "Cabinet Material": "ABS Premium Grade",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૯ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + UF + કોપર + આલ્કલાઇન",
      "કેબિનેટ મટીરીયલ": "ABS પ્રીમિયમ ગ્રેડ",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "hi-flo",
    name: "Hi-Flo Water Purifier",
    nameGu: "હાઇ-ફ્લો વોટર પ્યુરિફાયર",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "LED Indicator with Multiple Metallic Options",
    taglineGu: "LED ઇન્ડિકેટર અને આકર્ષક મેટાલિક કલર ઓપ્શન્સ",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર સંગ્રહ",
    warranty: "1 Year Full Warranty",
    warrantyGu: "૧ વર્ષ ફુલ વોરંટી",
    description: "The Hi-Flo system provides high-output water purification with built-in LED indicators. Color options include Metallic Cherry, Metallic Black, Sky Blue, and Standard Blue.",
    descriptionGu: "હાઇ-ફ્લો સિસ્ટમ પાણીના સ્પીડ ગાળણ અને ઇન્ડિકેટર સાથે આવે છે. મેટાલિક ચેરી (લાલ), બ્લેક અને બ્લુ કલર ઓપ્શનમાં ઉપલબ્ધ.",
    features: ["Led Indicators", "Metallic Cherry / Black / Blue Options", "High Flow Output Membrane", "Food Grade ABS plastic"],
    featuresGu: ["LED ઇન્ડિકેટર લાઇટ્સ", "મેટાલિક ચેરી / બ્લેક / બ્લુ ઓપ્શન્સ", "હાઇ ફ્લો આઉટપુટ મેમ્બ્રેન", "ફૂડ ગ્રેડ ABS બોડી"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + UV + Alkaline + TDS Control",
      "Cabinet Material": "ABS ABS Plastic",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + આલ્કલાઇન + TDS કંટ્રોલ",
      "કેબિનેટ મટીરીયલ": "ABS ABS પ્લાસ્ટિક",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-innovica",
    name: "Aqua Innovica Lavish",
    nameGu: "એકવા ઇનોવિકા લેવિશ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Luxurious Significance with Zinc + Copper + Alkaline",
    taglineGu: "કોપર + ઝિંક + આલ્કલાઇન સાથે વૈભવી ડિઝાઇન",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર ટાંકી ક્ષમતા",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "The Aqua Innovica features a lavish flat cabinet design. Color variants include Candy White Blue, Mirror Black, Candy White Aqua Green, Metallic Energy Blue, and Metallic Steel Grey.",
    descriptionGu: "એકવા ઇનોવિકા પ્રીમિયમ લુક અને ફ્લેટ કેબિનેટ ડિઝાઇન ધરાવે છે. વ્હાઇટ બ્લુ, મિરર બ્લેક, સ્ટીલ ગ્રે અને એનર્જી બ્લુ કલરમાં ઉપલબ્ધ.",
    features: ["Zinc + Copper + Alkaline 3-in-1", "Mirror Black & Steel Grey Options", "Lavish Flat Front Panel", "3-Year Filter Life Support"],
    featuresGu: ["ઝિંક + કોપર + આલ્કલાઇન ૩-ઇન-૧", "મિરર બ્લેક અને સ્ટીલ ગ્રે લુક", "આકર્ષક ફ્લેટ ફ્રન્ટ પેનલ", "લાંબા આયુષ્યવાળા ફિલ્ટર્સ"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + Copper + Zinc + Alkaline",
      "Cabinet Material": "Premium Finished ABS",
      "Installation Type": "Wall Mounted / Counter Top",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + કોપર + ઝિંક + આલ્કલાઇન",
      "કેબિનેટ મટીરીયલ": "પ્રીમિયમ ફિનિશ્ડ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ / કાઉન્ટર ટોપ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "aqua-kainet",
    name: "Aqua Kainet Marble",
    nameGu: "એકવા કાઇનેટ માર્બલ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Experience Purity at its Finest with Smart LED",
    taglineGu: "સ્માર્ટ LED અને ગોલ્ડન માર્બલ લુક સાથે શુદ્ધતા",
    capacity: "10 Ltrs Storage",
    capacityGu: "૧૦ લીટર ટાંકી",
    warranty: "1 Year Warranty",
    warrantyGu: "૧ વર્ષ વોરંટી",
    description: "Designed with a premium golden-black marble pattern texture. Also available in Marbella Earth, Golden White, and Silver Pearl. Features smart LED status panel.",
    descriptionGu: "ગોલ્ડન-બ્લેક આરસપહાણ (માર્બલ) પેટર્ન લુક અને સ્માર્ટ LED પેનલ સાથે આવતી પ્રીમિયમ કિંગ સાઇઝ સિસ્ટમ.",
    features: ["Golden Black Marble Finish", "Marbella Earth / Silver Pearl variants", "Smart LED Indicators", "High Flow Rate Membrane"],
    featuresGu: ["ગોલ્ડન બ્લેક માર્બલ લુક", "માર્બેલા અર્થ / સિલ્વર પર્લ ઓપ્શન", "સ્માર્ટ LED ઇન્ડિકેટર્સ", "હાઇ ફ્લો રેટ મેમ્બ્રેન"],
    specs: {
      "Storage Capacity": "10 Litres",
      "Purification Type": "RO + UV + Carbon + Copper",
      "Cabinet Material": "High Finish ABS",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૧૦ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + કાર્બન + કોપર",
      "કેબિનેટ મટીરીયલ": "હાઇ ફિનિશ્ડ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  },
  {
    id: "lx-series",
    name: "LX Series Titanium",
    nameGu: "LX સિરીઝ ટાઇટેનિયમ",
    category: "domestic",
    categoryEn: "Domestic RO",
    categoryGu: "ઘરગથ્થુ RO",
    image: "assets/product_domestic.webp",
    tagline: "Timeless Luxury in Gun Metal & Alpine Gold",
    taglineGu: "ગન મેટલ અને આલ્પીન ગોલ્ડમાં કાયમી વૈભવ",
    capacity: "9 Ltrs Storage Tank",
    capacityGu: "૯ લીટર સ્ટોરેજ",
    warranty: "1 Year Full Warranty",
    warrantyGu: "૧ વર્ષ ફુલ વોરંટી",
    description: "The LX One and LX Two series represent the ultimate luxury in kitchen water systems. Available in Gun Metal, Charcoal Black, Alpine Gold, and White Gold editions.",
    descriptionGu: "LX વન અને LX ટુ વૈભવી કિચન ફિટિંગ માટેના પ્રીમિયમ મોડલ છે, જે ગન મેટલ, બ્લેક અને ગોલ્ડન એડિશન્સમાં ઉપલબ્ધ છે.",
    features: ["LX One & LX Two Glam Editions", "Titanium Gun Metal & White Gold", "Digital Power Indicators", "Super Compact Premium Cabinet"],
    featuresGu: ["LX વન અને LX ટુ ગ્લેમ એડિશન્સ", "ટાઇટેનિયમ ગન મેટલ અને વ્હાઇટ ગોલ્ડ", "ડિજિટલ પાવર ઇન્ડિકેટર્સ", "સુપર કોમ્પેક્ટ પ્રીમિયમ કેબિનેટ"],
    specs: {
      "Storage Capacity": "9 Litres",
      "Purification Type": "RO + UV + UF + Alkaline + Minerals",
      "Cabinet Material": "Luxurious Brushed Finish ABS",
      "Installation Type": "Wall Mounted",
      "Warranty": "1 Year"
    },
    specsGu: {
      "ટાંકી ક્ષમતા": "૯ લીટર",
      "શુદ્ધિકરણ પ્રકાર": "RO + UV + UF + આલ્કલાઇન + મિનરલ્સ",
      "કેબિનેટ મટીરીયલ": "બ્રશ્ડ ફિનિશ પ્રીમિયમ ABS",
      "ઇન્સ્ટોલેશન પ્રકાર": "વોલ માઉન્ટેડ",
      "વોરંટી": "૧ વર્ષ"
    }
  }
];

// 2. HTML Templates for Product Detail Pages
function getProductHTML(product) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${product.name} - Shivam Aqua Solution Morbi</title>
  <meta name="description" content="Buy ${product.name} RO water purifier in Morbi & Rajkot. Features ${product.tagline}. Sales, installation, and repair services by Shivam Aqua Solution.">
  
  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="assets/logo.webp">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet"></noscript>
  
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest" defer></script>

  <!-- External Stylesheet (Shared) -->
  <link rel="stylesheet" href="style.css">
</head>
<body class="lang-en">

  <!-- Top Announcement Bar -->
  <div class="announcement-bar">
    <div class="container announcement-content">
      <div class="contact-info">
        <a href="tel:+919173096727" class="announce-link">
          <i data-lucide="phone" class="icon-sm text-turquoise"></i>
          <span>+91 91730 96727</span>
        </a>
        <span class="divider">|</span>
        <span class="announce-text">
          <i data-lucide="clock" class="icon-sm text-turquoise"></i>
          <span class="lang-en">Mon - Sat: 9:00 AM - 8:00 PM</span>
          <span class="lang-gu">સોમ - શનિ: સવારે ૯:૦૦ થી રાત્રે ૮:૦૦</span>
        </span>
      </div>
      <div class="announce-badge">
        <span class="lang-en">Emergency Service Available</span>
        <span class="lang-gu">ઇમરજન્સી સર્વિસ ઉપલબ્ધ</span>
      </div>
    </div>
  </div>

  <!-- Header Section -->
  <header class="main-header">
    <div class="container header-container">
      <a href="index.html" class="logo-area">
        <img src="assets/logo.webp" alt="Shivam Aqua Solution Logo" class="header-logo" fetchpriority="high" width="63" height="63">
        <div class="brand-text">
          <span class="brand-name">Shivam Aqua</span>
          <span class="brand-sub">Solution</span>
        </div>
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <a href="index.html" class="nav-link">
          <span class="lang-en">Home</span><span class="lang-gu">હોમ પેજ</span>
        </a>
        <a href="index.html#services" class="nav-link">
          <span class="lang-en">Services</span><span class="lang-gu">સેવાઓ</span>
        </a>
        <a href="products.html" class="nav-link">
          <span class="lang-en">Products</span><span class="lang-gu">પ્રોડક્ટ્સ</span>
        </a>
        <a href="index.html#purity" class="nav-link">
          <span class="lang-en">Why RO?</span><span class="lang-gu">શા માટે RO?</span>
        </a>
        <a href="index.html#about" class="nav-link">
          <span class="lang-en">Why Us</span><span class="lang-gu">વિશેષતાઓ</span>
        </a>
        <a href="index.html#faq" class="nav-link">
          <span class="lang-en">FAQs</span><span class="lang-gu">પ્રશ્નો</span>
        </a>
      </nav>

      <div class="header-actions">
        <!-- Language Switcher Segmented Control -->
        <div class="lang-switcher">
          <button class="lang-btn active" onclick="setLanguage('en')">EN</button>
          <button class="lang-btn" onclick="setLanguage('gu')">ગુજરાતી</button>
        </div>
        
        <a href="tel:+919173096727" class="btn btn-outline btn-sm header-call-btn">
          <i data-lucide="phone"></i>
          <span class="lang-en">Call Now</span><span class="lang-gu">કોલ કરો</span>
        </a>
        
        <button class="menu-toggle-btn" aria-label="Toggle Navigation Menu">
          <i data-lucide="menu" class="menu-icon"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Dropdown -->
  <div class="mobile-menu-overlay">
    <div class="mobile-menu">
      <div class="mobile-menu-header">
        <div class="logo-area">
          <img src="assets/logo.webp" alt="Shivam Aqua Solution Logo" class="header-logo" width="32" height="32" style="height: 32px;">
          <div class="brand-text">
            <span class="brand-name" style="font-size: 0.95rem; font-weight: 800; font-family: var(--font-display); line-height: 1.1;">Shivam Aqua</span>
            <span class="brand-sub" style="font-size: 0.65rem; color: var(--text-light-3); letter-spacing: 0.5px;">Solution</span>
          </div>
        </div>
        <button class="close-menu-btn" aria-label="Close Menu"><i data-lucide="x"></i></button>
      </div>
      <nav class="mobile-nav-links">
        <a href="index.html" class="mobile-nav-link">
          <i data-lucide="home"></i>
          <span class="lang-en">Home</span><span class="lang-gu">હોમ</span>
        </a>
        <a href="index.html#services" class="mobile-nav-link">
          <i data-lucide="wrench"></i>
          <span class="lang-en">Services</span><span class="lang-gu">સેવાઓ</span>
        </a>
        <a href="products.html" class="mobile-nav-link">
          <i data-lucide="droplet"></i>
          <span class="lang-en">Products</span><span class="lang-gu">પ્રોડક્ટ્સ</span>
        </a>
        <a href="index.html#about" class="mobile-nav-link">
          <i data-lucide="shield-check"></i>
          <span class="lang-en">Why Us</span><span class="lang-gu">વિશેષતાઓ</span>
        </a>
        <a href="blogs.html" class="mobile-nav-link">
          <i data-lucide="book-open"></i>
          <span class="lang-en">Blogs</span><span class="lang-gu">બ્લોગ્સ</span>
        </a>
        <a href="index.html#contact" class="mobile-nav-link">
          <i data-lucide="mail"></i>
          <span class="lang-en">Contact</span><span class="lang-gu">સંપર્ક</span>
        </a>
      </nav>
      <div class="mobile-menu-actions">
        <a href="tel:+919173096727" class="btn btn-primary w-full text-center">
          <i data-lucide="phone"></i>
          <span class="lang-en">Call Dilip Bhai</span><span class="lang-gu">કોલ કરો દિલીપભાઈ</span>
        </a>
        <a href="https://wa.me/919173096727?text=Hi%20Shivam%20Aqua%20Solution,%20I%20have%20an%20enquiry%20about%20your%20water%20filter%20services." 
           target="_blank" 
           class="btn btn-whatsapp w-full text-center mt-3"
           data-wa-en="Hi Shivam Aqua Solution, I have an enquiry about your water filter services."
           data-wa-gu="નમસ્તે શિવમ એકવા સોલ્યુશન, મારે આપની વોટર ફિલ્ટર સર્વિસ વિશે પૂછપરછ કરવી છે.">
          <svg class="icon-whatsapp-svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span class="lang-en">WhatsApp Enquiry</span><span class="lang-gu">વોટ્સએપ પૂછપરછ</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Product Detail Section -->
  <main class="product-detail-page">
    <div class="container">
      
      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <a href="index.html"><span class="lang-en">Home</span><span class="lang-gu">હોમ</span></a> / 
        <a href="products.html"><span class="lang-en">Products</span><span class="lang-gu">પ્રોડક્ટ્સ</span></a> / 
        <span class="active-crumb">${product.name}</span>
      </div>

      <div class="product-detail-grid">
        <!-- Left: Product Image -->
        <div class="product-image-section glass-card">
          <img src="${product.image}" alt="${product.name}" class="main-detail-img" width="400" height="400">
        </div>

        <!-- Right: Product Description -->
        <div class="product-info-section">
          <span class="category-tag">
            <span class="lang-en">${product.categoryEn}</span>
            <span class="lang-gu">${product.categoryGu}</span>
          </span>
          
          <h1 class="product-title-detail">
            <span class="lang-en">${product.name}</span>
            <span class="lang-gu">${product.nameGu}</span>
          </h1>

          <p class="product-tagline-detail">
            <span class="lang-en">${product.tagline}</span>
            <span class="lang-gu">${product.taglineGu}</span>
          </p>

          <div class="key-badges">
            <div class="key-badge">
              <i data-lucide="package" class="text-turquoise"></i>
              <span>
                <span class="lang-en">Capacity: ${product.capacity}</span>
                <span class="lang-gu">ટાંકી: ${product.capacityGu}</span>
              </span>
            </div>
            <div class="key-badge">
              <i data-lucide="shield" class="text-turquoise"></i>
              <span>
                <span class="lang-en">Warranty: ${product.warranty}</span>
                <span class="lang-gu">વોરંટી: ${product.warrantyGu}</span>
              </span>
            </div>
          </div>

          <p class="product-desc-detail">
            <span class="lang-en">${product.description}</span>
            <span class="lang-gu">${product.descriptionGu}</span>
          </p>

          <h3 class="features-head-detail">
            <span class="lang-en">Key Features</span>
            <span class="lang-gu">મુખ્ય આકર્ષણો</span>
          </h3>
          <ul class="features-list-detail">
            ${product.features.map((f, idx) => `
              <li>
                <i data-lucide="check" class="text-turquoise"></i>
                <span class="lang-en">${f}</span>
                <span class="lang-gu">${product.featuresGu[idx]}</span>
              </li>
            `).join('')}
          </ul>

          <div class="action-buttons-detail">
            <a href="https://wa.me/919173096727?text=Hi%20Shivam%20Aqua%20Solution,%20I%20am%20interested%20in%20a%20price%20quote%20for%20the%20${encodeURIComponent(product.name)}%20water%20purifier%20model." 
               target="_blank" 
               class="btn btn-whatsapp btn-lg w-full justify-center"
               data-wa-en="Hi Shivam Aqua Solution, I am interested in a price quote for the ${product.name} water purifier model."
               data-wa-gu="નમસ્તે શિવમ એકવા સોલ્યુશન, હું ${product.nameGu} વોટર પ્યુરિફાયર મોડલના ભાવપત્રક (કોટેશન) માટે પૂછપરછ કરવા માંગું છું.">
              <svg class="icon-whatsapp-svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span class="lang-en">Get Price Quote on WhatsApp</span>
              <span class="lang-gu">વોટ્સએપ પર ભાવ મેળવો</span>
            </a>
            <a href="tel:+919173096727" class="btn btn-outline btn-lg w-full justify-center mt-3">
              <i data-lucide="phone"></i>
              <span class="lang-en">Call Dilip Bhai Now</span>
              <span class="lang-gu">દિલીપભાઈને ડાયરેક્ટ કોલ કરો</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Technical Specifications Table -->
      <div class="specs-section-detail glass-card mt-5">
        <h2 class="specs-title-detail">
          <span class="lang-en">Technical Specifications</span>
          <span class="lang-gu">ટેકનિકલ વિગતો</span>
        </h2>
        <div class="specs-table-wrapper">
          <table class="specs-table lang-en">
            <tbody>
              ${Object.entries(product.specs).map(([key, val]) => `
                <tr>
                  <th>${key}</th>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <table class="specs-table lang-gu">
            <tbody>
              ${Object.entries(product.specsGu).map(([key, val]) => `
                <tr>
                  <th>${key}</th>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </main>

  <!-- Footer Section & Contact Details -->
  <footer class="footer-section" id="contact">
    <div class="container footer-container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-brand">
          <a href="index.html" class="logo-area">
            <img src="assets/logo_without_bg.webp" alt="Shivam Aqua Solution Logo" class="footer-logo" loading="lazy" width="48" height="48">
            <div class="brand-text">
              <span class="brand-name">Shivam Aqua</span>
              <span class="brand-sub">Solution</span>
            </div>
          </a>
          <p class="mt-4 brand-desc">
            <span class="lang-en">Providing pure, sweet, and mineral-balanced drinking water to thousands of homes and ceramic factories in Morbi & Rajkot. Quality and service are our priorities.</span>
            <span class="lang-gu">મોરબી અને રાજકોટમાં હજારો પરિવારો અને કારખાનાઓને અધતન ટેકનોલોજી દ્વારા શુદ્ધ, મીઠું અને મિનરલયુક્ત પાણી પૂરું પાડવું એ જ અમારો એકમાત્ર લક્ષ્ય છે.</span>
          </p>
          <div class="footer-social mt-4">
            <a href="https://www.instagram.com/shivam_enterprise7691" target="_blank" aria-label="Instagram Account Link" class="social-instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="tel:+919173096727" aria-label="Call Dilip Bhai Directly" class="social-phone">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="https://wa.me/919173096727" target="_blank" aria-label="WhatsApp Chat Link" class="social-whatsapp">
              <svg class="icon-whatsapp-svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3>
            <span class="lang-en">Quick Links</span>
            <span class="lang-gu">ઝડપી લિંક</span>
          </h3>
          <ul class="footer-links-list">
            <li><a href="index.html"><span class="lang-en">Home</span><span class="lang-gu">હોમ</span></a></li>
            <li><a href="index.html#services"><span class="lang-en">Our Services</span><span class="lang-gu">સર્વિસ</span></a></li>
            <li><a href="products.html"><span class="lang-en">Products</span><span class="lang-gu">પ્રોડક્ટ</span></a></li>
            <li><a href="index.html#about"><span class="lang-en">Why Us</span><span class="lang-gu">કેમ અમે?</span></a></li>
            <li><a href="index.html#faq"><span class="lang-en">FAQs</span><span class="lang-gu">FAQ</span></a></li>
            <li><a href="blogs.html"><span class="lang-en">Water Blogs</span><span class="lang-gu">બ્લોગ્સ</span></a></li>
          </ul>
        </div>

        <!-- Contact Detail -->
        <div class="footer-contact-details">
          <h3>
            <span class="lang-en">Contact Details</span>
            <span class="lang-gu">સંપર્ક વિગતો</span>
          </h3>
          <div class="contact-details-list">
            <div class="contact-detail-item">
              <i data-lucide="user" class="text-turquoise"></i>
              <div>
                <p class="detail-title"><span class="lang-en">Proprietor</span><span class="lang-gu">માલિક</span></p>
                <p class="detail-val"><span class="lang-en">Dilip Bhai</span><span class="lang-gu">દિલીપ ભાઈ</span></p>
              </div>
            </div>
            
            <div class="contact-detail-item">
              <i data-lucide="phone-call" class="text-turquoise"></i>
              <div>
                <p class="detail-title"><span class="lang-en">Phone & WhatsApp</span><span class="lang-gu">ફોન અને વોટ્સએપ</span></p>
                <a href="tel:+919173096727" class="detail-val link-val">+91 91730 96727</a>
              </div>
            </div>
            
            <div class="contact-detail-item">
              <i data-lucide="map-pin" class="text-turquoise"></i>
              <div>
                <p class="detail-title"><span class="lang-en">Shop Address</span><span class="lang-gu">દુકાનનું સરનામું</span></p>
                <p class="detail-val address-val">
                  <span class="lang-en">Madhav Shopping, Vavdi Road, Near Kabir Aashram, Morbi - 363641, Gujarat, India.</span>
                  <span class="lang-gu">વાવડી રોડ, મધવ શોપીંગ, કબીર આશ્રમ પાસે, મોરબી - ૩૬૩૬૪૧, ગુજરાત.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Working Hours & Map Shortcut -->
        <div class="footer-map">
          <h3>
            <span class="lang-en">Business Hours</span>
            <span class="lang-gu">કામ કરવાનો સમય</span>
          </h3>
          <div class="contact-details-list">
            <div class="contact-detail-item">
              <i data-lucide="clock" class="text-turquoise"></i>
              <div>
                <p class="detail-title"><span class="lang-en">Timings</span><span class="lang-gu">સમયગાળો</span></p>
                <p class="detail-val">
                  <span class="lang-en">Monday - Saturday: 9:00 AM - 8:00 PM <br>(Sunday Closed)</span>
                  <span class="lang-gu">સોમવાર થી શનિવાર: સવારે ૯:૦૦ થી રાત્રે ૮:૦૦ <br>(રવિવાર રજા)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Area -->
      <div class="footer-bottom text-center">
        <p class="copyright-text">
          &copy; 2026 Shivam Aqua Solution. All Rights Reserved. | Designed by <a href="https://shivrajsinh.in" target="_blank" class="designer-link">Shivrajsinh.in</a>
        </p>
      </div>
    </div>
  </footer>

  <!-- Floating Actions for Mobile Pinned Bottom -->
  <div class="floating-ctas">
    <a href="tel:+919173096727" class="floating-btn float-call" aria-label="Call Dilip Bhai Now">
      <i data-lucide="phone"></i>
      <span class="lang-en">Call Now</span><span class="lang-gu">કોલ કરો</span>
    </a>
    <a href="https://wa.me/919173096727?text=Hi%20Shivam%20Aqua%20Solution,%20I%20need%20RO%20servicing%20at%20my%20address." 
       target="_blank" 
       class="floating-btn float-whatsapp" 
       aria-label="WhatsApp Chat Now"
       data-wa-en="Hi Shivam Aqua Solution, I need RO servicing at my address."
       data-wa-gu="નમસ્તે શિવમ એકવા સોલ્યુશન, મને મારા સરનામા પર RO સર્વિસિંગની જરૂર છે.">
      <svg class="icon-whatsapp-svg fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span class="lang-en">WhatsApp</span><span class="lang-gu">વોટ્સએપ</span>
    </a>
  </div>

  <!-- Client-side Interactivity Script -->
  <script src="script.js"></script>
</body>
</html>`;
}

// 3. Main Generator Loop
console.log('Generating product detail pages...');
products.forEach(product => {
  const filename = `product-${product.id}.html`;
  const filePath = path.join('/Users/shivrajsinhzala/Documents/Shivam RO website', filename);
  const htmlContent = getProductHTML(product);
  
  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated: ${filename}`);
});
console.log('Product generation complete!');

// 4. Update index.html products grid dynamically
const badgesMap = {
  "aqua-2090": { en: "Premium", gu: "પ્રીમિયમ" },
  "alica-pure": { en: "Popular", gu: "પ્રખ્યાત" },
  "aqua-touch": { en: "Best Seller", gu: "બેસ્ટ સેલર" },
  "olly-arise": { en: "New Launch", gu: "નવું લોન્ચ" },
  "aqua-flip": { en: "Eco-Save", gu: "ઇકો સેવ" },
  "aqua-c3": { en: "Under Sink", gu: "સિંક નીચે" },
  "aqua-klick": { en: "Elegant", gu: "એલિગન્ટ" },
  "dolphine-kool": { en: "Compact", gu: "કોમ્પેક્ટ" },
  "aqua-era": { en: "Value Choice", gu: "વ્યાજબી પસંદ" },
  "hi-flo": { en: "Heavy Duty", gu: "હેવી ડ્યુટી" },
  "lx-series": { en: "Luxury", gu: "લક્ઝરી" }
};

function generateProductsGrid(products) {
  const featuredIds = ["aqua-2090", "alica-pure", "aqua-touch", "olly-arise", "aqua-c3", "hi-flo"];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));
  let html = '      <div class="products-grid" id="products-grid">\n';
  featuredProducts.forEach((product, index) => {
    const badge = badgesMap[product.id];
    const badgeHTML = badge ? `          <div class="product-badge"><span class="lang-en">${badge.en}</span><span class="lang-gu">${badge.gu}</span></div>\n` : '';
    
    html += `        <!-- ${index + 1}. ${product.name} -->
        <div class="product-card glass-card" data-category="${product.category}">
${badgeHTML}          <div class="product-img-wrap">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="400">
          </div>
          <div class="product-info">
            <h3 class="product-title">
              <span class="lang-en">${product.name}</span>
              <span class="lang-gu">${product.nameGu}</span>
            </h3>
            <p class="product-desc">
              <span class="lang-en">${product.tagline}</span>
              <span class="lang-gu">${product.taglineGu}</span>
            </p>
            
            <!-- Key Feature Specs for Premium UI/UX -->
            <div class="product-card-specs">
              <div class="spec-pill">
                <i data-lucide="droplet"></i>
                <span class="lang-en">${product.capacity}</span>
                <span class="lang-gu">${product.capacityGu}</span>
              </div>
              <div class="spec-pill">
                <i data-lucide="shield"></i>
                <span class="lang-en">${product.warranty}</span>
                <span class="lang-gu">${product.warrantyGu}</span>
              </div>
            </div>

            <div class="card-action-row">
              <a href="product-${product.id}.html" class="btn btn-outline btn-sm">
                <span class="lang-en">View Details</span>
                <span class="lang-gu">વિગતો જુઓ</span>
              </a>
              <a href="https://wa.me/919173096727?text=Hi%20Shivam%20Aqua%20Solution,%20I%20am%20interested%20in%20a%20quote%20for%20the%20${encodeURIComponent(product.name)}%20water%20purifier." 
                 target="_blank" 
                 class="btn btn-whatsapp btn-sm" 
                 data-wa-en="Hi Shivam Aqua Solution, I am interested in a quote for the ${product.name} water purifier." 
                 data-wa-gu="નમસ્તે શિવમ એકવા સોલ્યુશન, મને ${product.nameGu} ના ભાવપત્રક (કોટેશન) માં રસ છે.">
                <svg class="icon-whatsapp-svg icon-xs" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span class="lang-en">WhatsApp</span>
                <span class="lang-gu">વોટ્સએપ</span>
              </a>
            </div>
          </div>
        </div>\n\n`;
  });
  html += '      </div>';
  return html;
}

console.log('Updating index.html products grid...');
const indexHtmlPath = path.join('/Users/shivrajsinhzala/Documents/Shivam RO website', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const startTag = '<!-- PRODUCTS_GRID_START -->';
  const endTag = '<!-- PRODUCTS_GRID_END -->';
  
  const startIndex = indexHtml.indexOf(startTag);
  const endIndex = indexHtml.indexOf(endTag);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const before = indexHtml.substring(0, startIndex + startTag.length);
    const after = indexHtml.substring(endIndex);
    const newGrid = '\n' + generateProductsGrid(products) + '\n      ';
    indexHtml = before + newGrid + after;
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log('Successfully updated index.html products grid!');
  } else {
    console.error('Could not find products grid placeholders in index.html');
  }
}
