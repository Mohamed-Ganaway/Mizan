# mizan-odoo-leads

Cloudflare Worker that receives the Mizan contact form's submissions and
creates a lead directly in Odoo CRM via JSON-RPC. Exists because the main
site (`mizan-web`) is a static export on GitHub Pages with no server of its
own — this Worker is the only place the Odoo API key is ever held, as an
encrypted secret, so it never ships to a browser.

## One-time setup

```sh
cd odoo-lead-worker
npm install
npx wrangler login          # authorizes this machine against your Cloudflare account
npx wrangler secret put ODOO_API_KEY   # paste the Odoo API key when prompted — not echoed, not stored in shell history
npx wrangler deploy
```

The deploy command prints the Worker's public URL, something like:

```
https://mizan-odoo-leads.<your-subdomain>.workers.dev
```

## Wiring it into the site

1. In the GitHub repo: **Settings → Secrets and variables → Actions → Variables**
   → add a repository variable named `ODOO_LEADS_ENDPOINT` set to that URL.
   (It's a plain variable, not a secret — the URL itself isn't sensitive,
   the Worker enforces validation and CORS on the other end.)
2. For local dev, add the same value to `mizan-web/.env.local`:
   ```
   NEXT_PUBLIC_ODOO_LEADS_ENDPOINT=https://mizan-odoo-leads.<your-subdomain>.workers.dev
   ```

## Config

Non-secret config (Odoo URL, database, username, allowed CORS origin) lives
in `wrangler.toml` and is fine to commit. Only `ODOO_API_KEY` is a secret.

If the Odoo instance, database, or the site's deployed origin ever changes,
update `wrangler.toml` and redeploy with `npx wrangler deploy`.
