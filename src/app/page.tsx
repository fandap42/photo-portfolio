import Image from "next/image";
import { Instagram } from "lucide-react";
import { getFeaturedPhoto } from "@/lib/data";

export default async function Home() {
  const featuredPhoto = await getFeaturedPhoto();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Photographer name */}
      <h1 className="mb-8 font-serif text-xl sm:text-2xl tracking-wide text-center">
        František Pavlík
      </h1>

      {/* Featured photo */}
      <div className="relative w-full max-w-[300px] aspect-square overflow-hidden mb-8">
        <Image
          src={
            featuredPhoto?.src ||
            "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=600&auto=format&fit=crop&q=80"
          }
          alt={featuredPhoto?.alt || "Featured photograph by František Pavlík"}
          fill
          className="object-contain"
          priority
          sizes="300px"
        />
      </div>

      {/* Instagram icon */}
      <a
        href="https://www.instagram.com/fandapka/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="mb-4 text-black hover:opacity-50 transition-opacity"
      >
        <Instagram size={48} strokeWidth={1.25} />
      </a>

      {/* Email */}
      <a
        href="mailto:pavlik.frantisek42@gmail.com"
        className="font-serif text-xs tracking-widest text-black hover:opacity-50 transition-opacity"
      >
        pavlik.frantisek42@gmail.com
      </a>
    </main>
  );
}
