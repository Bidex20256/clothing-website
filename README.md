# Temir — E-Commerce Clothing Brand

A full-stack, responsive e-commerce website for **Temir**, featuring user authentication, product browsing, shopping cart, secure checkout, and a fashion blog.

## Features

- **Authentication** — Register, log in, log out with bcrypt-hashed passwords and JWT sessions
- **Profile CRUD** — Create (register), read, update, and delete user profiles
- **Homepage** — Dual male model hero, featured product carousel, new arrivals, promotions
- **Shop** — Product listings with filters (age group, category, price, popularity)
- **Product pages** — Images, sizes, colors, prices, add to cart
- **Cart & checkout** — Dynamic cart with validation; checkout requires login
- **Blog** — Fashion tips and brand updates
- **Responsive design** — Mobile-friendly with smooth animations
- **SEO** — Meta tags and descriptive image alt text

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite + Prisma ORM
- **Auth:** bcryptjs + JWT (httpOnly cookies)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (includes npm)

### Installation

```bash
cd "temmy clothing web"
npm install
```

Copy environment variables (or use the included `.env` for local dev):

```bash
copy .env.example .env
```

Set up the database:

```bash
npx prisma db push
npm run db:seed
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Account

- **Email:** demo@temir.com  
- **Password:** demo1234  

## Project Structure

```
src/
  app/          # Pages and API routes
  components/   # Reusable UI components
  lib/          # Auth, database, cart, products
prisma/
  schema.prisma # Database models
  seed.ts       # Sample products and blog posts
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:push` | Sync database schema |
| `npm run db:seed` | Seed sample data |

## Age Groups

Products are organized for:

- **Children** (age 5+)
- **Teenagers**
- **Youths**
- **Adults**

## Production Notes

Before deploying:

1. Change `JWT_SECRET` in `.env` to a long random string
2. Consider PostgreSQL instead of SQLite for production (`DATABASE_URL`)
3. Add a payment provider (Stripe, Paystack, etc.) to checkout
4. Configure email for contact form and order confirmations

---

© Temir. Built with Next.js.
