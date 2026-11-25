import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    ...servicePages.map((s) => `/services/${s.slug}`),
    "/privacy",
    "/terms",
    "/cookies",
    "/accessibility",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path.startsWith("/services") ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.2,
  }));
}
