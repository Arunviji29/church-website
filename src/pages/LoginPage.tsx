import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, LogIn } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../lib/auth';

export default function LoginPage() {
  const { session, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) {
      navigate('/admin', { replace: true });
    }
  }, [loading, session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) setError(err);
    else navigate('/admin', { replace: true });
  };

  const inputClasses =
    'w-full rounded-xl border border-neutral-200 bg-cream px-4 py-3 pl-11 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-gold focus:ring-2 focus:ring-gold/30';

  return (
    <>
      <SEO
        title="Admin Sign In"
        description="Church staff and admin portal for Grace Community Church."
      />
      <section className="container-site flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-dark"
        >
          <ArrowLeft size={16} /> Back to website
        </Link>
        <div className="rounded-2xl bg-white p-8 shadow-card sm:p-10">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-light">
              <Lock size={22} aria-hidden />
            </span>
            <h1 className="mt-4 font-serif text-2xl font-semibold text-navy">
              Staff Login
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Sign in to manage sermons, events, and announcements.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  aria-hidden
                />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@gracecommunity.church"
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  aria-hidden
                />
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className={inputClasses}
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-navy w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
              <LogIn size={15} />
            </button>
          </form>
        </div>
      </div>
    </section>
  </>
  );
}
