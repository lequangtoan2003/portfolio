import type { Metadata } from "next";
import "../globals.css";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hello world | Portfolio",
  description: "Trang khởi tạo portfolio cá nhân.",
  alternates: {
    canonical: "/",
    languages: {
      vi: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default function ViRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
