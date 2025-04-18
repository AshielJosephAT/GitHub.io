document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // If using Formspree, let it handle the submission
            // If you want to add custom handling, you can add it here
            // For example:
            // e.preventDefault();
            // Your custom form handling logic
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .project-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    window.addEventListener('load', function() {
        document.querySelectorAll('.service-card, .project-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
        });
        
        animateOnScroll();
    });
    
    // Animate elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (!skillsAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsAnimated = true;
        }
    }
    
    // Intersection Observer for skill bars animation
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
      // Gallery Modal Functionality
  const modal = document.getElementById('gallery-modal');
  const closeModal = document.querySelector('.close-modal');
  const galleryLinks = document.querySelectorAll('.project-links a[href="#"]');
  
  // Sample gallery data (replace with your actual images)
  const galleries = {
    food: [
      'images/food1.jpg',
      'images/food2.jpg',
      'images/food3.jpg',
      'images/food4.jpg',
      'images/food5.jpg',
      'images/im1.png',
      'images/im2.jpg',
      'images/i4.jpg',
      'images/food6.jpg'
    ],
    corporate: [
      'images/v1.mp4',
      'images/v2.mp4'
    ],
    poster: [
      'images/p1.jpeg',
      'images/p2.jpg'
    ]
  };
  
  // Open modal when gallery link is clicked
  galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const projectCard = this.closest('.project-card');
      const projectTitle = projectCard.querySelector('h3').textContent;
      
      let galleryId;
      if (projectTitle.includes('Food')) galleryId = 'food';
      else if (projectTitle.includes('Corporate')) galleryId = 'corporate';
      else if (projectTitle.includes('Poster')) galleryId = 'poster';
      
      openGallery(galleryId, projectTitle);
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  // Close when clicking outside modal content
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  function openGallery(galleryId, title) {
    const galleryContainer = document.querySelector('.gallery-container');
    const modalTitle = document.getElementById('modal-title');
    
    // Clear previous images
    galleryContainer.innerHTML = '';
    
    // Set title
    modalTitle.textContent = title + ' Gallery';
    
    // Add images to gallery
    galleries[galleryId].forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = title + ' image';
      galleryContainer.appendChild(img);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
    // Enlarged Image Modal Functionality
    const imageModal = document.getElementById('image-modal');
    const enlargedImg = document.getElementById('enlarged-image');
    const imageCaption = document.getElementById('image-caption');
    const closeEnlarged = document.querySelector('.close-enlarged');
    
    // Function to open enlarged image
    function openEnlarged(imgSrc, altText) {
      imageModal.style.display = 'block';
      enlargedImg.src = imgSrc;
      imageCaption.textContent = altText;
      document.body.style.overflow = 'hidden';
    }
    
    // Close enlarged image modal
    closeEnlarged.addEventListener('click', function() {
      imageModal.style.display = 'none';
      document.body.style.overflow = '';
    });
    
    // Close when clicking outside image
    imageModal.addEventListener('click', function(e) {
      if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    
    // Modify the openGallery function to include click handlers for images
    function openGallery(galleryId, title) {
      const galleryContainer = document.querySelector('.gallery-container');
      const modalTitle = document.getElementById('modal-title');
      
      // Clear previous images
      galleryContainer.innerHTML = '';
      
      // Set title
      modalTitle.textContent = title + ' Gallery';
      
      // Add images to gallery with click handlers
      galleries[galleryId].forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${title} image ${index + 1}`;
        img.addEventListener('click', () => {
          openEnlarged(imgSrc, `${title} image ${index + 1}`);
        });
        galleryContainer.appendChild(img);
      });
      
      // Show modal
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
});