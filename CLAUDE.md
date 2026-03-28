# CLAUDE.md — Darsi: Laith's Interactive Study App

## Project Overview

A **Next.js 14 PWA** (App Router, TypeScript, Tailwind CSS, static export) that serves as an interactive study platform for **Laith**, a 9-year-old Grade 3 student. Deployed to GitHub Pages as a static site.

**Live URL:** https://mhijjawi.github.io/darsi.app/
**Password:** `Laith2017`
**Original reference:** `laith_science_app.html` (legacy single-file version, kept for reference)

---

## Tech Stack

- **Next.js 14** — App Router, static export (`output: 'export'`)
- **TypeScript** — full type safety
- **Tailwind CSS** — custom design tokens in `tailwind.config.ts`
- **PWA** — manifest.json, service worker, iOS add-to-home-screen
- **GitHub Pages** — auto-deploy via GitHub Actions on push to `main`
- **Fonts** — Baloo 2 (headings) + Nunito (body) via Google Fonts CDN

---

## Project Structure

```
darsi.app/
├── .github/workflows/deploy.yml     ← GitHub Actions: build → gh-pages
├── content/
│   └── science/chapter-4-2/         ← placeholder for scanned pages
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← root layout, PWA meta, fonts
│   │   ├── page.tsx                 ← password gate (landing page)
│   │   ├── learn/page.tsx           ← redirects to first chapter
│   │   └── [subject]/[chapter]/
│   │       ├── layout.tsx           ← AppShell wrapper
│   │       ├── learn/page.tsx
│   │       ├── quiz/page.tsx
│   │       └── worksheet/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx         ← sidebar + topbar + content area
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── learn/
│   │   │   ├── LearnContent.tsx     ← full learn page for ch4.2
│   │   │   ├── ConceptCard.tsx
│   │   │   ├── DemoStage.tsx        ← animated light demos (6 types)
│   │   │   ├── FlipCard.tsx
│   │   │   └── SummaryBox.tsx
│   │   ├── quiz/
│   │   │   ├── QuizContent.tsx
│   │   │   ├── QuizEngine.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   └── ResultScreen.tsx
│   │   ├── worksheet/
│   │   │   ├── WorksheetContent.tsx
│   │   │   └── WorksheetView.tsx    ← print-ready worksheet generator
│   │   └── characters/
│   │       └── LegoCharacter.tsx    ← CSS-only Lego/Fortnite minifigures
│   ├── data/science/
│   │   └── chapter-4-2.ts          ← all content (concepts, quiz, worksheet)
│   ├── hooks/useAuth.ts            ← password gate (sessionStorage)
│   ├── lib/
│   │   ├── chapters.ts             ← chapter registry + subject metadata
│   │   └── staticParams.ts         ← generateStaticParams for routes
│   └── types/index.ts              ← TypeScript interfaces
├── public/
│   ├── manifest.json
│   ├── sw.js                       ← service worker (cache v2)
│   ├── 404.html                    ← SPA redirect handler
│   └── icons/
├── next.config.mjs                 ← basePath: '/darsi.app', static export
├── tailwind.config.ts              ← custom colors, animations, fonts
└── laith_science_app.html          ← legacy reference (original single-file app)
```

---

## Design System

### Colors (Tailwind custom tokens)
```
bg: #F4F6FB          sidebar-bg: #FFFFFF     card: #FFFFFF
card2: #F8FAFC       border: #E2E8F0
blue: #2563EB        green: #16A34A          yellow: #D97706
coral: #EA580C       purple: #7C3AED         teal: #0891B2
text: #1E293B        text-dim: #64748B       text-dimmer: #94A3B8
```

### Concept color mapping
| Concept      | Color   | Hex       |
|--------------|---------|-----------|
| How We See   | Blue    | `#2563EB` |
| Opaque       | Grey    | `#90A4AE` |
| Transparent  | Teal    | `#0891B2` |
| Translucent  | Purple  | `#7C3AED` |
| Sun Safety   | Yellow  | `#D97706` |
| Colors       | Teal    | `#0891B2` |

### Animations (defined in tailwind.config.ts)
`fadeUp`, `pulseSrc`, `beamPulse`, `glassShimmer`, `shadowBreathe`,
`bounce`, `personSway`, `growBeam`, `blink`, `checkPop`, `prismGlow`,
`shadowShift`, `shake`

### CSS-only Lego Characters
8 variants: `scientist`, `explorer`, `ninja`, `sunny`, `frost`, `coral`, `galaxy`, `robot`
3 sizes: `sm` (32px), `md` (48px), `lg` (64px)
Used with `<LegoCharacter>` and `<CharacterBubble>` components.

---

## How to Add a New Chapter

