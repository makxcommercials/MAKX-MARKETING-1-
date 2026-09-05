import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Reveal } from "@/components/site/Reveal";
import { fetchPublishedBlogBySlug } from "@/lib/blogs.server";

export const Route = createFileRoute("/resources/blogs/$slug")({
  component: BlogDetail,
  loader: async ({ params }) => {
    const blog = await fetchPublishedBlogBySlug({ data: { slug: params.slug } });
    if (!blog) throw notFound();
    return blog;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — MAKX Commercials` },
          { name: "description", content: loaderData.excerpt ?? undefined },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/resources/blogs/${loaderData.slug}` }] : [],
  }),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function BlogDetail() {
  const blog = Route.useLoaderData();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <article className="pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="section-shell max-w-3xl">
            <Reveal>
              <Link
                to="/resources/blogs"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                All blogs
              </Link>

              {blog.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-teal-soft px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-teal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.2] text-navy sm:text-4xl">
                {blog.title}
              </h1>

              <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {formatDate(blog.created_at)}
              </div>

              {blog.cover_image_url && (
                <img
                  src={blog.cover_image_url}
                  alt=""
                  className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
                />
              )}

              {/* Content is HTML sanitized server-side at save time (see
                  sanitizeBlogHtml in blogs.server.ts) before it ever reaches
                  the database, so it's safe to render directly here. */}
              <div
                className="prose-content mt-10 max-w-none text-base leading-relaxed text-foreground [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-2 [&_blockquote]:border-teal [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy [&_img]:my-6 [&_img]:rounded-xl [&_li]:ml-5 [&_ol]:list-decimal [&_p]:my-4 [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </Reveal>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
