import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/modals/modal-provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Linguify",
    default: "Linguify"
  },
  description: "Its an online language learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={nunito.className}>
          <Toaster />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
