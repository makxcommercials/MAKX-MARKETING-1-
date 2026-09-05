import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "Resources — MAKX Commercials";
const DESCRIPTION =
  "Guides and updates on GST, tax, compliance and cross-border bookkeeping from the MAKX Commercials team.";

export const Route = createFileRoute("/resources/")({
  component: ResourcesHub,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
});

function ResourcesHub() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="section-shell text-center">
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                Resources
              </span>
              <h1 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
                Guides, updates, and plain-language explainers.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Practical write-ups on GST, tax, compliance and cross-border bookkeeping — no
                jargon, just what you actually need to know.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-shell py-16 lg:py-20">
          <Reveal>
            <Link
              to="/resources/blogs"
              className="group grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-teal sm:grid-cols-[auto_1fr_auto] sm:items-center"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-teal-soft text-teal">
                <BookOpen className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-xl font-bold text-navy">Blogs</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Articles on GST filing, compliance deadlines, and what to expect when
                  outsourcing your bookkeeping.
                </span>
              </span>
              <span className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-teal transition-transform group-hover:translate-x-1 sm:flex">
                Browse blogs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
