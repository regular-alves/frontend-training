# Bug Hunt: Practical Code Review Exercise

## Overview

A Sunbytes conference landing page ("Sunbytes Conf 2026") with **intentional errors** that violate best practices from the three training pillars. The goal is to identify and fix the problems.

**Characteristics:**
- The page **works visually**, but doesn't follow best practices
- Some errors make the page **visibly ugly** (clashing colors, inconsistent spacing)
- Other errors are **standardization issues** (works, but uses arbitrary values instead of tokens)
- **Measurable difference in Lighthouse** before/after corrections
- Errors with **multiple difficulty levels**

---

## Stack

- **HTML5** + **Tailwind 3.x** + **Vanilla JS**
- **Google Fonts** via preconnect
- **Playwright** for visual regression testing
- Images via **placehold.co**

---

## Project Structure

```
exercises/
├── ESCOPO.md                   # This document
├── 1.1-core-web-vitals.md
├── 1.2-design-tokens.md
├── 2.1-css-architecture.md
├── 2.2-semantic-html.md
├── 2.3-wcag-compliance.md
├── 2.4-wai-aria.md
├── 3.1-js-scoping.md
├── 3.2-visual-regression.md
│
└── bug-hunt/
    ├── broken/                 # Version with errors
    │   ├── index.html
    │   ├── src/
    │   │   ├── styles.css
    │   │   └── scripts.js
    │   ├── tailwind.config.js
    │   ├── package.json
    │   └── playwright.config.js
    │
    ├── fixed/                  # Corrected version (answer key)
    │   └── (same structure)
    │
    ├── tests/
    │   └── visual.spec.js
    │
    └── CHALLENGE.md
```

---

## Landing Page Sections

| Section | Components | Interactivity |
|---------|------------|---------------|
| **Header** | Logo + Nav (4 items) | - |
| **Hero** | Title + Subtitle + CTA + Image | Opens modal |
| **Speakers** | Grid with cards (photo + name + role) | - |
| **Schedule** | Tabs (3 days) + Content | Tab switching |
| **FAQ** | Accordion (questions/answers) | Expand/collapse |
| **Newsletter** | Input + Button | Validation |
| **Footer** | Copyright | - |
| **Modal** | Registration form + Close | Open/close |

---

## Errors by Pillar

### Pillar 1: Design Infrastructure & Performance
*~10 errors | Focus: Web Vitals and Design Tokens*

| Subtopic | File | Errors |
|----------|------|--------|
| [Core Web Vitals (LCP, CLS, INP)](./1.1-core-web-vitals.md) | index.html, styles.css | 7 |
| [Design Tokens](./1.2-design-tokens.md) | styles.css | 3 |

---

### Pillar 2: Modern Layout & Accessibility
*~14 errors | Focus: CSS Architecture, Semantics, and WCAG*

| Subtopic | File | Errors |
|----------|------|--------|
| [CSS Architecture](./2.1-css-architecture.md) | styles.css | 3 |
| [Semantic HTML](./2.2-semantic-html.md) | index.html | 4 |
| [WCAG Compliance](./2.3-wcag-compliance.md) | index.html, styles.css | 4 |
| [WAI-ARIA Patterns](./2.4-wai-aria.md) | index.html, scripts.js | 3 |

---

### Pillar 3: Interactivity & Resilience
*~6 errors | Focus: JS Scoping and Visual Regression*

| Subtopic | File | Errors |
|----------|------|--------|
| [JS Scoping](./3.1-js-scoping.md) | scripts.js | 4 |
| [Visual Regression](./3.2-visual-regression.md) | tests/ | 2 |

---

## Difficulty Distribution

| Difficulty | Count | Profile |
|------------|-------|---------|
| **Easy** | ~8 | Obvious errors, "low-hanging fruit" |
| **Medium** | ~10 | Requires inspection or audit |
| **Hard** | ~10 | Subtle, requires specific knowledge |

**Principle:** The easier, the less voluminous. Easy errors are few and obvious. Hard errors are more numerous and subtle.

---

## tailwind.config.js

The config is **identical** in both `broken/` and `fixed/` versions. Tokens are correctly defined:

```js
module.exports = {
  content: ['./**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        dark: '#1e1b4b',
        muted: '#64748b',
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
        'card': '1.5rem',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

The difference is that the `broken/` version **ignores these tokens** and uses arbitrary values.

---

## Validation Checklist

### Performance (Lighthouse)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Performance score > 90

### Accessibility (axe DevTools / WAVE)
- [ ] Zero critical errors
- [ ] AA contrast on all text
- [ ] 100% keyboard navigable (Tab/Enter/Esc)
- [ ] Screen reader friendly

### Code
- [ ] Zero `!important` in CSS
- [ ] CSS organized with `@layer`
- [ ] Container queries where appropriate
- [ ] Zero magic values (uses config tokens)
- [ ] Zero global `document.querySelector`
- [ ] Semantic HTML validated (W3C Validator)
- [ ] Correct ARIA patterns on interactive components

### Visual Regression
- [ ] Playwright tests passing
- [ ] Snapshots updated

---

## How to Use

1. Install dependencies: `cd bug-hunt/broken && npm install`
2. Run the project: `npm run dev`
3. Audit with Lighthouse, axe, WAVE
4. Navigate by keyboard (Tab, Enter, Esc)
5. Inspect code and identify errors
6. Implement corrections
7. Compare results with `fixed/` version
8. Run tests: `npm run test`

---

## Recommended Tools

| Tool | Use |
|------|-----|
| **Chrome DevTools** | Performance, Layout Shift debugging |
| **Lighthouse** | Performance and A11y audit |
| **axe DevTools** | Accessibility extension |
| **WAVE** | Visual accessibility evaluator |
| **W3C Validator** | Semantic HTML validation |
| **WebAIM Contrast Checker** | Contrast checker |
| **Playwright** | Visual regression testing |
