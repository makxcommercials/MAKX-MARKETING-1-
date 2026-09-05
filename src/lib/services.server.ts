import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdminSession } from "./admin-auth.server";
import { getSupabaseAdmin, getSupabasePublic } from "./supabase.server";
import { SERVICE_ICON_KEYS } from "@/components/site/service-icons";

export type ServiceRecord = {
  id: string;
  category: string;
  category_blurb: string;
  icon: string;
  title: string;
  body: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

/** Public, RLS-gated — used by the /marketing SSR loader. Active rows only, in display order. */
export const fetchPublicServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await getSupabasePublic()
    .from("marketing_services")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRecord[];
});

export const fetchAllServicesAdmin = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await getSupabaseAdmin()
    .from("marketing_services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRecord[];
});

const serviceSchema = z.object({
  category: z.string().trim().min(1, "Category is required").max(80),
  category_blurb: z.string().trim().max(200).optional().default(""),
  icon: z.enum(SERVICE_ICON_KEYS as [string, ...string[]]),
  title: z.string().trim().min(1, "Title is required").max(120),
  body: z.string().trim().min(1, "Description is required").max(300),
  sort_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const createServiceAdmin = createServerFn({ method: "POST" })
  .validator(serviceSchema)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await getSupabaseAdmin().from("marketing_services").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const updateServiceAdmin = createServerFn({ method: "POST" })
  .validator(serviceSchema.partial().extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id, ...rest } = data;
    // Same exactOptionalPropertyTypes issue as inquiries.server.ts — drop
    // undefined keys before handing the patch to supabase-js.
    const patch = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
    const { error } = await getSupabaseAdmin()
      .from("marketing_services")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteServiceAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await getSupabaseAdmin()
      .from("marketing_services")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
