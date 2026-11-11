import { Heart, Users, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { LEADERS, BELIEFS, IMAGES } from '../data';

const VALUES = [
  {
    Icon: Heart,
    title: 'Our Vision',
    text: 'To see every person in Springfield and beyond fully alive in Christ — rooted in grace, growing in love, ready to serve.',
  },
  {
    Icon: Users,
    title: 'Our Mission',
    text: 'Loving God, loving people, and making disciples: we gather to worship, grow together in community, and go out to serve our city and world.',
  },
  {
    Icon: Globe,
    title: 'Our Values',
    text: 'Warm hospitality, honest teaching, generous hearts, and everyday faith. Grace is not just our name — it is our posture.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Our Church — Our Story, Beliefs & Leadership"
        description="Learn about Grace Community Church in Springfield, IL — our 70-year history, what we believe, our pastoral leadership team, and our vision for the community."
        image={IMAGES.churchExterior}
      />
      <PageHero
        title="About Our Church"
        subtitle="Seventy years of God's faithfulness — and a family that is still growing."
        image={IMAGES.churchExterior}
      />

      <section className="container-site py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Our story" title="Our History" />
            <p className="mt-6 leading-relaxed text-neutral-600">
              Grace Community Church began in the autumn of 1954, when
              twelve families started meeting in a converted storefront
              on Maple Street with a borrowed piano and a big dream. Two
              years later, the first sanctuary was built on Harmony
              Lane — the same corner where we still gather today.
            </p>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Through building expansions in the 70s and 2000s, a
              generation of faithful pastors, and thousands of
              baptisms, potlucks, and Christmas Eves, one thing has
              never changed: whoever you are, you are welcome here.
            </p>
          </div>
          <div className="relative">
            <img
              src={IMAGES.aboutHistory}
              alt="The original Grace Community Church building"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
              loading="lazy"
            />
            <img
              src={IMAGES.aboutStory}
              alt="A family worshipping together at Grace"
              className="absolute -bottom-8 -left-4 hidden w-2/5 rounded-2xl border-8 border-white object-cover shadow-card-hover sm:block"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="What drives us"
            title="Vision, Mission & Values"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-cream p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-light">
                  <Icon size={24} aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-navy">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20 sm:py-24">
        <SectionHeading
          eyebrow="Our convictions"
          title="What We Believe"
          subtitle="Four anchors that hold everything we do."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {BELIEFS.map((belief, i) => (
            <div
              key={belief.title}
              className="flex gap-5 rounded-2xl bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <span className="font-serif text-4xl font-semibold text-gold/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-navy">
                  {belief.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {belief.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Meet the team"
            title="Pastor & Leadership"
            subtitle="Ordinary people, humbled by grace, honored to serve."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERS.map((leader) => (
              <div
                key={leader.name}
                className="group overflow-hidden rounded-2xl bg-cream shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={`Portrait of ${leader.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy">
                    {leader.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    {leader.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
