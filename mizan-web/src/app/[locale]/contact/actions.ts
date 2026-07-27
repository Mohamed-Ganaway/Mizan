import { contactSchema, type ContactInput } from "@/lib/contact-schema";

/**
 * Static export has no server, so this runs entirely in the browser. The
 * form POSTs straight to a Cloudflare Worker (see /odoo-lead-worker) that
 * holds the real Odoo credentials as encrypted secrets and creates the CRM
 * lead server-side — those credentials never ship in this client bundle.
 */
export async function submitContact(data: ContactInput) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "invalid" as const };
  }

  const endpoint = process.env.NEXT_PUBLIC_ODOO_LEADS_ENDPOINT;
  if (!endpoint) {
    console.error("[contact] NEXT_PUBLIC_ODOO_LEADS_ENDPOINT is not set — form cannot submit.");
    return { ok: false as const, error: "config" as const };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const json = await res.json();
    return json.success
      ? { ok: true as const }
      : { ok: false as const, error: "submit" as const };
  } catch {
    return { ok: false as const, error: "network" as const };
  }
}
