import type { Metadata } from "next";
import "./globals.css";

/*
 * layout.tsx — DO NOT MODIFY
 * Metadata is populated by /init-landing from src/content/landing.ts
 * Font imports are added by /init-landing based on INTAKE typography vibe
 */

// TODO(/init-landing): replace with metadata derived from landing.ts
export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
