import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import WelcomeBand from '../components/WelcomeBand';
import ServiceTimesGrid from '../components/ServiceTimesGrid';
import EventCard from '../components/EventCard';
import SermonCard from '../components/SermonCard';
import VerseBanner from '../components/VerseBanner';
import AnnouncementsSection from '../components/AnnouncementsSection';
import NewsletterSignup from '../components/NewsletterSignup';
import SEO from '../components/SEO';
import { ErrorBanner } from '../components/admin/ui';
import { useSermons, useEvents } from '../lib/hooks';
import { useLanguage } from '../lib/i18n';
import { CHURCH, VERSES, IMAGES } from '../data';

const today = new Date();
const verse = VERSES[today.getDate() % VERSES.length];

export default function HomePage() {
  const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();
  const { events, loading: eventsLoading, error: eventsError } = useEvents(true);
  const { t, isTamil } = useLanguage();
  const latestSermon = sermons[0];

  return (
    <>
      <SEO
        title={isTamil ? 'முகப்பு — கிரேஸ் கம்யூனிட்டி சர்ச்' : 'Welcome Home'}
        description={
          isTamil
            ? 'கிரேஸ் கம்யூனிட்டி சர்ச் — ஸ்பிரிங்ஃபீல்ட். ஞாயிறு காலை 9:00 & 11:00 ஆராதனை. அன்போடு அனைவரையும் வரவேற்கிறோம்!'
            : 'Grace Community Church — A warm, welcoming family of faith. Join us for Sunday Worship at 9:00 AM & 11:00 AM, Midweek Bible Study, and fellowship in English and Tamil.'
        }
      />

      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-navy">
        <img
          src={IMAGES.hero}
          alt="Inside Grace Community Church during a Sunday service"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/65 to-navy/85" />
        <div className="container-site relative py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light sm:text-sm">
            {t.common.welcomeHome}
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
            {isTamil ? 'கிரேஸ் கம்யூனிட்டி சர்ச்' : CHURCH.name}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-xl">
            {isTamil ? t.common.tagline : CHURCH.tagline} {t.common.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#services" className="btn-gold">
              {t.common.joinUsSunday}
            </a>
            <Link to="/about" className="btn-outline">
              {t.common.whoWeAre}
            </Link>
          </div>
        </div>
      </section>

      <WelcomeBand />

      <AnnouncementsSection />

      <section id="services" className="container-site py-20 sm:py-24">
        <SectionHeading
          eyebrow={isTamil ? 'எங்களோடு ஆராதிக்க' : 'Worship with us'}
          title={t.common.serviceTimes}
          subtitle={t.common.serviceTimesSubtitle}
        />
        <div className="mt-12">
          <ServiceTimesGrid />
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 transition-colors">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={IMAGES.community}
              alt="Members of Grace Community sharing a meal together"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-gold px-6 py-4 text-white shadow-lg sm:block">
              <p className="font-serif text-3xl font-bold">70+</p>
              <p className="text-xs font-semibold uppercase tracking-widest">
                {isTamil ? 'ஆண்டுகள் கிருபை' : 'Years of grace'}
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow={isTamil ? 'எங்களை பற்றி' : 'About us'}
              title={isTamil ? 'குடும்பம் போன்ற திருச்சபை' : 'A church that feels like family'}
            />
            <p className="mt-6 leading-relaxed text-neutral-600 dark:text-neutral-300">
              {isTamil
                ? '1954 முதல், கிரேஸ் கம்யூனிட்டி சர்ச் மக்கள் தேவனை ஆராதிக்கவும், ஒன்றாக வளரவும், ஒருவருக்கொருவர் துணை நிற்கவும் கூடும் அன்பான இடமாக விளங்கி வருகிறது.'
                : 'Since 1954, Grace Community Church has been a place where Springfield gathers — to worship, to weep, to celebrate, and to grow. We are ordinary people following an extraordinary Savior.'}
            </p>
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
              {isTamil
                ? 'இங்கு பூரணமான மனிதர்கள் யாரும் இல்லை. ஆனால் உண்மையான அன்பு, வேதாகம சத்திய போதனை மற்றும் சவாலான நேரங்களில் கரம் கொடுக்கும் உறவுகள் உங்களை வரவேற்கும்.'
                : 'You will not find perfect people here. You will find a warm welcome, honest teaching from the Bible, and a community that shows up when life gets hard.'}
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-gold-dark"
            >
              {isTamil ? 'எங்களை பற்றி மேலும் அறிய' : 'Learn more about us'}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-20 sm:py-24">
        <SectionHeading
          eyebrow={isTamil ? 'நாள்காட்டி' : 'Mark your calendar'}
          title={isTamil ? 'வரவிருக்கும் நிகழ்வுகள்' : 'Upcoming Events'}
          subtitle={
            isTamil
              ? 'கிரேஸ் சபையில் எப்போதும் உற்சாகமான நிகழ்வுகள் உண்டு. வாருங்கள், நம் குடும்பத்தில் இணைந்திடுங்கள்.'
              : 'There is always something happening at Grace. Come once, and you will start feeling at home.'
          }
        />
        <div className="mt-12">
          {eventsError ? (
            <ErrorBanner message={`Could not load events: ${eventsError}`} />
          ) : eventsLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 size={30} className="animate-spin text-gold" aria-hidden />
            </div>
          ) : events.length === 0 ? (
            <p className="mt-6 text-center text-sm text-neutral-500">
              {isTamil ? 'புதிய நிகழ்வுகள் விரைவில் திட்டமிடப்படும்.' : 'New events are being planned — check the events page soon.'}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <Link to="/events" className="btn-navy">
            {t.common.allEvents} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 transition-colors">
        <div className="container-site">
          <SectionHeading
            eyebrow={isTamil ? 'சமீபத்திய செய்தி' : 'Latest message'}
            title={isTamil ? 'இந்த வார பிரசங்கம்' : "This Week's Sermon"}
            subtitle={
              isTamil
                ? 'ஞாயிறு ஆராதனையை தவறவிட்டீர்களா? அல்லது மீண்டும் கேட்க விரும்புகிறீர்களா? அனைத்து செய்திகளும் இங்கு உள்ளன.'
                : 'Missed a Sunday, or want to listen again? Every message lands here by Monday morning.'
            }
          />
          <div className="mx-auto mt-12 max-w-3xl">
            {sermonsError ? (
              <ErrorBanner message={`Could not load sermons: ${sermonsError}`} />
            ) : sermonsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 size={30} className="animate-spin text-gold" aria-hidden />
              </div>
            ) : latestSermon ? (
              <SermonCard sermon={latestSermon} featured />
            ) : (
              <p className="mt-6 text-center text-sm text-neutral-500">
                {isTamil ? 'புதிய செய்தி ஞாயிறுக்குப் பிறகு தோன்றும்.' : 'The latest message will appear here after Sunday.'}
              </p>
            )}
          </div>
          <div className="mt-10 text-center">
            <Link to="/sermons" className="btn-navy">
              {t.common.browseSermons} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Newsletter Section */}
      <NewsletterSignup variant="section" />

      <VerseBanner verse={verse} />
    </>
  );
}
