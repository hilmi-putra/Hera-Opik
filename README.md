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

## Supabase Schema + RLS + Auth Setup

1. Open Supabase SQL Editor, then run:

```sql
-- run all content from:
-- supabase/schema.sql
```

2. Create first admin user from Supabase Auth:
   - Go to Authentication -> Users -> Add user
   - Use email/password for dashboard admin login

3. Promote that user to admin role:

```sql
update public.profiles
set role = 'admin'
where id = 'USER_UUID_FROM_AUTH_USERS';
```

4. Test auth + RLS:
   - Login from `/admin/login`
   - Access `/admin` (must be admin)
   - Public pages stay accessible without login

### Included Supabase Tables

- `profiles` (auth user profile + role)
- `app_settings`
- `events`
- `rsvp_submissions`
- `rsvp_submission_events`
- `wedding_gift_accounts`
- `gift_recipient_info`
- `gift_recommendations`
- `wedding_wishes`

### Included Security

- Row Level Security enabled on all tables
- Public policies for read/submit guest-facing data
- Admin-only policies for dashboard management
- `is_admin()` helper for role-based policy checks
- Safe gift claim RPC function (`claim_gift`)

## Deployment (Vercel)

1. Import repository to Vercel
2. Framework preset: `Vite`
3. Add all `VITE_*` environment variables
4. Deploy
