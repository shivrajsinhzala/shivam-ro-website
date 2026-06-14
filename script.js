// Initialize Lucide Icons on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // 1. Language Toggle Setup
  initLanguage();

  // 2. Mobile Menu Toggle
  initMobileMenu();

  // 3. Stats Counter Animation
  initStatsCounter();

  // 4. Before/After Filter Slider
  initBeforeAfterSlider();

  // 5. Product Grid from JSON (only on pages with products-grid)
  if (document.getElementById('products-grid') || document.querySelector('.products-grid')) {
    loadProductGrid();
  }

  // 6. Product Category Filters (re-applied after grid loads)
  // initProductFilters is called from loadProductGrid after render

  // 7. FAQ Accordion
  initFaqAccordion();

  // 8. Testimonials Carousel
  initTestimonialsCarousel();
});

// ==========================================
// 1. Language Toggle Logic
// ==========================================
function initLanguage() {
  const savedLang = localStorage.getItem('shivam-ro-lang') || 'en';
  setLanguage(savedLang);
}

function setLanguage(lang) {
  // Update HTML attribute
  document.documentElement.setAttribute('lang', lang);
  
  // Update localStorage
  localStorage.setItem('shivam-ro-lang', lang);
  
  // Update Body class
  if (lang === 'gu') {
    document.body.classList.add('lang-gu');
    document.body.classList.remove('lang-en');
  } else {
    document.body.classList.add('lang-en');
    document.body.classList.remove('lang-gu');
  }

  // Update switcher buttons active state
  const langBtns = document.querySelectorAll('.lang-switcher button');
  langBtns.forEach(btn => {
    const onclickText = btn.getAttribute('onclick') || '';
    if (onclickText.includes(`'${lang}'`) || onclickText.includes(`"${lang}"`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update WhatsApp links based on selected language
  const waLinks = document.querySelectorAll('a[data-wa-en]');
  waLinks.forEach(link => {
    const msg = lang === 'gu' ? link.getAttribute('data-wa-gu') : link.getAttribute('data-wa-en');
    if (msg) {
      link.href = `https://wa.me/919173096727?text=${encodeURIComponent(msg)}`;
    }
  });
}

// ==========================================
// 2. Mobile Navigation Menu Logic
// ==========================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle-btn');
  const closeMenu = document.querySelector('.close-menu-btn');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !overlay) return;

  const toggle = () => overlay.classList.toggle('open');
  const close = () => overlay.classList.remove('open');

  menuToggle.addEventListener('click', toggle);
  if (closeMenu) closeMenu.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', close);
  });
}

// ==========================================
// 3. Stats Scroll Counting Logic
// ==========================================
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + "+";
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

// ==========================================
// 4. Before/After Filter Comparison Slider
// ==========================================
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  const handle = document.querySelector('.slider-handle');
  const overlay = document.querySelector('.image-after-overlay');

  if (!container || !handle || !overlay) return;

  let isDragging = false;

  const getPercent = (clientX) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 3) percent = 3;
    if (percent > 97) percent = 97;
    return percent;
  };

  const updateSlider = (clientX) => {
    const percent = getPercent(clientX);
    handle.style.left = `${percent}%`;
    overlay.style.clipPath = `inset(0 0 0 ${percent}%)`;
  };

  handle.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  handle.addEventListener('touchstart', () => { isDragging = true; });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      updateSlider(e.touches[0].clientX);
    }
  });

  container.addEventListener('click', (e) => {
    if (e.target.closest('.slider-handle')) return;
    updateSlider(e.clientX);
  });
}

// ==========================================
// 5. Product Grid — Load from API (D1 via Worker)
//    Falls back to products.json for local file:// dev
// ==========================================
function loadProductGrid() {
  const grid = document.getElementById('products-grid') || document.querySelector('.products-grid');
  if (!grid) return;

  // Try the Worker API first; fall back to static JSON for local dev
  const url = '/api/products';

  fetch(url)
    .catch(() => fetch('./products.json')) // fallback for local dev
    .then(r => {
      if (!r.ok) return fetch('./products.json');
      return r;
    })
    .then(r => r.json())
    .then(products => {
      grid.innerHTML = products.map(p => buildProductCard(p)).join('');

      if (typeof lucide !== 'undefined') lucide.createIcons();

      const lang = localStorage.getItem('shivam-ro-lang') || 'en';
      const waLinks = grid.querySelectorAll('a[data-wa-en]');
      waLinks.forEach(link => {
        const msg = lang === 'gu' ? link.getAttribute('data-wa-gu') : link.getAttribute('data-wa-en');
        if (msg) link.href = `https://wa.me/919173096727?text=${encodeURIComponent(msg)}`;
      });

      initProductFilters();
    })
    .catch(err => {
      console.error('Failed to load products', err);
      grid.innerHTML = `<p style="text-align:center;color:var(--color-danger);padding:40px;grid-column:1/-1">
        Could not load products. Please refresh.
      </p>`;
    });
}

