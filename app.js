// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Open mail app when clicking on email icon
document.querySelector('.contact-item:nth-child(2)').addEventListener('click', function() {
    const email = 'saisukanta8@gmail.com';
    window.location.href = `mailto:${email}`;
});

// Make email text clickable too
document.querySelector('.contact-item:nth-child(2) .contact-text p').addEventListener('click', function() {
    const email = 'saisukanta8@gmail.com';
    window.location.href = `mailto:${email}`;
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for timeline items
            if (entry.target.classList.contains('timeline-item')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.about-text, .about-image, .project-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Add loading animation for hero elements
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-btns');
    heroElements.forEach((el, index) => {
        el.style.animation = `fadeInUp 1s ease ${index * 0.2}s both`;
    });
});

// Skills Animation Functionality
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 100);
    });
    
    // Animate progress bars after a delay
    setTimeout(() => {
        skillProgresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width + '%';
        });
    }, 500);
}

// Intersection Observer for Skills Section
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe skills section
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Update the existing observer to include skills
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.about-text, .about-image, .project-card, .timeline-item, .resume-card, .resume-preview, .skill-category, .skills-tags').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Resume Download Functionality for Contact Section
document.getElementById('downloadResumeMini').addEventListener('click', function(e) {
    // e.preventDefault();
    // downloadResume();
    console.log('Resume download initiated');
});

// Resume Download Functionality for About Section
document.getElementById('downloadResumeAbout').addEventListener('click', function(e) {
    e.preventDefault();
    downloadResume();
});

// Unified Resume Download Function
function downloadResume() {
    // Create a simple PDF download simulation
    const resumeUrl = 'Resume.pdf'; // Replace with actual resume PDF URL
    
    if (resumeUrl === 'Resume.pdf') {
        // If no resume is uploaded, show a message
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            ">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: white; font-size: 1.5rem;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3 style="color: var(--primary); margin-bottom: 15px;">Resume Download</h3>
                <p style="margin-bottom: 20px; color: var(--gray);">Thank you for your interest! Please contact me directly to get my resume, or check the contact information below.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        });
    } else {
        // If resume URL exists, trigger download
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Sukanta_Sai_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


// Fix email click functionality
document.querySelector('.clickable-email').addEventListener('click', function() {
    const email = 'saisukanta8@gmail.com';
    window.location.href = `mailto:${email}`;
});




// Contact form submission with Formspree
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    // Send to Formspree
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success message
            showMessage('Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Error message
        showMessage('Sorry, there was an error sending your message. Please try again or email me directly.', 'error');
    })
    .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// Show message function
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}