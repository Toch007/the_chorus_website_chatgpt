// app/events/paul/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mendelssohn's Paul — 5th Anniversary Concert | The Chorus Abuja",
  description:
    "Experience Felix Mendelssohn's towering oratorio 'Paulus (Op. 36)' live at the NUC Auditorium, Maitama, Abuja on September 13, 2026. Celebrating 5 years of The Chorus Abuja. Tickets from ₦10,000.",
  openGraph: {
    title: "Mendelssohn's Paul — 5th Anniversary Concert",
    description:
      "The Chorus Abuja presents Mendelssohn's Paulus — our 5th Anniversary Grand Concert. September 13, 2026 at NUC Auditorium, Maitama, Abuja. Tickets from ₦10,000.",
    url: "https://thechorusabuja.org/events/paul",
    siteName: "The Chorus Abuja",
    images: [
      {
        url: "https://thechorusabuja.org/images/paul.jpeg",
        width: 1200,
        height: 630,
        alt: "Mendelssohn's Paul — 5th Anniversary Concert",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendelssohn's Paul — 5th Anniversary Concert | The Chorus Abuja",
    description:
      "September 13, 2026 | NUC Auditorium, Maitama, Abuja. Tickets from ₦10,000. Join us for The Chorus Abuja's 5th Anniversary Grand Concert.",
    images: ["https://thechorusabuja.org/images/paul.jpeg"],
  },
};

export default function PaulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
