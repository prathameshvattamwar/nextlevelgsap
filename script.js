// Initialize GSAP
window.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
  
    gsap.set([cursor, cursorFollower], { opacity: 0 });
  
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power1.out',
        opacity: 1
      });
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
        opacity: 1
      });
    });
  
    document.addEventListener('mouseenter', () => {
      gsap.to([cursor, cursorFollower], { opacity: 1 });
    });
  
    document.addEventListener('mouseleave', () => {
      gsap.to([cursor, cursorFollower], { opacity: 0 });
    });
  
    // Add hover effect for links and buttons
    const hoverables = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    
    hoverables.forEach(hoverable => {
      hoverable.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
      });
      
      hoverable.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
      });
    });
  
    // Scroll Indicator
    gsap.to('.scroll-indicator', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  
    // Header Animation
    gsap.to('.header', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '50 top',
        toggleClass: { targets: '.header', className: 'scrolled' }
      }
    });
  
    // Hero Section Animations
    const heroTl = gsap.timeline({ delay: 0.5 });
  
    heroTl.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .to('.hero-title', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .to('.hero-description', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .to('.hero-image', { opacity: 0.7, x: 0, duration: 1, ease: 'power2.out' }, '-=0.5');
  
    // Shape Animations
    gsap.to('.shape-1', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  
    gsap.to('.shape-2', {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: 'none'
    });
  
    // Fade Up Animation for Section Titles
    gsap.utils.toArray('.fade-up').forEach(element => {
      gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  
    // Fade Right Animation
    gsap.utils.toArray('.fade-right').forEach(element => {
      gsap.from(element, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  
    // Fade Left Animation
    gsap.utils.toArray('.fade-left').forEach(element => {
      gsap.from(element, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  
    // Scale Up Animation
    gsap.utils.toArray('.scale-up').forEach(element => {
      gsap.from(element, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  
    // Service Cards Stagger Animation
    gsap.from('.service-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  
    // Portfolio Items Stagger Animation
    gsap.from('.portfolio-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  
    // Portfolio Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        gsap.to(portfolioItems, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out',
          onComplete: () => {
            portfolioItems.forEach(item => {
              // Hide all items
              item.style.display = 'none';
              
              // Show items that match filter
              if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
              }
            });
            
            // Animate items back in
            gsap.to(portfolioItems, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.1,
              ease: 'power2.out'
            });
          }
        });
      });
    });
  
    // Mobile Menu Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
  
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          mobileNavToggle.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    });
  
    // Magnetic Button Effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  
    // Parallax Effect for Hero Section
    gsap.to('.hero-content', {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  
    // Contact Form Animation
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          borderColor: 'var(--accent)',
          duration: 0.3
        });
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          gsap.to(input, {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            duration: 0.3
          });
        }
      });
    });
  
    // Scroll To Top Button
    const body = document.querySelector('body');
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    body.appendChild(scrollTopBtn);
  
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        color: var(--dark);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }
      
      .scroll-top-btn:hover {
        transform: translateY(-3px);
      }
    `;
    document.head.appendChild(style);
  
    // Show/Hide Scroll To Top Button
    gsap.to('.scroll-top-btn', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top -20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to('.scroll-top-btn', { 
            opacity: 1, 
            visibility: 'visible', 
            duration: 0.3 
          });
        },
        onLeaveBack: () => {
          gsap.to('.scroll-top-btn', { 
            opacity: 0, 
            visibility: 'hidden', 
            duration: 0.3 
          });
        }
      }
    });
  
    // Scroll To Top Functionality
    scrollTopBtn.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1.5,
        ease: 'power4.inOut'
      });
    });
  
    // Text Reveal Effect for Section Titles
    const splitText = (element) => {
      const text = element.innerText;
      const splitText = text.split('');
      
      element.innerHTML = '';
      
      splitText.forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.display = 'inline-block';
        element.appendChild(span);
      });
      
      return element;
    };
  
    // Apply text reveal animation to section titles
    document.querySelectorAll('.section-title').forEach(title => {
      const spans = splitText(title).querySelectorAll('span');
      
      gsap.from(spans, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetId,
              offsetY: 80
            },
            ease: 'power3.inOut'
          });
        }
      });
    });
  
    // Page Loader Animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">Next<span>Level</span></div>
        <div class="loader-progress"><div class="loader-bar"></div></div>
      </div>
    `;
    document.body.prepend(loader);
  
    // Add styles for loader
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
      .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark);
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .loader-content {
        text-align: center;
      }
      
      .loader-logo {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 20px;
      }
      
      .loader-logo span {
        color: var(--accent);
      }
      
      .loader-progress {
        width: 300px;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }
      
      .loader-bar {
        height: 100%;
        width: 0;
        background: linear-gradient(to right, var(--secondary), var(--accent));
      }
    `;
    document.head.appendChild(loaderStyle);
  
    // Animate loader
    const loaderTl = gsap.timeline({
      onComplete: () => {
        gsap.to('.page-loader', {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loader.remove();
          }
        });
      }
    });
  
    loaderTl.to('.loader-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' });
  
    // Image hover effects for portfolio items
    const portfolioOverlays = document.querySelectorAll('.portfolio-overlay');
    
    portfolioOverlays.forEach(overlay => {
      const parent = overlay.parentElement;
      const image = parent.querySelector('.portfolio-img');
      
      parent.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.1, duration: 0.5 });
        gsap.to(overlay, { opacity: 1, duration: 0.3 });
      });
      
      parent.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.5 });
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
      });
    });
  
    // Typewriter effect for hero title
    function startTypewriter() {
      const heroTitle = document.querySelector('.hero-title');
      const originalText = heroTitle.innerHTML;
      const textParts = originalText.split('<span class="text-gradient">Digital Experiences</span>');
      const beforeText = textParts[0];
      const afterText = textParts[1];
      
      // Set up the text for typewriter effect
      heroTitle.innerHTML = `${beforeText}<span class="typewriter"></span>${afterText}`;
      const typewriterElement = heroTitle.querySelector('.typewriter');
      
      // Create the typewriter effect
      let text = 'Digital Experiences';
      let i = 0;
      
      function type() {
        if (i < text.length) {
          typewriterElement.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, 100);
        } else {
          // When typing is complete, add the gradient class
          typewriterElement.classList.add('text-gradient');
        }
      }
      
      // Start typing after a delay
      setTimeout(() => {
        type();
      }, 2000);
    }
    
    // Start the typewriter effect
    startTypewriter();
  
    // Add parallax effect to shapes
    document.addEventListener('mousemove', (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
      
      gsap.to('.shape-1', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power1.out'
      });
      
      gsap.to('.shape-2', {
        x: -xPos,
        y: -yPos,
        duration: 1,
        ease: 'power1.out'
      });
    });
  
    // 3D tilt effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
          rotationY: xPos * 10,
          rotationX: -yPos * 10,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
    });
  
    // Initialize ScrollTrigger refresh to ensure proper functioning
    ScrollTrigger.refresh();
  });