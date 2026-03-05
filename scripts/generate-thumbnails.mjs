/**
 * 썸네일 생성 스크립트
 * 각 블로그 포스트에 대한 SVG 기반 썸네일을 생성합니다.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// 썸네일 설정
const thumbnails = [
  {
    slug: 'stock-basics',
    title: '주식 투자 입문 가이드',
    emoji: '📈',
    gradient: ['#667eea', '#764ba2'],
  },
  {
    slug: 'etf-guide',
    title: 'ETF 투자 완벽 가이드',
    emoji: '📊',
    gradient: ['#f093fb', '#f5576c'],
  },
  {
    slug: 'compound-interest',
    title: '복리의 마법',
    emoji: '💰',
    gradient: ['#4facfe', '#00f2fe'],
  },
  {
    slug: 'dividend-investing',
    title: '배당주 투자 가이드',
    emoji: '🏦',
    gradient: ['#43e97b', '#38f9d7'],
  },
  {
    slug: 'savings-comparison-2026',
    title: '2026 적금 비교',
    emoji: '🏧',
    gradient: ['#fa709a', '#fee140'],
  },
  {
    slug: 'isa-account-guide-2026',
    title: 'ISA 계좌 완벽 가이드',
    emoji: '🔐',
    gradient: ['#a18cd1', '#fbc2eb'],
  },
  {
    slug: 'kospi-5000-beginner-guide',
    title: '코스피 5000 시대',
    emoji: '🚀',
    gradient: ['#ffecd2', '#fcb69f'],
  },
  {
    slug: 'geopolitical-risk-asset-protection',
    title: '지정학적 리스크 대비',
    emoji: '🛡️',
    gradient: ['#ff9a9e', '#fecfef'],
  },
  // ====== 새 포스트 추가 ======
  {
    slug: 'ai-coding-agents-2026',
    title: 'AI 코딩 에이전트 비교',
    emoji: '🤖',
    gradient: ['#0f0c29', '#302b63'],
  },
];

function generateSVG({ title, emoji, gradient }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient[0]}" />
      <stop offset="100%" style="stop-color:${gradient[1]}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" rx="0"/>
  <text x="600" y="250" text-anchor="middle" font-size="120">${emoji}</text>
  <text x="600" y="380" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="bold" fill="white">${title}</text>
  <text x="600" y="440" text-anchor="middle" font-family="sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">머니로그 · 테크인사이트</text>
</svg>`;
}

// 이미지 디렉토리 확인
const imgDir = join(ROOT, 'images', 'thumbnails');
if (!existsSync(imgDir)) {
  mkdirSync(imgDir, { recursive: true });
}

// 썸네일 생성
for (const config of thumbnails) {
  const svg = generateSVG(config);
  const path = join(imgDir, `${config.slug}.svg`);
  writeFileSync(path, svg, 'utf-8');
  console.log(`✅ Generated: ${config.slug}.svg`);
}

console.log(`\n🎉 Total ${thumbnails.length} thumbnails generated!`);
