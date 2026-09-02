#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

function fetchProductsFromLive() {
  return new Promise((resolve, reject) => {
    const req = https.get('https://shivamwatersolution.in/api/products', { timeout: 8000 }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`API returned status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function sync() {
  console.log('🔄 Syncing products for build...');
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  } catch (e) {
    existing = [];
  }

  try {
    const liveProducts = await fetchProductsFromLive();
    if (Array.isArray(liveProducts) && liveProducts.length > 0) {
      console.log(`✅ Fetched ${liveProducts.length} products from live database.`);

      // Map to consistent structure required by Next.js components
      const mergedMap = new Map();
      const existingMap = new Map();

      // Index existing products
      existing.forEach(p => {
        if (p.id) existingMap.set(p.id, p);
      });

      // Load live products first to preserve the database sorting order
      liveProducts.forEach(lp => {
        const prev = existingMap.get(lp.id) || {};
        mergedMap.set(lp.id, {
          id: lp.id,
          name: lp.name || lp.name_en || prev.name || '',
          name_en: lp.name_en || lp.name || prev.name_en || '',
          name_gu: lp.name_gu || prev.name_gu || '',
          badge: lp.badge || lp.badge_en || prev.badge || '',
          badge_en: lp.badge_en || prev.badge_en || '',
          badge_gu: lp.badge_gu || prev.badge_gu || '',
          category: lp.category || prev.category || 'domestic',
          tagline: lp.tagline || lp.tagline_en || prev.tagline || '',
          tagline_en: lp.tagline_en || prev.tagline_en || '',
          tagline_gu: lp.tagline_gu || prev.tagline_gu || '',
          capacity: lp.capacity || lp.capacity_en || prev.capacity || '',
          capacity_en: lp.capacity_en || prev.capacity_en || '',
          capacity_gu: lp.capacity_gu || prev.capacity_gu || '',
          warranty: lp.warranty || lp.warranty_en || prev.warranty || '',
          warranty_en: lp.warranty_en || prev.warranty_en || '',
          warranty_gu: lp.warranty_gu || prev.warranty_gu || '',
          description: lp.description || lp.description_en || prev.description || '',
          description_en: lp.description_en || prev.description_en || '',
          description_gu: lp.description_gu || prev.description_gu || '',
          features: Array.isArray(lp.features) && lp.features.length > 0 ? lp.features : (Array.isArray(lp.features_en) && lp.features_en.length > 0 ? lp.features_en : prev.features || []),
          features_en: Array.isArray(lp.features_en) && lp.features_en.length > 0 ? lp.features_en : prev.features_en || [],
          features_gu: Array.isArray(lp.features_gu) ? lp.features_gu : prev.features_gu || [],
          specs: (lp.specs && Object.keys(lp.specs).length > 0) ? lp.specs : (lp.specs_en && Object.keys(lp.specs_en).length > 0 ? lp.specs_en : prev.specs || {}),
          specs_en: lp.specs_en || prev.specs_en || {},
          specs_gu: lp.specs_gu || prev.specs_gu || {},
          wa: lp.wa || prev.wa || `Hi Shivam Water Solution, I am interested in inquiring about the ${lp.name_en || lp.name} RO Water Purifier model.`,
          meta_title: lp.meta_title || prev.meta_title || `${lp.name_en || lp.name} - Shivam Water Solution Morbi`,
          meta_desc: lp.meta_desc || prev.meta_desc || `Buy ${lp.name_en || lp.name} RO water purifier in Morbi & Rajkot. Sales, installation, and repair services by Shivam Water Solution.`,
          images: Array.isArray(lp.images) && lp.images.length > 0 ? lp.images : prev.images || ['/assets/product_domestic.webp'],
        });
      });

      // Append any offline-only existing items
      existing.forEach(p => {
        if (p.id && !mergedMap.has(p.id)) {
          mergedMap.set(p.id, p);
        }
      });

      const updatedList = Array.from(mergedMap.values());
      fs.writeFileSync(productsFilePath, JSON.stringify(updatedList, null, 2), 'utf-8');
      console.log(`🎉 Successfully synchronized ${updatedList.length} total products to data/products.json.`);
    }
  } catch (err) {
    console.warn(`⚠️ Warning: Could not fetch from live API (${err.message}). Using existing data/products.json.`);
  }
}

sync();
