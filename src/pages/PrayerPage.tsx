import { useState, type FormEvent } from 'react';
import { Heart, Eye, EyeOff, Send, Loader2, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { ErrorBanner } from '../components/admin/ui';
import { supabase } from '../lib/supabase';
import { usePublicPrayerRequests } from '../lib/hooks';
import { IMAGES } from '../data';

const MAX_REQUEST_LEN = 2000;

const inputClasses =
  'w-full rounded-xl border border-neutral-200 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-gold focus:ring-2 focus:ring-gold/30';

export default function PrayerPage() {
  const { requests, loading, error, reload } = usePublicPrayerRequests();

  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!request.trim()) {
      setSubmitError('Please write your prayer request first.');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    const { error: err } = await supabase.from('prayer_requests').insert({
      name: name.trim() || 'Anonymous',
      request: request.trim(),
      is_public: isPublic,
    });

    if (err) {
      setSubmitError(err.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
    setName('');
    setRequest('');
    setIsPublic(true);
    reload();
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError(null);
  };

  return (
    <>
      <SEO
        title="Prayer Wall & Requests — We Are Praying For You"
        description="Submit a prayer request to Grace Community Church. Choose between our public prayer wall or private prayer with our pastoral team. We are here for you."
        image={IMAGES.worship}
      />
      <PageHero
        title="Prayer Requests"
        subtitle="Our church family considers it a privilege to pray with you and for you — whatever you're carrying."
        image={IMAGES.worship}
      />

      <section className="container-site py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-white p-7 shadow-card sm:p-8">
                {submitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle2
                      size={52}
                      className="mx-auto text-gold"
                      aria-hidden
                    />
                    <h2 className="mt-4 font-serif text-2xl font-semibold text-navy">
                      We're praying with you
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {isPublic
                        ? 'Your request is now on the prayer wall below, and our team prays over every one.'
                        : 'Your request was shared privately with our prayer team — it will not appear on the public wall.'}
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-6 text-sm font-semibold text-navy underline underline-offset-4 transition-colors hover:text-gold-dark"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-pale text-gold-dark">
                        <Heart size={20} aria-hidden />
                      </span>
                      <div>
                        <h2 className="font-serif text-xl font-semibold text-navy">
                          How can we pray?
                        </h2>
                        <p className="text-xs text-neutral-500">
                          Every request is prayed over by our team.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="prayer-name"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Name{' '}
                        <span className="normal-case text-neutral-400">
                          (leave blank to stay anonymous)
                        </span>
                      </label>
                      <input
                        id="prayer-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        maxLength={80}
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="prayer-request"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                      >
                        Your request
                      </label>
                      <textarea
                        id="prayer-request"
                        required
                        rows={6}
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="What would you like us to pray for?"
                        maxLength={MAX_REQUEST_LEN}
                        className={inputClasses}
                      />
                      <p className="mt-1 text-right text-xs text-neutral-400">
                        {request.length}/{MAX_REQUEST_LEN}
                      </p>
                    </div>

                    <fieldset>
                      <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Who can see this?
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors ${
                            isPublic
                              ? 'border-gold bg-gold-pale/60'
                              : 'border-neutral-200 bg-cream hover:border-neutral-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="visibility"
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                            className="mt-0.5 h-4 w-4 accent-[#c9a14a]"
                          />
                          <span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                              <Eye size={14} aria-hidden /> Public
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
                              Shown on the prayer wall so others can pray
                              too.
                            </span>
                          </span>
                        </label>
                        <label
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors ${
                            !isPublic
                              ? 'border-gold bg-gold-pale/60'
                              : 'border-neutral-200 bg-cream hover:border-neutral-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="visibility"
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                            className="mt-0.5 h-4 w-4 accent-[#c9a14a]"
                          />
                          <span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                              <EyeOff size={14} aria-hidden /> Private
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
                              Seen only by our pastors and prayer team.
                            </span>
                          </span>
                        </label>
                      </div>
                    </fieldset>

                    {submitError && (
                      <ErrorBanner message={submitError} />
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-navy w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? 'Sending...' : 'Send Prayer Request'}
                      <Send size={15} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Prayer wall */}
          <div className="lg:col-span-3">
            <SectionHeading
              align="left"
              eyebrow="Prayer wall"
              title="Pray With Our Family"
              subtitle="These are public requests from our church and community. Take a moment — lift a few of these names and situations up today."
            />

            {error && (
              <div className="mt-8">
                <ErrorBanner message={`Could not load the prayer wall: ${error}`} />
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2
                  size={32}
                  className="animate-spin text-gold"
                  aria-hidden
                />
              </div>
            ) : requests.length === 0 ? (
              <div className="mt-8 rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-10 text-center">
                <p className="text-sm text-neutral-500">
                  The prayer wall is empty right now — be the first to share
                  a request.
                </p>
              </div>
            ) : (
              <ul className="mt-8 columns-1 gap-4 sm:columns-2">
                {requests.map((r) => (
                  <li
                    key={r.id}
                    className="mb-4 break-inside-avoid rounded-2xl bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                  >
                    <Heart
                      size={16}
                      className="text-gold"
                      aria-hidden
                      fill="currentColor"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                      {r.request}
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <span
                        className="h-6 w-6 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-semibold"
                        aria-hidden
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </span>
                      {r.name}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
