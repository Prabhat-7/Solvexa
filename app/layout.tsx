import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "@/provider";

const outfit = Outfit({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Solvexa",
  description: "Create notes from your pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
