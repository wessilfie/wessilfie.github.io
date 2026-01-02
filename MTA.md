# NYC Subway (MTA) Theme - Product Requirements Document
**Version**: 1.0  
**Target Site**: essilfie.com  
**Date**: January 1, 2026

---

## 1. Objective
Implement the NYC Subway (MTA) theme as a complete visual transformation for `essilfie.com`. This theme must capture the iconic MTA aesthetic through high-contrast typography, the subway "bullet" system for navigation, heavy directional lines, authentic station signage, and the distinctive MTA logo treatment.

This is not just a color swap - it's a complete thematic reimagining that transforms the site into a digital subway station experience.

---

## 2. Technical Strategy

### Theme Activation
Use the existing design token system. Apply theme overrides when `[data-theme="nyc"]` is active.

**Theme Detection Priority:**
1. URL parameter: `?theme=nyc` (temporary session override)
2. Subdomain: `nyc.essilfie.com` (automatic activation)
3. localStorage preference (user's saved choice)
4. Default to existing theme if none of the above

### Implementation Approach
- All NYC-specific variables should be scoped under `[data-theme="nyc"]`
- Preserve all existing theme toggle functionality
- Ensure theme persists across page navigation
- No breaking changes to current Sydney Metro or Sea-Tac Airport themes

---

## 3. NYC Theme Specification

### A. Color Palette (Official MTA Standards)

| Variable | Value | MTA Line | Purpose |
|----------|-------|----------|---------|
| `--brand-bg` | `#FFFFFF` | — | Site background (stark white) |
| `--brand-text` | `#000000` | — | Primary text (high contrast black) |
| `--bullet-red` | `#EE352E` | 1, 2, 3 Lines | Header navigation |
| `--bullet-blue` | `#0039A6` | A, C, F Lines | Projects section |
| `--bullet-yellow` | `#FCCC0A` | Q Line | Writing section |
| `--bullet-light-green` | `#6CBE45` | G Line | Contact section |
| `--bullet-text-dark` | `#000000` | — | Text inside yellow bullets |
| `--bullet-text-light` | `#FFFFFF` | — | Text inside red/blue/green bullets |
| `--divider-black` | `#000000` | — | Section dividers (3px solid) |
| `--station-sign-bg` | `#000000` | — | Station sign background |
| `--station-sign-text` | `#FFFFFF` | — | Station sign text |
| `--station-sign-border` | `#FFFFFF` | — | Station sign border (2px) |

### B. Typography

**Font Family:**
- Primary: `'Helvetica Neue', Helvetica, Arial, sans-serif`
- Logo: `'Helvetica Black Condensed', 'Arial Black', sans-serif` (with italic slant)
- Fallback system: Ensure Arial serves as universal fallback

**Weight Mapping:**
- `--font-heading`: `700` (Bold) - Used for all headings and station names
- `--font-body`: `400` (Regular) - Used for body text and descriptions
- `--font-logo`: `900` (Black) - Used for MTA-style logo

**Type Scale:**
- Keep tight letter-spacing on headings (tracking: -0.02em) for that compressed MTA feel
- Ensure all body text meets WCAG AA contrast requirements (4.5:1 minimum on white)

### C. MTA Subway Bullet System

The subway bullet is the most iconic element of the MTA visual language. Each section of the site gets a specific line designation.

#### Line Assignments

| Section | Bullet Letter/Number | Color Variable | Line Name |
|---------|---------------------|----------------|-----------|
| Header / Name | Random from: 1, 2, 3 | `--bullet-red` | Broadway-Seventh Avenue |
| Projects | Random from: A, C, F | `--bullet-blue` | Eighth Avenue |
| Writing | Q | `--bullet-yellow` | Broadway Express |
| Contact | G | `--bullet-light-green` | Crosstown Local |

**Selection Logic:**
- On page load, randomly select one line from each group
- Selection should persist for the session (store in sessionStorage)
- This adds authenticity - real NYC subway stations show different line combinations

#### Bullet Component Specification

```css
.mta-bullet {
  display: inline-flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 18px;
  margin-right: 12px;
  border: 2px solid #000000; /* Critical for authenticity */
  flex-shrink: 0; /* Prevent squishing on mobile */
}

/* Color variants */
.mta-bullet.red {
  background-color: var(--bullet-red);
  color: var(--bullet-text-light);
}

.mta-bullet.blue {
  background-color: var(--bullet-blue);
  color: var(--bullet-text-light);
}

.mta-bullet.yellow {
  background-color: var(--bullet-yellow);
  color: var(--bullet-text-dark); /* Black text for contrast */
  border-color: #000000;
}

.mta-bullet.light-green {
  background-color: var(--bullet-light-green);
  color: var(--bullet-text-light);
}
```

**Mobile Responsive:**
- Reduce to 28px on screens < 768px
- Reduce font-size to 16px proportionally
- Maintain 2px border at all sizes

### D. Layout & Structural Elements

#### Section Dividers
Replace any thin border lines with heavy MTA-style dividers:
```css
border-top: 3px solid var(--divider-black);
```

These should appear between major sections to mimic the thick lines on MTA station signage and platform edges.

#### Navigation Arrows
Any directional arrows (next/previous, scroll indicators, etc.) should be transformed into MTA-style directional markers:
- White arrow glyph inside a 32px × 32px black square
- No border-radius (sharp corners, not rounded)
- Use `→` or `←` Unicode characters, or SVG arrows
- Background: `#000000`, Color: `#FFFFFF`

#### Station Sign Component (Top Right)
The most prominent MTA element - replaces the current "Platform X" indicator.

**Visual Reference:** Black rectangular sign with white text and colored bullet, similar to "125 Street Station" signage throughout NYC subway.

```html
<div class="station-sign">
  <span class="mta-bullet red">1</span>
  <span class="station-name">125 Street</span>
</div>
```

```css
.station-sign {
  background: var(--station-sign-bg);
  color: var(--station-sign-text);
  border: 2px solid var(--station-sign-border);
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  border-radius: 0; /* Sharp corners - no rounding */
}

.station-sign .mta-bullet {
  margin-right: 0; /* Gap handles spacing */
  border-color: var(--station-sign-border); /* White border on black bg */
}

.station-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 18px;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .station-sign {
    flex-direction: column;
    padding: 8px 12px;
    gap: 8px;
  }
  
  .station-name {
    font-size: 14px;
  }
}
```

**Content:**
- Line: Randomly selected from 1, 2, or 3 (red bullets)
- Station: Always "125 Street" (static, not dynamic)
- Position: Top right corner of the site header

---

## 4. Header Transformation

The header receives the most dramatic changes to achieve authentic MTA branding.

### 4.1. MTA-Style Logo Avatar

**Current State:** Circular "WE" badge with theme-specific colors

**NYC Theme State:** Circular logo matching the official MTA design

**Requirements:**
1. Create new SVG: `assets/images/logo-nyc.svg`
2. Design specs:
   - Black circle background (`#000000`)
   - White "WE" text using Helvetica Black Condensed
   - Text should have italic slant matching MTA logo (approx. 12-15° skew)
   - If Helvetica Black Condensed is unavailable, use Arial Black with `transform: skewX(-12deg)`
   - Maintain current avatar dimensions (appears to be ~80-100px diameter)
   - Ensure "WE" text is centered and legible at small sizes

3. Update theme logic to swap logo source:
```javascript
if (theme === 'nyc') {
  logoElement.src = '/assets/images/logo-nyc.svg';
} else if (theme === 'sydney') {
  logoElement.src = '/assets/images/logo-sydney.svg';
}
// etc.
```

**Design Note:** The MTA logo's distinctive italic slant is essential. Don't just use regular Helvetica - the slant creates the iconic look.

### 4.2. Location Text Update

**Current:** "via New York, NY" (or current location)

**NYC Theme:** "Downtown & Brooklyn"

This mimics the directional signage found on NYC subway platforms (e.g., "Uptown & The Bronx", "Downtown & Brooklyn").

**Implementation:**
- Replace location text when `[data-theme="nyc"]` is active
- Typography should match body text (Helvetica Regular)
- No special styling needed - keep it simple and readable

### 4.3. Name Bullets

Add subway bullets before the site sections in navigation:

| Navigation Item | Before | After |
|----------------|--------|-------|
| Will Essilfie (Header) | `Will Essilfie` | `[1] Will Essilfie` (random: 1, 2, or 3) |
| Projects | `Projects` | `[A] Projects` (random: A, C, or F) |
| Writing | `Writing` | `[Q] Writing` |
| Contact | `Contact` | `[G] Contact` |

Where `[X]` represents the actual circular bullet component (not literal brackets).

**Implementation Strategy:**
Use CSS `::before` pseudo-elements to inject bullets without template changes:

```css
[data-theme="nyc"] .nav-item.home::before {
  content: '';
  display: inline-block;
  width: 32px;
  height: 32px;
  background-color: var(--bullet-red);
  border: 2px solid #000000;
  border-radius: 50%;
  margin-right: 12px;
  /* Add line number via background image or additional pseudo-element */
}
```

Alternatively, if the template is easily accessible, add the bullet HTML directly for cleaner implementation.

---

## 5. Claude Code Task Checklist

### Task 0: Generate MTA Logo Asset
**Priority: HIGH** - This is a visual dependency for the entire theme

- [ ] Create SVG file: `assets/images/logo-nyc.svg`
- [ ] Black circle, white "WE" text
- [ ] Apply italic slant (skew transform) to match MTA logo aesthetic
- [ ] Test at multiple sizes (80px, 100px, 120px) for crispness
- [ ] Ensure accessibility: Add appropriate `aria-label` when used in HTML

### Task 1: Define NYC Theme Variables
**Priority: HIGH** - Foundation for all other tasks

- [ ] Create `[data-theme="nyc"]` CSS block in main stylesheet
- [ ] Define all color variables from Section 3.A
- [ ] Define typography variables from Section 3.B
- [ ] Set `background-color: var(--brand-bg)` on `body` or main container
- [ ] Set `color: var(--brand-text)` for default text color
- [ ] Test that theme switching doesn't break layout

### Task 2: Implement Bullet Component System
**Priority: HIGH** - Core visual element

- [ ] Add `.mta-bullet` base styles (Section 3.C)
- [ ] Add color variant classes: `.red`, `.blue`, `.yellow`, `.green`
- [ ] Ensure 2px black border on all bullets
- [ ] Add mobile responsive scaling (@media queries)
- [ ] Implement random line selection logic:
  - [ ] Create JavaScript function to randomly select from allowed lines
  - [ ] Store selections in `sessionStorage` for persistence
  - [ ] Inject appropriate bullet HTML or update data attributes
- [ ] Test yellow bullet has sufficient contrast (black text on `#FCCC0A`)
- [ ] Verify bullets render correctly on both light and dark backgrounds

### Task 3: Build Station Sign Component
**Priority: HIGH** - Signature MTA element

- [ ] Create HTML structure (Section 3.D - Station Sign Component)
- [ ] Implement CSS styling with black background, white border
- [ ] Add randomly selected red line bullet (1, 2, or 3)
- [ ] Set static text: "125 Street"
- [ ] Position in top-right corner of header
- [ ] Add mobile responsive behavior (stack vertically)
- [ ] Test at multiple viewport widths

### Task 4: Transform Header Elements
**Priority: MEDIUM** - Completes the MTA identity

- [ ] Swap logo to `logo-nyc.svg` when theme is active
- [ ] Update location text to "Downtown & Brooklyn"
- [ ] Add bullets before navigation items (Section 4.3):
  - [ ] Home/Header: Random red line (1, 2, 3)
  - [ ] Projects: Random blue line (A, C, F)
  - [ ] Writing: Q (yellow)
  - [ ] Contact: G (green)
- [ ] Ensure bullets align properly with text
- [ ] Test navigation bullet visibility on mobile

### Task 5: Update Structural Elements
**Priority: MEDIUM** - Polish and authenticity

- [ ] Replace thin section dividers with 3px black borders
- [ ] Update navigation arrows to black square style (if applicable)
- [ ] Ensure all directional indicators match MTA aesthetic
- [ ] Remove any rounded corners that conflict with MTA's sharp geometry
- [ ] Test dividers are visible against white background

### Task 6: Theme Toggle Integration
**Priority: MEDIUM** - User experience

- [ ] Update `theme-toggle.js` to support `nyc` value
- [ ] Add NYC Subway option to theme picker UI (if exists)
- [ ] Ensure theme persists in localStorage
- [ ] Test URL parameter `?theme=nyc` override
- [ ] Test subdomain `nyc.essilfie.com` activation (if applicable)
- [ ] Verify theme switching animates smoothly (no flash of unstyled content)

### Task 7: Accessibility & Testing
**Priority: MEDIUM** - Critical for production

- [ ] Verify all text meets WCAG AA contrast (4.5:1 minimum)
- [ ] Test with screen readers:
  - [ ] Bullets should not be read as decorative elements
  - [ ] Station sign should announce as "125 Street Station, 1 train"
- [ ] Test keyboard navigation still works
- [ ] Verify focus states are visible on white background
- [ ] Test at common viewport sizes:
  - [ ] Mobile: 375px, 414px
  - [ ] Tablet: 768px, 1024px
  - [ ] Desktop: 1280px, 1920px
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)

