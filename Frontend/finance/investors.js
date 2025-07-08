// Hide loader after page load
window.addEventListener('load', function () {
    document.querySelector('.loader').classList.add('hidden');
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.growth-carousel .carousel-slide');
    const prevBtn = document.querySelector('.growth-carousel .carousel-prev');
    const nextBtn = document.querySelector('.growth-carousel .carousel-next');
    const indicatorsContainer = document.querySelector('.growth-carousel .carousel-indicators');
    let currentSlide = 0;
    let interval;

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
        document.querySelectorAll('.growth-carousel .carousel-indicator').forEach(ind => ind.classList.remove('active'));

        slides[index].classList.add('active');
        document.querySelectorAll('.growth-carousel .carousel-indicator')[index].classList.add('active');
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
    interval = setInterval(nextSlide, 5000);

    // Pause on hover
    const carousel = document.querySelector('.growth-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });
});

// Toggle FAQ answer
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    question.classList.toggle('active');
    answer.classList.toggle('show');
}