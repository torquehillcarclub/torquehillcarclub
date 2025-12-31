// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 5, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .event-card, .gallery-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your interest in TORQUE HILL! We will contact you soon.');
        contactForm.reset();
    });
}

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            const hasPlus = statNumber.textContent.includes('+');
            statNumber.textContent = '0';
            animateCounter(statNumber, targetValue);
            if (hasPlus) statNumber.textContent += '+';
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effect to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateZ(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateZ(0deg)';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const copyrightText = document.querySelector('.footer-copyright p');
if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} TORQUE HILL. All rights reserved.`;
}

// Preload animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Language Toggle Functionality
let currentLang = 'en';
const langToggle = document.getElementById('langToggle');

function translatePage(lang) {
    const elements = document.querySelectorAll('[data-en][data-zh]');
    
    elements.forEach(element => {
        if (lang === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update language toggle button
    const langTexts = langToggle.querySelectorAll('.lang-text');
    langTexts.forEach(text => {
        text.classList.remove('active');
        if ((lang === 'en' && text.textContent === 'EN') || 
            (lang === 'zh' && text.textContent === '中文')) {
            text.classList.add('active');
        }
    });
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        translatePage(currentLang);
    });
}

// Video Player Controls
const showcaseVideo = document.getElementById('showcaseVideo');
const videoOverlay = document.getElementById('videoOverlay');
const playButton = document.getElementById('playButton');
const videoControls = document.getElementById('videoControls');
const pauseBtn = document.getElementById('pauseBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const progressBar = document.getElementById('progressBar');
const progressFilled = document.getElementById('progressFilled');

if (showcaseVideo && videoOverlay && playButton) {
    // Play video on click
    playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        showcaseVideo.play();
        videoOverlay.style.display = 'none';
        videoControls.classList.add('active');
    });
    
    videoOverlay.addEventListener('click', () => {
        showcaseVideo.play();
        videoOverlay.style.display = 'none';
        videoControls.classList.add('active');
    });
    
    // Pause/Play toggle
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (showcaseVideo.paused) {
                showcaseVideo.play();
                pauseBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                        <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                    </svg>
                `;
            } else {
                showcaseVideo.pause();
                pauseBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <polygon points="8,5 19,12 8,19" fill="currentColor"/>
                    </svg>
                `;
            }
        });
    }
    
    // Fullscreen toggle
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                showcaseVideo.requestFullscreen().catch(err => {
                    console.log('Fullscreen error:', err);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
    
    // Update progress bar
    showcaseVideo.addEventListener('timeupdate', () => {
        const progress = (showcaseVideo.currentTime / showcaseVideo.duration) * 100;
        progressFilled.style.width = progress + '%';
    });
    
    // Seek video
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            showcaseVideo.currentTime = pos * showcaseVideo.duration;
        });
    }
    
    // Show overlay when video ends
    showcaseVideo.addEventListener('ended', () => {
        videoOverlay.style.display = 'flex';
        videoControls.classList.remove('active');
    });
}
