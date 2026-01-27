"use client";

import Link from "next/link";

export function DesktopNavbar() {
  const links = [
    { name: "Services", href: "/services" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Global Portal", href: "/global-portal" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8 ml-10">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
} 