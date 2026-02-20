// Component Loader - Loads header and footer consistently across all pages
(function() {
  'use strict';

  // Determine the base path based on current location
  function getBasePath() {
    const path = window.location.pathname;
    // If we're in a subdirectory (pages/), go up one level
    return path.includes('/pages/') ? '..' : '.';
  }

  // Check if we're on a subpage
  function isSubpage() {
    return window.location.pathname.includes('/pages/');
  }

  // Build proper URLs for navigation
  function buildUrl(type, value, query) {
    const basePath = getBasePath();

    if (type === 'home') {
      return basePath + '/index.html';
    } else if (type === 'section') {
      return basePath + '/index.html#' + value;
    } else if (type === 'page') {
      const pageUrl = basePath + '/pages/' + value + '.html';
      return query ? pageUrl + '?' + query : pageUrl;
    }
    return '#';
  }

  // Fix navigation links after components load
  function fixNavigationLinks() {
    // Fix home links
    document.querySelectorAll('[data-nav-home]').forEach(link => {
      link.href = buildUrl('home');
    });

    // Fix section links (homepage sections)
    document.querySelectorAll('[data-nav-section]').forEach(link => {
      const section = link.getAttribute('data-nav-section');
      link.href = buildUrl('section', section);
    });

    // Fix page links
    document.querySelectorAll('[data-nav-page]').forEach(link => {
      const page = link.getAttribute('data-nav-page');
      const query = link.getAttribute('data-nav-query');
      link.href = buildUrl('page', page, query);
    });
  }

  // Load component from file
  async function loadComponent(elementId, componentPath) {
    try {
      const basePath = getBasePath();
      const fullPath = `${basePath}/${componentPath}`;
      const response = await fetch(fullPath);

      if (!response.ok) {
        throw new Error(`Failed to load ${componentPath}: ${response.status}`);
      }

      const html = await response.text();
      const element = document.getElementById(elementId);

      if (element) {
        element.innerHTML = html;

        // Fix all navigation links
        fixNavigationLinks();

        // Re-initialize Lucide icons after loading component
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        // Re-attach theme toggle and mobile menu if this is the header
        if (elementId === 'header-component') {
          initThemeToggle();
          initMobileMenu();
        }

        // Set current year in footer
        if (elementId === 'footer-component') {
          setCurrentYear();
        }
      }
    } catch (error) {
      console.error('Error loading component:', error);
    }
  }

  // Set current year in footer
  function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Initialize theme toggle functionality
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Initialize mobile menu toggle (optimized)
  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    const closeMobileMenu = () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.contains('active');
      if (isActive) {
        closeMobileMenu();
      } else {
        toggle.classList.add('active');
        menu.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu when clicking links (event delegation)
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        closeMobileMenu();
      }
    });

    // Close menu on resize > 900px (debounced, passive)
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 900 && toggle.classList.contains('active')) {
          closeMobileMenu();
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
  }

  // Highlight active navigation link
  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const hash = window.location.hash;
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');

    navLinks.forEach(link => {
      // Remove 'active' class from all links first
      link.classList.remove('active');

      // Check if this is a page link
      const navPage = link.getAttribute('data-nav-page');
      if (navPage && currentPath.includes(`/${navPage}.html`)) {
        link.classList.add('active');
      }

      // Check if this is a section link on homepage
      const navSection = link.getAttribute('data-nav-section');
      if (navSection && currentPath.includes('index.html') && hash === `#${navSection}`) {
        link.classList.add('active');
      }

      // Special case for blog
      if (currentPath.includes('/blog') && navPage === 'blog') {
        link.classList.add('active');
      }
    });
  }

  // Load components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  async function init() {
    // Load header and footer
    await Promise.all([
      loadComponent('header-component', 'components/header.html'),
      loadComponent('footer-component', 'components/footer.html')
    ]);

    // Highlight active nav after components load
    setTimeout(highlightActiveNav, 100);

    // Update active nav on hash change
    window.addEventListener('hashchange', highlightActiveNav);
  }
})();
