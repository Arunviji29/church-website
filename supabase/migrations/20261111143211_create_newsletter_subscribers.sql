/*
# Newsletter subscribers table

1. New Tables
- `newsletter_subscribers` — email signups from the site footer form.
  Columns: email (text, unique), created_at (timestamptz), uuid primary key.

2. Security
- RLS enabled. Anyone (anon or authenticated) can INSERT; no reads granted
  to anon (email list is private). Signed-in staff can SELECT.

3. Notes
- No destructive operations. Safe to re-apply.
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON newsletter_subscribers TO authenticated;

DROP POLICY IF EXISTS "newsletter_anyone_subscribe" ON newsletter_subscribers;
CREATE POLICY "newsletter_anyone_subscribe" ON newsletter_subscribers FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "newsletter_staff_read" ON newsletter_subscribers;
CREATE POLICY "newsletter_staff_read" ON newsletter_subscribers FOR SELECT
TO authenticated USING (auth.uid() IS NOT NULL);
