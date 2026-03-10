import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPhotosByCategory, getCategories } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-generate all category pages at build time.
// Replace with Sanity-backed data when integrating CMS.
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} – František Pavlík`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const photos = await getPhotosByCategory(slug);

  return (
    <main className="min-h-screen px-6 pt-24 pb-16">
      {/* Category heading */}
      <h1 className="mb-10 font-serif text-3xl sm:text-4xl tracking-wide text-center">
        {category.title}
      </h1>

      {/* 2-column photo grid (1 column on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
        {photos.map((photo) => (
          <div key={photo.id} className="relative w-full aspect-square overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 640px) 100vw, 40vw"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Back link */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="font-serif text-xs tracking-widest hover:opacity-50 transition-opacity"
        >
          ← Back
        </Link>
      </div>
    </main>
  );
}
