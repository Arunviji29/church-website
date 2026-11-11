/*
# Prayer wall support + event RSVPs

1. Modified Tables
- `prayer_requests`: added `is_public` (boolean, default true) so people can choose whether their request appears on the public prayer wall. A length check limits requests to 2000 characters.

2. New Tables
- `event_rsvps` — one row per person saying "I'm coming" to an event: event_id (links to events, deleted along with its event), name, phone, guests (1–20), created_at.

3. Security
- RLS enabled on `event_rsvps`; `is_public` column added under existing RLS on `prayer_requests`.
- `prayer_requests`: anonymous visitors may now READ only rows marked public (the prayer wall); signed-in staff still read everything. Anyone can still submit.
- `event_rsvps`: anyone (anon or authenticated) can submit an RSVP; only signed-in staff can read the list. No updates or deletes for visitors.
- Explicit GRANTs matching exactly those verbs and roles.
- Index on event_rsvps.event_id for lookups.

4. Notes
- No destructive operations; safe to re-apply.
*/

-- 1. Prayer requests: public/private choice ---------------------------

ALTER TABLE prayer_requests ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT true;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'prayer_requests_request_len'
  ) THEN
    ALTER TABLE prayer_requests
      ADD CONSTRAINT prayer_requests_request_len CHECK (char_length(request) <= 2000);
  END IF;
END $$;

-- Anonymous visitors may read only PUBLIC requests (the prayer wall).
GRANT SELECT ON prayer_requests TO anon;

DROP POLICY IF EXISTS "prayer_requests_public_read" ON prayer_requests;
CREATE POLICY "prayer_requests_public_read" ON prayer_requests FOR SELECT
TO anon
USING (is_public = true);

-- 2. Event RSVPs --------------------------------------------------------

CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL DEFAULT '',
  guests integer NOT NULL DEFAULT 1 CHECK (guests >= 1 AND guests <= 20),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_event_rsvps_event ON event_rsvps (event_id);

ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON event_rsvps TO anon, authenticated;
GRANT SELECT ON event_rsvps TO authenticated;

DROP POLICY IF EXISTS "event_rsvps_anyone_submit" ON event_rsvps;
CREATE POLICY "event_rsvps_anyone_submit" ON event_rsvps FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "event_rsvps_staff_read" ON event_rsvps;
CREATE POLICY "event_rsvps_staff_read" ON event_rsvps FOR SELECT
TO authenticated USING (auth.uid() IS NOT NULL);
