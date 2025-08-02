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

// ==== Smooth scroll: Header offset ====
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

// ==== Mesh BG animacija ====
const meshBg = document.querySelector('.mesh-bg-anim');
function animateMeshBg() {
  const t = Date.now() / 2400;
  const scale = 1.008 + Math.sin(t) * 0.018;
  const rot = Math.sin(t / 2) * 1.3;
  if (meshBg) meshBg.style.transform = `scale(${scale}) rotate(${rot}deg)`;
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