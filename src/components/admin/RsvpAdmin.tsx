import { useCallback, useEffect, useState } from 'react';
import { Loader2, Users, CalendarCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ErrorBanner, EmptyState } from './ui';
import type { ChurchEvent, EventRsvp } from '../../lib/types';

interface Props {
  events: ChurchEvent[];
}

export default function RsvpAdmin({ events }: Props) {
  const [rsvps, setRsvps] = useState<EventRsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('event_rsvps')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else {
      setRsvps(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered =
    selectedEvent === 'all'
      ? rsvps
      : rsvps.filter((r) => r.event_id === selectedEvent);

  const totalGuests = filtered.reduce((sum, r) => sum + r.guests, 0);
  const eventTitle = (id: string) =>
    events.find((e) => e.id === id)?.title ?? 'Event';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-navy">
            Event RSVPs
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            {filtered.length} RSVP{filtered.length === 1 ? '' : 's'} •{' '}
            {totalGuests} total guest{totalGuests === 1 ? '' : 's'} expected
          </p>
        </div>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-ink outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
          aria-label="Filter RSVPs by event"
        >
          <option value="all">All Events</option>
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-4">
          <ErrorBanner message={`Could not load RSVPs: ${error}`} />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={30} className="animate-spin text-gold" aria-hidden />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState message="No RSVPs yet. They'll appear here as people sign up from the events page." />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((rsvp) => (
            <li
              key={rsvp.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-pale text-gold-dark">
                <CalendarCheck size={17} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-navy">{rsvp.name}</p>
                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {eventTitle(rsvp.event_id)}
                  {rsvp.phone ? ` • ${rsvp.phone}` : ''}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-gold-light">
                <Users size={13} aria-hidden />
                {rsvp.guests} {rsvp.guests === 1 ? 'guest' : 'guests'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
