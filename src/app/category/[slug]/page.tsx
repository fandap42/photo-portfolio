import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPhotoGroupsByCategory, getCategorySlugs } from "@/lib/data";
import { getLocaleLabels } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-generate all category pages at build time.
// Replace with Sanity-backed data when integrating CMS.
export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const category = await getCategoryBySlug(slug, locale);
  if (!category) return {};
  return {
    title: `${category.title} – František Pavlík`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const labels = getLocaleLabels(locale);
  const category = await getCategoryBySlug(slug, locale);

  if (!category) notFound();

  const photoGroups = await getPhotoGroupsByCategory(slug);

  function getImageSizes(photoCount: number): string {
    if (photoCount <= 1) return "(max-width: 640px) 100vw, (max-width: 1400px) 92vw, 1800px";
    if (photoCount === 2) return "(max-width: 640px) 100vw, (max-width: 1400px) 46vw, 900px";
    return "(max-width: 640px) 100vw, (max-width: 1400px) 31vw, 620px";
  }

  return (
    <main className="min-h-screen px-6 lg:px-12 xl:px-16 pt-[calc(env(safe-area-inset-top)+5.5rem)] sm:pt-28 pb-16">
      {/* Category heading */}
      <h1 className="mb-10 font-serif text-xl sm:text-2xl tracking-wide text-center">
        {category.title}
      </h1>

      {/* Subcategory blocks with moderate separation and no visible labels */}
      <div className="w-full max-w-[min(92vw,1300px)] mx-auto">
        {photoGroups.map((group) => (
          <section key={group.id} className="mb-3 sm:mb-4 last:mb-0">
            <div
              className={`grid gap-3 sm:gap-4 ${
                group.photos.length <= 1
                  ? "grid-cols-1"
                  : group.photos.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {group.photos.map((photo) => (
                <div key={photo.id}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-auto pointer-events-none"
                    sizes={getImageSizes(group.photos.length)}
                    quality={95}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Back link */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="font-serif text-xs tracking-widest hover:opacity-50 transition-opacity"
        >
          ← {labels.back}
        </Link>
      </div>
    </main>
  );
}
