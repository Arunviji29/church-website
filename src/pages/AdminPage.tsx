import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useSermons, useEvents, useAnnouncements } from '../lib/hooks';
import SermonAdmin from '../components/admin/SermonAdmin';
import EventAdmin from '../components/admin/EventAdmin';
import AnnouncementAdmin from '../components/admin/AnnouncementAdmin';
import RsvpAdmin from '../components/admin/RsvpAdmin';
import { ErrorBanner } from '../components/admin/ui';

type Tab = 'sermons' | 'events' | 'announcements' | 'rsvps';

const TABS: { key: Tab; label: string }[] = [
  { key: 'sermons', label: 'Sermons' },
  { key: 'events', label: 'Events' },
  { key: 'announcements', label: 'Announcements' },
  { key: 'rsvps', label: 'RSVPs' },
];

export default function AdminPage() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('sermons');
  const [refreshing, setRefreshing] = useState(false);

  const sermons = useSermons();
  const events = useEvents(false);
  const announcements = useAnnouncements();

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([sermons.reload(), events.reload(), announcements.reload()]);
    setRefreshing(false);
  };

  const error =
    sermons.error || events.error || announcements.error || null;

  return (
    <section className="bg-cream py-10 sm:py-14">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
              Staff Dashboard
            </p>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-navy">
              Church Administration
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Signed in as{' '}
              <span className="font-medium text-navy">
                {session?.user.email}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-navy transition-colors hover:bg-neutral-50 disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={refreshing ? 'animate-spin' : ''}
              />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6">
            <ErrorBanner message={`Could not load content: ${error}`} />
          </div>
        )}

        <div className="mt-8 flex gap-1 rounded-full bg-white p-1.5 shadow-card sm:inline-flex">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                tab === key
                  ? 'bg-navy text-white shadow'
                  : 'text-neutral-500 hover:text-navy'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'sermons' && (
            <SermonAdmin sermons={sermons.sermons} reload={sermons.reload} />
          )}
          {tab === 'events' && (
            <EventAdmin events={events.events} reload={events.reload} />
          )}
          {tab === 'announcements' && (
            <AnnouncementAdmin
              announcements={announcements.announcements}
              reload={announcements.reload}
            />
          )}
          {tab === 'rsvps' && <RsvpAdmin events={events.events} />}
        </div>
      </div>
    </section>
  );
}
