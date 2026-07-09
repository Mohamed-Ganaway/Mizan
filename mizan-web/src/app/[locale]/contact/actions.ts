"use server";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";

/**
 * Phase 1: validates and logs the lead server-side.
 * Swap point for later phases: forward `data` to the Odoo CRM lead-creation
 * endpoint (or an email provider) behind this same signature — no caller changes.
 */
export async function submitContact(data: ContactInput) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "invalid" };
  }

  console.log("[contact] new lead", parsed.data);

  return { ok: true as const };
}
