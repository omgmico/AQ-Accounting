// --- Fade-in on scroll using IntersectionObserver ---
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

// --- i18n: load locale files & translate ---
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
    const value = key.split('.').reduce((o,k) => o && o[k], locales[lang]);
    if (value) el.textContent = value;
  });
}

// --- GIF ikonice po ključu (usluga1, usluga2, usluga3, usluga4) ---
function getServiceIcon(icon) {
  // icon je npr. 'usluga1', 'usluga2', ...
  return `<img src="assets/icons/${icon}.gif" alt="" class="icon-img" loading="lazy">`;
}

// --- RENDER SERVICES SECTION ---
function renderServicesSection(data) {
  const grid = document.querySelector('.services-grid');
  const template = document.getElementById('service-card');
  if (!grid || !template) return;

  grid.innerHTML = ""; // Clean grid on each (re)render

  data.services.list.forEach(service => {
    const card = template.content.cloneNode(true);
    card.querySelector('.icon').innerHTML = getServiceIcon(service.icon);
    card.querySelector('.service-title').textContent = service.title;
    card.querySelector('.service-desc').textContent = service.description;
    grid.appendChild(card);
  });

  // Re-observiraj fade-in elemente!
  grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// --- RENDER BLOG SECTION ---
function renderBlogSection(data) {
  const grid = document.querySelector('#blog .grid');
  const template = document.getElementById('blog-post');
  if (!grid || !template) return;

  grid.innerHTML = ""; // Clean grid

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

// --- FULL LANG SWITCH: TRANSLATE + RENDER SERVICES/BLOG ---
function setLanguage(lang) {
  currentLang = lang;
  const data = locales[lang];
  translate(lang);
  renderServicesSection(data);
  renderBlogSection(data);
}

document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-cg').addEventListener('click', () => setLanguage('cg'));

// --- Smooth scroll (header offset) ---
document.addEventListener('DOMContentLoaded', function () {
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


// ==== Mesh PNG lagano rotira + diše ====
const meshBg = document.querySelector('.mesh-bg-anim');
function animateMeshBg() {
  const t = Date.now() / 2400;
  const scale = 1.008 + Math.sin(t) * 0.018;
  const rot = Math.sin(t / 2) * 1.3; // max ~1.3deg lijevo/desno
  if(meshBg) meshBg.style.transform = `scale(${scale}) rotate(${rot}deg)`;
  requestAnimationFrame(animateMeshBg);
}
animateMeshBg();

// ==== Blobs plutaju ====
function animateBlobs() {
  document.querySelectorAll('.bg-blob').forEach((blob, i) => {
    const t = Date.now() / 1800 + i * 66;
    const x = Math.sin(t + i) * 16;
    const y = Math.cos(t + 1.7 * i) * 13;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(animateBlobs);
}
animateBlobs();

// ==== Cursor-following blob ====
document.addEventListener('mousemove', function(e) {
  const blob = document.getElementById('cursor-blob');
  if (!blob) return;
  blob.style.left = e.clientX + 'px';
  blob.style.top = e.clientY + 'px';
});