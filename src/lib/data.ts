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
    | order(sortOrder asc, _createdAt desc) {
      "id": _id,
      alt,
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
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

export async function getPhotosByCategory(slug: string): Promise<Photo[]> {
  return client.fetch(photosByCategoryQuery, {slug}, {next: {revalidate: 60}})
}

export async function getFeaturedPhoto(): Promise<Photo | null> {
  return client.fetch(featuredPhotoQuery, {}, {next: {revalidate: 60}})
}
