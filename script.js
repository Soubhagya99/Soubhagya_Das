/*
 * script.js
 * Interactive Morphing Orbs Background & UI Logic
 * Refactored to use Config-Driven Content Rendering
 * Enhanced with typing effect, count-up stats, scroll-to-top,
 * form handling, canvas throttling, and staggered scroll reveals
 */

/* 1. Dynamic Morphing Orbs (Liquid Background) */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let orbs = [];
let isLightMode = false; // Cached theme state for animation performance

// Debounce utility
function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

// Configuration
const orbConfig = {
    count: 3, // Few large orbs
    minSize: 300,
    maxSize: 600,
    colors: [
        { r: 0, g: 242, b: 255 }, // Cyan
        { r: 112, g: 0, b: 255 }, // Purple
        { r: 0, g: 100, b: 255 }  // Deep Blue
    ]
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initOrbs();
}
window.addEventListener('resize', debounce(resizeCanvas, 200));

class Orb {
    constructor(color) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Very slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * (orbConfig.maxSize - orbConfig.minSize) + orbConfig.minSize;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += 0.002; // Slow rotation for "breathing" effect

        // Bounce off walls smoothly
        if (this.x < -this.size || this.x > canvas.width + this.size) this.vx *= -1;
        if (this.y < -this.size || this.y > canvas.height + this.size) this.vy *= -1;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );

        const opacity = isLightMode ? 0.4 : 0.6;

        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Morphing shape (simple circle for max performance with blur)
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initOrbs() {
    orbs = [];
    for (let i = 0; i < orbConfig.count; i++) {
        orbs.push(new Orb(orbConfig.colors[i % orbConfig.colors.length]));
    }
}

function animateOrbs() {
    // Pause animation when tab is hidden (performance optimization)
    if (document.hidden) {
        requestAnimationFrame(animateOrbs);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = isLightMode ? 'multiply' : 'screen';

    orbs.forEach(orb => {
        orb.update();
        orb.draw();
    });

    requestAnimationFrame(animateOrbs);
}

// Listen for tab visibility changes
document.addEventListener('visibilitychange', () => {
    // No action needed — animateOrbs checks document.hidden
});

// =========================================
// CONTENT RENDERING logic
// =========================================

function renderContent() {
    if (typeof portfolioData === 'undefined') {
        console.error("portfolioData not found. Make sure config.js is loaded.");
        return;
    }

    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    renderCertifications();
    renderContact();
    renderFooter();
}

function renderHero() {
    const data = portfolioData.hero;
    document.getElementById('hero-greeting').textContent = data.greeting;
    document.getElementById('hero-name').textContent = data.name;
    // Role is now handled by typing effect — set data attribute
    document.getElementById('typed-role').dataset.text = data.role;
    document.getElementById('hero-bio').innerHTML = data.bio;
    document.getElementById('hero-image').src = data.image;

    const btnContainer = document.getElementById('hero-buttons');
    data.buttons.forEach(btn => {
        const a = document.createElement('a');
        a.href = btn.url;
        a.className = btn.class;
        if (btn.target) a.target = btn.target;
        if (btn.target === '_blank') a.rel = "noopener noreferrer";
        if (btn.download) a.setAttribute('download', '');

        let content = '<span class="btn-content">';
        if (btn.startIcon) content += `<i class="${btn.startIcon} btn-icon-start"></i>`;
        content += `<span class="btn-text">${btn.text}</span>`;
        if (btn.endIcon) content += `<i class="${btn.endIcon} btn-icon-end"></i>`;
        content += '</span>';

        a.innerHTML = content;
        btnContainer.appendChild(a);
    });

    const socialContainer = document.getElementById('hero-social');
    data.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        if (link.target) a.target = link.target;
        if (link.target === '_blank') a.rel = "noopener noreferrer";
        a.innerHTML = `<i class="${link.icon}"></i>`;
        a.setAttribute('aria-label', link.icon.includes('linkedin') ? 'LinkedIn' : link.icon.includes('github') ? 'GitHub' : 'Email');
        socialContainer.appendChild(a);
    });
}

