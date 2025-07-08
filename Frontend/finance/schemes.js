// Hide loader after page load
window.addEventListener('load', function () {
    document.querySelector('.loader').classList.add('hidden');
});

// Simple eligibility checker
function checkEligibility() {
    const category = document.querySelector('.form-control[placeholder="Category"]').value;
    const income = parseFloat(document.querySelector('.form-control[placeholder="Enter your income"]').value) || 0;
    let eligibleSchemes = "Citizen Welfare, Health & Wellness";
    if (category === "Farmer Support") eligibleSchemes = "Farmer Support";
    if (category === "Business Development") eligibleSchemes = "Business Development";
    if (income > 100000) eligibleSchemes = "Business Development";
    document.getElementById('eligibleSchemes').textContent = eligibleSchemes;
    document.getElementById('eligibilityResult').style.display = 'block';
}

// Toggle FAQ answer
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    question.classList.toggle('active');
    answer.classList.toggle('show');
}