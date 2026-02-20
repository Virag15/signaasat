<?php
// Simple PHP router for testing clean URLs locally
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Remove trailing slashes
$path = rtrim($path, '/');

// Root
if ($path === '' || $path === '/') {
    require 'index.html';
    exit;
}

// Remove leading slash
$path = ltrim($path, '/');

// Try pages directory first
$pagesFile = __DIR__ . '/pages/' . $path . '.html';
if (file_exists($pagesFile)) {
    require $pagesFile;
    exit;
}

// Try root directory
$rootFile = __DIR__ . '/' . $path . '.html';
if (file_exists($rootFile)) {
    require $rootFile;
    exit;
}

// If file exists as-is, serve it
if (file_exists(__DIR__ . '/' . $path)) {
    return false; // Let PHP serve the file
}

// 404
http_response_code(404);
echo '404 - Page Not Found';
?>
