// ==== BFCache Optimization for Performance ====
function optimizeBFCache() {
  // Cleanup any open connections before page unload
  window.addEventListener('beforeunload', () => {
    // Close any open fetch requests
    if (window.abortController) {
      window.abortController.abort();
    }
    
    // Clear any intervals/timeouts
    if (window.typingTimeout) clearTimeout(window.typingTimeout);
    if (window.typingInterval) clearInterval(window.typingInterval);
  });

  // Handle page show event for bfcache restoration
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Page restored from bfcache, reinitialize necessary components
      initializeApp();
    }
  });

  // Prevent WebSocket connections in production
  if (typeof WebSocket !== 'undefined' && window.location.protocol === 'https:') {
    // Override WebSocket for production to prevent bfcache blocking
    const originalWebSocket = window.WebSocket;
    window.WebSocket = function() {
      console.warn('WebSocket connections prevented for bfcache optimization');
      return null;
    };
  }
}

// ==== Enhanced Smooth Scroll for Navigation Links ====
function initSmoothScroll() {
  try {
    // Get all navigation links (both desktop and mobile)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Calculate offset for fixed navbar - different for mobile
          const isMobile = window.innerWidth <= 768;
          const navbarHeight = isMobile ? 80 : 100;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          // Disable CSS smooth scroll temporarily for custom JS control
          document.documentElement.style.scrollBehavior = 'auto';
          
          // Custom smooth scroll with lift-like effect
          smoothScrollTo(targetPosition, 1200);
          
          // Re-enable CSS smooth scroll after animation
          const timeoutDuration = isMobile ? 2000 : 1400;
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
          }, timeoutDuration);
          
          // Close mobile menu if open
          const mobileMenuBtn = document.getElementById('mobile-menu-btn');
          const mobileNav = document.getElementById('mobile-nav');
          if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });
  } catch (error) {
    console.warn('Smooth scroll initialization failed:', error);
  }
}

