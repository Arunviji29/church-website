import { useState, type FormEvent } from 'react';
import {
  Heart,
  CheckCircle2,
  Copy,
  Building2,
  Church,
  Sparkles,
  Loader2,
  QrCode,
  Landmark,
  User,
  IndianRupee,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { ErrorBanner } from '../components/admin/ui';
import { supabase } from '../lib/supabase';
import { CHURCH } from '../data';
import type { DonationPurpose } from '../lib/types';

const HERO_IMAGE =
  'https://images.pexels.com/photos/14587105/pexels-photo-14587105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const PURPOSES: {
  key: DonationPurpose;
  label: string;
  description: string;
  Icon: typeof Church;
}[] = [
  {
    key: 'tithe',
    label: 'Tithe',
    description: 'Your regular giving that sustains the weekly life of the church.',
    Icon: Church,
  },
  {
    key: 'offering',
    label: 'Offering',
    description: 'Gifts above the tithe for ministries, missions, and outreach.',
    Icon: Sparkles,
  },
  {
    key: 'building fund',
    label: 'Building Fund',
    description: 'Help us expand our home — a place for every generation to gather.',
    Icon: Building2,
  },
];

const QUICK_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const inputClasses =
  'w-full rounded-xl border border-neutral-200 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-gold focus:ring-2 focus:ring-gold/30';

function buildUpiUrl(amount: string, purpose: string): string {
  const pa = CHURCH.giving.upiId;
  const pn = CHURCH.giving.upiName;
  const am = amount || '0';
  const tn = `Grace — ${purpose}`;
  return `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&am=${encodeURIComponent(am)}&tn=${encodeURIComponent(tn)}&cu=USD`;
}

