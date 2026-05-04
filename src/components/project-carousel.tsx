"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

export function ProjectCarousel({ slides }: { slides: Slide[] }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const allowCursorRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [progressOffset, setProgressOffset] = useState(0);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const pointerPosition = useRef({ x: 0, y: 0 });
  const lastPointX = useRef(0);
  const lastPointTime = useRef(0);
  const velocityHistory = useRef<Array<{ dx: number; dt: number }>>([]);

  const getStep = useCallback(() => {
    const node = trackRef.current;
    if (!node) return 0;
    const firstSlide = node.querySelector(
      ".project-carousel__slide",
    ) as HTMLElement | null;
    if (!firstSlide) return 0;
    return firstSlide.offsetWidth + 28;
  }, []);

  const getTargetOffset = useCallback((index: number) => {
    const step = getStep();
    return -(step * index);
  }, [getStep]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCursorCapability = () => {
      allowCursorRef.current = mediaQuery.matches;
      if (!mediaQuery.matches) {
        setCursorActive(false);
      }
    };

    updateCursorCapability();
    mediaQuery.addEventListener("change", updateCursorCapability);

    return () => {
      mediaQuery.removeEventListener("change", updateCursorCapability);
    };
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const handleResize = () => {
      setOffset(getTargetOffset(activeIndex));

      const progressTrack = progressTrackRef.current;
      const thumb = progressTrack?.querySelector(
        ".project-carousel__progress-thumb",
      ) as HTMLElement | null;

      if (!progressTrack || !thumb) return;

      const travel = progressTrack.offsetWidth - thumb.offsetWidth;
      const ratio = slides.length <= 1 ? 0 : activeIndex / (slides.length - 1);
      setProgressOffset(Math.max(0, travel * ratio));
    };

    window.addEventListener("resize", handleResize);
    requestAnimationFrame(handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, getTargetOffset, slides.length]);

  const clampIndex = useCallback((index: number) => {
    return Math.max(0, Math.min(index, slides.length - 1));
  }, [slides.length]);

  const snapToIndex = useCallback((index: number) => {
    const next = clampIndex(index);
    setActiveIndex(next);
    setOffset(getTargetOffset(next));
  }, [clampIndex, getTargetOffset]);

  const recordVelocity = (clientX: number) => {
    const now = performance.now();
    const dt = now - lastPointTime.current;
    if (dt > 0) {
      velocityHistory.current.push({
        dx: clientX - lastPointX.current,
        dt,
      });
      if (velocityHistory.current.length > 6) {
        velocityHistory.current.shift();
      }
    }
    lastPointX.current = clientX;
    lastPointTime.current = now;
  };

  const getVelocity = () => {
    const total = velocityHistory.current.reduce(
      (acc, item) => {
        acc.dx += item.dx;
        acc.dt += item.dt;
        return acc;
      },
      { dx: 0, dt: 0 },
    );
    return total.dt > 0 ? (total.dx / total.dt) * 16 : 0;
  };

  const onPointerDown = (clientX: number) => {
    setDragging(true);
    dragStartX.current = clientX;
    dragStartOffset.current = offset;
    velocityHistory.current = [];
    lastPointX.current = clientX;
    lastPointTime.current = performance.now();
  };

  const onPointerMove = (clientX: number) => {
    if (!dragging) return;
    recordVelocity(clientX);
    setOffset(dragStartOffset.current + (clientX - dragStartX.current));
  };

  const onPointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    const step = getStep();
    const velocity = getVelocity();
    const currentIndex = step === 0 ? 0 : Math.abs(offset) / step;

    let nextIndex = Math.round(currentIndex);
    if (velocity < -1.5) nextIndex = Math.ceil(currentIndex + 0.1);
    if (velocity > 1.5) nextIndex = Math.floor(currentIndex - 0.1);

    snapToIndex(nextIndex);
  }, [dragging, getStep, offset, snapToIndex]);

  const updateCursorPosition = (clientX: number, clientY: number) => {
    if (!allowCursorRef.current) return;
    const carousel = carouselRef.current;
    const cursor = cursorRef.current;
    if (!cursor || !carousel) return;
    const rect = carousel.getBoundingClientRect();
    pointerPosition.current = { x: clientX, y: clientY };
    cursor.style.transform = `translate(${clientX - rect.left}px, ${clientY - rect.top}px)`;
  };

  const syncCursorToneFromNav = () => {
    if (!allowCursorRef.current) return;
    const cursor = cursorRef.current;
    const navShell = document.querySelector(
      ".homepage-nav__shell",
    ) as HTMLElement | null;

    if (!cursor || !navShell) return;

    const styles = window.getComputedStyle(navShell);
    cursor.style.backgroundColor = styles.backgroundColor;
    cursor.style.color = styles.color;
  };

  useEffect(() => {
    if (!cursorActive) return;

    const syncCursorToTrack = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const { x, y } = pointerPosition.current;
      const withinTrack =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      syncCursorToneFromNav();

      if (!withinTrack) {
        setCursorActive(false);
        if (dragging) {
          onPointerUp();
        }
      }
    };

    window.addEventListener("scroll", syncCursorToTrack, { passive: true });
    window.addEventListener("resize", syncCursorToTrack);

    return () => {
      window.removeEventListener("scroll", syncCursorToTrack);
      window.removeEventListener("resize", syncCursorToTrack);
    };
  }, [cursorActive, dragging, onPointerUp]);

  const progressWidth = `${100 / slides.length}%`;
  const slideSizes =
    "(max-width: 720px) calc(100vw - 32px), (max-width: 1320px) calc(100vw - 40px), min(1500px, calc(100vw - 100px))";

  return (
    <div
      ref={carouselRef}
      className={`project-carousel ${cursorActive ? "is-cursor-active" : ""} ${dragging ? "is-dragging" : ""}`}
    >
      <div
        ref={cursorRef}
        className={`project-carousel__cursor ${dragging ? "is-dragging" : ""}`}
        aria-hidden="true"
      >
        {dragging ? <span className="project-carousel__cursor-arrow">→</span> : null}
        <span>{dragging ? "dragging" : "drag"}</span>
        {!dragging ? <span className="project-carousel__cursor-arrow">→</span> : null}
      </div>
      <div className="project-carousel__progress" aria-hidden="true">
        <div
          ref={progressTrackRef}
          className="project-carousel__progress-track"
        >
          <div
            className="project-carousel__progress-thumb"
            style={{
              width: progressWidth,
              transform: `translateX(${progressOffset}px)`,
            }}
          />
        </div>
      </div>
      <div
        className={`project-carousel__track ${dragging ? "is-dragging" : ""}`}
        ref={trackRef}
        style={{
          transform: `translateX(${offset}px)`,
          transition: dragging ? "none" : "transform 420ms cubic-bezier(.22,1,.36,1)",
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          updateCursorPosition(event.clientX, event.clientY);
          onPointerDown(event.clientX);
        }}
        onMouseMove={(event) => {
          updateCursorPosition(event.clientX, event.clientY);
          syncCursorToneFromNav();
          onPointerMove(event.clientX);
        }}
        onMouseUp={onPointerUp}
        onMouseEnter={(event) => {
          if (!allowCursorRef.current) return;
          setCursorActive(true);
          updateCursorPosition(event.clientX, event.clientY);
          syncCursorToneFromNav();
        }}
        onMouseLeave={() => {
          setCursorActive(false);
          onPointerUp();
        }}
        onTouchStart={(event) => onPointerDown(event.touches[0].clientX)}
        onTouchMove={(event) => onPointerMove(event.touches[0].clientX)}
        onTouchEnd={onPointerUp}
      >
        {slides.map((slide, index) => (
          <article
            key={`${slide.src}-${index}`}
            className={`project-carousel__slide ${activeIndex === index ? "is-active" : ""}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={slideSizes}
              quality={82}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
