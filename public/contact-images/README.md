# Contact Images

This folder contains images for the Contact Me section on the landing page.

## Required Image

- **contact-me-landing.png**: The main image displayed in the Contact Me section
  - Should be optimized for web (recommended: 600px width, PNG format)
  - Will be displayed on the right side of the Contact Me section
  - Should represent collaboration, consultation, or professional contact

## Usage

The image is referenced in the LandingPage component as:
```jsx
<img src="/contact-images/contact-me-landing.png" alt="Contact Jeena's Kitchen" />
```

## Responsive Behavior

- Desktop: Full size (max 600px width)
- Tablet: Scaled down proportionally
- Mobile: Stacked below text content (max 400px width on tablets, 300px on mobile)
