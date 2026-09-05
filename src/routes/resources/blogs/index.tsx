import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ImageOff } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { fetchPublishedBlogs } from "@/lib/blogs.server";

const TITLE = "Blogs — Resources — MAKX Commercials";
const DESCRIPTION =
  "Articles on GST filing, compliance deadlines, and outsourced bookkeeping from MAKX Commercials.";

export const Route = createFileRoute("/resources/blogs/")({
  component: BlogsListing,
  loader: async () => fetchPublishedBlogs(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/resources/blogs" }],
  }),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function BlogsListing() {
  const blogs = Route.useLoaderData();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden gradient-hero pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="section-shell text-center">
            <Reveal className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                Resources / Blogs
              </span>
              <h1 className="mt-6 font-display text-[2rem] font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
                From the MAKX Commercials team.
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="section-shell py-16 lg:py-20">
          {blogs.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, i) => (
                <Reveal key={blog.id} delay={i * 60}>
                  <Link
                    to="/resources/blogs/$slug"
                    params={{ slug: blog.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-teal"
                  >
                    <div className="grid h-44 place-items-center overflow-hidden bg-muted">
                      {blog.cover_image_url ? (
                        <img
                          src={blog.cover_image_url}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <ImageOff className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      {blog.tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-teal-soft px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-teal"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-teal">
                        {blog.title}
                      </h2>
                      {blog.excerpt && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {blog.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(blog.created_at)}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
