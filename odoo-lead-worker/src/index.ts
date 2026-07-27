export interface Env {
  ODOO_URL: string;
  ODOO_DB: string;
  ODOO_USERNAME: string;
  ODOO_API_KEY: string;
  ALLOWED_ORIGINS: string;
}

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    const requestOrigin = request.headers.get("Origin") ?? "";
    const cors = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return json({ success: false, error: "method" }, 405, cors);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ success: false, error: "invalid_json" }, 400, cors);
    }

    const lead = validate(body);
    if (!lead) {
      return json({ success: false, error: "invalid" }, 400, cors);
    }

    try {
      const uid = await odooCall(env, "common", "authenticate", [
        env.ODOO_DB,
        env.ODOO_USERNAME,
        env.ODOO_API_KEY,
        {},
      ]);
      if (!uid) {
        console.error("[odoo] authentication rejected");
        return json({ success: false, error: "auth" }, 502, cors);
      }

      const description = [lead.service ? `Service: ${lead.service}` : null, lead.message]
        .filter(Boolean)
        .join("\n\n");

      const leadId = await odooCall(env, "object", "execute_kw", [
        env.ODOO_DB,
        uid,
        env.ODOO_API_KEY,
        "crm.lead",
        "create",
        [
          {
            name: `Website enquiry — ${lead.name}`,
            contact_name: lead.name,
            email_from: lead.email,
            phone: lead.phone || false,
            partner_name: lead.company || false,
            description,
          },
        ],
      ]);

      if (!leadId) {
        console.error("[odoo] lead creation returned no id");
        return json({ success: false, error: "create" }, 502, cors);
      }

      return json({ success: true }, 200, cors);
    } catch (err) {
      console.error("[odoo] request failed", err);
      return json({ success: false, error: "network" }, 502, cors);
    }
  },
};

function validate(body: unknown): LeadPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : undefined;
  const company = typeof b.company === "string" ? b.company.trim() : undefined;
  const service = typeof b.service === "string" ? b.service.trim() : undefined;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !isValidEmail || message.length < 5) return null;

  return { name, email, message, phone, company, service };
}

async function odooCall(env: Env, service: string, method: string, args: unknown[]) {
  const res = await fetch(`${env.ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Math.floor(Math.random() * 1_000_000_000),
    }),
  });
  const payload = (await res.json()) as { result?: unknown; error?: unknown };
  if (payload.error) {
    throw new Error(JSON.stringify(payload.error));
  }
  return payload.result;
}

function json(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
