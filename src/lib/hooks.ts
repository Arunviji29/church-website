import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase';
import type { Sermon, ChurchEvent, Announcement, PrayerRequest, GalleryItem } from './types';

export function useSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('sermons')
      .select('*')
      .order('sermon_date', { ascending: false });
    if (err) setError(err.message);
    else {
      setSermons(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { sermons, loading, error, reload: load };
}

export function useEvents(upcomingOnly = false) {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('events').select('*');
    if (upcomingOnly) {
      query = query.gte('event_date', new Date().toISOString().slice(0, 10));
    }
    const { data, error: err } = await query.order('event_date', { ascending: true });
    if (err) setError(err.message);
    else {
      setEvents(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, [upcomingOnly]);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, error, reload: load };
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('announcements')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else {
      setAnnouncements(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { announcements, loading, error, reload: load };
}

export function usePublicPrayerRequests() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('prayer_requests')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(50);
    if (err) setError(err.message);
    else {
      setRequests(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { requests, loading, error, reload: load };
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('gallery')
      .select('*')
      .order('album', { ascending: true })
      .order('sort_order', { ascending: true });
    if (err) setError(err.message);
    else {
      setItems(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: load };
}
