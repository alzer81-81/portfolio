import type { Metadata } from "next";
import Image from "next/image";
import { HomepageNav } from "@/components/homepage-nav";
import { ContactFormPanel } from "@/components/contact-form-panel";
import { createPageMetadata, siteConfig } from "@/lib/seo";

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/alpower81",
    note: "Roles, intros, and the professional version of me.",
    icon: "/assets/social/linkedin.svg",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/AlPower",
    note: "Project snapshots and older visual work.",
    icon: "/assets/social/behance.svg",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/alzer81",
    note: "Loose ideas, experiments, and visual fragments.",
    icon: "/assets/social/dribbble.svg",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    note: "Skip the platform layer and email directly.",
    icon: "email",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Contact | Al Power",
  description:
    "Get in touch with Al Power about design roles, projects, product problems, or brand work.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="homepage contact-page">
      <div className="homepage__inner contact-page__shell">
        <HomepageNav workHref="/#selected-work" />

        <div className="contact-page__main">
          <section className="homepage-hero contact-page__hero">
            <div className="homepage-hero__copy contact-page__hero-copy">
              <h1>
                <span className="homepage-hero__title">
                  <span className="homepage-hero__title-line">Let&apos;s Make It</span>
                  <span className="homepage-hero__title-line">Happen.</span>
                </span>
              </h1>
              <p>
                If you&apos;ve got a role, a project, or a product problem to untangle,
                send it over. A rough outline is plenty.
              </p>
            </div>
          </section>

          <section className="contact-page__content">
            <ContactFormPanel />

            <aside className="contact-page__details">
              <div className="contact-page__links" aria-label="Contact links">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      item.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="contact-page__link-card"
                  >
                    <div className="contact-page__link-top">
                      <span className="contact-page__link-icon" aria-hidden="true">
                        {item.icon === "email" ? (
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
                          <Image src={item.icon} alt="" width={30} height={24} />
                        )}
                      </span>
                      <span className="contact-page__link-label">{item.label}</span>
                    </div>
                    <span className="contact-page__link-note">{item.note}</span>
                  </a>
                ))}
              </div>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
