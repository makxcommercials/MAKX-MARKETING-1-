import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { fetchAllSettingsAdmin, updateSettingsAdmin, SETTINGS_KEYS } from "@/lib/settings.server";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-teal focus:ring-2 focus:ring-teal/20";

export function SettingsManager() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [enabled, setEnabled] = useState(false);
  const [text, setText] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkHref, setLinkHref] = useState("");

  useEffect(() => {
    fetchAllSettingsAdmin()
      .then((settings) => {
        setEnabled(settings[SETTINGS_KEYS.announcementEnabled] === "true");
        setText(settings[SETTINGS_KEYS.announcementText] ?? "");
        setLinkLabel(settings[SETTINGS_KEYS.announcementLinkLabel] ?? "");
        setLinkHref(settings[SETTINGS_KEYS.announcementLinkHref] ?? "");
      })
      .catch((error) => setLoadError(error instanceof Error ? error.message : "Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await updateSettingsAdmin({
        data: {
          [SETTINGS_KEYS.announcementEnabled]: String(enabled),
          [SETTINGS_KEYS.announcementText]: text,
          [SETTINGS_KEYS.announcementLinkLabel]: linkLabel,
          [SETTINGS_KEYS.announcementLinkHref]: linkHref,
        },
      });
      setSaved(true);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading settings…
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">Site Settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Currently wired: the announcement bar shown at the top of every page. More fields (hero
        text, contact details) can be added the same way — this is deliberately scoped rather than
        a full page-builder.
      </p>

      {loadError && <p className="mt-4 text-sm font-medium text-red-600">{loadError}</p>}

      <div className="mt-6 max-w-xl rounded-xl border border-border bg-card p-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-input accent-teal"
          />
          <span className="text-sm font-medium text-navy">Show announcement bar</span>
        </label>

        <div className="mt-5 grid gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Message
            </label>
            <input
              className={inputClass}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="We're now offering GST filing for e-commerce sellers."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Link label (optional)
              </label>
              <input
                className={inputClass}
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                placeholder="Learn more"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Link URL (optional)
              </label>
              <input
                className={inputClass}
                value={linkHref}
                onChange={(e) => setLinkHref(e.target.value)}
                placeholder="/resources/blogs"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-teal disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save settings
          </button>
          {saved && <span className="text-sm font-medium text-teal">Saved.</span>}
        </div>
      </div>
    </div>
  );
}
