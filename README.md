# Hera & Taufik - Digital Wedding Invitation

Modern and scalable digital wedding invitation platform built with React + Vite, Shadcn-style component architecture, Supabase integration, and Vercel-ready deployment configuration.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS v4 + reusable UI component structure
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- i18next for EN/ID multilingual support
- React Router for landing/admin routing

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Start development:

```bash
npm run dev
```

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_DEFAULT_LANGUAGE`

## Current Modules

- Landing page
- Admin dashboard
- Countdown timer (Asia/Jakarta target date)
- Add to calendar links
- Dynamic RSVP
- Wedding gifts + recipient copy feature
- Gift recommendation claim flow
- Wedding wishes
- Language switcher (EN/ID)

## Deployment (Vercel)

1. Import repository to Vercel
2. Framework preset: `Vite`
3. Add all `VITE_*` environment variables
4. Deploy
