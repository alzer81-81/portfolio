import type { Metadata, Viewport } from "next";
import { PageTransitionShell } from "@/components/page-transition-shell";
import { PointerTrail } from "@/components/pointer-trail";
import { StandardFooter } from "@/components/standard-footer";
import { personJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Al Power",
    "product designer",
    "brand designer",
    "design systems",
    "illustration portfolio",
    "Ireland designer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico", "/logo.svg"],
    apple: "/logo.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IE" className="h-full">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [websiteJsonLd, personJsonLd],
            }),
          }}
        />
        <PointerTrail />
        <PageTransitionShell>
          {children}
          <StandardFooter />
        </PageTransitionShell>
      </body>
    </html>
  );
}
