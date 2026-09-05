import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdminSession } from "./admin-auth.server";
import { getSupabaseAdmin, getSupabasePublic } from "./supabase.server";

export const SETTINGS_KEYS = {
  announcementEnabled: "announcement_enabled",
  announcementText: "announcement_text",
  announcementLinkLabel: "announcement_link_label",
  announcementLinkHref: "announcement_link_href",
} as const;

type SettingsMap = Record<string, string>;

async function toSettingsMap(rows: { key: string; value: string }[]): Promise<SettingsMap> {
  const map: SettingsMap = {};
  for (const row of rows) map[row.key] = row.value;
  return map;
}

export const fetchAllSettingsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await getSupabaseAdmin().from("site_settings").select("key, value");
  if (error) throw new Error(error.message);
  return toSettingsMap(data ?? []);
});

export const updateSettingsAdmin = createServerFn({ method: "POST" })
  .validator(z.record(z.string(), z.string()))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const rows = Object.entries(data).map(([key, value]) => ({ key, value }));
    if (rows.length === 0) return { ok: true as const };
    const { error } = await getSupabaseAdmin().from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Public, RLS-gated (read-only) — used by the AnnouncementBar SSR loader. */
export const fetchPublicSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await getSupabasePublic().from("site_settings").select("key, value");
  if (error) throw new Error(error.message);
  return toSettingsMap(data ?? []);
});
