import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { supabase } from '../lib/supabase';

interface NewsletterSignupProps {
  variant?: 'section' | 'footer' | 'card';
  className?: string;
}

const STORAGE_KEY = 'grace-newsletter-subscribed';

export default function NewsletterSignup({
  variant = 'section',
  className = '',
}: NewsletterSignupProps) {
  const { t, isTamil } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError(t.newsletter.errorEmpty);
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError(t.newsletter.errorInvalid);
      return;
    }

    setLoading(true);

    try {
      // Save locally first
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
        const existingRaw = localStorage.getItem('grace_newsletter_subscribers');
        const subscribers = existingRaw ? JSON.parse(existingRaw) : [];
        subscribers.push({
          email: trimmedEmail,
          name: name.trim() || undefined,
          date: new Date().toISOString(),
          language: isTamil ? 'ta' : 'en',
        });
        localStorage.setItem('grace_newsletter_subscribers', JSON.stringify(subscribers));
      } catch {
        // ignore storage errors
      }

      // Also try to insert into supabase newsletter_subscribers if table exists
      try {
        await supabase.from('newsletter_subscribers').insert([
          {
            email: trimmedEmail,
            name: name.trim() || null,
            language: isTamil ? 'ta' : 'en',
            subscribed_at: new Date().toISOString(),
          },
        ]);
      } catch {
        // Table might not exist yet, local state is sufficient
      }

      setSuccess(true);
      setEmail('');
      setName('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'footer') {
    return (
      <div className={`space-y-3 ${className}`}>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
          {t.newsletter.badge}
        </h3>
        <p className="text-xs leading-relaxed text-white/75">
          {t.newsletter.subtitle}
        </p>

        {success ? (
          <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 text-xs text-gold-light">
            <CheckCircle2 size={16} className="shrink-0 text-gold" />
            <span>{t.newsletter.successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.emailPlaceholder}
                className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 pr-10 text-xs text-white placeholder-white/50 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                disabled={loading}
                aria-label={t.newsletter.emailPlaceholder}
              />
              <button
                type="submit"
                disabled={loading}
                aria-label={t.newsletter.subscribeBtn}
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-lg bg-gold text-white transition-all hover:bg-gold-dark disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <ArrowRight size={13} />
                )}
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-1 text-[11px] text-amber-300">
                <AlertCircle size={12} className="shrink-0" />
                {error}
              </p>
            )}
            <p className="text-[10px] text-white/50">{t.newsletter.privacyNote}</p>
          </form>
        )}
      </div>
    );
  }

  // Section variant (full width)
  return (
    <section className={`relative overflow-hidden py-16 sm:py-20 ${className}`}>
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-dark p-8 sm:p-12 lg:p-16 text-white shadow-card-hover border border-white/10">
          {/* Subtle decorative circles */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy-light/40 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light backdrop-blur-sm">
              <Sparkles size={14} className="text-gold" />
              {t.newsletter.badge}
            </span>

            <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl text-white">
              {t.newsletter.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base max-w-2xl mx-auto">
              {t.newsletter.subtitle}
            </p>

            {success ? (
              <div className="mt-8 mx-auto max-w-md rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm border border-gold/30">
                <CheckCircle2 size={36} className="mx-auto text-gold mb-2" />
                <h3 className="font-serif text-xl font-semibold text-white">
                  {t.newsletter.subscribed}
                </h3>
                <p className="mt-1 text-sm text-white/85">
                  {t.newsletter.successMsg}
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-xs font-semibold text-gold-light underline underline-offset-2 hover:text-white"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                  <div className="relative flex-1">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                      aria-hidden
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.newsletter.emailPlaceholder}
                      className="w-full rounded-full border border-white/20 bg-white/10 pl-11 pr-5 py-3.5 text-sm text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-gold focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-gold/40"
                      disabled={loading}
                      aria-label={t.newsletter.emailPlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold whitespace-nowrap !py-3.5 !px-8 text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{t.newsletter.subscribing}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.newsletter.subscribeBtn}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-amber-300">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </p>
                )}

                <p className="text-xs text-white/60">
                  {t.newsletter.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

