// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // For now, just log to console. In production, send to a server or service like Formspree
        console.log('Form submitted:', { name, email, message });

        alert('Thank you for your message! I\'ll get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Particle Background Animation
const canvas = document.getElementById('background-canvas'); // If you ever want to remove the background canvas, comment out the class name in each html page in the body section that holds it
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`; // Cyan to blue hues
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    initParticles();
    animate();
}


// Compound Interest Calculator Functionality
function initCompoundInterestCalculator() {
    // console.log('Initializing compound interest calculator...'); // If the calculator is giving you issues, uncomment this for DEBUGGING

    const form = document.getElementById('compound-interest-form');

    if (!form) {
        console.error("compound interest form not found!");
        return;
    }

    const resetBtn = form.querySelector('#reset-btn-compound');
    const resultsDiv = document.getElementById('results');
    const calculateBtn = form.querySelector('button[type="submit"]');

    // console.log('Form found:', true); // If the calculator is giving you issues, uncomment this for DEBUGGING

    if (!form) return; // Only run on pages with the calculator

    let originalBtnText = calculateBtn.textContent;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // console.log('Form submitted!'); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Get input values
        const principal = parseFloat(document.getElementById('principal').value);
        const annualRate = parseFloat(document.getElementById('interest-rate').value) / 100;
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
        const years = parseInt(document.getElementById('years').value);

        // console.log('Input values:', { principal, annualRate, monthlyContribution, years }); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Validate inputs
        if (isNaN(principal) || isNaN(annualRate) || isNaN(monthlyContribution) || isNaN(years)) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        if (principal < 0 || annualRate < 0 || monthlyContribution < 0 || years < 1) {
            alert('Please enter valid positive values for all fields.');
            return;
        }

        // console.log('Validation passed, calculating...'); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Calculate compound interest
        const monthlyRate = annualRate / 12;
        const months = years * 12;

        // Future value of principal
        const principalFutureValue = principal * Math.pow(1 + monthlyRate, months);

        // Future value of monthly contributions (annuity formula)
        const contributionsFutureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        // Total amount
        const totalAmount = principalFutureValue + contributionsFutureValue;

        // Calculate total contributions and interest earned
        const totalContributions = principal + (monthlyContribution * months);
        const interestEarned = totalAmount - totalContributions;

        // Update button to show final amount
        calculateBtn.textContent = `Final Amount: $${totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        calculateBtn.style.backgroundColor = '#28a745'; // Green to indicate success

        // Display detailed results
        document.getElementById('final-amount').textContent = '$' + totalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('total-contributions').textContent = '$' + totalContributions.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('interest-earned').textContent = '$' + interestEarned.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

        // Display the formula used
        const formulaText = `Formula: $${principal.toFixed(2)} × (1 + ${monthlyRate.toFixed(4)})^${months} + $${monthlyContribution.toFixed(2)} × [((1 + ${monthlyRate.toFixed(4)})^${months} - 1) ÷ ${monthlyRate.toFixed(4)}]`;
        document.getElementById('calculation-formula').textContent = formulaText;

        // Show the formula section
        document.getElementById('formula-section').style.display = 'block';

        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.getElementById('final-amount').textContent = '--';
            document.getElementById('total-contributions').textContent = '--';
            document.getElementById('interest-earned').textContent = '--';
            document.getElementById('calculation-formula').textContent = '';
            document.getElementById('formula-section').style.display = 'none';
            calculateBtn.textContent = originalBtnText;
            calculateBtn.style.backgroundColor = '';
        });
    }
}

