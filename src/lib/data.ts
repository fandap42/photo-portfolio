import {groq} from 'next-sanity'
import {client} from '@/sanity/lib/client'

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
  subcategoryId: string | null;
  subcategorySortOrder: number;
}

export interface PhotoGroup {
  id: string;
  photos: Photo[];
}

const categoriesQuery = groq`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current
  }
`

const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current
  }
`

const photosByCategoryQuery = groq`
  *[_type == "photo" && category->slug.current == $slug && defined(image.asset)]
    | order(subcategory->sortOrder asc, subcategory->title asc, sortOrder asc, _createdAt desc) {
      "id": _id,
      alt,
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "subcategoryId": subcategory->_id,
      "subcategorySortOrder": coalesce(subcategory->sortOrder, 9999)
    }
`

const featuredPhotoQuery = groq`
  *[_type == "photo" && featured == true && defined(image.asset)]
    | order(sortOrder asc, _createdAt desc)[0] {
      "id": _id,
      alt,
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
`

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery, {}, {next: {revalidate: 60}})
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return client.fetch(categoryBySlugQuery, {slug}, {next: {revalidate: 60}})
}

export async function getPhotoGroupsByCategory(slug: string): Promise<PhotoGroup[]> {
  const photos = await client.fetch<Photo[]>(photosByCategoryQuery, {slug}, {next: {revalidate: 60}})

  const groupedMap = new Map<string, {sortOrder: number; photos: Photo[]}>()

  for (const photo of photos) {
    const groupId = photo.subcategoryId || '__default__'
    const existing = groupedMap.get(groupId)

    if (existing) {
      existing.photos.push(photo)
      continue
    }

    groupedMap.set(groupId, {
      sortOrder: photo.subcategorySortOrder,
      photos: [photo],
    })
  }

  return [...groupedMap.entries()]
    .sort((a, b) => a[1].sortOrder - b[1].sortOrder)
    .map(([id, value]) => ({
      id,
      photos: value.photos,
    }))
}

export async function getFeaturedPhoto(): Promise<Photo | null> {
  return client.fetch(featuredPhotoQuery, {}, {next: {revalidate: 60}})
}
