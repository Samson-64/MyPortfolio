// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.navbar nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Animate hero text on load
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = 'translateY(40px)';
    setTimeout(() => {
      heroTitle.style.transition = 'all 0.8s cubic-bezier(.77,0,.18,1)';
      heroTitle.style.opacity = 1;
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  // Contact card hover effect (for touch devices)
  document.querySelectorAll('.contact-list li').forEach(card => {
    card.addEventListener('touchstart', function () {
      this.classList.add('hovered');
    });
    card.addEventListener('touchend', function () {
      this.classList.remove('hovered');
    });
  });
});

AOS.init({
    duration: 900,
    once: true
  });
  
  // Typed.js for hero subtitle
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('typed-roles')) {
      new Typed('#typed-roles', {
        strings: [
          'AI Automation Enthusiast',
          'Website Designer',
          'Trader'
        ],
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 1200,
        startDelay: 400,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    }
  });