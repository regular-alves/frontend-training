# Sunbytes Conf 2026: Bug Hunt Challenge

Welcome, future Web Vitals hero!

You've been given access to the codebase for the "Sunbytes Conf 2026" landing page. This page, found in the `broken/` directory, has been intentionally crafted with numerous errors that violate modern web development best practices across three core pillars: **Design Infrastructure & Performance**, **Modern Layout & Accessibility**, and **Interactivity & Resilience**.

Your mission, should you choose to accept it, is to:
1.  **Identify** all the bugs.
2.  **Understand** *why* they are bugs and which best practice they violate.
3.  **Fix** them in the `fixed/` directory.

---

## Your Goal

Transform the `broken/` version of the landing page into the `fixed/` version, adhering to the highest standards of web development. The `fixed/` version should serve as a model of a well-optimized, accessible, and robust web page.

---

## Challenge Areas (Pillars)

### Pillar 1: Design Infrastructure & Performance
*   **Focus**: Core Web Vitals (LCP, CLS, INP) and effective use of Design Tokens.
*   **Hint**: Look for issues like slow loading, layout shifts, unresponsive interactions, and arbitrary values where design tokens should be used.

### Pillar 2: Modern Layout & Accessibility
*   **Focus**: CSS Architecture, Semantic HTML, WCAG Compliance, and WAI-ARIA Patterns.
*   **Hint**: Check for `!important` flags, non-semantic HTML tags, accessibility standard violations (contrast, keyboard navigation), and incorrect ARIA implementations on interactive components.

### Pillar 3: Interactivity & Resilience
*   **Focus**: Efficient JavaScript Scoping, Event Handling, and robust behavior.
*   **Hint**: Look for global variables, direct DOM manipulation, lack of event delegation, and absence of proper error handling. Also, consider the impact on visual regression tests.

---

## Validation Checklist (Your Targets for the `fixed/` version)

Your `fixed/` version should achieve:

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
- [ ] Container queries where appropriate (if applicable for your fixes)
- [ ] Zero magic values (uses config tokens from `tailwind.config.js`)
- [ ] Zero global `document.querySelector`
- [ ] Semantic HTML validated (W3C Validator)
- [ ] Correct ARIA patterns on interactive components

### Visual Regression
- [ ] Playwright tests passing (after fixing visual regressions introduced by bugs)
- [ ] Snapshots updated (once the `fixed/` version is deemed correct)

---

## How to Approach

1.  **Start with `broken/`**:
    *   Install dependencies: `cd exercises/bug-hunt && npm install`
    *   Run the project: `npm run dev` (from `exercises/bug-hunt/broken/` if you only want to build `broken` or from `exercises/bug-hunt/` if you setup `package.json` with scripts for root postcss).
    *   Open `broken/index.html` in your browser.
    *   **Audit**: Use browser DevTools, Lighthouse, axe DevTools, WAVE to find issues.
    *   **Interact**: Navigate by keyboard, try out all interactive elements.
    *   **Inspect**: Dive into the code (`index.html`, `src/styles.css`, `src/scripts.js`) to spot code-level violations.

2.  **Fix in `fixed/`**:
    *   Create corresponding files in `fixed/` and implement your solutions.
    *   Run `npm run dev` in `fixed/` to compile your CSS.
    *   Test continuously!

3.  **Validate**:
    *   Once you believe `fixed/` is complete, audit it against the validation checklist.
    *   Run the Playwright visual regression tests: `npx playwright test` (from `exercises/bug-hunt/`). The tests will run against both `broken` and `fixed` projects. You will need to review the visual differences.

---

## Recommended Tools

*   **Chrome DevTools**: Performance (Lighthouse, Performance tab), Layout Shift debugging, Console, Elements.
*   **Lighthouse**: Integrated audit for Performance, Accessibility, SEO, Best Practices.
*   **axe DevTools**: Browser extension for detailed accessibility analysis.
*   **WAVE**: Web Accessibility Evaluation Tool for visual accessibility assessment.
*   **W3C Markup Validation Service**: Online tool to validate HTML semantics.
*   **WebAIM Contrast Checker**: Tool to verify color contrast ratios.
*   **Playwright**: For setting up and running visual regression tests.

Good luck, and may your code be clean, fast, and accessible!
