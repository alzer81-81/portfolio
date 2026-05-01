import type { Metadata } from "next";
import Image from "next/image";
import { HomepageNav } from "@/components/homepage-nav";
import { HomepageToneController } from "@/components/homepage-tone-controller";
import { ProjectCarousel } from "@/components/project-carousel";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

const typingSlides = [
  {
    src: "/typing1.png",
    alt: "Typing.com teacher portal dashboard slide one",
  },
  {
    src: "/typing2.png",
    alt: "Typing.com teacher portal dashboard slide two",
  },
  {
    src: "/typing3.png",
    alt: "Typing.com teacher portal dashboard slide three",
  },
  {
    src: "/typing4.png",
    alt: "Typing.com teacher portal dashboard slide four",
  },
  {
    src: "/typing5.png",
    alt: "Typing.com teacher portal dashboard slide five",
  },
  {
    src: "/typing6.png",
    alt: "Typing.com teacher portal dashboard slide six",
  },
];

const shortcutSlides = [
  {
    src: "/shortcut1.png",
    alt: "Shortcut brand and product slide one",
  },
  {
    src: "/shortcut2.png",
    alt: "Shortcut brand and product slide two",
  },
  {
    src: "/shortcut3.png",
    alt: "Shortcut brand and product slide three",
  },
  {
    src: "/shortcut4.png",
    alt: "Shortcut brand and product slide four",
  },
  {
    src: "/shortcut5.png",
    alt: "Shortcut brand and product slide five",
  },
  {
    src: "/shortcut6.png",
    alt: "Shortcut brand and product slide six",
  },
];

const ryanairSlides = [
  {
    src: "/ryanair1.png",
    alt: "Ryanair website redesign slide one",
  },
  {
    src: "/Ryanair2.png",
    alt: "Ryanair website redesign slide two",
  },
  {
    src: "/Ryanair3.png",
    alt: "Ryanair website redesign slide three",
  },
  {
    src: "/Ryanair4.png",
    alt: "Ryanair website redesign slide four",
  },
  {
    src: "/Ryanair5.png",
    alt: "Ryanair website redesign slide five",
  },
  {
    src: "/Ryanair6.png",
    alt: "Ryanair website redesign slide six",
  },
];

const qstreamSlides = [
  {
    src: "/qstream1.png",
    alt: "Qstream product and brand slide one",
  },
  {
    src: "/qstream2.png",
    alt: "Qstream product and brand slide two",
  },
  {
    src: "/qstream3.png",
    alt: "Qstream product and brand slide three",
  },
  {
    src: "/qstream4.png",
    alt: "Qstream product and brand slide four",
  },
  {
    src: "/qstream5.png",
    alt: "Qstream product and brand slide five",
  },
];

const privatevpnSlides = [
  {
    src: "/private1.png",
    alt: "PrivateVPN product and brand slide one",
  },
  {
    src: "/private2.png",
    alt: "PrivateVPN product and brand slide two",
  },
  {
    src: "/private3.png",
    alt: "PrivateVPN product and brand slide three",
  },
  {
    src: "/private4.png",
    alt: "PrivateVPN product and brand slide four",
  },
  {
    src: "/private5.png",
    alt: "PrivateVPN product and brand slide five",
  },
];

const onsecuritySlides = [
  {
    src: "/onsecurity1.png",
    alt: "OnSecurity product and brand slide one",
  },
  {
    src: "/onsecurity2.png",
    alt: "OnSecurity product and brand slide two",
  },
  {
    src: "/onsecurity3.png",
    alt: "OnSecurity product and brand slide three",
  },
  {
    src: "/onsecurity4.png",
    alt: "OnSecurity product and brand slide four",
  },
  {
    src: "/onsecurity5.png",
    alt: "OnSecurity product and brand slide five",
  },
  {
    src: "/onsecurity6.png",
    alt: "OnSecurity product and brand slide six",
  },
];

