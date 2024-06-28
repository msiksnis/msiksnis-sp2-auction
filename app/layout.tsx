import type { Metadata } from "next";
import { Montserrat, Bangers } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

const bangers = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "Auction House",
  description:
    "Discover unique items and great deals at Auction House. Bid on a wide range of products and win exclusive items. Join our community of buyers and sellers today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${bangers.variable} flex flex-col min-h-screen`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
