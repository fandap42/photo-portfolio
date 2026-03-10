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

Replace the helper functions in `src/lib/data.ts` with Sanity GROQ queries using the `@sanity/client` package when ready.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