const runwaySlides = [
  {
    src: "/Runway1.png",
    alt: "Runway marketing website slide one",
  },
  {
    src: "/Runway2.png",
    alt: "Runway marketing website slide two",
  },
  {
    src: "/Runway3.png",
    alt: "Runway marketing website slide three",
  },
  {
    src: "/Runway4.png",
    alt: "Runway marketing website slide four",
  },
];

const projectSiteLinks = {
  typing: "https://www.typing.com",
  shortcut: "https://www.shortcut.com",
  ryanair: "https://www.ryanair.com",
  qstream: "https://www.qstream.com",
  privatevpn: "https://www.privatevpn.com",
  onsecurity: "https://www.onsecurity.io",
  runway: "https://www.runway.com",
} as const;

const disciplines = [
  {
    index: "01",
    title: "Product Experience",
    body: "Simplifying complex workflows and making products easier to navigate, understand, and use.",
  },
  {
    index: "02",
    title: "Brand Systems",
    body: "Building cohesive visual identities that align product and marketing.",
  },
  {
    index: "03",
    title: "Interface Design",
    body: "Designing clear, structured interfaces that guide attention and improve usability.",
  },
  {
    index: "04",
    title: "Illustration Systems",
    body: "Creating flexible illustration styles that support communication across product and marketing.",
  },
];

const selectedWorkJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected Work",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "CreativeWork",
        name: "Typing.com",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        name: "Shortcut",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "CreativeWork",
        name: "Ryanair",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "CreativeWork",
        name: "Qstream",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "CreativeWork",
        name: "PrivateVPN",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "CreativeWork",
        name: "OnSecurity",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "CreativeWork",
        name: "Runway",
        url: absoluteUrl("/#selected-work"),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
      },
    },
  ],
};

export const metadata: Metadata = createPageMetadata({
  title: "Al Power | Product, Brand & Systems Designer",
  description:
    "Portfolio of Al Power, an Irish multidisciplinary designer working across product design, brand systems, interface design, and illustration.",
  path: "/",
});

