// ===== Mobile Menu Toggle =====
function toggleMenu() {
  const menu = document.querySelector(".links ul");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Form Handling =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Show success message
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = '#22c55e';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    });
  }
  
  // ===== Smooth Scrolling =====
  const navLinks = document.querySelectorAll('nav a, .navbar a, .home-cta a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu
          const menu = document.querySelector(".links ul");
          if (window.innerWidth <= 900 && menu.style.display === "flex") {
            menu.style.display = "none";
          }
        }
      }
    });
  });
  
  // ===== Scroll Animations (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  
  // ===== Navbar Background on Scroll =====
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
  
  // ===== Active Nav Link Highlight =====
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.links a[href="#${sectionId}"]`);
      
      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.style.color = '#38bdf8';
        } else {
          navLink.style.color = '';
        }
      }
    });
  });
  
  // ===== Skill Bar Animation =====
  const skillSection = document.querySelector('.skills');
  let skillsAnimated = false;
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-progress').forEach(bar => {
          bar.style.animation = 'skillLoad 1s ease-out forwards';
        });
      }
    });
  }, { threshold: 0.3 });
  
  if (skillSection) {
    skillObserver.observe(skillSection);
  }
  
  // ===== Close Menu on Window Resize =====
  window.addEventListener('resize', () => {
    const menu = document.querySelector(".links ul");
    if (window.innerWidth > 900) {
      menu.style.display = '';
    }
  });
});
