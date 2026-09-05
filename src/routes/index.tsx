import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Globe2, Layers, Users2, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import headerWave from "@/assets/header-wave.png.asset.json";

const TITLE = "MAKX Commercials | Accounting, Tax & Compliance — India & International";
const DESCRIPTION =
  "MAKX Commercials supports Indian businesses with GST, tax and compliance, and helps CPA and accounting firms in the US, UK, Australia and Canada with outsourced bookkeeping. One brand, two paths — pick the one that's you.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "MAKX Commercials | Accounting, tax & compliance — for Indian businesses and international firms" },
      { property: "og:description", content: "Pick your path: GST/ITR/Registration for Indian businesses, or outsourced bookkeeping for firms in the US, UK, Australia & Canada." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const SWITCH_CARDS = [
  {
    href: "/indian-services",
    icon: Building2,
    title: "For Indian Businesses",
    body: "GST filing, income tax, business registration and compliance — for shop owners, MSMEs and traders.",
    cta: "Explore Indian Services",
  },
  {
    href: "/international-services",
    icon: Globe2,
    title: "For CPA & Accounting Firms Abroad",
    body: "Outsourced bookkeeping and accounting support for firms in the US, UK, Australia & Canada — QuickBooks/Xero/Zoho fluent, timezone overlap.",
    cta: "Explore International Services",
  },
];

const STATS = [
  { value: "Dedicated", label: "Team Per Client" },
  { value: "13+", label: "Services" },
  { value: "Expert", label: "Team of Accountants" },
  { value: "5+ Yrs", label: "Experience" },
  { value: "Fast", label: "Turnaround" },
];

const CONSTANTS = [
  {
    icon: Layers,
    title: "One Logo, One Standard",
    body: "Every engagement, Indian or international, is held to the same quality bar and the same process discipline.",
  },
  {
    icon: Users2,
    title: "Expert Team of Accountants",
    body: "A dedicated team of accountants works each side of the business, so every client gets focused, specialist attention.",
  },
  {
    icon: ShieldCheck,
    title: "Two Languages, One Standard",
    body: "A dedicated team for Indian compliance, a dedicated team for international accounting standards — both held to the same bar.",
  },
];

function Index() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <img
              src={headerWave.url}
              alt=""
              className="ken-burns absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-royal/70 to-teal/45" />
            <div className="float-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal/40 blur-[110px]" />
            <div
              className="float-blob absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-royal/50 blur-[130px]"
              style={{ animationDelay: "-4s" }}
            />
          </div>

          <div className="section-shell text-center">
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                MAKX Commercials
              </span>
              <h1 className="mt-6 font-display text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-[3.15rem]">
                Accounting, tax &amp; compliance support —{" "}
                <span className="text-gradient-teal">for Indian businesses and international firms.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                One brand, two paths. Whether you're a shop owner in Indore or a CPA firm in the
                US, UK, Australia or Canada, tell us who you are and we'll take you straight to
                what's relevant.
              </p>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
              {SWITCH_CARDS.map((card, i) => (
                <Reveal key={card.href} delay={i * 90}>
                  <Link
                    to={card.href}
                    className="group flex h-full flex-col rounded-3xl glass-card p-7 text-left shadow-lift transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/25 text-teal-soft transition-transform duration-300 group-hover:scale-110">
                      <card.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-white">{card.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/65">{card.body}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-soft">
                      {card.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Key numbers" className="relative z-10 bg-surface/70">
          <div className="section-shell -mt-12 lg:-mt-14">
            <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border shadow-soft sm:grid-cols-3 lg:grid-cols-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-card px-4 py-7 text-center lg:py-9">
                  <p className="font-display text-2xl font-extrabold text-navy lg:text-3xl">{stat.value}</p>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="One Brand, One Trust Story"
              title="One brand, dedicated teams on both sides."
              subtitle="We didn't build two companies — we built one brand with a dedicated team for Indian compliance and a dedicated team for international accounting, both held to the same standard."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {CONSTANTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <article className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-lift">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-10 text-center">
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
              >
                Read our story
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
