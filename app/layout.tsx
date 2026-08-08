import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";
import RegisterServiceWorker from "@/components/pwa/RegisterServiceWorker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Christian Soldier",
  description: "Fight the good fight of faith.",
  applicationName: "Christian Soldier",

  appleWebApp: {
    capable: true,
    title: "Christian Soldier",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#111827] text-white`}
      >
        {children}

        <RegisterServiceWorker />

        <Toaster
          position="top-right"
          richColors
        />
      </body>
    </html>
  );
}