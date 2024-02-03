// "use client";

import "../../globals.css"
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Loading from "@/components/Loading";
import MainContainer from "@/components/MainContainer";
import Intro from "@/components/Intro";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trimr",
  description: "A user shortener service by Vidit Khandelwal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col items-center bg-black px-4 p-8 antialiased font-medium ${figtree.className}`}
      >
        <MainContainer>
          <Intro />
          {children}
        </MainContainer>
      </body>
    </html>
  );
}
