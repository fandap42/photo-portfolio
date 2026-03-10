"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
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
      <button
        onClick={toggleLocale}
        aria-label={labels.switchAriaLabel}
        className="fixed right-6 top-6 z-40 font-serif text-xs tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
      >
        {labels.switchTo}
      </button>

      {/* Menu trigger / close button at the same top-left position */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed left-6 top-6 z-[60] text-black hover:opacity-60 transition-opacity"
      >
        {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
      </button>

      {/* Fullscreen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Navigation links – small text, top-left aligned */}
          <nav className="pt-16 pl-8">
            <ul className="flex flex-col items-start gap-4">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-base tracking-widest lowercase text-black hover:opacity-50 transition-opacity"
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
