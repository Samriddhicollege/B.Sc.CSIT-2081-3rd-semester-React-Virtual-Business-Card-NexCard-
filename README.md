# NexCard — Virtual Business Card Maker

**Live Site:** [https://mynexcard.vercel.app](https://mynexcard.vercel.app)

A web app for creating, customizing, and sharing digital business cards. Built with **React 19 + Vite**, **Tailwind CSS v4**, **Framer Motion**, and **Supabase**.

---

## Features

- Browse 30 pre-designed business card templates across 8 categories
- Live card editor — customize colors, layout, fonts, logo, and contact info
- Publish cards to a unique public URL (`/card/[slug]`)
- Share via QR code, direct link, or social platforms
- Save contacts as `.vcf` (vCard) files
- Dashboard to manage all published cards
- OAuth authentication (Google & GitHub) via Supabase
- Graceful localStorage fallback when Supabase is not configured

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7 |
| Styling | Tailwind CSS v4, Framer Motion |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| Bundler | Vite 6 |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── data/             # Template definitions (30 templates, categories, sample data)
├── lib/
│   ├── auth.js       # Auth helpers (signUp, signIn, OAuth, signOut)
│   └── supabase/
│       └── client.js # Supabase client singleton
├── pages/            # Route-level page components
└── utils/
    ├── cardStorage.js # Save/load cards (Supabase or localStorage)
    └── vcard.js       # .vcf file generation
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Marketing landing page |
| `/login` | LoginPage | Email/password + OAuth login & sign-up |
| `/customize/:id` | CustomizePage | Live card editor (requires auth) |
| `/card/:slug` | VirtualCardPage | Public-facing digital card |
| `/my-cards` | MyCardsPage | User's card dashboard (requires auth) |
| `/pricing` | PricingPage | Pricing tiers (UI only) |
| `/auth/callback` | AuthCallbackPage | OAuth redirect handler |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (optional — app works without it using localStorage)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> If these are omitted, the app runs in offline mode with localStorage persistence.

### Database Setup

Run the SQL in [`supabase-schema.sql`](supabase-schema.sql) in your Supabase SQL editor to create the `profiles` and `cards` tables, RLS policies, and helper functions.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Deployment

The project includes a [`vercel.json`](vercel.json) configured for:

- SPA routing (all routes rewrite to `index.html`)
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)

Deploy with the [Vercel CLI](https://vercel.com/docs/cli) or connect the repository directly in the Vercel dashboard. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the Vercel project settings.

---

## Database Schema (Supabase)

**`profiles`** — Auto-created on signup via trigger. Stores `full_name` and `avatar_url`.

**`cards`** — Published virtual cards. Key fields: `slug`, `user_id`, `name`, `title`, `company`, `phone`, `email`, `web`, social handles (`linkedin`, `github`, `twitter`, `instagram`), `design` (JSONB), `views`, `is_published`.

Row-Level Security: published cards are publicly readable; all writes are owner-only.

---

## License

This project was developed as a B.Sc. CSIT 3rd Semester React coursework project.
