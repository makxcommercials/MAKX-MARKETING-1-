import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Building2,
  Globe2,
  Mail,
  MessageCircle,
  Navigation,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BRAND, MAPS_URL, MAPS_EMBED_URL, CALENDLY_URL, WA, WEB3FORMS_ACCESS_KEY } from "@/components/site/data";
import { submitInquiry } from "@/lib/inquiries.server";

const TITLE = "Contact MAKX Commercials";
const DESCRIPTION =
  "Reach MAKX Commercials — WhatsApp or call for Indian GST/tax/compliance work, or email/book a call for international outsourced bookkeeping.";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ENQUIRY_OPTIONS = [
  "Indian GST / Tax / Compliance",
  "International Outsourced Bookkeeping", "Marketing",
  "Something else",
];

function Contact() {
  const [sending, setSending] = useState(false);
  const calendlyLoaded = useRef(false);

  useEffect(() => {
    if (calendlyLoaded.current) return;
    calendlyLoaded.current = true;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("botcheck") ?? "")) return; // honeypot

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    setSending(true);
    // Store the lead in the admin inbox and send the email notification in
    // parallel — neither should block the other, and a Supabase hiccup
    // shouldn't stop the enquiry email from going out (or vice versa).
    void submitInquiry({
      data: {
        name,
        email,
        phone: "",
        enquiry_type: String(fd.get("enquiry_type") ?? ""),
        message,
        source: "contact_page",
      },
    }).catch((err) => console.error("Failed to save inquiry:", err));

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New enquiry from MAKX website — Contact page",
          from_name: "MAKX Commercials Website",
          name,
          email,
          enquiry_type: String(fd.get("enquiry_type") ?? ""),
          message,
        }),
      });
      const body = await res.text();
      let parsed: { success?: boolean } = {};
      try {
        parsed = JSON.parse(body);
      } catch {
        /* ignore */
      }
      if (res.ok && parsed.success !== false) {
        form.reset();
        toast.success("Message sent. We'll get back to you shortly.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="section-shell text-center">
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                Contact
              </span>
              <h1 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.15] text-white sm:text-4xl">
                Two ways to reach us — pick the one that's you.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                In India, WhatsApp or call. Outside India, email or book a call. Either way, a
                real person on the MAKX team responds.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="section-shell grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-soft sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal">
                  <Building2 className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">India</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  For GST, tax, registration and compliance — fastest response is on WhatsApp.
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Phone</dt>
                    <dd className="mt-1 font-medium text-navy">
                      <a href={BRAND.phoneHref} className="hover:text-teal">{BRAND.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Email</dt>
                    <dd className="mt-1 font-medium text-navy">
                      <a href={`mailto:${BRAND.email}`} className="hover:text-teal">{BRAND.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Hours</dt>
                    <dd className="mt-1 font-medium text-navy">Mon–Sat, 10:00 AM – 7:00 PM IST</dd>
                  </div>
                </dl>
                <a
                  href={WA.contact}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-teal px-6 py-3.5 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-soft sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal">
                  <Globe2 className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">
                  International (US, UK, Australia &amp; Canada)
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  For outsourced bookkeeping and accounting support — email or book a call at
                  your convenience.
                </p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Email</dt>
                    <dd className="mt-1 font-medium text-navy">
                      <a href={`mailto:${BRAND.email}`} className="hover:text-teal">{BRAND.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Response time</dt>
                    <dd className="mt-1 font-medium text-navy">Within 1 business day</dd>
                  </div>
                </dl>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Us
                </a>
                <a
                  href="#book-a-call"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
                >
                  Book a Call
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface/55 py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Or Send Details Directly"
              align="left"
              title="Tell us a bit about what you need."
              subtitle="Works for either audience — just let us know which in the form below."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <div className="flex h-full flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                    <iframe
                      src={MAPS_EMBED_URL}
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MAKX office location — Rau, Indore"
                    />
                  </div>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Get Directions
                  </a>
                </div>
              </Reveal>

              <Reveal delay={110}>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[1.75rem] border border-border bg-card p-7 shadow-soft sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Name</label>
                      <input id="name" name="name" required placeholder="Your full name" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Email</label>
                      <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="enquiry_type" className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">I'm reaching out about</label>
                    <select id="enquiry_type" name="enquiry_type" defaultValue={ENQUIRY_OPTIONS[0]} className={inputClass}>
                      {ENQUIRY_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="message" className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Message</label>
                    <textarea id="message" name="message" rows={4} required placeholder="Tell us briefly what you need help with" className={`${inputClass} resize-none`} />
                  </div>
                  <div className="hidden" aria-hidden="true">
                    <input name="botcheck" tabIndex={-1} autoComplete="off" />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-teal px-6 py-4 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    First consultation is free — one call or WhatsApp message is all it takes.
                  </p>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="book-a-call" className="py-20 lg:py-28">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Book a Call"
              title="Pick a time that works for you."
              subtitle="Choose a slot below and we'll confirm the call — works for both Indian and international enquiries."
            />
            <Reveal className="mx-auto mt-12 max-w-3xl">
              <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: 320, height: 700 }} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-teal focus:ring-2 focus:ring-teal/20";
