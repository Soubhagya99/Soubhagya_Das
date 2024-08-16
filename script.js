// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navControls = document.querySelector('.nav-controls');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navControls.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  
  // Update aria-expanded attribute for accessibility
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    navControls.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('nav') && navControls.classList.contains('active')) {
    navControls.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Theme toggle logic
const toggleButton = document.getElementById('dark-light-toggle');
const bodyElement = document.body;

toggleButton.addEventListener('click', () => {
  const isDarkMode = bodyElement.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    toggleButton.checked = true;
  }
});

// Improved scroll handling with debounce
let scrollTimeout;
function debounce(func, wait = 100) {
  return function(...args) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => func.apply(this, args), wait);
  };
}

window.addEventListener('scroll', debounce(() => {
  const scrollPosition = window.scrollY;
  document.body.classList.toggle('scrolled', scrollPosition > 300);
}));

// Smooth scroll to top
const backToTopButton = document.getElementById('back-to-top');
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const starsContainer = document.createElement('div');
starsContainer.classList.add('stars');

for (let i = 0; i < 100; i++) { // Adjust the number of stars as desired
  const star = document.createElement('div');
  star.classList.add('star');

  // Generate random positions for the star
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;

  starsContainer.appendChild(star);
}

document.body.appendChild(starsContainer);