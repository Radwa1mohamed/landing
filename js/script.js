/* -----------------------
   Typed.js (typing effect)
   ----------------------- */
document.addEventListener('DOMContentLoaded', function () {
  // phrases in Arabic
  const options = {
    strings: ['واقع ثلاثي الأبعاد', 'منتج تفاعلي', 'تجربة رقمية مبهرة'],
    typeSpeed: 60,
    backSpeed: 36,
    backDelay: 900,
    loop: true,
    smartBackspace: true,
    showCursor: false // we use our own cursor element
  };
  const typedEl = document.getElementById('typed');
  // initialize Typed.js
  if (typeof Typed !== 'undefined') {
    new Typed(typedEl, options);
  } else {
    // fallback: simple rotation if Typed.js not loaded
    let i = 0;
    const fallbackTexts = options.strings;
    setInterval(() => {
      typedEl.textContent = fallbackTexts[i % fallbackTexts.length];
      i++;
    }, 2000);
  }

  /* -----------------------
     ScrollReveal (scroll animations)
     ----------------------- */
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      distance: '28px',
      origin: 'bottom',
      opacity: 0,
      duration: 700,
      easing: 'cubic-bezier(.2,.9,.3,1)',
      reset: false,
      interval: 90
    });

    sr.reveal('#hero .type-wrap', { origin: 'right', distance: '14px', delay: 100 });
    sr.reveal('#hero .lead', { origin: 'right', distance: '14px', delay: 220 });
    sr.reveal('.cta-row', { origin: 'right', distance: '14px', delay: 320 });
    sr.reveal('[data-sr]', { scale: 0.98, interval: 140 });
    sr.reveal('#big-cta', { origin: 'bottom', distance: '20px', delay: 160 });
  }

  /* -----------------------
     Navbar behavior & back-to-top
     ----------------------- */
  const nav = document.querySelector('header.navbar');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    if (sc > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    if (sc > 350) backTop.style.display = 'block'; else backTop.style.display = 'none';
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------
     CTA micro-interaction (vanilla)
     ----------------------- */
  const ctas = document.querySelectorAll('.js-cta');
  ctas.forEach(btn => {
    // gentle pulse
    let pulse = true;
    let pulseInterval = setInterval(() => {
      if (!pulse) return;
      btn.animate([
        { transform: 'scale(1)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
        { transform: 'scale(1.03)', boxShadow: '0 18px 38px rgba(91,140,255,0.12)' },
        { transform: 'scale(1)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
      ], { duration: 1400, iterations: 1, easing: 'ease-in-out' });
    }, 1600);

    btn.addEventListener('mouseenter', () => { pulse = false; btn.style.transform = 'scale(1.05)'; });
    btn.addEventListener('mouseleave', () => { pulse = true; btn.style.transform = 'scale(1.03)'; });

    btn.addEventListener('click', () => {
      // small click feedback
      btn.animate([
        { transform: 'scale(1.05)' },
        { transform: 'scale(0.98)' },
        { transform: 'scale(1.02)' },
        { transform: 'scale(1)' }
      ], { duration: 240, easing: 'cubic-bezier(.2,.9,.3,1)' });
    });
  });

  /* -----------------------
     Small interactive parallax for mock-3d
     ----------------------- */
  const mock = document.getElementById('mock');
  const shape = document.getElementById('shape');

  if (mock && shape) {
    mock.addEventListener('mousemove', (e) => {
      const r = mock.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const rotY = dx * -20 + 20; // base rotation preserved
      const rotX = dy * 20 + 10;
      shape.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });
    mock.addEventListener('mouseleave', () => {
      shape.style.transform = `rotateY(20deg) rotateX(10deg)`;
    });
  }

  /* -----------------------
     Accessibility: reduce motion
     ----------------------- */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.matches) {
    // disable animations that are not essential
    const animEls = document.querySelectorAll('.animated-bg, .feature-card, .btn-primary');
    animEls.forEach(el => el.style.animation = 'none');
  }
});
