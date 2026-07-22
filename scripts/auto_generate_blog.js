/**
 * Auto Blog Generator for Shivam Water Solution
 * Powered by Google Gemini API
 * Author: Dilipbhai (Proprietor)
 *
 * Usage:
 *   GEMINI_API_KEY="your_api_key_here" node scripts/auto_generate_blog.js
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY environment variable is missing!");
  console.log("Usage: GEMINI_API_KEY='your_key_here' node scripts/auto_generate_blog.js");
  process.exit(1);
}

// Rotate through targeted local SEO topics
const TOPIC_PROMPTS = [
  "RO Repair in Morbi & Rajkot: How to fix low water pressure and slow flow rate in domestic purifiers",
  "Ideal TDS Range for Morbi Groundwater: Why high TDS tap water needs RO + TDS Controller + Zinc + Copper + Alkaline B12",
  "When to Replace RO Membrane & Copper Filter Cartridge: A Complete Guide by Dilipbhai",
  "Commercial RO Plants for Morbi Ceramic Factories & Offices: 25 LPH to 1000 LPH Water Solutions",
  "How to Stop Water Purifier Leakage & Foul Odor: Maintenance tips from Shivam Water Solution",
  "Benefits of Alkaline B12 & Active Copper Filtered Water for Family Health and Immunity"
];

const selectedPrompt = TOPIC_PROMPTS[Math.floor(Math.random() * TOPIC_PROMPTS.length)];

const systemPrompt = `You are Dilipbhai, the expert proprietor of Shivam Water Solution located at Vajepar Main Road, Morbi - 363641, Gujarat (+91 91730 96727). You have over 10 years of hands-on experience selling, installing, repairing, and servicing RO water purifiers and commercial RO plants across Morbi and Rajkot.

Write an extremely informative, friendly, expert blog post targeted for local homeowners, factories, and office managers in Morbi & Rajkot.

Return ONLY a valid JSON object matching this exact schema:
{
  "slug": "url-friendly-slug-with-morbi-or-ro-keywords",
  "title": "Catchy, High-CTR Blog Title (50-60 chars)",
  "metaTitle": "SEO Meta Title including Morbi / Rajkot (60 chars max)",
  "metaDesc": "SEO Meta Description with Call to Action (140-155 chars)",
  "excerpt": "A compelling 2-sentence summary teaser",
  "category": "RO Servicing & Repair",
  "readTime": "4 min read",
  "tags": ["RO Repair", "Morbi RO Service", "Water Purifier"],
  "content": "Full markdown text of the blog post (at least 600 words) with H2 headings, bullet points, practical advice from Dilipbhai, shop address details (Vajepar Main Road, Morbi), and call to action to contact Dilipbhai at +91 91730 96727."
}

Topic to write about today: "${selectedPrompt}"`;

async function generateBlog() {
  console.log(`🚀 Contacting Gemini API for daily RO blog generation...`);
  console.log(`📌 Topic: ${selectedPrompt}`);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: systemPrompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  try {
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
    const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJsonText) throw new Error("No text response received from Gemini API");

    const blogData = JSON.parse(rawJsonText);
    blogData.date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    blogData.author = "Dilipbhai (Proprietor, Shivam Water Solution)";
    blogData.coverImage = "/assets/blog_default.jpg";

    console.log(`✅ Blog Generated: "${blogData.title}"`);
    console.log(`🔗 Slug: /blogs/${blogData.slug}`);

    // Append to data/blogs.json
    const blogsFilePath = path.join(__dirname, "../data/blogs_generated.json");
    let blogsList = [];
    if (fs.existsSync(blogsFilePath)) {
      blogsList = JSON.parse(fs.readFileSync(blogsFilePath, 'utf8'));
    }
    
    blogsList.unshift(blogData);
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogsList, null, 2));

    console.log(`🎉 Successfully saved new AI blog to data/blogs_generated.json!`);
  } catch (error) {
    console.error("❌ Failed to generate blog post:", error.message);
    process.exit(1);
  }
}

generateBlog();
