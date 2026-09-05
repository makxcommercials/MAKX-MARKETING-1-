-- Phase 3: Marketing services become admin-editable instead of hardcoded in
-- marketing.tsx. Run after supabase_migration_002_contact_inquiries.sql.
-- Same RLS shape as blogs: public can read only "active" rows, everything
-- else needs the service-role admin client.

create table if not exists public.marketing_services (
  id uuid primary key default gen_random_uuid(),
  category text not null,       -- group label, e.g. "Digital & Social"
  category_blurb text not null default '',
  icon text not null,           -- key into the shared ICONS map (service-icons.ts)
  title text not null,
  body text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketing_services_order_idx on public.marketing_services (sort_order);

alter table public.marketing_services enable row level security;

drop policy if exists "Anyone can read active services" on public.marketing_services;
create policy "Anyone can read active services"
  on public.marketing_services
  for select
  to anon
  using (active = true);

-- Seed with the services already live on /marketing, so the admin tab opens
-- with real content instead of an empty state.
insert into public.marketing_services (category, category_blurb, icon, title, body, sort_order) values
  ('Digital & Social', 'Show up consistently where your customers already are.', 'Share2', 'Social Media Handling', 'Full account management — calendar, posts, captions, community replies.', 1),
  ('Digital & Social', 'Show up consistently where your customers already are.', 'Megaphone', 'Content Strategy', 'A plan for what to post and why, tied to actual business goals.', 2),
  ('Digital & Social', 'Show up consistently where your customers already are.', 'Compass', 'Digital Strategy', 'One roadmap across channels instead of disconnected one-off posts.', 3),
  ('Creative', 'The assets that make a brand feel like a brand.', 'Video', 'Video Marketing', 'Reels, product videos and brand films, shot and edited for social.', 4),
  ('Creative', 'The assets that make a brand feel like a brand.', 'Palette', 'Branding & Identity', 'Logo, colours, typography and guidelines that stay consistent everywhere.', 5),
  ('Creative', 'The assets that make a brand feel like a brand.', 'CreditCard', 'Business Materials', 'Business cards, brochures and presentation decks that match the brand.', 6),
  ('Web', 'A site that actually earns its keep.', 'Globe2', 'Website Design & Build', 'Business sites and landing pages built to load fast and convert.', 7),
  ('Web', 'A site that actually earns its keep.', 'PenTool', 'Website Redesign', 'Modernise an existing site without losing what already ranks.', 8),
  ('Web', 'A site that actually earns its keep.', 'Search', 'SEO', 'On-page, technical and local SEO so the right people find you.', 9),
  ('Growth', 'Turn attention into paying customers.', 'Rocket', 'Paid Advertising', 'Meta & Google Ads — set up, managed and optimised for cost per lead.', 10),
  ('Growth', 'Turn attention into paying customers.', 'Sparkles', 'Lead Generation', 'Landing pages and forms designed around one clear next step.', 11),
  ('Growth', 'Turn attention into paying customers.', 'BarChart3', 'Analytics & Reporting', 'Straight answers on what''s working, not a wall of dashboards.', 12)
on conflict do nothing;
