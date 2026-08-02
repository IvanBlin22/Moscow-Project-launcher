/*
# Moscow Project Launcher — Core Database Schema

## Overview
Creates the full database backing for the Moscow Project game launcher. This is a
single-tenant app with NO sign-in screen — all data is intentionally public/shared and
the frontend talks to Supabase through the anon key. Every policy is scoped to
`anon, authenticated` so the anon-key client can read and write.

## New Tables

1. `servers` — Game server entries shown in the launcher.
   - `id` (uuid, PK)
   - `name` (text) — display name
   - `ip` (text) — connection address (ip:port)
   - `online` (boolean) — whether the server is currently reachable
   - `players` (integer) — current player count
   - `max_players` (integer) — player capacity
   - `ping` (integer) — latency in ms
   - `sort_order` (integer) — display ordering
   - `created_at` (timestamptz)

2. `news` — News articles and update announcements.
   - `id` (uuid, PK)
   - `title` (text)
   - `excerpt` (text) — short summary
   - `body` (text) — full article content
   - `category` (text) — Обновление / Событие / Новость / Акция
   - `image_url` (text) — hero image
   - `published_at` (date)
   - `created_at` (timestamptz)

3. `media` — Screenshots and gallery items.
   - `id` (uuid, PK)
   - `image_url` (text)
   - `caption` (text)
   - `sort_order` (integer)
   - `created_at` (timestamptz)

4. `events` — Upcoming community events.
   - `id` (uuid, PK)
   - `title` (text)
   - `event_date` (text) — human-readable date/time
   - `type` (text) — event category
   - `created_at` (timestamptz)

5. `players` — Leaderboard entries for community ranking.
   - `id` (uuid, PK)
   - `name` (text) — in-game nickname
   - `score` (bigint) — total score
   - `rank` (integer) — leaderboard position
   - `created_at` (timestamptz)

6. `update_files` — Files tracked by the launcher's update system.
   - `id` (uuid, PK)
   - `path` (text) — file path relative to game dir
   - `size` (bigint) — file size in bytes
   - `required` (boolean) — whether the file is mandatory
   - `status` (text) — done / pending / downloading
   - `created_at` (timestamptz)

7. `launcher_stats` — Global launcher statistics (single shared row set).
   - `id` (uuid, PK)
   - `label` (text) — stat name
   - `value` (text) — stat value
   - `icon` (text) — icon identifier
   - `sort_order` (integer)
   - `created_at` (timestamptz)

## Security
- RLS enabled on ALL tables.
- All policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
  because the data is intentionally public/shared (single-tenant, no auth).
- 4 separate policies per table (SELECT, INSERT, UPDATE, DELETE).

## Important Notes
1. This migration is idempotent — safe to re-run.
2. Policies are dropped before re-creation to avoid duplicate-name errors.
3. Seed data is inserted with `ON CONFLICT DO NOTHING` so re-runs don't duplicate rows.
*/

-- ============================================================
-- 1. servers
-- ============================================================
CREATE TABLE IF NOT EXISTS servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ip text NOT NULL,
  online boolean NOT NULL DEFAULT true,
  players integer NOT NULL DEFAULT 0,
  max_players integer NOT NULL DEFAULT 1000,
  ping integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE servers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_servers" ON servers;
CREATE POLICY "anon_select_servers" ON servers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_servers" ON servers;
CREATE POLICY "anon_insert_servers" ON servers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_servers" ON servers;
CREATE POLICY "anon_update_servers" ON servers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_servers" ON servers;
CREATE POLICY "anon_delete_servers" ON servers FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 2. news
-- ============================================================
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  body text,
  category text NOT NULL DEFAULT 'Новость',
  image_url text,
  published_at date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_news" ON news;
CREATE POLICY "anon_select_news" ON news FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_news" ON news;
CREATE POLICY "anon_insert_news" ON news FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_news" ON news;
CREATE POLICY "anon_update_news" ON news FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_news" ON news;
CREATE POLICY "anon_delete_news" ON news FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 3. media
-- ============================================================
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_media" ON media;
CREATE POLICY "anon_select_media" ON media FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_media" ON media;
CREATE POLICY "anon_insert_media" ON media FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_media" ON media;
CREATE POLICY "anon_update_media" ON media FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_media" ON media;
CREATE POLICY "anon_delete_media" ON media FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 4. events
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  event_date text NOT NULL,
  type text NOT NULL DEFAULT 'Событие',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_events" ON events;
CREATE POLICY "anon_select_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_events" ON events;
CREATE POLICY "anon_insert_events" ON events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_events" ON events;
CREATE POLICY "anon_update_events" ON events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_events" ON events;
CREATE POLICY "anon_delete_events" ON events FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 5. players
-- ============================================================
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  score bigint NOT NULL DEFAULT 0,
  rank integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_players" ON players;
CREATE POLICY "anon_select_players" ON players FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_players" ON players;
CREATE POLICY "anon_insert_players" ON players FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_players" ON players;
CREATE POLICY "anon_update_players" ON players FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_players" ON players;
CREATE POLICY "anon_delete_players" ON players FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 6. update_files
-- ============================================================
CREATE TABLE IF NOT EXISTS update_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  size bigint NOT NULL DEFAULT 0,
  required boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE update_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_update_files" ON update_files;
CREATE POLICY "anon_select_update_files" ON update_files FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_update_files" ON update_files;
CREATE POLICY "anon_insert_update_files" ON update_files FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_update_files" ON update_files;
CREATE POLICY "anon_update_update_files" ON update_files FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_update_files" ON update_files;
CREATE POLICY "anon_delete_update_files" ON update_files FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 7. launcher_stats
-- ============================================================
CREATE TABLE IF NOT EXISTS launcher_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE launcher_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_launcher_stats" ON launcher_stats;
CREATE POLICY "anon_select_launcher_stats" ON launcher_stats FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_launcher_stats" ON launcher_stats;
CREATE POLICY "anon_insert_launcher_stats" ON launcher_stats FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_launcher_stats" ON launcher_stats;
CREATE POLICY "anon_update_launcher_stats" ON launcher_stats FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_launcher_stats" ON launcher_stats;
CREATE POLICY "anon_delete_launcher_stats" ON launcher_stats FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_servers_sort_order ON servers (sort_order);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_sort_order ON media (sort_order);
CREATE INDEX IF NOT EXISTS idx_players_rank ON players (rank);
CREATE INDEX IF NOT EXISTS idx_launcher_stats_sort_order ON launcher_stats (sort_order);
