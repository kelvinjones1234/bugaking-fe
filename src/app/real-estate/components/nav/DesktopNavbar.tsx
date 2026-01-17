"use client";

import Link from "next/link";

export function DesktopNavbar() {
  const links = [
    { name: "Residential", href: "#" },
    { name: "Commercial", href: "#" },
    { name: "Investments", href: "#" },
    { name: "Development", href: "#" },
  ];

  return (
    // HTML classes: hidden lg:flex items-center gap-10
    <nav className="hidden lg:flex items-center gap-10">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          // HTML classes: text-sm font-semibold hover:text-primary transition-colors
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}