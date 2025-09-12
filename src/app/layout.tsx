import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/nav"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Felipe Castro - Escritos para minha posteridade",
    template: "%s | Felipe Castro"
  },
  description: "Aqui eu compartilho escritos que eu pretendo ler no futuro e dar boas risadas. Peripécias do Felipe Castro.",
  keywords: ["Felipe Castro", "escritos", "blog", "pessoal", "reflexões", "histórias", "peripécias"],
  authors: [{ name: "Felipe Castro" }],
  creator: "Felipe Castro",
  publisher: "Felipe Castro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://felipecastro.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://felipecastro.site",
    title: "Felipe Castro - Escritos para minha posteridade",
    description: "Aqui eu compartilho escritos que eu pretendo ler no futuro e dar boas risadas. Peripécias do Felipe Castro.",
    siteName: "Felipe Castro",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Felipe Castro - Escritos para minha posteridade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Castro - Escritos para minha posteridade",
    description: "Aqui eu compartilho escritos que eu pretendo ler no futuro e dar boas risadas. Peripécias do Felipe Castro.",
    images: ["/og-image.svg"],
    creator: "@castroofelipee",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Felipe Castro",
    "url": "https://felipecastro.site",
    "description": "Aqui eu compartilho escritos que eu pretendo ler no futuro e dar boas risadas.",
    "sameAs": [
      "https://github.com/castroofelipee/felipe"
    ]
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
