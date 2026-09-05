import { MapPin, MessageCircle, Phone, Calculator, FileText, Receipt, Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import { BRAND, WA } from "./data";
import { Reveal } from "./Reveal";
import headerWave from "@/assets/header-wave.png.asset.json";

const PILLS = ["GST & TAX", "ACCOUNTING", "COMPLIANCE"];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden gradient-hero pt-28 pb-20 lg:pt-36 lg:pb-28">
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
        <div
          className="float-blob absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal/25 blur-[120px]"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(oklch(1_0_0/0.14)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.14)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      </div>

      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Reveal className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
            <MapPin className="h-3.5 w-3.5 text-teal-soft" aria-hidden="true" />
            Rau, Indore
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.35rem] font-extrabold leading-[1.06] text-white sm:text-5xl lg:text-[3.65rem]">
              Run your business,
              <br />
              <span className="text-gradient-teal">leave the paperwork to us.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              GST, tax, licenses and accounts — everything in one place, one phone call away.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {PILLS.map((pill) => (
                <li
                key={pill}
                  className="rounded-full glass-card px-4 py-2 text-[0.7rem] font-semibold tracking-[0.14em] text-white/80 transition-transform duration-300 hover:-translate-y-1 hover:text-white"
                >
                  {pill}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={WA.hero}
                target="_blank"
                rel="noreferrer"
                className="shine group inline-flex items-center justify-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
              >
                <MessageCircle className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={BRAND.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/15"
              >
                <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                Call Now
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-[2rem] glass-card p-5 shadow-lift sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50">
              Compliance dashboard
            </p>
            <p className="mt-1 font-display text-lg font-bold text-white">All filings on track</p>
          </div>
          <span className="rounded-full bg-teal/25 px-3 py-1 text-[0.68rem] font-semibold text-teal-soft">
            LIVE
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: Receipt, label: "GSTR-3B", value: "Filed" },
            { icon: Calculator, label: "Books", value: "Updated" },
            { icon: FileText, label: "Documents", value: "24 stored" },
            { icon: Landmark, label: "ITR", value: "In review" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-colors duration-300 hover:bg-white/[0.12]"
            >
              <Icon className="h-5 w-5 text-teal-soft" aria-hidden="true" />
              <p className="mt-3 text-xs font-medium text-white/55">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-teal-soft" aria-hidden="true" /> Monthly turnover
            </span>
            <span className="font-semibold text-white">₹ 8.4 L</span>
          </div>
          <div className="mt-3 flex h-16 items-end gap-1.5" aria-hidden="true">
            {[38, 52, 44, 66, 58, 78, 92].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%`, animationDelay: `${i * 110}ms` }}
                className="bar-rise flex-1 rounded-t-md bg-gradient-to-t from-teal/25 via-teal/70 to-teal-soft"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-navy/80 px-4 py-3 shadow-lift backdrop-blur-xl sm:flex">
        <ShieldCheck className="h-5 w-5 text-teal-soft" aria-hidden="true" />
        <span className="text-xs font-semibold text-white">Zero missed deadlines</span>
      </div>
    </div>
  );
}
