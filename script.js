function toggleMenu() {
    const menu = document.querySelector(".links ul");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you ${name} for your message! I'll get back to you soon.`);
            
            // Clear the form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const menu = document.querySelector(".links ul");
                    if (window.innerWidth <= 900 && menu.style.display === "flex") {
                        menu.style.display = "none";
                    }
                }
            }
        });
    });
});