import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'public', 'images', 'posts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const thumbnails = [
  { name: 'keyboards', gradient: ['#667eea', '#764ba2'], icon: '&#9000;', label: 'KEYBOARD' },
  { name: 'macbook-m3', gradient: ['#0f0c29', '#302b63'], icon: '&#128187;', label: 'MACBOOK' },
  { name: 'galaxy-s24', gradient: ['#1a2980', '#26d0ce'], icon: '&#128241;', label: 'GALAXY' },
  { name: 'monitor-guide', gradient: ['#2c3e50', '#3498db'], icon: '&#128424;', label: 'MONITOR' },
  { name: 'earbuds', gradient: ['#4568dc', '#b06ab3'], icon: '&#127911;', label: 'EARBUDS' },
  { name: 'mx-master', gradient: ['#434343', '#000000'], icon: '&#128433;', label: 'MOUSE' },
  { name: 'python-guide', gradient: ['#306998', '#FFD43B'], icon: '&#60;/&#62;', label: 'PYTHON' },
  { name: 'nextjs-blog', gradient: ['#000000', '#434343'], icon: '&#9650;', label: 'NEXT.JS' },
  { name: 'react-hooks', gradient: ['#00d2ff', '#3a7bd5'], icon: '&#9883;', label: 'REACT' },
  { name: 'vscode-extensions', gradient: ['#0078d4', '#005a9e'], icon: '&#10010;', label: 'VS CODE' },
  { name: 'windows-11-tips', gradient: ['#0078d4', '#00bcf2'], icon: '&#9632;', label: 'WINDOWS' },
  { name: 'chatgpt-tips', gradient: ['#10a37f', '#1a7f64'], icon: '&#9733;', label: 'AI' },
  { name: 'ipad-pro-m4', gradient: ['#1d1d1f', '#6e6e73'], icon: '&#11200;', label: 'iPAD' },
  { name: 'linux-guide', gradient: ['#dd4814', '#77216f'], icon: '&#36;_', label: 'LINUX' },
  { name: 'typescript', gradient: ['#3178c6', '#235a97'], icon: 'TS', label: 'TYPESCRIPT' },
];

async function generateThumbnail({ name, gradient, icon, label }) {
  const width = 1280;
  const height = 720;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:white;stop-opacity:0.08" />
          <stop offset="100%" style="stop-color:white;stop-opacity:0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" fill="url(#overlay)" />
      <!-- Decorative circles -->
      <circle cx="${width * 0.15}" cy="${height * 0.3}" r="120" fill="white" opacity="0.05" />
      <circle cx="${width * 0.85}" cy="${height * 0.7}" r="180" fill="white" opacity="0.05" />
      <circle cx="${width * 0.5}" cy="${height * 0.2}" r="80" fill="white" opacity="0.03" />
      <!-- Grid pattern -->
      <rect x="${width * 0.08}" y="${height * 0.15}" width="2" height="${height * 0.7}" fill="white" opacity="0.06" />
      <rect x="${width * 0.92}" y="${height * 0.15}" width="2" height="${height * 0.7}" fill="white" opacity="0.06" />
      <rect x="${width * 0.08}" y="${height * 0.15}" width="${width * 0.84}" height="2" fill="white" opacity="0.06" />
      <rect x="${width * 0.08}" y="${height * 0.85}" width="${width * 0.84}" height="2" fill="white" opacity="0.06" />
      <!-- Label text -->
      <text x="${width / 2}" y="${height / 2 - 20}" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">${label}</text>
      <text x="${width / 2}" y="${height / 2 + 40}" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.5">TECH INSIGHT</text>
    </svg>
  `;

  const outputPath = path.join(outputDir, `${name}.jpg`);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(outputPath);

  console.log(`Generated: ${name}.jpg`);
}

async function main() {
  console.log('Generating thumbnails...');
  for (const thumb of thumbnails) {
    await generateThumbnail(thumb);
  }
  console.log(`Done! Generated ${thumbnails.length} thumbnails in ${outputDir}`);
}

main().catch(console.error);
