import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import PageWrapper from "@/components/PageWrapper";
import "./globals.css";

const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archonium - Forging the Future",
  description: "The world's leading technology conglomerate, shaping the future of innovation.",
  openGraph: {
    title: "Archonium - Forging the Future",
    description: "The world's leading technology conglomerate, shaping the future of innovation.",
    url: "https://archonium.com", // Placeholder URL
    siteName: "Archonium",
    images: [
      {
        url: "/og-image.png", // Placeholder image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archonium - Forging the Future",
    description: "The world's leading technology conglomerate, shaping the future of innovation.",
    images: ["/og-image.png"], // Placeholder image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.className} bg-archonium-black text-archonium-white`}>
        <PageWrapper>{children}</PageWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "Archonium",
            "url": "https://archonium.com", // Placeholder URL
            "logo": "https://archonium.com/logo.png", // Placeholder URL
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-555-5555", // Placeholder phone
              "contactType": "customer service"
            }
          }) }}
        />
      </body>
    </html>
  );
}
