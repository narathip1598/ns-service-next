"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import NavigationLink from "./NavigationLink";
import Image from "next/image";

type NavigationProps = {
  imgSrc: string;
};

export default function Navigation({ imgSrc }: NavigationProps) {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/products", label: t("products") },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: Logo + desktop links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <NavigationLink href="/" className="p-0" onClick={closeMenu}>
            <span className="sr-only">{t("home")}</span>
            <Image
              src={imgSrc}
              alt="Company logo"
              width={36}
              height={36}
              className="h-9 w-auto transition-transform hover:scale-105"
              priority
            />
          </NavigationLink>

          {/* Desktop / tablet links */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            {links.map((link) => (
              <NavigationLink key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </NavigationLink>
            ))}
          </div>
        </div>

        {/* RIGHT: Locale (desktop) + mobile menu button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Locale switcher: ONLY desktop / tablet */}
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          {/* Mobile menu button (no LocaleSwitcher here) */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-100 shadow-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-sky-400 md:hidden"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
          >
            <span className="sr-only">
              {isOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.18em]">
                Menu
              </span>
              <div className="relative h-4 w-4">
                {/* Animated hamburger / close icon */}
                <span
                  className={`absolute left-0 top-[4px] h-[2px] w-full bg-slate-100 transition-transform duration-200 ${isOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                />
                <span
                  className={`absolute left-0 top-[10px] h-[2px] w-full bg-slate-100 transition-opacity duration-150 ${isOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`absolute left-0 top-[16px] h-[2px] w-full bg-slate-100 transition-transform duration-200 ${isOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                />
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile navigation panel */}
      <div
        id="primary-navigation"
        className={`md:hidden origin-top border-b border-slate-800/60 bg-slate-900/95 backdrop-blur-sm transition-all duration-200 ${isOpen
            ? "pointer-events-auto max-h-[320px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
          }`}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6 lg:px-8">
          <nav className="space-y-1 text-sm font-medium text-slate-100">
            {links.map((link) => (
              <NavigationLink
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={closeMenu}
              >
                {link.label}
              </NavigationLink>
            ))}
          </nav>

          {/* Locale switcher ONLY inside panel on mobile */}
          <div className="mt-4 border-t border-slate-800/60 pt-3 flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Language
            </span>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
