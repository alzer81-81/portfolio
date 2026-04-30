import type { Metadata } from "next";
import Image from "next/image";
import { HomepageNav } from "@/components/homepage-nav";
import { createPageMetadata } from "@/lib/seo";

const illustrationProjects = [
  {
    title: "Dots World 2.0",
    href: "https://www.behance.net/gallery/130687931/Dots-World-20",
    image: "/assets/illustrations/live/dots-world-2.png",
    size: "portrait",
  },
  {
    title: "Shortcut Blog Illustrations",
    href: "https://www.behance.net/gallery/131757645/Shortcut-Blog-Illustrations",
    image: "/assets/illustrations/live/shortcut-blog-illustrations.png",
    size: "portrait",
  },
  {
    title: "Typing Team",
    href: "https://www.behance.net/gallery/201185837/Typing-Team",
    image: "/assets/illustrations/live/typing-team.webp",
    size: "landscape-wide",
  },
  {
    title: "Famous Landmarks",
    href: "https://www.behance.net/gallery/25110523/Famous-Landmarks",
    image: "/assets/illustrations/live/famous-landmarks.png",
    size: "portrait",
  },
  {
    title: "Iconography Styleguide",
    href: "https://www.behance.net/gallery/57838193/Iconography-Styleguide",
    image: "/assets/illustrations/live/iconography-styleguide.png",
    size: "portrait",
  },
  {
    title: "Lighthouses of the World",
    href: "https://www.behance.net/gallery/56793345/Lighthouses-of-the-World",
    image: "/assets/illustrations/live/lighthouses-of-the-world.webp",
    size: "landscape-wide",
  },
  {
    title: "Swagalicious Shortcut Stickers",
    href: "https://www.behance.net/gallery/137969789/Swagalicious-Shortcut-Stickers",
    image: "/assets/illustrations/live/shortcut-stickers.png",
    size: "portrait",
  },
  {
    title: "Clubhouse Illustration System",
    href: "https://www.behance.net/gallery/84352557/Clubhouse-Illustration-System",
    image: "/assets/illustrations/live/clubhouse-illustration-system.png",
    size: "portrait",
  },
  {
    title: "The Doors of Dublin",
    href: "https://www.behance.net/gallery/56008021/The-Doors-of-Dublin",
    image: "/assets/illustrations/live/doors-of-dublin.webp",
    size: "landscape-wide",
  },
  {
    title: "Golf Clubhouses of Ireland",
    href: "https://www.behance.net/gallery/239263051/Golf-Clubhouses-of-Ireland",
    image: "/assets/illustrations/live/golf-clubhouses-of-ireland.png",
    size: "portrait",
  },
  {
    title: "PrivateVPN",
    href: "https://www.behance.net/gallery/62052853/PrivateVPN",
    image: "/assets/illustrations/live/privatevpn.png",
    size: "portrait",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Illustrations | Al Power",
  description:
    "A selection of illustration series and commissioned visual projects by Al Power, spanning editorial, product, and brand work.",
  path: "/illustrations",
});

export default function IllustrationsPage() {
  return (
    <main className="homepage illustrations-page">
      <div className="homepage__inner illustrations-page__shell">
        <HomepageNav workHref="/#selected-work" />

        <div className="illustrations-page__main">
          <section className="homepage-hero illustrations-page__hero">
            <div className="homepage-hero__copy illustrations-page__hero-copy">
              <h1>
                <span className="homepage-hero__title">
                  <span className="homepage-hero__title-line">Illustration</span>
                  <span className="homepage-hero__title-line">Series & Projects.</span>
                </span>
              </h1>
              <p>
                Over the years, I&apos;ve taken on both personal and professional work
                that helped build my experience in illustration. Click into the
                thumbnails to see more from each series.
              </p>
            </div>
          </section>

          <section className="illustrations-page__gallery" aria-label="Illustration projects">
            {illustrationProjects.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`illustrations-page__tile illustrations-page__tile--${item.size}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    item.size === "landscape-wide"
                      ? "(max-width: 720px) 100vw, 100vw"
                      : "(max-width: 720px) 100vw, 50vw"
                  }
                />
                <div className="illustrations-page__tile-overlay">
                  <span className="illustrations-page__tile-title">{item.title}</span>
                  <span className="illustrations-page__tile-link">View project</span>
                </div>
              </a>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
