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
    const textArray = ["Web Developer", "Designer", "Programmer", "Freelancer"];
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
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    formMessage.innerHTML = '<div class="success-message">Message sent successfully!</div>';
                    contactForm.reset();
                } else {
                    formMessage.innerHTML = '<div class="error-message">Something went wrong. Please try again.</div>';
                }
            })
            .catch(error => {
                formMessage.innerHTML = '<div class="error-message">Something went wrong. Please try again.</div>';
            });
        });
    }
});