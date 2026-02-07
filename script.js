// ────────────────────────────────────────────────
// Shared Observer Options (frozen to avoid mutation)
// ────────────────────────────────────────────────
const OBSERVER_OPTIONS = Object.freeze({
  reveal: { threshold: 0.18 },
  lazy:   { rootMargin: '220px 0px' }
});

// ────────────────────────────────────────────────
// Scroll Reveal (single observer, one-time reveal)
// ────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    entry.target.classList.add('reveal');
    revealObserver.unobserve(entry.target);
  }
}, OBSERVER_OPTIONS.reveal);

document
  .querySelectorAll('.card, .welcome-card, .img-grid img, .video-wrapper')
  .forEach(el => revealObserver.observe(el));

// ────────────────────────────────────────────────
// Native Lazy Loading + Fallback (optimized)
// ────────────────────────────────────────────────
const lazyMedia = document.querySelectorAll('[data-src]');

const supportsNativeLazy =
  'loading' in HTMLImageElement.prototype ||
  'loading' in HTMLVideoElement.prototype;

if (supportsNativeLazy) {
  lazyMedia.forEach(el => {
    el.loading ??= 'lazy';

    if (el.dataset.src) {
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
    }
  });
} else {
  const lazyObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const el = entry.target;
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
      lazyObserver.unobserve(el);
    }
  }, OBSERVER_OPTIONS.lazy);

  lazyMedia.forEach(el => lazyObserver.observe(el));
}

// ────────────────────────────────────────────────
// Navbar shadow — class toggle instead of inline style
// ────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');

if (navbar) {
  let lastState = false;

  const onScroll = () => {
    const scrolled = window.scrollY > 50;

    if (scrolled !== lastState) {
      navbar.classList.toggle('navbar--scrolled', scrolled);
      lastState = scrolled;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ────────────────────────────────────────────────
// Footer year (no reflow risk)
// ────────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
