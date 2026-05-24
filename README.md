# Hera & Taufik Wedding Invitation

Digital wedding invitation for Hera & Taufik, built as a production-ready full-stack application with a polished guest-facing landing page, RSVP flow, wedding wishes, digital gift recommendations, and an admin dashboard powered by Laravel + MySQL.

The project was migrated away from direct database access in the frontend. React now communicates with the Laravel REST API, while Laravel owns persistence, validation, admin authentication, and business logic.

## Tech Stack

**Frontend**

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Shadcn-style reusable UI components
- React Router
- TanStack Query
- Framer Motion + GSAP animations
- i18next for EN/ID copy support

**Backend**

- Laravel 12
- MySQL
- Blade admin views for server-rendered management
- REST API for React integration
- Laravel validation, services, seeders, migrations
- Token-based admin API authentication

**Integration Ready**

- WhatsApp Gateway for guest broadcast, RSVP reminders, and attendance follow-up
- Guest import/export workflow for spreadsheet-based invitation lists
- Gift recommendation and claim tracking

## Key Features

- Responsive wedding landing page
- Opening cover interaction for mobile
- Countdown and Add to Calendar
- Couple profile, love story, gallery, RSVP, wishes, gift, and footer sections
- RSVP submission to Laravel API
- Wedding wishes marquee from RSVP notes
- Gift recommendation list with stock and claim status
- Default gift image fallback when uploaded image is missing or broken
- Admin login using Laravel API token authentication
- Admin data tables with pagination
- Laravel Blade admin panel for RSVP and gift management
- Database seeders for admin user, RSVP samples, and gift recommendations

## Repository Structure

```txt
.
├── src/                         # React Vite frontend
│   ├── components/              # Reusable UI and feature components
│   ├── hooks/                   # Frontend hooks
│   ├── layouts/                 # Public/admin layouts
│   ├── lib/                     # API client and utilities
│   ├── pages/                   # Landing and admin pages
│   ├── store/                   # React contexts
│   ├── types/                   # Shared frontend types
│   ├── App.tsx                  # Route composition
│   ├── i18n.ts                  # Language setup
│   ├── index.css                # Tailwind/global styles
│   └── main.tsx                 # React bootstrap
├── public/                      # Static frontend assets
├── backend/                     # Laravel + MySQL backend
│   ├── app/
│   │   ├── Http/Controllers/    # API and admin controllers
│   │   ├── Http/Requests/       # Form request validation
│   │   ├── Models/              # Eloquent models
│   │   └── Services/            # RSVP and gift business logic
│   ├── database/
│   │   ├── migrations/          # MySQL schema
│   │   └── seeders/             # Admin, RSVP, gift seed data
│   ├── resources/views/         # Blade admin UI
│   ├── routes/api.php           # Public + React admin API
│   └── routes/web.php           # Laravel Blade admin routes
├── package.json                 # Frontend dependencies/scripts
└── README.md
```

## Frontend Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

### Frontend Environment

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
VITE_DEFAULT_LANGUAGE=id
```

## Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure MySQL in `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hera_taufik_wedding
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://localhost:5173
```

Run migrations and seeders:

```bash
php artisan migrate:fresh --seed
```

Start Laravel:

```bash
php artisan serve
```

Backend runs at:

```txt
http://127.0.0.1:8000
```

## Local Development

Use two terminals:

```bash
# Terminal 1
npm run dev
```

```bash
# Terminal 2
cd backend
php artisan serve
```

Optional checks:

```bash
npm run typecheck
npm run build
```

```bash
cd backend
php artisan test
```

## API Integration Flow

React does not connect directly to the database. All dynamic data goes through Laravel REST endpoints.

Public endpoints:

```txt
GET  /api/v1/gifts
GET  /api/v1/wishes
POST /api/v1/rsvp
POST /api/v1/gifts/{gift}/claim
```

Admin endpoints:

```txt
POST /api/v1/admin/login
GET  /api/v1/admin/me
POST /api/v1/admin/logout
GET  /api/v1/admin/dashboard
GET  /api/v1/admin/rsvps
GET  /api/v1/admin/wishes
GET  /api/v1/admin/gifts
GET  /api/v1/admin/events
GET  /api/v1/admin/gallery
GET  /api/v1/admin/config
PUT  /api/v1/admin/config
```

Frontend API access is centralized in:

```txt
src/lib/api.ts
```

## Authentication Flow

1. Admin submits email and password from `/admin/login`.
2. React sends credentials to `POST /api/v1/admin/login`.
3. Laravel validates the credentials against the `users` table.
4. Laravel returns a bearer token and admin user payload.
5. React stores the token in local storage.
6. Admin API requests include `Authorization: Bearer <token>`.
7. Logout clears the token in Laravel and local storage.

Default seeded admin:

```txt
Email: admin@herataufik.com
Password: wedding2026
```

## RSVP System

Guests submit attendance from the landing page. Laravel validates:

- Guest name
- Attendance status
- Selected events
- Guest count
- WhatsApp number
- Optional message or wishes

RSVP data is stored in MySQL and appears in the admin data table. Notes from RSVP entries are also used for the wedding wishes marquee.

## Gift Recommendation System

Gift recommendations are seeded and managed by Laravel. The landing page displays:

- Product name
- Description
- Estimated price
- Remaining stock
- Claimed count
- Sold out state
- Product image or default fallback image

Guests can confirm gift purchase through the claim endpoint. Laravel validates quantity and prevents over-claiming beyond available stock.

## Guest Import/Export System

The project is structured for a spreadsheet-based guest workflow:

- Import guest lists from CSV/XLSX into MySQL
- Normalize guest names, phone numbers, group/family labels, and invitation status
- Export RSVP results for event operations
- Export WhatsApp broadcast lists for reminder campaigns

Recommended future endpoints:

```txt
POST /api/v1/admin/guests/import
GET  /api/v1/admin/guests/export
GET  /api/v1/admin/rsvps/export
```

## WhatsApp Gateway Flow

WhatsApp Gateway integration can be connected from Laravel services:

1. Import guest list.
2. Generate personalized invitation URL.
3. Send invitation message through gateway provider.
4. Track send status and RSVP status.
5. Send reminders to guests who have not responded.

Recommended Laravel service location:

```txt
backend/app/Services/WhatsAppGatewayService.php
```

## Deployment Guide

### Frontend

Recommended target: Vercel, Netlify, or static hosting.

```bash
npm run build
```

Set environment variables:

```env
VITE_API_URL=https://your-backend-domain.com/api/v1
VITE_DEFAULT_LANGUAGE=id
```

Deploy the generated `dist/` folder or connect the repository to the hosting provider.

### Backend

Recommended target: VPS, Laravel Forge, Ploi, shared hosting with PHP 8.2+, or containerized hosting.

Production checklist:

- Set `APP_ENV=production`
- Set `APP_DEBUG=false`
- Configure MySQL credentials
- Configure `APP_URL`
- Configure `FRONTEND_URL`
- Run migrations
- Seed initial admin user
- Point web server document root to `backend/public`
- Configure queue worker if WhatsApp jobs are queued
- Configure storage link when using uploaded gift images

```bash
cd backend
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
php artisan storage:link
```

## Maintenance Notes

- Frontend should only call Laravel through `src/lib/api.ts`.
- Avoid adding direct database clients to React.
- Keep request validation in Laravel Form Request classes.
- Keep RSVP/gift business rules inside Laravel services.
- Use migrations and seeders for reproducible database state.
- Keep environment files free from frontend-exposed secrets.
