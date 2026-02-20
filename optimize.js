#!/usr/bin/env node
/**
 * SIGNAASAT Build Optimizer
 * Optimizes CSS, JS, and HTML for production
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 SIGNAASAT Production Optimizer\n');

// Configuration
const config = {
  minifyCSS: true,
  minifyJS: true,
  optimizeHTML: true,
  generateSourceMaps: false,
  removeComments: true
};

// Simple CSS minification
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .trim();
}

// Simple JS minification (removes comments and extra whitespace)
function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*/g, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
}

// Process files
async function optimize() {
  const stats = {
    cssOriginal: 0,
    cssOptimized: 0,
    jsOriginal: 0,
    jsOptimized: 0
  };

  console.log('📦 Optimizing CSS files...');
  const cssFiles = [
    'assets/css/shared.css',
    'assets/css/index.css',
    'assets/css/about.css',
    'assets/css/blog.css',
    'assets/css/blog-detail.css',
    'assets/css/contact.css',
    'assets/css/legal.css'
  ];

  for (const file of cssFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const original = fs.readFileSync(filePath, 'utf8');
      const minified = minifyCSS(original);
      const outputPath = filePath.replace('.css', '.min.css');

      stats.cssOriginal += original.length;
      stats.cssOptimized += minified.length;

      fs.writeFileSync(outputPath, minified);
      console.log(`  ✓ ${file} → ${(minified.length / original.length * 100).toFixed(1)}%`);
    }
  }

  console.log('\n📦 Optimizing JS files...');
  const jsFiles = [
    'assets/js/script.js',
    'assets/js/components.js'
  ];

  for (const file of jsFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const original = fs.readFileSync(filePath, 'utf8');
      const minified = minifyJS(original);
      const outputPath = filePath.replace('.js', '.min.js');

      stats.jsOriginal += original.length;
      stats.jsOptimized += minified.length;

      fs.writeFileSync(outputPath, minified);
      console.log(`  ✓ ${file} → ${(minified.length / original.length * 100).toFixed(1)}%`);
    }
  }

  console.log('\n📊 Optimization Results:');
  console.log(`  CSS: ${(stats.cssOriginal / 1024).toFixed(1)}KB → ${(stats.cssOptimized / 1024).toFixed(1)}KB (${((1 - stats.cssOptimized / stats.cssOriginal) * 100).toFixed(1)}% reduction)`);
  console.log(`  JS:  ${(stats.jsOriginal / 1024).toFixed(1)}KB → ${(stats.jsOptimized / 1024).toFixed(1)}KB (${((1 - stats.jsOptimized / stats.jsOriginal) * 100).toFixed(1)}% reduction)`);
  console.log(`  Total saved: ${((stats.cssOriginal + stats.jsOriginal - stats.cssOptimized - stats.jsOptimized) / 1024).toFixed(1)}KB\n`);

  console.log('✨ Optimization complete!');
  console.log('\n💡 Next steps:');
  console.log('  1. Update HTML files to use .min.css and .min.js files');
  console.log('  2. Enable gzip/brotli compression on your server');
  console.log('  3. Set proper cache headers');
  console.log('  4. Consider using a CDN\n');
}

optimize().catch(console.error);
