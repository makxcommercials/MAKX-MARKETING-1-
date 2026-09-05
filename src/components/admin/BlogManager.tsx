import { useEffect, useState, type ChangeEvent } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ArrowLeft,
  ImagePlus,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  fetchAllBlogsAdmin,
  createBlogAdmin,
  updateBlogAdmin,
  deleteBlogAdmin,
  uploadBlogImageAdmin,
  type BlogRecord,
} from "@/lib/blogs.server";
import { slugify } from "@/lib/slug";
import { RichTextEditor } from "@/components/site/RichTextEditor";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-teal focus:ring-2 focus:ring-teal/20";

type FormState = {
  id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tagsText: string;
  published: boolean;
};

const emptyForm: FormState = {
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  tagsText: "",
  published: false,
};

export function BlogManager() {
  const [view, setView] = useState<"list" | "edit">("list");
  const [blogs, setBlogs] = useState<BlogRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  async function loadBlogs() {
    setLoadError(null);
    try {
      const data = await fetchAllBlogsAdmin();
      setBlogs(data);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load blogs.");
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  function openNew() {
    setForm(emptyForm);
    setSlugTouched(false);
    setSaveError(null);
    setView("edit");
  }

  function openEdit(blog: BlogRecord) {
    setForm({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt ?? "",
      content: blog.content,
      coverImageUrl: blog.cover_image_url ?? "",
      tagsText: (blog.tags ?? []).join(", "),
      published: blog.published,
    });
    setSlugTouched(true);
    setSaveError(null);
    setView("edit");
  }

  async function handleDelete(blog: BlogRecord) {
    if (!window.confirm(`Delete "${blog.title}"? This can't be undone.`)) return;
    try {
      await deleteBlogAdmin({ data: { id: blog.id } });
      await loadBlogs();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Failed to delete blog.");
    }
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: slugTouched ? f.slug : slugify(title),
    }));
  }

  async function handleCoverPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      window.alert("Image is too large (max 5MB).");
      return;
    }
    setUploadingCover(true);
    try {
      const base64Data = await fileToBase64(file);
      const result = await uploadBlogImageAdmin({
        data: { fileName: file.name, contentType: file.type, base64Data },
      });
      setForm((f) => ({ ...f, coverImageUrl: result.url }));
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Cover image upload failed.");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleSave(publish: boolean | null) {
    setSaving(true);
    setSaveError(null);
    try {
      const tags = form.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        coverImageUrl: form.coverImageUrl || null,
        tags,
        published: publish === null ? form.published : publish,
      };

      if (form.id) {
        await updateBlogAdmin({ data: { id: form.id, ...payload } });
      } else {
        await createBlogAdmin({ data: payload });
      }
      await loadBlogs();
      setView("list");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save blog.");
    } finally {
      setSaving(false);
    }
  }

  if (view === "edit") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setView("list")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all blogs
        </button>

        <h2 className="font-display text-xl font-bold text-navy">
          {form.id ? "Edit Blog" : "New Blog"}
        </h2>

        <div className="mt-6 grid gap-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Title
            </label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="How GST registration actually works for new traders"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Slug (URL)
              </label>
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((f) => ({ ...f, slug: e.target.value }));
                }}
                placeholder="gst-registration-guide"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tags (comma separated)
              </label>
              <input
                className={inputClass}
                value={form.tagsText}
                onChange={(e) => setForm((f) => ({ ...f, tagsText: e.target.value }))}
                placeholder="GST, Compliance"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Excerpt (shown on the blog cards)
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="One or two sentences summarizing the post."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cover image
            </label>
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-32 shrink-0 place-items-center overflow-hidden rounded-xl border border-input bg-muted">
                {form.coverImageUrl ? (
                  <img src={form.coverImageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium text-foreground hover:border-teal hover:text-teal">
                {uploadingCover ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                {form.coverImageUrl ? "Replace image" : "Upload image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverPick} disabled={uploadingCover} />
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Content
            </label>
            <RichTextEditor value={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
          </div>

          {saveError && <p className="text-sm font-medium text-red-600">{saveError}</p>}

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(false)}
              className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-semibold text-foreground hover:border-teal hover:text-teal disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save as draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(true)}
              className="inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-teal disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {form.published ? "Save & keep published" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">Blogs</h2>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-full gradient-teal px-4 py-2 text-sm font-semibold text-white shadow-teal"
        >
          <Plus className="h-4 w-4" />
          New Blog
        </button>
      </div>

      {loadError && <p className="mt-4 text-sm font-medium text-red-600">{loadError}</p>}

      {!blogs ? (
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading blogs…
        </div>
      ) : blogs.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No blogs yet. Create your first one.</p>
      ) : (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex items-center gap-4 bg-card p-4">
              <div className="grid h-12 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted">
                {blog.cover_image_url ? (
                  <img src={blog.cover_image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-navy">{blog.title}</p>
                <p className="truncate text-xs text-muted-foreground">/resources/blogs/{blog.slug}</p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  blog.published ? "bg-teal-soft text-teal" : "bg-muted text-muted-foreground"
                }`}
              >
                {blog.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                {blog.published ? "Published" : "Draft"}
              </span>
              <button
                type="button"
                onClick={() => openEdit(blog)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(blog)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
