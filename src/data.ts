export const CHURCH = {
  name: 'Grace Community Church',
  tagline: 'A place to belong, believe, and become.',
  address: '1240 Harmony Lane, Springfield, IL 62704',
  phone: '(217) 555-0142',
  email: 'hello@gracecommunity.church',
  mapEmbed:
    'https://www.google.com/maps?q=Springfield,IL&output=embed',
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    twitter: 'https://twitter.com',
  },
  giving: {
    upiId: 'gracecommunity@upi',
    upiName: 'Grace Community Church',
    bank: {
      accountName: 'Grace Community Church',
      accountNumber: '0042 8611 4400',
      ifsc: 'SPNB0000420',
      bankName: 'Springfield National Bank',
      branch: 'Harmony Lane Branch, Springfield, IL',
    },
  },
};

export const SERVICE_TIMES = [
  {
    name: 'Sunday Worship',
    time: '9:00 AM & 11:00 AM',
    description:
      'Full worship service with nursery and Grace Kids available at both hours.',
  },
  {
    name: 'Sunday School',
    time: '10:15 AM',
    description:
      'Classes for all ages between the two worship services.',
  },
  {
    name: 'Midweek Bible Study',
    time: 'Wednesdays, 6:30 PM',
    description:
      'A relaxed evening in the Fellowship Hall — come as you are.',
  },
];

export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  topic: string;
  scripture: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

