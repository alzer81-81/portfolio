"use client";

import { CSSProperties, ReactElement, useEffect, useRef, useState } from "react";

type ShapeVariant = "square" | "plus" | "cross" | "hex";

type ShapeDef = {
  viewBox: string;
  speed: number;
  damping: number;
  acceleration: number;
  kick: number;
  render: () => ReactElement;
};

type LogoShapeProps = {
  active?: boolean;
  className?: string;
  introSpin?: boolean;
  variant: ShapeVariant;
};

const shapeDefs: Record<ShapeVariant, ShapeDef> = {
  square: {
    viewBox: "0 0 24.2947 24.2947",
    speed: 0.86,
    damping: 0.986,
    acceleration: 0.14,
    kick: 1,
    render: () => <rect width="24.2947" height="24.2947" fill="currentColor" />,
  },
  plus: {
    viewBox: "0 0 24.2947 24.2947",
    speed: 0.82,
    damping: 0.985,
    acceleration: 0.135,
    kick: 1,
    render: () => (
      <path
        d="M0 9.0196H9.03762V0H15.2571V9.0196H24.2947V15.2267H15.2571V24.2947H9.03762V15.2267H0V9.0196Z"
        fill="currentColor"
      />
    ),
  },
  cross: {
    viewBox: "0 0 21.5895 21.5895",
    speed: -0.78,
    damping: 0.984,
    acceleration: 0.13,
    kick: -1,
    render: () => (
      <path
        d="M17.1789 21.5895L10.7883 15.1989L4.4105 21.5767L0.0127 17.1789L6.3905 10.8011L0 4.41061L4.389 0.02154L10.7796 6.41211L17.1917 0L21.5895 4.39781L15.1774 10.8099L21.5679 17.2005L17.1789 21.5895Z"
        fill="currentColor"
      />
    ),
  },
  hex: {
    viewBox: "0 0 22 24",
    speed: -0.9,
    damping: 0.983,
    acceleration: 0.145,
    kick: -1,
    render: () => (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0007 24L22 17.6403V6.3597L11.0007 0L0 6.3597V17.6403L11.0007 24Z"
        fill="currentColor"
      />
    ),
  },
};

