import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Globe2,
  Mail,
  ShieldCheck,
  Users2,
  ClipboardCheck,
  FileSearch,
  Rocket,
  Quote,
  Lock,
  KeyRound,
  CloudCog,
  DownloadCloud,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BRAND } from "@/components/site/data";
import headerWave from "@/assets/header-wave.png.asset.json";

const TITLE =
  "Outsourced Bookkeeping & Accounting for US, UK, Australian & Canadian Firms | MAKX Commercials";
const DESCRIPTION =
  "MAKX Commercials provides outsourced bookkeeping and accounting support for CPA and accounting firms in the US, UK, Australia and Canada — QuickBooks, Xero and Zoho fluent, timezone overlap, secure and confidential.";

export const Route = createFileRoute("/international-services")({
  component: InternationalServices,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        property: "og:title",
        content:
          "MAKX Commercials | Outsourced bookkeeping for US, UK, Australian & Canadian firms",
      },
      {
        property: "og:description",
        content:
          "Cut back-office costs without cutting quality — QuickBooks/Xero/Zoho fluent, timezone overlap, secure data handling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/international-services" }],
  }),
});

const TOOLS = [
  { label: "QuickBooks Online & Desktop", color: "#2CA01C" },
  { label: "Xero", color: "#13B5EA" },
  { label: "Zoho Books", color: "#E42527" },
  { label: "Excel / Google Sheets", color: "var(--royal)" },
];

const ENGAGEMENTS = [
  {
    icon: ShieldCheck,
    title: "End-to-End Outsourcing",
    body: "Hand off a full function — bookkeeping, reconciliations, month-end close, reporting — and we own the output. You review, we execute.",
  },
  {
    icon: Users2,
    title: "Dedicated Staffing",
    body: "A dedicated bookkeeper or accountant works inside your workflow and tools like an extension of your in-house team, on your schedule.",
  },
];

const TIMEZONES = [
  { region: "US", body: "EST / CST / PST — shifted late-day and evening (IST) coverage." },
  { region: "UK", body: "GMT / BST — strong overlap with a standard IST working day." },
  { region: "Australia", body: "AEST / AWST — early-morning IST coverage lines up well." },
  { region: "Canada", body: "EST / PST — same shifted coverage as the US, on request." },
];

const SECURITY_POINTS = [
  "Signed NDA and confidentiality agreement before any data is shared",
  "Access limited to the staff assigned to your engagement only",
  "Work done inside your cloud accounting environment — data doesn't leave your systems",
  "No local downloads of client financial data",
];

const QUOTE_STEPS = [
  {
    icon: FileSearch,
    title: "1. Discovery Call",
    body: "A short call to understand your workflow, volumes, tools and where you need support.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Written Proposal",
    body: "A clear scope and quotation — task-based, monthly retainer, or dedicated staffing, whichever fits.",
  },
  {
    icon: Rocket,
    title: "3. Onboard & Start",
    body: "Once terms are agreed, we set up access and get to work inside your existing systems.",
  },
];

const TESTIMONIALS = [
  {
    initials: "EM",
    name: "Ethan Miller",
    role: "Summit Ridge Solutions Inc. — USA",
    quote:
      "Working remotely with an accounting team in India can be difficult without good communication. MAKX has been responsive and clear throughout the process.",
  },
  {
    initials: "DT",
    name: "Daniel Thompson",
    role: "Westbridge Consulting Ltd — UK",
    quote:
      "MAKX has been very helpful with our accounting requirements in India. Their team communicates clearly and has made the process considerably easier for us.",
  },
  {
    initials: "OR",
    name: "Omar Rahman",
    role: "Desert Crest Holdings — UAE",
    quote:
      "Operating business activities between India and the UAE creates additional accounting requirements. MAKX has helped us keep everything much more organized.",
  },
];