// Real, publicly available sermon videos so playback actually works.
export const SERMONS: Sermon[] = [
  {
    id: 1,
    title: 'The God Who Sees You',
    speaker: 'Pastor David Whitfield',
    date: 'Nov 9, 2025',
    topic: 'Hope',
    scripture: 'Genesis 16:1-13',
    description:
      'Hagar called Him "the God who sees me." In the wilderness seasons of life, we are never invisible to the One who made us. A message of comfort for anyone who feels overlooked.',
    youtubeId: 'ZvReYu8yWFk',
    thumbnail:
      'https://images.pexels.com/photos/8814997/pexels-photo-8814997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 2,
    title: 'Rooted: Growing Deep in a Shallow World',
    speaker: 'Pastor David Whitfield',
    date: 'Nov 2, 2025',
    topic: 'Faith',
    description:
      'Streams of water, fruitful seasons, leaves that do not wither — Psalm 1 paints a picture of a life rooted in God. What does it take to grow roots that hold?',
    scripture: 'Psalm 1',
    youtubeId: 'INhFcD3Ij1M',
    thumbnail:
      'https://images.pexels.com/photos/2258251/pexels-photo-2258251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 3,
    title: 'The Debt We Could Never Pay',
    speaker: 'Pastor Maria Sanchez',
    date: 'Oct 26, 2025',
    topic: 'Grace',
    description:
      'Two debtors, one cancelation, and a meal in Simon\u2019s house. Jesus redefines what it means to be forgiven — and how forgiven people respond.',
    scripture: 'Luke 7:36-50',
    youtubeId: 'ZvReYu8yWFk',
    thumbnail:
      'https://images.pexels.com/photos/2351719/pexels-photo-2351719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 4,
    title: 'Made for Community',
    speaker: 'Pastor James Okafor',
    date: 'Oct 19, 2025',
    topic: 'Community',
    description:
      'The early church devoted themselves to fellowship. In an age of loneliness, God\u2019s answer has always been a people, not a program.',
    scripture: 'Acts 2:42-47',
    youtubeId: 'INhFcD3Ij1M',
    thumbnail:
      'https://images.pexels.com/photos/6860380/pexels-photo-6860380.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 5,
    title: 'When Prayers Feel Unanswered',
    speaker: 'Pastor Maria Sanchez',
    date: 'Oct 12, 2025',
    topic: 'Prayer',
    description:
      'The persistent widow and the reluctant judge. Jesus told this story so we would "always pray and not give up" — even in the waiting.',
    scripture: 'Luke 18:1-8',
    youtubeId: 'ZvReYu8yWFk',
    thumbnail:
      'https://images.pexels.com/photos/18941327/pexels-photo-18941327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 6,
    title: 'Love Your Neighbor: The Scandalous Kind',
    speaker: 'Pastor David Whitfield',
    date: 'Oct 5, 2025',
    topic: 'Love',
    description:
      'A Samaritan, a ditch, and a question that changed everything. Loving our neighbor is rarely convenient — and always worth it.',
    scripture: 'Luke 10:25-37',
    youtubeId: 'INhFcD3Ij1M',
    thumbnail:
      'https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 7,
    title: 'Anxious for Nothing',
    speaker: 'Pastor James Okafor',
    date: 'Sep 28, 2025',
    topic: 'Hope',
    description:
      'Paul wrote about peace from a prison cell. If peace is possible there, it is possible anywhere. Practical steps toward a prayerful, rested heart.',
    scripture: 'Philippians 4:4-9',
    youtubeId: 'ZvReYu8yWFk',
    thumbnail:
      'https://images.pexels.com/photos/10024790/pexels-photo-10024790.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 8,
    title: 'Generous Like Our Father',
    speaker: 'Pastor Maria Sanchez',
    date: 'Sep 21, 2025',
    topic: 'Grace',
    description:
      'Everything we have is a gift. Generosity is not a budget line — it is a family resemblance to a Father who gives lavishly.',
    scripture: '2 Corinthians 8:1-9',
    youtubeId: 'INhFcD3Ij1M',
    thumbnail:
      'https://images.pexels.com/photos/6995221/pexels-photo-6995221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 9,
    title: 'Raising the Next Generation',
    speaker: 'Pastor James Okafor',
    date: 'Sep 14, 2025',
    topic: 'Family',
    description:
      'Faith is caught more than taught — but it must be taught. A charge to parents, mentors, and every member of the church family.',
    scripture: 'Deuteronomy 6:4-9',
    youtubeId: 'ZvReYu8yWFk',
    thumbnail:
      'https://images.pexels.com/photos/36900186/pexels-photo-36900186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export interface Event {
  id: number;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Community Fall Festival',
    date: 'Saturday, Nov 15, 2025',
    day: '15',
    month: 'Nov',
    time: '11:00 AM – 3:00 PM',
    location: 'Church Parking Lot & Lawn',
    description:
      'Food trucks, a bounce house, pumpkin painting, and live bluegrass. Free for the whole neighborhood — bring a friend!',
    image:
      'https://images.pexels.com/photos/4871891/pexels-photo-4871891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 2,
    title: 'Thanksgiving Praise & Pie Night',
    date: 'Sunday, Nov 23, 2025',
    day: '23',
    month: 'Nov',
    time: '5:30 PM – 8:00 PM',
    location: 'Fellowship Hall',
    description:
      'An evening of worship and gratitude, followed by our famous pie potluck. Sign up at the welcome desk to bring a pie.',
    image:
      'https://images.pexels.com/photos/6950752/pexels-photo-6950752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 3,
    title: 'Night of Worship',
    date: 'Friday, Dec 5, 2025',
    day: '05',
    month: 'Dec',
    time: '7:00 PM – 8:30 PM',
    location: 'Main Sanctuary',
    description:
      'An unplugged, candlelit evening led by our worship team and choir. Childcare provided for birth through age 5.',
    image:
      'https://images.pexels.com/photos/10024790/pexels-photo-10024790.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 4,
    title: 'Christmas Tree Lighting & Carols',
    date: 'Saturday, Dec 13, 2025',
    day: '13',
    month: 'Dec',
    time: '6:00 PM – 8:00 PM',
    location: 'Front Lawn',
    description:
      'Hot cocoa, caroling around the tree, and the retelling of the Christmas story. A beloved church tradition.',
    image:
      'https://images.pexels.com/photos/35092676/pexels-photo-35092676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 5,
    title: 'Women\u2019s Advent Brunch',
    date: 'Saturday, Dec 6, 2025',
    day: '06',
    month: 'Dec',
    time: '9:30 AM – 11:30 AM',
    location: 'Fellowship Hall',
    description:
      'A slow morning in a busy season — breakfast, testimony, and table conversation on preparing our hearts for Christmas.',
    image:
      'https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 6,
    title: 'Christmas Eve Candlelight Services',
    date: 'Wednesday, Dec 24, 2025',
    day: '24',
    month: 'Dec',
    time: '4:00 PM, 6:00 PM & 8:00 PM',
    location: 'Main Sanctuary',
    description:
      'Three identical family-friendly services with carols, candlelight, and communion. Doors open 30 minutes early.',
    image:
      'https://images.pexels.com/photos/29199703/pexels-photo-29199703.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export interface Ministry {
  name: string;
  tagline: string;
  description: string;
  leader: string;
  meeting: string;
  image: string;
}

export const MINISTRIES: Ministry[] = [
  {
    name: 'Youth Ministry',
    tagline: 'Grades 7–12',
    description:
      'A place where students can ask hard questions, build real friendships, and discover a faith of their own. Weekly gatherings, retreats, and service projects.',
    leader: 'Pastor James Okafor',
    meeting: 'Fridays, 7:00 PM — The Loft',
    image:
      'https://images.pexels.com/photos/4871891/pexels-photo-4871891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Women\u2019s Ministry',
    tagline: 'Every season of life',
    description:
      'From Bible studies and brunches to retreats and mentorship, the women of Grace gather to grow together and carry one another through every season.',
    leader: 'Sarah Mitchell',
    meeting: 'Tuesdays, 9:30 AM & 7:00 PM',
    image:
      'https://images.pexels.com/photos/8814997/pexels-photo-8814997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Men\u2019s Ministry',
    tagline: 'Iron sharpens iron',
    description:
      'Early-morning Bible study, monthly breakfasts, and hands-on service days. Men building each other up to lead with integrity at home, at work, and in the church.',
    leader: 'Tom Bennett',
    meeting: 'Saturdays, 7:30 AM — Monthly Breakfast',
    image:
      'https://images.pexels.com/photos/6860380/pexels-photo-6860380.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Children\u2019s Ministry',
    tagline: 'Birth – Grade 6',
    description:
      'Grace Kids is a safe, joyful place where children learn the big story of Scripture through songs, stories, and hands-on activities. Secure check-in every Sunday.',
    leader: 'Emily Hart',
    meeting: 'Sundays, both services',
    image:
      'https://images.pexels.com/photos/36900186/pexels-photo-36900186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Choir & Worship',
    tagline: 'Lead the song of the church',
    description:
      'The Grace Choir and worship team lead our congregation each Sunday. No auditions required for choir — just a heart for worship and faithful attendance at rehearsal.',
    leader: 'Daniel Reyes',
    meeting: 'Thursdays, 7:00 PM — Sanctuary',
    image:
      'https://images.pexels.com/photos/34611802/pexels-photo-34611802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Outreach & Missions',
    tagline: 'Beyond our walls',
    description:
      'Food pantry, homeless shelter meals, school supply drives, and global mission partners. We believe the church exists for the good of its city.',
    leader: 'Pastor Maria Sanchez',
    meeting: 'Second Saturday, 9:00 AM — Serve Days',
    image:
      'https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const LEADERS: Leader[] = [
  {
    name: 'Pastor David Whitfield',
    role: 'Senior Pastor',
    bio: 'David has led Grace Community since 2011. He and his wife, Karen, have three grown children and a golden retriever named Hymn.',
    image:
      'https://images.pexels.com/photos/7218328/pexels-photo-7218328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Pastor Maria Sanchez',
    role: 'Teaching & Outreach Pastor',
    bio: 'Maria oversees our outreach partners and co-teaches the sermon series. She loves strong coffee and long walks with her husband, Miguel.',
    image:
      'https://images.pexels.com/photos/36439572/pexels-photo-36439572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Pastor James Okafor',
    role: 'Youth & Young Adults Pastor',
    bio: 'James leads The Loft and our college ministry. Former college basketball player, current enthusiast of video games and deep conversations.',
    image:
      'https://images.pexels.com/photos/12311567/pexels-photo-12311567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Daniel Reyes',
    role: 'Worship Director',
    bio: 'Daniel leads our worship team and Grace Choir. He and his wife, Ana, have twin daughters and a growing collection of hymnals.',
    image:
      'https://images.pexels.com/photos/10812247/pexels-photo-10812247.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Emily Hart',
    role: 'Children\u2019s Director',
    bio: 'Emily has led Grace Kids for eight years and still keeps a drawer full of stickers. She believes every child is theological from day one.',
    image:
      'https://images.pexels.com/photos/30161439/pexels-photo-30161439.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Robert Chen',
    role: 'Elder & Admin Team',
    bio: 'Robert chairs the elder board and manages church operations. Retired engineer, faithful Tuesday volunteer at the food pantry.',
    image:
      'https://images.pexels.com/photos/14391923/pexels-photo-14391923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const BELIEFS = [
  {
    title: 'The Bible',
    text: 'We believe Scripture is God\u2019s inspired Word — trustworthy, true, and our final authority for faith and life.',
  },
  {
    title: 'The Gospel',
    text: 'We believe Jesus Christ lived, died, and rose again so that all who trust in Him are forgiven, redeemed, and made new.',
  },
  {
    title: 'The Church',
    text: 'We believe the church is not a building but a family — every member gifted, every member needed, every member loved.',
  },
  {
    title: 'The Mission',
    text: 'We believe God sends His people out: to love our neighbors, serve our city, and share the good news near and far.',
  },
];

export const VERSES = [
  {
    reference: 'Lamentations 3:22-23',
    text: 'Because of the Lord\u2019s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
  },
  {
    reference: 'Psalm 46:10',
    text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
  },
  {
    reference: 'Isaiah 41:10',
    text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
  },
  {
    reference: 'Matthew 11:28',
    text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
  },
  {
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
  },
  {
    reference: 'Romans 8:38-39',
    text: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.',
  },
  {
    reference: 'Philippians 4:6-7',
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
  },
];

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/29199703/pexels-photo-29199703.jpeg?auto=compress&cs=tinysrgb&w=1920',
  aboutStory:
    'https://images.pexels.com/photos/6269056/pexels-photo-6269056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  aboutHistory:
    'https://images.pexels.com/photos/287332/pexels-photo-287332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  churchExterior:
    'https://images.pexels.com/photos/17158781/pexels-photo-17158781.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  community:
    'https://images.pexels.com/photos/6950752/pexels-photo-6950752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  worship: 'https://images.pexels.com/photos/35555152/pexels-photo-35555152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  outreach:
    'https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};
