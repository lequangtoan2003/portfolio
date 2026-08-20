import type { Metadata } from "next";
import "../globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { DeviceModeMarker } from "@/components/DeviceModeMarker";
import { contentFont, headingFont } from "@/app/fonts";
import { portfolioContent } from "@/content/portfolio";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const content = portfolioContent.vi;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: content.seo.title,
  description: content.seo.description,
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
    <html lang="vi" className={`${contentFont.variable} ${headingFont.variable}`}>
      <body>
        <DeviceModeMarker />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
