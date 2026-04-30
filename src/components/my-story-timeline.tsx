"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TimelineQuote = {
  body: string;
  author: string;
  company: string;
  logo: string;
  avatar: string;
};

type TimelineEntry = {
  dates: string;
  company: string;
  role: string;
  body: string;
  image?: string;
  alt?: string;
  quote?: TimelineQuote;
  isEnding?: boolean;
};

export function MyStoryTimeline({ items }: { items: TimelineEntry[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const titleRefs = useRef<Array<HTMLElement | null>>([]);
  const [timelineState, setTimelineState] = useState({
    startOffset: 0,
    trackLength: 0,
    markerOffset: 0,
    pointOffsets: [] as number[],
    activeIndex: 0,
    segmentMarkerOffset: 0,
    hasSegment: false,
  });

  useEffect(() => {
    const updateTimeline = () => {
      const section = sectionRef.current;
      const entries = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (!section || entries.length === 0) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.scrollY;

      const centers = entries.map((entry, index) => {
        const titleNode = titleRefs.current[index];

        if (titleNode) {
          const rect = titleNode.getBoundingClientRect();
          return rect.top + window.scrollY + rect.height / 2;
        }

        const rect = entry.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });

      const marker = window.scrollY + window.innerHeight * 0.5;
      const start = centers[0];
      const end = centers[centers.length - 1];
      const trackLength = Math.max(end - start, 1);
      const startOffset = start - sectionTop;
      const markerOffset = Math.max(0, Math.min(trackLength, marker - start));
      const pointOffsets = centers.map((center) => center - sectionTop);
      const activeIndex = centers.reduce((lastReachedIndex, center, index) => {
        if (marker >= center) return index;
        return lastReachedIndex;
      }, 0);
      const nextIndex = Math.min(activeIndex + 1, centers.length - 1);
      const hasSegment = nextIndex > activeIndex;
      const segmentMarkerOffset = hasSegment
        ? Math.max(
            pointOffsets[activeIndex],
            Math.min(pointOffsets[nextIndex], marker - sectionTop),
          )
        : pointOffsets[activeIndex] ?? startOffset;

      setTimelineState({
        startOffset,
        trackLength,
        markerOffset,
        pointOffsets,
        activeIndex,
        segmentMarkerOffset,
        hasSegment,
      });
    };

    updateTimeline();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateTimeline();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  return (
    <section className="my-story-timeline" ref={sectionRef}>
      <div className="my-story-timeline__inner">
        <div className="my-story-timeline__progress" aria-hidden="true">
          <div
            className="my-story-timeline__progress-track"
            style={{
              top: `${timelineState.startOffset}px`,
              height: `${timelineState.trackLength}px`,
            }}
          />
          <div
            className="my-story-timeline__progress-bar"
            style={{
              top: `${timelineState.startOffset}px`,
              height: `${timelineState.markerOffset}px`,
            }}
          />
          <div
            className="my-story-timeline__progress-circle"
            style={{ top: `${timelineState.segmentMarkerOffset}px` }}
          />
          {timelineState.pointOffsets.map((offset, index) => (
            <div
              key={`timeline-point-${index}`}
              className={`my-story-timeline__progress-point${
                index <= timelineState.activeIndex ? " is-reached" : ""
              }${index === timelineState.activeIndex ? " is-current" : ""}${
                !timelineState.hasSegment && index === timelineState.activeIndex
                  ? " is-terminal"
                  : ""
              }`}
              style={{ top: `${offset}px` }}
            />
          ))}
        </div>

        <div className="my-story-timeline__items">
          {items.map((item, index) => (
            <article
              key={`${item.dates}-${item.company}`}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={`my-story-timeline__item${
                item.isEnding ? " is-ending" : ""
              }${index <= timelineState.activeIndex ? " is-reached" : ""}${
                index === timelineState.activeIndex ? " is-current" : ""
              }`}
            >
              <div className="my-story-timeline__left">
                <div className="my-story-timeline__date-text">{item.dates}</div>
              </div>

              <div className="my-story-timeline__centre" aria-hidden="true" />

              <div className="my-story-timeline__right">
                <div className="my-story-timeline__entry-copy">
                  <div className="my-story-timeline__entry-title">
                    <strong
                      ref={(node) => {
                        titleRefs.current[index] = node;
                      }}
                    >
                      {item.company}
                    </strong>
                  </div>
                  {item.role ? (
                    <div className="my-story-timeline__entry-role">{item.role}</div>
                  ) : null}
                  <div className="my-story-timeline__entry-body">
                    {item.body.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {item.quote ? (
                  <div className="my-story-timeline__quote">
                    <Image
                      src={item.quote.avatar}
                      alt={`${item.quote.company} testimonial portrait`}
                      className="my-story-timeline__quote-avatar"
                      width={80}
                      height={80}
                    />
                    <div className="my-story-timeline__quote-copy">
                      <p>{item.quote.body}</p>
                      <div className="my-story-timeline__quote-meta">
                        <span>
                          {item.quote.author} <strong>{item.quote.company}</strong>
                        </span>
                        <Image
                          src={item.quote.logo}
                          alt={`${item.quote.company} logo`}
                          width={120}
                          height={32}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {item.image ? (
                  <div className="my-story-timeline__image-wrapper">
                    <Image
                      src={item.image}
                      alt={item.alt ?? `${item.company} artwork`}
                      width={1200}
                      height={900}
                      sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1320px) 42vw, 560px"
                    />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
