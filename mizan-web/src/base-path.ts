/**
 * GitHub Pages serves this repo as a project site at
 * `<username>.github.io/Mizan/`, not the domain root — every absolute
 * asset/route reference needs this prefix. next/link, next/image, and
 * next-intl's Link all pick up next.config.ts's `basePath` automatically;
 * this constant exists only for the handful of places that reference a
 * public/ asset directly (e.g. a plain <video><source>) and bypass that.
 */
export const BASE_PATH = "/Mizan";
