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
  {
    name: 'keyboards',
    gradient: ['#667eea', '#764ba2'],
    title: '2024 기계식 키보드',
    subtitle: '추천 TOP 5',
    icons: ['⌨', '🎮', '💜'],
    pattern: 'dots',
  },
  {
    name: 'macbook-m3',
    gradient: ['#1a1a2e', '#533483'],
    title: 'MacBook Pro M3',
    subtitle: '개발자 솔직 후기',
    icons: ['💻', '🍎', '⚡'],
    pattern: 'lines',
  },
  {
    name: 'galaxy-s24',
    gradient: ['#0f3460', '#16213e'],
    title: 'Galaxy S24 Ultra',
    subtitle: 'AI 기능 집중 분석',
    icons: ['📱', '🤖', '📸'],
    pattern: 'grid',
  },
  {
    name: 'monitor-guide',
    gradient: ['#2c3e50', '#4ca1af'],
    title: '모니터 구매 가이드',
    subtitle: '해상도부터 패널까지',
    icons: ['🖥', '👁', '🎨'],
    pattern: 'dots',
  },
  {
    name: 'earbuds',
    gradient: ['#4568dc', '#b06ab3'],
    title: '무선 이어폰 추천',
    subtitle: '노이즈 캔슬링 완벽 비교',
    icons: ['🎧', '🎵', '🔇'],
    pattern: 'waves',
  },
  {
    name: 'mx-master',
    gradient: ['#232526', '#414345'],
    title: 'MX Master 3S',
    subtitle: '로지텍 마우스 리뷰',
    icons: ['🖱', '🖐', '⚙'],
    pattern: 'lines',
  },
  {
    name: 'python-guide',
    gradient: ['#1a4731', '#306998'],
    title: 'Python 입문 가이드',
    subtitle: '설치부터 첫 프로그램까지',
    icons: ['🐍', '📝', '🚀'],
    pattern: 'grid',
  },
  {
    name: 'nextjs-blog',
    gradient: ['#0a0a0a', '#333333'],
    title: 'Next.js 블로그',
    subtitle: '나만의 블로그 만들기',
    icons: ['▲', '⚛', '🌐'],
    pattern: 'dots',
  },
  {
    name: 'react-hooks',
    gradient: ['#0c2d48', '#2e86de'],
    title: 'React Hooks',
    subtitle: 'useState부터 커스텀 훅까지',
    icons: ['⚛', '🪝', '💡'],
    pattern: 'waves',
  },
  {
    name: 'vscode-extensions',
    gradient: ['#1e3a5f', '#0078d4'],
    title: 'VS Code 확장',
    subtitle: '필수 확장 프로그램 20선',
    icons: ['🧩', '⚡', '🛠'],
    pattern: 'grid',
  },
  {
    name: 'windows-11-tips',
    gradient: ['#0078d4', '#005a9e'],
    title: 'Windows 11 팁',
    subtitle: '숨겨진 기능 총정리',
    icons: ['🪟', '⚡', '💡'],
    pattern: 'lines',
  },
  {
    name: 'chatgpt-tips',
    gradient: ['#0d7c66', '#10a37f'],
    title: 'ChatGPT 활용법',
    subtitle: '실전 프롬프트 가이드',
    icons: ['🤖', '💬', '✨'],
    pattern: 'dots',
  },
  {
    name: 'ipad-pro-m4',
    gradient: ['#1d1d1f', '#555555'],
    title: 'iPad Pro M4',
    subtitle: '노트북 대체 가능할까?',
    icons: ['📱', '✏', '🎨'],
    pattern: 'waves',
  },
  {
    name: 'linux-guide',
    gradient: ['#2d1b69', '#dd4814'],
    title: 'Linux 입문 가이드',
    subtitle: '개발 환경 구축하기',
    icons: ['🐧', '💻', '$_'],
    pattern: 'grid',
  },
  {
    name: 'typescript',
    gradient: ['#1b3a5c', '#3178c6'],
    title: 'TypeScript 기초',
    subtitle: '타입으로 안전한 코드',
    icons: ['TS', '🔒', '📘'],
    pattern: 'lines',
  },
];

