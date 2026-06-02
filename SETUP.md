# Kwik Stop Tires — Setup Guide

## 1. Copy environment variables
```bash
cp .env.example .env.local
```
Fill in your actual values in `.env.local`.

## 2. Required services
- **PostgreSQL database** — Supabase (free) or Neon (free) recommended
- **Stripe** — Get test keys from https://dashboard.stripe.com/test/apikeys
- **Google OAuth** (optional) — https://console.cloud.google.com

## 3. Set up the database
```bash
# Generate a NEXTAUTH_SECRET
openssl rand -base64 32

# Push schema to your database
npx prisma db push

# Seed with 30+ tires and test accounts
npm run db:seed
```

## 4. Run the dev server
```bash
npm run dev
```

## 5. Test accounts (after seeding)
- **Admin:** admin@kwikstoptires.com / admin123
- **Customer:** customer@example.com / customer123

## 6. Test promo codes
- `KWIK20` — $20 off
- `SAVE10` — 10% off

## 7. Pages
- `/` — Homepage
- `/tires` — Shop all tires (with filters)
- `/find-tires` — Vehicle-based search
- `/tires/[id]` — Tire detail page
- `/appointments` — Book appointment
- `/services` — Service menu
- `/about` — About us
- `/contact` — Contact form
- `/cart` — Shopping cart
- `/checkout` — Stripe checkout
- `/account` — Order history, appointments
- `/admin` — Admin dashboard (admin role required)
- `/auth/login` — Sign in
- `/auth/register` — Create account
