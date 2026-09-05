import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => /^(?:\+91|0)?[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  service: z.string().trim().min(2, "Please select a service"),
  message: z.string().trim().max(1500, "Message is too long").optional().default(""),
  // Honeypot — must stay empty
  company: z.string().max(0).optional().default(""),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
