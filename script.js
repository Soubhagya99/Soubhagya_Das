const toggleButton = document.getElementById('dark-light-toggle');
const bodyElement = document.body;
const backToTopButton = document.getElementById('back-to-top');

// Theme toggle logic
toggleButton.addEventListener('click', () => {
  const isDarkMode = bodyElement.classList.toggle('dark-mode');
  toggleButton.classList.toggle('fa-moon', !isDarkMode);
  toggleButton.classList.toggle('fa-sun', isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    toggleButton.classList.replace('fa-moon', 'fa-sun');
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