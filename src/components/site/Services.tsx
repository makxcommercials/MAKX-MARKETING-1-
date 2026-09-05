import {
  Building2,
  Receipt,
  BookOpen,
  BadgeCheck,
  Megaphone,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WA } from "./data";

const SERVICES = [
  {
    icon: Building2,
    title: "Business Registration",
    body: "Proprietorship, partnership, LLP and Pvt Ltd — registered correctly the first time.",
  },
  {
    icon: Receipt,
    title: "GST & Income Tax",
    body: "Registration, monthly returns, reconciliation, ITR and notice handling.",
  },
  {
    icon: BookOpen,
    title: "Accounting & Bahi-Khata",
    body: "Clean books in Tally or Excel, with monthly P&L you can actually read.",
  },
  {
    icon: BadgeCheck,
    title: "Licences & Certifications",
    body: "Udyam, FSSAI, Shop Act, Trade Licence, ISO and Trademark filings.",
  },
  {
    icon: Megaphone,
    title: "Branding & Digital Presence",
    body: "Logo, invoice design, Google Business profile and a simple website.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Business Support",
    body: "TDS, ROC filings, payroll and deadline reminders — handled quietly in the background.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-background/45 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="What we do"
          title="One team for everything your business must file."
          subtitle="Six core practice areas, thirteen-plus service categories — all under one roof in Rau."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <a
                href={WA.default}
                target="_blank"
                rel="noreferrer"
                className="group tilt-card shine relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft hover:border-teal/35 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-soft text-teal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                  <service.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-navy">{service.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                  Learn more
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 text-center text-sm font-medium text-muted-foreground">
            <span className="font-display text-base font-bold text-navy">13+ service categories</span>
            {" — "}
            Ek hi team. Ek hi contact.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
