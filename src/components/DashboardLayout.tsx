"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { BookOpen, ChevronRight, LayoutDashboard, LineChart, LogOut, Menu, Moon, Sun, Trophy, UserIcon, Wallet, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { createClient } from '@/lib/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Learn", path: "/learn" },
  { icon: LineChart, label: "Trade", path: "/trade" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: UserIcon, label: "Profile", path: "/profile" },
];

export default function  DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error && data?.user) {
        setUser(data.user);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Image src="/favicon.png" width={40} height={40} alt="logo" />
            </div>
            <span className="font-display text-lg font-bold">StockSim</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3 p-6 border-b border-sidebar-border">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Image src="/favicon.png" width={40} height={40} alt="logo" />
            </div>
            <span className="font-display text-xl font-bold text-sidebar-foreground">StockSim</span>
          </div>

          {/* Virtual Balance Card */}
          <div className="p-4 pt-20 lg:pt-4">
            <div className="bg-sidebar-accent rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Wallet className="w-4 h-4" />
                Virtual Balance
              </div>
              <div className="font-display text-2xl font-bold text-sidebar-foreground">
                ₹1,00,000
              </div>
              <Link href="/trade" className="flex items-center gap-1 text-primary text-sm mt-2 hover:underline">
                Start Trading <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                      pathname === item.path && "bg-sidebar-accent text-sidebar-foreground font-medium"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5",
                      pathname === item.path &&
                      "text-primary"
                    )} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>

              {/* Name + Email */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.user_metadata?.full_name || "Investor"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 p-4">
        {children}
      </main>
    </div>
  )
}
