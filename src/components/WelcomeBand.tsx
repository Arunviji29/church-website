import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { CHURCH, SERVICE_TIMES } from '../data';
import { useLanguage } from '../lib/i18n';

export default function WelcomeBand() {
  const [nextSunday, setNextSunday] = useState('');
  const { t, isTamil, language } = useLanguage();

  useEffect(() => {
    const now = new Date();
    const d = new Date(now);
    d.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
    setNextSunday(
      d.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    );
  }, [language]);

  return (
    <section className="container-site -mt-12 relative z-10 sm:-mt-16">
      <div className="overflow-hidden rounded-3xl bg-white shadow-card-hover border border-neutral-100 dark:border-white/10 transition-colors">
        <div className="grid md:grid-cols-3">
          <div className="p-8 sm:p-10 md:col-span-2">
            <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
              {t.common.joinUsSunday}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
              {isTamil
                ? 'எந்தவிதமான தயக்கமும் இன்றி வாருங்கள் — ஜீன்ஸ் அல்லது சாதாரண உடை, தனியாகவோ அல்லது உங்கள் முழுக் குடும்பத்துடனோ. உங்களுக்காக ஒரு ஆசனம் காத்திருக்கிறது.'
                : 'Come as you are — in jeans or a suit, questioning or certain, alone or with the whole crew. There is a seat saved for you, and we would love to meet you.'}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-pale px-4 py-2 font-medium">
                <Clock size={15} className="text-gold-dark" aria-hidden />
                {isTamil ? 'இந்த ஞாயிறு' : 'This Sunday'}, {nextSunday || '9:00 & 11:00 AM'}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/events" className="btn-navy">
                {t.common.planVisit} <ArrowRight size={16} />
              </Link>
              <a href={`tel:${CHURCH.phone.replace(/\D/g, '')}`} className="btn-gold">
                {CHURCH.phone}
              </a>
            </div>
          </div>
          <div className="hidden flex-col justify-center gap-4 border-l border-neutral-100 dark:border-white/10 bg-cream p-8 md:flex">
            {SERVICE_TIMES.slice(0, 2).map((s) => (
              <div key={s.name}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  {s.name}
                </p>
                <p className="mt-1 text-sm font-medium text-navy">{s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
