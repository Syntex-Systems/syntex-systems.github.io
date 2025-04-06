// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
    
    // Product card animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const delay = card.getAttribute('data-delay');
      card.style.setProperty('--delay', delay);
    });
    
    // Hero parallax effect
    const hero = document.querySelector('.hero');
    
    function handleMouseMove(e) {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const heroGlows = document.querySelectorAll('.hero-glow');
      heroGlows.forEach((glow, index) => {
        const speed = index + 1;
        const xShift = x * speed * 30;
        const yShift = y * speed * 30;
        glow.style.transform = `translate(${xShift}px, ${yShift}px)`;
      });
    }
    
    hero.addEventListener('mousemove', handleMouseMove);
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuButton.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Log form data (in a real application, you would send this to a server)
      console.log('Form submitted:', { name, email, message });
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      alert('Thanks for reaching out! We\'ll get back to you soon.');
    });
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only prevent default if it's not an empty link
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('show')) {
              navLinks.classList.remove('show');
            }
            
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Initialize product card hover effects
    const initProductCards = () => {
      productCards.forEach(card => {
        const title = card.querySelector('h3');
        const link = card.querySelector('.product-link');
        const arrow = card.querySelector('.arrow-right');
        
        card.addEventListener('mouseenter', () => {
          title.style.color = 'var(--electric)';
          link.style.color = 'var(--electric)';
          arrow.style.transform = 'translateX(4px)';
        });
        
        card.addEventListener('mouseleave', () => {
          title.style.color = '';
          link.style.color = '';
          arrow.style.transform = '';
        });
      });
    };
    
    initProductCards();
  });