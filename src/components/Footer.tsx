import { Link } from 'react-router-dom';
import {
  Church,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Clock,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { CHURCH, SERVICE_TIMES } from '../data';
import { useLanguage } from '../lib/i18n';
import { useTheme } from '../lib/theme';
import NewsletterSignup from './NewsletterSignup';

const SOCIALS = [
  { href: CHURCH.socials.facebook, label: 'Facebook', Icon: Facebook },
  { href: CHURCH.socials.instagram, label: 'Instagram', Icon: Instagram },
  { href: CHURCH.socials.youtube, label: 'YouTube', Icon: Youtube },
  { href: CHURCH.socials.twitter, label: 'Twitter', Icon: Twitter },
];

export default function Footer() {
  const { t, language, setLanguage, isTamil } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const QUICK_LINKS = [
    { to: '/about', label: t.nav.about },
    { to: '/sermons', label: t.nav.sermons },
    { to: '/events', label: t.nav.events },
    { to: '/ministries', label: t.nav.ministries },
    { to: '/prayer', label: t.common.prayerWall },
    { to: '/give', label: t.common.giveOnline },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/live', label: t.common.watchLive },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-navy-dark text-white border-t border-white/10 transition-colors duration-300">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand & Socials */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/90 text-white shadow">
              <Church size={20} />
            </span>
            <span className="font-serif text-lg font-semibold">
              {isTamil ? 'கிரேஸ் கம்யூனிட்டி சர்ச்' : 'Grace Community Church'}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-sm">
            {isTamil ? t.common.tagline : CHURCH.tagline} Loving God, loving people, and serving since 1954.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all duration-200 hover:bg-gold hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Language Switcher in Footer */}
            <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs">
              <Globe size={13} className="text-gold" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`font-semibold transition-colors ${
                  language === 'en' ? 'text-gold-light' : 'text-white/60 hover:text-white'
                }`}
              >
                English
              </button>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`font-semibold transition-colors ${
                  language === 'ta' ? 'text-gold-light' : 'text-white/60 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Dark Mode Toggle in Footer */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-amber-300" />
                  <span>{t.nav.switchThemeLight}</span>
                </>
              ) : (
                <>
                  <Moon size={13} />
                  <span>{t.nav.switchThemeDark}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
            {t.common.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/75 transition-colors hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Times & Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
            {t.common.serviceTimes}
          </h3>
          <ul className="mt-4 space-y-3">
            {SERVICE_TIMES.map((s) => (
              <li key={s.name} className="flex gap-2.5 text-sm">
                <Clock
                  size={16}
                  className="mt-0.5 shrink-0 text-gold"
                  aria-hidden
                />
                <span className="text-white/75">
                  <span className="block font-medium text-white">
                    {s.name}
                  </span>
                  {s.time}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
            {t.common.getInTouch}
          </h3>
          <ul className="mt-3 space-y-2 text-xs text-white/75">
            <li className="flex gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden />
              <span>{CHURCH.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="shrink-0 text-gold" aria-hidden />
              <a href={`tel:${CHURCH.phone.replace(/\D/g, '')}`} className="hover:text-gold-light">
                {CHURCH.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${CHURCH.email}`} className="hover:text-gold-light">
                {CHURCH.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup in Footer */}
        <div>
          <NewsletterSignup variant="footer" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {isTamil ? 'கிரேஸ் கம்யூனிட்டி சர்ச்' : CHURCH.name}. {t.common.rightsReserved}
          </p>
          <p>{t.common.allWelcome}</p>
        </div>
      </div>
    </footer>
  );
}
