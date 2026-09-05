import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdminSession } from "./admin-auth.server";
import { getSupabaseAdmin, getSupabasePublic } from "./supabase.server";

export const INQUIRY_STATUSES = ["new", "read", "contacted", "archived"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export type InquiryRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  enquiry_type: string | null;
  message: string;
  source: string;
  status: InquiryStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const submitSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(30).optional().default(""),
  enquiry_type: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1, "Please enter a message").max(2000),
  source: z.string().trim().max(60).optional().default("contact_page"),
  // Honeypot — must stay empty. Bots fill every field; real users never see it.
  company: z.string().max(0).optional().default(""),
});

/**
 * Public — called from the contact form (and, later, any other lead form)
 * using the anon key. Relies entirely on the `contact_inquiries` RLS policy
 * (insert-only for anon) rather than admin auth, same trust model as the
 * public blogs read path in blogs.server.ts.
 */
export const submitInquiry = createServerFn({ method: "POST" })
  .validator(submitSchema)
  .handler(async ({ data }) => {
    const { error } = await getSupabasePublic()
      .from("contact_inquiries")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        enquiry_type: data.enquiry_type || null,
        message: data.message,
        source: data.source || "contact_page",
      });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const fetchInquiriesAdmin = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await getSupabaseAdmin()
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as InquiryRecord[];
});

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(INQUIRY_STATUSES).optional(),
  notes: z.string().max(4000).optional(),
});

export const updateInquiryAdmin = createServerFn({ method: "POST" })
  .validator(updateSchema)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { id, ...rest } = data;
    // exactOptionalPropertyTypes means zod's `.optional()` fields come through
    // as `T | undefined`, which supabase-js's update() rejects outright —
    // strip anything left undefined so only fields actually being changed go through.
    const patch = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
    const { error } = await getSupabaseAdmin()
      .from("contact_inquiries")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteInquiryAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await getSupabaseAdmin().from("contact_inquiries").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
