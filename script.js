// ===== Vansh Badjate Portfolio — Interactions =====
document.addEventListener('DOMContentLoaded', function () {
  // ===== Scroll Progress =====
  const scrollProgress = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
  });

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // ===== Mobile Menu Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.getBoundingClientRect().top + window.scrollY - 76;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  // ===== Terminal-style Typing Effect =====
  const typingText = document.querySelector('.typing-text');
  const lines = [
    'currently building RAG pipelines & document AI',
    'evaluating LLM reasoning, not just LLM vibes',
    'shipping computer vision that runs in production',
    'open to AI/ML & data engineering roles'
  ];
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  function type() {
    if (!typingText) return;
    const current = lines[lineIndex];
    if (isDeleting) {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    let speed = isDeleting ? 28 : 42;
    if (!isDeleting && charIndex === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  setTimeout(type, 500);

  // ===== Scroll Reveal Animations =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'), 10);
        let current = 0;
        const increment = Math.max(count / 30, 1);
        const timer = setInterval(() => {
          current += increment;
          if (current >= count) {
            target.textContent = count;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(current);
          }
        }, 35);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(num => counterObserver.observe(num));

  // ===== Contact Form Submit Feedback =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
      }
    });
  }

  // ===== Active Nav Link Highlight =====
  const sections = document.querySelectorAll('section[id], header[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 110;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });

  // ===== Prevent Default on Empty Links =====
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });
});