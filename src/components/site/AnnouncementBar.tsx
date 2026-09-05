import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchPublicSettings } from "@/lib/settings.server";
import { SETTINGS_KEYS } from "@/lib/settings.server";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [settings, setSettings] = useState<{
    enabled: boolean;
    text: string;
    linkLabel: string;
    linkHref: string;
  } | null>(null);

  useEffect(() => {
    fetchPublicSettings()
      .then((data) => {
        setSettings({
          enabled: data[SETTINGS_KEYS.announcementEnabled] === "true",
          text: data[SETTINGS_KEYS.announcementText] ?? "",
          linkLabel: data[SETTINGS_KEYS.announcementLinkLabel] ?? "",
          linkHref: data[SETTINGS_KEYS.announcementLinkHref] ?? "",
        });
      })
      .catch(() => setSettings(null));
  }, []);

  if (!settings || !settings.enabled || !settings.text || dismissed) return null;

  return (
    <div className="relative z-[60] flex items-center justify-center gap-3 bg-navy px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <span className="truncate">
        {settings.text}
        {settings.linkLabel && settings.linkHref && (
          <a href={settings.linkHref} className="ml-2 underline underline-offset-2 hover:text-teal-soft">
            {settings.linkLabel}
          </a>
        )}
      </span>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute right-3 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
