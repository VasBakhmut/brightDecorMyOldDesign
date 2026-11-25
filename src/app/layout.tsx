import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd } from "@/components/json-ld";
import { businessSchema } from "@/lib/seo";
const url = process.env.SITE_URL || "https://www.brightdecor.com.au";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Bright Decor | Residential & Commercial Painters Brisbane",
  description:
    "Professional painting and property maintenance in Brisbane. Over 20 years of experience. Residential, commercial and body corporate painting. Get a free quote from Max.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Bright Decor",
    title: "A brighter outlook. A beautiful finish.",
    description:
      "Painting & property maintenance in Brisbane. Thoughtful preparation, personal service and over 20 years of experience.",
    images: [
      {
        url: "/images/hero.webp",
        width: 1920,
        height: 1080,
        alt: "A home painted by Bright Decor",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};
export const viewport: Viewport = { themeColor: "#192b35" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        <JsonLd data={businessSchema} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