function renderAbout() {
    const data = portfolioData.about;
    document.getElementById('about-title').innerHTML = data.title;

    const container = document.getElementById('about-content');

    // Create About Card
    const card = document.createElement('div');
    card.className = 'about-card glass-card';
    data.cards.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'about-section-item';
        const h3 = document.createElement('h3');
        h3.textContent = item.title;
        const p = document.createElement('p');
        p.textContent = item.text;
        itemDiv.appendChild(h3);
        itemDiv.appendChild(p);
        card.appendChild(itemDiv);
    });
    container.appendChild(card);

    // Create Stats Grid
    const statsGrid = document.createElement('div');
    statsGrid.className = 'stats-grid';
    data.stats.forEach(stat => {
        const tag = stat.link ? 'a' : 'div';
        const statItem = document.createElement(tag);
        statItem.className = 'stat-item glass-card';
        if (stat.link) {
            statItem.href = stat.link;
            statItem.classList.add('stat-item-link');
        }
        statItem.innerHTML = `
            <span class="stat-number" data-target="${stat.number}">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        statsGrid.appendChild(statItem);
    });
    container.appendChild(statsGrid);
}

function renderSkills() {
    const data = portfolioData.skills;
    document.getElementById('skills-title').innerHTML = data.title;
    const grid = document.getElementById('skills-grid');

    data.items.forEach(item => {
        const div = document.createElement('div');
        let classes = 'bento-item';
        if (item.type === 'hero') classes += ' bento-hero';
        if (item.type === 'tall') classes += ' bento-tall';
        div.className = classes;

        let content = `<div class="bento-icon"><i class="${item.icon}"></i></div>
                       <div class="bento-content">
                           <h3>${item.title}</h3>`;

        if (item.list) {
            content += `<ul class="bento-list">`;
            item.list.forEach(li => content += `<li>${li}</li>`);
            content += `</ul>`;
        } else if (item.text) {
            content += `<p>${item.text}</p>`;
        }

        content += `</div>`;
        if (item.type === 'hero') content += `<div class="bento-bg"></div>`;

        div.innerHTML = content;
        grid.appendChild(div);
    });
}

function renderExperience() {
    const data = portfolioData.experience;
    document.getElementById('experience-title').innerHTML = data.title;
    const timeline = document.getElementById('experience-timeline');

    data.jobs.forEach(job => {
        const item = document.createElement('div');
        item.className = 'timeline-item';

        // Build details list
        let detailsHtml = '';
        if (job.details && job.details.length > 0) {
            detailsHtml = `<ul class="job-details">`;
            job.details.forEach(detail => detailsHtml += `<li>${detail}</li>`);
            detailsHtml += `</ul>`;
        }

        // Build stats if present
        let statsHtml = '';
        if (job.stats) {
            statsHtml = `<div class="project-stats timeline-stats">`;
            job.stats.forEach(stat => {
                statsHtml += `<span><i class="${stat.icon}"></i> ${stat.text}</span>`;
            });
            statsHtml += `</div>`;
        }

        // Split date and location if pipe exists, otherwise just date
        const parts = job.date.split('|').map(s => s.trim());
        const dateSpan = parts[0];
        const locationSpan = parts.length > 1 ? parts[1] : '';

        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-date">
                <span>${dateSpan}</span>
                <small>${locationSpan}</small>
            </div>
            <div class="timeline-content glass-card">
                <div class="timeline-header">
                    <div class="header-top timeline-header-top">
                        <div>
                            <h3>${job.role}</h3>
                        </div>
                        ${job.icon ? `<img src="${job.icon}" alt="${job.company}" class="company-logo company-logo-glass" loading="lazy">` : ''}
                    </div>
                </div>
                ${detailsHtml}
                ${statsHtml}
            </div>
        `;
        timeline.appendChild(item);
    });
}

