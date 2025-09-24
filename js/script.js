// ===== PORTFOLIO JAVASCRIPT FUNCTIONS =====

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    smoothScrollTo: (element, offset = 0) => {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// ===== YOUTUBE BANNER FUNCTIONALITY =====
function closeBanner() {
    const banner = document.getElementById('youtube-banner');
    const header = document.querySelector('header');
    
    if (banner) {
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';
        
        // Move header back to top when banner is closed
        if (header) {
            header.style.top = '0';
            header.classList.add('banner-closed');
        }
        
        setTimeout(() => {
            banner.style.display = 'none';
            document.body.classList.remove('banner-visible');
        }, 300);
    }
}

// Auto-hide banner after 10 seconds
function initYoutubeBanner() {
    const banner = document.getElementById('youtube-banner');
    
    // Ensure banner is visible
    if (banner) {
        console.log('YouTube banner found, making it visible');
        banner.style.display = 'block';
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
        banner.style.visibility = 'visible';
        document.body.classList.add('banner-visible');
    } else {
        console.log('YouTube banner not found!');
    }
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (banner && banner.style.display !== 'none') {
            console.log('Auto-hiding YouTube banner');
            closeBanner();
        }
    }, 10000);
}

// ===== SKILLS FILTER FUNCTIONALITY =====
function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('.skills-filter-btn');
    const skillCategories = document.querySelectorAll('.skills-category');

    // Add event listeners to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            // Add ripple effect
            createRippleEffect(this);

            // Filter categories with animation
            skillCategories.forEach((category, index) => {
                const categoryType = category.getAttribute('data-category');
                
                setTimeout(() => {
                if (filter === 'all') {
                    showCategory(category);
                } else if (categoryType === filter) {
                    showCategory(category);
                } else {
                    hideCategory(category);
                }
                }, index * 100); // Staggered animation
            });

            // Re-trigger skill animations for visible categories
            setTimeout(animateVisibleSkills, 300);
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show category with animation
function showCategory(category) {
    category.classList.remove('hidden');
    category.classList.add('visible', 'fade-in');
}

// Hide category
function hideCategory(category) {
    category.classList.add('hidden');
    category.classList.remove('visible', 'fade-in');
}

// Animate only visible skills
function animateVisibleSkills() {
    const visibleCategories = document.querySelectorAll('.skills-category.visible, .skills-category:not(.hidden)');
    
    visibleCategories.forEach(category => {
        const skillBars = category.querySelectorAll('.skill-level');
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            const targetPercentage = parseInt(targetWidth);
            
            // Only animate if not already animated
            if (!bar.classList.contains('animated')) {
                bar.style.width = '0%';
                
                // Reset and animate the percentage counter
                const percentageElement = bar.closest('.skill-item').querySelector('.skill-percentage');
                percentageElement.textContent = '0%';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.classList.add('animated');
                    // Animate counter with staggered delay
                    setTimeout(() => {
                        animateCounter(percentageElement, 0, targetPercentage, 1200);
                    }, index * 100);
                }, 100);
            }
        });
    });
}

// Skill animation on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            const targetPercentage = parseInt(targetWidth);
            
            // Animate the percentage counter
            const percentageElement = bar.closest('.skill-item').querySelector('.skill-percentage');
            animateCounter(percentageElement, 0, targetPercentage, 1500);
            
            // Animate the bar
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }, 100);
        }
    });
}

// Animated counter function
function animateCounter(element, start, end, duration) {
    if (!element) return;
    
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%') || true; // Always treat as percentage
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOutCubic);
        
        element.textContent = current + '%';
        element.style.opacity = '1'; // Ensure visibility
        element.style.display = 'block'; // Ensure display
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is set correctly
            element.textContent = end + '%';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Ensure all percentage values are visible
function ensurePercentagesVisible() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const percentageElement = bar.closest('.skill-item').querySelector('.skill-percentage');
        if (percentageElement) {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            const targetPercentage = parseInt(targetWidth);
            
            // Ensure the percentage is displayed
            percentageElement.textContent = targetPercentage + '%';
            percentageElement.style.opacity = '1';
            percentageElement.style.display = 'block';
            percentageElement.style.visibility = 'visible';
        }
    });
}

