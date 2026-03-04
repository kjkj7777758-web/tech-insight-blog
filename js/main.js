// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuBtn.textContent = '☰';
      }
    });
  }

  // ===== Back to Top =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Search =====
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-overlay input');
  const searchResults = document.querySelector('.search-results');

  document.querySelectorAll('[data-search-toggle]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (searchOverlay) {
        searchOverlay.classList.add('active');
        if (searchInput) searchInput.focus();
      }
    });
  });

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay) {
      searchOverlay.classList.remove('active');
    }
  });

  // Simple client-side search
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
      var query = this.value.trim().toLowerCase();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      var results = BLOG_POSTS.filter(function(post) {
        return post.title.toLowerCase().includes(query) ||
               post.excerpt.toLowerCase().includes(query) ||
               post.category.toLowerCase().includes(query);
      });

      if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding:12px;color:#6b7280;">검색 결과가 없습니다.</p>';
        return;
      }

      searchResults.innerHTML = results.map(function(post) {
        return '<div class="search-result-item">' +
          '<a href="' + post.url + '">' + post.title + '</a>' +
          '<p>' + post.excerpt.substring(0, 80) + '...</p>' +
        '</div>';
      }).join('');
    });
  }

  // ===== Hero Search =====
  var heroSearch = document.querySelector('.hero-search');
  if (heroSearch) {
    heroSearch.addEventListener('submit', function(e) {
      e.preventDefault();
      var q = heroSearch.querySelector('input').value.trim();
      if (q && searchOverlay && searchInput) {
        searchOverlay.classList.add('active');
        searchInput.value = q;
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  }

  // ===== Reading Progress Bar (Single Post) =====
  var progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ===== Table of Contents (Single Post) =====
  var toc = document.querySelector('.toc-list');
  var postContent = document.querySelector('.post-content');
  if (toc && postContent) {
    var headings = postContent.querySelectorAll('h2');
    headings.forEach(function(h, i) {
      h.id = 'section-' + i;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#section-' + i;
      a.textContent = h.textContent;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(a);
      toc.appendChild(li);
    });
  }
});

// ===== Blog Posts Data for Search =====
var BLOG_POSTS = [
  {
    title: '2026년 ISA 계좌 완벽 가이드: 절세의 핵심 도구',
    excerpt: 'ISA 계좌의 비과세 혜택, 유형별 차이, 손익통산 활용법과 연금계좌 연계 전략까지 총정리.',
    category: '투자',
    url: '/posts/isa-account-guide-2026.html'
  },
  {
    title: '코스피 5000 시대, 초보 투자자 필수 가이드',
    excerpt: '사상 최고치를 경신하는 주식시장에서 초보 투자자가 지켜야 할 원칙과 ETF 전략.',
    category: '투자',
    url: '/posts/kospi-5000-beginner-guide.html'
  },
  {
    title: '2026년 고금리 적금 상품 비교 가이드',
    excerpt: '올해 가장 높은 금리를 제공하는 적금 상품들을 꼼꼼히 비교 분석합니다.',
    category: '저축',
    url: '/posts/savings-comparison-2026.html'
  },
  {
    title: '비상금 모으는 5가지 실전 방법',
    excerpt: '예상치 못한 지출에 대비하는 비상금 마련 전략을 소개합니다.',
    category: '저축',
    url: '/posts/emergency-fund-tips.html'
  },
  {
    title: '복리의 마법: 작은 저축이 큰 자산이 되는 원리',
    excerpt: '아인슈타인도 감탄한 복리 효과를 실제 수치와 함께 알아봅니다.',
    category: '저축',
    url: '/posts/compound-interest.html'
  },
  {
    title: '주식 투자 입문자를 위한 기초 가이드',
    excerpt: '주식 투자를 처음 시작하는 분들을 위한 단계별 안내서입니다.',
    category: '투자',
    url: '/posts/stock-basics.html'
  },
  {
    title: 'ETF 투자의 장점과 시작하는 방법',
    excerpt: 'ETF의 개념부터 실제 투자까지 초보자도 쉽게 따라할 수 있는 가이드입니다.',
    category: '투자',
    url: '/posts/etf-guide.html'
  },
  {
    title: '배당주 투자로 월급 외 수입 만들기',
    excerpt: '안정적인 배당 수익을 통해 매달 부수입을 만드는 전략을 알아봅니다.',
    category: '투자',
    url: '/posts/dividend-investing.html'
  },
  {
    title: '전세와 월세, 어떤 게 더 유리할까',
    excerpt: '전세와 월세의 장단점을 비교하고 나에게 맞는 선택을 돕습니다.',
    category: '부동산',
    url: '/posts/jeonse-vs-wolse.html'
  },
  {
    title: '청약통장 활용법 완벽 정리',
    excerpt: '주택청약종합저축의 가입부터 당첨까지 알아야 할 모든 것을 정리합니다.',
    category: '부동산',
    url: '/posts/housing-subscription.html'
  },
  {
    title: '부동산 투자 시 알아야 할 세금 총정리',
    excerpt: '부동산 취득부터 양도까지 발생하는 세금 종류와 절세 방법을 정리합니다.',
    category: '부동산',
    url: '/posts/realestate-tax.html'
  },
  {
    title: '가계부 작성법과 추천 앱 5선',
    excerpt: '올바른 가계부 작성법과 효과적인 지출 관리 앱을 추천합니다.',
    category: '절약',
    url: '/posts/budget-apps.html'
  },
  {
    title: '통신비 절약하는 현실적인 방법들',
    excerpt: '알뜰폰, 요금제 변경 등 통신비를 줄이는 실질적인 방법을 소개합니다.',
    category: '절약',
    url: '/posts/telecom-saving.html'
  },
  {
    title: '식비 절약 팁: 월 30만원으로 건강하게 먹기',
    excerpt: '한정된 예산 안에서 영양가 있는 식사를 하는 방법을 제안합니다.',
    category: '절약',
    url: '/posts/food-budget.html'
  },
  {
    title: '인플레이션이란? 내 자산을 지키는 방법',
    excerpt: '물가 상승의 원리와 인플레이션 시대에 자산을 보호하는 전략을 설명합니다.',
    category: '경제상식',
    url: '/posts/inflation-guide.html'
  },
  {
    title: '금리 인상이 우리 생활에 미치는 영향',
    excerpt: '기준금리 변동이 대출, 예금, 소비에 미치는 영향을 분석합니다.',
    category: '경제상식',
    url: '/posts/interest-rate-impact.html'
  },
  {
    title: '환율의 기초: 원달러 환율이 오르면 무슨 일이?',
    excerpt: '환율의 기본 개념과 환율 변동이 일상에 미치는 영향을 알아봅니다.',
    category: '경제상식',
    url: '/posts/exchange-rate-basics.html'
  }
];
