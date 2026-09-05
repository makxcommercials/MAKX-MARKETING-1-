import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdminSession } from "./admin-auth.server";
import { getSupabaseAdmin, getSupabasePublic } from "./supabase.server";

export type BlogRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

// ---------------------------------------------------------------------------
// Minimal HTML allowlist sanitizer.
//
// Content only ever comes from the admin editor (single trusted author, not
// public user submissions) and is rendered on the public blog pages, so this
// is a defense-in-depth pass rather than a hardening against untrusted input:
// it strips script-executing tags/attributes so a compromised admin session
// or a buggy editor state can't turn into stored XSS. A real DOM-based
// sanitizer (DOMPurify) needs jsdom on the server, which is a heavy
// dependency for a Cloudflare Worker — this regex allowlist covers the tag
// set the editor actually produces at a fraction of the bundle size.
// ---------------------------------------------------------------------------
const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s",
  "h1", "h2", "h3", "h4",
  "ul", "ol", "li",
  "a", "img", "blockquote", "code", "pre", "span", "div",
]);

export function sanitizeBlogHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|style|iframe|object|embed|form)[^>]*\/?>/gi, "")
    .replace(/<\/?([a-z0-9]+)((?:\s+[a-z0-9-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/gi,
      (match, tagName: string, attrs: string, selfClose: string) => {
        const tag = tagName.toLowerCase();
        if (!ALLOWED_TAGS.has(tag)) return "";
        const cleanedAttrs = (attrs.match(/[a-z0-9-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi) ?? [])
          .filter((attr: string) => {
            const name = (attr.split("=")[0] ?? "").toLowerCase();
            if (name.startsWith("on")) return false; // onclick, onerror, ...
            if (!["href", "src", "alt", "title", "target", "rel", "class"].includes(name)) return false;
            if ((name === "href" || name === "src") && /^\s*javascript:/i.test(attr)) return false;
            return true;
          })
          .join(" ");
        return `<${match.startsWith("</") ? "/" : ""}${tag}${cleanedAttrs ? " " + cleanedAttrs : ""}${selfClose}>`;
      });
}

// ---------------------------------------------------------------------------
// Admin (auth-gated) — writes go through the service-role client, bypassing RLS.
// ---------------------------------------------------------------------------

export const fetchAllBlogsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await getSupabaseAdmin()
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as BlogRecord[];
});

const blogPayloadSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  excerpt: z.string().trim().max(400).optional().default(""),
  content: z.string(),
  coverImageUrl: z.string().url().nullable(),
  tags: z.array(z.string().trim().min(1)).max(20),
  published: z.boolean(),
});

export const createBlogAdmin = createServerFn({ method: "POST" })
  .validator(blogPayloadSchema)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await getSupabaseAdmin().from("blogs").insert({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: sanitizeBlogHtml(data.content),
      cover_image_url: data.coverImageUrl,
      tags: data.tags,
      published: data.published,
    });
    if (error) {
      if (error.code === "23505") throw new Error("A blog with this slug already exists.");
      throw new Error(error.message);
    }
    return { ok: true as const };
  });

const updateBlogSchema = blogPayloadSchema.extend({ id: z.string().uuid() });

export const updateBlogAdmin = createServerFn({ method: "POST" })
  .validator(updateBlogSchema)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await getSupabaseAdmin()
      .from("blogs")
      .update({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: sanitizeBlogHtml(data.content),
        cover_image_url: data.coverImageUrl,
        tags: data.tags,
        published: data.published,
      })
      .eq("id", data.id);
    if (error) {
      if (error.code === "23505") throw new Error("A blog with this slug already exists.");
      throw new Error(error.message);
    }
    return { ok: true as const };
  });

export const deleteBlogAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await getSupabaseAdmin().from("blogs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

const uploadImageSchema = z.object({
  fileName: z.string().trim().min(1),
  contentType: z.string().trim().min(1),
  // A data: URL from FileReader.readAsDataURL, e.g. "data:image/png;base64,AAAA..."
  base64Data: z.string().min(1),
});

export const uploadBlogImageAdmin = createServerFn({ method: "POST" })
  .validator(uploadImageSchema)
  .handler(async ({ data }) => {
    await requireAdminSession();

    if (!data.contentType.startsWith("image/")) {
      throw new Error("Only image uploads are allowed.");
    }

    const commaIndex = data.base64Data.indexOf(",");
    const base64 = commaIndex >= 0 ? data.base64Data.slice(commaIndex + 1) : data.base64Data;

    // atob/Uint8Array decoding is Web-standard and works identically in
    // Cloudflare Workers and Node — no Buffer polyfill needed.
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    // 5MB cap, mirrors the client-side check in the admin UI.
    if (bytes.byteLength > 5 * 1024 * 1024) {
      throw new Error("Image is too large (max 5MB).");
    }

    const ext = data.fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await getSupabaseAdmin()
      .storage.from("blog-images")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);

    const { data: publicUrlData } = getSupabaseAdmin().storage.from("blog-images").getPublicUrl(path);
    return { url: publicUrlData.publicUrl };
  });

// ---------------------------------------------------------------------------
// Public (RLS-gated) — read-only, published blogs only, used by SSR loaders.
// ---------------------------------------------------------------------------

export const fetchPublishedBlogs = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await getSupabasePublic()
    .from("blogs")
    .select("id, slug, title, excerpt, cover_image_url, tags, published, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Omit<BlogRecord, "content">[];
});

export const fetchPublishedBlogBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().trim().min(1) }))
  .handler(async ({ data }) => {
    const { data: blog, error } = await getSupabasePublic()
      .from("blogs")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (blog as BlogRecord) ?? null;
  });
