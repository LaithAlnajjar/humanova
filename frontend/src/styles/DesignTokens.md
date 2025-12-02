# Humanova Design Tokens

## Colors

### Brand

- `humanova-olive` `#556B2F` — primary brand color
- `humanova-oliveDark` `#3B4B21` — darker accent
- `humanova-cream` `#EAD8B1` — soft background & glass tint
- `humanova-gold` `#C2A878` — highlight & accents

### Semantic (light mode)

- Text primary: `#111827`
- Text secondary: `#4B5563`
- Surface: `#FFFFFF` with glass overlays
- Border subtle: `rgba(148, 163, 184, 0.25)`

### Semantic (dark mode)

- Background base: `#000000`
- Background elevated: `#1A1F14` / `#1E1F1C`
- Text primary: `#F9FAFB`
- Text secondary: `#D1D5DB`
- Glass overlays: black with 40–70% opacity

## Glassmorphism

Utility:

- `.glass-panel`  
  - `background-color: rgba(255, 255, 255, 0.68)` (light)  
  - `backdrop-filter: blur(18px)`  
  - `border: 1px solid rgba(255, 255, 255, 0.45)`  
  - `box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18)`

In dark mode:

- `background-color: rgba(15, 23, 42, 0.78)`

## Typography

- Base font: **Inter**
- Arabic fallback: **Cairo**
- Base size: `14px` (`text-sm`)
- Headings:
  - H1: `text-3xl` / `text-4xl` (lg+)
  - H2: `text-2xl`
  - H3: `text-xl` / `text-lg`

## Spacing (Tailwind)

- `4px` → `1`
- `8px` → `2`
- `12px` → `3`
- `16px` → `4`
- `20px` → `5`
- `24px` → `6`
- `32px` → `8`
- `40px` → `10`
- `48px` → `12`

Hero padding:

- Mobile: `py-12`
- Desktop: `py-20`

## Radii & Elevation

- Small: `rounded-xl` (12px)
- Major cards / modals: `rounded-2xl` (16px)
- Hero / key panels: `rounded-3xl` (24px)

Elevation:

- Default card: `shadow-md`
- Glass panels: `shadow-xl` / `shadow-2xl` with soft blur

## Motion

Framer Motion defaults:

- Duration: `0.35s`–`0.55s`
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- Reveal: fade + `y: 20–24`
- Stagger: `0.05`–`0.08` seconds for list items

3D (when enabled):

- Float speed: ~`1.2`
- Rotation intensity: `0.6`
- Sparkles: 120–360 particles (depending on quality level)
