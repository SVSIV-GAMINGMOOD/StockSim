"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

interface CourseNavbarProps {
  avatar_url: string;
  username: string
}

export default function CourseNavbar({ avatar_url, username }: CourseNavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
                StockSim
              </span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/learn">
              <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Learn
              </span>
            </Link>
          </div>

          {/* RIGHT SECTION (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Hi, {username}</span>
            <ProfileMenu avatar={avatar_url} />
          </div>

          {/* RIGHT SECTION (mobile) */}
          <div className="md:hidden flex items-center">
            <ProfileMenu avatar={avatar_url} mobile />
          </div>
        </div>
      </div>
    </nav>
  );
}
