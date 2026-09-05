import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { WA, BRAND } from "@/components/site/data";

const TITLE = "Client Testimonials | MAKX Commercials";
const DESCRIPTION =
  "Real testimonials from MAKX Commercials clients across India, the UAE, UK, USA, Canada, Australia, Singapore, Qatar, Saudi Arabia, New Zealand, Germany and South Africa.";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
});

type Testimonial = { initials: string; name: string; role: string; quote: string };

const COUNTRIES: { id: string; name: string; testimonials: Testimonial[] }[] = [
  {
    id: "india",
    name: "India",
    testimonials: [
      { initials: "AM", name: "Aarav Mehta", role: "Northstar Trading Solutions — India", quote: "MAKX has made our regular accounting requirements much easier to manage. The team is responsive, professional, and explains things in a way that is easy for a business owner to understand." },
      { initials: "RM", name: "Rohan Malhotra", role: "Vertex Manufacturing Co. — India", quote: "We appreciate the organized approach of the MAKX team. They helped us understand our compliance requirements and kept the process straightforward." },
      { initials: "NK", name: "Neha Kapoor", role: "BluePeak Business Services — India", quote: "The team takes the time to understand the business before suggesting a solution. That practical approach has been very helpful for us." },
      { initials: "VS", name: "Vikram Shah", role: "Crestline Imports — India", quote: "Our bookkeeping process became much more structured after working with MAKX. Communication has been clear and the team has been easy to reach whenever we need assistance." },
      { initials: "PN", name: "Priya Nair", role: "UrbanEdge Ventures — India", quote: "As a growing business, we needed accounting support without unnecessary complexity. MAKX has provided exactly that with a very professional approach." },
    ],
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    testimonials: [
      { initials: "AP", name: "Arjun Patel", role: "GulfBridge Trading LLC — UAE", quote: "MAKX has provided reliable accounting support for our business. Their communication is prompt and they are always willing to clarify our questions." },
      { initials: "OR", name: "Omar Rahman", role: "Desert Crest Holdings — UAE", quote: "Operating business activities between India and the UAE creates additional accounting requirements. MAKX has helped us keep everything much more organized." },
      { initials: "SK", name: "Sameer Khan", role: "Atlas Horizon Trading — UAE", quote: "What we liked most was the straightforward communication. The team explained what was required and helped us approach our accounting work systematically." },
    ],
  },
  {
    id: "uk",
    name: "United Kingdom",
    testimonials: [
      { initials: "DT", name: "Daniel Thompson", role: "Westbridge Consulting Ltd — UK", quote: "MAKX has been very helpful with our accounting requirements in India. Their team communicates clearly and has made the process considerably easier for us." },
      { initials: "OB", name: "Olivia Bennett", role: "Oakwell Commerce Ltd — UK", quote: "Having an accounting team that understands international business requirements has been valuable. MAKX has been responsive and professional throughout." },
      { initials: "JR", name: "James Richardson", role: "Brightstone Ventures — UK", quote: "The MAKX team has a very practical way of working. They focus on the actual requirement instead of making things unnecessarily complicated." },
      { initials: "SC", name: "Sophie Carter", role: "Harbourline Consulting — UK", quote: "We needed dependable support for our Indian business operations while being based in the UK. MAKX has helped us stay organized and informed." },
    ],
  },
  {
    id: "usa",
    name: "United States",
    testimonials: [
      { initials: "EM", name: "Ethan Miller", role: "Summit Ridge Solutions Inc. — USA", quote: "Working remotely with an accounting team in India can be difficult without good communication. MAKX has been responsive and clear throughout the process." },
      { initials: "SM", name: "Sophia Mitchell", role: "Evergreen Commerce Group — USA", quote: "MAKX provided practical support for our accounting requirements and made it easier for us to understand what needed attention." },
      { initials: "RC", name: "Ryan Cooper", role: "BlueRiver Advisory LLC — USA", quote: "The team has been professional, accessible, and focused on understanding our requirements. That made working together very straightforward." },
      { initials: "MB", name: "Michael Brooks", role: "CedarPoint Enterprises — USA", quote: "Managing our India-related business requirements from the US became much easier with MAKX involved. Their communication and follow-up have been particularly helpful." },
    ],
  },
  {
    id: "canada",
    name: "Canada",
    testimonials: [
      { initials: "RA", name: "Ryan Anderson", role: "Maple Crest Trading Inc. — Canada", quote: "MAKX helped us bring more structure to our accounting and compliance processes. The team is approachable and quick to respond." },
      { initials: "EW", name: "Emma Wilson", role: "Northfield Business Group — Canada", quote: "We valued the practical approach from the MAKX team. They listened to our requirements first and then explained the available options clearly." },
      { initials: "LM", name: "Lucas Martin", role: "SilverOak Commerce Inc. — Canada", quote: "For a business operating internationally, having dependable accounting support is important. MAKX has been professional and easy to communicate with." },
    ],
  },
  {
    id: "australia",
    name: "Australia",
    testimonials: [
      { initials: "JH", name: "Jack Harrison", role: "Southern Cross Ventures — Australia", quote: "The MAKX team has been professional and organized from the beginning. They have helped us better understand and manage our accounting requirements in India." },
      { initials: "EW", name: "Emily Walker", role: "HarbourPeak Solutions — Australia", quote: "We particularly appreciated how clearly the team explained each requirement. Their support has made our compliance process much less stressful." },
      { initials: "LF", name: "Liam Foster", role: "Pacific Edge Consulting — Australia", quote: "MAKX takes a business-focused approach rather than simply dealing with numbers. Their team has been practical and responsive." },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    testimonials: [
      { initials: "AC", name: "Adam Collins", role: "LionCity Trade Partners — Singapore", quote: "MAKX has been a reliable support for our accounting requirements. Their team understands the needs of a growing trading business and communicates efficiently." },
      { initials: "CT", name: "Chloe Tan", role: "Meridian Pacific Holdings — Singapore", quote: "We needed professional accounting assistance for our India operations, and MAKX provided a smooth and organized experience." },
    ],
  },
  {
    id: "qatar",
    name: "Qatar",
    testimonials: [
      { initials: "YH", name: "Yusuf Hassan", role: "Gulf Horizon Enterprises — Qatar", quote: "The MAKX team has been very responsive whenever we needed clarification. Their approach is professional without making the process difficult to understand." },
      { initials: "KA", name: "Khalid Ahmed", role: "PearlGate Trading W.L.L. — Qatar", quote: "We appreciated the team's attention to detail and consistent communication. MAKX has helped us approach our business accounting requirements with greater clarity." },
    ],
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    testimonials: [
      { initials: "FA", name: "Faisal Al-Mansoori", role: "DesertLine Business Group — Saudi Arabia", quote: "Our experience with MAKX has been positive. The team is attentive to details and keeps communication clear throughout the engagement." },
    ],
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    testimonials: [
      { initials: "NW", name: "Noah Williams", role: "Southern Harbour Advisory — New Zealand", quote: "MAKX has helped us manage our accounting requirements in India while we operate from New Zealand. Their communication has been consistent and professional." },
    ],
  },
  {
    id: "germany",
    name: "Germany",
    testimonials: [
      { initials: "LW", name: "Lukas Weber", role: "RheinBridge Consulting GmbH — Germany", quote: "We appreciated the structured approach of the MAKX team. They took the time to understand our business and provided practical guidance based on our requirements." },
    ],
  },
  {
    id: "south-africa",
    name: "South Africa",
    testimonials: [
      { initials: "TM", name: "Thabo Mokoena", role: "Cape Meridian Trading — South Africa", quote: "The team at MAKX has been professional, approachable, and responsive. Their support has helped us bring more clarity and organization to our accounting requirements." },
    ],
  },
];

function TestimonialsPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="section-shell text-center">
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                Testimonials
              </span>
              <h1 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.15] text-white sm:text-4xl">
                What clients say about working with MAKX.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Real feedback from real clients — Indian businesses and international firms we
                work with across 12 countries.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="section-shell">
            <Reveal
              as="nav"
              aria-label="Jump to country"
              className="mb-14 flex flex-wrap justify-center gap-2"
            >
              {COUNTRIES.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-teal hover:text-teal"
                >
                  {c.name}
                </a>
              ))}
            </Reveal>

            {COUNTRIES.map((country) => (
              <div key={country.id} id={country.id} className="mb-16 scroll-mt-24 last:mb-0">
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <h2 className="font-display text-xl font-extrabold text-navy sm:text-2xl">
                    {country.name}
                  </h2>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {country.testimonials.length} testimonial{country.testimonials.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {country.testimonials.map((item, i) => (
                    <Reveal key={item.name} delay={(i % 3) * 80}>
                      <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                        <Quote className="h-6 w-6 text-teal/35" aria-hidden="true" />
                        <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                          “{item.quote}”
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-soft font-display text-xs font-extrabold text-teal">
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
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface/55 py-20 text-center lg:py-24">
          <div className="section-shell">
            <Reveal>
              <h2 className="font-display text-[1.6rem] font-extrabold text-navy sm:text-3xl">
                Want to talk to us before you decide?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Reach out on WhatsApp, call, or book a time that works for you — your first
                consultation is free.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
                >
                  Call Now
                </a>
                <a
                  href={WA.default}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
                >
                  WhatsApp
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
