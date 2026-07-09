import { contactSchema, type ContactInput } from "@/lib/contact-schema";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Static export has no server, so this runs entirely in the browser.
 * Web3Forms is designed for exactly that — its access key is meant to ship
 * in client bundles (unlike a normal API secret) and accepts direct
 * cross-origin POSTs, emailing the lead to whoever owns the key.
 */
export async function submitContact(data: ContactInput) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "invalid" as const };
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    console.error("[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set — form cannot submit.");
    return { ok: false as const, error: "config" as const };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry from ${parsed.data.name} — Mizan website`,
        ...parsed.data,
      }),
    });
    const json = await res.json();
    return json.success
      ? { ok: true as const }
      : { ok: false as const, error: "submit" as const };
  } catch {
    return { ok: false as const, error: "network" as const };
  }
}
