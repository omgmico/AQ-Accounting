// ==== Transparentni header na vrhu stranice ====
let lastScrollPosition = 0;
let ticking = false;
const header = document.querySelector('header');

function initScrollAnimations() {
  // Proveri da li header postoji
  if (!header) return;
  
  // Dodaj ID za lakše selektovanje
  header.id = 'site-header';
  
  // Osluškuj scroll događaj
  window.addEventListener('scroll', function() {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateHeaderBackground(lastScrollPosition);
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // Inicijalno postavi stanje headera
  updateHeaderBackground(window.scrollY);
}

function updateHeaderBackground(scrollPosition) {
  if (scrollPosition > 50) {
    header.classList.add('bg-white/80', 'backdrop-blur-sm', 'shadow-sm');
    header.classList.remove('bg-transparent');
  } else {
    header.classList.add('bg-transparent');
    header.classList.remove('bg-white/80', 'backdrop-blur-sm', 'shadow-sm');
  }
}
