import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Send,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { CHURCH, IMAGES } from '../data';

const inputClasses =
  'w-full rounded-xl border border-neutral-200 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-gold focus:ring-2 focus:ring-gold/30';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const SOCIALS = [
    { href: CHURCH.socials.facebook, label: 'Facebook', Icon: Facebook },
    { href: CHURCH.socials.instagram, label: 'Instagram', Icon: Instagram },
    { href: CHURCH.socials.youtube, label: 'YouTube', Icon: Youtube },
    { href: CHURCH.socials.twitter, label: 'Twitter', Icon: Twitter },
  ];

  return (
    <>
      <SEO
        title="Contact Us — Directions, Service Hours & Message"
        description="Get in touch with Grace Community Church. Find our location on Harmony Lane in Springfield, IL, call us, send a message, or connect with our pastoral team."
        image={IMAGES.churchExterior}
      />
      <PageHero
        title="Contact Us"
        subtitle="Questions, prayer requests, or just want to say hello? We would love to hear from you."
        image={IMAGES.churchExterior}
      />

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          eyebrow="Say hello"
          title="We're Here for You"
          subtitle="The office is open Monday through Friday, 9 AM to 4 PM — or reach out any time using the form."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-7 shadow-card sm:p-8"
            >
              {sent ? (
                <div className="py-10 text-center">
                  <CheckCircle2
                    size={52}
                    className="mx-auto text-gold"
                    aria-hidden
                  />
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-navy">
                    Thank you, {form.name.split(' ')[0] || 'friend'}!
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    Your message has been received. Someone from our team
                    will get back to you within one or two business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-6 text-sm font-semibold text-navy underline underline-offset-4 transition-colors hover:text-gold-dark"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Jane Smith"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="jane@example.com"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Phone <span className="normal-case text-neutral-400">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="(217) 555-0000"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="How can we pray for you, or how can we help?"
                      className={inputClasses}
                    />
                  </div>
                  <button type="submit" className="btn-navy w-full">
                    Send Message <Send size={15} />
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CHURCH.address)}`}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <MapPin className="text-gold-dark" aria-hidden />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Visit
                </p>
                <p className="mt-1 text-sm font-medium text-navy group-hover:text-gold-dark">
                  {CHURCH.address}
                </p>
              </a>
              <a
                href={`tel:${CHURCH.phone.replace(/\D/g, '')}`}
                className="group rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <Phone className="text-gold-dark" aria-hidden />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Call
                </p>
                <p className="mt-1 text-sm font-medium text-navy group-hover:text-gold-dark">
                  {CHURCH.phone}
                </p>
              </a>
              <a
                href={`mailto:${CHURCH.email}`}
                className="group rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <Mail className="text-gold-dark" aria-hidden />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Email
                </p>
                <p className="mt-1 break-all text-sm font-medium text-navy group-hover:text-gold-dark">
                  {CHURCH.email}
                </p>
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-card">
              <iframe
                title="Map to Grace Community Church"
                src={CHURCH.mapEmbed}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row">
              <p className="text-sm text-white/80">
                Follow along for weekly encouragement and updates.
              </p>
              <div className="flex gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-200 hover:bg-gold"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
