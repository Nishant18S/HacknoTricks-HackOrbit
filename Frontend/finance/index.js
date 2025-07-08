// Loading Animation
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('pageContent');

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 4;
let carouselInterval;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-indicator');

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetAutoplay();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoplay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoplay();
}

function startAutoplay() {
    carouselInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
    clearInterval(carouselInterval);
    startAutoplay();
}

// Start autoplay when page loads
document.addEventListener('DOMContentLoaded', startAutoplay);

// Pause autoplay on hover
const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carouselWrapper.addEventListener('mouseleave', startAutoplay);


// Partners Section - Infinite Scrolling
function setupPartners() {
    const partners = [
        {
            name: "Reliance Industries",
            type: "Corporate Partner",
            logo: "https://rilstaticasset.akamaized.net/sites/default/files/2023-02/L.1.jpg"
        },
        {
            name: "Tata Group",
            type: "Corporate Partner",
            logo: "https://www.purppledesigns.com/wp-content/uploads/2023/11/download-2.png"
        },
        {
            name: "Mahindra",
            type: "Corporate Partner",
            logo: "https://i.pinimg.com/736x/4e/3f/9f/4e3f9fa38e241a7b15ea727240cb953d.jpg"
        },
        {
            name: "Infosys",
            type: "Technology Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png"
        },
        {
            name: "HDFC Bank",
            type: "Banking Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png"
        },
        {
            name: "DD News",
            type: "Media Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Dd-news_logo.png?20231110192219"
        },
        {
            name: "Times Now",
            type: "Media Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Times_Now_Navbharat.svg/640px-Times_Now_Navbharat.svg.png"
        },
        {
            name: "Aaj Tak",
            type: "Media Partner",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Aaj_tak_logo.png/640px-Aaj_tak_logo.png"
        },
        {
            name: "The Times of India",
            type: "Print Media Partner",
            logo: "https://seeklogo.com/images/T/the-times-of-india-logo-A1727061AD-seeklogo.com.png"
        },
        {
            name: "The Hindu",
            type: "Print Media Partner",
            logo: "https://seeklogo.com/images/T/the-hindu-newspaper-logo-8A5DA83A36-seeklogo.com.png"
        },
    ];

    const track = document.getElementById('partnersTrack');

    // Duplicate partners to create infinite loop effect
    const duplicatedPartners = [...partners, ...partners, ...partners];

    duplicatedPartners.forEach(partner => {
        const card = document.createElement('div');
        card.className = 'partner-card';
        card.innerHTML = `
            <img src="${partner.logo}" alt="${partner.name}" class="partner-logo">
            <div class="partner-name">${partner.name}</div>
            <div class="partner-type">${partner.type}</div>
        `;
        track.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupPartners);



// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Smooth scrolling for navigation links
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

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 64, 175, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#1e40af';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate statistics on scroll
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'countUp 1s ease-out';
            }
        });
    });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Add CSS animation for stats
const style = document.createElement('style');
style.textContent = `
            @keyframes countUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
document.head.appendChild(style);

// Initialize animations
document.addEventListener('DOMContentLoaded', animateStats);

// Toggle FAQ answer
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    question.classList.toggle('active');
    answer.classList.toggle('show');
}



// Ensure chatbot exists on all pages
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot elements if they don't exist
    if (!document.getElementById('chatbotContainer')) {
        const chatbotHTML = `
            <div class="chatbot-toggle" id="chatbotToggle">
                <div class="chatbot-icon">💬</div>
                <div class="chatbot-notification hidden" id="chatbotNotification">1</div>
            </div>
            <div class="chatbot-container" id="chatbotContainer">
                <!-- Your existing chatbot HTML structure -->
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    // Initialize chatbot functionality
    initializeChatbot();
});

function initializeChatbot() {
    // Your existing chatbot initialization code
    const toggle = document.getElementById('chatbotToggle');
    const container = document.getElementById('chatbotContainer');
    
    toggle.addEventListener('click', function() {
        container.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Rest of your chatbot functionality...
}