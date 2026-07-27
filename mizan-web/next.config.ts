import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./src/base-path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Both GitHub Pages and Cloudflare (static-assets Worker) serve this as
  // plain static files — no Node server, no proxy/middleware, no server
  // actions, no on-demand image optimization. This produces a plain `out/`
  // folder of HTML/CSS/JS instead.
  output: "export",
  // Empty on Cloudflare (served at its own domain root); "/Mizan" on GitHub
  // Pages, which serves this as <username>.github.io/Mizan/. See base-path.ts.
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  // GitHub Pages resolves `/about/` to `/about/index.html` (standard static
  // file server behavior) but has no way to rewrite extension-less `/about`
  // to `about.html`, which is what Next emits without this.
  trailingSlash: true,
  images: {
    // The default loader needs a running server to resize/convert images on
    // request; static export can't provide one, so ship originals as-is.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
