/* ======================== script.js ======================== */
(function(){
  // Menu toggle functionality
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  
  menuToggle.addEventListener('click', ()=>{
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    
    // Change icon based on menu state
    const icon = menuToggle.querySelector('i');
    if(isOpen) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if(menu.classList.contains('open') && 
       !menu.contains(e.target) && 
       !menuToggle.contains(e.target)) {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Form handling
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !message){
      showNotification('Zəhmət olmasa bütün xanaları doldurun.', 'error');
      return;
    }
    
    // Very basic email check
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      showNotification('Düzgün e-poçt daxil edin.', 'error');
      return;
    }

    // Simulate send
    status.textContent = 'Göndərilir...';
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    
    setTimeout(()=>{
      showNotification('Mesajınız göndərildi — təşəkkürlər!', 'success');
      status.textContent = '';
      form.reset();
      submitBtn.disabled = false;
    }, 1500);
  });

  // Show notification function
  function showNotification(message, type) {
    // Remove any existing notifications first
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if(notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Back to top button functionality
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        // Close mobile menu if open
        if(menu.classList.contains('open')) {
          menu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation on scroll
  function animateOnScroll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(cardPosition < screenPosition) {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize card animations
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  // Initial check on page load
  window.addEventListener('load', animateOnScroll);

  // small accessibility: focus outline visible on keyboard navigation
  document.body.addEventListener('keyup',(e)=>{
    if(e.key === 'Tab') document.documentElement.style.scrollBehavior = 'smooth';
  });
})();