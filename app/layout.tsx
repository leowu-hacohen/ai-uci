import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artificial Intelligence @ UCI",
  description:
    "Hands-on learning, real projects, and a community that builds together. Workshops, hackathons, and speakers at UC Irvine.",
  openGraph: {
    title: "Artificial Intelligence @ UCI",
    description:
      "Hands-on learning, real projects, and a community that builds together. Workshops, hackathons, and speakers at UC Irvine.",
    images: ["/anteater-logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Intelligence @ UCI",
    description:
      "Hands-on learning, real projects, and a community that builds together. Workshops, hackathons, and speakers at UC Irvine.",
    images: ["/anteater-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
