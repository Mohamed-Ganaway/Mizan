import type { Metadata } from "next";

// Only reached by the bare "/" route (outside the [locale] segment), which
// exists purely to redirect to the default locale — see page.tsx. Everything
// else in the app is rendered through src/app/[locale]/layout.tsx instead.
export const metadata: Metadata = {
  title: "Mizan Consulting & Training",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
