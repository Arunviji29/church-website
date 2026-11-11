import { PageHeroProps } from './types';

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/80 to-navy" />
      <div className="container-site relative py-20 text-center sm:py-28">
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        <div
          className="mx-auto mt-5 h-1 w-16 rounded-full bg-gold"
          aria-hidden
        />
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
