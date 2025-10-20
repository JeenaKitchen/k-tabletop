# Chuseok Theme Implementation Summary

## Overview
The Chuseok theme uses a **static background image** (JPG) instead of a video, and includes ambient sound.

## Configuration

### File: `src/data/themeConfig.js`
```javascript
{
  name: "Chuseok",
  notionThemeName: "Chuseok",
  description: "Chuseok is a major Korean harvest festival celebrated with family gatherings, traditional foods, and ancestral rituals.\nIt's often called the Korean Thanksgiving, honoring gratitude for the year's harvest.",
  background: "/Themes/chuseok.jpg",  // Static image (243KB)
  sound: "/Sounds/chuseok.mp3"        // Ambient sound (272KB)
  // No video property - this tells ThemeBackground to use the image
}
```

## Assets

### Background Image
- **Location**: `public/Themes/chuseok.jpg`
- **Size**: 243KB
- **Type**: JPEG image

### Sound File
- **Location**: `public/Sounds/chuseok.mp3`
- **Size**: 272KB (optimized from original)
- **Type**: MP3 audio (320 kbps, 48 kHz, Stereo)

## Component Logic

### `ThemeBackground.js`
The component handles both video and static image backgrounds:

```javascript
// Line 14-26: When no video prop, mark as loaded immediately
if (!video) {
  setIsVideoLoaded(true);
  setIsVideoPlaying(false);
  setShowLoading(false);
  setLoadingStartTime(null);
}

// Line 80-97: Render logic
{video ? (
  <video ... />  // For video themes
) : background ? (
  <div 
    className="theme-background-image loaded"
    style={{ backgroundImage: `url(${background})` }}
  />  // For static image themes like Chuseok
) : null}

// Line 100: No loading overlay for static images
{video && showLoading && !isVideoLoaded && (
  // Loading spinner only shown for video themes
)}
```

### `KTabletopPage.js`
Passes theme properties to ThemeBackground:

```javascript
<ThemeBackground 
  background={currentTheme?.background || ''} 
  video={currentTheme?.video || ''} 
  isTransitioning={isThemeTransitioning}
  transitionDirection={transitionDirection}
/>
```

## Dishes

### Markdown Recipe Files
Location: `public/recipes/chuseok/`

1. **nabak-kimchi.md** - Refreshing water kimchi
2. **modeum-jeon.md** - Assorted Korean pancakes
3. **galbijjim.md** - Korean braised beef short ribs
4. **gujeolpan.md** - Nine-sectioned dish
5. **japchae.md** - Sweet potato starch noodles

### Recipe Manifest
Updated in `src/services/markdownService.js`:

```javascript
'chuseok': [
  'nabak-kimchi.md',
  'modeum-jeon.md',
  'galbijjim.md',
  'gujeolpan.md',
  'japchae.md'
]
```

## Loading Behavior

### For Chuseok (Static Image Theme):
1. ✅ No loading spinner shown
2. ✅ Background loads instantly (marked as loaded immediately)
3. ✅ Sound plays via AudioManager
4. ✅ No video element rendered

### For Video Themes (Other Themes):
1. Loading spinner after 1 second if video not loaded
2. Video element with autoplay, loop, muted
3. Sound plays when video is ready

## Issue Fixed

**Problem**: The build directory had an old **9.8MB MP4 file** disguised as `chuseok.mp3`.

**Solution**: 
1. Deleted the incorrect file from `build/Sounds/`
2. Rebuilt the project
3. Verified the correct **272KB MP3 file** is now in place

## URLs

### Theme URL
- `https://www.jeenaskitchen.store/k-tabletop/chuseok`

### Recipe URLs
- `https://www.jeenaskitchen.store/k-tabletop/chuseok/nabak-kimchi`
- `https://www.jeenaskitchen.store/k-tabletop/chuseok/modeum-jeon`
- `https://www.jeenaskitchen.store/k-tabletop/chuseok/galbijjim`
- `https://www.jeenaskitchen.store/k-tabletop/chuseok/gujeolpan`
- `https://www.jeenaskitchen.store/k-tabletop/chuseok/japchae`

## Testing

### Local Testing (Port 3006):
```bash
npx serve -s build -l 3006
```

Then visit: `http://localhost:3006/k-tabletop/chuseok`

### Expected Behavior:
1. ✅ Static background image loads immediately
2. ✅ No loading spinner
3. ✅ Ambient sound plays (272KB file)
4. ✅ 5 dish items appear in dock
5. ✅ Recipe modals open with full content

## Deployment

```bash
npm run deploy
```

This will:
1. Build the project
2. Copy static pages and 404.html
3. Deploy to GitHub Pages (gh-pages branch)

Wait 2-5 minutes for GitHub Pages to propagate changes.

