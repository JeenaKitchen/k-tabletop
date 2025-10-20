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
console.log('\n🎉 Static pages are ready for deployment!');
