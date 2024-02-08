import "../globals.css";
import ContextWrapper from "@/components/ContextWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trimr - URL Shortener Service",
  description: "Generate short URLs with click tracking. Really fast.",
  authors: [{ name: "Vidit Khandelwal", url: "https://.viditkhandelwal.com" }],
  applicationName: "Trimr",
  keywords: [
    "Trimr",
    "URL Shortener",
    "URL Shortener Service",
    "link management",
    "click tracking",
    "short links",
    "custom URLs",
    "analytics",
    "URL redirection",
    "link shortening",
    "brand links",
    "link analytics",
    "URL management",
    "shortened link tracking",
    "custom link creation",
    "digital marketing tools",
    "SEO friendly URLs",
    "link customization",
    "URL branding",
    "Vidit Khandelwal",
    "Vidit",
    "DePauw",
    "DePauw University",
    "DPU",
    "Indianapolis",
    "Computer Science",
    "graduate",
    "entry level",
    "CS",
    "CSE",
    "software engineer",
    "web developer",
    "UI Engineer",
    "ICSA",
  ],
  openGraph: {
    title: "Trimr",
    description: "Generate short URLs with click tracking. Really fast.",
    url: "https://v-k.pw",
    siteName: "Trimr",
    images: [
      {
        url: "https://v-k.pw/trimr-og.jpg",
        alt: "Trimr title, tagline, and URL sticker, in text on a gradient background",
        width: 1200,
        height: 675,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContextWrapper>{children}</ContextWrapper>;
}
