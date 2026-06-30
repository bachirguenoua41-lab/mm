/* ============================================
   💙 For Maram — Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingPetals();
  initSparkles();
  initScrollAnimations();
  initTypewriter();
});

/* ============================================
   FLOATING CARNATION PETALS
   ============================================ */
function initFloatingPetals() {
  const container = document.querySelector('.petals-container');
  if (!container) return;

  const shapes = ['', 'shape-2', 'shape-3'];

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Random shape variant
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape) petal.classList.add(shape);

    // Random size
    const size = Math.random() * 14 + 8;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    // Random position
    petal.style.left = Math.random() * 100 + '%';

    // Random drift
    const driftX = (Math.random() - 0.5) * 200;
    petal.style.setProperty('--drift-x', driftX + 'px');

    // Random spin
    const spin = (Math.random() - 0.5) * 720;
    petal.style.setProperty('--spin', spin + 'deg');

    // Random animation duration
    const duration = Math.random() * 8 + 8;
    petal.style.animationDuration = duration + 's';

    // Random delay
    const delay = Math.random() * 2;
    petal.style.animationDelay = delay + 's';

    container.appendChild(petal);

    // Remove petal after animation completes
    setTimeout(() => {
      if (petal.parentNode) {
        petal.parentNode.removeChild(petal);
      }
    }, (duration + delay) * 1000);
  }

  // Create initial batch (fewer for performance)
  for (let i = 0; i < 3; i++) {
    setTimeout(() => createPetal(), i * 800);
  }

  // Continuously create petals (slower for performance)
  setInterval(createPetal, 4000);
}

/* ============================================
   SPARKLE STARS
   ============================================ */
function initSparkles() {
  const wrapper = document.querySelector('.page-wrapper');
  if (!wrapper) return;

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    const size = Math.random() * 4 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    sparkle.style.animationDuration = (Math.random() * 4 + 2) + 's';
    sparkle.style.animationDelay = (Math.random() * 5) + 's';

    wrapper.appendChild(sparkle);
  }

  for (let i = 0; i < 12; i++) {
    createSparkle();
  }
}

/* ============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (!entry.target.classList.contains('message-card')) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll(
    '.message-card, .love-list-card, .todo-card, .carnation-meaning, .music-player-wrapper'
  );
  targets.forEach(target => observer.observe(target));
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriter() {
  const messageEl = document.querySelector('.message-text');
  const signatureEl = document.querySelector('.message-signature');
  const cardEl = document.querySelector('.message-card');

  if (!messageEl || !cardEl) return;

  const fullMessage = messageEl.getAttribute('data-message');
  messageEl.innerHTML = '<span class="cursor"></span>';

  let hasStarted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        typeMessage(messageEl, signatureEl, fullMessage);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(cardEl);
}

function typeMessage(el, signatureEl, message) {
  let index = 0;
  const speed = 40;

  function type() {
    if (index < message.length) {
      const current = message.substring(0, index + 1);
      el.innerHTML = current + '<span class="cursor"></span>';
      index++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => {
        el.innerHTML = message;
        if (signatureEl) {
          signatureEl.classList.add('visible');
        }
      }, 1500);
    }
  }

  setTimeout(type, 600);
}
