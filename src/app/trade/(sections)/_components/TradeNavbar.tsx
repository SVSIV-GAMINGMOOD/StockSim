'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileMenu from '@/app/learn/[courseSlug]/_components/ProfileMenu';

const NAV_ITEMS = [
  { label: 'Overview', href: '/trade/overview' },
  { label: 'Holdings', href: '/trade/holdings' },
  { label: 'Orders', href: '/trade/orders' },
  { label: 'History', href: '/trade/history' },
];

export default function TradeNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
              StockSim
            </span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/trade">
            <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Trade
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center rounded-full bg-muted/50 px-2 py-1">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-1.5 text-sm font-medium rounded-full transition-all',
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">

          {/* Watchlist quick action (mobile) */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <Link href="/trade/watchlist" aria-label="Watchlist">
              <Star className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              {NAV_ITEMS.map(item => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className={cn(
                    pathname === item.href && 'font-medium'
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
