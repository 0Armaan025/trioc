import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";


export const metadata: Metadata = {
  title: "Trioc",
  description: "Customer dealing in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