// Custom smooth scroll function with lift-like easing
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  // Use different duration for mobile vs desktop
  const isMobile = window.innerWidth <= 768;
  const scrollDuration = isMobile ? 1800 : duration; // Slightly faster for mobile
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    // Use ease-out for lift effect - fast start, slow finish
    const run = easeOutQuart(timeElapsed, startPosition, distance, scrollDuration);
    
    window.scrollTo(0, run);
    if (timeElapsed < scrollDuration) requestAnimationFrame(animation);
  }
  
  // Ease-out Quartic - lift effect (fast start, slow end)
  function easeOutQuart(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

// ==== Word-by-Word Typing Animation ====
function typeWord(element, text, speed = 100) {
  return new Promise(resolve => {
    if (!element) {
      console.warn('Element za kucanje ne postoji');
      resolve();
      return;
    }
    
    // Resetuj sadržaj elementa
    element.textContent = '';
    element.classList.add('active');
    
    let i = 0;
    const fullText = text; // Sačuvaj pun tekst
    
    function type() {
      if (i < fullText.length) {
        // Dodaj jedno po jedno slovo
        element.textContent = fullText.substring(0, i + 1);
        i++;
        window.typingTimeout = setTimeout(type, speed);
      } else {
        element.classList.remove('active');
        element.classList.add('complete');
        resolve();
      }
    }
    
    // Započni kucanje
    type();
  });
}

// ==== Hero Typing Animation & Smooth Scroll on Page Load ====
document.addEventListener('DOMContentLoaded', async function() {
  try {
    console.log('DOM loaded, starting animations...');
    
    // Osiguraj da su background elementi vidljivi na mobilnim uređajima
    if (isMobile) { // Koristi već definisanu varijablu umesto ponovne provere
      const meshBg = document.querySelector('.mesh-bg-anim');
      const grainBg = document.querySelector('.grain-bg');
      
      // Grupišemo sve promene stila za jedan reflow
      requestAnimationFrame(() => {
        if (meshBg) {
          meshBg.style.cssText = 'display: block; opacity: 0.4; transform: translate(0%, 0%) scale(1.05) rotate(0deg);';
        }
        
        if (grainBg) {
          grainBg.style.cssText = 'display: block; opacity: 0.7;';
        }
        
        // Sakrij sve blob elemente odjednom
        document.querySelectorAll('.bg-blob').forEach(blob => {
          blob.style.display = 'none';
        });
      });
    }
    
    // Initialize smooth scroll for navigation links
    initSmoothScroll();
    
    // Register Service Worker for performance
    if ('serviceWorker' in navigator) {
      try {
        // Pokušaj registraciju sa boljom obradom grešaka
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        console.log('Service Worker registered successfully with scope:', registration.scope);
      } catch (error) {
        // Nemoj prekinuti izvođenje stranice ako service worker ne uspe
        console.warn('Service Worker registration failed:', error);
      }
    }
    
    // Get all word elements with debugging
    const wordConcierge = document.getElementById('word-concierge');
    const wordAccounting = document.getElementById('word-accounting');
    const wordExpert = document.getElementById('word-expert');
    const wordBusiness = document.getElementById('word-business');
    const wordSupport = document.getElementById('word-support');
    const heroDescription = document.getElementById('hero-description');
    const typingContainer = document.querySelector('.typing-container');
    
    console.log('Word elements found:', {
      wordConcierge: !!wordConcierge,
      wordAccounting: !!wordAccounting,
      typingContainer: !!typingContainer
    });
    
    if (wordConcierge && typingContainer) {
      console.log('Starting typing animation...');
      
      // Set initial text to measure space needed - OPTIMIZOVANO
      const wordElements = [wordConcierge, wordAccounting, wordExpert, wordBusiness, wordSupport];
      const textContent = ['Concierge', 'accounting.', 'Expert', 'business', 'support.'];
      
      // Postavimo tekstove za jedan reflow
      requestAnimationFrame(() => {
        // Prvo postavi sve tekstove da izmerimo potrebnu visinu
        wordElements.forEach((el, i) => { 
          if (el) el.textContent = textContent[i];
        });
        
        // Izmeri visinu kontejnera
        const neededHeight = typingContainer ? typingContainer.offsetHeight : 0;
        
        // Postavi visinu i očisti tekstove
        if (typingContainer) typingContainer.style.height = neededHeight + 'px';
        wordElements.forEach(el => { if (el) el.textContent = ''; });
      });
      
      // Sačekaj da se prve izmene primene
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Type each word in sequence
      console.log('Animiram: "Concierge"');
      await typeWord(wordConcierge, 'Concierge', 80);
      
      console.log('Animiram: "accounting."');
      await typeWord(wordAccounting, 'accounting.', 80);
      
      console.log('Animiram: "Expert"');
      await typeWord(wordExpert, 'Expert', 80);
      
      console.log('Animiram: "business"');
      await typeWord(wordBusiness, 'business', 80);
      
      console.log('Animiram: "support."');
      await typeWord(wordSupport, 'support.', 80);
      
      console.log('Typing animation completed');
      
      // Show the description with fade-in after all words are typed
      setTimeout(() => {
        if (heroDescription) {
          heroDescription.classList.add('show');
        }
      }, 500);
    } else {
      console.error('Missing word elements or typing container');
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
  } catch (error) {
    console.warn('DOMContentLoaded initialization failed:', error);
  }
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
  fetch('locales/en.json').then(r => r.json()).then(data => locales.en = data).catch(e => console.warn('Failed to load EN locale:', e)),
  fetch('locales/cg.json').then(r => r.json()).then(data => locales.cg = data).catch(e => console.warn('Failed to load CG locale:', e))
]).then(() => {
  setLanguage(currentLang);
}).catch(error => {
  console.warn('Locale loading failed:', error);
});

function translate(lang) {
  try {
    // Postavi odgovarajući BCP 47 lang atribut
    if (lang === 'cg') {
      document.documentElement.lang = 'sr-ME';
    } else if (lang === 'en') {
      document.documentElement.lang = 'en-US';
    }
    
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      const value = key.split('.').reduce((o, k) => o && o[k], locales[lang]);
      if (value) el.textContent = value;
    });
  } catch (error) {
    console.warn('Translation failed:', error);
  }
}

// ==== Optimized Service Icons - Video instead of GIF ====
function getServiceIcon(icon) {
  // Use video for better performance and smaller file sizes
  return `
    <video 
      class="icon-img service-icon-video" 
      width="50" 
      height="50" 
      autoplay 
      muted 
      loop 
      playsinline
      loading="lazy"
      poster="assets/icons/${icon}-poster.webp"
      style="display: block !important"
    >
      <source src="assets/icons/${icon}.webm" type="video/webm">
      <source src="assets/icons/${icon}.mp4" type="video/mp4">
      <!-- Fallback to static WebP for older browsers -->
      <img src="assets/icons/${icon}-static.webp" alt="" class="icon-img" loading="lazy" width="50" height="50">
    </video>
  `;
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

  // Osiguraj da su video ikone optimalno učitane - OPTIMIZOVANO za smanjenje reflow-a
  const serviceVideos = grid.querySelectorAll('.service-icon-video');
  if (window.innerWidth <= 768) {
    // Kreiraj samo jedan observer za sve video elemente
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          // Grupišemo vizuelne promene za smanjenje reflow-a
          requestAnimationFrame(() => {
            video.style.cssText = 'display:block; opacity:1;';
            if (video.paused) video.play().catch(e => console.warn('Video autoplay failed:', e));
          });
          videoObserver.unobserve(video);
        }
      });
    }, { threshold: 0.1 });
    
    // Observuj sve video elemente odjednom
    serviceVideos.forEach(video => videoObserver.observe(video));
  }

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