function InternationalServices() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <img
              src={headerWave.url}
              alt=""
              className="ken-burns absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-royal/70 to-teal/45" />
            <div className="float-blob absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-royal/50 blur-[130px]" />
          </div>

          <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
              <Reveal className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                <Globe2 className="h-3.5 w-3.5 text-teal-soft" aria-hidden="true" />
                For CPA &amp; Accounting Firms — US, UK, Australia &amp; Canada
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-[2.15rem] font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.15rem]">
                  Outsourced bookkeeping that cuts{" "}
                  <span className="text-gradient-teal">back-office costs</span> — without cutting
                  quality.
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                  A dedicated, QuickBooks/Xero/Zoho-fluent accounting team working your hours, so
                  your firm can take on more clients without adding full-time headcount.
                </p>
              </Reveal>

              <Reveal delay={210}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="shine group inline-flex items-center justify-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
                  >
                    Book a Discovery Call
                  </Link>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/15"
                  >
                    <Mail className="h-4.5 w-4.5" aria-hidden="true" />
                    Email Us
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative">
              <div className="mx-auto w-full max-w-md rounded-[2rem] glass-card p-6 shadow-lift sm:p-8 lg:max-w-none">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Software we work in
                </p>
                <div className="mt-5 space-y-3">
                  {TOOLS.map((tool) => (
                    <div
                      key={tool.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5"
                    >
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: tool.color }}
                      />
                      <span className="text-sm font-medium text-white/85">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Engagement Models"
              title="Two ways to work with us."
              subtitle="Pick whichever fits how your firm operates — both run on a dedicated team and the same quality standard."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {ENGAGEMENTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <article className="flex h-full gap-5 rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-lift">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-teal text-white shadow-teal">
                      <item.icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface/55 py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Availability"
              title="Real overlap, wherever your firm is."
              subtitle="We schedule around US, UK, Australian and Canadian business hours — not the other way round."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TIMEZONES.map((tz, i) => (
                <Reveal key={tz.region} delay={i * 90}>
                  <div className="h-full rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
                    <p className="font-display text-2xl font-extrabold text-navy">{tz.region}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tz.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={140}>
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Async-ready either way — documented handoffs and status updates cover anything
                outside live overlap hours.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Data Security"
              title="Your clients' data is handled the way you'd handle it yourself."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <ul className="h-full space-y-4 rounded-3xl border border-border bg-card p-7 shadow-soft">
                  {SECURITY_POINTS.map((point, i) => {
                    const icons = [Lock, KeyRound, CloudCog, DownloadCloud];
                    const Icon = icons[i % icons.length] ?? Lock;
                    return (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Icon
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
              <Reveal delay={110}>
                <div className="flex h-full gap-5 rounded-3xl gradient-hero p-7 shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/12 text-white">
                    <Users2 className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Who you're working with
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                      MAKX is led by a team of expert accountants, with an ACCA-qualified
                      professional at the helm, fluent in both Indian compliance and the accounting
                      standards used across the US, UK, Australia and Canada. A dedicated team is
                      assigned to your engagement, so it gets real attention — not one account among
                      hundreds at a faceless outsourcing shop.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-surface/55 py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="How We Quote"
              title="Every engagement runs on a proposal — not a rate card."
              subtitle="Transaction volume, software, reporting complexity and turnaround needs vary too much firm to firm for a fixed price list to be honest. Tell us your scope and we'll send a written proposal."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {QUOTE_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal">
                      <step.icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Testimonials"
              title="What firms abroad say about working with us."
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
                        <span className="block truncate text-xs text-muted-foreground">
                          {item.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120} className="mt-10 text-center">
              <Link
                to="/testimonials"
                className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
              >
                Read All Client Testimonials
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-navy py-20 text-center lg:py-24">
          <div className="section-shell">
            <Reveal>
              <h2 className="font-display text-[1.7rem] font-extrabold text-white sm:text-4xl">
                Let's see if it's a fit — no pressure, no pitch deck.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                A short call to understand your workflow, volumes and tools, and whether outsourcing
                makes sense for your firm right now.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book a Discovery Call
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
