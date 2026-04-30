import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/#selected-work", label: "Work" },
  { href: "/about", label: "My Story" },
  { href: "/illustrations", label: "Illustrations" },
  { href: "/contact", label: "Contact" },
];
export function SiteShell({
  children,
  intro,
}: {
  children: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <Link href="/" className="brand-mark" aria-label="Al Power home">
          <Image src="/logo.svg" alt="Al Power logo" width={100} height={100} />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {intro ? <div className="page-intro">{intro}</div> : null}
      <main className="page-content">{children}</main>
    </div>
  );
}
