import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-7xl font-semibold text-gold">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-navy sm:text-4xl">
        This page seems to be missing
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-neutral-600">
        The page you are looking for may have been moved — but
        everywhere you turn around here, you will find a warm welcome.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-navy">
          <Home size={16} /> Back to Home
        </Link>
        <Link to="/sermons" className="btn-gold">
          <Search size={16} /> Browse Sermons
        </Link>
      </div>
    </section>
  );
}
