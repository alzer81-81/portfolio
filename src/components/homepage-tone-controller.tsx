"use client";

import { useEffect } from "react";

const toneMap: Record<
  string,
  { cursorBackground: string; cursorForeground: string; pageTone: string }
> = {
  hero: {
    cursorBackground: "rgba(255, 255, 255, 0.96)",
    cursorForeground: "#111111",
    pageTone: "#ffffff",
  },
  typing: {
    cursorBackground: "rgba(16, 103, 170, 0.94)",
    cursorForeground: "#ffffff",
    pageTone: "#1a81ca",
  },
  shortcut: {
    cursorBackground: "rgba(36, 44, 63, 0.94)",
    cursorForeground: "#ffffff",
    pageTone: "#293145",
  },
  ryanair: {
    cursorBackground: "rgba(23, 68, 146, 0.94)",
    cursorForeground: "#ffffff",
    pageTone: "#1e4ea6",
  },
  onsecurity: {
    cursorBackground: "rgba(13, 25, 39, 0.94)",
    cursorForeground: "#ffffff",
    pageTone: "#0f1d2b",
  },
  privatevpn: {
    cursorBackground: "rgba(38, 56, 96, 0.94)",
    cursorForeground: "#ffffff",
    pageTone: "#6746d6",
  },
  runway: {
    cursorBackground: "rgba(255, 255, 255, 0.96)",
    cursorForeground: "#111111",
    pageTone: "#ffffff",
  },
};

export function HomepageToneController() {
  useEffect(() => {
    const homepage = document.querySelector(".homepage") as HTMLElement | null;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-page-tone]"),
    );

    if (!homepage || sections.length === 0) return;

    const updateTone = () => {
      const TONE_SAMPLE_Y = 88;
      const activeSection = sections.find((section) => {
        const sectionRect = section.getBoundingClientRect();
        return sectionRect.top <= TONE_SAMPLE_Y && sectionRect.bottom >= TONE_SAMPLE_Y;
      });

      const activeTone = activeSection?.dataset.pageTone ?? "hero";

      const tone = toneMap[activeTone] ?? toneMap.hero;
      homepage.dataset.tone = activeTone;
      homepage.style.setProperty("--page-tone", tone.pageTone);
      homepage.style.setProperty("--carousel-cursor-bg", tone.cursorBackground);
      homepage.style.setProperty("--carousel-cursor-fg", tone.cursorForeground);
    };

    updateTone();
    window.addEventListener("scroll", updateTone, { passive: true });
    window.addEventListener("resize", updateTone);

    return () => {
      window.removeEventListener("scroll", updateTone);
      window.removeEventListener("resize", updateTone);
    };
  }, []);

  return null;
}
