/* =========================================
   CORPORATE WEBSITE — Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll effect ──
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger / Mobile nav ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active nav link ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll-triggered fade-up ──
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => observer.observe(el));
  }

  // ── Know More cards — link navigation ──
  document.querySelectorAll('.know-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  // ── Contact form ──
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>送信しました</span><span class="arrow">✓</span>';
      btn.style.background = '#8b7355';
      btn.style.borderColor = '#8b7355';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  // ── Smooth anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - headerH - 20,
          behavior: 'smooth'
        });
      }
    });
  });

});
