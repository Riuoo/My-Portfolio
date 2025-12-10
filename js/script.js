// Portfolio Website JavaScript
// Author: Your Name
// Description: Interactive functionality for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initSmoothScrolling();
    initCarousel();
    initScrollAnimations();
    initTypingEffect();
    initProjectFilter();
    initContactForm();
    initSkillsFilter();
    initSkillsAnimation();
    initBackToTop();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation to the toggle
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Certificates Carousel
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const slides = document.querySelectorAll('.certificate-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    // Create dots
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play carousel
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const carousel = document.querySelector('.certificates-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Initialize
    createDots();
    updateCarousel();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Add scroll animation class to elements
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .certificate-card, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Typing Effect for Home Section
function initTypingEffect() {
    const typingElement = document.querySelector('.home-subtitle');
    if (!typingElement) return;
    
    const texts = [
        'IT Student',
        'Aspiring Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeText, 1000);
}

// Notification system removed - using Netlify's native form handling

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Project Filter Functionality
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noProjectsMessage = document.getElementById('no-projects-message');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            let visibleCount = 0;
            
            // Filter projects
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show project with staggered animation
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, index * 100);
                    visibleCount++;
                } else {
                    // Hide project immediately
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 200);
                }
            });
            
            // Show/hide no projects message
            setTimeout(() => {
                if (visibleCount === 0) {
                    noProjectsMessage.style.display = 'flex';
                } else {
                    noProjectsMessage.style.display = 'none';
                }
            }, 400);
        });
    });
}

// Enhanced Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('form-status');
    const charCount = document.getElementById('char-count');
    const messageField = document.getElementById('message');
    
    if (!form) return;
    
    // Character counter for message field
    messageField.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        const counter = this.parentElement.querySelector('.char-counter');
        if (count > 900) {
            counter.classList.add('error');
            counter.classList.remove('warning');
        } else if (count > 800) {
            counter.classList.add('warning');
            counter.classList.remove('error');
        } else {
            counter.classList.remove('warning', 'error');
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showLoadingState();
            // Simulate form submission (Netlify will handle actual submission)
            setTimeout(() => {
                showSuccessMessage();
                resetForm();
                hideLoadingState();
            }, 2000);
        }
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';
        
        // Validation rules
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                } else if (value.length > 50) {
                    isValid = false;
                    errorMessage = 'Name must be less than 50 characters';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters long';
                } else if (value.length > 100) {
                    isValid = false;
                    errorMessage = 'Subject must be less than 100 characters';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                } else if (value.length > 1000) {
                    isValid = false;
                    errorMessage = 'Message must be less than 1000 characters';
                }
                break;
        }
        
        if (isValid) {
            clearFieldError(field);
        } else {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function validateForm() {
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }
    
    function showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        field.classList.add('error');
    }
    
    function clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
    }
    
    function clearError(e) {
        clearFieldError(e.target);
    }
    
    function showLoadingState() {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
    }
    
    function hideLoadingState() {
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
    
    function showSuccessMessage() {
        formStatus.innerHTML = `
            <div class="status-message success">
                <i class="status-icon fas fa-check-circle"></i>
                <span class="status-text">Thank you! Your message has been sent successfully.</span>
            </div>
        `;
        formStatus.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    function resetForm() {
        form.reset();
        charCount.textContent = '0';
        inputs.forEach(input => clearFieldError(input));
    }
}

// Skills Filter and Progress Animation
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skills-filter .filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (!filterButtons.length || !skillCategories.length) return;
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter categories
            skillCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                
                if (filter === 'all' || categoryType === filter) {
                    category.classList.remove('hidden');
                    // Animate progress bars when category becomes visible
                    setTimeout(() => {
                        animateProgressBars(category);
                    }, 300);
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    });
    
    // Initial animation for visible categories
    setTimeout(() => {
        skillCategories.forEach(category => {
            if (!category.classList.contains('hidden')) {
                animateProgressBars(category);
            }
        });
    }, 500);
}

function animateProgressBars(container) {
    const progressBars = container.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        // Reset width
        bar.style.width = '0%';
        
        // Animate after a small delay
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Intersection Observer for skills animation
function initSkillsAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (!skillCategories.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target;
                const progressBars = category.querySelectorAll('.progress-fill');
                
                // Animate progress bars
                progressBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, index * 150);
                });
                
                // Unobserve after animation
                observer.unobserve(category);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard support
    backToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Netlify Forms handles form submission automatically
// Enhanced JavaScript provides better UX and validation

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeToggle,
        initNavigation,
        initCarousel,
        initProjectFilter,
        initContactForm,
        initSkillsFilter,
        initSkillsAnimation,
        initBackToTop
    };
}
