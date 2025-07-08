
// Simple eligibility calculator
function calculateEligibility() {
    const income = parseFloat(document.querySelector('.form-control[placeholder="Enter your income"]').value) || 0;
    const loanAmount = parseFloat(document.querySelector('.form-control[placeholder="Enter loan amount"]').value) || 0;
    // Simple logic: eligible if income >= 30% of loan amount (for demo)
    const eligibleAmount = income * 3; // Example: up to 3x monthly income
    const result = Math.min(eligibleAmount, loanAmount > 0 ? loanAmount : eligibleAmount);
    document.getElementById('eligibleAmount').textContent = '₹' + result.toLocaleString('en-IN');
    document.getElementById('eligibilityResult').style.display = 'block';
}

// Toggle FAQ answer
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    question.classList.toggle('active');
    answer.classList.toggle('show');
}

// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let currentIndex = 0;
    const slideCount = slides.length;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Next slide
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    });

    // Previous slide
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Auto-rotate (optional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }, 5000);
});
