/* ============================================================
   main.js – Cyberpunk Portfolio Interactive Layer
   BADDI BHANU PRASAD
   ============================================================ */

'use strict';

// ───────────────────────────────────────────────
// 1. LOADER
// ───────────────────────────────────────────────
(function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loader-bar');
  const status  = document.getElementById('loader-status');
  const textEl  = document.getElementById('loader-text');
  const messages = [
    'BOOT SEQUENCE INITIATED',
    'LOADING ARSENAL',
    'BYPASSING FIREWALL',
    'ACCESSING MAINFRAME',
    'DECRYPTING PAYLOAD',
    'SYSTEM ONLINE',
  ];

  let progress  = 0;
  let msgIdx    = 0;
  const name    = 'BBP_PORTFOLIO';
  let charIdx   = 0;

  // Type the loader name letter by letter
  const typeInterval = setInterval(() => {
    if (charIdx < name.length) {
      textEl.textContent += name[charIdx++];
    } else {
      clearInterval(typeInterval);
    }
  }, 60);

  // Progress bar
  const progressInterval = setInterval(() => {
    const step = Math.random() * 12 + 3;
    progress = Math.min(progress + step, 100);
    bar.style.width = progress + '%';
    status.textContent = messages[Math.min(msgIdx++, messages.length - 1)];
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
        startAnimations();
      }, 400);
    }
  }, 180);
})();

// ───────────────────────────────────────────────
// 2. GSAP + SCROLL TRIGGER SETUP
// ───────────────────────────────────────────────
function startAnimations() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    initHeroAnimations();
  }
  initScrollReveal();
  initTypingEffect();
  initCounters();
}

function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.1 });

  tl.from('.hero-badge', {
    opacity: 0, y: -20, duration: 0.6, ease: 'power3.out'
  })
  .from('.hero-name', {
    opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-role-wrap', {
    opacity: 0, duration: 0.5
  }, '-=0.3')
  .from('.hero-location', {
    opacity: 0, y: 10, duration: 0.5
  }, '-=0.2')
  .from('.hero-cta-group .btn', {
    opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out'
  }, '-=0.2')
  .from('.hero-socials .social-link', {
    opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.4
  }, '-=0.2')
  .from('.hero-scroll-hint', {
    opacity: 0, duration: 0.6
  }, '-=0.1');
}

// ───────────────────────────────────────────────
// 3. INTERSECTION OBSERVER – SCROLL REVEAL
// ───────────────────────────────────────────────
function initScrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ───────────────────────────────────────────────
// 4. TYPING EFFECT – HERO ROLE
// ───────────────────────────────────────────────
function initTypingEffect() {
  const roles = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'Python Developer',
    'CTF Player',
    'Security Researcher',
    'Bug Hunter',
  ];
  const el    = document.getElementById('typing-role');
  if (!el) return;

  let ri = 0, ci = 0, deleting = false;
  const delay = { type: 70, delete: 40, pause: 1800, start: 400 };

  function tick() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, delay.pause);
        return;
      }
      setTimeout(tick, delay.type);
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, delay.start);
        return;
      }
      setTimeout(tick, delay.delete);
    }
  }
  setTimeout(tick, 1200);
}

// ───────────────────────────────────────────────
// 5. COUNT-UP ANIMATION
// ───────────────────────────────────────────────
function initCounters() {
  const els = document.querySelectorAll('.stat-num');
  if (!els.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (reduced) { el.textContent = target; observer.unobserve(el); return; }
      let start = 0;
      const duration = 1200;
      const step = Math.ceil(duration / (target * 60));
      const timer = setInterval(() => {
        start = Math.min(start + 1, target);
        el.textContent = start;
        if (start >= target) clearInterval(timer);
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

// ───────────────────────────────────────────────
// 6. NAVBAR – scroll state + active section
// ───────────────────────────────────────────────
(function initNavbar() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const burger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Hamburger toggle
  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Scroll state
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 20);

        // Active link
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(s => {
          if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ───────────────────────────────────────────────
// 7. BACK TO TOP
// ───────────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ───────────────────────────────────────────────
// 8. CONTACT FORM
// ───────────────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');
  const btn     = document.getElementById('btn-send-msg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Transmitting...';

    // Client-side validation
    const name  = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg   = form.querySelector('[name="message"]').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !msg) {
      showFormState(error, 'Please fill in all required fields.');
      resetBtn();
      return;
    }
    if (!emailRe.test(email)) {
      showFormState(error, 'Please enter a valid email address.');
      resetBtn();
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showFormState(success);
      } else {
        // Fallback: open mailto
        window.location.href = `mailto:baddibhanuprasad01@gmail.com?subject=${encodeURIComponent(form.querySelector('[name="subject"]').value)}&body=${encodeURIComponent(msg)}`;
        showFormState(success, '✓ Opened your mail client as fallback.');
      }
    } catch {
      window.location.href = `mailto:baddibhanuprasad01@gmail.com`;
      showFormState(success, '✓ Opened your mail client as fallback.');
    }

    resetBtn();
  });

  function showFormState(el, msg) {
    success.hidden = true;
    error.hidden   = true;
    if (msg) el.textContent = msg;
    el.hidden = false;
    setTimeout(() => { el.hidden = true; }, 6000);
  }

  function resetBtn() {
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Transmit Message';
  }
})();

// ───────────────────────────────────────────────
// 9. LAZY LOAD ABOUT VIDEO
// ───────────────────────────────────────────────
(function lazyLoadAboutVideo() {
  const video = document.getElementById('about-video');
  if (!video) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { video.remove(); return; }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      video.load();
      video.play().catch(() => {});
      observer.disconnect();
    }
  }, { rootMargin: '200px' });
  observer.observe(video);
})();