function buildProductCard(p) {
  const imgSrc = (p.images && p.images[0]) ? p.images[0] : 'assets/product_domestic.webp';
  const waEnMsg = `Hi Shivam Aqua Solution, I am interested in a quote for the ${p.name_en} water purifier.`;
  const waGuMsg = `નમસ્તે શિવમ એકવા સોલ્યુશન, મને ${p.name_gu} ના ભાવ જાણવા છે.`;
  const waUrl = `https://wa.me/919173096727?text=${encodeURIComponent(waEnMsg)}`;
  const badge = p.badge_en
    ? `<div class="product-badge"><span class="lang-en">${p.badge_en}</span><span class="lang-gu">${p.badge_gu || p.badge_en}</span></div>`
    : '';

  return `
    <div class="product-card glass-card" data-category="${p.category}">
      <div class="product-img-wrap">
        ${badge}
        <img src="${imgSrc}" alt="${p.name_en}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">
          <span class="lang-en">${p.name_en}</span>
          <span class="lang-gu">${p.name_gu}</span>
        </h3>
        <p class="product-desc">
          <span class="lang-en">${p.tagline_en || ''}</span>
          <span class="lang-gu">${p.tagline_gu || ''}</span>
        </p>
        <div class="product-card-specs">
          <div class="spec-pill">
            <i data-lucide="droplet"></i>
            <span class="lang-en">${p.capacity_en}</span>
            <span class="lang-gu">${p.capacity_gu}</span>
          </div>
          <div class="spec-pill">
            <i data-lucide="shield"></i>
            <span class="lang-en">${p.warranty_en}</span>
            <span class="lang-gu">${p.warranty_gu}</span>
          </div>
        </div>
        <div class="card-action-row">
          <a href="product.html?id=${p.id}" class="btn btn-outline btn-sm">
            <span class="lang-en">View Details</span>
            <span class="lang-gu">વિગતો જુઓ</span>
          </a>
          <a href="${waUrl}"
             target="_blank"
             class="btn btn-whatsapp btn-sm"
             data-wa-en="${waEnMsg}"
             data-wa-gu="${waGuMsg}">
            <svg class="icon-whatsapp-svg icon-xs" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\"/></svg>
            <span class="lang-en">WhatsApp</span>
            <span class="lang-gu">વોટ્સએપ</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 6. Product Category Filters Logic
// ==========================================
function initProductFilters() {
  const tabs = document.querySelectorAll('.products-tabs .tab-btn');
  const cards = document.querySelectorAll('.products-grid .product-card');

  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.4s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 7. FAQ Accordion Logic
// ==========================================
function initFaqAccordion() {
  const toggles = document.querySelectorAll('.faq-toggle');

  if (toggles.length === 0) return;

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const item = toggle.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ==========================================
// 8. Testimonials Review Slider
// ==========================================
function initTestimonialsCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');

  if (slides.length === 0) return;

  let currentIdx = 0;
  let autoPlayTimer = null;

  const showSlide = (idx) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    slides[idx].classList.add('active');
    if (dots[idx]) dots[idx].classList.add('active');
    currentIdx = idx;
  };

  const nextSlide = () => {
    let nextIdx = currentIdx + 1;
    if (nextIdx >= slides.length) nextIdx = 0;
    showSlide(nextIdx);
  };

  const prevSlide = () => {
    let prevIdx = currentIdx - 1;
    if (prevIdx < 0) prevIdx = slides.length - 1;
    showSlide(prevIdx);
  };

  const resetAutoplay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 6000);
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => { showSlide(idx); resetAutoplay(); });
  });

  resetAutoplay();
}
