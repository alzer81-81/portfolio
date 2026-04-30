import type { Metadata } from "next";
import { HomepageNav } from "@/components/homepage-nav";
import { MyStoryTimeline } from "@/components/my-story-timeline";
import { aboutTimeline } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My Story | Al Power",
  description:
    "Explore Al Power’s path through product design, brand systems, illustration, and digital teams over more than two decades of design work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="homepage my-story-page">
      <div className="homepage__inner my-story-shell">
        <HomepageNav workHref="/#selected-work" />

        <div className="my-story-main">
          <section className="my-story-hero">
            <div className="my-story-hero__copy">
              <h1>
                <span className="homepage-hero__title">
                  <span className="homepage-hero__title-line">My Story</span>
                </span>
              </h1>
              <p className="my-story-hero__lede">
                With more than 20 years in design, I&apos;ve moved between
                product teams, brand projects, illustrations, and digital
                systems while keeping the same focus: making things clearer,
                sharper, and more useful.
              </p>
              <p className="my-story-hero__support">
                The work below is a snapshot of that path, from agency years to
                in-house product design, and the people, products, and problems
                that helped shape how I work.
              </p>
            </div>

          </section>

          <section className="my-story-intro-block">
            <div className="my-story-intro-block__heading">
              <p className="eyebrow">Work Experience</p>
              <h2>Over the years I&apos;ve worked with various companies.</h2>
            </div>
            <p className="my-story-intro-block__body">
              Some big, some small, but I like to think it&apos;s helped me get to
              my 10,000 hours. Let&apos;s have a look.
            </p>
          </section>

          <MyStoryTimeline items={aboutTimeline} />
        </div>
      </div>
    </main>
  );
}
