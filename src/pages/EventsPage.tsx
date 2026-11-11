import { useState } from 'react';
import { CalendarPlus, MapPin, Clock, ArrowRight, Loader2, CalendarCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import VisitInfo from '../components/VisitInfo';
import RsvpModal from '../components/RsvpModal';
import SEO from '../components/SEO';
import { ErrorBanner, EmptyState } from '../components/admin/ui';
import { useEvents } from '../lib/hooks';
import { formatDay, formatMonth } from '../lib/types';
import type { ChurchEvent } from '../lib/types';
import { IMAGES } from '../data';

export default function EventsPage() {
  const { events, loading, error } = useEvents(true);
  const [rsvpEvent, setRsvpEvent] = useState<ChurchEvent | null>(null);

  return (
    <>
      <SEO
        title="Upcoming Events — Festivals, Worship Nights & Community Gatherings"
        description="See all upcoming events at Grace Community Church — festivals, worship nights, brunches, Christmas services, and community gatherings. RSVP online!"
        image={IMAGES.community}
      />
      <PageHero
        title="Upcoming Events"
        subtitle="Festivals, brunches, nights of worship — the best way to meet the family is to show up."
        image={IMAGES.community}
      />

      <section className="container-site py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {error && (
              <ErrorBanner message={`Could not load events: ${error}`} />
            )}

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2
                  size={36}
                  className="animate-spin text-gold"
                  aria-hidden
                />
              </div>
            ) : events.length === 0 ? (
              <EmptyState message="No upcoming events on the calendar right now — check back soon, or subscribe to the newsletter." />
            ) : (
              events.map((event) => (
                <article
                  key={event.id}
                  className="group grid overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:grid-cols-[110px_1fr_220px]"
                >
                  <div className="flex items-center justify-center bg-navy py-4 text-white sm:py-0">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gold-light">
                        {formatDay(event.event_date)}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                        {formatMonth(event.event_date)}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h2 className="text-xl font-semibold text-navy transition-colors group-hover:text-gold-dark">
                      {event.title}
                    </h2>
                    <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                      <li className="flex items-center gap-2">
                        <CalendarPlus
                          size={15}
                          className="text-gold-dark"
                          aria-hidden
                        />
                        {new Date(
                          event.event_date + 'T12:00:00'
                        ).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </li>
                      {event.time && (
                        <li className="flex items-center gap-2">
                          <Clock
                            size={15}
                            className="text-gold-dark"
                            aria-hidden
                          />
                          {event.time}
                        </li>
                      )}
                      {event.location && (
                        <li className="flex items-center gap-2">
                          <MapPin
                            size={15}
                            className="text-gold-dark"
                            aria-hidden
                          />
                          {event.location}
                        </li>
                      )}
                    </ul>
                    {event.description && (
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {event.description}
                      </p>
                    )}
                    <span className="mt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setRsvpEvent(event)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-dark"
                      >
                        <CalendarCheck size={15} aria-hidden />
                        RSVP
                      </button>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
                        We'd love to see you there
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </div>
                  {event.image_url && (
                    <div className="hidden sm:block">
                      <img
                        src={event.image_url}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                </article>
              ))
            )}
          </div>

          <aside className="lg:pt-4">
            <div className="lg:sticky lg:top-28">
              <VisitInfo />
            </div>
          </aside>
        </div>
      </section>

      {rsvpEvent && (
        <RsvpModal event={rsvpEvent} onClose={() => setRsvpEvent(null)} />
      )}
    </>
  );
}
