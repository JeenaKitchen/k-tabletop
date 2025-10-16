# Mobile Hero Image Folder

This folder is for the **mobile hero image** on the Landing Page.

## How to Add Mobile Hero Image:

1. **Save your mobile hero image here** with a descriptive name:
   - Example: `hero-mobile.png`, `hero-mobile.jpg`
   - Use lowercase with hyphens (kebab-case)
   - Recommended formats: `.png`, `.jpg`, or `.webp`

2. **Image Guidelines**:
   - Portrait or square orientation works best for mobile
   - Recommended size: 800px × 1000px or similar
   - High quality, clear image
   - Consider text readability if you want text overlay

3. **Update the code**:
   - Go to: `src/components/LandingPage.js`
   - Find the hero section
   - The code will automatically use your uploaded image on mobile view

## Current Setup:

- **Desktop**: Uses background image (`hero-custome-image.png`)
- **Mobile (≤1024px)**: Will display your uploaded image below the text

## Example:

If you upload `hero-mobile.png`, the mobile view will show:
```
┌─────────────────┐
│  Welcome to     │
│  Jeena's Kitchen│
│  Description... │
│  [Button]       │
│                 │
│  ┌───────────┐  │
│  │ Your Image│  │
│  └───────────┘  │
└─────────────────┘
```