### Task 8: Performance & Polish
**Priority: LOW** - Nice to have

- [ ] Optimize SVG logo file size
- [ ] Ensure no layout shift when bullets load
- [ ] Lazy load NYC-specific assets if possible
- [ ] Add smooth transitions between themes
- [ ] Consider adding subtle hover states on bullets (slight scale/glow)
- [ ] Add easter eggs:
  - [ ] "Stand clear of the closing doors" message somewhere?
  - [ ] Subway sounds on interactions?
  - [ ] Animated train passing transition?

---

## 6. Success Criteria

The NYC theme implementation is complete when:

### Visual Fidelity
- ✅ Site background is stark white (`#FFFFFF`)
- ✅ All text is high-contrast black (`#000000`)
- ✅ Logo avatar matches MTA circular style with italic "WE"
- ✅ Every navigation section has an appropriate colored subway bullet
- ✅ Yellow Q bullet has black text for readability
- ✅ Station sign displays "125 Street" with a random red line bullet
- ✅ All bullets have 2px black borders
- ✅ Section dividers are 3px solid black
- ✅ No Sydney Metro orange or Sea-Tac Airport red is visible

### Technical Requirements
- ✅ Theme activates via URL parameter `?theme=nyc`
- ✅ Theme persists across page navigation (localStorage)
- ✅ Theme can be toggled without page refresh
- ✅ All existing themes (Sydney, Sea-Tac) remain functional
- ✅ No console errors or warnings
- ✅ No layout shifts or visual glitches during theme change

