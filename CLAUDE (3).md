# CLAUDE.md — Laith's Interactive Science Study App

## Project Overview

A single self-contained HTML file that serves as an interactive science study platform for **Laith**, a 9-year-old Grade 3 student. The app lives at `laith_science_app.html` and is deployed as a static file (no server, no build step).

**Live URL:** _(update this when deployed, e.g. https://laith-science.netlify.app)_

---

## App Architecture

### Single-file structure
Everything lives in one `.html` file:
- CSS in `<style>` block (CSS variables, dark theme, animations)
- HTML layout (sidebar + main content area)
- JavaScript at bottom (nav routing, quiz engine, print logic)

### Layout system
```
.app-shell
├── .sidebar          ← Chapter nav (collapsible groups)
│   ├── .chapter-group (one per chapter)
│   │   ├── .chapter-header (clickable toggle)
│   │   └── .chapter-items
│   │       ├── nav-item: Learn & Study Guide
│   │       ├── nav-item: Quiz Time
│   │       └── nav-item: Printable Worksheet
│   └── .sidebar-footer
└── .main
    ├── .topbar       ← Breadcrumb + stars badge
    └── .content-area
        └── .section-panel × N  ← one per nav item, toggled via JS
```

### Panel naming convention
Every section panel ID follows the pattern: `panel-{chapterKey}-{sectionKey}`
Every nav item ID: `nav-{chapterKey}-{sectionKey}`

Example for chapter 4.2:
- `panel-42-learn`, `panel-42-quiz`, `panel-42-print`
- `nav-42-learn`, `nav-42-quiz`, `nav-42-print`

Breadcrumbs are registered in the `BREADCRUMBS` JS object:
```js
const BREADCRUMBS = {
  '42-learn': 'Chapter 4.2 › <strong>Learn & Study Guide</strong>',
  '42-quiz':  'Chapter 4.2 › <strong>Quiz Time</strong>',
  '42-print': 'Chapter 4.2 › <strong>Printable Worksheet</strong>',
};
```

---

## Design System

### Theme
- **Light mode** throughout — clean, bright, friendly for kids
- Font: `Baloo 2` (headings/display) + `Nunito` (body)
- Both loaded from Google Fonts

### CSS Variables (root)
```css
--bg: #F4F6FB            /* page background — soft blue-grey */
--sidebar-bg: #FFFFFF    /* sidebar — pure white */
--card: #FFFFFF          /* card background */
--card2: #F8FAFC         /* secondary card — very light grey */
--border: #E2E8F0        /* borders — light slate */

--blue: #2563EB          /* primary accent */
--green: #16A34A         /* correct / quiz */
--yellow: #D97706        /* stars / highlights (amber, readable on white) */
--coral: #EA580C         /* print / CTA */
--purple: #7C3AED        /* translucent concept */
--teal: #0891B2          /* transparent concept */

--text: #1E293B          /* primary text — dark slate */
--text-dim: #64748B      /* secondary text */
--text-dimmer: #94A3B8   /* muted text */
```

### Color coding per concept
| Concept      | Color      | Variable    |
|--------------|------------|-------------|
| Opaque       | Steel grey | `#90A4AE`   |
| Transparent  | Teal/cyan  | `--teal`    |
| Translucent  | Purple     | `--purple`  |
| Shadow       | Yellow     | `--yellow`  |
| Quiz/correct | Green      | `--green`   |
| Print        | Coral      | `--coral`   |

### Animations used
- `fadeUp` — panel entrance animation
- `pulse-src` — light source pulsing glow
- `beam-pulse` — light beam breathing
- `glass-shimmer` — transparent panel shimmer
- `shadow-breathe` — shadow opacity oscillation
- `bounce` — trophy animation on result screen
- `person-sway` — character in shadow scene

---

## How to Add a New Chapter

### Step 1 — Add sidebar entry
```html
<div class="chapter-group">
  <div class="chapter-header" id="ch{KEY}-header" onclick="toggleChapter('{KEY}')">
    <div class="ch-icon" style="background:rgba(63,185,80,0.1)">🌊</div>
    <div><div class="ch-title">5.1 Your Chapter Title</div></div>
    <span class="ch-arrow">▶</span>
  </div>
  <div class="chapter-items" id="ch{KEY}-items">
    <div class="nav-item" id="nav-{KEY}-learn" onclick="showSection('{KEY}-learn')">
      <span class="ni-dot"></span> Learn & Study Guide
    </div>
    <div class="nav-item" id="nav-{KEY}-quiz" onclick="showSection('{KEY}-quiz')">
      <span class="ni-dot"></span> Quiz Time
    </div>
    <div class="nav-item" id="nav-{KEY}-print" onclick="showSection('{KEY}-print')">
      <span class="ni-dot"></span> Printable Worksheet
    </div>
  </div>
</div>
```
Replace `{KEY}` with a short identifier, e.g. `51` for chapter 5.1.

### Step 2 — Add section panels (inside `.content-area`)
Copy and adapt the three panel blocks:
```html
<div class="section-panel" id="panel-{KEY}-learn"> ... </div>
<div class="section-panel" id="panel-{KEY}-quiz">  ... </div>
<div class="section-panel" id="panel-{KEY}-print"> ... </div>
```

### Step 3 — Register breadcrumbs in JS
```js
const BREADCRUMBS = {
  // existing...
  '{KEY}-learn': 'Chapter 5.1 › <strong>Learn & Study Guide</strong>',
  '{KEY}-quiz':  'Chapter 5.1 › <strong>Quiz Time</strong>',
  '{KEY}-print': 'Chapter 5.1 › <strong>Printable Worksheet</strong>',
};
```

### Step 4 — Add quiz questions array
Each chapter needs its own questions array and quiz state variables. Follow the pattern of `QUESTIONS` / `initQuiz()` / `loadQ()` etc., namespaced per chapter (e.g. `QUESTIONS_51`, `initQuiz51()`), or refactor to a generic quiz engine that takes a questions array as parameter.

---

## Learn Section Content Checklist

Each chapter's Learn panel should cover:
- [ ] **Chapter hero** with badge, title, description, objective chips
- [ ] **Concept cards** for every key idea (one `.concept-card` per concept)
- [ ] **At least one CSS animation demo** per concept (`.demo-stage`)
- [ ] **Tap-to-flip flashcards** (`.flashcards-row` with `.flip-card`) for vocabulary
- [ ] **Quick comparison table** if there are multiple related concepts
- [ ] **Examples chips** for each concept
- [ ] **Summary box** at the end (green background, bullet list)
- [ ] **"Take the Quiz" CTA button** at the bottom

### CSS Animation Demo pattern
```html
<div class="demo-stage {concept}-demo">
  <div class="light-source">☀️</div>
  <!-- Add beam, object, and result elements here -->
  <!-- Use absolute positioning within the stage -->
</div>
<div class="demo-legend">
  <div class="legend-chip"><div class="legend-dot" style="background:#FFB300"></div>Label</div>
</div>
```
Demo stage is `position:relative`, `background:#080C10`, `min-height:140px`.
All children use `position:absolute` with `top:50%; transform:translateY(-50%)` for vertical centering.

---

## Quiz Engine

### Questions array format
```js
const QUESTIONS = [
  {
    q: "Question text here?",
    emoji: "🔦",           // displayed above question
    opts: ["A", "B", "C", "D"],  // exactly 4 options
    ans: 2,                // 0-indexed correct answer
    fb: "✅ Explanation shown after answering"
  },
  // ...
];
```

### Quiz state variables
```js
let qCurrent = 0;   // current question index
let qScore = 0;     // number correct
let qStars = 0;     // same as score (1 star per correct answer)
let qAnswered = false;
let qResults = [];  // array of {correct, correctAns, num}
```

### Key functions
- `initQuiz()` — resets state, hides result screen, calls `loadQ()`
- `loadQ()` — renders current question and options
- `selectAnswer(idx)` — handles answer selection, shows feedback
- `nextQ()` — advances or calls `showResults()`
- `showResults()` — shows trophy, score, star rating, review grid

### Star rating thresholds
| Score | Trophy | Stars |
|-------|--------|-------|
| 10/10 | 🏆 | ⭐⭐⭐⭐⭐ |
| 8-9   | 🥇 | ⭐⭐⭐⭐ |
| 6-7   | 🥈 | ⭐⭐⭐ |
| 0-5   | 📚 | ⭐⭐ |

---

## Worksheet / Print Section

### Structure
- Print button → `printWorksheet()` opens a new tab and triggers `window.print()`
- Answer key toggle → `toggleAnswers()` shows/hides a hidden div
- Worksheet preview is regular HTML styled to look like a printed page
- Parts: Fill in blanks, Classify, True/False, Short Answer

### Adding a new worksheet
Clone the `#worksheet-content` div, give it a new id, update `printWorksheet()` to reference the correct element.

---

## iPad / Mobile Notes

- `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">`
- `<meta name="apple-mobile-web-app-capable" content="yes">` — add to home screen support
- Sidebar is hidden on mobile, toggled via hamburger `☰` button
- `.sidebar-overlay` covers screen behind open sidebar on mobile
- All tap targets ≥ 44px height for comfortable iPad use
- Flashcards use tap (click) to flip — works perfectly on touch screens
- Font sizes use rem, layout uses CSS Grid/Flex — fully responsive

### Breakpoints
```css
@media (max-width: 768px) { /* tablet/mobile — sidebar becomes drawer */ }
@media (max-width: 480px) { /* small phone — single column flashcards */ }
```

---

## Deployment

### Recommended: Netlify Drop
1. Go to **netlify.com/drop**
2. Drag `laith_science_app.html` onto the page
3. Get instant URL (e.g. `https://amazing-name-123.netlify.app`)
4. Optional: rename site in Netlify dashboard to something memorable
5. Share link with Laith on iPad — opens in Safari, works perfectly

### Alternative: GitHub Pages
1. Create repo (e.g. `laith-science`)
2. Upload file as `index.html`
3. Settings → Pages → Source: main branch
4. URL: `https://{username}.github.io/laith-science`

### Alternative: iCloud Drive (offline)
1. Save `laith_science_app.html` to iCloud Drive
2. Open Files app on iPad → tap the file → opens in Safari
3. No internet needed after first font load

### Note on fonts
Google Fonts are loaded via CDN. If offline use is needed, download and embed the font files as base64 in the `<style>` block. Ask Claude to do this if needed.

---

## File Naming Convention

```
laith_science_app.html        ← main app (this file)
CLAUDE.md                     ← this file
laith_science_worksheet.pdf   ← legacy standalone worksheet (superseded by in-app print)
laith_study_guide.pdf         ← legacy standalone study guide (superseded by Learn section)
```

---

## Student Profile

- **Name:** Laith
- **Age:** 9 years old
- **Grade:** 3
- **Device:** iPad (Safari)
- **Language:** English
- **Subject:** Science

### Content tone guidelines
- Use simple, short sentences — avoid jargon
- Add emojis liberally — they aid memory for kids
- Bold key vocabulary words
- Use analogies from daily life (books, lamps, windows, sandwiches)
- Animations should be obvious and satisfying, not subtle
- Feedback should always be encouraging, even for wrong answers
- Quiz explanations should teach, not just say "correct/wrong"

---

## Current Chapters

| Key  | Chapter | Status   |
|------|---------|----------|
| `42` | 4.2 Light & Matter | ✅ Complete |
| —    | Next chapter | 🔲 Placeholder |
| —    | Next chapter | 🔲 Placeholder |

---

## Quick Prompt Templates for New Sessions

### Add a new chapter
> "Using the CLAUDE.md and the existing `laith_science_app.html`, add Chapter [X.X] [Title]. The chapter covers: [list topics]. Follow the same design system, animation style, and quiz format. Include animated CSS demos for each concept. Here is the textbook material: [paste or upload PDF]"

### Fix or update a section
> "Using the CLAUDE.md context, update the [learn/quiz/print] section of Chapter 4.2 in `laith_science_app.html` to [describe change]."

### Add more quiz questions
> "Add 5 more quiz questions to Chapter 4.2's QUESTIONS array. Topics to cover: [list]. Follow the existing question format exactly."
