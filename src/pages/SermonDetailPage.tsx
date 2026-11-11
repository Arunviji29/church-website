import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SermonCard from '../components/SermonCard';
import NotFoundPage from './NotFoundPage';
import SEO from '../components/SEO';
import { useSermons } from '../lib/hooks';
import { formatDate } from '../lib/types';

export default function SermonDetailPage() {
  const { id } = useParams();
  const { sermons, loading } = useSermons();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={36} className="animate-spin text-gold" aria-hidden />
      </div>
    );
  }

  const sermon = sermons.find((s) => s.id === id);
  if (!sermon) return <NotFoundPage />;

  const related = sermons
    .filter((s) => s.id !== sermon.id && s.topic === sermon.topic)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${sermon.title} — ${sermon.speaker}`}
        description={
          sermon.description ||
          `Listen to ${sermon.title} preached by ${sermon.speaker} at Grace Community Church.`
        }
        image={sermon.thumbnail_url}
        type="article"
      />
      <PageHero
        title={sermon.title}
        subtitle={[
          sermon.speaker,
          formatDate(sermon.sermon_date),
          sermon.scripture ? `Scripture: ${sermon.scripture}` : null,
        ]
          .filter(Boolean)
          .join(' • ')}
        image={sermon.thumbnail_url || IMAGES_FALLBACK}
      />

      <section className="container-site py-16 sm:py-20">
        <Link
          to="/sermons"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-dark"
        >
          <ArrowLeft size={16} /> Back to all sermons
        </Link>

        <div className="mx-auto mt-8 max-w-4xl">
          {sermon.youtube_id ? (
            <div className="overflow-hidden rounded-2xl bg-black shadow-card-hover">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${sermon.youtube_id}`}
                  title={sermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-card">
              <p className="font-serif text-xl text-navy">
                Video coming soon
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                The recording for this message has not been posted yet.
              </p>
            </div>
          )}

          <dl className="mt-8 grid gap-6 rounded-2xl bg-white p-7 shadow-card sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
            {sermon.speaker && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Speaker
                </dt>
                <dd className="mt-1 text-sm font-medium text-navy">
                  {sermon.speaker}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Date
              </dt>
              <dd className="mt-1 text-sm font-medium text-navy">
                {formatDate(sermon.sermon_date)}
              </dd>
            </div>
            {sermon.scripture && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Scripture
                </dt>
                <dd className="mt-1 text-sm font-medium text-navy">
                  {sermon.scripture}
                </dd>
              </div>
            )}
            {sermon.topic && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Topic
                </dt>
                <dd className="mt-1 text-sm font-medium text-navy">
                  {sermon.topic}
                </dd>
              </div>
            )}
          </dl>

          {sermon.description && (
            <div className="mt-8">
              <h2 className="font-serif text-2xl font-semibold text-navy">
                About this message
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-600">
                {sermon.description}
              </p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-site">
            <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
              More on {sermon.topic}
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-gold" aria-hidden />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <SermonCard key={s.id} sermon={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container-site py-10 text-center">
        <Link to="/sermons" className="btn-navy">
          Back to Sermon Library <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}

const IMAGES_FALLBACK =
  'https://images.pexels.com/photos/35555152/pexels-photo-35555152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
