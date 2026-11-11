import { Link } from 'react-router-dom';
import { Play, User, Calendar, ArrowRight } from 'lucide-react';
import { Sermon, formatDate } from '../lib/types';

interface SermonCardProps {
  sermon: Sermon;
  featured?: boolean;
}

export default function SermonCard({ sermon, featured = false }: SermonCardProps) {
  return (
    <Link
      to={`/sermons/${sermon.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div
        className={`relative overflow-hidden ${
          featured ? 'aspect-video lg:aspect-auto lg:w-3/5' : 'aspect-video'
        }`}
      >
        {sermon.thumbnail_url ? (
          <img
            src={sermon.thumbnail_url}
            alt={sermon.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-navy" aria-hidden />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-navy/30 transition-colors duration-300 group-hover:bg-navy/45">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/95 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={22} fill="currentColor" className="ml-0.5" />
          </span>
        </div>
        {sermon.topic && (
          <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-light">
            {sermon.topic}
          </span>
        )}
      </div>
      <div className={`p-6 ${featured ? 'lg:w-2/5 lg:p-8' : ''}`}>
        <h3
          className={`font-semibold text-navy group-hover:text-gold-dark ${
            featured ? 'text-2xl' : 'text-lg'
          }`}
        >
          {sermon.title}
        </h3>
        {sermon.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {sermon.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
          {sermon.speaker && (
            <span className="inline-flex items-center gap-1.5">
              <User size={13} aria-hidden /> {sermon.speaker}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} aria-hidden /> {formatDate(sermon.sermon_date)}
          </span>
        </div>
        {featured && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
            Watch now
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </Link>
  );
}
