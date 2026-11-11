import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type Language = 'en' | 'ta';

export interface Translations {
  nav: {
    home: string;
    about: string;
    sermons: string;
    events: string;
    ministries: string;
    prayer: string;
    give: string;
    live: string;
    gallery: string;
    contact: string;
    sundayJoin: string;
    switchThemeLight: string;
    switchThemeDark: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  banner: {
    badge: string;
    defaultTitle: string;
    defaultBody: string;
    learnMore: string;
    dismiss: string;
    showAnnouncement: string;
  };
  newsletter: {
    badge: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subscribeBtn: string;
    subscribing: string;
    subscribed: string;
    successMsg: string;
    errorEmpty: string;
    errorInvalid: string;
    privacyNote: string;
  };
  common: {
    churchName: string;
    welcomeHome: string;
    tagline: string;
    heroSubtitle: string;
    joinUsSunday: string;
    whoWeAre: string;
    serviceTimes: string;
    serviceTimesSubtitle: string;
    sundayWorship: string;
    sundaySchool: string;
    midweekStudy: string;
    planVisit: string;
    quickLinks: string;
    getInTouch: string;
    rightsReserved: string;
    allWelcome: string;
    allEvents: string;
    browseSermons: string;
    prayerWall: string;
    giveOnline: string;
    watchLive: string;
  };
}

const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    sermons: 'Sermons',
    events: 'Events',
    ministries: 'Ministries',
    prayer: 'Prayer',
    give: 'Give',
    live: 'Live',
    gallery: 'Gallery',
    contact: 'Contact',
    sundayJoin: 'Join Us This Sunday',
    switchThemeLight: 'Switch to light mode',
    switchThemeDark: 'Switch to dark mode',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  banner: {
    badge: 'ANNOUNCEMENT',
    defaultTitle: 'Sunday Worship Services & Tamil Fellowship',
    defaultBody: 'Join us at 9:00 AM & 11:00 AM in-person or online. Translation & Kids Church available!',
    learnMore: 'Learn more',
    dismiss: 'Dismiss announcement',
    showAnnouncement: 'Show announcement',
  },
  newsletter: {
    badge: 'STAY CONNECTED',
    title: 'Weekly Encouragement & Church News',
    subtitle:
      'Subscribe to receive Pastor Whitfield’s weekly devotional, prayer bulletins, and upcoming church updates right in your inbox.',
    namePlaceholder: 'Your name (optional)',
    emailPlaceholder: 'Enter your email address',
    subscribeBtn: 'Subscribe',
    subscribing: 'Subscribing...',
    subscribed: 'Subscribed!',
    successMsg: 'Thank you for subscribing! May God bless you abundantly.',
    errorEmpty: 'Please enter your email address.',
    errorInvalid: 'Please enter a valid email address.',
    privacyNote: 'We respect your privacy. Unsubscribe at any time with one click.',
  },
  common: {
    churchName: 'Grace Community Church',
    welcomeHome: 'Welcome home',
    tagline: 'A place to belong, believe, and become.',
    heroSubtitle: 'Whatever your story, you have a seat at the table.',
    joinUsSunday: 'Join Us This Sunday',
    whoWeAre: 'Who We Are',
    serviceTimes: 'Service Times',
    serviceTimesSubtitle:
      "Two identical Sunday mornings, one midweek reset — pick whichever fits your family's rhythm.",
    sundayWorship: 'Sunday Worship',
    sundaySchool: 'Sunday School',
    midweekStudy: 'Midweek Bible Study',
    planVisit: 'Plan Your Visit',
    quickLinks: 'Quick Links',
    getInTouch: 'Get in Touch',
    rightsReserved: 'All rights reserved.',
    allWelcome: 'All are welcome. Really.',
    allEvents: 'View All Events',
    browseSermons: 'Browse All Sermons',
    prayerWall: 'Prayer Wall',
    giveOnline: 'Give Online',
    watchLive: 'Watch Live',
  },
};

