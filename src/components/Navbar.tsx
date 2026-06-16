"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/collection", label: "Collection" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, favCount } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-[#F4F4F2] border-b border-sand/60">
      <nav className="container-site flex items-center justify-between h-20">
        {/* Logo blends into navbar (same background) */}
        <Link href="/" className="flex items-center" aria-label="Meuble Aziz - Accueil">
          <Image
            src="/images/brand/logo.png"
            alt="Meuble Aziz"
            width={150}
            height={75}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm tracking-wide uppercase transition-colors ${
                  pathname === l.href ? "text-brand font-semibold" : "text-charcoal hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <IconLink href="/favorites" label="Favoris" count={favCount}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-7.5-4.6-10-9.2C.4 8.3 2 5 5.2 5 7 5 8.4 6 12 9c3.6-3 5-4 6.8-4C22 5 23.6 8.3 22 11.8 19.5 16.4 12 21 12 21z" />
            </svg>
          </IconLink>
          <IconLink href="/cart" label="Panier" count={cartCount}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
          </IconLink>

          {/* Mobile burger */}
          <button
            className="md:hidden text-charcoal"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-[#F4F4F2] border-t border-sand/60 px-6 py-3 space-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm tracking-wide uppercase ${
                  pathname === l.href ? "text-brand font-semibold" : "text-charcoal"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function IconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} aria-label={label} className="relative text-charcoal hover:text-brand transition-colors">
      {children}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand text-cream text-[10px] font-semibold w-4.5 h-4.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </Link>
  );
}