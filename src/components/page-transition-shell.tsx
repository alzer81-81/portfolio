"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const TRANSITION_MS = 560;
const INTRO_MS = 1050;
type TransitionPhase =
  | "idle"
  | "exiting"
  | "covered"
  | "intro-cover"
  | "intro-reveal";

export function PageTransitionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [introActive, setIntroActive] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const introTimeoutRef = useRef<number | null>(null);
  const navigatingRef = useRef(false);
  const pendingHashRef = useRef<string>("");

  const resetScrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const scrollToHashTarget = useCallback((hash: string) => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) {
      resetScrollToTop();
      return;
    }

    const target = document.getElementById(id);
    if (!target) {
      resetScrollToTop();
      return;
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, targetTop - 24));
  }, [resetScrollToTop]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";

      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  useEffect(() => {
    setPhase("intro-cover");

    const revealId = window.setTimeout(() => {
      setPhase("intro-reveal");
    }, 60);

    introTimeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
      setIntroActive(false);
    }, INTRO_MS);

    return () => {
      window.clearTimeout(revealId);
      if (introTimeoutRef.current) {
        window.clearTimeout(introTimeoutRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.scrollBehavior = "auto";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (pendingHashRef.current) {
      scrollToHashTarget(pendingHashRef.current);
    } else {
      resetScrollToTop();
    }

    if (navigatingRef.current) {
      setPhase("covered");
      setTransitionEnabled(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (pendingHashRef.current) {
            scrollToHashTarget(pendingHashRef.current);
          } else {
            resetScrollToTop();
          }

          requestAnimationFrame(() => {
            if (pendingHashRef.current) {
              scrollToHashTarget(pendingHashRef.current);
            } else {
              resetScrollToTop();
            }
            setPhase("idle");
            navigatingRef.current = false;
            pendingHashRef.current = "";

            requestAnimationFrame(() => {
              setTransitionEnabled(true);
            });
          });
        });
      });
    }

    requestAnimationFrame(() => {
      html.style.scrollBehavior = "";
      if (!introActive) {
        html.style.overflow = "";
        body.style.overflow = "";
      }
    });

    return () => {
      html.style.scrollBehavior = "";
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [introActive, pathname, resetScrollToTop, scrollToHashTarget]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const destination = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (destination === current) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        !url.hash
      ) {
        event.preventDefault();
        pendingHashRef.current = "";
        navigatingRef.current = false;
        setPhase("idle");
        window.history.pushState({}, "", `${url.pathname}${url.search}`);
        resetScrollToTop();
        return;
      }
      if (url.pathname === window.location.pathname && url.hash) return;
      if (navigatingRef.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      navigatingRef.current = true;
      pendingHashRef.current = url.hash;
      setPhase("exiting");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      timeoutRef.current = window.setTimeout(() => {
        router.push(destination, { scroll: false });
      }, TRANSITION_MS);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [resetScrollToTop, router]);

  return (
    <div className="page-transition-shell">
      {children}
      <div
        className={`page-transition-overlay is-${phase} ${transitionEnabled ? "" : "is-no-transition"} ${introActive ? "is-intro-active" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