function qrImageUrl(data: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(data)}`;
}

export default function GivePage() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState<DonationPurpose>('tithe');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const parsedAmount = parseFloat(amount) || 0;
  const purposeLabel = PURPOSES.find((p) => p.key === purpose)?.label ?? '';
  const upiUrl = buildUpiUrl(parsedAmount.toFixed(2), purposeLabel);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) {
      setSubmitError('Please enter an amount greater than zero.');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    const { error: err } = await supabase.from('donations').insert({
      name: name.trim() || 'Anonymous',
      amount: parsedAmount,
      purpose,
      note: note.trim(),
    });

    if (err) {
      setSubmitError(err.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setAmount('');
    setPurpose('tithe');
    setNote('');
    setSubmitError(null);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  if (submitted) {
    return (
      <>
        <PageHero
          title="Give"
          subtitle="Your generosity makes everything we do possible — thank you for partnering with us."
          image={HERO_IMAGE}
        />
        <section className="container-site py-20 sm:py-28">
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-card sm:p-12">
            <CheckCircle2 size={60} className="mx-auto text-gold" aria-hidden />
            <h2 className="mt-5 font-serif text-3xl font-semibold text-navy">
              Thank You
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {name.trim() ? `Dear ${name.trim().split(' ')[0]},` : 'Friend,'} your
              gift of{' '}
              <span className="font-semibold text-navy">
                ${parsedAmount.toFixed(2)}
              </span>{' '}
              for the{' '}
              <span className="font-semibold text-navy">{purposeLabel}</span> has
              been recorded. We are so grateful for your generosity and your
              heart for this church family.
            </p>

            <div className="mt-8 rounded-2xl bg-cream p-6 text-left">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <QrCode size={16} className="text-gold" aria-hidden />
                Scan to complete your gift
              </p>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                Your pledge is recorded — scan this code with any UPI app to
                transfer ${parsedAmount.toFixed(2)} for the {purposeLabel}.
              </p>
              <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-white p-4">
                <img
                  src={qrImageUrl(upiUrl)}
                  alt="UPI QR code for your gift"
                  width={200}
                  height={200}
                  className="h-48 w-48"
                />
                <p className="text-xs text-neutral-400">
                  {CHURCH.giving.upiId}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={resetForm}
                className="btn-navy px-6 py-2.5"
              >
                Give Another Gift
              </button>
            </div>

            <p className="mt-8 font-serif text-sm italic text-neutral-500">
              “Each of you should give what you have decided in your heart to
              give, not reluctantly or under compulsion, for God loves a
              cheerful giver.” — 2 Corinthians 9:7
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Give Online — Tithes, Offerings & Building Fund"
        description="Partner with Grace Community Church through online giving. Support our weekly ministry, local benevolence, food pantry, and community outreach safely and securely."
        image={HERO_IMAGE}
      />
      <PageHero
        title="Give"
        subtitle="Your generosity makes everything we do possible — thank you for partnering with us."
        image={HERO_IMAGE}
      />

      <section className="container-site py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Generosity"
            title="Give Cheerfully"
            subtitle="Every gift — tithe, offering, or toward the building fund — fuels worship, care, and mission here in Springfield and beyond."
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Donation form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-7 shadow-card sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-pale text-gold-dark">
                  <Heart size={20} aria-hidden />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-navy">
                    Your Gift
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Pledge your gift below, then scan or transfer to complete it.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Amount */}
                <div>
                  <label
                    htmlFor="give-amount"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <IndianRupee
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      aria-hidden
                    />
                    <input
                      id="give-amount"
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className={`${inputClasses} pl-10`}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {QUICK_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(String(amt))}
                        className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                          parseFloat(amount) === amt
                            ? 'border-gold bg-gold-pale text-navy'
                            : 'border-neutral-200 bg-cream text-neutral-600 hover:border-gold hover:text-navy'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Purpose */}
                <fieldset>
                  <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Purpose
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {PURPOSES.map(({ key, label, description, Icon }) => (
                      <label
                        key={key}
                        className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-colors ${
                          purpose === key
                            ? 'border-gold bg-gold-pale/60'
                            : 'border-neutral-200 bg-cream hover:border-neutral-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="purpose"
                            checked={purpose === key}
                            onChange={() => setPurpose(key)}
                            className="h-4 w-4 accent-[#c9a14a]"
                          />
                          <Icon size={15} className="text-gold-dark" aria-hidden />
                          <span className="text-sm font-semibold text-navy">
                            {label}
                          </span>
                        </span>
                        <span className="pl-6 text-xs leading-relaxed text-neutral-500">
                          {description}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Name */}
                <div>
                  <label
                    htmlFor="give-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    Name{' '}
                    <span className="normal-case text-neutral-400">
                      (leave blank to stay anonymous)
                    </span>
                  </label>
                  <div className="relative">
                    <User
                      size={15}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      aria-hidden
                    />
                    <input
                      id="give-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      maxLength={80}
                      className={`${inputClasses} pl-10`}
                    />
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label
                    htmlFor="give-note"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    Note{' '}
                    <span className="normal-case text-neutral-400">
                      (in memory of, for a specific need, etc.)
                    </span>
                  </label>
                  <textarea
                    id="give-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Anything you'd like us to know?"
                    maxLength={300}
                    className={inputClasses}
                  />
                </div>

                {submitError && <ErrorBanner message={submitError} />}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-navy w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : 'Record My Gift'}
                </button>
              </form>
            </div>
          </div>

          {/* Payment options */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* UPI QR */}
              <div className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-navy">
                  <QrCode size={18} className="text-gold" aria-hidden />
                  UPI QR Code
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  Scan with any UPI-enabled app (PhonePe, Google Pay, Paytm) to
                  pay instantly. The code updates as you change the amount and
                  purpose on the form.
                </p>

                <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-cream p-5">
                  {parsedAmount > 0 ? (
                    <img
                      src={qrImageUrl(upiUrl)}
                      alt={`UPI QR code for $${parsedAmount.toFixed(2)} ${purposeLabel}`}
                      width={220}
                      height={220}
                      className="h-52 w-52 rounded-lg bg-white"
                    />
                  ) : (
                    <div className="flex h-52 w-52 flex-col items-center justify-center rounded-lg bg-white text-center">
                      <Loader2
                        size={28}
                        className="text-neutral-300"
                        aria-hidden
                      />
                      <p className="mt-2 px-6 text-xs text-neutral-400">
                        Enter an amount to generate your QR code
                      </p>
                    </div>
                  )}
                  <p className="text-sm font-semibold text-navy">
                    {parsedAmount > 0
                      ? `$${parsedAmount.toFixed(2)} • ${purposeLabel}`
                      : 'Awaiting amount'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(CHURCH.giving.upiId, 'upi')}
                  className="mt-4 flex w-full items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors hover:border-gold hover:bg-gold-pale/40"
                >
                  <span className="font-mono text-navy">
                    {CHURCH.giving.upiId}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-gold-dark">
                    <Copy size={13} aria-hidden />
                    {copied === 'upi' ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Bank transfer */}
              <div className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-navy">
                  <Landmark size={18} className="text-gold" aria-hidden />
                  Bank Transfer
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  Prefer a direct deposit? Use these details at your bank or
                  online banking portal.
                </p>

                <dl className="mt-4 space-y-3">
                  {[
                    { label: 'Account Name', value: CHURCH.giving.bank.accountName, key: 'name' },
                    { label: 'Account Number', value: CHURCH.giving.bank.accountNumber, key: 'acc' },
                    { label: 'IFSC Code', value: CHURCH.giving.bank.ifsc, key: 'ifsc' },
                    { label: 'Bank', value: CHURCH.giving.bank.bankName, key: 'bank' },
                    { label: 'Branch', value: CHURCH.giving.bank.branch, key: 'branch' },
                  ].map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-2 last:border-b-0"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        {row.label}
                      </dt>
                      <dd className="flex items-center gap-2 text-sm text-navy">
                        <span className="font-medium">{row.value}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(row.value, row.key)}
                          className="text-gold-dark transition-colors hover:text-gold"
                          aria-label={`Copy ${row.label}`}
                        >
                          <Copy size={13} aria-hidden />
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>

                {copied && copied !== 'upi' && (
                  <p className="mt-3 text-center text-xs font-semibold text-gold-dark">
                    Copied to clipboard
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
