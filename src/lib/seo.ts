import type { Metadata } from "next";
export const siteUrl = (
  process.env.SITE_URL || "https://www.brightdecor.com.au"
).replace(/\/$/, "");
export const businessId = `${siteUrl}/#business`;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/hero.webp",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_AU",
      siteName: "Bright Decor",
      images: [
        { url: image, alt: "Bright Decor painting and property maintenance" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  "@id": businessId,
  name: "Bright Decor",
  url: siteUrl,
  telephone: "+61420750595",
  email: "max@brightdecor.com.au",
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/brand-logo.png`,
    width: 600,
    height: 600,
  },
  image: `${siteUrl}/images/hero.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "140 The Avenue",
    addressLocality: "Sunnybank Hills",
    addressRegion: "QLD",
    postalCode: "4109",
    addressCountry: "AU",
  },
  areaServed: { "@type": "City", name: "Brisbane" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
