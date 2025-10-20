const fs = require('fs');
const path = require('path');

console.log('📁 Copying static pages to build directory...');

const sourceDir = path.join(__dirname, '../public/static-pages');
const buildDir = path.join(__dirname, '../build/static-pages');

// Create build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy all HTML files
const files = fs.readdirSync(sourceDir);
let copiedCount = 0;

files.forEach(file => {
  if (file.endsWith('.html')) {
    const sourcePath = path.join(sourceDir, file);
    const buildPath = path.join(buildDir, file);
    
    fs.copyFileSync(sourcePath, buildPath);
    copiedCount++;
  }
});

console.log(`✅ Copied ${copiedCount} static pages to build directory`);
console.log(`📁 Build directory: ${buildDir}`);

// Copy 404.html for GitHub Pages SPA routing
console.log('\n📁 Copying 404.html for GitHub Pages SPA routing...');
const source404 = path.join(__dirname, '../public/404.html');
const build404 = path.join(__dirname, '../build/404.html');

if (fs.existsSync(source404)) {
  fs.copyFileSync(source404, build404);
  console.log('✅ Copied 404.html to build directory');
} else {
  console.log('⚠️  Warning: public/404.html not found');
}

console.log('\n🎉 Static pages are ready for deployment!');