function renderProjects() {
    const data = portfolioData.projects;
    document.getElementById('projects-title').innerHTML = data.title;
    const stack = document.getElementById('projects-grid');

    data.items.forEach(project => {
        const wrapper = document.createElement('div');
        wrapper.className = 'project-wrapper sticky-card';

        // Parse Tech Stack
        let techHtml = '';
        if (project.tech) {
            techHtml = `<div class="project-tags">`;
            project.tech.split(',').forEach(tech => {
                techHtml += `<span class="tech-badge">${tech.trim()}</span>`;
            });
            techHtml += `</div>`;
        }

        let linksHtml = '';
        if (project.links) {
            linksHtml = `<div class="project-links">`;
            project.links.forEach((link) => {
                let iconHtml = link.icon ? ` <i class="${link.icon}"></i>` : '';
                linksHtml += `<a href="${link.url}" class="${link.class}" target="_blank" rel="noopener noreferrer">${link.text}${iconHtml}</a>`;
            });
            linksHtml += `</div>`;
        }

        let statsHtml = '';
        if (project.stats) {
            statsHtml = `<div class="project-stats">`;
            project.stats.forEach(stat => {
                statsHtml += `<span><i class="${stat.icon}"></i> ${stat.text}</span>`;
            });
            statsHtml += `</div>`;
        }

        wrapper.innerHTML = `
            <div class="project-card glass-card">
                <div class="project-content">
                    <div class="project-header">
                        <h3>${project.title}</h3>
                        ${statsHtml}
                    </div>
                    ${techHtml}
                    <p class="project-desc">${project.desc}</p>
                    ${linksHtml}
                </div>
            </div>
        `;
        stack.appendChild(wrapper);
    });
}

