import { Clock, User } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { MINISTRIES, IMAGES } from '../data';

export default function MinistriesPage() {
  return (
    <>
      <SEO
        title="Ministries — Groups for Youth, Women, Men, Kids & Outreach"
        description="Connect with our ministries at Grace Community Church: Youth Ministry, Women's Bible Studies, Men's Breakfast, Grace Kids, Choir & Worship, and City Outreach."
        image={IMAGES.outreach}
      />
      <PageHero
        title="Ministries"
        subtitle="Faith was never meant to be a solo journey. Find your people — there is a place for every age and season."
        image={IMAGES.outreach}
      />

      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          eyebrow="Get involved"
          title="Find Your Place to Belong"
          subtitle="Each ministry is led by caring leaders who would love to meet you this week. Just show up — seriously."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((ministry) => (
            <article
              key={ministry.name}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover border border-neutral-100 dark:border-white/10"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={ministry.image}
                  alt={ministry.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {ministry.tagline}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold text-navy">
                  {ministry.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {ministry.description}
                </p>
                <div className="mt-5 space-y-2 border-t border-neutral-100 dark:border-white/10 pt-4 text-xs text-neutral-500 dark:text-neutral-400">
                  <p className="flex items-center gap-2">
                    <User size={14} className="text-gold-dark" aria-hidden />
                    {ministry.leader}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-gold-dark" aria-hidden />
                    {ministry.meeting}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
