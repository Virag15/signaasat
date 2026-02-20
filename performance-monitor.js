/**
 * SIGNAASAT Performance Monitor
 * Lightweight performance tracking utility
 * Add this script to pages you want to monitor
 */

(function() {
  'use strict';

  // Only run in production or when explicitly enabled
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Enable for dev if needed: add ?perf=1 to URL
    if (!window.location.search.includes('perf=1')) return;
  }

  // Performance metrics collector
  const metrics = {
    marks: {},
    measures: {},
    resources: []
  };

  // Measure page load performance
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (!window.performance) return;

      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      const firstPaint = performance.getEntriesByType('paint')[0];
      const firstContentfulPaint = performance.getEntriesByType('paint')[1];

      metrics.pageLoad = {
        total: loadTime,
        domReady: domReady,
        firstPaint: firstPaint ? firstPaint.startTime : null,
        firstContentfulPaint: firstContentfulPaint ? firstContentfulPaint.startTime : null
      };

      // Get resource timing
      const resources = performance.getEntriesByType('resource');
      metrics.resources = resources.map(r => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize,
        type: r.initiatorType
      }));

      // Log to console in development
      if (window.location.search.includes('perf=1')) {
        console.group('📊 Performance Metrics');
        console.log('Page Load Time:', (loadTime / 1000).toFixed(2) + 's');
        console.log('DOM Ready:', (domReady / 1000).toFixed(2) + 's');
        if (firstPaint) console.log('First Paint:', (firstPaint.startTime / 1000).toFixed(2) + 's');
        if (firstContentfulPaint) console.log('First Contentful Paint:', (firstContentfulPaint.startTime / 1000).toFixed(2) + 's');

        const slowResources = resources.filter(r => r.duration > 100).sort((a, b) => b.duration - a.duration);
        if (slowResources.length > 0) {
          console.group('⚠️  Slow Resources (>100ms)');
          slowResources.forEach(r => {
            console.log(r.name, (r.duration).toFixed(0) + 'ms');
          });
          console.groupEnd();
        }

        console.groupEnd();
      }

      // Send to analytics (if integrated)
      if (window.gtag) {
        gtag('event', 'timing_complete', {
          name: 'page_load',
          value: Math.round(loadTime),
          event_category: 'Performance'
        });
      }

    }, 0);
  });

  // Core Web Vitals tracking
  if (typeof PerformanceObserver !== 'undefined') {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;

        if (window.location.search.includes('perf=1')) {
          console.log('📏 LCP:', (metrics.lcp / 1000).toFixed(2) + 's');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          metrics.fid = entry.processingStart - entry.startTime;

          if (window.location.search.includes('perf=1')) {
            console.log('⚡ FID:', metrics.fid.toFixed(2) + 'ms');
          }
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {}

    // Cumulative Layout Shift (CLS)
    try {
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        }
        metrics.cls = clsScore;

        if (window.location.search.includes('perf=1')) {
          console.log('🎯 CLS:', clsScore.toFixed(3));
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  }

  // Expose metrics for debugging
  window.__SIGNAASAT_PERF__ = metrics;

})();
