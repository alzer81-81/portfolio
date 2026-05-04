"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const DESKTOP_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const LERP = 0.085;
const SNAP_DISTANCE = 0.35;

export function SmoothScrollShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const frameRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const navs = Array.from(
      document.querySelectorAll<HTMLElement>(".homepage-nav"),
    );

    if (!content) {
      return;
    }

    const updateHeight = () => {
      document.body.style.height = enabled
        ? `${content.getBoundingClientRect().height}px`
        : "";
    };

    updateHeight();

    if (!enabled) {
      content.style.transform = "";
      content.style.willChange = "";
      navs.forEach((nav) => {
        nav.style.transform = "";
        nav.style.willChange = "";
      });
      currentRef.current = window.scrollY;
      targetRef.current = window.scrollY;
      return () => {
        document.body.style.height = "";
      };
    }

    content.style.willChange = "transform";
    navs.forEach((nav) => {
      nav.style.willChange = "transform";
    });
    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;
    content.style.transform = `translate3d(0, ${-currentRef.current}px, 0)`;
    navs.forEach((nav) => {
      nav.style.transform = `translate3d(0, ${currentRef.current}px, 0)`;
    });

    const onScroll = () => {
      targetRef.current = window.scrollY;
    };

    const tick = () => {
      const delta = targetRef.current - currentRef.current;
      currentRef.current += delta * LERP;

      if (Math.abs(delta) < SNAP_DISTANCE) {
        currentRef.current = targetRef.current;
      }

      content.style.transform = `translate3d(0, ${-currentRef.current}px, 0)`;
      navs.forEach((nav) => {
        nav.style.transform = `translate3d(0, ${currentRef.current}px, 0)`;
      });
      frameRef.current = window.requestAnimationFrame(tick);
    };

    resizeObserverRef.current = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserverRef.current.observe(content);

    window.addEventListener("scroll", onScroll, { passive: true });
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      frameRef.current = null;
      content.style.transform = "";
      content.style.willChange = "";
      navs.forEach((nav) => {
        nav.style.transform = "";
        nav.style.willChange = "";
      });
      document.body.style.height = "";
    };
  }, [enabled, pathname]);

  return (
    <div
      ref={wrapperRef}
      className={`smooth-scroll-shell${enabled ? " is-enabled" : ""}`}
    >
      <div ref={contentRef} className="smooth-scroll-shell__content">
        {children}
      </div>
    </div>
  );
}
