// Portfolio JavaScript Functions

// YouTube Banner functionality
function closeBanner() {
    const banner = document.getElementById('youtube-banner');
    if (banner) {
        banner.style.transform = 'translateY(-100%)';
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

// Auto-hide banner after 10 seconds
function initYoutubeBanner() {
    setTimeout(() => {
        const banner = document.getElementById('youtube-banner');
        if (banner && banner.style.display !== 'none') {
            closeBanner();
        }
    }, 10000);
}

// Skills Filter Functionality
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
            console.log('Filter clicked:', filter); // Debug log

            // Filter categories
            skillCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                console.log('Category type:', categoryType); // Debug log
                
                if (filter === 'all') {
                    showCategory(category);
                } else if (categoryType === filter) {
                    showCategory(category);
                } else {
                    hideCategory(category);
                }
            });

            // Re-trigger skill animations for visible categories
            setTimeout(animateVisibleSkills, 200);
        });
    });
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
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
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
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }, 100);
        }
    });
}

// Initialize skill bars with data-width attribute
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0%';
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
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
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
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
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

// Call contact form init after DOM load
document.addEventListener('DOMContentLoaded', initContactForm);
