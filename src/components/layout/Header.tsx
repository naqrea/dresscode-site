"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/boutique", label: "Boutique" },
  { href: "/galerie", label: "Galerie" },
  { href: "/shooting", label: "Shooting" },
  { href: "/relooking", label: "Relooking" },
];

export function Header() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-dc-white/10 bg-dc-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <Logo priority />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-sm uppercase tracking-wide text-dc-white/80 transition-colors hover:text-dc-accent",
                pathname === link.href && "text-dc-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Panier, ${totalItems} article${totalItems > 1 ? "s" : ""}`}
            className="relative flex h-11 w-11 items-center justify-center text-dc-white hover:text-dc-accent"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-dc-accent px-1 text-[10px] font-semibold text-dc-white">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            className="flex h-11 w-11 items-center justify-center text-dc-white hover:text-dc-accent md:hidden"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-30 overflow-y-auto border-t border-dc-white/10 bg-dc-bg transition-[height,opacity] duration-300 md:hidden",
          isMenuOpen
            ? "h-[calc(100vh-4rem)] opacity-100"
            : "pointer-events-none h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 py-2" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "border-b border-dc-white/10 py-4 font-heading text-lg uppercase tracking-wide text-dc-white/90",
                pathname === link.href && "text-dc-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6a3 3 0 1 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
