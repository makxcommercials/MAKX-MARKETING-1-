-- Phase 2: Contact inquiries inbox.
-- Run this once in the Supabase SQL editor (or `supabase db push` if you use
-- migrations locally). Written to match the existing `blogs` /
-- `site_settings` tables in supabase_setup.sql — same RLS style: anon can
-- only INSERT (the public contact form), everything else needs the
-- service-role key (i.e. only the admin server functions).

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  enquiry_type text,
  message text not null,
  source text not null default 'contact_page', -- e.g. contact_page, marketing_page
  status text not null default 'new' check (status in ('new', 'read', 'contacted', 'archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_inquiries_status_idx on public.contact_inquiries (status);
create index if not exists contact_inquiries_created_at_idx on public.contact_inquiries (created_at desc);

alter table public.contact_inquiries enable row level security;

-- Anyone (anon key, from the public contact form) can submit an inquiry...
drop policy if exists "Anyone can submit an inquiry" on public.contact_inquiries;
create policy "Anyone can submit an inquiry"
  on public.contact_inquiries
  for insert
  to anon
  with check (true);

-- ...but only the service-role key (admin server functions) can read/update/delete.
-- No SELECT/UPDATE/DELETE policy is created for anon/authenticated, so RLS
-- denies those by default — the admin client bypasses RLS entirely, same as
-- the blogs/site_settings tables already do.