### User Experience
- ✅ All interactive elements have visible focus states
- ✅ Text is readable at all viewport sizes
- ✅ Bullets don't break layout on mobile
- ✅ Station sign stacks appropriately on narrow screens
- ✅ Theme switcher UI (if present) shows "NYC Subway" option
- ✅ Loading the theme feels instant (< 100ms switch time)

### Accessibility
- ✅ All text meets WCAG AA contrast requirements
- ✅ Screen readers announce bullets appropriately
- ✅ Keyboard navigation works perfectly
- ✅ No reliance on color alone to convey information
- ✅ Focus indicators are clearly visible

### Authenticity
- ✅ Design evokes the unmistakable feeling of NYC subway signage
- ✅ Typography matches MTA standards (Helvetica, tight tracking)
- ✅ Color usage is accurate to real subway lines
- ✅ Layout choices reflect the utilitarian, high-information density of actual stations
- ✅ Overall experience feels like navigating a well-designed subway station

---

## 7. Reference Materials

### Official MTA Color Standards
- Red (1/2/3): `#EE352E` (PMS 185)
- Blue (A/C/E): `#0039A6` (PMS 286)
- Yellow (N/Q/R/W): `#FCCC0A` (PMS 116)
- Green (4/5/6): `#00933C` (PMS 342)

