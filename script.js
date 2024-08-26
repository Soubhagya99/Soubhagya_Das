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
  return function (...args) {
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

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
})

document.addEventListener('click', () => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500)
})

// Animated typing effect for hero section
const heroText = document.querySelector('.hero h2');
const text = heroText.textContent;
heroText.textContent = '';

function typeWriter(text, i = 0) {
  if (i < text.length) {
    heroText.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 100);
  }
}

// Start typing effect when the page loads
window.addEventListener('load', () => {
  typeWriter(text);
  addClickEffect();
  fadeEffect();
});

function addClickEffect() {
  const fancyText = document.querySelector('.fancy-text');
  fancyText.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    setTimeout(() => {
      ripple.remove();
    }, 300);
  });
}

function fadeEffect() {
  const fadeText = document.getElementById('fade-text');
  const texts = [
    "Driving data-driven decision-making and innovative solutions.",
    "Building robust and scalable machine learning models.",
    "Passionate about unlocking the power of data."
  ];
  let currentIndex = 0;

  function fadeInOut() {
    fadeText.classList.remove('fade-in');
    fadeText.classList.add('fade-out');

    setTimeout(() => {
      fadeText.textContent = texts[currentIndex];
      fadeText.classList.remove('fade-out');
      fadeText.classList.add('fade-in');

      currentIndex = (currentIndex + 1) % texts.length;
    }, 500); // Half of the total transition time
  }

  // Initial text display
  fadeText.textContent = texts[0];
  fadeText.classList.add('fade-in');

  // Start the fade cycle
  setInterval(fadeInOut, 4500); // Total time for each text display (3s display + 1s transition)
}