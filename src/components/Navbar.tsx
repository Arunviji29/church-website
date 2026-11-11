import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Church, Sun, Moon, Globe } from 'lucide-react';
import { CHURCH } from '../data';
import { useTheme } from '../lib/theme';
import { useLanguage } from '../lib/i18n';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, isTamil } = useLanguage();

  const LINKS = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/sermons', label: t.nav.sermons },
    { to: '/events', label: t.nav.events },
    { to: '/ministries', label: t.nav.ministries },
    { to: '/prayer', label: t.nav.prayer },
    { to: '/give', label: t.nav.give },
    { to: '/live', label: t.nav.live },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const solid = scrolled || location.pathname !== '/';

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        solid
          ? 'bg-navy/95 shadow-md backdrop-blur-md'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent'
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between sm:h-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white group"
          aria-label="Grace Community Church home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/90 text-white shadow transition-transform duration-300 group-hover:scale-105">
            <Church size={20} />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight">
              {isTamil ? 'கிரேஸ் கம்யூனிட்டி' : 'Grace Community'}
            </span>
            <span
              className={`block text-[10px] font-medium uppercase tracking-[0.22em] ${
                solid ? 'text-gold-light' : 'text-white/75'
              }`}
            >
              {isTamil ? 'திருச்சபை • CHURCH' : 'Church'}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 xl:px-3.5 xl:py-2 text-xs xl:text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-white/15 text-gold-light font-semibold'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-2 flex items-center gap-2 border-l border-white/15 pl-2.5">
            {/* Language Toggle Pill */}
            <div
              className="inline-flex items-center rounded-full bg-black/25 p-0.5 border border-white/15 backdrop-blur-sm"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-gold text-white shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Switch to English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                  language === 'ta'
                    ? 'bg-gold text-white shadow-sm font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
                title="தமிழுக்கு மாற்றுக"
                aria-pressed={language === 'ta'}
              >
                தமிழ்
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t.nav.switchThemeLight : t.nav.switchThemeDark}
              title={theme === 'dark' ? t.nav.switchThemeLight : t.nav.switchThemeDark}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} />}
            </button>

            {/* CTA Button */}
            <Link
              to="/events"
              className="rounded-full bg-gold px-4 py-2 xl:px-5 xl:py-2.5 text-xs xl:text-sm font-semibold text-white shadow transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md whitespace-nowrap"
            >
              {t.nav.sundayJoin}
            </Link>
          </div>
        </div>

        {/* Mobile Actions: Language + Theme + Hamburger */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Quick Language Toggle on Mobile */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20"
            aria-label="Toggle language"
          >
            <Globe size={13} className="text-gold-light" />
            <span>{language === 'en' ? 'தமிழ்' : 'EN'}</span>
          </button>

          {/* Theme Toggle Mobile */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.nav.switchThemeLight : t.nav.switchThemeDark}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun size={19} className="text-amber-300" /> : <Moon size={19} />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Responsive & Scrollable for all screen heights) */}
      <div
        className={`overflow-hidden bg-navy/98 backdrop-blur-xl shadow-2xl transition-[max-height] duration-300 ease-in-out lg:hidden border-t border-white/10 ${
          open ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <ul className="container-site flex flex-col gap-1 py-4">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-gold-light font-semibold'
                      : 'text-white/90 hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Mobile Language and CTA row */}
          <li className="mt-3 border-t border-white/10 pt-4 px-2 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-2 border border-white/10">
              <span className="flex items-center gap-2 text-xs font-medium text-white/80 pl-2">
                <Globe size={14} className="text-gold" />
                {t.nav.language}:
              </span>
              <div className="inline-flex rounded-lg bg-black/30 p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    language === 'en'
                      ? 'bg-gold text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ta')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    language === 'ta'
                      ? 'bg-gold text-white font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            <Link
              to="/events"
              className="btn-gold w-full text-center block !py-3 font-semibold"
              onClick={() => setOpen(false)}
            >
              {t.nav.sundayJoin}
            </Link>
          </li>
        </ul>
      </div>
      <span className="sr-only">{CHURCH.name}</span>
    </header>
  );
}
