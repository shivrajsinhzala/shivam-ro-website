const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '..', 'assets');

const config = {
  // Logo files (displayed small, e.g. 63x63 or 32x32)
  'logo.png': { width: 256, quality: 85 },
  'logo_with_bg.png': { width: 256, quality: 85 },
  'logo_without_bg.png': { width: 256, quality: 85 },

  // Hero background (large banner)
  'hero_bg.png': { width: 1200, quality: 80 },

  // Before/after filter comparison (displayed at 602x602)
  'clean_filter.png': { width: 600, quality: 80 },
  'dirty_filter.png': { width: 600, quality: 80 },

  // Products (displayed in cards around 300x300)
  'product_commercial.png': { width: 400, quality: 80 },
  'product_domestic.png': { width: 400, quality: 80 },
  'product_under_sink.png': { width: 400, quality: 80 },
};

async function run() {
  console.log('Starting image optimization...');
  
  for (const [filename, settings] of Object.entries(config)) {
    const inputPath = path.join(assetsDir, filename);
    const outputFilename = filename.replace(/\.png$/, '.webp');
    const outputPath = path.join(assetsDir, outputFilename);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found, skipping: ${filename}`);
      continue;
    }

    try {
      console.log(`Processing ${filename} -> ${outputFilename} (width: ${settings.width}, quality: ${settings.quality}%)`);
      await sharp(inputPath)
        .resize({ width: settings.width, withoutEnlargement: true })
        .webp({ quality: settings.quality })
        .toFile(outputPath);
      
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savingsKB = ((inputStats.size - outputStats.size) / 1024).toFixed(1);
      const savingsPercent = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

      console.log(`Success! Saved ${savingsKB} KB (${savingsPercent}%)`);
    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }

  console.log('Image optimization finished!');
}

run();