export default function Home() {
  return (
    <main className="homepage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(selectedWorkJsonLd) }}
      />
      <HomepageToneController />
      <div className="homepage__inner">
        <HomepageNav />

        <section className="homepage-intro">
          <section className="homepage-hero" data-page-tone="hero">
            <div className="homepage-hero__copy">
              <h1 className="homepage-hero__title">
                <span className="homepage-hero__title-line">
                  Shaping Products,
                </span>
                <span className="homepage-hero__title-line homepage-hero__title-line--with-accent">
                  <span>Brands &amp; Systems</span>
                  <span className="homepage-hero__accent">
                    <a
                      className="homepage-hero__avatar-link"
                      href="https://www.linkedin.com/in/alpower81"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Powered by Al. Visit Al Power on LinkedIn."
                    >
                      <span className="homepage-hero__avatar-chip">
                        Powered by Al <span aria-hidden="true">↗</span>
                      </span>
                      <span className="homepage-hero__avatar">
                        <Image
                          className="homepage-hero__avatar-image homepage-hero__avatar-image--still"
                          src="/avatar1.png"
                          alt=""
                          width={100}
                          height={104}
                          priority
                        />
                        <Image
                          className="homepage-hero__avatar-image homepage-hero__avatar-image--hover"
                          src="/avatar1.gif"
                          alt=""
                          width={100}
                          height={104}
                          unoptimized
                          priority
                        />
                      </span>
                    </a>
                  </span>
                </span>
              </h1>
              <p>
                I&apos;m Al Power, an Irish-based multidisciplinary designer
                shaping products, brands, and digital systems. My work focuses
                on clarity, craft, and solving real problems through considered
                design.
              </p>
            </div>
          </section>

          <section className="homepage-disciplines">
            <div className="homepage-disciplines__grid">
              {disciplines.map((discipline) => (
                <article className="homepage-discipline" key={discipline.index}>
                  <p className="homepage-discipline__index">{discipline.index}</p>
                  <div className="homepage-discipline__body">
                    <h3>{discipline.title}</h3>
                    <p>{discipline.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="homepage-about-preview"
            aria-labelledby="homepage-about-preview-title"
          >
            <div className="homepage-about-preview__divider" aria-hidden="true" />
            <div className="homepage-about-preview__inner">
              <div className="homepage-about-preview__copy">
                <Image
                  className="homepage-about-preview__logo"
                  src="/logo.svg"
                  alt=""
                  aria-hidden="true"
                  width={100}
                  height={100}
                />
                <div className="homepage-about-preview__content">
                  <h2 id="homepage-about-preview-title">
                    Bringing structure and clarity to products that need to make
                    sense fast.
                  </h2>
                  <p className="homepage-about-preview__body">
                    I work across product, brand, and systems with the same
                    goal each time: make the thing clearer, calmer, and more
                    useful for the people relying on it.
                  </p>
                </div>
              </div>

              <div className="homepage-about-preview__visual">
                <div className="homepage-about-preview__image-frame">
                  <Image
                    className="homepage-about-preview__image"
                    src="/assets/about/home_me.png"
                    alt="Alan Power portrait with abstract design system shapes"
                    width={1445}
                    height={1701}
                    sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 46vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </section>

        </section>

        <section className="homepage-projects" id="selected-work">
          <div className="homepage-projects__heading">
            <h2>Selected Work</h2>
          </div>

          <article className="project-feature project-feature--typing" data-page-tone="typing">
            <div className="project-feature__content">
              <div className="project-feature__meta">
                <Image
                  className="project-feature__logo"
                  src="/typing_logo.svg"
                  alt="Typing.com logo"
                  width={164}
                  height={36}
                />
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Lead Product Design</li>
                    <li>Brand Evolution</li>
                    <li>Design System Foundations</li>
                    <li>Webflow Development</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.typing}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story">
                <h3>
                  To evolve the teacher and student portals while modernizing a
                  legacy product that millions rely on.
                </h3>
                <p>
                  I identified key frustrations and opportunities across the
                  platform, then reframed the experience around clarity,
                  motivation, and ease of use. Through iterative design and
                  testing, I delivered a modern interface that supports
                  educators while keeping students engaged.
                </p>
                <p>
                  We built the Teacher Portal dashboards in three simple layers:
                  an at-a-glance teacher overview, a clear view for each class,
                  and focused detail for individual students. Simplicity was the
                  priority at every level, with content designed to be instantly
                  digestible and easy to act on.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--typing">
              <ProjectCarousel slides={typingSlides} />
            </div>
          </article>

          <article className="project-feature project-feature--shortcut" data-page-tone="shortcut">
            <div className="project-feature__content">
              <div className="project-feature__meta project-feature__meta--shortcut">
                <div className="project-feature__brand project-feature__brand--shortcut">
                  <Image
                    className="project-feature__shortcut-logo"
                    src="/shortcut_logo.png"
                    alt="Shortcut logo"
                    width={310}
                    height={78}
                  />
                </div>
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Lead Brand Design</li>
                    <li>Product Design</li>
                    <li>Marketing and Social Coordination</li>
                    <li>Brand System</li>
                    <li>Webflow Development</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.shortcut}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story project-feature__story--shortcut">
                <h3>
                  To evolve Shortcut into a sharper, more cohesive brand system
                  across product, marketing, and the web.
                </h3>
                <p>
                  The goal was to keep the brand consistent across every
                  surface, including design, messaging, and user-facing assets,
                  while ensuring each update still felt cohesive, refined, and
                  true to the direction.
                </p>
                <p>
                  Shortcut rebranded from Clubhouse, rebuilding the identity
                  from the ground up with a new name, logo, illustration style,
                  and website, then rolling it out consistently across product,
                  marketing, and user-facing touchpoints through ongoing
                  iteration.
                </p>
                <p>
                  The website was built and maintained in Webflow, giving us
                  space to evolve the visual system from a cleaner,
                  illustration-heavy approach into a darker, slicker brand
                  direction that felt more mature without losing consistency.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--shortcut">
              <ProjectCarousel slides={shortcutSlides} />
            </div>
          </article>

          <article className="project-feature project-feature--ryanair" data-page-tone="ryanair">
            <div className="project-feature__content">
              <div className="project-feature__meta project-feature__meta--ryanair">
                <div className="project-feature__brand project-feature__brand--ryanair">
                  <Image
                    className="project-feature__ryanair-logo"
                    src="/ryanair_logo.png"
                    alt="Ryanair logo"
                    width={298}
                    height={35}
                  />
                </div>
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Product Design</li>
                    <li>Branding</li>
                    <li>Marketing Design</li>
                    <li>Illustration</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.ryanair}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story project-feature__story--ryanair">
                <h3>
                  To reimagine the digital experience for 100M+ customers while
                  refreshing the product, brand, and booking journey together.
                </h3>
                <p>
                  As Lead UI Designer, I helped scale the design team from one
                  to ten while leading a full desktop, mobile, and brand
                  refresh. The work focused on making the experience feel
                  lighter, clearer, and more enjoyable across every major
                  customer touchpoint.
                </p>
                <p>
                  Over an 18-month rebuild, the site was redesigned from the
                  ground up using a unified design system to simplify complex
                  flows, paired with an illustration-led visual language and a
                  friendlier tone that reshaped how customers felt about the
                  brand.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--ryanair">
              <ProjectCarousel slides={ryanairSlides} />
            </div>
          </article>

          <article className="project-feature project-feature--qstream" data-page-tone="qstream">
            <div className="project-feature__content">
              <div className="project-feature__meta project-feature__meta--qstream">
                <div className="project-feature__brand project-feature__brand--qstream">
                  <Image
                    className="project-feature__qstream-logo"
                    src="/qstream_logo.svg"
                    alt="Qstream logo"
                    width={273}
                    height={66}
                  />
                </div>
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Product Design</li>
                    <li>Branding</li>
                    <li>Illustration</li>
                    <li>Design System</li>
                    <li>Marketing Website</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.qstream}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story project-feature__story--qstream">
                <h3>
                  To lead a full product revamp across content creation,
                  manager workflows, and the individual learner experience,
                  while redefining the brand across every touchpoint.
                </h3>
                <p>
                  Qstream is a micro-learning platform built to help employees
                  retain knowledge through short, focused training. When I
                  joined, the product experience felt inconsistent and the brand
                  lacked a clear visual language across product and marketing.
                </p>
                <p>
                  Over more than two years, I helped shape a much more complete
                  product system, redesigning the platform across content
                  creators, manager insights, and the day-to-day end-user
                  experience so the entire product felt clearer, more usable,
                  and more unified.
                </p>
                <p>
                  Alongside the product revamp, we rebranded Qstream with a new
                  illustration style, a stronger visual system, and a refreshed
                  marketing site, creating a more cohesive identity across the
                  product itself and every customer-facing surface.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--qstream">
              <ProjectCarousel slides={qstreamSlides} />
            </div>
          </article>

          <article
            className="project-feature project-feature--privatevpn"
            data-page-tone="privatevpn"
          >
            <div className="project-feature__content">
              <div className="project-feature__meta project-feature__meta--privatevpn">
                <div className="project-feature__brand project-feature__brand--privatevpn">
                  <Image
                    className="project-feature__privatevpn-logo"
                    src="/privatevpn_logo.webp"
                    alt="PrivateVPN logo"
                    width={328}
                    height={74}
                  />
                </div>
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Product Design</li>
                    <li>Marketing Design</li>
                    <li>Branding</li>
                    <li>Illustration</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.privatevpn}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story project-feature__story--privatevpn">
                <h3>
                  To create a simple, clear VPN product and a more memorable
                  brand in a crowded, highly competitive category.
                </h3>
                <p>
                  PrivateVPN was growing quickly, and the brief spanned both
                  identity and product experience across mobile, iPad, TV, and
                  desktop. The challenge was to make the service feel immediate
                  and easy to trust while still standing apart visually.
                </p>
                <p>
                  The product direction stayed deliberately familiar where user
                  expectations were already well established, allowing the core
                  UX to feel intuitive from the outset while still being refined
                  for each device and context.
                </p>
                <p>
                  Brand became the differentiator. I developed a cleaner visual
                  identity with a custom illustration and icon system that could
                  work across the marketing site, in-product moments, and the
                  broader experience without adding noise.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--privatevpn">
              <ProjectCarousel slides={privatevpnSlides} />
            </div>
          </article>

          <article
            className="project-feature project-feature--onsecurity"
            data-page-tone="onsecurity"
          >
            <div className="project-feature__content">
              <div className="project-feature__meta project-feature__meta--onsecurity">
                <div className="project-feature__brand project-feature__brand--onsecurity">
                  <Image
                    className="project-feature__onsecurity-logo"
                    src="/onsecurity_logo.svg"
                    alt="OnSecurity logo"
                    width={281}
                    height={86}
                  />
                </div>
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Product Design</li>
                    <li>Branding</li>
                    <li>Web Design</li>
                    <li>Illustration</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.onsecurity}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story project-feature__story--onsecurity">
                <h3>
                  To simplify a complex security platform while shaping a more
                  confident brand across product, onboarding, and marketing.
                </h3>
                <p>
                  OnSecurity helps teams track security breaches across digital
                  products from one central dashboard. The brief covered the end
                  to end product experience, onboarding, branding, and online
                  marketing assets.
                </p>
                <p>
                  I simplified the experience by clarifying terminology,
                  restructuring navigation, and introducing a clearer
                  onboarding flow, then extended the system into a sharper
                  abstract brand direction for product and campaign work.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--onsecurity">
              <ProjectCarousel slides={onsecuritySlides} />
            </div>
          </article>

          <article
            className="project-feature project-feature--runway"
            data-page-tone="runway"
          >
            <div className="project-feature__content">
              <div className="project-feature__meta project-feature__meta--runway">
                <div className="project-feature__brand project-feature__brand--runway">
                  <Image
                    className="project-feature__runway-logo"
                    src="/runway_logo.svg"
                    alt="Runway logo"
                    width={800}
                    height={127}
                  />
                </div>
                <div className="project-feature__details">
                  <p className="project-feature__label">Role Overview</p>
                  <ul>
                    <li>Branding</li>
                    <li>Web Design</li>
                    <li>Webflow</li>
                    <li>Marketing Collateral</li>
                  </ul>
                </div>
                <a
                  className="project-feature__site-link"
                  href={projectSiteLinks.runway}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </div>

              <div className="project-feature__story project-feature__story--runway">
                <h3>
                  To build a high-performing marketing site and a consistent
                  campaign system that clearly communicated the product&apos;s
                  value.
                </h3>
                <p>
                  The brief focused on delivering a marketing site that felt
                  clear, fast, and true to the brand, while also creating a
                  broader suite of digital and offline assets that could
                  support growth campaigns.
                </p>
                <p>
                  I defined the key messaging and site goals first, then
                  designed a clean, easy-to-understand layout supported by a
                  reusable component system so the website could scale without
                  losing cohesion.
                </p>
                <p>
                  The same design system carried across web pages, campaigns,
                  and supporting collateral, giving Runway a more consistent
                  presence across every channel while keeping the work focused
                  on clarity and conversion.
                </p>
              </div>
            </div>

            <div className="project-feature__visuals project-feature__visuals--runway">
              <ProjectCarousel slides={runwaySlides} />
            </div>
          </article>

        </section>
      </div>
    </main>
  );
}