### Step 1 — Create data file
Create `src/data/{subject}/chapter-{n}.ts` exporting a `ChapterData` object:
```typescript
import { ChapterData } from '@/types'
const chapter: ChapterData = {
  id: 'chapter-X-Y',
  subject: 'science',
  title: 'X.Y Chapter Title',
  emoji: '🔬',
  description: '...',
  objectives: [...],
  concepts: [...],      // each with demoType
  flashcards: [...],
  comparison: {...},
  quiz: [...],          // 10 questions, 4 options each
  worksheet: {...},
}
export default chapter
```

### Step 2 — Register in chapters.ts
Add the chapter to the `SUBJECTS` array in `src/lib/chapters.ts`.

### Step 3 — Create content component
Create `src/components/learn/LearnContent{N}.tsx` (or make LearnContent generic).

### Step 4 — Add breadcrumbs
Add breadcrumb entries in `src/components/layout/AppShell.tsx`.

### Step 5 — Update staticParams
The `generateStaticParams()` in `src/lib/staticParams.ts` auto-discovers chapters from the registry.

---

## Quiz Engine

### Question format (in data file)
```typescript
{ q: "Question?", emoji: "🔦", opts: ["A","B","C","D"], ans: 2, fb: "Explanation" }
```

### Star rating thresholds
| Score | Trophy | Stars |
|-------|--------|-------|
| 10/10 | 🏆     | 5     |
| 8-9   | 🥇     | 4     |
| 6-7   | 🥈     | 3     |
| 0-5   | 📚     | 2     |

Stars are stored in `sessionStorage` per chapter and displayed in the topbar.

---

## Worksheet / Print

The `WorksheetView` component generates a **self-contained HTML document** for printing:
- Full inline CSS (no Tailwind dependency in print)
- Baloo 2 + Nunito fonts from Google Fonts CDN
- Navy header bar, word banks, classification grids, answer lines
- `print-color-adjust: exact` for colored sections
- Auto-triggers `window.print()` on load
- Answer key is toggleable (hidden by default, for parents)

---

## Password Gate

- Route: `/` (landing page)
- Password: `Laith2017`
- Stores `darsi_unlocked=true` in `sessionStorage`
- `useAuth()` hook checks auth state
- `AppShell` redirects to `/` if not unlocked
- Session clears on browser close (sessionStorage)

---

## Deployment

### GitHub Pages (current)
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Triggers on push to `main`
- Builds with `npm run build` (Next.js static export + custom 404)
- Deploys to `gh-pages` branch via `peaceiris/actions-gh-pages`
- GitHub Pages source: `gh-pages` branch, `/ (root)`
- `basePath: '/darsi.app'` in `next.config.mjs` matches repo name
- **Important:** `Link` and `router.push` do NOT need manual basePath — Next.js adds it automatically. Only raw `<link>` and `<meta>` tags need the `/darsi.app/` prefix.

### PWA / Offline
- `public/manifest.json` with correct `start_url` and `scope`
- `public/sw.js` service worker (cache name `darsi-v2`)
- Network-first for navigation, stale-while-revalidate for assets
- iOS meta tags for add-to-home-screen

---

## iPad / Mobile

- Sidebar becomes fixed drawer on `max-width: 768px`
- Hamburger toggle in topbar
- All tap targets >= 44px
- Flashcards use click (tap) to flip
- `maximum-scale=1` prevents zoom issues

---

## Student Profile

- **Name:** Laith
- **Age:** 9 years old
- **Grade:** 3
- **Device:** iPad (Safari)
- **Interests:** Fortnite, Roblox, Lego

### Content tone guidelines
- Simple, short sentences — no jargon
- Emojis for memory aids
- Bold key vocabulary
- Daily life analogies
- Encouraging feedback always
- CSS Lego character companions for fun

---

## Current Chapters

| Key            | Chapter              | Status       |
|----------------|----------------------|-------------|
| `chapter-4-2`  | 4.2 Light & Matter   | ✅ Complete  |
| —              | Next chapter         | 🔲 Placeholder |

---

## Content Folder Convention

```
content/{subject}/chapter-{n}/
├── page-01.jpg    ← scanned textbook pages
├── page-02.jpg
└── ...
```

When images are added, Claude Code will:
1. Read all images in the folder
2. Create `src/data/{subject}/chapter-{n}.ts`
3. Create learn/quiz/worksheet components
4. Register in `src/lib/chapters.ts`

---

## Quick Prompt Templates

### Add a new chapter
> "Add Chapter [X.X] [Title] to the Darsi app. Topics: [list]. Follow the existing design system, animation style, and quiz format. Here is the textbook material: [paste or upload]"

### Fix or update a section
> "Update the [learn/quiz/worksheet] section of Chapter 4.2. [Describe change]."

### Add quiz questions
> "Add 5 more quiz questions to Chapter 4.2. Topics: [list]. Follow the existing Question format in types/index.ts."
