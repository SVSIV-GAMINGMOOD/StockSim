"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Moon, Sun, User, LogOut, Trophy, TrendingUp } from "lucide-react";
import Image from "next/image";

interface ProfileMenuProps {
  avatar?: string;
  mobile?: boolean;
}

export default function ProfileMenu({ avatar, mobile = false }: ProfileMenuProps) {
  const { theme, setTheme } = useTheme();

  const commonItemClasses = mobile
    ? "px-3 py-2 text-sm rounded-lg hover:bg-muted w-full flex items-center gap-2"
    : "flex items-center gap-2 px-2 py-1 hover:bg-muted transition rounded";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={mobile ? "w-full" : "outline-none"}>
        <Image
          src={avatar || '/default-user.png'}
          alt="avatar"
          width={mobile ? 28 : 36}
          height={mobile ? 28 : 36}
          className={`rounded-full border cursor-pointer object-cover ${mobile ? "h-7 w-7" : "h-9 w-9"}`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={mobile ? "w-full mt-1" : "w-48"}
      >
        {!mobile && <DropdownMenuLabel>My Account</DropdownMenuLabel>}
        {!mobile && <DropdownMenuSeparator />}

        <DropdownMenuItem
          className={commonItemClasses}
          onClick={() => window.location.href = "/profile"}
        >
          <User className="h-4 w-4" /> My Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          className={commonItemClasses}
          onClick={() => window.location.href = "/trade"}
        >
          <TrendingUp className="h-4 w-4" /> Trade
        </DropdownMenuItem>

        <DropdownMenuItem
          className={commonItemClasses}
          onClick={() => window.location.href = "/leaderboard"}
        >
          <Trophy className="h-4 w-4" /> Leaderboard
        </DropdownMenuItem>

        {!mobile && <DropdownMenuSeparator />}

        {/* Appearance Toggle */}
        <DropdownMenuItem
          className={commonItemClasses}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          Appearance
          {!mobile && <span className="ml-auto text-xs capitalize">{theme}</span>}
        </DropdownMenuItem>

        {!mobile && <DropdownMenuSeparator />}

        <DropdownMenuItem
          className={`${commonItemClasses} text-red-600`}
          onClick={() => console.log("Sign Out clicked")} // replace with real sign out
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
