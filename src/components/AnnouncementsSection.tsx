import { Link } from 'react-router-dom';
import { CalendarDays, Pin, ArrowRight, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useAnnouncements, useEvents } from '../lib/hooks';
import { formatDate } from '../lib/types';
import { useLanguage } from '../lib/i18n';

const FALLBACK_ANNOUNCEMENTS = [
  {
    id: 'fb-1',
    title: 'Sunday Worship Services & Tamil Fellowship',
    titleTa: 'ஞாயிறு ஆராதனை & தமிழ் ஐக்கியக் கூட்டம்',
    body: 'Join us for in-person Sunday worship at 9:00 AM & 11:00 AM. Simultaneous Tamil translation and kids ministry are provided.',
    bodyTa: 'காலை 9:00 & 11:00 மணிக்கு நேரில் ஆராதனையில் பங்குபெறுங்கள். தமிழ் மொழிபெயர்ப்பு மற்றும் குழந்தைகள் ஊழியம் உண்டு.',
    pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb-2',
    title: 'Midweek Prayer & Bible Study',
    titleTa: 'வாரமத்திய ஜெபம் & வேத தியானம்',
    body: 'Wednesdays at 6:30 PM in the Fellowship Hall. Refreshments, small group discussions, and guided prayer.',
    bodyTa: 'புதன்கிழமை மாலை 6:30 மணிக்கு ஐக்கிய மண்டபத்தில். சிற்றுண்டி, வேத ஆராய்ச்சி மற்றும் ஜெபக் கூடுகை.',
    pinned: false,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'fb-3',
    title: 'Community Food Pantry & Benevolence Drive',
    titleTa: 'சமூக உணவு வங்கி & உதவி ஊழியம்',
    body: 'Help us pack grocery boxes for local families this Saturday morning at 9:00 AM. All volunteers welcome!',
    bodyTa: 'இந்த சனிக்கிழமை காலை 9:00 மணிக்கு உணவுப் பொட்டலங்கள் தயாரிக்கும் ஊழியம். அனைவரும் அன்போடு வரவேற்கப்படுகிறீர்கள்!',
    pinned: false,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export default function AnnouncementsSection() {
  const { announcements, loading } = useAnnouncements();
  const { events } = useEvents(true);
  const { isTamil } = useLanguage();

  if (loading && announcements.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 size={28} className="animate-spin text-gold" aria-hidden />
      </div>
    );
  }

  const displayList = announcements.length > 0 ? announcements : FALLBACK_ANNOUNCEMENTS;

  return (
    <section className="container-site pb-4 pt-8 sm:pt-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading
            align="left"
            eyebrow={isTamil ? 'சபை செய்திகள்' : 'Church news'}
            title={isTamil ? 'அறிவிப்புகள்' : 'Announcements'}
          />
          <ul className="mt-8 space-y-4">
            {displayList.slice(0, 3).map((a) => {
              const itemTitle = isTamil && 'titleTa' in a ? (a as typeof FALLBACK_ANNOUNCEMENTS[0]).titleTa : a.title;
              const itemBody = isTamil && 'bodyTa' in a ? (a as typeof FALLBACK_ANNOUNCEMENTS[0]).bodyTa : a.body;

              return (
                <li
                  key={a.id}
                  className="flex gap-4 rounded-2xl bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover border border-neutral-100 dark:border-white/10"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      a.pinned
                        ? 'bg-gold-pale text-gold-dark'
                        : 'bg-neutral-100 text-neutral-400 dark:bg-white/10 dark:text-neutral-300'
                    }`}
                  >
                    {a.pinned ? (
                      <Pin size={16} className="rotate-45" aria-hidden />
                    ) : (
                      <CalendarDays size={16} aria-hidden />
                    )}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{itemTitle}</h3>
                    {itemBody && (
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {itemBody}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-neutral-400">
                      {a.created_at ? formatDate(a.created_at.slice(0, 10)) : ''}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {events.length > 0 && (
          <div className="rounded-2xl bg-navy p-7 text-white shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                {isTamil ? 'அடுத்த நிகழ்வு' : 'Next on the calendar'}
              </h3>
              <p className="mt-4 font-serif text-2xl font-semibold">
                {events[0].title}
              </p>
              <p className="mt-2 text-sm text-white/70">
                {formatDate(events[0].event_date)}
                {events[0].time ? ` • ${events[0].time}` : ''}
              </p>
            </div>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-white"
            >
              {isTamil ? 'அனைத்து நிகழ்வுகளும்' : 'All upcoming events'} <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
