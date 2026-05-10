// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Payment Modal Logic
const reservationForm = document.getElementById('reservation-form');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.getElementById('close-modal');
const btnWave = document.getElementById('btn-wave');
const btnOrange = document.getElementById('btn-orange');
const paymentInstructions = document.getElementById('payment-instructions');
const instructionTitle = document.getElementById('instruction-title');

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent actual form submission
  
  // Show payment modal
  paymentModal.classList.add('active');
  paymentInstructions.style.display = 'none'; // reset state
});

closeModal.addEventListener('click', () => {
  paymentModal.classList.remove('active');
});

// Close modal if clicking outside
window.addEventListener('click', (e) => {
  if (e.target === paymentModal) {
    paymentModal.classList.remove('active');
  }
});

btnWave.addEventListener('click', () => {
  instructionTitle.innerHTML = "Paiement via Wave 🌊";
  instructionTitle.style.color = "#1c88ff";
  paymentInstructions.style.display = 'block';
});

btnOrange.addEventListener('click', () => {
  instructionTitle.innerHTML = "Paiement via Orange Money 🟠";
  instructionTitle.style.color = "#ff6600";
  paymentInstructions.style.display = 'block';
});
