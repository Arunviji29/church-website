import ServiceTimeCard from './ServiceTimeCard';
import { SERVICE_TIMES } from '../data';

export default function ServiceTimesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_TIMES.map((service) => (
        <ServiceTimeCard key={service.name} service={service} />
      ))}
    </div>
  );
}
