// ===============================
// SCROLL REVEAL EFFECT
// ===============================
const revealElements = document.querySelectorAll(
  ".card, .welcome-card, .img-grid img, .video-wrapper"
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===============================
// LAZY LOAD IMAGES & VIDEOS
// ===============================
const lazyMedia = document.querySelectorAll("img, video");

const lazyObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const media = entry.target;
      if (media.dataset.src) {
        media.src = media.dataset.src;
      }

      observer.unobserve(media);
    });
  },
  { rootMargin: "200px" }
);

lazyMedia.forEach(media => lazyObserver.observe(media));

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.style.boxShadow =
    window.scrollY > 40
      ? "0 10px 25px rgba(0,0,0,.12)"
      : "0 6px 20px rgba(0,0,0,.08)";
});

// ===============================
// FOOTER YEAR
// ===============================
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
