const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'images');

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  const files = [
    { name: 'logo.jpg', maxW: 320, maxH: 320, quality: 85 },
    { name: 'hero-ayush.jpg', maxW: 960, maxH: 960, quality: 82 },
    { name: 'about-ayush.jpg', maxW: 900, maxH: 900, quality: 82 },
    { name: 'avatar-1.jpg', maxW: 160, maxH: 160, quality: 85 },
    { name: 'avatar-2.jpg', maxW: 160, maxH: 160, quality: 85 },
    { name: 'avatar-3.jpg', maxW: 160, maxH: 160, quality: 85 },
    { name: 'showcase-bollywood-music.jpg', maxW: 960, maxH: 720, quality: 82 },
    { name: 'showcase-cinema-2026.jpg', maxW: 960, maxH: 720, quality: 82 },
    { name: 'showcase-gaming-rig.jpg', maxW: 960, maxH: 720, quality: 82 },
  ];

  let totalBefore = 0;
  let totalAfterWebp = 0;

  for (const item of files) {
    const inputPath = path.join(imagesDir, item.name);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${item.name} (not found)`);
      continue;
    }

    const inputBuffer = fs.readFileSync(inputPath);
    const beforeStat = fs.statSync(inputPath);
    totalBefore += beforeStat.size;

    const baseName = item.name.replace(/\.[^/.]+$/, '');
    const webpPath = path.join(imagesDir, `${baseName}.webp`);

    // Generate WebP
    await sharp(inputBuffer)
      .resize({ width: item.maxW, height: item.maxH, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: item.quality, effort: 6 })
      .toFile(webpPath);

    // Generate optimized JPEG replacement into buffer and write
    const optJpgBuffer = await sharp(inputBuffer)
      .resize({ width: item.maxW, height: item.maxH, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: item.quality, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(inputPath, optJpgBuffer);

    const webpStat = fs.statSync(webpPath);
    totalAfterWebp += webpStat.size;

    console.log(`✓ ${item.name}: ${(beforeStat.size / 1024).toFixed(1)} KB -> WebP: ${(webpStat.size / 1024).toFixed(1)} KB | JPG: ${(optJpgBuffer.length / 1024).toFixed(1)} KB`);
  }

  // Also create a tiny favicon.ico / favicon-32x32.png from logo
  const logoPath = path.join(imagesDir, 'logo.jpg');
  if (fs.existsSync(logoPath)) {
    const favicon32Path = path.join(__dirname, 'public', 'favicon.png');
    const logoBuffer = fs.readFileSync(logoPath);
    await sharp(logoBuffer)
      .resize(64, 64)
      .png({ quality: 90 })
      .toFile(favicon32Path);
    console.log(`✓ Generated lightweight favicon: ${(fs.statSync(favicon32Path).size / 1024).toFixed(1)} KB`);
  }

  console.log('--------------------------------------------------');
  console.log(`Total images size: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB -> WebP: ${(totalAfterWebp / 1024).toFixed(1)} KB`);
  console.log(`Reduction: ${((1 - totalAfterWebp / totalBefore) * 100).toFixed(1)}% savings!`);
}

optimizeImages().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
