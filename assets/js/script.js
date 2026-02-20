/* ═══════════════════════════════════════════════════════════
   SIGNAASAT — script.js  v3.0
   Modular, efficient, no dependencies except Lucide
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── THEME [FIX #5] — persist across pages ─── */
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('sg-theme', theme);
    if (window.lucide) lucide.createIcons();
  }

  (function initThemePersist() {
    const saved = localStorage.getItem('sg-theme') || 'dark';
    html.setAttribute('data-theme', saved); // applied before paint
  })();

  function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ─── CURSOR [FIX #1] — dot is immediate, ring uses RAF lerp ─── */
  function initCursor() {
    const dot  = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    document.addEventListener('mouseleave', () => { mx = my = -200; });

    (function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('a, button, .card, .blog-card, .stack-layer, .frag-item, .d-node, .legal-tab, .region-card, .os-feat-row');
      if (el) {
        dot.classList.add('hover');
        ring.classList.add('hover');
      } else {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      }
    });
  }

  /* ─── NAV SCROLL ─── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const check = () => nav.classList.toggle('scrolled', window.scrollY > 28);
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ─── SCROLL-SPY [FIX #17] — only runs if spy links exist ─── */
  function initScrollSpy() {
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!links.length) return;

    const pairs = [];
    links.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) pairs.push({ a, sec });
    });

    const spy = () => {
      let current = '';
      pairs.forEach(({ sec }) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };

    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ─── SCROLL REVEAL [FIX #33] — unobserve after reveal ─── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target); // stop watching
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ─── TICKER [FIX #32] — clone for seamless loop ─── */
  function initTicker() {
    document.querySelectorAll('.ticker-track').forEach(track => {
      const clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.parentElement.appendChild(clone);
    });
  }

  /* ─── DIAGRAM NODE CYCLE ─── */
  function initDiagram() {
    const nodes = document.querySelectorAll('.d-node');
    if (!nodes.length) return;
    let i = 2;
    setInterval(() => {
      nodes.forEach(n => n.classList.remove('active'));
      nodes[i].classList.add('active');
      i = (i + 1) % nodes.length;
    }, 1100);
  }

  /* ─── LEGAL TABS ─── */
  function initLegalTabs() {
    const tabs = document.querySelectorAll('.legal-tab');
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.panel;
        document.querySelectorAll('.legal-panel').forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  }

  /* ─── SOCIAL SHARE [Blog Detail] ─── */
  function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    if (!shareButtons.length) return;

    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    shareButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('svg')?.getAttribute('data-lucide') || btn.querySelector('i')?.getAttribute('data-lucide');

        if (icon === 'linkedin') {
          // LinkedIn share
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank', 'width=600,height=400');
        } else if (icon === 'twitter') {
          // Twitter/X share
          window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`, '_blank', 'width=600,height=400');
        } else if (icon === 'link-2' || icon === 'link') {
          // Copy link to clipboard
          navigator.clipboard.writeText(window.location.href).then(() => {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i>';
            if (window.lucide) lucide.createIcons();
            btn.style.background = 'var(--green)';
            btn.style.borderColor = 'var(--green)';
            btn.style.color = 'white';

            setTimeout(() => {
              btn.innerHTML = originalHTML;
              if (window.lucide) lucide.createIcons();
              btn.style.background = '';
              btn.style.borderColor = '';
              btn.style.color = '';
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy:', err);
          });
        }
      });
    });
  }

  /* ─── PERIOD FILTERS ─── */
  function initPeriodFilters() {
    const btns = document.querySelectorAll('.period-btn');
    if (!btns.length) return;

    // Data for different periods
    const periodData = {
      '1W': {
        leads: '3,847',
        conversion: '31.8%',
        conversionPts: '+3.2',
        patients: '1,223',
        patientsPct: '+15.2%',
        cac: '$21.30',
        cacPct: '−8%'
      },
      '1M': {
        leads: '18,427',
        conversion: '34.2%',
        conversionPts: '+5.1',
        patients: '6,302',
        patientsPct: '+18.7%',
        cac: '$18.40',
        cacPct: '−12%'
      },
      '3M': {
        leads: '52,891',
        conversion: '36.7%',
        conversionPts: '+7.8',
        patients: '19,411',
        patientsPct: '+24.3%',
        cac: '$16.20',
        cacPct: '−18%'
      }
    };

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const period = btn.textContent.trim();
        const data = periodData[period];
        if (!data) return;

        // Animate chart area
        const chartArea = document.querySelector('.hdash-chart-area');
        if (chartArea) {
          chartArea.classList.add('updating');
          setTimeout(() => chartArea.classList.remove('updating'), 300);
        }

        // Update stat values with animation
        setTimeout(() => {
          animateValue('.hdash-stat-val.ac', data.leads);
          animateValue('.hdash-stat-val.tl', data.conversion);
          animateValue('.hdash-stat-val.gn', data.patients);
          animateValue('.hdash-stat-val.wt', data.cac);

          // Update deltas
          const deltas = document.querySelectorAll('.hdash-stat-delta');
          if (deltas[0]) deltas[0].innerHTML = `<svg><use href="#lucide-trending-up"/></svg> +22.4% vs last period`;
          if (deltas[1]) deltas[1].innerHTML = `<svg><use href="#lucide-trending-up"/></svg> ${data.conversionPts} pts`;
          if (deltas[2]) deltas[2].innerHTML = `<svg><use href="#lucide-trending-up"/></svg> ${data.patientsPct}`;
          if (deltas[3]) deltas[3].innerHTML = `<svg><use href="#lucide-trending-down"/></svg> ${data.cacPct} (improved)`;

          if (window.lucide) lucide.createIcons();
        }, 150);
      });
    });
  }

  // Animate number changes
  function animateValue(selector, newValue) {
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.animation = 'none';
    el.style.transform = 'scale(0.95)';
    el.style.opacity = '0.6';

    setTimeout(() => {
      el.textContent = newValue;
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
      setTimeout(() => {
        el.style.animation = 'numberUpdate 2.5s ease-in-out infinite';
      }, 300);
    }, 150);
  }

  /* ─── INIT ─── */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initThemeToggle();
    initCursor();
    initNav();
    initScrollSpy();
    initReveal();
    initTicker();
    initDiagram();
    initLegalTabs();
    initPeriodFilters();
    initSocialShare();
  });

})();
