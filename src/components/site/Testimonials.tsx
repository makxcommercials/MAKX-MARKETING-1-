import { Quote } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const TESTIMONIALS = [
  {
    initials: "AM",
    name: "Aarav Mehta",
    role: "Northstar Trading Solutions — India",
    quote:
      "MAKX has made our regular accounting requirements much easier to manage. The team is responsive, professional, and explains things in a way that is easy for a business owner to understand.",
  },
  {
    initials: "RM",
    name: "Rohan Malhotra",
    role: "Vertex Manufacturing Co. — India",
    quote:
      "We appreciate the organized approach of the MAKX team. They helped us understand our compliance requirements and kept the process straightforward.",
  },
  {
    initials: "VS",
    name: "Vikram Shah",
    role: "Crestline Imports — India",
    quote:
      "Our bookkeeping process became much more structured after working with MAKX. Communication has been clear and the team has been easy to reach whenever we need assistance.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-background/45 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say about working with us."
          subtitle="Straight talk from business owners we work with across Indore."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <Quote className="h-7 w-7 text-teal/35" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-soft font-display text-sm font-extrabold text-teal">
                    {item.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold text-navy">
                      {item.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
            >
              Read All Client Testimonials
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
