"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/logo-mark";

const navItems = [
  { href: "", label: "Work" },
  { href: "/about", label: "My Story" },
  { href: "/illustrations", label: "Illustrations" },
  { href: "/contact", label: "Contact" },
];

const toneSurfaceMap: Record<string, { bg: string; fg: string }> = {
  hero: { bg: "rgba(255, 255, 255, 0.96)", fg: "#111111" },
  typing: { bg: "rgba(16, 103, 170, 0.94)", fg: "#ffffff" },
  shortcut: { bg: "rgba(36, 44, 63, 0.94)", fg: "#ffffff" },
  ryanair: { bg: "rgba(23, 68, 146, 0.94)", fg: "#ffffff" },
  qstream: { bg: "rgba(255, 255, 255, 0.96)", fg: "#111111" },
  privatevpn: { bg: "rgba(38, 56, 96, 0.94)", fg: "#ffffff" },
  onsecurity: { bg: "rgba(13, 25, 39, 0.94)", fg: "#ffffff" },
  runway: { bg: "rgba(255, 255, 255, 0.96)", fg: "#111111" },
};

export function HomepageNav({ workHref = "/#selected-work" }: { workHref?: string }) {
  const pathname = usePathname();
  const [tone, setTone] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toneRef = useRef("hero");
  const scrolledRef = useRef(false);

  useEffect(() => {
    const toneSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-page-tone]"),
    );

    const SCROLL_ENTER = 140;
    const SCROLL_EXIT = 96;
    const TONE_SAMPLE_Y = 88;

    const updateNavTone = () => {
      const currentScroll = window.scrollY;
      const nextScrolled = scrolledRef.current
        ? currentScroll > SCROLL_EXIT
        : currentScroll > SCROLL_ENTER;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      let nextTone = "hero";
      const activeSection = toneSections.find((section) => {
        const sectionRect = section.getBoundingClientRect();
        return sectionRect.top <= TONE_SAMPLE_Y && sectionRect.bottom >= TONE_SAMPLE_Y;
      });

      nextTone = activeSection?.dataset.pageTone ?? "hero";

      if (nextTone !== toneRef.current) {
        toneRef.current = nextTone;
        setTone(nextTone);
      }
    };

    updateNavTone();
    window.addEventListener("scroll", updateNavTone, { passive: true });
    window.addEventListener("resize", updateNavTone);

    return () => {
      window.removeEventListener("scroll", updateNavTone);
      window.removeEventListener("resize", updateNavTone);
    };
  }, []);

  useEffect(() => {
    const homepage = document.querySelector(".homepage") as HTMLElement | null;
    if (!homepage) return;

    const surface = toneSurfaceMap[tone] ?? toneSurfaceMap.hero;
    homepage.style.setProperty("--nav-surface", surface.bg);
    homepage.style.setProperty("--nav-foreground", surface.fg);
  }, [tone]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderNavLinks = (idSuffix: string) => (
    <>
      <Link
        href="/"
        className="homepage-nav__logo"
        aria-label="Back to homepage"
        onClick={() => setMenuOpen(false)}
      >
        <LogoMark className="homepage-nav__logo-mark" />
      </Link>

      <button
        type="button"
        className="homepage-nav__toggle"
        aria-expanded={menuOpen}
        aria-controls={`homepage-nav-links-${idSuffix}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <nav
        id={`homepage-nav-links-${idSuffix}`}
        className={`homepage-nav__links ${menuOpen ? "is-open" : ""}`}
        aria-label="Primary"
      >
        {navItems.map((item, index) => {
          const href = item.label === "Work" ? workHref : item.href;
          const isCurrent =
            (item.label === "Work" && pathname === "/") ||
            (item.label !== "Work" && pathname === item.href);

          return (
            <span key={item.label} className="homepage-nav__item">
              <Link
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {index < navItems.length - 1 ? (
                <span className="homepage-nav__separator" aria-hidden="true">
                  ·
                </span>
              ) : null}
            </span>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <header ref={navRef} className={`homepage-nav is-tone-${tone}`}>
        <div className="homepage-nav__shell">{renderNavLinks("base")}</div>
      </header>
      {scrolled ? (
        <div className={`homepage-nav homepage-nav--floating is-scrolled is-tone-${tone}`}>
          <div className="homepage-nav__shell">{renderNavLinks("floating")}</div>
        </div>
      ) : null}
    </>
  );
}
