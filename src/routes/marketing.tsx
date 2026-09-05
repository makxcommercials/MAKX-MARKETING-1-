import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Globe2,
  Share2,
  Palette,
  Video,
  CreditCard,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getServiceIcon } from "@/components/site/service-icons";
import { fetchPublicServices, type ServiceRecord } from "@/lib/services.server";
import {
  MarkerUnderline,
  PinTack,
  ScribbleCircle,
  Sparkle,
  SquiggleArrow,
  SquiggleConnector,
} from "@/components/site/doodles";
import { cn } from "@/lib/utils";

const TITLE = "Marketing Services | MAKX Commercials";
const DESCRIPTION =
  "Brand, content, ads, websites and growth — MAKX Commercials' marketing wing helps businesses build a presence, get found and get customers.";

export const Route = createFileRoute("/marketing")({
  component: Marketing,
  // Services are admin-editable (see /admin → Services); if the migration
  // hasn't been run yet this just comes back empty and the section quietly
  // shows nothing instead of the whole page failing.
  loader: async () => {
    try {
      return await fetchPublicServices();
    } catch {
      return [] as ServiceRecord[];
    }
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/marketing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/marketing" }],
  }),
});

// Groups the flat admin-managed rows by category for display, preserving
// each row's sort_order within its group.
function groupServices(rows: ServiceRecord[]) {
  const groups = new Map<string, { label: string; blurb: string; services: ServiceRecord[] }>();
  for (const row of rows) {
    if (!groups.has(row.category)) {
      groups.set(row.category, { label: row.category, blurb: row.category_blurb, services: [] });
    }
    groups.get(row.category)!.services.push(row);
  }
  return Array.from(groups.values());
}

const PROCESS = [
  {
    step: "01",
    title: "Understand",
    body: "Your business, customers and current presence — before anything else.",
  },
  {
    step: "02",
    title: "Strategize",
    body: "A plan matched to your budget and goals, not a generic package.",
  },
  { step: "03", title: "Create", body: "Brand, content and creative built to that plan." },
  { step: "04", title: "Launch", body: "Live across the right channels, tracked from day one." },
  {
    step: "05",
    title: "Optimize",
    body: "Real data used to cut what's not working and double down on what is.",
  },
  {
    step: "06",
    title: "Scale",
    body: "More budget, more channels — once the foundation is proven.",
  },
];

const WORK_CATEGORIES = [
  { icon: Globe2, title: "Websites" },
  { icon: Share2, title: "Social Campaigns" },
  { icon: Palette, title: "Branding" },
  { icon: Video, title: "Video" },
  { icon: Rocket, title: "Advertisements" },
  { icon: CreditCard, title: "Business Creatives" },
];

