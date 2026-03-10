// Mock data layer – ready to be replaced with Sanity CMS queries.
// When integrating Sanity, replace these exported functions with
// GROQ queries using the Sanity client.

export interface Category {
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

export const categories: Category[] = [
  { slug: "krajiny", title: "Krajiny" },
  { slug: "street", title: "Street" },
  { slug: "akce", title: "Akce" },
  { slug: "sport", title: "Sport" },
];

const photosByCategory: Record<string, Photo[]> = {
  krajiny: [
    {
      id: "k1",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
      alt: "Mountain landscape",
      width: 800,
      height: 800,
    },
    {
      id: "k2",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
      alt: "Valley at golden hour",
      width: 800,
      height: 800,
    },
    {
      id: "k3",
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=80",
      alt: "Aerial forest view",
      width: 800,
      height: 800,
    },
    {
      id: "k4",
      src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&auto=format&fit=crop&q=80",
      alt: "Rocky coastline",
      width: 800,
      height: 800,
    },
    {
      id: "k5",
      src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop&q=80",
      alt: "Lake reflection",
      width: 800,
      height: 800,
    },
    {
      id: "k6",
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=80",
      alt: "Misty forest",
      width: 800,
      height: 800,
    },
    {
      id: "k7",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
      alt: "Snow capped peaks",
      width: 800,
      height: 800,
    },
    {
      id: "k8",
      src: "https://images.unsplash.com/photo-1482192505345-5852b41cd56f?w=800&auto=format&fit=crop&q=80",
      alt: "Desert dunes",
      width: 800,
      height: 800,
    },
  ],
  street: [
    {
      id: "s1",
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=80",
      alt: "City skyline",
      width: 800,
      height: 800,
    },
    {
      id: "s2",
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
      alt: "Urban street scene",
      width: 800,
      height: 800,
    },
    {
      id: "s3",
      src: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&auto=format&fit=crop&q=80",
      alt: "Night city lights",
      width: 800,
      height: 800,
    },
    {
      id: "s4",
      src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80",
      alt: "Busy street corner",
      width: 800,
      height: 800,
    },
    {
      id: "s5",
      src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop&q=80",
      alt: "Rainy street reflection",
      width: 800,
      height: 800,
    },
    {
      id: "s6",
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=80",
      alt: "Pedestrians crossing",
      width: 800,
      height: 800,
    },
  ],
  akce: [
    {
      id: "a1",
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
      alt: "Concert crowd",
      width: 800,
      height: 800,
    },
    {
      id: "a2",
      src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=80",
      alt: "Festival lights",
      width: 800,
      height: 800,
    },
    {
      id: "a3",
      src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=80",
      alt: "Live performance",
      width: 800,
      height: 800,
    },
    {
      id: "a4",
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      alt: "Event gathering",
      width: 800,
      height: 800,
    },
    {
      id: "a5",
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
      alt: "Dance performance",
      width: 800,
      height: 800,
    },
    {
      id: "a6",
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80",
      alt: "Outdoor event",
      width: 800,
      height: 800,
    },
    {
      id: "a7",
      src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
      alt: "Music festival stage",
      width: 800,
      height: 800,
    },
  ],
  sport: [
    {
      id: "sp1",
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
      alt: "Runner on track",
      width: 800,
      height: 800,
    },
    {
      id: "sp2",
      src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80",
      alt: "Cyclist on road",
      width: 800,
      height: 800,
    },
    {
      id: "sp3",
      src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80",
      alt: "Soccer match",
      width: 800,
      height: 800,
    },
    {
      id: "sp4",
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
      alt: "Gym workout",
      width: 800,
      height: 800,
    },
    {
      id: "sp5",
      src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
      alt: "Basketball game",
      width: 800,
      height: 800,
    },
    {
      id: "sp6",
      src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=80",
      alt: "Swimming competition",
      width: 800,
      height: 800,
    },
    {
      id: "sp7",
      src: "https://images.unsplash.com/photo-1486218119243-13301bc199c6?w=800&auto=format&fit=crop&q=80",
      alt: "Marathon race",
      width: 800,
      height: 800,
    },
    {
      id: "sp8",
      src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&auto=format&fit=crop&q=80",
      alt: "Tennis match",
      width: 800,
      height: 800,
    },
  ],
};

/** Fetch all categories. Replace with Sanity GROQ query when ready. */
export function getCategories(): Category[] {
  return categories;
}

/** Fetch a single category by slug. Replace with Sanity GROQ query when ready. */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Fetch photos for a given category slug. Replace with Sanity GROQ query when ready. */
export function getPhotosByCategory(slug: string): Photo[] {
  return photosByCategory[slug] ?? [];
}
