import { StaticLogoShape } from "@/components/logo-mark";

export function HomepageHeroBackdrop() {
  return (
    <div className="homepage-intro__backdrop" aria-hidden="true">
      <div className="homepage-intro__grain" />

      <div className="homepage-intro__shape homepage-intro__shape--diamond">
        <StaticLogoShape
          variant="square"
          className="homepage-intro__shape-svg homepage-intro__shape-svg--diamond"
        />
      </div>

      <div className="homepage-intro__shape homepage-intro__shape--plus">
        <StaticLogoShape
          variant="plus"
          className="homepage-intro__shape-svg homepage-intro__shape-svg--plus"
        />
      </div>

      <div className="homepage-intro__shape homepage-intro__shape--hex">
        <StaticLogoShape
          variant="hex"
          className="homepage-intro__shape-svg homepage-intro__shape-svg--hex"
        />
      </div>
    </div>
  );
}
