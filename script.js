/* =====================================================
   NAVIGATION INTERACTIVITY
   ===================================================== */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

/* =====================================================
   RESERVATION FORM HANDLING
   ===================================================== */

const reservationForm = document.querySelector('#reservation-form');

if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: reservationForm.querySelector('input[name="name"]').value,
      email: reservationForm.querySelector('input[name="email"]').value,
      phone: reservationForm.querySelector('input[name="phone"]').value,
      date: reservationForm.querySelector('input[name="date"]').value,
      time: reservationForm.querySelector('input[name="time"]').value,
      guests: reservationForm.querySelector('input[name="guests"]').value,
      message: reservationForm.querySelector('textarea[name="message"]').value,
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      alert('❌ Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Log to console (replace with API call)
    console.log('Réservation:', formData);

    // Show success message
    alert(`✅ Merci ${formData.name}!\n\nVotre réservation pour ${formData.guests} personne(s) a bien été reçue.\nNous vous confirmerons par email à: ${formData.email}`);

    // Reset form
    reservationForm.reset();

    // TODO: Replace with actual API call
    // fetch('/api/reservations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   alert(`✅ Réservation confirmée! ID: ${data.id}`);
    //   reservationForm.reset();
    // })
    // .catch(err => {
    //   console.error('Erreur:', err);
    //   alert('❌ Erreur lors de la réservation. Veuillez réessayer.');
    // });
  });
}

/* =====================================================
   LAZY LOADING FOR IMAGES
   ===================================================== */

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* =====================================================
   SMOOTH SCROLL BEHAVIOR
   ===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.news-card, .menu-item, .contact-item').forEach(el => {
  observer.observe(el);
});

/* =====================================================
   TRACKING & ANALYTICS
   ===================================================== */

// Track page view
console.log('📊 Page viewed:', window.location.pathname);

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnText = btn.textContent;
    console.log('🔘 Button clicked:', btnText);
    
    // Track with Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'button_click', {
        button_text: btnText
      });
    }
  });
});

// Track form interactions
if (reservationForm) {
  reservationForm.addEventListener('focus', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      console.log('📝 Form field focused:', e.target.name);
    }
  }, true);
}

/* =====================================================
   ONLINE/OFFLINE DETECTION
   ===================================================== */

window.addEventListener('online', () => {
  console.log('✅ You are online');
  document.body.style.borderTop = '4px solid green';
  setTimeout(() => {
    document.body.style.borderTop = '';
  }, 2000);
});

window.addEventListener('offline', () => {
  console.log('❌ You are offline');
  document.body.style.borderTop = '4px solid red';
  alert('⚠️ Vous êtes hors ligne. Certaines fonctionnalités peuvent ne pas fonctionner.');
});

/* =====================================================
   DARK MODE TOGGLE (Optional)
   ===================================================== */

function initDarkMode() {
  const darkModeToggle = localStorage.getItem('darkMode');
  
  if (darkModeToggle === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  const htmlElement = document.documentElement;
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (isDarkMode && !darkModeToggle) {
    document.body.classList.add('dark-mode');
  }
}

// Uncomment to enable dark mode detection
// initDarkMode();

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

// Get query parameter from URL
function getQueryParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

// Format date to readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone number
function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
}

/* =====================================================
   LOCAL STORAGE
   ===================================================== */

// Save reservation draft
function saveReservationDraft() {
  if (reservationForm) {
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData);
    localStorage.setItem('reservationDraft', JSON.stringify(data));
    console.log('💾 Draft saved');
  }
}

// Load reservation draft
function loadReservationDraft() {
  const draft = localStorage.getItem('reservationDraft');
  if (draft && reservationForm) {
    const data = JSON.parse(draft);
    Object.keys(data).forEach(key => {
      const field = reservationForm.querySelector(`[name="${key}"]`);
      if (field) field.value = data[key];
    });
    console.log('📂 Draft loaded');
  }
}

// Auto-save form every 30 seconds
if (reservationForm) {
  setInterval(saveReservationDraft, 30000);
  loadReservationDraft();
}

/* =====================================================
   INITIALIZATION
   ===================================================== */

console.log('✅ JavaScript loaded successfully');
console.log('🎯 Restaurant website is ready!');

// Expose utilities globally for console access
window.utils = {
  getQueryParam,
  formatDate,
  isValidEmail,
  isValidPhone,
  saveReservationDraft,
  loadReservationDraft
};
