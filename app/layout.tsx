import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // new client wrapper
import PerformanceTracker from "@/components/PerformanceTracker";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx
export const metadata = {
  title: {
    default: "The Chorus Abuja",
    template: "%s | The Chorus Abuja",
  },
  description:
    "The Chorus Abuja — Elevating hearts and minds through classical music in Nigeria.",
  metadataBase: new URL("https://thechorusabuja.org"),
  icons: {
    icon: [
      {
        url: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/icons/icon-144x144.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/icon-144x144.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/icons/icon-144x144.png",
    apple: "/icons/icon-144x144.png",
  },
  openGraph: {
    title: "The Chorus Abuja",
    description:
      "Elevating hearts and minds through classical music in Nigeria.",
    url: "https://thechorusabuja.org",
    siteName: "The Chorus Abuja",
    images: [
      {
        url: "https://thechorusabuja.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Chorus Abuja",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Chorus Abuja",
    description:
      "Elevating hearts and minds through classical music in Nigeria.",
    creator: "@thechorusabuja",
    images: ["https://thechorusabuja.org/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ClientLayout>{children}</ClientLayout>
          <PerformanceTracker />
        </ErrorBoundary>
      </body>
    </html>
  );
}
