# Custom Icons Folder

This folder is for your custom SVG icons that you want to use in the navigation bar.

## Mobile Navigation Icons

For the mobile navigation, you can add your custom SVG icons here and update the NavigationBar component to use them instead of the default ones.

### Current Icons Used:
- **Home**: Logo + "Jeena's Kitchen" text
- **About**: Info icon (i)
- **K-Tabletop**: Star icon
- **Share**: Share icon

### How to Add Custom Icons:

1. Add your SVG files to this folder
2. Update the `NavigationBar.js` component to import and use your custom icons
3. Replace the inline SVG elements in the mobile navigation section

### Example:
```jsx
// Import your custom icon
import HomeIcon from './custom/home-icon.svg';

// Use in component
<img src={HomeIcon} alt="Home" width="20" height="20" />
```

### Icon Specifications:
- **Size**: 20x20px for mobile navigation
- **Format**: SVG preferred for scalability
- **Style**: Should match the Apple Glass UI aesthetic
- **Colors**: Use `currentColor` in SVG to inherit text color
