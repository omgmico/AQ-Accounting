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

// --- Parallax effect on hero ---
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  hero.style.backgroundPositionY = offset * 0.5 + 'px';
});

// --- i18n: load locale files & translate ---
const locales = {};
let currentLang = 'cg';
Promise.all([
  fetch('locales/en.json').then(r => r.json()).then(data => locales.en = data),
  fetch('locales/cg.json').then(r => r.json()).then(data => locales.cg = data)
]).then(() => translate(currentLang));

function translate(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const value = key.split('.').reduce((o,k) => o && o[k], locales[lang]);
    if (value) el.textContent = value;
  });
}

// --- Language switcher ---
document.getElementById('lang-en').addEventListener('click', () => translate('en'));
document.getElementById('lang-cg').addEventListener('click', () => translate('cg'));

// --- Populate services & blog from JSON ---
function populateList(templateId, containerSelector, items, mapFn) {
  const tpl = document.getElementById(templateId);
  const container = tpl.parentElement;
  items.forEach(item => {
    const clone = tpl.content.cloneNode(true);
    mapFn(clone, item);
    container.appendChild(clone);
  });
  tpl.remove();
}
Promise.all([
  fetch('locales/en.json').then(r => r.json()),
  fetch('locales/cg.json').then(r => r.json())
]).then(([en,cg]) => {
  const data = locales[currentLang];
  // Services
  populateList('service-card', '.grid.md\\:grid-cols-3', data.services.list, (frag, svc) => {
    frag.querySelector('h3').textContent = svc.title;
    frag.querySelector('p').textContent = svc.description;
  });
  // Blog posts
  populateList('blog-post', '#blog .grid', data.blog.posts, (frag, post) => {
    frag.querySelector('h3').textContent = post.title;
    frag.querySelector('p').textContent = post.excerpt;
    frag.querySelector('a').setAttribute('href', post.link);
    frag.querySelector('a').textContent = data.blog.readMore;
  });
});

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