function generatePattern(type, width, height) {
  switch (type) {
    case 'dots':
      return Array.from({ length: 30 }, () => {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const r = 2 + Math.random() * 4;
        return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(1)}" fill="white" opacity="${(0.03 + Math.random() * 0.06).toFixed(2)}" />`;
      }).join('\n');
    case 'lines':
      return Array.from({ length: 8 }, (_, i) => {
        const y = (height / 9) * (i + 1);
        return `<line x1="0" y1="${y.toFixed(0)}" x2="${width}" y2="${y.toFixed(0)}" stroke="white" stroke-width="1" opacity="0.04" />`;
      }).join('\n');
    case 'grid':
      let grid = '';
      for (let i = 1; i <= 6; i++) {
        const x = (width / 7) * i;
        grid += `<line x1="${x.toFixed(0)}" y1="0" x2="${x.toFixed(0)}" y2="${height}" stroke="white" stroke-width="1" opacity="0.03" />`;
      }
      for (let i = 1; i <= 4; i++) {
        const y = (height / 5) * i;
        grid += `<line x1="0" y1="${y.toFixed(0)}" x2="${width}" y2="${y.toFixed(0)}" stroke="white" stroke-width="1" opacity="0.03" />`;
      }
      return grid;
    case 'waves':
      return Array.from({ length: 5 }, (_, i) => {
        const yBase = 100 + i * 130;
        return `<path d="M0,${yBase} Q${width * 0.25},${yBase - 40} ${width * 0.5},${yBase} Q${width * 0.75},${yBase + 40} ${width},${yBase}" fill="none" stroke="white" stroke-width="1.5" opacity="0.04" />`;
      }).join('\n');
    default:
      return '';
  }
}

async function generateThumbnail({ name, gradient, title, subtitle, icons, pattern }) {
  const width = 1280;
  const height = 720;

  const patternSvg = generatePattern(pattern, width, height);

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:white;stop-opacity:0.12" />
          <stop offset="50%" style="stop-color:white;stop-opacity:0" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="black" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" fill="url(#shine)" />

      <!-- Pattern -->
      ${patternSvg}

      <!-- Large decorative circles -->
      <circle cx="${width * 0.85}" cy="${height * 0.2}" r="200" fill="white" opacity="0.04" />
      <circle cx="${width * 0.1}" cy="${height * 0.8}" r="150" fill="white" opacity="0.04" />

      <!-- Category badge area -->
      <rect x="80" y="60" width="140" height="40" rx="20" fill="white" opacity="0.15" />
      <text x="150" y="86" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="white" text-anchor="middle" opacity="0.9">TECH INSIGHT</text>

      <!-- Icon display -->
      <text x="${width * 0.78}" y="${height * 0.45}" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" font-size="120" fill="white" text-anchor="middle" opacity="0.15" filter="url(#shadow)">${icons[0]}</text>

      <!-- Main title -->
      <text x="80" y="${height * 0.48}" font-family="Malgun Gothic, Apple SD Gothic Neo, sans-serif" font-size="72" font-weight="900" fill="white" opacity="0.95" letter-spacing="-1">${title}</text>

      <!-- Subtitle -->
      <text x="80" y="${height * 0.62}" font-family="Malgun Gothic, Apple SD Gothic Neo, sans-serif" font-size="42" font-weight="400" fill="white" opacity="0.7">${subtitle}</text>

      <!-- Bottom accent line -->
      <rect x="80" y="${height * 0.72}" width="120" height="4" rx="2" fill="white" opacity="0.5" />

      <!-- Bottom decorative icons -->
      <text x="80" y="${height - 50}" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" font-size="28" fill="white" opacity="0.3">${icons.join('  ')}</text>

      <!-- Border frame -->
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="8" fill="none" stroke="white" stroke-width="1" opacity="0.08" />
    </svg>
  `;

  const outputPath = path.join(outputDir, `${name}.jpg`);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
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
