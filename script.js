const toggleButton = document.getElementById('dark-light-toggle');
const bodyElement = document.body;

toggleButton.addEventListener('click', () => {
  bodyElement.classList.toggle('dark-mode');
  toggleButton.classList.toggle('fa-moon');
  toggleButton.classList.toggle('fa-sun');
  localStorage.setItem('theme', bodyElement.classList.contains('dark-mode') ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    toggleButton.classList.remove('fa-moon');
    toggleButton.classList.add('fa-sun');
  }
});

let scrollTimeout;

function handleScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollPosition = window.scrollY;
    const backToTopButton = document.getElementById('back-to-top');

    if (scrollPosition > 300) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }, 100);
}

window.addEventListener('scroll', handleScroll);

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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