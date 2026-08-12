import type { Metadata } from "next";
import "../globals.css";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hello world | Portfolio",
  description: "Initial personal portfolio setup page.",
  alternates: {
    canonical: "/en",
    languages: {
      vi: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
