# Wall Calendar

An interactive wall-calendar experience built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It recreates the feel of a physical spiral-bound calendar while adding slick range selection, animated month changes, and notes that persist in `localStorage`.

## ✨ Vibe Check

This project is a frontend-focused calendar UI inspired by a real hanging wall calendar:

- 🖼️ Large hero image for each month
- 🗓️ Monday-first date grid with smooth transitions
- 🎯 Click-to-select date ranges
- 👀 Hover preview before confirming a range
- 📝 Notes sidebar with persistent saved notes
- 🔵 Tiny note indicators on dates covered by notes
- ⌨️ Keyboard-friendly interactions
- 📱 Fully responsive layout for mobile and desktop

It is designed to be **clean, visual, interactive, and Vercel-ready**.

## 🔗 Live Demo

👉 [wall-calender-dhruv-johri.vercel.app](https://wall-calender-dhruv-johri.vercel.app/)

## 🛠 Tech Stack

| Layer | Tooling |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | `Playfair Display` + `DM Sans` via `next/font/google` |
| State | React hooks: `useState`, `useReducer`, `useMemo`, `useEffect` |
| Persistence | `localStorage` |
| Date Logic | Native JavaScript `Date` only |
| Hosting | Vercel |

## 🎨 What The UI Does

### Calendar Experience

- ⏮️ Move to previous month
- ⏭️ Move to next month
- 📍 Jump back to today
- 🌊 Animate the grid when months change
- 🖼️ Crossfade hero images between months

### Date Selection

- 1️⃣ First click sets the start date
- 2️⃣ Second click after the start sets the end date
- 🔁 Clicking again after a complete range resets selection and starts a new one
- 🫧 Hovering during selection previews the possible range
- 🟠 Today gets a visible highlight ring and pulse when using the Today button

### Notes

- 📝 Add a note for the currently selected date or range
- 💾 Notes persist in browser storage
- 🗑️ Delete notes from the sidebar
- 🔵 Dates covered by a note show a small accent dot

### Accessibility

- ♿ Interactive controls have `aria-label`s
- ⌨️ Day cells can be navigated with arrow keys
- ✅ `Enter` / `Space` selects a date
- ❌ `Escape` clears the range
- 📢 Selected range updates are announced with `aria-live`

## 🧱 Architecture

The app is split into small focused layers so the UI stays easy to reason about.

### 1. App Shell

Located in `app/`

- `app/layout.tsx`
  Sets metadata, fonts, and global page shell styling.
- `app/page.tsx`
  Renders the main `CalendarPage` component.
- `app/globals.css`
  Defines calendar theme variables and shared global styles.

### 2. Calendar Components

Located in `components/calendar/`

- `CalendarPage.tsx`
  The main orchestrator. Connects hooks, shared state, hero, date grid, and notes panel.
- `CalendarHeader.tsx`
  Renders month navigation buttons and the Today button on top of the hero image.
- `HeroImage.tsx`
  Displays the month artwork, wire binding detail, and month/year overlay.
- `DateGrid.tsx`
  Renders weekday headers, the animated 42-cell date grid, and keyboard behavior.
- `DayCell.tsx`
  Handles the visual state of each date:
  normal, weekend, today, selected start, selected end, in-range, preview, and disabled out-of-month cells.
- `NotesPanel.tsx`
  Notes input UI, current selection summary, and notes list.
- `NoteItem.tsx`
  Individual saved note card with delete action and subtle entry animation.

### 3. Hooks

Located in `hooks/`

- `useCalendar.ts`
  Handles the displayed month, direction of animation, and creation of the 42-cell calendar grid.
- `useDateRange.ts`
  Controls the range-selection state machine:
  idle → start selected → range complete.
- `useNotes.ts`
  Handles note creation, deletion, hydration from `localStorage`, and persistence.

### 4. Utilities + Shared Types

Located in `lib/` and `types/`

- `lib/constants.ts`
  Month names, weekday labels, and hero image metadata.
- `lib/dateUtils.ts`
  Pure helper functions for date comparison, formatting, and note/date matching.
- `types/index.ts`
  Shared TypeScript interfaces like `DayInfo`, `DateRange`, and `Note`.

### 5. Static Assets

Located in `public/hero/`

- 12 local month hero images
- Used in production builds
- Remote Unsplash fallback is supported during development if a local image fails

## 🗂 Folder Structure

```text
/
├── app/
├── components/
│   ├── calendar/
│   └── ui/
├── hooks/
├── lib/
├── public/
│   └── hero/
├── types/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🔄 State Flow

Here’s the main interaction flow:

1. User clicks a day
2. `useDateRange` stores it as `start`
3. User hovers another day
4. `CalendarPage` computes preview highlighting
5. User clicks a second day
6. `useDateRange` stores it as `end`
7. User writes a note
8. `useNotes` saves it to `localStorage`
9. Covered dates display note dots in the grid

This keeps UI rendering and state logic nicely separated.

## 📦 Local Setup

### Requirements

- Node.js `^20.19.0` or `^22.13.0`
- npm

### Install

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## ✅ Quality Checks

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm start
```


## 🚀 Deploying To Vercel

**Live:** [https://wall-calender-dhruv-johri.vercel.app/](https://wall-calender-dhruv-johri.vercel.app/)

### Option 1: GitHub + Vercel Dashboard

1. Push the repo to GitHub
2. Import it into Vercel
3. Let Vercel detect it as a **Next.js** app
4. Deploy with default settings

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🧠 Design Decisions

- Native `Date` was used on purpose to match the challenge rules
- `localStorage` keeps the app frontend-only and easy to demo
- 42 fixed cells keep the grid height stable across months
- Calendar logic lives in hooks so UI components stay focused on rendering
- Motion is used sparingly to make the component feel premium without getting messy

## 👀 Best Parts To Review

If someone is reviewing the code fast, these files tell the story quickest:

- `components/calendar/CalendarPage.tsx`
- `hooks/useCalendar.ts`
- `hooks/useDateRange.ts`
- `hooks/useNotes.ts`
- `components/calendar/DateGrid.tsx`
- `lib/dateUtils.ts`

## 💌 Final Note

This project was built as a polished frontend component with a strong emphasis on:

- UI fidelity 🎨
- interaction quality ⚡
- clean code structure 🧼
- responsiveness 📱
- deployability 🚀

Basically: pretty, practical, and production-ready.
