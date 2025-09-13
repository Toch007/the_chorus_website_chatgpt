import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // new client wrapper


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
  description: "The Chorus Abuja — Elevating hearts and minds through classical music in Nigeria.",
  metadataBase: new URL("https://thechorusabuja.com"),
  openGraph: {
    title: "The Chorus Abuja",
    description: "Elevating hearts and minds through classical music in Nigeria.",
    url: "https://thechorusabuja.com",
    siteName: "The Chorus Abuja",
    images: [
      {
        url: "https://thechorusabuja.com/og-image.png",
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
    description: "Elevating hearts and minds through classical music in Nigeria.",
    creator: "@thechorusabuja",
    images: ["https://thechorusabuja.com/og-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
