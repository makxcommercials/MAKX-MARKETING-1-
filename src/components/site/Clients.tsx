import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WA } from "./data";

const CLIENTS = [
  { name: "Light King", sector: "Lighting & Electricals", work: "GST + Accounting" },
  { name: "Gugli", sector: "Retail Brand", work: "Registration + Branding" },
  { name: "Aqqiq", sector: "D2C & E-commerce", work: "Compliance Retainer" },
  { name: "Tyre Plex", sector: "Automotive", work: "Books + ITR" },
  { name: "Business Accounting Client", sector: "Manufacturing Unit", work: "Full Accounting" },
];

export function Clients() {
  return (
    <section id="clients" className="bg-background/45 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Our work"
          title="Trusted by businesses across Indore."
          subtitle="From single-shop traders to growing manufacturing units — the paperwork stays with us."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((client, i) => (
            <Reveal key={client.name} delay={(i % 3) * 90}>
              <article className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-lift">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy font-display text-base font-extrabold text-white transition-colors duration-300 group-hover:bg-teal">
                  {client.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-bold text-navy">{client.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{client.sector}</p>
                  <span className="mt-3 inline-block rounded-full bg-teal-soft px-3 py-1 text-[0.68rem] font-semibold text-teal">
                    {client.work}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={180}>
            <a
              href={WA.default}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full min-h-[8.5rem] flex-col justify-center rounded-3xl gradient-hero p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1.5"
            >
              <p className="font-display text-2xl font-extrabold text-white">+10 More Clients</p>
              <p className="mt-1.5 text-sm text-white/60">Retail, food, transport, services & more.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-soft">
                Become the next one
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
            <span className="font-display font-bold text-navy">15+ Happy Clients</span> across Indore
          </p>
        </Reveal>
      </div>
    </section>
  );
}
