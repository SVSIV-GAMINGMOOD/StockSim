"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Image src="/favicon.png" width={40} height={40} alt="logo" />
              </div>
              <Link href='/' className="font-display text-xl font-bold">StockSim</Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href={isHome ? "#features" : "/#features"}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href={isHome ? "#how-it-works" : "/#how-it-works"}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </Link>
              <Link
                href={isHome ? "#testimonials" : "/#testimonials"}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Reviews
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </Button>

              <div className="hidden md:flex items-center gap-3">
                <Link href='/auth'><Button variant="ghost" size="sm">Log In</Button></Link>
                <Link href='/auth?signup=true'><Button size="sm">Get Started</Button></Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-lg border border-border"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
              <Link
                href={isHome ? "#features" : "/#features"}
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>

              <Link
                href={isHome ? "#how-it-works" : "/#how-it-works"}
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </Link>

              <Link
                href={isHome ? "#testimonials" : "/#testimonials"}
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Reviews
              </Link>

              <div className="flex gap-3 pt-2">
                <Link href='/auth'>
                  <Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>
                    Log In
                  </Button>
                </Link>
                <Link href='/auth?signup=true'>
                  <Button className="w-full" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
