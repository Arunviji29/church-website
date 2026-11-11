import { useState } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SermonCard from '../components/SermonCard';
import SEO from '../components/SEO';
import { ErrorBanner } from '../components/admin/ui';
import { useSermons } from '../lib/hooks';
import { IMAGES } from '../data';

export default function SermonsPage() {
  const { sermons, loading, error } = useSermons();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');

  const topics = ['All', ...Array.from(new Set(sermons.map((s) => s.topic).filter(Boolean))).sort()];

  const filtered = sermons.filter((s) => {
    const matchesTopic = topic === 'All' || s.topic === topic;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.speaker.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.scripture.toLowerCase().includes(q);
    return matchesTopic && matchesQuery;
  });

  return (
    <>
      <SEO
        title="Sermons — Sermon Library & Bible Teaching"
        description="Browse our full sermon library at Grace Community Church. Search by speaker, topic, or scripture. Every Sunday message archived for you to watch or listen again."
        image={IMAGES.worship}
      />
      <PageHero
        title="Sermons"
        subtitle="Missed a Sunday? Every message is archived here — searchable by title, speaker, or topic."
        image={IMAGES.worship}
      />

      <section className="container-site py-16 sm:py-20">
        <SectionHeading eyebrow="Listen & grow" title="Sermon Library" />

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-card sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, speaker, or Scripture..."
              className="w-full rounded-full border border-neutral-200 bg-cream py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-gold focus:ring-2 focus:ring-gold/30"
              aria-label="Search sermons"
            />
          </div>
          <div className="relative">
            <Filter
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              aria-hidden
            />
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full appearance-none rounded-full border border-neutral-200 bg-cream py-3 pl-10 pr-10 text-sm font-medium text-ink outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30 sm:w-auto"
              aria-label="Filter by topic"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Topics' : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mx-auto mt-10 max-w-2xl">
            <ErrorBanner message={`Could not load sermons: ${error}`} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={36} className="animate-spin text-gold" aria-hidden />
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto mt-14 max-w-md text-center">
            <p className="font-serif text-xl text-navy">
              {sermons.length === 0
                ? 'No sermons posted yet'
                : 'No sermons match your search'}
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              {sermons.length === 0
                ? 'Check back soon — messages are posted here each week.'
                : 'Try a different search, or clear the topic filter.'}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
