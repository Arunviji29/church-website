import { useState } from 'react';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '../lib/hooks';
import { useLanguage } from '../lib/i18n';

const DISMISSED_KEY = 'grace-banner-dismissed';

export default function AnnouncementBanner() {
  const { announcements } = useAnnouncements();
  const { t } = useLanguage();
  const [dismissedId, setDismissedId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(DISMISSED_KEY);
    } catch {
      return null;
    }
  });

  // Get active announcement from Supabase or fallback to default
  const supabaseLatest = announcements.find((a) => a.pinned) ?? announcements[0];
  const activeId = supabaseLatest ? supabaseLatest.id : 'default-sunday-banner';

  const isDismissed = dismissedId === activeId;

  if (isDismissed) return null;

  const handleDismiss = () => {
    setDismissedId(activeId);
    try {
      localStorage.setItem(DISMISSED_KEY, activeId);
    } catch {
      // private browsing
    }
  };

  const title = supabaseLatest
    ? supabaseLatest.title
    : t.banner.defaultTitle;

  const body = supabaseLatest
    ? supabaseLatest.body
    : t.banner.defaultBody;

  return (
    <aside
      aria-label="Important Announcement"
      className="relative z-50 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white shadow-sm transition-all duration-300"
    >
      <div className="container-site flex items-center justify-between gap-3 py-2.5 sm:py-2">
        <div className="flex flex-1 items-center justify-center gap-2.5 text-center sm:gap-3 pr-8 sm:pr-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <Megaphone size={12} className="shrink-0" aria-hidden />
            {t.banner.badge}
          </span>

          <p className="text-xs font-medium sm:text-sm leading-tight text-white flex flex-wrap items-center justify-center gap-1.5">
            <span className="font-semibold">{title}</span>
            {body && (
              <span className="hidden md:inline text-white/90">
                — {body}
              </span>
            )}
            <Link
              to="/events"
              className="inline-flex items-center gap-1 font-bold underline underline-offset-2 transition-colors hover:text-navy ml-1"
            >
              <span>{t.banner.learnMore}</span>
              <ArrowRight size={13} className="shrink-0" />
            </Link>
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t.banner.dismiss}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
