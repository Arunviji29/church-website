import { useState, type FormEvent } from 'react';
import { CheckCircle2, User, Phone, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Modal, inputClasses, ErrorBanner } from './admin/ui';
import type { ChurchEvent } from '../lib/types';

interface RsvpModalProps {
  event: ChurchEvent;
  onClose: () => void;
}

export default function RsvpModal({ event, onClose }: RsvpModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please tell us your name.');
      return;
    }
    setSaving(true);
    setError(null);

    const { error: err } = await supabase.from('event_rsvps').insert({
      event_id: event.id,
      name: name.trim(),
      phone: phone.trim(),
      guests,
    });

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    setDone(true);
  };

  return (
    <Modal title={`RSVP: ${event.title}`} onClose={onClose}>
      {done ? (
        <div className="py-6 text-center">
          <CheckCircle2 size={52} className="mx-auto text-gold" aria-hidden />
          <p className="mt-4 font-serif text-xl font-semibold text-navy">
            You're on the list, {name.trim().split(' ')[0]}!
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
            We've saved your spot{guests > 1 ? ` for ${guests} people` : ''}.
            If anything about the event changes, we'll reach out
            {phone.trim() ? ' by phone' : ''}.
          </p>
          <button onClick={onClose} className="btn-navy mt-6 px-6 py-2">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm leading-relaxed text-neutral-600">
            Let us know you're coming to{' '}
            <span className="font-semibold text-navy">{event.title}</span>
            {event.event_date ? ` on ${event.event_date}` : ''} and we'll
            save you a seat.
          </p>

          <div>
            <label
              htmlFor="rsvp-name"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
            >
              Your Name
            </label>
            <div className="relative">
              <User
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                aria-hidden
              />
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                maxLength={80}
                className={`${inputClasses} pl-10`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rsvp-phone"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
            >
              Phone
            </label>
            <div className="relative">
              <Phone
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                aria-hidden
              />
              <input
                id="rsvp-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(217) 555-0000"
                maxLength={20}
                className={`${inputClasses} pl-10`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rsvp-guests"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
            >
              Number of Guests (including you)
            </label>
            <div className="relative">
              <Users
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                aria-hidden
              />
              <input
                id="rsvp-guests"
                type="number"
                min={1}
                max={20}
                required
                value={guests}
                onChange={(e) =>
                  setGuests(
                    Math.max(1, Math.min(20, Number(e.target.value) || 1))
                  )
                }
                className={`${inputClasses} pl-10`}
              />
            </div>
          </div>

          {error && <ErrorBanner message={error} />}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-navy px-6 py-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save My Spot'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
