export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  sermon_date: string;
  topic: string;
  scripture: string;
  description: string;
  youtube_id: string;
  thumbnail_url: string;
  created_at: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  time: string;
  location: string;
  image_url: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  is_public: boolean;
  created_at: string;
}

export interface EventRsvp {
  id: string;
  event_id: string;
  name: string;
  phone: string;
  guests: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  album: string;
  title: string;
  image_url: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

export type DonationPurpose = 'tithe' | 'offering' | 'building fund';

export interface Donation {
  id: string;
  name: string;
  amount: number;
  purpose: DonationPurpose;
  note: string;
  created_at: string;
}

export type SermonInput = Omit<Sermon, 'id' | 'created_at'>;
export type EventInput = Omit<ChurchEvent, 'id' | 'created_at'>;
export type AnnouncementInput = Omit<Announcement, 'id' | 'created_at'>;

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDay(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return String(d.getDate()).padStart(2, '0');
}

export function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short' });
}
