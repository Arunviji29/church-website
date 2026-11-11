import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gold" aria-hidden />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-gold-light">
          <Lock size={26} aria-hidden />
        </span>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-navy">
          Staff sign-in required
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
          This area is for church staff. Please sign in with your church
          account to continue.
        </p>
        <Link to="/login" className="btn-navy mt-7">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
