import type { Metadata } from "next";

// A route group, not a URL segment — this exists solely so the bare "/"
// route (page.tsx below) can have its own independent root <html>, separate
// from src/app/[locale]/layout.tsx's. Next.js requires exactly one <html>
// per root layout tree; without this separation, having a plain
// src/app/layout.tsx sitting above [locale] made [locale]/layout.tsx's own
// <html lang dir> a *nested* (invalid, silently-conflicting) tag instead of
// its own root — which was the actual cause of dir/lang staying stuck on
// "ar"/"rtl" for every locale. See route-groups.md's "multiple root
// layouts" guidance: no top-level layout.js, and "/" lives inside a group.
export const metadata: Metadata = {
  title: "Mizan Consulting & Training",
};

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
