document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Scroll Animation
  const revealElements = document.querySelectorAll('.reveal');
  
  function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      }
    }
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initialize on page load
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if it's open
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form Validation
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
        }
      }
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
      }
    });
  }
  
  // Add page transition effect with improved navigation continuity
  window.addEventListener('beforeunload', function() {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    document.body.classList.add('page-leaving');
  });

  // Enhanced page transition for navigation links
  document.querySelectorAll('a[href^="./"], a[href$=".html"], a[href^="../"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only apply transition for internal navigation
      if (this.hostname === window.location.hostname) {
        document.body.classList.add('page-leaving');
      }
    });
  });
  
  // Set active navigation link based on current page
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPage.includes(linkPath) && linkPath !== 'index.html') {
      link.classList.add('active');
    } else if (currentPage.endsWith('/') && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });
});