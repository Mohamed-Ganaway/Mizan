"use client";

import { useEffect } from "react";
import { routing } from "@/i18n/routing";
import { BASE_PATH } from "@/base-path";

const target = `${BASE_PATH}/${routing.defaultLocale}/`;

/**
 * Static export has no server to run locale-detection middleware (that was
 * next-intl's proxy.ts, which only works on a real Next.js server) — so the
 * bare "/" that GitHub Pages serves as the site's entry point just forwards
 * to the default locale on the client. Anyone navigating within the site
 * always lands on an already-prefixed /ar/... or /en/... route; this page
 * only matters for someone hitting the domain root directly.
 */
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(target);
  }, []);

  return (
    <p style={{ fontFamily: "sans-serif", padding: "3rem", textAlign: "center" }}>
      <a href={target}>Continue to Mizan Consulting &amp; Training →</a>
    </p>
  );
}
