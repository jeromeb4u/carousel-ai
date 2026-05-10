import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CarouselAI — One Topic. 10 Slides. Done.",
  description:
    "Transform any topic or blog post into a beautifully designed LinkedIn carousel in seconds. AI-powered slide generation, captions, and export.",
  keywords: [
    "LinkedIn carousel",
    "AI design",
    "content creation",
    "social media marketing",
    "carousel generator",
  ],
  openGraph: {
    title: "CarouselAI — One Topic. 10 Slides. Done.",
    description:
      "Transform any topic or blog post into a beautifully designed LinkedIn carousel in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