export function LogoShape({
  active,
  className,
  introSpin = false,
  variant,
}: LogoShapeProps) {
  const shapeRef = useRef<SVGGElement | null>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const hoverRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const def = shapeDefs[variant];
  const settleDampingRef = useRef(def.damping);

  useEffect(() => {
    if (!introSpin) return;

    angleRef.current = (Math.random() * 40 - 20) * def.kick;
    velocityRef.current = (2.2 + Math.random() * 1.4) * def.kick;
    settleDampingRef.current = Math.min(0.992, def.damping + Math.random() * 0.008);
  }, [def.damping, def.kick, introSpin]);

  useEffect(() => {
    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const delta = Math.min(32, time - lastTime);
      lastTimeRef.current = time;

      const nextVelocity = hoverRef.current
        ? velocityRef.current + (def.speed - velocityRef.current) * def.acceleration
        : velocityRef.current * settleDampingRef.current;

      velocityRef.current = Math.abs(nextVelocity) < 0.002 ? 0 : nextVelocity;
      angleRef.current += velocityRef.current * delta * 0.35;

      if (shapeRef.current) {
        shapeRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [def.acceleration, def.speed]);

  useEffect(() => {
    if (typeof active !== "boolean") return;

    hoverRef.current = active;

    if (!active) {
      velocityRef.current += (Math.random() * 0.035 + 0.015) * def.kick;
    }
  }, [active, def.kick]);

  const handleEnter = () => {
    hoverRef.current = true;
  };

  const handleLeave = () => {
    hoverRef.current = false;
    velocityRef.current += (Math.random() * 0.035 + 0.015) * def.kick;
  };

  return (
    <svg
      viewBox={def.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g
        ref={shapeRef}
        className="homepage-nav__logo-shape"
        onMouseEnter={typeof active === "boolean" ? undefined : handleEnter}
        onMouseLeave={typeof active === "boolean" ? undefined : handleLeave}
      >
        {def.render()}
      </g>
    </svg>
  );
}

type StaticLogoShapeProps = {
  className?: string;
  style?: CSSProperties;
  variant: ShapeVariant;
};

export function StaticLogoShape({ className, style, variant }: StaticLogoShapeProps) {
  const def = shapeDefs[variant];

  return (
    <svg
      viewBox={def.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {def.render()}
    </svg>
  );
}

type LogoMarkProps = {
  className?: string;
};

type StaticLogoMarkProps = {
  animated?: boolean;
  className?: string;
  pieceClassName?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  const [active, setActive] = useState(false);

  return (
    <span
      className={className}
      aria-hidden="true"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <LogoShape
        active={active}
        variant="square"
        className="homepage-nav__logo-piece homepage-nav__logo-piece--square"
      />
      <LogoShape
        active={active}
        variant="cross"
        className="homepage-nav__logo-piece homepage-nav__logo-piece--cross"
      />
      <LogoShape
        active={active}
        variant="plus"
        className="homepage-nav__logo-piece homepage-nav__logo-piece--plus"
      />
      <LogoShape
        active={active}
        variant="hex"
        className="homepage-nav__logo-piece homepage-nav__logo-piece--hex"
      />
    </span>
  );
}

export function StaticLogoMark({
  animated = false,
  className,
  pieceClassName,
}: StaticLogoMarkProps) {
  const markRef = useRef<HTMLSpanElement | null>(null);
  const pieceClasses = (variant: ShapeVariant) =>
    [
      "homepage-nav__logo-piece",
      `homepage-nav__logo-piece--${variant}`,
      pieceClassName,
    ]
      .filter(Boolean)
      .join(" ");

  useEffect(() => {
    const node = markRef.current;
    if (!node || !animated) return;

    const ranged = (min: number, max: number) => min + Math.random() * (max - min);
    const pieces = node.querySelectorAll<SVGElement>("svg");
    const configs = [
      {
        duration: `${ranged(2.2, 3.4)}s`,
        from: `${-ranged(70, 180)}deg`,
        to: `${ranged(-12, 18)}deg`,
      },
      {
        duration: `${ranged(2.15, 3.3)}s`,
        from: `${ranged(70, 170)}deg`,
        to: `${-ranged(-10, 16)}deg`,
      },
      {
        duration: `${ranged(2.3, 3.45)}s`,
        from: `${-ranged(60, 160)}deg`,
        to: `${ranged(-10, 16)}deg`,
      },
      {
        duration: `${ranged(2.2, 3.35)}s`,
        from: `${ranged(60, 150)}deg`,
        to: `${-ranged(-8, 14)}deg`,
      },
    ];

    pieces.forEach((piece, index) => {
      const config = configs[index];
      if (!config) return;
      piece.style.setProperty("--piece-duration", config.duration);
      piece.style.setProperty("--piece-delay", "0s");
      piece.style.setProperty("--piece-from-rotate", config.from);
      piece.style.setProperty("--piece-to-rotate", config.to);
      piece.style.setProperty("--piece-base-rotate", config.to);
    });
  }, [animated]);

  useEffect(() => {
    const node = markRef.current;
    if (!node || !animated) return;

    const pieces = Array.from(node.querySelectorAll<SVGElement>("svg"));
    const multipliers = [0.45, -0.35, 0.28, -0.4];

    const updateScrollRotation = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      const distance = (viewportCenter - elementCenter) / Math.max(window.innerHeight, 1);
      const clamped = Math.max(-1, Math.min(1, distance));

      pieces.forEach((piece, index) => {
        const multiplier = multipliers[index] ?? 0;
        piece.style.setProperty(
          "--piece-scroll-rotate",
          `${clamped * 5 * multiplier}deg`,
        );
      });
    };

    updateScrollRotation();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateScrollRotation();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [animated]);

  return (
    <span ref={markRef} className={className} aria-hidden="true">
      <StaticLogoShape
        variant="square"
        className={pieceClasses("square")}
      />
      <StaticLogoShape
        variant="cross"
        className={pieceClasses("cross")}
      />
      <StaticLogoShape
        variant="plus"
        className={pieceClasses("plus")}
      />
      <StaticLogoShape
        variant="hex"
        className={pieceClasses("hex")}
      />
    </span>
  );
}
