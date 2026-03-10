import {groq} from 'next-sanity'
import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'
import type {Locale} from '@/lib/i18n'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

const HOMEPAGE_FEATURED_CATEGORY_SLUG = 'homepage-featured'

export interface Category {
  id: string;
  slug: string;
  title: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface RawPhoto extends Omit<Photo, 'src'> {
  src?: string;
  source: SanityImageSource;
}

interface RawPhotoGroup {
  id: string;
  photos: RawPhoto[];
}

export interface PhotoGroup {
  id: string;
  photos: Photo[];
}

const categoriesQuery = groq`
  *[_type == "category" && defined(slug.current) && slug.current != $homepageFeaturedSlug]
    | order(coalesce(titleEn, title, titleCs) asc) {
    "id": _id,
    "title": select(
      $locale == "cs" => coalesce(titleCs, titleEn, title),
      coalesce(titleEn, titleCs, title)
    ),
    "slug": slug.current
  }
`

const categorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current) && slug.current != $homepageFeaturedSlug] {
    "slug": slug.current
  }
`

const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    "id": _id,
    "title": select(
      $locale == "cs" => coalesce(titleCs, titleEn, title),
      coalesce(titleEn, titleCs, title)
    ),
    "slug": slug.current
  }
`

const photosByCategoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    "groups": coalesce(groups, []) | order(sortOrder asc) {
      "id": _key,
      "photos": coalesce(photos, [])[defined(asset)] {
        "id": _key,
        "alt": coalesce(alt, ""),
        "src": asset->url,
        "source": {
          "asset": asset,
          "crop": crop,
          "hotspot": hotspot
        },
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
  }.groups
`

const featuredPhotoFromHomepageCategoryQuery = groq`
  *[_type == "category" && slug.current == $homepageFeaturedSlug && defined(groups[0].photos[0].asset)][0] {
      "id": coalesce(groups[0].photos[0]._key, _id),
      "alt": coalesce(groups[0].photos[0].alt, "Featured photograph"),
      "src": groups[0].photos[0].asset->url,
      "source": {
        "asset": groups[0].photos[0].asset,
        "crop": groups[0].photos[0].crop,
        "hotspot": groups[0].photos[0].hotspot
      },
      "width": groups[0].photos[0].asset->metadata.dimensions.width,
      "height": groups[0].photos[0].asset->metadata.dimensions.height
    }
`

const featuredPhotoFallbackQuery = groq`
  *[_type == "category" && slug.current != $homepageFeaturedSlug && defined(groups[0].photos[0].asset)]
    | order(coalesce(titleEn, title, titleCs) asc)[0] {
      "id": coalesce(groups[0].photos[0]._key, _id),
      "alt": coalesce(groups[0].photos[0].alt, "Featured photograph"),
      "src": groups[0].photos[0].asset->url,
      "source": {
        "asset": groups[0].photos[0].asset,
        "crop": groups[0].photos[0].crop,
        "hotspot": groups[0].photos[0].hotspot
      },
      "width": groups[0].photos[0].asset->metadata.dimensions.width,
      "height": groups[0].photos[0].asset->metadata.dimensions.height
    }
`

function buildImageUrl(source: SanityImageSource, width: number): string {
  return urlFor(source).auto('format').fit('max').quality(95).width(width).url()
}

export async function getCategories(locale: Locale): Promise<Category[]> {
  return client.fetch(
    categoriesQuery,
    {locale, homepageFeaturedSlug: HOMEPAGE_FEATURED_CATEGORY_SLUG},
    {next: {revalidate: 60}},
  )
}

export async function getCategorySlugs(): Promise<string[]> {
  const rows = await client.fetch<{slug: string}[]>(
    categorySlugsQuery,
    {homepageFeaturedSlug: HOMEPAGE_FEATURED_CATEGORY_SLUG},
    {next: {revalidate: 60}},
  )
  return rows.map((row) => row.slug)
}

export async function getCategoryBySlug(slug: string, locale: Locale): Promise<Category | null> {
  return client.fetch(categoryBySlugQuery, {slug, locale}, {next: {revalidate: 60}})
}

export async function getPhotoGroupsByCategory(slug: string): Promise<PhotoGroup[]> {
  const groups = await client.fetch<RawPhotoGroup[] | null>(photosByCategoryQuery, {slug}, {next: {revalidate: 60}})
  if (!groups) return []

  return groups.map((group) => ({
    ...group,
    photos: group.photos.map((photo) => ({
      id: photo.id,
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
      src: buildImageUrl(photo.source, Math.min(photo.width, 3200)),
    })),
  }))
}

export async function getFeaturedPhoto(): Promise<Photo | null> {
  const featuredParams = {homepageFeaturedSlug: HOMEPAGE_FEATURED_CATEGORY_SLUG}
  const photo = await client.fetch<(RawPhoto & {id: string}) | null>(
    featuredPhotoFromHomepageCategoryQuery,
    featuredParams,
    {next: {revalidate: 60}},
  )
  const fallbackPhoto = photo
    ? null
    : await client.fetch<(RawPhoto & {id: string}) | null>(featuredPhotoFallbackQuery, featuredParams, {
        next: {revalidate: 60},
      })
  const selectedPhoto = photo || fallbackPhoto
  if (!selectedPhoto) return null

  return {
    id: selectedPhoto.id,
    alt: selectedPhoto.alt,
    width: selectedPhoto.width,
    height: selectedPhoto.height,
    src: buildImageUrl(selectedPhoto.source, Math.min(selectedPhoto.width, 1200)),
  }
}
