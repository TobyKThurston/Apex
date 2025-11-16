import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "APEX Terminal",
  description: "Private wallet-signal terminal for prediction markets",
  openGraph: {
    title: "APEX Terminal",
    description: "Private wallet-signal terminal for prediction markets",
    url: "https://apex-terminal.com",
    siteName: "APEX Terminal",
    images: [
      {
        url: "/og-apex.png",
        width: 1200,
        height: 600,
        alt: "APEX Terminal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX Terminal",
    description: "Private wallet-signal terminal for prediction markets",
    images: ["/og-apex.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceMono.variable} antialiased`}
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {children}
      </body>
    </html>
  );
}
