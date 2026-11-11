/*
# Donations table for the Give page

1. New Tables
- `donations` — records each gift pledge submitted from the Give page.
  Columns: name (text, default 'Anonymous'), amount (numeric, must be > 0),
  purpose (text: 'tithe' | 'offering' | 'building fund'), note (optional text),
  created_at (timestamptz). uuid primary key.

2. Security
- RLS enabled on `donations`.
- Anyone (anon or authenticated) can INSERT a donation record — the public
  Give page submits pledges without a sign-in screen.
- Only signed-in staff (authenticated) can READ donations — financial data
  is not public.
- No UPDATE or DELETE grants or policies: donations are immutable once
  submitted, by design.
- Explicit GRANTs matching exactly those verbs and roles.

3. Notes
- No destructive operations. Safe to re-apply (DROP POLICY IF EXISTS + idempotent CREATE).
- amount uses numeric(12,2) to store currency precisely.
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Anonymous',
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  purpose text NOT NULL DEFAULT 'offering' CHECK (purpose IN ('tithe','offering','building fund')),
  note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON donations TO anon, authenticated;
GRANT SELECT ON donations TO authenticated;

DROP POLICY IF EXISTS "donations_anyone_submit" ON donations;
CREATE POLICY "donations_anyone_submit" ON donations FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "donations_staff_read" ON donations;
CREATE POLICY "donations_staff_read" ON donations FOR SELECT
TO authenticated USING (auth.uid() IS NOT NULL);
