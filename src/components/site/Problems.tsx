import { AlertTriangle, Users, Clock } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const PROBLEMS = [
  {
    icon: AlertTriangle,
    title: "GST notices keep coming",
    body: "Late filings and mismatched returns turn into penalties you never planned for.",
  },
  {
    icon: Users,
    title: "Too many consultants",
    body: "One person for GST, another for accounts, a third for licences — and no one owns the outcome.",
  },
  {
    icon: Clock,
    title: "No time for paperwork",
    body: "Your day belongs to customers and staff, not to portals, challans and registers.",
  },
];

export function Problems() {
  return (
    <section className="bg-surface/55 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="The reality"
          title="Running your business is already hard."
          subtitle="Compliance shouldn't be the thing that keeps you up at night. Here's what we hear every week in Rau."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 90}>
              <article className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal transition-transform duration-300 group-hover:scale-110">
                  <problem.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-navy">{problem.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{problem.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
