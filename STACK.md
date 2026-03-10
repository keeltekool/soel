# SOEL — Daily Digest

AI-curated daily digest of the best articles, rendered as a mobile-first PWA.

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React 19 + Vite 7 | NOT Next.js — pure SPA |
| Language | TypeScript 5.9 | Strict mode, `@/*` path alias |
| Styling | Tailwind CSS 4 | Via `@tailwindcss/vite` plugin |
| Routing | React Router 7 | `/`, `/article/:id`, `/archive` |
| PWA | vite-plugin-pwa | autoUpdate, standalone, offline caching |
| Data | Google Sheets API v4 | Public read via API key, no OAuth |
| Hosting | Vercel | Auto-detected Vite config |

## URLs

- **Live:** https://soel-sigma.vercel.app
- **GitHub:** https://github.com/keeltekool/soel
- **Dev:** `npx vite --port 3010`

## Design Tokens

CSS custom properties with `--soel-*` prefix defined in `src/index.css`.

| Token | Value |
|-------|-------|
| Primary (Ink Black) | `#1A1A2E` |
| Accent (Amber) | `#FFD166` |
| Background (Parchment) | `#F5F3EE` |
| Fonts | Fraunces (display), DM Sans (body), Epilogue (labels), JetBrains Mono (data) |

## Architecture

```
src/
  lib/
    types.ts        — Article, SectionConfig interfaces
    constants.ts    — Category definitions (value, label, color, bg)
    utils.ts        — Date formatting, category helpers, section filtering
    mock-data.ts    — 12 mock articles + 4 section configs (fallback)
    sheets.ts       — Google Sheets API v4 fetch + parse
    data.ts         — React hooks (useArticles, useConfig, useArticle) + in-memory cache
  components/
    Navbar.tsx       — Fixed glassmorphism nav, SOEL logo, date, archive link
    Footer.tsx       — Ink black footer with amber logo
    Layout.tsx       — Outlet wrapper with nav + footer
    ArticleCard.tsx  — Card with image, badges, title, summary
    ArticleRow.tsx   — Compact list row with score badge
    HeroSection.tsx  — Main hero (2fr) + secondary grid (1fr)
    SectionHeader.tsx — Section title + count, brand border
    DigestSection.tsx — Renders hero/grid/list based on config
  pages/
    DigestPage.tsx   — Home: date header, skeleton loading, section iteration
    ArticlePage.tsx  — Detail: hero image, summary, CTA, related articles
    ArchivePage.tsx  — Grouped by date, list view
```

## Data Flow

1. App checks `isSheetsConfigured()` — needs `VITE_GOOGLE_SHEET_ID` + `VITE_GOOGLE_API_KEY`
2. If configured: fetches Articles + Config tabs from Google Sheets API v4
3. If not configured or error: falls back to `mock-data.ts`
4. In-memory cache prevents re-fetching on navigation
5. `invalidateCache()` available for manual refresh

## Google Sheet Schema

### Articles tab (A2:M1000)

| Col | Field | Type |
|-----|-------|------|
| A | date | YYYY-MM-DD |
| B | title | string |
| C | author | string |
| D | url | URL |
| E | imageUrl | URL (optional) |
| F | source | substack/blog/news |
| G | sourceName | string |
| H | category | claude-code/ai-tools/tutorials/news |
| I | summary | string |
| J | score | 1-10 |
| K | (reserved) | — |
| L | scrapedAt | ISO datetime |
| M | status | new/featured |

### Config tab (A2:H100)

| Col | Field | Type |
|-----|-------|------|
| A | sectionName | string |
| B | sourceFilter | string (empty = all) |
| C | categoryFilter | string (empty = all) |
| D | minScore | number |
| E | maxArticles | number |
| F | sortOrder | number |
| G | displayStyle | hero/grid/list |
| H | enabled | TRUE/FALSE |

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `VITE_GOOGLE_SHEET_ID` | `.env.local` + Vercel | Google Sheet document ID |
| `VITE_GOOGLE_API_KEY` | `.env.local` + Vercel | Google Sheets API key (read-only) |

## Gotchas

- **Mock fallback:** App works without Sheets credentials — shows mock data. No error, just a console log.
- **PWA caching:** Sheets API responses cached 1h (NetworkFirst). Fonts cached 1yr (CacheFirst).
- **Path alias:** `@/*` maps to `src/*` — configured in both `vite.config.ts` and `tsconfig.app.json`.
- **No SSR:** Pure client-side SPA. Vercel serves `index.html` for all routes.
- **UI rules:** `rounded-lg` only (never xl/2xl). Shadows only on dropdowns/modals. No card-in-card nesting.

## Post-Deploy Smoke Tests

1. Load https://soel-sigma.vercel.app — hero section renders with articles
2. Click an article — detail page shows image, summary, "Read Original" CTA
3. Navigate to /archive — articles grouped by date
4. Check DevTools console — no errors
5. Check Network tab — Sheets API calls succeed (or mock data if not configured)
6. Test on mobile viewport — single-column layout, readable text
