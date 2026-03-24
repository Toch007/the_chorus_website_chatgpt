// app/events/5th-anniversary/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5th Anniversary Celebration — The Chorus Abuja",
  description:
    "The Chorus Abuja marks 5 years of musical excellence with a grand anniversary concert featuring Mendelssohn's Paulus (Op. 36) on September 13, 2026 at NUC Auditorium, Maitama, Abuja.",
  openGraph: {
    title: "5th Anniversary Celebration — The Chorus Abuja",
    description:
      "Five years of bringing classical music to Abuja. Join us for our anniversary grand concert featuring Mendelssohn's Paulus on September 13, 2026.",
    url: "https://thechorusabuja.org/events/5th-anniversary",
    siteName: "The Chorus Abuja",
    images: [
      {
        url: "https://thechorusabuja.org/images/paul.jpeg",
        width: 1200,
        height: 630,
        alt: "The Chorus Abuja 5th Anniversary Celebration",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Chorus Abuja — 5th Anniversary Celebration",
    description:
      "Five years of choral excellence. Mendelssohn's Paulus | September 13, 2026 | NUC Auditorium, Maitama, Abuja.",
    images: ["https://thechorusabuja.org/images/paul.jpeg"],
  },
};

export default function AnniversaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
