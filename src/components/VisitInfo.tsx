import { MapPin, Phone, Mail } from 'lucide-react';
import { CHURCH } from '../data';

export default function VisitInfo() {
  return (
    <div className="rounded-2xl bg-navy p-8 text-white sm:p-10">
      <h2 className="text-2xl font-semibold sm:text-3xl">Plan Your Visit</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gold" aria-hidden />
      <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
        Finding a new church can feel overwhelming. We would love to make
        it easy — stop by the welcome desk in the lobby, or reach out
        ahead of time and we will save you a parking spot.
      </p>
      <ul className="mt-7 space-y-4 text-sm sm:text-base">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
            <MapPin size={16} aria-hidden />
          </span>
          <span>
            <span className="block font-medium">Address</span>
            <span className="text-white/70">{CHURCH.address}</span>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
            <Phone size={16} aria-hidden />
          </span>
          <span>
            <span className="block font-medium">Phone</span>
            <a
              href={`tel:${CHURCH.phone.replace(/\D/g, '')}`}
              className="text-white/70 transition-colors hover:text-gold-light"
            >
              {CHURCH.phone}
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
            <Mail size={16} aria-hidden />
          </span>
          <span>
            <span className="block font-medium">Email</span>
            <a
              href={`mailto:${CHURCH.email}`}
              className="text-white/70 transition-colors hover:text-gold-light"
            >
              {CHURCH.email}
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
}
