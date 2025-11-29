import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Ayush Sood",
  description: "Personal blog by Ayush Sood",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="max-w-2xl mx-auto px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
