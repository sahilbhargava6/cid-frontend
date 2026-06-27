const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targets = [
  // root public images
  { src: 'public/Consider_it_done_LOGO_4.png', dest: 'public/Consider_it_done_LOGO_4.webp' },
  { src: 'public/solar-service.png', dest: 'public/solar-service.webp' },
  { src: 'public/procurement-service.png', dest: 'public/procurement-service.webp' },
  { src: 'public/tax-service.png', dest: 'public/tax-service.webp' },
  { src: 'public/business-service.png', dest: 'public/business-service.webp' },
  { src: 'public/hero-bg.png', dest: 'public/hero-bg.webp' },
  { src: 'public/bookkeeping-service.png', dest: 'public/bookkeeping-service.webp' },

  // images directory
  { src: 'public/images/hero.png', dest: 'public/images/hero.webp' },
  { src: 'public/images/logo.png', dest: 'public/images/logo.webp' },

  // services directory
  { src: 'public/images/services/bottombanner.png', dest: 'public/images/services/bottombanner.webp' },
  { src: 'public/images/services/solar.png', dest: 'public/images/services/solar.webp' },
  { src: 'public/images/services/bookkeeping.png', dest: 'public/images/services/bookkeeping.webp' },
  { src: 'public/images/services/gwoth.png', dest: 'public/images/services/gwoth.webp' },
  { src: 'public/images/services/6.png', dest: 'public/images/services/6.webp' },
  { src: 'public/images/services/Procurement.png', dest: 'public/images/services/Procurement.webp' },
  { src: 'public/images/services/tax.png', dest: 'public/images/services/tax.webp' },
  { src: 'public/images/services/business.png', dest: 'public/images/services/business.webp' },

  // character assets 1-5
  { src: 'public/images/services/1.png', dest: 'public/images/services/1.webp' },
  { src: 'public/images/services/2.png', dest: 'public/images/services/2.webp' },
  { src: 'public/images/services/3.png', dest: 'public/images/services/3.webp' },
  { src: 'public/images/services/4.png', dest: 'public/images/services/4.webp' },
  { src: 'public/images/services/5.png', dest: 'public/images/services/5.webp' }
];

async function run() {
  console.log('Starting image optimization...');
  for (const t of targets) {
    const srcPath = path.resolve(__dirname, t.src);
    const destPath = path.resolve(__dirname, t.dest);

    if (fs.existsSync(srcPath)) {
      console.log(`Optimizing ${t.src}...`);
      try {
        const statsBefore = fs.statSync(srcPath);
        await sharp(srcPath)
          .webp({ quality: 80 })
          .toFile(destPath);
        const statsAfter = fs.statSync(destPath);
        const saved = ((statsBefore.size - statsAfter.size) / 1024 / 1024).toFixed(2);
        console.log(`  -> Saved ${saved} MB! (New size: ${(statsAfter.size / 1024 / 1024).toFixed(2)} MB)`);
      } catch (err) {
        console.error(`Error optimizing ${t.src}:`, err);
      }
    } else {
      console.log(`Source file not found: ${t.src}`);
    }
  }
  console.log('Image optimization finished!');
}

run();
