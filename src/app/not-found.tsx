import type { Metadata } from "next";
import Link from "next/link";
import { HomepageNav } from "@/components/homepage-nav";
import { StaticLogoMark } from "@/components/logo-mark";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found | Al Power",
  description:
    "The page you were looking for has wandered off. Head back to the portfolio, My Story, Illustrations, or Contact.",
  path: "/404",
});

export default function NotFound() {
  return (
    <main className="homepage not-found-page">
      <div className="homepage__inner not-found-page__shell">
        <HomepageNav workHref="/#selected-work" />

        <section className="homepage-hero not-found-page__hero">
          <div className="not-found-page__mark" aria-hidden="true">
            <StaticLogoMark
              animated
              className="not-found-page__logo"
              pieceClassName="not-found-page__logo-piece"
            />
            <p className="not-found-page__badge">404</p>
          </div>

          <div className="homepage-hero__copy not-found-page__copy">
            <p className="eyebrow">This Page Took A Wrong Turn</p>
            <h1>
              <span className="homepage-hero__title">
                <span className="homepage-hero__title-line">Looks like this</span>
                <span className="homepage-hero__title-line">
                  page missed the brief.
                </span>
              </span>
            </h1>
            <p>
              The good news: the rest of the portfolio is far better behaved.
              Jump back to the work, have a nose through My Story, or head to
              the contact page and pretend none of this happened.
            </p>

            <div className="not-found-page__actions">
              <Link href="/">Back Home</Link>
              <Link href="/#selected-work">See Work</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
