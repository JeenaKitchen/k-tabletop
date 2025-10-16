# Items Images Folder

This folder is for **kitchen tools and tableware items** (pots, pans, plates, utensils, etc.)

## How to Add Items:

1. **Save your item images here** with descriptive names:
   - Examples: `ceramic-bowl.png`, `wooden-spoon.png`, `cast-iron-pan.png`
   - Use lowercase with hyphens (kebab-case)
   - Recommended formats: `.png`, `.jpg`, or `.webp`

2. **Image Guidelines**:
   - Square images work best (1:1 aspect ratio)
   - Recommended size: 800px × 800px or larger
   - Clean background (preferably white or transparent)
   - High quality, clear product photos

3. **Update the item data**:
   - Go to: `src/data/itemsData.js`
   - Add/edit items with your image filename and product link
   - Example:
     ```javascript
     {
       id: 1,
       name: 'Ceramic Bowl',
       image: '/items-images/ceramic-bowl.png',
       category: 'tableware',
       tags: ['bowl', 'ceramic'],
       link: 'https://example.com/ceramic-bowl' // Product page URL
     }
     ```
   - **Link field**: Add the URL where users can buy or learn more about the item
   - If no link, leave it as empty string: `link: ''`
   - Links will open in a new tab when clicked

## Current Placeholders:

The page currently shows **40 placeholder items** (Item 1, Item 2, etc.) that you can replace with your actual kitchen items.

Simply:
1. Upload your images here
2. Update the names and image paths in `src/data/itemsData.js`
3. The page will automatically update!

