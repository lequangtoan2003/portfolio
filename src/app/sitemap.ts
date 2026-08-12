import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      alternates: {
        languages: {
          vi: `${siteUrl}/`,
          en: `${siteUrl}/en`,
          "x-default": `${siteUrl}/`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      alternates: {
        languages: {
          vi: `${siteUrl}/`,
          en: `${siteUrl}/en`,
          "x-default": `${siteUrl}/`,
        },
      },
    },
  ];
}
