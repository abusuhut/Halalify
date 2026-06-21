-- ============================================================
-- Halal Product Scanner — Database Schema
-- Run this once in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. PRODUCTS
-- One row per barcode. This is the cache + status record.
create table if not exists products (
  barcode text primary key,
  product_name text,
  brand text,
  image_url text,
  ingredients_text text,
  status text not null default 'not_certified'
    check (status in ('haram', 'not_certified', 'halal_certified')),
  haram_ingredients_found text[] default '{}',
  ambiguous_ingredients_found text[] default '{}',
  certificate_note text,
  certified_by uuid references auth.users(id),
  source text default 'openfoodfacts',
  off_found boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. MODERATORS
-- Whitelist of who is allowed to set "halal_certified" status.
-- You add rows here manually for yourself + trusted people.
create table if not exists moderators (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'moderator' check (role in ('admin', 'moderator')),
  added_at timestamptz default now()
);

-- 3. HARAM_KEYWORDS
-- Editable list of ingredient words that trigger an automatic "haram" status.
-- Keep this to UNAMBIGUOUS items only (pork, alcohol, etc.)
create table if not exists haram_keywords (
  id bigint generated always as identity primary key,
  keyword text not null unique,
  note text
);

-- 4. AMBIGUOUS_KEYWORDS
-- Ingredients that COULD be haram depending on source (e.g. gelatin, E471).
-- These do NOT trigger "haram" automatically, but are shown to the user
-- as a reason the product is "not certified" rather than implying it's fine.
create table if not exists ambiguous_keywords (
  id bigint generated always as identity primary key,
  keyword text not null unique,
  note text
);

-- Seed default haram keywords (clearly, unambiguously non-halal)
insert into haram_keywords (keyword, note) values
  ('pork', 'Pig meat'),
  ('lard', 'Pig fat'),
  ('bacon', 'Pig meat product'),
  ('ham', 'Pig meat product'),
  ('pepperoni', 'Usually pork-based'),
  ('prosciutto', 'Pig meat product'),
  ('pancetta', 'Pig meat product'),
  ('chorizo', 'Often pork-based'),
  ('alcohol', 'Intoxicant'),
  ('ethanol', 'Intoxicant, as ingredient (not trace processing aid)'),
  ('wine', 'Contains alcohol'),
  ('beer', 'Contains alcohol'),
  ('rum', 'Contains alcohol'),
  ('brandy', 'Contains alcohol'),
  ('whisky', 'Contains alcohol'),
  ('whiskey', 'Contains alcohol'),
  ('mirin', 'Contains alcohol'),
  ('blood', 'Forbidden'),
  ('lard oil', 'Pig fat')
on conflict (keyword) do nothing;

-- Seed default ambiguous keywords (need certification to confirm source)
insert into ambiguous_keywords (keyword, note) values
  ('gelatin', 'Can be from pork, beef, or fish — source unclear from label'),
  ('gelatine', 'Can be from pork, beef, or fish — source unclear from label'),
  ('mono- and diglycerides', 'Can be animal or plant derived'),
  ('e471', 'Mono/diglycerides — animal or plant derived'),
  ('e472', 'Emulsifier — animal or plant derived'),
  ('e120', 'Carmine/cochineal — insect-derived, debated'),
  ('carmine', 'Insect-derived colorant, debated among scholars'),
  ('e441', 'Gelatin-based'),
  ('e542', 'Bone phosphate — animal derived'),
  ('rennet', 'Can be animal or microbial derived'),
  ('whey', 'Cheese-making byproduct, rennet source unclear'),
  ('natural flavor', 'Source not specified on label'),
  ('natural flavoring', 'Source not specified on label'),
  ('emulsifier', 'Generic term, source not specified'),
  ('mono and diglycerides of fatty acids', 'Can be animal or plant derived')
on conflict (keyword) do nothing;

-- Index for faster lookups
create index if not exists idx_products_status on products(status);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table products enable row level security;
alter table moderators enable row level security;
alter table haram_keywords enable row level security;
alter table ambiguous_keywords enable row level security;

-- Anyone (including anonymous visitors) can READ products + keyword lists
create policy "public read products" on products for select using (true);
create policy "public read haram_keywords" on haram_keywords for select using (true);
create policy "public read ambiguous_keywords" on ambiguous_keywords for select using (true);

-- Only the server (using the service role key) can write to products.
-- Normal users/browsers never get insert/update access directly.
-- (No insert/update/delete policy is created for the anon/authenticated
--  roles, so writes are blocked unless done via the service role key,
--  which our API routes use server-side.)

-- Moderators table: a logged-in user can check if THEY are a moderator
create policy "read own moderator row" on moderators for select
  using (auth.uid() = id);
