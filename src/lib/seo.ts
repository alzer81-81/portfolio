import type { Metadata } from "next";

export const siteConfig = {
  name: "Al Power",
  title: "Al Power | Product, Brand & Systems Designer",
  description:
    "Portfolio site for Al Power, an Irish multidisciplinary designer shaping products, brands, systems, and illustration work.",
  url: "https://alpower.design",
  locale: "en_IE",
  email: "alpower242@gmail.com",
  themeColor: "#ffffff",
  socialLinks: [
    "https://www.linkedin.com/in/alpower81",
    "https://www.behance.net/AlPower",
    "https://dribbble.com/alzer81",
  ],
} as const;

const defaultOpenGraphImage = {
  url: "/opengraph.png",
  width: 1200,
  height: 630,
  alt: "Al Power portfolio Open Graph preview",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOpenGraphImage.url],
    },
  };
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en-IE",
  author: {
    "@type": "Person",
    name: siteConfig.name,
  },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Product, Brand & Systems Designer",
  description: siteConfig.description,
  image: absoluteUrl("/opengraph.png"),
  sameAs: siteConfig.socialLinks,
  knowsAbout: [
    "Product design",
    "Brand systems",
    "Design systems",
    "Illustration",
    "Interface design",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Independent",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IE",
  },
};