// Retirement Calculator Functionality
function initRetirementCalculator() {
    console.log('Initializing retirement calculator...'); // If the calculator is giving you issues, uncomment this for DEBUGGING

    const form = document.getElementById('retirement-form');

    if (!form) {
        console.error("retirement form not found!");
        return;
    }

    const resetBtn = form.querySelector('#reset-btn-retirement');
    const resultsDiv = document.getElementById('retirement-results');
    const calculateBtn = form.querySelector('button[type="submit"]');

    console.log('Form found:', true); // If the calculator is giving you issues, uncomment this for DEBUGGING

    if (!form) return; // Only run on pages with the calculator

    let originalBtnText = calculateBtn.textContent;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        console.log('Form submitted!'); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Get input values
        const age = parseFloat(document.getElementById('age').value);
        const retirementAge = parseFloat(document.getElementById('retirement-age').value);
        const currentAmount = parseFloat(document.getElementById('current-amount').value);
        const monthlyContributionR = parseFloat(document.getElementById('monthly-contribution-retirement').value);
        const annualRateR = parseFloat(document.getElementById('interest-rate-retirement').value) / 100;

        console.log('Input values:', { age, retirementAge, currentAmount, monthlyContributionR, annualRateR }); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Validate inputs
        if (isNaN(age) || isNaN(retirementAge) || isNaN(currentAmount) || isNaN(monthlyContributionR) || isNaN(annualRateR)) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        if (age < 0 || retirementAge < 0 || currentAmount < 0 || monthlyContributionR < 0 || annualRateR < 0 || retirementAge <= age) {
            alert('Please enter valid positive values for all fields.');
            return;
        }

        console.log('Validation passed, calculating...'); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Calculate compound interest
        const monthlyRateR = annualRateR / 12;
        const monthsR = (retirementAge - age) * 12;

        // Future value of principal
        const principalFutureValueRetirement = currentAmount * Math.pow(1 + monthlyRateR, monthsR);

        // Future value of monthly contributions (annuity formula)
        const contributionsFutureValueRetirement = monthlyContributionR * ((Math.pow(1 + monthlyRateR, monthsR) - 1) / monthlyRateR);

        // Total amount
        const totalAmountR = principalFutureValueRetirement + contributionsFutureValueRetirement;

        // Calculate total contributions and interest earned
        const totalContributionsR = currentAmount + (monthlyContributionR * monthsR);
        const interestEarnedR = totalAmountR - totalContributionsR;

        // Update button to show final amount
        calculateBtn.textContent = `Final Amount: $${totalAmountR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        calculateBtn.style.backgroundColor = '#28a745'; // Green to indicate success

        // Display detailed results
        document.getElementById('final-amount-retirement').textContent = '$' + totalAmountR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('total-contributions-retirement').textContent = '$' + totalContributionsR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('interest-earned-retirement').textContent = '$' + interestEarnedR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

        // Display the formula used
        const formulaText = `Formula: $${currentAmount.toFixed(2)} × (1 + ${monthlyRateR.toFixed(4)})^${monthsR} + $${monthlyContributionR.toFixed(2)} × [((1 + ${monthlyRateR.toFixed(4)})^${monthsR} - 1) ÷ ${monthlyRateR.toFixed(4)}]`;
        document.getElementById('calculation-formula-retirement').textContent = formulaText;

        // Show the formula section
        document.getElementById('formula-section-retirement').style.display = 'block';

        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.getElementById('final-amount-retirement').textContent = '--';
            document.getElementById('total-contributions-retirement').textContent = '--';
            document.getElementById('interest-earned-retirement').textContent = '--';
            document.getElementById('calculation-formula-retirement').textContent = '';
            document.getElementById('formula-section-retirement').style.display = 'none';
            calculateBtn.textContent = originalBtnText;
            calculateBtn.style.backgroundColor = ''; // Reset to original color
        });
    }
}

function initEmergencyFundCalculator() {
    console.log('Initializing emergency fund calculator...'); // If the calculator is giving you issues, uncomment this for DEBUGGING

    const form = document.getElementById('emergency-fund-form');

    if (!form) {
        console.error("emergency fund form not found!");
        return;
    }

    const resetBtn = form.querySelector('#reset-btn-emergency');
    const resultsDiv = document.getElementById('emergency-fund-results');
    const calculateBtn = form.querySelector('button[type="submit"]');

    console.log('Form found:', true); // If the calculator is giving you issues, uncomment this for DEBUGGING

    if (!form) return; // Only run on pages with the calculator

    let originalBtnText = calculateBtn.textContent;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        console.log('Form submitted!'); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Get input values
        const income = parseFloat(document.getElementById('income').value);
        const housing = parseFloat(document.getElementById('housing').value);
        const utilities = parseFloat(document.getElementById('utilities').value);
        const gasoline = parseFloat(document.getElementById('gasoline').value);
        const internet = parseFloat(document.getElementById('internet').value);
        const insurance = parseFloat(document.getElementById('insurance').value);
        const groceries = parseFloat(document.getElementById('groceries').value);
        const phone = parseFloat(document.getElementById('phone').value);
        const toiletries = parseFloat(document.getElementById('toiletries').value);
        const debtMin = parseFloat(document.getElementById('debt-minimum').value);
        const misc = parseFloat(document.getElementById('misc').value);

        console.log('Input values:', { income, housing, utilities, gasoline, internet, insurance,
                                    groceries, toiletries, debtMin, misc }); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Validate inputs
        if (isNaN(income) || isNaN(housing) || isNaN(utilities) || isNaN(gasoline) || isNaN(internet) || isNaN(insurance)
            || isNaN(groceries) || isNaN(toiletries) || isNaN(debtMin) || isNaN(misc) || isNaN(phone)) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        if (income < 0 || housing < 0 || utilities < 0 || gasoline < 0 || internet < 0 || insurance < 0
            || groceries < 0 || toiletries < 0 || debtMin < 0 || misc < 0 || phone < 0) {
            alert('Please enter valid positive values for all fields.');
            return;
        }

        console.log('Validation passed, calculating...'); // If the calculator is giving you issues, uncomment this for DEBUGGING

        // Calculations
        const expenses = housing + utilities + gasoline + internet + insurance + groceries + phone + toiletries + debtMin + misc;
        const remaining = income - expenses;
        const emergencyFundMin = expenses;
        const emergencyFundMedium1 = expenses * 3;
        const emergencyFundMedium2 = expenses * 6;
        const emergencyFundMax = expenses * 12;

        // Update button to show final amount
        calculateBtn.textContent = `Monthly Expenses: $${expenses.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        calculateBtn.style.backgroundColor = '#28a745'; // Green to indicate success

        // Display detailed results
        document.getElementById('remaining-amount').textContent = '$' + remaining.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('minimum-amount').textContent = '$' + emergencyFundMin.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('medium-amount').textContent = '$' + emergencyFundMedium1.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) +
                                                            ' - $' + emergencyFundMedium2.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('max-amount').textContent = '$' + emergencyFundMax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            document.getElementById('remaining-amount').textContent = '--';
            document.getElementById('minimum-amount').textContent = '--';
            document.getElementById('medium-amount').textContent = '--';
            document.getElementById('max-amount').textContent = '--';
            calculateBtn.textContent = originalBtnText;
            calculateBtn.style.backgroundColor = ''; // Reset to original color
        });
    }
}


// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCompoundInterestCalculator();
    initRetirementCalculator();
    initEmergencyFundCalculator();
});