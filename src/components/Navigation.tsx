"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { categories } from "@/lib/data";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu trigger – fixed top-left */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="fixed left-6 top-6 z-40 flex items-center gap-2 text-black hover:opacity-60 transition-opacity"
      >
        <Menu size={28} strokeWidth={1.5} />
        <span className="hidden sm:inline text-sm tracking-widest uppercase font-serif">
          Menu
        </span>
      </button>

      {/* Fullscreen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 text-black hover:opacity-60 transition-opacity"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* Navigation links – small text, top-left aligned */}
          <nav className="pt-16 pl-8">
            <ul className="flex flex-col items-start gap-4">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-base tracking-widest uppercase text-black hover:opacity-50 transition-opacity"
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
