---
name: Neomundo Tropical
colors:
  surface: '#f4fafc'
  surface-dim: '#d5dbdd'
  surface-bright: '#f4fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff5f6'
  surface-container: '#e9eff0'
  surface-container-high: '#e3e9eb'
  surface-container-highest: '#dde3e5'
  on-surface: '#161d1e'
  on-surface-variant: '#3c494c'
  inverse-surface: '#2b3133'
  inverse-on-surface: '#ecf2f3'
  outline: '#6c797c'
  outline-variant: '#bbc9cc'
  surface-tint: '#006876'
  primary: '#006876'
  on-primary: '#ffffff'
  primary-container: '#00bcd4'
  on-primary-container: '#004650'
  inverse-primary: '#44d8f1'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#91f78e'
  on-secondary-container: '#00731e'
  tertiary: '#8b5000'
  on-tertiary: '#ffffff'
  tertiary-container: '#f79300'
  on-tertiary-container: '#5f3500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a1efff'
  primary-fixed-dim: '#44d8f1'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e59'
  secondary-fixed: '#94f990'
  secondary-fixed-dim: '#78dc77'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#ffdcbe'
  tertiary-fixed-dim: '#ffb870'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#f4fafc'
  on-background: '#161d1e'
  surface-variant: '#dde3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is built to capture the vibrant, sun-drenched energy of Guatapé. It targets adventure-seeking travelers and luxury tourists looking for professional yet approachable travel services. 

The aesthetic is **Tropical Modernism**: a mix of clean, high-end layouts with high-saturation accents inspired by Colombian landscapes. It utilizes heavy whitespace to let professional travel photography breathe, balanced with glassmorphic elements that mimic the clarity of the Peñol-Guatapé reservoir. The emotional response should be one of optimism, reliability, and excitement.

## Colors

The palette is derived from the core logo and the natural environment of the Antioquia region.

- **Primary Cyan (#00BCD4):** Represents the water and sky; used for primary actions, links, and key brand moments.
- **Secondary Tropical Green (#4CAF50):** Represents the lush vegetation; used for success states, booking confirmations, and eco-tourism callouts.
- **Sunset Accents (#FF9800 / #FFEB3B):** Used sparingly for urgent notifications, ratings, and "Limited Time" offers.
- **Deep Navy Neutral (#1A237E):** Sampled from the logo's typography; used for primary text and high-contrast footers to ensure professional weight.
- **Surface:** Clean white backgrounds are the standard, with subtle glassmorphic overlays (white at 70% opacity with 20px blur) used for floating cards and navigation bars over imagery.

## Typography

**Plus Jakarta Sans** is the sole typeface for this design system. Its soft curves and modern geometric construction bridge the gap between "friendly travel agency" and "professional tour operator."

- **Headlines:** Use Bold or ExtraBold weights. Large headlines should use tighter letter-spacing to feel more editorial and premium.
- **Body:** Standardized at 16px for optimal legibility. Use the Medium weight for emphasis rather than Italics to maintain a clean look.
- **Labels:** Uppercase tracking is applied to smaller labels to ensure hierarchy and clarity in dense booking forms.

## Layout & Spacing

The layout follows a **Fluid Grid** system based on an 8px root unit. 

- **Desktop (1280px+):** 12-column grid with 24px gutters. Content is centered with generous 48px outside margins.
- **Tablet (768px - 1024px):** 8-column grid with 20px gutters. 
- **Mobile (Up to 767px):** 4-column grid with 16px gutters and 16px margins. 

Spacing between sections should be aggressive (80px - 120px) to maintain a premium, airy feel. Card groups and related content should use 24px or 32px spacing.

## Elevation & Depth

This design system avoids harsh blacks and heavy shadows. Depth is created through:

1.  **Ambient Glows:** Soft, Cyan-tinted shadows for primary buttons and Green-tinted shadows for success elements.
2.  **Tonal Stacking:** Cards use a `1px` border in a very light grey (#F0F0F0) or the glassmorphism effect when placed over imagery.
3.  **Backdrop Blurs:** Essential for the "Premium Tropical" feel. Use a 16px-24px blur on navigation headers and floating booking widgets to maintain legibility while showcasing background scenery.

## Shapes

We use the **Rounded** (level 2) setting. This ensures that the UI feels approachable and safe, reflecting the hospitality industry. 

- **Standard Buttons/Inputs:** 8px (0.5rem) radius.
- **Cards/Containers:** 16px (1rem) radius.
- **Search Bars/Badges:** Pill-shaped (fully rounded) to distinguish them as interactive search or status elements.

## Components

### Buttons
- **Primary:** Solid Cyan (#00BCD4) with white text. Use a subtle Cyan glow on hover.
- **Secondary:** Solid Tropical Green (#4CAF50) with white text, reserved for "Book Now" or "Check Availability" actions.
- **Ghost:** Transparent background with a Cyan 2px border for less critical actions like "View Gallery."

### Cards
- **Tour Cards:** Feature full-bleed imagery at the top. The bottom half is white with a 1px soft border. Use a "Price Badge" in Sunset Orange floating in the top-right corner of the image.
- **Testimonial Cards:** Soft glassmorphism with a 20px blur and white 20% opacity background.

### Booking Components
- **Search Bar:** A large, pill-shaped floating widget. Icons (calendar, people, location) should be rendered in Cyan.
- **Availability Calendar:** Use Green for available dates and light grey for unavailable. The selected date should be Cyan with a white circular highlight.

### Inputs & Selects
- Use a 16px internal padding. Focus states should switch the border from light grey to Primary Cyan with a 2px stroke. Labels should always be visible above the input field using `label-md`.