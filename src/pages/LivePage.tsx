import { useEffect, useState } from 'react';
import { Radio, Calendar, Clock, Users, Bell } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { IMAGES } from '../data';

const SUNDAY_SERVICE_HOUR = 9; // 9:00 AM first service
const SUNDAY_SERVICE_MIN = 0;

function getNextSundayService(now: Date): Date {
  const d = new Date(now);
  const day = d.getDay();
  let daysUntilSunday = (7 - day) % 7;
  if (daysUntilSunday === 0 && (d.getHours() > SUNDAY_SERVICE_HOUR ||
      (d.getHours() === SUNDAY_SERVICE_HOUR && d.getMinutes() >= SUNDAY_SERVICE_MIN))) {
    daysUntilSunday = 7;
  }
  d.setDate(d.getDate() + daysUntilSunday);
  d.setHours(SUNDAY_SERVICE_HOUR, SUNDAY_SERVICE_MIN, 0, 0);
  return d;
}

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(target: Date, now: Date): CountdownParts {
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

const UNIT_CARDS: { key: keyof CountdownParts; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function LivePage() {
  const [now, setNow] = useState(() => new Date());
  const [target, setTarget] = useState(() => getNextSundayService(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setNow(current);
      if (current.getTime() >= target.getTime()) {
        setTarget(getNextSundayService(current));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const countdown = getCountdown(target, now);
  const isLiveNow = now.getDay() === 0 &&
    now.getHours() >= SUNDAY_SERVICE_HOUR &&
    now.getHours() < SUNDAY_SERVICE_HOUR + 2;

  return (
    <>
      <SEO
        title="Watch Live — Sunday Worship Stream & Live Chat"
        description="Stream Sunday Worship live with Grace Community Church every Sunday at 9:00 AM & 11:00 AM. Experience the music, sermon, and live prayer wherever you are."
        image={IMAGES.worship}
      />
      <PageHero
        title="Watch Live"
        subtitle="Join us in person or online — our Sunday service streams live right here every week."
        image={IMAGES.worship}
      />

      <section className="container-site py-16 sm:py-20">
        {/* Status banner */}
        <div
          className={`flex items-center justify-center gap-2.5 rounded-full py-3 text-sm font-semibold ${
            isLiveNow
              ? 'bg-red-50 text-red-700'
              : 'bg-gold-pale text-gold-dark'
          }`}
        >
          <span
            className={`relative flex h-2.5 w-2.5 ${
              isLiveNow ? '' : 'opacity-60'
            }`}
            aria-hidden
          >
            {isLiveNow && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                isLiveNow ? 'bg-red-500' : 'bg-gold'
              }`}
            />
          </span>
          {isLiveNow ? 'LIVE NOW — service in progress' : 'Next service starts soon'}
        </div>

        {/* Countdown */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <h2 className="flex items-center justify-center gap-2 font-serif text-2xl font-semibold text-navy">
            <Calendar size={22} className="text-gold-dark" aria-hidden />
            Countdown to Sunday Service
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {target.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}{' '}
            at {target.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>

          <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
            {UNIT_CARDS.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl bg-navy p-4 text-center shadow-card sm:p-6"
              >
                <p className="font-serif text-3xl font-bold tabular-nums text-gold-light sm:text-4xl lg:text-5xl">
                  {pad(countdown[key])}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/70 sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube embed */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-navy shadow-card-hover">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/live_stream?channel=UCvwMpYOo5ewyq5rxe3SyrRA"
                title="Grace Community Church Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <Radio size={15} className="text-gold-dark" aria-hidden />
            If the stream hasn't started yet, it will go live automatically at 9:00 AM on Sunday.
          </p>
        </div>

        {/* Service info cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              Icon: Clock,
              title: 'Sundays at 9 & 11 AM',
              text: 'Two identical services — join whichever fits your morning.',
            },
            {
              Icon: Users,
              title: 'Grace Kids Available',
              text: 'Nursery and children’s ministry at both services.',
            },
            {
              Icon: Bell,
              title: 'Get a Reminder',
              text: 'Subscribe to our newsletter for a Sunday morning nudge.',
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 text-center shadow-card"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-pale text-gold-dark">
                <Icon size={20} aria-hidden />
              </span>
              <h3 className="mt-3 font-serif text-base font-semibold text-navy">
                {title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
