import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CHURCH, SERVICE_TIMES } from '../data';
import { useLanguage } from '../lib/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  schema?: Record<string, unknown>;
}

const DEFAULT_DESCRIPTION =
  'Grace Community Church in Springfield, IL — A warm, welcoming family of faith. Join us for Sunday Worship at 9:00 AM & 11:00 AM, Midweek Bible Study, and fellowship in English and Tamil.';
const DEFAULT_IMAGE =
  'https://images.pexels.com/photos/29199703/pexels-photo-29199703.jpeg?auto=compress&cs=tinysrgb&w=1200';
const SITE_NAME = 'Grace Community Church';

function updateMetaTag(attribute: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords,
  schema,
}: SEOProps) {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Welcome Home - Sunday Services 9 & 11 AM`;

    document.title = fullTitle;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://gracecommunity.church';
    const currentUrl = `${origin}${location.pathname}`;

    // Standard Meta
    updateMetaTag('name', 'description', description);
    updateMetaTag(
      'name',
      'keywords',
      keywords ||
        'Grace Community Church, Springfield church, Sunday service, worship, Bible study, Christian fellowship, Tamil church, Tamil Christian fellowship, sermons, prayer'
    );
    updateMetaTag('name', 'author', SITE_NAME);
    updateMetaTag('name', 'robots', 'index, follow');

    // Open Graph
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', SITE_NAME);
    updateMetaTag('property', 'og:locale', language === 'ta' ? 'ta_IN' : 'en_US');

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

    // Canonical link
    updateLinkTag('canonical', currentUrl);

    // JSON-LD Structured Data
    const defaultChurchSchema = {
      '@context': 'https://schema.org',
      '@type': 'Church',
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: origin,
      logo: `${origin}/favicon.svg`,
      image: [image],
      telephone: CHURCH.phone,
      email: CHURCH.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1240 Harmony Lane',
        addressLocality: 'Springfield',
        addressRegion: 'IL',
        postalCode: '62704',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '39.7817',
        longitude: '-89.6501',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '09:00',
          closes: '12:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Wednesday'],
          opens: '18:30',
          closes: '20:00',
        },
      ],
      sameAs: [
        CHURCH.socials.facebook,
        CHURCH.socials.instagram,
        CHURCH.socials.youtube,
        CHURCH.socials.twitter,
      ],
    };

    const targetSchema = schema || defaultChurchSchema;
    let scriptTag = document.querySelector('script[data-schema="church-seo"]') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-schema', 'church-seo');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(targetSchema);
  }, [title, description, image, type, keywords, location.pathname, language, schema]);

  return null;
}

