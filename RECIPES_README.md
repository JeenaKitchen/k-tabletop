# 📝 K-Tabletop Markdown Recipe System

## Overview
K-Tabletop now uses a simple markdown-based recipe system instead of external databases. This approach is **faster**, **more reliable**, and **easier to manage**.

## 📁 File Structure
```
public/recipes/
├── korean-netflix-night/
│   ├── buldak-rabokki.md
│   └── corn-dog.md
├── korean-bbq-restaurant/
│   └── korean-bbq.md
├── korean-cafe/
│   └── strawberry-sandwich.md
├── korean-dining-room/
├── korean-grandmother-house/
├── han-gang/
├── namdaemun-market/
└── pocha-night/
```

## 📋 Recipe Format
Each recipe is a markdown file with **frontmatter** (metadata) and **content**:

```markdown
---
title: "Recipe Name"
description: "Brief description of the dish"
timePortion: "25 mins • 2-3 servings"
image: "/Dishes/dish-image.png"
modalImage: "/modal-images/dish-modal.jpg"
categories: ["Category1", "Category2"]
youtubeUrl: "https://www.youtube.com/watch?v=example"
theme: "Theme Name"
---

## Ingredients
- First ingredient
- Second ingredient
- Third ingredient

## Instructions
Step 1 - Step name: Detailed instruction for this step.
Step 2 - Another step: Another detailed instruction.
Step 3 - Final step: Final instruction to complete the recipe.
```

## ✅ Key Features
- **No cookingTime field** - use `timePortion` instead
- **Simple step format** - `Step X - Name: Description`
- **Theme organization** - recipes organized by theme folders
- **Local caching** - 24-hour cache for performance
- **Error handling** - graceful fallbacks if recipes fail to load

## 🔧 How It Works

### 1. **Markdown Service** (`src/services/markdownService.js`)
- Fetches and parses markdown files
- Converts frontmatter to recipe objects
- Handles caching and error recovery

### 2. **Theme Service** (`src/services/themeService.js`)
- Combines static theme config with dynamic recipes
- Loads recipes from markdown service
- Manages loading states and errors

### 3. **Theme Config** (`src/data/themeConfig.js`)
- Static theme metadata (backgrounds, videos, sounds)
- Maps theme names to folder names

## 📝 Adding New Recipes

1. **Create the markdown file** in the appropriate theme folder:
   ```bash
   public/recipes/theme-folder-name/recipe-name.md
   ```

2. **Update the recipe manifest** in `src/services/markdownService.js`:
   ```javascript
   'theme-folder-name': [
     'existing-recipe.md',
     'new-recipe.md'  // Add your new recipe here
   ]
   ```

3. **Follow the markdown format** with proper frontmatter and content sections

## 🎯 Benefits Over Notion
- ✅ **No API keys** or external dependencies
- ✅ **No CORS issues** or serverless functions needed
- ✅ **Version control** - recipes are tracked in git
- ✅ **Offline capable** - works without internet
- ✅ **Fast loading** - local files with caching
- ✅ **Simple editing** - just edit markdown files
- ✅ **Reliable** - no external service dependencies

## 🛠️ Development
The system is designed to be:
- **Easy to extend** - just add more markdown files
- **Maintainable** - simple file structure
- **Performant** - cached and optimized
- **Robust** - handles errors gracefully

## 📊 Current Status
- ✅ 4 sample recipes implemented
- ✅ 3 themes with recipes
- ✅ Full parsing and caching system
- ✅ Error handling and fallbacks
- ✅ Integration with existing UI components

Happy cooking! 🍳