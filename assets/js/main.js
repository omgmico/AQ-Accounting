// ==== Word-by-Word Typing Animation ====
function typeWord(element, text, speed = 100) {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    element.classList.add('active');
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.remove('active');
        element.classList.add('complete');
        resolve();
      }
    }
    type();
  });
}

// ==== Hero Typing Animation & Smooth Scroll on Page Load ====
document.addEventListener('DOMContentLoaded', async function() {
  // Get all word elements
  const wordConcierge = document.getElementById('word-concierge');
  const wordAccounting = document.getElementById('word-accounting');
  const wordExpert = document.getElementById('word-expert');
  const wordBusiness = document.getElementById('word-business');
  const wordSupport = document.getElementById('word-support');
  const heroDescription = document.getElementById('hero-description');
  const typingContainer = document.querySelector('.typing-container');
  
  if (wordConcierge && typingContainer) {
    // First, set all words to reserve space
    wordConcierge.textContent = 'Concierge';
    wordAccounting.textContent = 'accounting.';
    wordExpert.textContent = 'Expert';
    wordBusiness.textContent = 'business';
    wordSupport.textContent = 'support.';
    
    // Measure and fix container height
    const neededHeight = typingContainer.offsetHeight;
    typingContainer.style.height = neededHeight + 'px';
    
    // Clear all words and start typing animation
    wordConcierge.textContent = '';
    wordAccounting.textContent = '';
    wordExpert.textContent = '';
    wordBusiness.textContent = '';
    wordSupport.textContent = '';
    
    // Type each word in sequence
    await typeWord(wordConcierge, 'Concierge', 80);
    await typeWord(wordAccounting, 'accounting.', 80);
    await typeWord(wordExpert, 'Expert', 80);
    await typeWord(wordBusiness, 'business', 80);
    await typeWord(wordSupport, 'support.', 80);
    
    // Show the description with fade-in after all words are typed
    setTimeout(() => {
      if (heroDescription) {
        heroDescription.classList.add('show');
      }
    }, 500);
  }

  // Smooth scroll: Header offset
  document.querySelectorAll('header a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
});

// ==== Intersection Observer: Fade-in animacija ====
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==== I18n: Učitavanje jezika i prevođenje ====
const locales = {};
let currentLang = 'cg';

Promise.all([
  fetch('locales/en.json').then(r => r.json()).then(data => locales.en = data),
  fetch('locales/cg.json').then(r => r.json()).then(data => locales.cg = data)
]).then(() => {
  setLanguage(currentLang);
});

function translate(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const value = key.split('.').reduce((o, k) => o && o[k], locales[lang]);
    if (value) el.textContent = value;
  });
}

// ==== Ikonice usluga ====
function getServiceIcon(icon) {
  return `<img src="assets/icons/${icon}.gif" alt="" class="icon-img" loading="lazy">`;
}

// ==== RENDER: Sekcija usluge ====
function renderServicesSection(data) {
  const grid = document.querySelector('.services-grid');
  const template = document.getElementById('service-card');
  if (!grid || !template) return;

  grid.innerHTML = "";
  data.services.list.forEach(service => {
    const card = template.content.cloneNode(true);
    card.querySelector('.icon').innerHTML = getServiceIcon(service.icon);
    card.querySelector('.service-title').textContent = service.title;
    card.querySelector('.service-desc').textContent = service.description;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ==== RENDER: Sekcija blog ====
function renderBlogSection(data) {
  const grid = document.querySelector('#blog .grid');
  const template = document.getElementById('blog-post');
  if (!grid || !template) return;

  grid.innerHTML = "";
  data.blog.posts.forEach(post => {
    const card = template.content.cloneNode(true);
    card.querySelector('h3').textContent = post.title;
    card.querySelector('p').textContent = post.excerpt;
    card.querySelector('a').setAttribute('href', post.link);
    card.querySelector('a').textContent = data.blog.readMore;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ==== Postavljanje jezika: translate + render sekcija ====
function setLanguage(lang) {
  currentLang = lang;
  const data = locales[lang];
  translate(lang);
  renderServicesSection(data);
  renderBlogSection(data);
}

document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-cg').addEventListener('click', () => setLanguage('cg'));

// ==== Mesh BG animacija ====
const meshBg = document.querySelector('.mesh-bg-anim');
function animateMeshBg() {
  const t = Date.now() / 8000; // Sporija animacija za smooth efekat
  
  // Kombinacija rotacije, skaliranja i pozicioniranja
  const rotation = Math.sin(t) * 15 + Math.cos(t * 0.7) * 8; // Veća rotacija
  const scale = 1.05 + Math.sin(t * 1.2) * 0.03 + Math.cos(t * 0.8) * 0.02; // Dinamičko skaliranje
  
  // Dodaj subtle pomeranje pozicije za "plutajući" efekat
  const translateX = Math.sin(t * 0.6) * 2;
  const translateY = Math.cos(t * 0.5) * 1.5;
  
  // Animacija opacity-ja za "breathing" efekat
  const opacity = 0.6 + Math.sin(t * 1.5) * 0.15;
  
  if (meshBg) {
    meshBg.style.transform = `translate(${translateX}%, ${translateY}%) scale(${scale}) rotate(${rotation}deg)`;
    meshBg.style.opacity = opacity;
  }
  
  requestAnimationFrame(animateMeshBg);
}
animateMeshBg();

// ==== Blob SVG plutajuća animacija ====
function animateBlobs() {
  document.querySelectorAll('.bg-blob').forEach((blob, i) => {
    const seed = [1.2, 1.6, 2.1][i] || (1 + i * 0.5);
    const t = Date.now() / 1700 + i * 99;
    const x = Math.sin(t * seed) * (50 + i * 24);
    const y = Math.cos(t * seed * 0.8) * (38 + i * 16);
    const scale = 1.08 + Math.sin(t * 0.5 + i) * 0.10;
    const rot = Math.sin(t * 0.19 + i) * 6;
    blob.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rot}deg)`;
  });
  requestAnimationFrame(animateBlobs);
}
animateBlobs();

// ==== BG CURSOR BLOB (pozadinski, prati miš, ali ispod svega) ====
const bgBlob = document.getElementById('bg-cursor-blob');
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let pos = { x: mouse.x, y: mouse.y };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
function animateBgBlob() {
  pos.x += (mouse.x - pos.x) * 0.19;
  pos.y += (mouse.y - pos.y) * 0.19;
  if (bgBlob) {
    bgBlob.style.left = pos.x + 'px';
    bgBlob.style.top = pos.y + 'px';
  }
  requestAnimationFrame(animateBgBlob);
}
animateBgBlob();

// ==== Mobile Menu Toggle ====
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (mobileMenuBtn && mobileNav) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    mobileNav.addEventListener('click', function(e) {
      if (e.target === mobileNav) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});