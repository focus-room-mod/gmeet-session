// Focus Room - Study Together Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add click tracking and user feedback
    setupButtonInteractions();
    
    // Add accessibility enhancements
    setupAccessibilityFeatures();
    
    // Add smooth scrolling for better UX
    setupSmoothScrolling();
    
    // Add keyboard navigation enhancements
    setupKeyboardNavigation();
}

function setupButtonInteractions() {
    // Track button clicks and provide user feedback
    const joinButton = document.querySelector('.join-button');
    const formButton = document.querySelector('.form-button');
    const tutorialButton = document.querySelector('.tutorial-button');
    
    if (joinButton) {
        joinButton.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Optional: Add analytics tracking here
            console.log('Join Study Session button clicked');
        });
    }
    
    if (formButton) {
        formButton.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Fill Joining Form button clicked');
        });
    }
    
    if (tutorialButton) {
        tutorialButton.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Watch Tutorial button clicked');
        });
    }
}

function setupAccessibilityFeatures() {
    // Enhanced focus management
    const focusableElements = document.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    // Add skip link functionality (if needed in future)
    document.addEventListener('keydown', function(e) {
        // Escape key to blur current element
        if (e.key === 'Escape') {
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
        }
    });
    
    // Announce page load to screen readers
    const pageTitle = document.querySelector('.main-title');
    if (pageTitle) {
        pageTitle.setAttribute('aria-live', 'polite');
    }
}

function setupSmoothScrolling() {
    // Smooth scroll for any internal links (future-proofing)
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
}

function setupKeyboardNavigation() {
    // Enhanced keyboard navigation for cards and interactive elements
    const cards = document.querySelectorAll('.card, .feature-item');
    
    cards.forEach(card => {
        // Make cards focusable for keyboard users
        if (!card.querySelector('a, button')) {
            card.setAttribute('tabindex', '0');
        }
        
        // Add visual feedback on focus
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Utility function to copy email to clipboard
function copyEmailToClipboard() {
    const email = 'focusroommoderator@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            fallbackCopyTextToClipboard(email);
        });
    } else {
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Email copied to clipboard!');
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: var(--color-btn-primary-text);
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        font-weight: 500;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add click-to-copy functionality to email
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('.footer-email');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            copyEmailToClipboard();
            
            // Also open default email client
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        });
        
        // Add tooltip-like behavior
        emailLink.setAttribute('title', 'Click to copy email address');
    }
});

// Performance optimization: Lazy load any future content
function observeElements() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe feature items for potential animation
        document.querySelectorAll('.feature-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize observers
document.addEventListener('DOMContentLoaded', observeElements);

// Error handling for external links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[target="_blank"]')) {
        // Add error handling for external links
        const link = e.target;
        const href = link.href;
        
        // Log external link clicks for debugging
        console.log('External link clicked:', href);
        
        // Optional: Add fallback behavior if link fails
        link.addEventListener('error', function() {
            console.error('Failed to open external link:', href);
        });
    }
});

// Export functions for potential testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        copyEmailToClipboard,
        showNotification
    };
}