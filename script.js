// Menu toggle for mobile navigation
const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');

btn.addEventListener('click', () => {
  links.classList.toggle('open');
});
