/**
 * GitHub Pages serves this repo as a project site at
 * `<username>.github.io/Mizan/`, not the domain root — every absolute
 * asset/route reference needs this prefix there. Cloudflare serves the same
 * static export at its own domain root, where no prefix is wanted. The
 * GitHub Pages workflow sets NEXT_PUBLIC_DEPLOY_TARGET=github-pages; it's
 * unset (falls through to "") for the Cloudflare build. Must be the
 * NEXT_PUBLIC_ form (not a plain env var) because this value also needs to
 * resolve correctly inside client components, which only get NEXT_PUBLIC_
 * vars inlined into their bundle.
 *
 * next/link, next/image, and next-intl's Link all pick up next.config.ts's
 * `basePath` automatically; this constant exists only for the handful of
 * places that reference a public/ asset directly (e.g. a plain
 * <video><source>) and bypass that.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages" ? "/Mizan" : "";
