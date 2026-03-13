import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { getCategories } from "@/lib/data";
import { getRequestLocale } from "@/lib/i18n.server";

export const metadata: Metadata = {
  title: "František Pavlík",
  description: "František Pavlík",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const categories = await getCategories(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black antialiased font-serif">
        <Navigation categories={categories} locale={locale} />
        {children}
      </body>
    </html>
  );
}
