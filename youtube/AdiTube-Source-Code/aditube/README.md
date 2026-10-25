# AdiTube

A modern YouTube-style video-sharing platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

**Brand:** AdiTube — Watch. Share. Connect.  
Premium dark interface with red accent. Fully responsive. Dark/Light theme support.

---

## Current Status: Phase 1 (Frontend Prototype)

### Working Features
- Responsive layout (sticky header + collapsible sidebar + mobile drawer)
- Homepage with category filters and video grid
- Video cards (thumbnail, duration, channel, views, relative time)
- Full search with suggestions and sorting (relevance / newest / views / likes)
- Watch page with real HTML5 video player
- Related videos
- Channel pages
- Like / Dislike / Subscribe UI
- Comments section (mock data)
- Dark / Light theme toggle (persisted)
- Trending page + all navigation routes

### Mock Data
48 sample videos, 8 channels, real playable sample MP4s.

---

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Lucide React icons
- Zustand (UI state)
- Geist font

---

## Getting Started (Local)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/aditube.git
cd aditube

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
# Production build
npm run build
npm start
```

---

## Deploy to GitHub + Vercel

### 1. Push to GitHub

```bash
# Create a new repository on GitHub (do not initialize with README)

git init
git add .
git commit -m "Initial commit: AdiTube Phase 1 frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aditube.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import the `aditube` repository
4. Framework Preset: **Next.js** (auto-detected)
5. Leave Build Command and Output Directory as default
6. Click **Deploy**

Your site will be live at `https://aditube-xxxx.vercel.app`

No environment variables are required for Phase 1.

---

## Project Structure

```
src/
├── app/
│   ├── (main)/              # Main layout routes
│   ├── watch/[id]/         # Video player
│   ├── channel/[handle]/    # Channel pages
│   ├── search/              # Search results
│   └── auth/sign-in/
├── components/
│   ├── layout/              # Header, Sidebar, Logo
│   ├── video/               # VideoCard, VideoGrid, CategoryFilters
│   └── ui/                  # Button, Avatar
├── data/mock.ts             # Sample data + helpers
├── store/ui-store.ts        # Theme + UI state
├── types/
└── lib/utils.ts
```

---

## Next Phases (Roadmap)

| Phase | Features |
|-------|----------|
| **2** | Supabase Auth + PostgreSQL schema + RLS + real data |
| **3** | Video upload + Supabase Storage / Mux |
| **4** | Likes, subscriptions, comments, playlists, history, notifications |
| **5** | Admin dashboard, performance, production hardening |

When ready for Phase 2, create a free project at [supabase.com](https://supabase.com) and fill `.env.local` from `.env.example`.

---

## License

MIT — Built for learning / portfolio use.  
Not affiliated with YouTube or Google.
