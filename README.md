# Halal Scan Korea

Scan a product barcode → check it against known haram ingredients →
see a clear status: **Haram**, **Not Certified**, or **Halal Certified**.

Built with Next.js, Supabase (database + auth), and the Open Food Facts API.

**New here? Start with [SETUP_GUIDE.md](./SETUP_GUIDE.md)** — a complete,
click-by-click walkthrough assuming zero coding experience.

## How status is decided

- A clearly haram ingredient (pork, alcohol, etc.) → automatically **Haram**
- No haram ingredient found, but no certificate on file → **Not Certified**
  (this is *not* a halal claim)
- A moderator manually verifies a real halal certificate → **Halal Certified**

## Project structure

- `src/app` — pages and API routes (Next.js App Router)
- `src/lib` — Supabase clients, Open Food Facts client, haram-detection logic
- `src/components` — UI components
- `supabase/schema.sql` — full database schema, run this in Supabase once
