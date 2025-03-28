import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "@/app/provider";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className} suppressHydrationWarning>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
