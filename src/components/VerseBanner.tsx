import { MapPin, Clock } from 'lucide-react';

export interface Verse {
  reference: string;
  text: string;
}

export default function VerseBanner({ verse }: { verse: Verse }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #c9a14a 0, transparent 40%), radial-gradient(circle at 80% 70%, #c9a14a 0, transparent 45%)',
        }}
        aria-hidden
      />
      <div className="container-site relative py-16 text-center sm:py-20">
        <span
          className="font-serif text-6xl leading-none text-gold/60"
          aria-hidden
        >
          “
        </span>
        <blockquote className="mx-auto max-w-3xl">
          <p className="font-serif text-xl italic leading-relaxed text-white sm:text-2xl">
            {verse.text}
          </p>
          <footer className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
            <MapPin size={14} aria-hidden />
            {verse.reference}
          </footer>
        </blockquote>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/70">
          <Clock size={12} aria-hidden /> A new verse greets you each day
        </p>
      </div>
    </section>
  );
}