function renderCertifications() {
    const data = portfolioData.certifications;
    document.getElementById('certifications-title').innerHTML = data.title;
    const grid = document.getElementById('certifications-grid');

    data.items.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card glass-card';

        // Determine if icon is SVG or Image
        let iconHtml;
        if (cert.icon.trim().startsWith('<svg')) {
            iconHtml = `<div class="cert-icon-wrapper">${cert.icon}</div>`;
        } else {
            iconHtml = `<div class="cert-icon-wrapper"><img src="${cert.icon}" alt="${cert.title}" class="cert-img" loading="lazy"></div>`;
        }

        card.innerHTML = `
            ${iconHtml}
            <div class="cert-info">
                <h3>${cert.title}</h3>
                <p class="cert-date">${cert.date}</p>
                <a href="${cert.verifyLink}" target="_blank" rel="noopener noreferrer" class="btn-verify">
                    Verify Credential <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderEducation() {
    const data = portfolioData.education;
    if (!data) return;
    document.getElementById('education-title').innerHTML = data.title;
    const grid = document.getElementById('education-grid');

    data.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'education-card glass-card';

        card.innerHTML = `
            <div class="edu-logo-wrapper">
                <img src="${item.icon}" alt="${item.institution}" class="edu-logo" loading="lazy">
            </div>
            <div class="edu-content">
                <h3 class="edu-degree">${item.degree}</h3>
                <p class="edu-institution">${item.institution}</p>
                <p class="edu-date">${item.date}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderContact() {
    const data = portfolioData.contact;
    document.getElementById('contact-title').innerHTML = data.title;
    document.getElementById('contact-form').action = data.formAction;

    const linksContainer = document.getElementById('contact-links');

    // LinkedIn card
    if (data.linkedin) {
        const link = document.createElement('a');
        link.href = data.linkedin;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "contact-card glass-card";
        link.innerHTML = `
            <div class="contact-card-icon">
                <img src="images/linkedin.png" alt="LinkedIn">
            </div>
            <div class="contact-card-text">
                <span class="contact-card-title">LinkedIn</span>
                <span class="contact-card-sub">Let's connect professionally</span>
            </div>
            <i class="fas fa-arrow-right contact-card-arrow"></i>
        `;
        linksContainer.appendChild(link);
    }

    // Email card
    if (data.email) {
        const link = document.createElement('a');
        link.href = `mailto:${data.email}`;
        link.className = "contact-card glass-card";
        link.innerHTML = `
            <div class="contact-card-icon">
                <img src="images/email.png" alt="Email">
            </div>
            <div class="contact-card-text">
                <span class="contact-card-title">Email</span>
                <span class="contact-card-sub">${data.email}</span>
            </div>
            <i class="fas fa-arrow-right contact-card-arrow"></i>
        `;
        linksContainer.appendChild(link);
    }
}

function renderFooter() {
    document.getElementById('footer-copyright').innerHTML = portfolioData.contact.copyright;
}

// Copy email to clipboard
function copyEmail(btn) {
    const email = portfolioData.contact.email;
    navigator.clipboard.writeText(email).then(() => {
        const icon = btn.querySelector('i');
        const text = btn.querySelector('span');
        icon.className = 'fas fa-check';
        text.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            icon.className = 'far fa-copy';
            text.textContent = 'Copy Email Address';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// =========================================
// UI INITIALIZATION
// =========================================

function initUI() {
    // FOUC fix: Apply light mode class from pending state
    const html = document.documentElement;
    if (html.classList.contains('light-mode-pending')) {
        html.classList.remove('light-mode-pending');
        document.body.classList.add('light-mode');
        isLightMode = true;
        const icon = document.querySelector('#theme-toggle i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Typing Effect
    initTypingEffect();

    // 3D Tilt Effect
    initTiltEffect();

    // Scroll Animations
    initScrollAnimations();

    // Count-up Animation for Stats
    initCountUp();

    // Theme Toggle
    initThemeToggle();

    // Mobile Menu
    initMobileMenu();

    // Navbar Scroll Effect
    initNavbarScroll();

    // Scroll-to-Top Button
    initScrollToTop();

    // Form Submission Handler
    initFormHandler();

    // Custom Interactive Cursor
    initCustomCursor();

    // Scroll Progress Indicator
    initScrollProgress();

    // Magnetic Elements
    initMagneticElements();

    // Card Glow Tracking
    initCardGlow();
}

// =========================================
// TYPING EFFECT
// =========================================
function initTypingEffect() {
    const typedEl = document.getElementById('typed-role');
    if (!typedEl) return;

    const text = portfolioData.hero.role;
    let index = 0;
    const speed = 80; // ms per character

    function type() {
        if (index < text.length) {
            typedEl.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after hero entrance animation (delay ~0.6s)
    setTimeout(type, 800);
}

// =========================================
// COUNT-UP ANIMATION
// =========================================
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.dataset.target;
                animateCountUp(el, target);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
}

function animateCountUp(el, target) {
    // Extract numeric part and suffix (e.g., "3+" → 3, "+")
    const match = target.match(/^(\d+)(.*)$/);
    if (!match) return;

    const endValue = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 1500; // ms
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * endValue);

        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function initTiltEffect() {
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        // Use AbortController instead of cloneNode to avoid duplicate listeners
        const controller = new AbortController();
        card._tiltController = controller;

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        }, { signal: controller.signal });

        // Optimization: Use requestAnimationFrame for smooth tilt
        let ticking = false;
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const xPct = x / rect.width;
                    const yPct = y / rect.height;

                    const isContactCard = card.classList.contains('contact-wrapper');
                    const multiplier = isContactCard ? 5 : 10;

                    const xRotation = (xPct - 0.5) * multiplier;
                    const yRotation = (0.5 - yPct) * multiplier;

                    card.style.transform = `perspective(1000px) rotateX(${yRotation}deg) rotateY(${xRotation}deg) scale3d(1.02, 1.02, 1.02)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { signal: controller.signal });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        }, { signal: controller.signal });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Staggered reveal: add per-item delay based on index
    const staggerGroups = [
        { selector: '.bento-item', delay: 0.1 },
        { selector: '.timeline-item', delay: 0.15 },
        { selector: '.cert-card', delay: 0.12 },
        { selector: '.sticky-card', delay: 0.15 }
    ];

    staggerGroups.forEach(group => {
        document.querySelectorAll(group.selector).forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * group.delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * group.delay}s`;
            observer.observe(el);
        });
    });

    // Non-staggered elements
    document.querySelectorAll('.section-title, .about-card, .stats-grid, .education-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Parallax for hero image - Optimized with requestAnimationFrame
    const heroImage = document.querySelector('.image-wrapper');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking && heroImage) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < 600) {
                    const rotation = scrolled * 0.05;
                    const translateY = scrolled * 0.2;
                    heroImage.style.transform = `translateY(${translateY}px) rotateX(${rotation}deg)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check if already applied via FOUC fix
    if (body.classList.contains('light-mode')) {
        isLightMode = true;
        icon.classList.replace('fa-moon', 'fa-sun');
    } else if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        isLightMode = true;
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        isLightMode = body.classList.contains('light-mode');

        if (isLightMode) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        // Lock body scroll when menu is open
        document.body.classList.toggle('menu-open', isActive);
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });

    // Keyboard support: Escape to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            hamburger.focus(); // Return focus to trigger
        }
    });
}

function initNavbarScroll() {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Navbar styling on scroll
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                // Scroll Spy Logic
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    // -150 offset to trigger active state slightly before the section hits top
                    if (window.scrollY >= (sectionTop - 150)) {
                        current = section.getAttribute('id');
                    }
                });

                // Update desktop nav
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });

                // Also update mobile nav links
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// =========================================
// SCROLL-TO-TOP BUTTON
// =========================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    let stTicking = false;
    window.addEventListener('scroll', () => {
        if (!stTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
                stTicking = false;
            });
            stTicking = true;
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================================
// FORM SUBMISSION HANDLER
// =========================================
function initFormHandler() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const feedback = form.querySelector('.form-feedback');

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                feedback.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                feedback.className = 'form-feedback show success';
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            feedback.textContent = '✗ Something went wrong. Please try again or email me directly.';
            feedback.className = 'form-feedback show error';
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Auto-hide feedback after 5 seconds
            setTimeout(() => {
                feedback.className = 'form-feedback';
            }, 5000);
        }
    });
}

// =========================================
// PREMIUM INTERACTIONS
// =========================================

function initCustomCursor() {
    if (window.innerWidth <= 1024) return;

    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    if (!cursorOuter || !cursorInner) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;

    // Physics constants for fluid movement
    const STIFFNESS = 0.15;
    const DAMPING = 0.8;
    let velocityX = 0, velocityY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Advanced Multi-Layer Click Feedback
    window.addEventListener('mousedown', (e) => {
        const { clientX: x, clientY: y } = e;

        // 1. Shockwave Layer
        const shockwave = document.createElement('div');
        shockwave.className = 'click-shockwave';
        shockwave.style.left = `${x}px`;
        shockwave.style.top = `${y}px`;
        document.body.appendChild(shockwave);
        setTimeout(() => shockwave.remove(), 800);

        // 2. Aura Bloom Layer
        const bloom = document.createElement('div');
        bloom.className = 'click-bloom';
        bloom.style.left = `${x}px`;
        bloom.style.top = `${y}px`;
        document.body.appendChild(bloom);
        setTimeout(() => bloom.remove(), 1000);

        // 3. Bioluminescent Particles
        const particleCount = 6;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';

            // Random direction and distance
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.5);
            const velocity = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    });

    const animate = () => {
        // Advanced Spring Physics for Outer Cursor
        const dx = mouseX - outerX;
        const dy = mouseY - outerY;

        const ax = dx * STIFFNESS;
        const ay = dy * STIFFNESS;

        velocityX = (velocityX + ax) * DAMPING;
        velocityY = (velocityY + ay) * DAMPING;

        outerX += velocityX;
        outerY += velocityY;

        // Inner dot follows with less lag for precision
        innerX += (mouseX - innerX) * 0.4;
        innerY += (mouseY - innerY) * 0.4;

        cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;
        cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    };
    animate();

    // Enhanced Interactions & Snapping
    const interactables = 'a, button, .contact-card, .stat-item-link, .scroll-top-btn';

    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(interactables);
        if (target) {
            document.body.classList.add('cursor-hover');

            // Refined VIEW trigger: only on actual "view" actions
            // e.g., the Verify button in certificates or project links
            if (target.classList.contains('btn-verify') ||
                target.classList.contains('btn-primary') ||
                target.classList.contains('btn-outline') ||
                target.closest('.project-links')) {
                document.body.classList.add('cursor-view');
            }

            // Magnetic snap inner dot to center of small elements (buttons/links)
            if (target.classList.contains('btn') ||
                target.tagName === 'A' ||
                target.classList.contains('scroll-top-btn')) {
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Snap the reference points so the inner dot jumps to center
                innerX = centerX;
                innerY = centerY;
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(interactables);
        if (target) {
            document.body.classList.remove('cursor-hover');
            document.body.classList.remove('cursor-view');
        }
    });

    // Fade when leaving window
    document.addEventListener('mouseleave', () => {
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorOuter.style.opacity = '0.3';
        cursorInner.style.opacity = '1';
    });
}

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

function initMagneticElements() {
    // Select elements to apply magnetic effect
    const magneticElements = document.querySelectorAll('.btn, .nav-actions button, .social-links a');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

            // Move the content container (text + icons) with a secondary lag
            const btnContent = this.querySelector('.btn-content') || this.querySelector('.btn-text');
            if (btnContent) {
                btnContent.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            }
        });

        el.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0)';
            const btnText = this.querySelector('.btn-text');
            if (btnText) {
                btnText.style.transform = 'translate(0, 0)';
            }
        });
    });
}

function initCardGlow() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// =========================================
// MAIN ENTRY POINT
// =========================================

// Initialize background
resizeCanvas();
animateOrbs();

// Render content first
renderContent();

// Then initialize UI interactions
initUI();
