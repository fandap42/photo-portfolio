import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { getFeaturedPhoto } from "@/lib/data";

export default async function Home() {
  const featuredPhoto = await getFeaturedPhoto();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Photographer name */}
      <h1 className="mb-8 font-serif text-lg sm:text-xl tracking-wide text-center">
        František Pavlík
      </h1>

      {/* Featured photo */}
      <div className="relative w-full max-w-[260px] aspect-square overflow-hidden mb-8">
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
        <SiInstagram size={44} />
      </a>

      {/* Email */}
      <a
        href="mailto:pavlik.frantisek42@gmail.com"
        className="font-serif text-[0.6875rem] tracking-widest text-black hover:opacity-50 transition-opacity"
      >
        pavlik.frantisek42@gmail.com
      </a>
    </main>
  );
}
