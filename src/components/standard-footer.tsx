"use client";

import Image from "next/image";
import Link from "next/link";
import { LogoShape } from "@/components/logo-mark";
import { siteConfig } from "@/lib/seo";

const pageLinks = [
  { href: "/#selected-work", label: "Work" },
  { href: "/about", label: "My Story" },
  { href: "/illustrations", label: "Illustrations" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://linkedin.com/in/alpower81",
    label: "LinkedIn",
    icon: "/assets/social/linkedin.svg",
  },
  {
    href: "https://www.behance.net/AlPower",
    label: "Behance",
    icon: "/assets/social/behance.svg",
  },
  {
    href: "https://dribbble.com/alzer81",
    label: "Dribbble",
    icon: "/assets/social/dribbble.svg",
  },
  {
    href: `mailto:${siteConfig.email}`,
    label: "Email",
    icon: "email",
  },
];

export function StandardFooter() {
  return (
    <footer className="standard-footer">
      <div className="standard-footer__inner">
        <div className="standard-footer__panel">
          <div className="standard-footer__mark" aria-hidden="true">
            <div className="standard-footer__mark-grid">
              <LogoShape
                variant="square"
                className="standard-footer__mark-piece standard-footer__mark-piece--square"
              />
              <LogoShape
                variant="cross"
                className="standard-footer__mark-piece standard-footer__mark-piece--cross"
              />
              <LogoShape
                variant="plus"
                className="standard-footer__mark-piece standard-footer__mark-piece--plus"
              />
              <LogoShape
                variant="hex"
                className="standard-footer__mark-piece standard-footer__mark-piece--hex"
              />
            </div>
          </div>

          <div className="standard-footer__nav-block">
            <nav className="standard-footer__links" aria-label="Footer pages">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="standard-footer__social-block">
            <p className="standard-footer__label">Social</p>
            <div className="standard-footer__socials">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={link.label}
                >
                  {link.icon === "email" ? (
                    <svg viewBox="0 0 24 24" role="presentation">
                      <path
                        d="M3 6.75h18v10.5H3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.5 8.25 12 13.5l7.5-5.25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <Image src={link.icon} alt="" width={30} height={24} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="standard-footer__bottom">
          <p>Al Power Designs - 2026</p>
        </div>
      </div>
    </footer>
  );
}