// ───────────────────────────────────────────────
// 10. HERO VIDEO – STOP ON COMPLETION
// ───────────────────────────────────────────────
(function initHeroVideoStop() {
  const heroVideo = document.getElementById('hero-video');
  if (!heroVideo) return;

  // When the video reaches the end, pause it so it freezes on the last frame
  heroVideo.addEventListener('ended', () => {
    heroVideo.pause();
    // Seek back one frame so the last frame stays visible (not a black frame)
    heroVideo.currentTime = Math.max(0, heroVideo.duration - 0.05);
  });
})();


// ───────────────────────────────────────────────
// 10. LUCIDE ICONS INIT
// ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

// ───────────────────────────────────────────────
// 11. SUBTLE NEON CURSOR TRAIL (desktop only)
// ───────────────────────────────────────────────
(function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dots = [];
  const NUM = 8;
  for (let i = 0; i < NUM; i++) {
    const d = document.createElement('div');
    d.style.cssText = `
      position:fixed; pointer-events:none; z-index:9998;
      width:${6 - i * 0.5}px; height:${6 - i * 0.5}px;
      border-radius:50%;
      background: hsl(${220 + i * 10},100%,60%);
      opacity:${0.5 - i * 0.05};
      transition: opacity 0.1s;
      will-change: transform;
    `;
    document.body.appendChild(d);
    dots.push({ el: d, x: 0, y: 0 });
  }

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function tick() {
    dots[0].x += (mx - dots[0].x) * 0.35;
    dots[0].y += (my - dots[0].y) * 0.35;
    dots[0].el.style.transform = `translate(${dots[0].x - 3}px, ${dots[0].y - 3}px)`;
    for (let i = 1; i < NUM; i++) {
      dots[i].x += (dots[i-1].x - dots[i].x) * 0.4;
      dots[i].y += (dots[i-1].y - dots[i].y) * 0.4;
      dots[i].el.style.transform = `translate(${dots[i].x - 3}px, ${dots[i].y - 3}px)`;
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// ───────────────────────────────────────────────
// 12. SCROLL THEATER – continuous slow playback
// ───────────────────────────────────────────────
(function initScrollTheater() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const video   = document.getElementById('st-video');
  if (!video) return;
  if (reduced) { video.remove(); return; }

  // Play continuously at 35% speed so it feels slow and cinematic
  video.loop        = true;
  video.playbackRate = 0.35;
  video.load();

  // Start playing as soon as the browser has enough data
  const tryPlay = () => video.play().catch(() => {});
  video.addEventListener('canplay', tryPlay, { once: true });

  // Fallback: if already ready
  if (video.readyState >= 3) tryPlay();
})();


// ───────────────────────────────────────────────
// 13. HERO SNAP – auto-jump to About on small scroll
// ───────────────────────────────────────────────
(function initHeroSnap() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const hero  = document.getElementById('home');
  const about = document.getElementById('about');
  if (!hero || !about) return;

  // Threshold: scroll less than 15% of viewport height while still in hero
  const THRESHOLD = window.innerHeight * 0.15;
  let snapping = false;
  let snapDone = false; // once user has gone past, disable snap so back-scroll is free

  window.addEventListener('scroll', () => {
    if (snapping || snapDone) return;

    const y = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    // User started scrolling but is still in the hero area
    if (y > 0 && y < heroBottom) {
      if (y >= THRESHOLD) {
        // Snap to about section
        snapping = true;
        about.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // After animation completes, mark snap as done so it won't re-trigger
        setTimeout(() => {
          snapping = false;
          snapDone = true;
        }, 900);
      }
    }

    // If user scrolls back to top (y===0), re-enable snap for next session
    if (y === 0) {
      snapDone = false;
      snapping = false;
    }
  }, { passive: true });
})();
