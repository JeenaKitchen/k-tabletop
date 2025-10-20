const fs = require('fs');
const path = require('path');

// Import theme data
const { themeConfig } = require('../src/data/themeConfig');
const { themes } = require('../src/data/themes');

// Base URL for your site
const BASE_URL = 'https://www.jeenaskitchen.store';

// Function to create URL-friendly slug
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Function to generate HTML for a page
function generateHTML(title, description, image, url, redirectUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${url}">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image" content="${image}">
  <meta property="twitter:image:alt" content="${title}">
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0; url=${redirectUrl}">
  <script>window.location.href = '${redirectUrl}';</script>
</head>
<body>
  <p>Redirecting to <a href="${redirectUrl}">${title}</a>...</p>
</body>
</html>`;
}

// Create static pages directory
const staticPagesDir = path.join(__dirname, '../public/static-pages');
if (!fs.existsSync(staticPagesDir)) {
  fs.mkdirSync(staticPagesDir, { recursive: true });
}

console.log('🚀 Generating static pages for SEO...');

let pageCount = 0;

// Generate pages for each theme
themeConfig.forEach(theme => {
  const themeSlug = createSlug(theme.name);
  const staticPageUrl = `${BASE_URL}/static-pages/${themeSlug}.html`;
  const reactAppUrl = `${BASE_URL}/k-tabletop/${themeSlug}`;
  const themeTitle = `${theme.name} Recipes | Jeena's Kitchen`;
  const themeDescription = theme.description || `Explore authentic Korean recipes from ${theme.name}. Learn to cook traditional Korean dishes with video tutorials.`;
  const themeImage = theme.background ? `${BASE_URL}${theme.background}` : `${BASE_URL}/hero-image/hero-custome-image.png`;
  
  // Create theme page
  const themeHTML = generateHTML(
    themeTitle,
    themeDescription,
    themeImage,
    staticPageUrl,
    reactAppUrl
  );
  
  const themeFilePath = path.join(staticPagesDir, `${themeSlug}.html`);
  fs.writeFileSync(themeFilePath, themeHTML);
  console.log(`✅ Created: ${themeSlug}.html`);
  pageCount++;
});

// Generate pages for each recipe
themes.forEach(theme => {
  const themeSlug = createSlug(theme.name);
  
  theme.dishes.forEach(dish => {
    const dishSlug = createSlug(dish.name);
    const staticPageUrl = `${BASE_URL}/static-pages/${themeSlug}-${dishSlug}.html`;
    const reactAppUrl = `${BASE_URL}/k-tabletop/${themeSlug}/${dishSlug}`;
    const recipeTitle = `${dish.name} Recipe - ${theme.name} | Jeena's Kitchen`;
    const recipeDescription = dish.description || `Learn to cook ${dish.name} with this authentic Korean recipe from ${theme.name}.`;
    const recipeImage = dish.modalImage ? `${BASE_URL}${dish.modalImage}` : `${BASE_URL}${dish.image}`;
    
    // Create recipe page
    const recipeHTML = generateHTML(
      recipeTitle,
      recipeDescription,
      recipeImage,
      staticPageUrl,
      reactAppUrl
    );
    
    const recipeFilePath = path.join(staticPagesDir, `${themeSlug}-${dishSlug}.html`);
    fs.writeFileSync(recipeFilePath, recipeHTML);
    console.log(`✅ Created: ${themeSlug}-${dishSlug}.html`);
    pageCount++;
  });
});

console.log(`\n🎉 Generated ${pageCount} static pages!`);
console.log(`📁 Files saved to: ${staticPagesDir}`);
console.log(`\n📝 Next steps:`);
console.log(`1. Run: npm run build`);
console.log(`2. Deploy to gh-pages`);
console.log(`3. Test with Facebook Debugger: https://developers.facebook.com/tools/debug/`);
