import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: "RESUME-BUILDER",
  description: "Next js resume builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
