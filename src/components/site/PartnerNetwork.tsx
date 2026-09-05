import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const NODES = [
  { value: "5+", label: "CA Partner Firms", body: "Chartered accountants we file, audit and defend notices with." },
  { value: "15+", label: "Happy Clients", body: "Businesses in and around Indore on monthly retainers." },
  { value: "13+", label: "Service Categories", body: "From registration to branding — one accountable team." },
];

export function PartnerNetwork() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="float-blob absolute -right-20 top-0 h-80 w-80 rounded-full bg-teal/25 blur-[120px]" />
      </div>
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Partner network"
          title="A small team with a big bench behind it."
          subtitle="You deal with one contact — behind that sits a network of CA partners and specialists."
          invert
        />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-teal/60 via-white/25 to-transparent md:block"
          />
          {NODES.map((node, i) => (
            <Reveal key={node.label} delay={i * 110} as="li" className="relative">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-navy font-display text-sm font-extrabold text-teal-soft">
                0{i + 1}
              </span>
              <p className="mt-6 font-display text-4xl font-extrabold text-white">{node.value}</p>
              <p className="mt-1 font-display text-base font-bold text-teal-soft">{node.label}</p>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-white/60">{node.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
