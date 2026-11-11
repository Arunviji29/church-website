import { SERVICE_TIMES } from '../data';

type ServiceTime = (typeof SERVICE_TIMES)[number];

export default function ServiceTimeCard({
  service,
}: {
  service: ServiceTime;
}) {
  return (
    <div className="group rounded-2xl bg-white p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <h3 className="text-xl font-semibold text-navy">{service.name}</h3>
      <p className="mt-3 font-serif text-lg font-medium text-gold-dark">
        {service.time}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        {service.description}
      </p>
    </div>
  );
}
