import { Reveal } from "./Reveal";

const STATS = [
  { value: "15+", label: "Happy Clients" },
  { value: "13+", label: "Services" },
  { value: "5+", label: "CA Partners" },
  { value: "24h", label: "Fast Turnaround" },
];

export function TrustStrip() {
  return (
    <section aria-label="Key numbers" className="relative z-10 bg-surface/70">
      <div className="section-shell -mt-12 lg:-mt-14">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border shadow-soft lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-card px-5 py-7 text-center lg:py-9">
              <p className="font-display text-3xl font-extrabold text-navy lg:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
