import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ChurchEvent, formatDate, formatDay, formatMonth } from '../lib/types';

export default function EventCard({ event }: { event: ChurchEvent }) {
  return (
    <Link
      to="/events"
      className="group flex overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="flex w-20 shrink-0 flex-col items-center justify-center bg-navy text-white sm:w-24">
        <span className="text-2xl font-bold text-gold-light sm:text-3xl">
          {formatDay(event.event_date)}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
          {formatMonth(event.event_date)}
        </span>
      </div>
      <div className="min-w-0 flex-1 p-5">
        <h3 className="text-lg font-semibold text-navy transition-colors group-hover:text-gold-dark">
          {event.title}
        </h3>
        <ul className="mt-3 space-y-1.5 text-xs text-neutral-600 sm:text-sm">
          <li className="flex items-center gap-2">
            <CalendarDays size={14} className="text-gold-dark" aria-hidden />
            {formatDate(event.event_date)}
          </li>
          {event.time && (
            <li className="flex items-center gap-2">
              <Clock size={14} className="text-gold-dark" aria-hidden />
              {event.time}
            </li>
          )}
          {event.location && (
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-gold-dark" aria-hidden />
              {event.location}
            </li>
          )}
        </ul>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark opacity-0 transition-all duration-300 group-hover:opacity-100">
          View details <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}
