import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { BRAND, NAV_LINKS, FOOTER_LINKS, SOCIALS } from "./data";

export function Footer() {
  return (
    <footer className="bg-navy py-16 text-navy-foreground">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.85fr_0.85fr_1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white p-1.5">
                <img src="/logo.png" alt="MAKX Commercials" className="h-full w-full object-contain" />
              </span>
              <span className="font-display text-lg font-extrabold text-white">
                MAKX <span className="text-teal-soft">Commercials</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Accounting, tax and compliance support for Indian businesses, and outsourced
              bookkeeping for international CPA firms — a dedicated team on each side, one
              standard of quality.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/80">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-teal-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/80">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-teal-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/80">
              Contact
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-white/55">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-soft" aria-hidden="true" />
                <span className="leading-relaxed">{BRAND.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-soft" aria-hidden="true" />
                <a href={BRAND.phoneHref} className="transition-colors hover:text-teal-soft">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-soft" aria-hidden="true" />
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-teal-soft">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/80">
              Connect
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-teal-soft"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-teal-soft"
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-teal-soft"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MAKX Commercials. All rights reserved.</p>
          <p>Made with ❤️ in Indore</p>
        </div>
      </div>
    </footer>
  );
}
