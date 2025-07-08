
// Hide loader after page load
window.addEventListener('load', function () {
    document.querySelector('.loader').classList.add('hidden');
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;

    // Create indicators
    slides.forEach((slide, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    // Show initial slide
    showSlide(currentSlide);

    // Navigation functions
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.carousel-indicator').forEach(ind => ind.classList.remove('active'));

        slides[index].classList.add('active');
        document.querySelectorAll('.carousel-indicator')[index].classList.add('active');
        currentSlide = index;
    }

    function goToSlide(index) {
        showSlide(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);

    // Pause on hover
    const carousel = document.querySelector('.benefits-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });
});

// Simple eligibility checker
function checkEligibility() {
    const type = document.querySelector('.form-control[placeholder="Insurance Type"]').value;
    const age = parseFloat(document.querySelector('.form-control[placeholder="Enter your age"]').value) || 0;
    const income = parseFloat(document.querySelector('.form-control[placeholder="Enter your income"]').value) || 0;
    let eligible = "Health Insurance, Accident Insurance";
    if (age >= 60) eligible += ", Senior Citizen Insurance";
    if (income < 300000) eligible += ", Farmer Insurance";
    if (age < 18) eligible = "Child Education Insurance";
    document.getElementById('eligiblePrograms').textContent = eligible;
    document.getElementById('eligibilityResult').style.display = 'block';
}

// Toggle FAQ answer
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    question.classList.toggle('active');
    answer.classList.toggle('show');
}