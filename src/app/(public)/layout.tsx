"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
