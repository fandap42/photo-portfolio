# František Pavlík – Photography Portfolio

A minimalist photography portfolio built with [Next.js](https://nextjs.org) (App Router), Tailwind CSS, and Lucide React. Structured for easy Sanity CMS integration.

## Features

- **Homepage** – Centered layout with photographer name, featured photo, Instagram icon, and email.
- **Fullscreen navigation overlay** – Hamburger/Menu button opens a clean white overlay with category links (Krajiny, Street, Akce, Sport).
- **Gallery pages** – `/category/[slug]` with a strict 2-column image grid.
- **Serif design** – Uses Playfair Display (Google Fonts) with a strict white-mode palette.
- **Mock data layer** – `src/lib/data.ts` exports typed helpers ready to be swapped for Sanity GROQ queries.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Sanity CMS Integration

The project is now connected to Sanity headless CMS.

### Content model in Studio

- Category: category name and slug used in route `/category/[slug]`
- Photo: uploaded image, alt text, category reference, sort order, and featured flag for homepage

### Open Studio

Run the app and open:

- http://localhost:3000/studio

### How to manage photos

1. Create categories in `Categories`
2. Open one category document (this is one gallery page)
3. Add `Photo groups` inside the category
4. Upload images in each group's `Photos` array (you can add multiple files at once)
5. Reorder groups with `sortOrder` and array drag-and-drop
6. Delete images directly inside the group's `Photos`

### Language toggle and auto locale

- Categories support bilingual titles (`Title (Czech)` and `Title (English)`)
- The site automatically defaults to Czech for browsers with Czech locale, otherwise English
- Visitors can switch language using the `CZ/EN` toggle in the top-right corner
- Selected language is saved in a cookie and reused on next visit

### Required environment variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-10
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
