import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Problems } from "@/components/site/Problems";
import { Services } from "@/components/site/Services";
import { Clients } from "@/components/site/Clients";
import { WhyMakx } from "@/components/site/WhyMakx";
import { PartnerNetwork } from "@/components/site/PartnerNetwork";
import { Testimonials } from "@/components/site/Testimonials";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

const TITLE = "GST, Tax & Accounting for Indian Businesses | MAKX Commercials";
const DESCRIPTION =
  "MAKX Commercials handles GST, income tax, accounting, business registration and compliance for shop owners, MSMEs and traders in Indore — 5+ years of experience, one point of contact.";

export const Route = createFileRoute("/indian-services")({
  component: IndianServices,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/indian-services" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/indian-services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AccountingService",
          name: "MAKX Commercials",
          description: DESCRIPTION,
          areaServed: "Indore",
          telephone: "+91-9301144388",
          email: "mayank@makxcommercials.in",
          address: {
            "@type": "PostalAddress",
            streetAddress: "12/14 Chandralok Colony",
            addressLocality: "Rau, Indore",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
});

function IndianServices() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problems />
        <Services />
        <Clients />
        <WhyMakx />
        <PartnerNetwork />
        <Testimonials />

        {/* Was a full duplicate contact form — /contact already owns that
            experience, so this page just hands off to it. */}
        <section className="py-16 lg:py-20">
          <div className="section-shell">
            <Reveal className="flex flex-col items-center gap-5 rounded-[2rem] gradient-hero px-8 py-12 text-center shadow-lift sm:px-14">
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Ready to get your GST and compliance sorted?
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Tell us about your business and we'll get back with a clear next step — no
                jargon, no pressure.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full gradient-teal px-7 py-3 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
