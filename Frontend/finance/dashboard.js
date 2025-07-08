document.addEventListener('DOMContentLoaded', function() {
    // Section switching functionality
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Skip logout link
            if (this.textContent.trim().includes('Logout')) {
                alert('Logout functionality would be implemented here');
                return;
            }

            const targetSection = this.getAttribute('data-section');
            
            if (targetSection) {
                // Remove active class from all menu items
                menuItems.forEach(mi => mi.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show target section
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Form submission handling (prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted successfully! (Demo only)');
        });
    });

    // Button click handling
    const buttons = document.querySelectorAll('.dashboard-link, .btn');
    buttons.forEach(button => {
        if (button.type !== 'submit' && !button.closest('form')) {
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                    e.preventDefault();
                    alert('Action: ' + (this.textContent || 'Button') + ' (Demo only)');
                }
            });
        }
    });
});