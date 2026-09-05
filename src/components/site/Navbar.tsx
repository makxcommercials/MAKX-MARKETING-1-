import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "./data";
import { cn } from "@/lib/utils";
import { AnnouncementBar } from "./AnnouncementBar";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl shadow-soft"
          : "border-b border-transparent",
      )}
    >
      <AnnouncementBar />
      <nav className="section-shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={BRAND.name}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white p-1.5 shadow-soft">
            <img src="/logo.png" alt={BRAND.name} className="h-full w-full object-contain" />
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "block truncate font-display text-[1.02rem] font-extrabold leading-tight transition-colors",
                scrolled ? "text-foreground" : "text-white lg:text-white",
              )}
            >
              MAKX <span className="text-teal">Commercials</span>
            </span>
            <span
              className={cn(
                "block text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors",
                scrolled ? "text-muted-foreground" : "text-white/60",
              )}
            >
              India &amp; International
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  activeOptions={{ exact: link.href === "/" }}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    scrolled
                      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                      : "text-white/75 hover:bg-white/10 hover:text-white",
                  )}
                  activeProps={{
                    className: scrolled ? "!text-foreground !bg-muted" : "!text-white !bg-white/10",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="hidden shrink-0 items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-teal transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Contact Us
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors lg:hidden",
              scrolled
                ? "border-border text-foreground"
                : "border-white/20 bg-white/10 text-white",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <ul className="section-shell flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-3">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full gradient-teal px-5 py-3 text-sm font-semibold text-white shadow-teal"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