### Typography
- Primary: Helvetica (with Arial fallback)
- Logo: Helvetica Black Condensed (with skew transform)

### Design Principles
- **High Contrast:** Black on white, no grays
- **Geometric Precision:** Sharp corners, perfect circles
- **Information Density:** Pack in details without clutter
- **Wayfinding First:** Every element should guide the user
- **Utilitarian Beauty:** Form follows function, but beauty emerges from clarity

### Key Visual Elements
1. Circular subway bullets with thick black borders
2. Black rectangular station signs with white borders
3. Heavy 3px divider lines
4. Italic-slanted MTA logo typography
5. Directional language ("Downtown & Brooklyn")

---

## 8. Notes & Considerations

### Why This Approach?
The MTA visual system is one of the most iconic examples of wayfinding design in the world. By faithfully implementing its core principles, we create a theme that's:
- Instantly recognizable to anyone who's been to NYC
- Highly functional (MTA design is optimized for clarity)
- Aesthetically bold without being gimmicky
- Rooted in real-world design history

### Future Enhancements (Out of Scope)
- Animated train transitions between pages
- Subway sounds on click/hover
- "Live" arrival times based on actual MTA data
- Interactive subway map for site navigation
- Different stations for different pages (125th for home, Times Sq for projects, etc.)
- Metropolitan Museum of Art integration (another NYC icon)

### Browser Support
- Modern browsers (last 2 versions of Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers (Sydney theme as fallback)
- No IE11 support required

### Performance Targets
- Theme switch: < 100ms
- Logo SVG: < 5KB
- Total CSS overhead for NYC theme: < 15KB
- No blocking resources
- No layout shift (CLS = 0)

---

## 9. Appendix: MTA Line Reference

For quick reference when implementing:

| Line | Color | Hex | Trains |
|------|-------|-----|--------|
| Broadway-Seventh Ave | Red | `#EE352E` | 1, 2, 3 |
| Eighth Avenue | Blue | `#0039A6` | A, C, F |
| Broadway Express | Yellow | `#FCCC0A` | Q |
| Crosstown Local | Light Green | `#6CBE45` | G |

**Note:** We're using a subset of MTA lines to keep the theme focused and avoid overwhelming users with too many color options.

---

**End of PRD**

