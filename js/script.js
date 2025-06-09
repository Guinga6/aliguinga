// Create this as script.js in the js folder
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Data science", "Big Data", "AI"];
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 1500);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }
    
    if(typedTextSpan) {
        setTimeout(type, 1000);
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("form-message");

    // PFA Internship Pop-up
    const pfaPopup = document.getElementById("pfa-popup");
    const pfaPopupClose = document.querySelector(".pfa-popup-close");
    
    // Show popup on page load
    setTimeout(() => {
        pfaPopup.classList.remove("hidden");
    }, 1000);
    
    // Close popup when clicking the close button
    pfaPopupClose.addEventListener("click", function() {
        pfaPopup.classList.add("hidden");
    });
    
    // Close popup when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === pfaPopup) {
            pfaPopup.classList.add("hidden");
        }
    });
    
    // Close popup when clicking the contact button
    const pfaContactBtn = document.querySelector(".pfa-popup-text .btn");
    pfaContactBtn.addEventListener("click", function() {
        pfaPopup.classList.add("hidden");
    });
});


    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Improved mobile navigation
    const mobileNav = document.querySelector('nav ul');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile nav when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
    
    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

