import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StockSim",
  description: "A powerful stock market simulator to learn investing using virtual money.",
  applicationName: "StockSim",
  authors: [
    { name: "Sarthak Jain" } 
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  openGraph: {
    title: "StockSim",
    description: "A powerful stock market simulator to learn investing using virtual money.",
    type: "website",
    images: ['/StockSim_preview.png'],
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
