// ===================================
// AWD PROJECT — PCDF Trust
// main.js — Interactivity
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL SHADOW ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(0,0,0,0.12)'
      : '0 2px 16px rgba(0,0,0,0.08)';
  });

  // ─── HAMBURGER MENU ────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  hamburger?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = { rootMargin: '-40% 0px -40% 0px' };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ─── BACK TO TOP BUTTON ────────────────────────────────────────
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── ANIMATED COUNTERS ─────────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = target % 1 !== 0 ? 1 : 0;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ─── GALLERY FILTER ────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });

  // ─── LIGHTBOX ──────────────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.src;
      lightboxCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── DATA TABS ─────────────────────────────────────────────────
  const tabBtns = document.querySelectorAll('.data-tab-btn');
  const tabContents = document.querySelectorAll('.data-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      target?.classList.add('active');
    });
  });

  // ─── LOCATION LIST ─────────────────────────────────────────────
  const locationItems = document.querySelectorAll('.location-item');
  locationItems.forEach(item => {
    item.addEventListener('click', () => {
      locationItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ─── CONTACT FORM ──────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      formSuccess.style.display = 'block';
      contactForm.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1500);
  });

  // ─── SCROLL REVEAL ─────────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.obj-card, .activity-card, .farmer-card, .report-card, .counter-card, .pillar-card, .step-card, .location-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
