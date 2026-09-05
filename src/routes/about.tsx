import { createFileRoute } from "@tanstack/react-router";
import { UserRound, Users2, HandCoins, BadgeCheck } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

const TITLE = "About MAKX Commercials";
const DESCRIPTION =
  "MAKX Commercials runs dedicated teams for two audiences — GST and compliance for Indian businesses, and outsourced bookkeeping for CPA firms in the US, UK, Australia and Canada.";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const CONSTANTS = [
  {
    icon: Users2,
    title: "One Point of Contact",
    body: "Indian client or international firm, you deal with one person who knows your file end to end.",
  },
  {
    icon: HandCoins,
    title: "Straightforward Quotes",
    body: "Tell us what you need and we'll send a clear quote for it — no surprise line items later.",
  },
  {
    icon: BadgeCheck,
    title: "Hands-On Ownership",
    body: "Every file gets direct attention from a qualified accountant — not passed down a chain of juniors.",
  },
];

function About() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="section-shell text-center">
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                About Us
              </span>
              <h1 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
                One brand. Two languages: local compliance and international standards.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                MAKX Commercials didn't start as two businesses — it's one brand with a dedicated
                team on each side, serving two very different audiences well.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-[1.2fr_0.9fr]">
            <Reveal>
              <span className="inline-block rounded-full bg-teal-soft px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-teal">
                Our Story
              </span>
              <h2 className="mt-4 font-display text-[1.6rem] font-extrabold leading-[1.2] text-navy sm:text-3xl">
                Started local, grew into international work.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                MAKX Commercials began by solving a simple, local problem: Indore's shop owners,
                traders and small manufacturers were juggling too many consultants for GST, tax
                and compliance. We became the one point of contact that handled all of it.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                As our accounting and process discipline grew, so did interest from outside India
                — CPA and accounting firms in the US, UK, Australia and Canada looking for
                reliable, cost-effective bookkeeping support. Rather than start a separate
                company, we built a second track under the same brand and the same standards,
                with its own dedicated team.
              </p>
            </Reveal>

            <Reveal delay={110}>
              <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-soft sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-teal">
                  <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                  Leadership
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Led by an ACCA</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  MAKX is led by an ACCA-qualified professional with 5+ years of experience across
                  international and Indian accountancy — backed by a dedicated team of accountants
                  on each side of the business for deeper specialist input.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface/55 py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading eyebrow="What Stays Constant" title="Same standard, whichever side you're on." />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {CONSTANTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-lift">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal">
                      <item.icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