const ta: Translations = {
  nav: {
    home: 'முகப்பு',
    about: 'எங்களை பற்றி',
    sermons: 'செய்திகள்',
    events: 'நிகழ்வுகள்',
    ministries: 'ஊழியங்கள்',
    prayer: 'ஜெபம்',
    give: 'காணிக்கை',
    live: 'நேரலை',
    gallery: 'புகைப்படங்கள்',
    contact: 'தொடர்பு',
    sundayJoin: 'இந்த ஞாயிறு வாருங்கள்',
    switchThemeLight: 'ஒளி முறைக்கு மாற்றுக',
    switchThemeDark: 'இருள் முறைக்கு மாற்றுக',
    openMenu: 'மெனுவை திறக்க',
    closeMenu: 'மெனுவை மூட',
    language: 'மொழி',
  },
  banner: {
    badge: 'முக்கிய அறிவிப்பு',
    defaultTitle: 'ஞாயிறு ஆராதனை & தமிழ் ஐக்கியக் கூட்டம்',
    defaultBody: 'காலை 9:00 & 11:00 மணிக்கு நேரில் மற்றும் நேரலையில் கலந்துகொள்ளுங்கள். தமிழ் மொழிபெயர்ப்பு உண்டு!',
    learnMore: 'மேலும் அறிய',
    dismiss: 'அறிவிப்பை மூடு',
    showAnnouncement: 'அறிவிப்பைக் காட்டு',
  },
  newsletter: {
    badge: 'இணைந்திருங்கள்',
    title: 'வாராந்திர ஆவிக்குரிய தியானம் & சபை செய்திகள்',
    subtitle:
      'போதகரின் வாராந்திர வேத தியானங்கள், ஜெப குறிப்புகள் மற்றும் சபை நிகழ்வுகளின் விவரங்களை உங்கள் மின்னஞ்சலில் இலவசமாக பெறுங்கள்.',
    namePlaceholder: 'உங்கள் பெயர் (விருப்பத்திற்குரியது)',
    emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரி',
    subscribeBtn: 'இணையுங்கள்',
    subscribing: 'இணைகிறது...',
    subscribed: 'இணைந்துவிட்டீர்கள்!',
    successMsg: 'பதிவு செய்ததற்கு நன்றி! கர்த்தரின் கிருபையும் சமாதானமும் உங்களோடு இருப்பதாக.',
    errorEmpty: 'தயவுசெய்து உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்.',
    errorInvalid: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.',
    privacyNote: 'உங்கள் தனியுரிமையை நாங்கள் மதிக்கிறோம். எந்த நேரத்திலும் விலகிக்கொள்ளலாம்.',
  },
  common: {
    churchName: 'கிரேஸ் கம்யூனிட்டி சர்ச்',
    welcomeHome: 'இல்லத்திற்கு வரவேற்கிறோம்',
    tagline: 'இணைவதற்கும், விசுவாசிப்பதற்கும், உருவாவதற்குமான ஓர் இடம்.',
    heroSubtitle: 'உங்கள் பின்னணி எதுவாக இருந்தாலும், உங்களுக்காக இங்கு ஓர் இடம் உண்டு.',
    joinUsSunday: 'இந்த ஞாயிறு வாருங்கள்',
    whoWeAre: 'நாம் யார்',
    serviceTimes: 'ஆராதனை நேரங்கள்',
    serviceTimesSubtitle:
      'இரண்டு ஞாயிறு காலை ஆராதனைகள், ஒரு வாரமத்திய வேத பாடம் — உங்கள் குடும்பத்திற்கு உகந்ததை தேர்ந்தெடுங்கள்.',
    sundayWorship: 'ஞாயிறு ஆராதனை',
    sundaySchool: 'ஞாயிறு பள்ளி',
    midweekStudy: 'வாரமத்திய வேத பாடம்',
    planVisit: 'வருகையைத் திட்டமிடுங்கள்',
    quickLinks: 'முக்கிய இணைப்புகள்',
    getInTouch: 'தொடர்பு கொள்ள',
    rightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    allWelcome: 'அனைவரையும் அன்போடு வரவேற்கிறோம்.',
    allEvents: 'அனைத்து நிகழ்வுகளும்',
    browseSermons: 'அனைத்து செய்திகள்',
    prayerWall: 'ஜெபக் குறிப்புகள்',
    giveOnline: 'காணிக்கை செலுத்துக',
    watchLive: 'நேரலை காண்க',
  },
};

const translations: Record<Language, Translations> = { en, ta };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isTamil: boolean;
}

const LANGUAGE_KEY = 'grace-language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  if (stored === 'en' || stored === 'ta') return stored;
  // Check browser preferred language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ta')) return 'ta';
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_KEY, language);
      document.documentElement.setAttribute('lang', language);
      if (language === 'ta') {
        document.documentElement.classList.add('lang-ta');
      } else {
        document.documentElement.classList.remove('lang-ta');
      }
    } catch {
      // ignore storage error
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
      isTamil: language === 'ta',
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

