export interface ScrollToTopProps {
  pathname: string;
}

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
}
