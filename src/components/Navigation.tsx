"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE_NAME, type Locale, getLocaleLabels } from "@/lib/i18n";

interface NavigationCategory {
  id: string;
  slug: string;
  title: string;
}

interface NavigationProps {
  categories: NavigationCategory[];
  locale: Locale;
}

export default function Navigation({ categories, locale }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const labels = getLocaleLabels(locale);

  function toggleLocale() {
    const nextLocale = locale === "cs" ? "en" : "cs";
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <>
      {/* Mobile top bar: always visible at the top */}
      <div
        className="fixed inset-x-0 top-0 z-[60] bg-white sm:hidden"
      >
        <div className="mx-auto flex h-12 items-center justify-between px-5">
          {/* Menu trigger / close button at the same top-left position */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`ml-0.5 menu-toggle menu-toggle--sm ${isOpen ? "is-open" : ""}`}
          >
            <span className="menu-toggle__line menu-toggle__line--top" />
            <span className="menu-toggle__line menu-toggle__line--middle" />
            <span className="menu-toggle__line menu-toggle__line--bottom" />
          </button>

          <button
            onClick={toggleLocale}
            aria-label={labels.switchAriaLabel}
            className="nav-category-link mr-1 font-serif text-[0.6875rem] leading-none tracking-widest uppercase text-black"
          >
            {labels.switchTo}
          </button>
        </div>
      </div>

      {/* Desktop controls: no full-width bar */}
      <div className="fixed inset-x-0 top-0 z-[60] hidden sm:block pointer-events-none">
        <div className="mx-auto flex items-center justify-between px-6 py-5 lg:px-12 xl:px-16">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`ml-0.4 pointer-events-auto menu-toggle menu-toggle--lg ${isOpen ? "is-open" : ""}`}
          >
            <span className="menu-toggle__line menu-toggle__line--top" />
            <span className="menu-toggle__line menu-toggle__line--middle" />
            <span className="menu-toggle__line menu-toggle__line--bottom" />
          </button>

          <button
            onClick={toggleLocale}
            aria-label={labels.switchAriaLabel}
            className="pointer-events-auto nav-category-link font-serif text-[0.6875rem] tracking-widest uppercase text-black"
          >
            {labels.switchTo}
          </button>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Navigation links – small text, top-left aligned */}
          <nav className="px-6 pt-16 lg:px-13 xl:px-17">
            <ul className="flex flex-col items-start gap-4">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="nav-category-link font-serif text-sm tracking-widest text-black"
                >
                  František Pavlík
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="nav-category-link font-serif text-sm tracking-widest lowercase text-black"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
