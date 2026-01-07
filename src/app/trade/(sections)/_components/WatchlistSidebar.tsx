'use client';

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  ArrowUpRight,
  BarChart2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

interface Watchlist {
  id: number;
  name: string;
  stocks: Stock[];
}

const watchlists: Watchlist[] = [
  {
    id: 1,
    name: "WATCHLIST 1",
    stocks: [
      { symbol: "RELIANCE", price: 2489.4, change: 1.12 },
      { symbol: "TCS", price: 3781.2, change: -0.34 },
      { symbol: "INFY", price: 1562.8, change: 0.58 },
    ],
  },
  {
    id: 2,
    name: "WATCHLIST 2",
    stocks: [
      { symbol: "HDFCBANK", price: 1654.9, change: -0.81 },
      { symbol: "ICICIBANK", price: 1021.3, change: 0.94 },
    ],
  },
];

export default function WatchlistSidebar() {
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");

  const activeWatchlist = watchlists.find(w => w.id === activeId)!;

  const filteredStocks = activeWatchlist.stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="hidden md:flex flex-col w-75 h-screen border-r bg-background">
      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search & add"
            className="pl-8 h-9 text-sm"
          />
        </div>
      </div>

      {/* Watchlist Tabs */}
      <div className="flex items-center gap-2 px-3 py-2 border-b overflow-x-auto">
        {watchlists.map((wl) => (
          <button
            key={wl.id}
            onClick={() => setActiveId(wl.id)}
            className={cn(
              "text-xs px-2 py-1 rounded whitespace-nowrap transition",
              activeId === wl.id
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {wl.name}
          </button>
        ))}
        <button className="ml-auto p-1 rounded hover:bg-muted">
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Stocks */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredStocks.map((stock) => {
            const isUp = stock.change >= 0;

            return (
              <div
                key={stock.symbol}
                className="group flex items-center px-3 py-2 hover:bg-muted transition"
              >
                {/* Symbol */}
                <div className="flex-1">
                  <p className="text-sm font-medium">{stock.symbol}</p>
                </div>

                {/* Price */}
                <div className="text-right mr-3">
                  <p className="text-sm font-medium">
                    {stock.price.toFixed(2)}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      isUp ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {isUp ? "+" : ""}
                    {stock.change.toFixed(2)}%
                  </p>
                </div>

                {/* Hover Actions */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="p-1 rounded hover:bg-background">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded hover:bg-background">
                    <BarChart2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded hover:bg-red-500 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredStocks.length === 0 && (
            <p className="text-sm text-muted-foreground p-4 text-center">
              No instruments found
            </p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