function Marketing() {
  const services = Route.useLoaderData();
  const serviceGroups = groupServices(services);
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        {/* HERO — dark backdrop with a mustard → orange → coral glow, distinct
            from the site's teal/navy identity but built from the same shapes
            (glass-card, section-shell, Reveal) so it still feels like one product. */}
        <section className="relative isolate overflow-hidden bg-navy pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy/95" />
            <div className="float-blob absolute -left-20 top-16 h-80 w-80 rounded-full bg-flame/30 blur-[120px]" />
            <div
              className="float-blob absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-mustard/30 blur-[140px]"
              style={{ animationDelay: "-3s" }}
            />
            <div
              className="float-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-coral/20 blur-[130px]"
              style={{ animationDelay: "-6s" }}
            />
          </div>

          <div className="section-shell text-center">
            {/* Opening sequence: chip, then headline, then the circle draws
                itself around the key phrase, then the sparkle pops in, then
                the actions — one choreographed load, nothing scattered. */}
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-mustard">
                Marketing, done properly
              </span>
              <h1 className="relative mt-6 font-display text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl lg:text-[3.15rem]">
                Marketing that{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="text-gradient-marketing">moves your business</span>
                  <Reveal
                    as="span"
                    delay={520}
                    className="pointer-events-none absolute -inset-x-3 -inset-y-3 block text-mustard sm:-inset-x-4 sm:-inset-y-4"
                  >
                    <ScribbleCircle className="h-full w-full" />
                  </Reveal>
                </span>
                , not just your feed.
                <Reveal
                  as="span"
                  delay={780}
                  className="pointer-events-none absolute -right-2 -top-6 hidden text-flame sm:-right-4 sm:-top-8 sm:block"
                >
                  <Sparkle className="sparkle-pop h-7 w-7" />
                </Reveal>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Brand, content, ads and websites — built around one goal: more of the right
                customers finding you and choosing you.
              </p>
            </Reveal>

            <Reveal
              delay={420}
              className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full gradient-marketing px-7 py-3 text-sm font-semibold text-navy shadow-lift transition-transform duration-200 hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="relative">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full glass-card px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Explore Services
                </a>
                <SquiggleArrow className="pointer-events-none absolute -right-14 top-1/2 hidden h-10 w-14 -translate-y-1/2 rotate-[10deg] text-mustard/70 md:block" />
              </span>
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="What we offer"
              title="Everything a growing brand needs, grouped the way you'd actually use it."
              subtitle="Pick one service or the whole system — every service below is built to work together."
            />

            <div className="mt-14 space-y-16">
              {serviceGroups.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  Services will appear here once added in the admin panel.
                </p>
              )}
              {serviceGroups.map((group, gi) => (
                <Reveal key={group.label} delay={gi * 60}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4">
                    <div className="relative inline-block">
                      <h3 className="font-display text-lg font-bold text-navy">{group.label}</h3>
                      <MarkerUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-mustard/80" />
                    </div>
                    <p className="text-sm text-muted-foreground">{group.blurb}</p>
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.services.map((service, si) => {
                      const Icon = getServiceIcon(service.icon);
                      const tilt =
                        si % 3 === 0 ? "-rotate-1" : si % 3 === 1 ? "rotate-0" : "rotate-1";
                      return (
                        <article
                          key={service.id}
                          className={cn(
                            "group relative h-full rounded-3xl border border-border bg-card p-6 pt-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:border-flame/30 hover:shadow-lift",
                            tilt,
                          )}
                        >
                          <PinTack className="pin-drop absolute -top-3 left-6 h-6 w-6 text-flame/80" />
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-butter text-flame transition-transform duration-300 group-hover:scale-110">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <h4 className="mt-5 font-display text-base font-bold text-navy">
                            {service.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {service.body}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-surface/60 py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading eyebrow="How it works" title="How we grow your business" />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS.map((item, i) => (
                <Reveal key={item.step} delay={i * 70}>
                  <div
                    className={cn(
                      "h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:rotate-0",
                      i % 2 === 0 ? "-rotate-1" : "rotate-1",
                    )}
                  >
                    <span className="font-display text-2xl font-extrabold text-mustard">
                      {item.step}
                    </span>
                    <SquiggleConnector className="mt-1 h-3 w-16 text-mustard/50" />
                    <h3 className="mt-2 font-display text-base font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE CAN BUILD — structure only, no invented clients/stats */}
        <section className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading eyebrow="Selected work" title="What we can build for you" />
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {WORK_CATEGORIES.map((cat, i) => {
                const tilt = [
                  "-rotate-2",
                  "rotate-2",
                  "-rotate-1",
                  "rotate-1",
                  "-rotate-2",
                  "rotate-2",
                ][i % 6];
                return (
                  <Reveal key={cat.title} delay={i * 50}>
                    <div
                      className={cn(
                        "flex h-full flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-lift",
                        tilt,
                      )}
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-butter text-flame">
                        <cat.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-navy">{cat.title}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pb-20 lg:pb-28">
          <div className="section-shell">
            <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy px-8 py-14 text-center shadow-lift sm:px-14">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="float-blob absolute -left-16 -top-10 h-64 w-64 rounded-full bg-flame/30 blur-[110px]" />
                <div className="float-blob absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-mustard/30 blur-[110px]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mustard">
                <TrendingUp className="mr-2 -mt-0.5 inline h-4 w-4" aria-hidden="true" />
                Ready when you are
              </p>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Ready to build something big?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                Tell us where your brand is today and where you want it to be — we'll tell you what
                it actually takes to get there.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="relative">
                  <span className="font-marker pointer-events-none absolute -left-24 -top-9 hidden -rotate-6 text-lg text-mustard sm:block">
                    let&apos;s talk!
                  </span>
                  <SquiggleArrow className="pointer-events-none absolute -left-14 -top-2 hidden h-9 w-14 -rotate-[100deg] scale-x-[-1] text-mustard sm:block" />
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full gradient-marketing px-7 py-3 text-sm font-semibold text-navy shadow-lift transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Contact Us
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </span>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full glass-card px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Explore Services
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
