/*
# Seed gallery photos grouped by album/event

1. Modified Tables
- `gallery` — no schema changes. The existing `title` column is used as the
  photo title, `caption` as a short description, `image_url` as the photo,
  and `sort_order` for ordering. To group photos into albums, we add a new
  `album` text column so photos can be grouped by event/album name.

2. New Columns
- `gallery.album` (text, NOT NULL, default 'General') — the album/event name
  the photo belongs to.

3. Seed Data
- Four albums seeded with real Pexels photos:
  - 'Community Fall Festival' (3 photos)
  - 'Sunday Worship' (4 photos)
  - 'Christmas Eve Candlelight' (4 photos)
  - 'Outreach & Serve Day' (3 photos)
- Fixed uuid ids for deterministic rebuilds. ON CONFLICT DO NOTHING.

4. Notes
- No destructive operations. Safe to re-apply.
- Only adds a column and inserts rows; existing data is preserved.
*/

ALTER TABLE gallery ADD COLUMN IF NOT EXISTS album text NOT NULL DEFAULT 'General';

CREATE INDEX IF NOT EXISTS idx_gallery_album_sort ON gallery (album, sort_order);

INSERT INTO gallery (id, album, title, image_url, caption, sort_order) VALUES
  ('33333333-3333-4333-8333-333333333301', 'Community Fall Festival', 'Festival Kickoff',
   'https://images.pexels.com/photos/4388088/pexels-photo-4388088.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'The lawn lit up as the sun set on our fall festival.', 1),
  ('33333333-3333-4333-8333-333333333302', 'Community Fall Festival', 'Bluegrass & Food Trucks',
   'https://images.pexels.com/photos/30816551/pexels-photo-30816551.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Live bluegrass and a row of food trucks — a perfect fall afternoon.', 2),
  ('33333333-3333-4333-8333-333333333303', 'Community Fall Festival', 'Festival Parade',
   'https://images.pexels.com/photos/12333353/pexels-photo-12333353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Our kids led the way down Harmony Lane.', 3),

  ('33333333-3333-4333-8333-333333333311', 'Sunday Worship', 'Choir in Full Voice',
   'https://images.pexels.com/photos/8815037/pexels-photo-8815037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'The Grace Choir leading worship on a Sunday morning.', 1),
  ('33333333-3333-4333-8333-333333333312', 'Sunday Worship', 'Congregation Singing',
   'https://images.pexels.com/photos/8815016/pexels-photo-8815016.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'The whole church family singing together.', 2),
  ('33333333-3333-4333-8333-333333333313', 'Sunday Worship', 'Choir in Red Robes',
   'https://images.pexels.com/photos/8815034/pexels-photo-8815034.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'A special Sunday with the choir in red.', 3),
  ('33333333-3333-4333-8333-333333333314', 'Sunday Worship', 'Worship in Color',
   'https://images.pexels.com/photos/34328505/pexels-photo-34328505.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Lights and praise in the sanctuary.', 4),

  ('33333333-3333-4333-8333-333333333321', 'Christmas Eve Candlelight', 'Candlelight Choir',
   'https://images.pexels.com/photos/730588/pexels-photo-730588.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Our choir singing carols by candlelight.', 1),
  ('33333333-3333-4333-8333-333333333322', 'Christmas Eve Candlelight', 'Adorned Altar',
   'https://images.pexels.com/photos/35207620/pexels-photo-35207620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'The altar ready for Christmas Eve services.', 2),
  ('33333333-3333-4333-8333-333333333323', 'Christmas Eve Candlelight', 'Candles of Peace',
   'https://images.pexels.com/photos/32531224/pexels-photo-32531224.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Silent night, holy night — candles aglow.', 3),
  ('33333333-3333-4333-8333-333333333324', 'Christmas Eve Candlelight', 'Christmas Mass',
   'https://images.pexels.com/photos/35360219/pexels-photo-35360219.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'A full sanctuary for Christmas Eve Mass.', 4),

  ('33333333-3333-4333-8333-333333333331', 'Outreach & Serve Day', 'Food Pantry Blessing',
   'https://images.pexels.com/photos/9090750/pexels-photo-9090750.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Packing groceries for families in our neighborhood.', 1),
  ('33333333-3333-4333-8333-333333333332', 'Outreach & Serve Day', 'High-Five Friday',
   'https://images.pexels.com/photos/8042458/pexels-photo-8042458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Volunteers and kids sharing joy on Serve Day.', 2),
  ('33333333-3333-4333-8333-333333333333', 'Outreach & Serve Day', 'Team Grace',
   'https://images.pexels.com/photos/6646861/pexels-photo-6646861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   'Our Serve Day crew ready to head out.', 3)
ON CONFLICT (id) DO NOTHING;
