# Noir Estates

**Luxury Living. Intelligent Investment.**

A premium, AI-powered luxury real estate website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Built as a portfolio showcase of premium web development, modern UI/UX, and AI product integration.

## Highlights

- Full-screen animated hero with live stat counters and floating particles
- Glassmorphic property search + featured property grid with hover zoom, save state, and luxury badges
- Flagship **AI Property Advisor** section — animated network graphics, scripted conversation demo, mortgage/booking/comparison mini-widgets
- A fully working **AI chatbot widget** wired to a real Next.js API route (`/api/chat`) that calls the Anthropic API server-side, with a graceful "demo mode" fallback when no API key is configured
- Animated market insight charts (Recharts): price trend, ROI by market, demand by segment
- A distinctive radar-style **global network map** (not a generic embed) with animated pins and hover popups
- Interactive mortgage calculator with live sliders and an animated principal/interest breakdown chart
- Agents grid, auto-advancing testimonial slider, animated FAQ accordion, contact form + map, and a full premium footer
- Scroll progress bar, cursor glow, page loader, scroll-reveal and stagger animations throughout
- Fully responsive: desktop, laptop, tablet, and mobile

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting the AI Advisor to Claude

The chatbot UI and `/api/chat` route are fully built and ready — they just need an API key:

1. Copy `.env.example` to `.env.local`
2. Get an API key from [console.anthropic.com](https://console.anthropic.com/)
3. Set `ANTHROPIC_API_KEY=sk-ant-...` in `.env.local`
4. Restart the dev server

Without a key, the chatbot still works end-to-end and replies with a clear "demo mode" message, so the UI always demos cleanly.

## Notes on external assets

- Property, agent, and testimonial photography load from Unsplash's CDN via `next/image` (see `next.config.js` for the allowed remote pattern). This requires normal outbound internet access when running the dev/build server — the same as any standard Next.js deployment (Vercel, etc.).
- Headings use **Clash Display** (via Fontshare) and body text uses **Inter** (via Google Fonts), both loaded through `app/globals.css`.
- The contact section embeds a Google Map via a plain iframe (no API key required), styled dark with a CSS filter.

## Tech Stack

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Recharts · Lucide Icons · `@anthropic-ai/sdk`

## Project Structure

```
app/                  Routes, layout, global styles, /api/chat
components/sections/  One component per homepage section
components/ui/        Shared primitives (Button, GlassCard, Reveal, counters, etc.)
components/chatbot/   The floating AI advisor widget
lib/                  Static content/data and utility functions
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