// Add mobile language button listeners
document.getElementById('lang-en-mobile').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-cg-mobile').addEventListener('click', () => setLanguage('cg'));

// ==== Mesh BG animacija - samo na desktop verziji ====
let meshBg;
let isMobile;

// Proveri širinu ekrana samo jednom i zapamti vrednost
function checkDeviceWidth() {
  isMobile = window.innerWidth <= 768;
  meshBg = document.querySelector('.mesh-bg-anim');
}

// Pozovi inicijalno
checkDeviceWidth();

// Postavi osluškivač događaja za resize sa debounce-om
let resizeTimeout;
window.addEventListener('resize', function() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkDeviceWidth, 250);
});

function animateMeshBg() {
  // Koristi prethodno izračunatu vrednost umesto ponovnog proveravanja
  if (isMobile) {
    // Na mobilnim uređajima samo postavi statične stilove, bez animacije
    if (meshBg) {
      // Grupišemo vizuelne promene za jedan reflow
      requestAnimationFrame(() => {
        meshBg.style.cssText = 'transform: translate(0%, 0%) scale(1.05) rotate(0deg); opacity: 0.4;';
      });
    }
    return; // Ne animiraj na mobile
  }
  
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

// ==== Blob SVG plutajuća animacija - samo na desktop verziji ====
function animateBlobs() {
  // Koristi već proverenu vrednost za širinu ekrana
  if (isMobile) {
    return; // Ne animiraj na mobile
  }
  
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

// Pokreni animacije samo ako je desktop, ali inicijaliziraj sve elemente
animateMeshBg(); // Uvek pozovi za mesh - on će se sam pobrinuti za mobile verziju

// Osiguraj da su pozadinski elementi vidljivi na mobilnim uređajima
if (isMobile) { // Koristi već definisanu varijablu
  const meshBg = document.querySelector('.mesh-bg-anim');
  const grainBg = document.querySelector('.grain-bg');
  
  // Grupišemo klasne promene u jedan reflow
  requestAnimationFrame(() => {
    if (meshBg) meshBg.classList.add('mobile-mesh-visible');
    if (grainBg) grainBg.classList.add('mobile-grain-visible');
  });
} else {
  // Pokreni animacije blobova samo na desktopu
  animateBlobs();
}

// ==== Mobile Menu Toggle ====
// Ensure mobile menu is hidden on load but can be shown when toggled
(function() {
  // Prepare mobile menu for toggle functionality
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.style.opacity = '0';
    mobileNav.style.transform = 'translateY(-100%)';
    // Set ARIA attributes initially
    mobileNav.setAttribute('aria-hidden', 'true');
    // Disable tab navigation for mobile menu items when hidden
    toggleTabIndexInMenu(mobileNav, -1);
  }
})();

// Function to toggle tabindex for all focusable elements in mobile menu
function toggleTabIndexInMenu(container, tabIndexValue) {
  if (!container) return;
  const focusableElements = container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusableElements.forEach(el => {
    el.setAttribute('tabindex', tabIndexValue);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (mobileMenuBtn && mobileNav) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        mobileNav.setAttribute('aria-hidden', 'false');
        // Enable tab navigation for mobile menu items when visible
        toggleTabIndexInMenu(mobileNav, 0);
      } else {
        document.body.style.overflow = '';
        mobileNav.setAttribute('aria-hidden', 'true');
        // Disable tab navigation for mobile menu items when hidden
        toggleTabIndexInMenu(mobileNav, -1);
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

// ==== Main App Initialization ====
function initializeApp() {
  try {
    console.log('🚀 Initializing AQ Accounting app...');
    
    // Initialize core components
    optimizeBFCache();
    initI18n();
    initSmoothScroll();
    initMobileMenu();
    initTypingAnimation();
    initScrollAnimations();
    
    console.log('✅ App initialization complete');
  } catch (error) {
    console.error('❌ Error during app initialization:', error);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);