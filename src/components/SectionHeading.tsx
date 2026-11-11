import { SectionHeadingProps } from './types';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            light ? 'text-gold-light' : 'text-gold-dark'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-3xl font-semibold sm:text-4xl ${
          light ? 'text-white' : 'text-navy dark:text-neutral-100'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gold ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        aria-hidden
      />
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? 'text-white/75' : 'text-neutral-600 dark:text-neutral-300'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