// Initialize skill bars with data-width attribute
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        
        // Ensure percentage element is visible
        const percentageElement = bar.closest('.skill-item').querySelector('.skill-percentage');
        if (percentageElement) {
            percentageElement.style.opacity = '1';
            percentageElement.style.display = 'block';
            percentageElement.style.visibility = 'visible';
        }
    });
}

// Projects filter functionality (if exists)
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('header');
                const banner = document.getElementById('youtube-banner');
                const headerHeight = header ? header.offsetHeight : 0;
                const bannerHeight = (banner && banner.style.display !== 'none') ? banner.offsetHeight : 0;
                const totalOffset = headerHeight + bannerHeight + 20; // 20px extra spacing
                const targetPosition = targetSection.offsetTop - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const header = document.querySelector('header');
        const banner = document.getElementById('youtube-banner');
        const headerHeight = header ? header.offsetHeight : 0;
        const bannerHeight = (banner && banner.style.display !== 'none') ? banner.offsetHeight : 0;
        const totalOffset = headerHeight + bannerHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - totalOffset;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...'); // Debug log
    
    // Initialize all components
    initYoutubeBanner();
    initSkillBars();
    initSkillsFilter();
    initProjectsFilter();
    initSmoothScrolling();
    initActiveNav();
    initBackToTop();
    initMobileMenu();
    
    // Trigger initial skill animation after a delay
    setTimeout(() => {
        animateSkills();
    }, 500);
    
    console.log('All scripts initialized'); // Debug log
});

// Trigger skill animation on scroll
window.addEventListener('scroll', animateSkills);

// Contact form handling (if exists)
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (form && formMessage) {
        form.addEventListener('submit', function(e) {
            // You can add form validation here
            formMessage.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        });
    }
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const texts = [
        'Data Science',
        'Machine Learning',
        'Artificial Intelligence',
        'Big Data Analytics',
        'Computer Vision',
        'Natural Language Processing'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-header, .about-content, .timeline-item, .skills-category, .project-item, .certificate-item, .volunteer-item, .contact-item'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    const handleParallax = utils.throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16);

    window.addEventListener('scroll', handleParallax);
}

// ===== LOADING ANIMATION =====
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// ===== PFA POPUP FUNCTIONALITY =====
function initPFAPopup() {
    const popup = document.getElementById('pfa-popup');
    const closeBtn = document.querySelector('.pfa-popup-close');
    
    if (!popup) return;

    // Show popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('show');
    }, 3000);

    // Close popup functionality
    function closePopup() {
        popup.classList.remove('show');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Close on background click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });
}

// ===== ENHANCED HEADER SCROLL EFFECT =====
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    const handleScroll = utils.throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }, 16);

    window.addEventListener('scroll', handleScroll);
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    if (!scrollProgress) return;

    const updateScrollProgress = utils.throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    }, 16);

    window.addEventListener('scroll', updateScrollProgress);
}

// ===== ENHANCED CONTACT FORM =====
function initEnhancedContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (!form) return;

    // Add floating label effect
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            formMessage.innerHTML = '<p style="color: var(--success-color);">Message sent successfully! I\'ll get back to you soon.</p>';
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        }, 2000);
    });
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
    
    // Initialize all components
    initYoutubeBanner();
    initSkillBars();
    initSkillsFilter();
    initProjectsFilter();
    initSmoothScrolling();
    initActiveNav();
    initBackToTop();
    initMobileMenu();
    initContactForm();
    initTypingEffect();
    initScrollAnimations();
    initParallaxEffect();
    initLoadingAnimation();
    initPFAPopup();
    initHeaderScrollEffect();
    initEnhancedContactForm();
    initScrollProgress();
    
    // Trigger initial skill animation after a delay
    setTimeout(() => {
        animateSkills();
    }, 1000);
    
    // Ensure all percentages are visible after a longer delay
    setTimeout(() => {
        ensurePercentagesVisible();
    }, 2000);
    
    console.log('All scripts initialized');
});
