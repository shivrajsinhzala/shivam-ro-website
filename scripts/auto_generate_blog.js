/**
 * Auto Blog Generator for Shivam Water Solution
 * Powered by Google Gemini API
 * Author: Dilipbhai (Proprietor)
 *
 * Usage:
 *   GEMINI_API_KEY="your_api_key_here" node scripts/auto_generate_blog.js [count]
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY environment variable is missing!");
  console.log("Usage: GEMINI_API_KEY='your_key_here' node scripts/auto_generate_blog.js");
  process.exit(1);
}

// How many blogs to generate in this run (default: 1)
const countArg = parseInt(process.argv[2] || "1", 10);
const numToGenerate = isNaN(countArg) || countArg < 1 ? 1 : countArg;

const TOPIC_PROMPTS = [
  "RO Repair in Morbi & Rajkot: How to fix low water pressure and slow flow rate in domestic purifiers",
  "Ideal TDS Range for Morbi Groundwater: Why high TDS tap water needs RO + TDS Controller + Zinc + Copper + Alkaline B12",
  "Commercial RO Plants for Morbi Ceramic Factories & Offices: 25 LPH to 1000 LPH Water Solutions",
  "How to Stop Water Purifier Leakage & Foul Odor: Maintenance tips from Shivam Water Solution",
  "Benefits of Alkaline B12 & Active Copper Filtered Water for Family Health and Immunity",
  "Biogreen 110 GPD 4G High TDS Membrane: Handling 4000 PPM TDS Water in Morbi Borewells",
  "Seasonal RO Water Purifier Maintenance in Morbi: Preparing Your Purifier for Monsoon & Summer Water Quality Changes",
  "Understanding RO Booster Pump Pressure & Solenoid Valve Maintenance in Morbi Households"
];

async function generateSingleBlog(topic, existingSlugs) {
  console.log(`\n🚀 Contacting Gemini API for blog generation...`);
  console.log(`📌 Selected Topic: "${topic}"`);

  const systemPrompt = `You are Dilipbhai, the expert proprietor of Shivam Water Solution located at Vajepar Main Road, Morbi - 363641, Gujarat (+91 91730 96727). You have over 10 years of hands-on experience selling, installing, repairing, and servicing RO water purifiers and commercial RO plants across Morbi and Rajkot.

Write an extremely informative, friendly, expert blog post targeted for local homeowners, factories, and office managers in Morbi & Rajkot. Make sure the slug is unique and contains relevant keywords.

Return ONLY a valid JSON object matching this exact schema:
{
  "slug": "unique-url-friendly-slug-with-morbi-or-ro-keywords",
  "title": "Catchy, High-CTR Blog Title (50-60 chars)",
  "metaTitle": "SEO Meta Title including Morbi / Rajkot (60 chars max)",
  "metaDesc": "SEO Meta Description with Call to Action (140-155 chars)",
  "excerpt": "A compelling 2-sentence summary teaser",
  "category": "RO Servicing & Repair",
  "readTime": "4 min read",
  "tags": ["RO Repair", "Morbi RO Service", "Water Purifier"],
  "content": "Full markdown text of the blog post (at least 600 words) with H2 headings, bullet points, practical advice from Dilipbhai, shop address details (Vajepar Main Road, Morbi), and call to action to contact Dilipbhai at +91 91730 96727."
}

Topic to write about today: "${topic}"`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [{ text: systemPrompt }]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  let rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJsonText) throw new Error("No text response received from Gemini API");

  let cleanedJson = rawJsonText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const blogData = JSON.parse(cleanedJson);

  // Ensure slug uniqueness
  let baseSlug = blogData.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  let finalSlug = baseSlug;
  let counter = 1;
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  blogData.slug = finalSlug;

  blogData.date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  blogData.author = "Dilipbhai (Proprietor, Shivam Water Solution)";
  blogData.coverImage = "/assets/blog_default.jpg";

  return blogData;
}

async function run() {
  const blogsFilePath = path.join(__dirname, "../data/blogs_generated.json");
  let blogsList = [];
  if (fs.existsSync(blogsFilePath)) {
    try {
      blogsList = JSON.parse(fs.readFileSync(blogsFilePath, 'utf8'));
    } catch {
      blogsList = [];
    }
  }

  const existingSlugs = new Set(blogsList.map(b => b.slug));

  console.log(`Starting generation of ${numToGenerate} blog post(s)...`);

  for (let i = 0; i < numToGenerate; i++) {
    // Pick topic not recently covered if possible
    const topic = TOPIC_PROMPTS[i % TOPIC_PROMPTS.length];
    try {
      const newBlog = await generateSingleBlog(topic, existingSlugs);
      existingSlugs.add(newBlog.slug);
      blogsList.unshift(newBlog);
      console.log(`✅ [${i+1}/${numToGenerate}] Generated Blog: "${newBlog.title}" (/blogs/${newBlog.slug})`);
    } catch (err) {
      console.error(`❌ Error generating blog #${i+1}:`, err.message);
    }
  }

  fs.writeFileSync(blogsFilePath, JSON.stringify(blogsList, null, 2));
  console.log(`\n🎉 Successfully updated data/blogs_generated.json with total ${blogsList.length} AI blog posts!`);
}

run();
