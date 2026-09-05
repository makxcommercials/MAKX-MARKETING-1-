import { MapPin, UserRound, IndianRupee, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const REASONS = [
  {
    icon: MapPin,
    title: "Based in Rau",
    body: "Walk into our office with a file, not a support ticket. We know the local departments.",
  },
  {
    icon: UserRound,
    title: "One Point of Contact",
    body: "One number for GST, accounts, licences and notices. No forwarding, no repeating yourself.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    body: "Fixed monthly bundles agreed upfront. Government fees shown separately, always.",
  },
  {
    icon: BadgeCheck,
    title: "Experienced Professionals",
    body: "Backed by 5+ CA partner firms, so complex cases never leave our network.",
  },
];

export function WhyMakx() {
  return (
    <section id="why" className="bg-surface/55 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Why MAKX"
          title="Local team, professional standards."
          subtitle="The reason clients stay with us is boring and valuable: nothing gets missed."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 2) * 90}>
              <article className="group flex h-full gap-5 rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-lift">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-teal text-white shadow-teal transition-transform duration-300 group-hover:scale-110">
                  <reason.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-navy">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
