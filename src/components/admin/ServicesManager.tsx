import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  fetchAllServicesAdmin,
  createServiceAdmin,
  updateServiceAdmin,
  deleteServiceAdmin,
  type ServiceRecord,
} from "@/lib/services.server";
import { getServiceIcon, SERVICE_ICON_KEYS } from "@/components/site/service-icons";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-teal focus:ring-2 focus:ring-teal/20";

type FormState = {
  id: string | null;
  category: string;
  category_blurb: string;
  icon: string;
  title: string;
  body: string;
  sort_order: number;
  active: boolean;
};

const emptyForm: FormState = {
  id: null,
  category: "",
  category_blurb: "",
  icon: SERVICE_ICON_KEYS[0] ?? "Globe2",
  title: "",
  body: "",
  sort_order: 0,
  active: true,
};

export function ServicesManager() {
  const [view, setView] = useState<"list" | "edit">("list");
  const [services, setServices] = useState<ServiceRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function load() {
    setLoadError(null);
    try {
      setServices(await fetchAllServicesAdmin());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load services.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function startCreate() {
    setForm({ ...emptyForm, sort_order: (services?.length ?? 0) + 1 });
    setSaveError(null);
    setView("edit");
  }

  function startEdit(service: ServiceRecord) {
    setForm({
      id: service.id,
      category: service.category,
      category_blurb: service.category_blurb,
      icon: service.icon,
      title: service.title,
      body: service.body,
      sort_order: service.sort_order,
      active: service.active,
    });
    setSaveError(null);
    setView("edit");
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const payload = {
        category: form.category,
        category_blurb: form.category_blurb,
        icon: form.icon,
        title: form.title,
        body: form.body,
        sort_order: form.sort_order,
        active: form.active,
      };
      if (form.id) {
        await updateServiceAdmin({ data: { id: form.id, ...payload } });
      } else {
        await createServiceAdmin({ data: payload });
      }
      toast.success(form.id ? "Service updated." : "Service created.");
      setView("list");
      await load();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save service.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: ServiceRecord) {
    if (!window.confirm(`Delete "${service.title}"? This can't be undone.`)) return;
    try {
      await deleteServiceAdmin({ data: { id: service.id } });
      setServices((prev) => prev?.filter((s) => s.id !== service.id) ?? prev);
      toast.success("Service deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete service.");
    }
  }

  async function toggleActive(service: ServiceRecord) {
    setServices(
      (prev) => prev?.map((s) => (s.id === service.id ? { ...s, active: !s.active } : s)) ?? prev,
    );
    try {
      await updateServiceAdmin({ data: { id: service.id, active: !service.active } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update service.");
      void load();
    }
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {loadError} — has <code>supabase_migration_003_marketing_services.sql</code> been run yet?{" "}
        <button type="button" onClick={() => void load()} className="font-semibold underline">
          Retry
        </button>
      </div>
    );
  }

  if (!services) {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading services…
      </div>
    );
  }

  if (view === "edit") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setView("list")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to services
        </button>

        <h2 className="font-display text-lg font-bold text-navy">
          {form.id ? "Edit Service" : "New Service"}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Category
            </label>
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="e.g. Digital & Social"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Order (lower shows first)
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Category tagline
            </label>
            <input
              value={form.category_blurb}
              onChange={(e) => setForm((f) => ({ ...f, category_blurb: e.target.value }))}
              placeholder="Shown once per category group"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              One-line description
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={2}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Icon
            </label>
            <select
              value={form.icon}
              onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              className={inputClass}
            >
              {SERVICE_ICON_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              Visible on the Marketing page
            </label>
          </div>
        </div>

        {saveError && <p className="mt-4 text-sm font-medium text-red-600">{saveError}</p>}

        <button
          type="button"
          disabled={saving || !form.category || !form.title || !form.body}
          onClick={() => void handleSave()}
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-teal disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save service
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-navy">Marketing Services</h2>
          <p className="text-sm text-muted-foreground">Powers the service cards on /marketing.</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 rounded-full gradient-teal px-4 py-2 text-sm font-semibold text-white shadow-teal"
        >
          <Plus className="h-4 w-4" /> Add service
        </button>
      </div>

      {services.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No services yet — run <code>supabase_migration_003_marketing_services.sql</code> to seed
          the ones already shown on the live page, or add your own.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-border">
          {services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <li key={service.id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-butter text-flame">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">{service.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {service.category} · order {service.sort_order}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => void toggleActive(service)}
                    title={service.active ? "Hide from Marketing page" : "Show on Marketing page"}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {service.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(service)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(service)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
