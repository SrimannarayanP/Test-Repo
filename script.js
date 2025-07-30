// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate metric cards when they come into view
            if (entry.target.classList.contains('metric-card')) {
                animateMetricCard(entry.target);
            }
            
            // Animate chart bars
            if (entry.target.classList.contains('chart-area')) {
                animateChartBars(entry.target);
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animatedElements = document.querySelectorAll('.problem-card, .feature-card, .testimonial, .metric-card, .chart-area');
animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Animate metric cards
function animateMetricCard(card) {
    const valueElement = card.querySelector('.metric-value');
    if (valueElement) {
        const finalValue = valueElement.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 30; // Animate over ~1 second
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            valueElement.textContent = isPercentage 
                ? Math.floor(currentValue) + '%' 
                : Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
        }, 33);
    }
}

// Animate chart bars
function animateChartBars(chartArea) {
    const bars = chartArea.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.1}s`;
        bar.classList.add('animate');
    });
}

// Button hover effects
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Hero stats animation on load
window.addEventListener('load', function() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    statsNumbers.forEach((stat, index) => {
        setTimeout(() => {
            animateStatNumber(stat);
        }, index * 200);
    });
});

function animateStatNumber(element) {
    const finalValue = element.textContent;
    const isPercentage = finalValue.includes('%');
    const hasPlus = finalValue.includes('+');
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    let currentValue = 0;
    const increment = numericValue / 40;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        if (hasPlus) displayValue += 'k+';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
    }, 25);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Interactive phone mockup
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneMockup.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(2deg) scale(1.05)';
    });
    
    phoneMockup.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
    });
}

// Interactive dashboard mockup
const dashboardMockup = document.querySelector('.dashboard-mockup');
if (dashboardMockup) {
    dashboardMockup.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    dashboardMockup.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0px) scale(1)';
    });
}

// Feature card interactions
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0px) scale(1)';
        this.style.boxShadow = '';
    });
});

// Problem card hover effects
const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.problem-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.problem-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Testimonial interactions
const testimonials = document.querySelectorAll('.testimonial');
testimonials.forEach(testimonial => {
    testimonial.addEventListener('mouseenter', function() {
        const avatar = this.querySelector('.author-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1.1)';
            avatar.style.boxShadow = '0 10px 25px rgba(243, 246, 100, 0.3)';
        }
    });
    
    testimonial.addEventListener('mouseleave', function() {
        const avatar = this.querySelector('.author-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1)';
            avatar.style.boxShadow = '';
        }
    });
});

// Add particle effect to hero section
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, var(--primary-yellow), var(--accent-orange));
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        z-index: 1;
    `;
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const endY = -10;
    const duration = 3000 + Math.random() * 2000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    hero.appendChild(particle);
    
    particle.animate([
        { transform: 'translateY(0px)', opacity: 0 },
        { transform: 'translateY(-50px)', opacity: 0.6 },
        { transform: `translateY(${endY - startY}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 300);

// Form interactions (if any forms are added later)
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Demo app interactions
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Create a ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .mobile-menu.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-links.active {
        display: flex !important;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        z-index: 999;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .particle {
        animation: float-up 3s linear infinite;
    }
    
    @keyframes float-up {
        0% {
            transform: translateY(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card:hover .feature-icon-large {
        transform: scale(1.1) rotate(5deg);
        transition: transform 0.3s ease;
    }
    
    .problem-icon {
        transition: transform 0.3s ease;
    }
    
    .author-avatar {
        transition: all 0.3s ease;
    }
    
    /* Loading animation for when page loads */
    .hero-title {
        animation: slideInUp 0.8s ease-out;
    }
    
    .hero-subtitle {
        animation: slideInUp 0.8s ease-out 0.2s both;
    }
    
    .hero-cta {
        animation: slideInUp 0.8s ease-out 0.4s both;
    }
    
    .hero-stats {
        animation: slideInUp 0.8s ease-out 0.6s both;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
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

// Parallax effect for floating shapes
const shapes = document.querySelectorAll('.shape');
const handleParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}, 10);

window.addEventListener('scroll', handleParallax);

// Add some Easter eggs for students
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        // Easter egg: Add rainbow effect to logo
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.background = 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)';
            logo.style.backgroundClip = 'text';
            logo.style.webkitBackgroundClip = 'text';
            logo.style.webkitTextFillColor = 'transparent';
            logo.style.animation = 'rainbow 2s linear infinite';
            
            // Add rainbow animation
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
            
            // Show a fun message
            const message = document.createElement('div');
            message.textContent = '🎉 You found the secret! Welcome to the events. family! 🎉';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--primary-yellow);
                color: var(--primary-black);
                padding: 1rem 2rem;
                border-radius: 20px;
                font-weight: bold;
                z-index: 10000;
                animation: bounce 0.5s ease-out;
            `;
            
            const bounceStyle = document.createElement('style');
            bounceStyle.textContent = `
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate(-50%, -50%) scale(1); }
                    40%, 43% { transform: translate(-50%, -50%) scale(1.1); }
                    70% { transform: translate(-50%, -50%) scale(1.05); }
                    90% { transform: translate(-50%, -50%) scale(1.02); }
                }
            `;
            document.head.appendChild(bounceStyle);
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }
        
        konamiCode = [];
    }
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 100);
    });
});

console.log('🎉 Welcome to events. - Built for students, by students!');
console.log('💡 Tip: Try the Konami Code for a surprise! (↑↑↓↓←→←→BA)');