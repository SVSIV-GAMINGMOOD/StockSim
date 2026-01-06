'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal, Plus, BarChart2, ArrowUpRight, Trash } from "lucide-react";

interface Stock {
  symbol: string;
  price: string;
  change: string;
}

interface Watchlist {
  id: number;
  name: string;
  stocks: Stock[];
}

const watchlistsData: Watchlist[] = [
  {
    id: 1,
    name: "Tech Giants",
    stocks: [
      { symbol: "AAPL", price: "$173.45", change: "+1.2%" },
      { symbol: "MSFT", price: "$315.10", change: "-0.5%" },
      { symbol: "GOOGL", price: "$138.20", change: "+0.8%" },
    ],
  },
  {
    id: 2,
    name: "Crypto Stocks",
    stocks: [
      { symbol: "COIN", price: "$285.50", change: "+2.1%" },
      { symbol: "RIOT", price: "$24.30", change: "-1.8%" },
      { symbol: "MARA", price: "$11.20", change: "+0.9%" },
    ],
  },
];

export default function WatchlistSidebar() {
  const [activeWatchlist, setActiveWatchlist] = useState<number>(1);

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Watchlists</h2>
        <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      <ScrollArea className="flex-1 px-2 py-3">
        {watchlistsData.map((watchlist) => (
          <div key={watchlist.id} className="mb-4">
            <h3
              className={`px-2 py-1 rounded text-sm font-semibold cursor-pointer ${
                activeWatchlist === watchlist.id
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveWatchlist(watchlist.id)}
            >
              {watchlist.name}
            </h3>

            <Card className="mt-2 p-2 bg-white dark:bg-gray-800 shadow-sm">
              {watchlist.stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {stock.symbol}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex gap-1">
                      {stock.price}
                      <span
                        className={`${
                          stock.change.startsWith("+") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stock.change}
                      </span>
                    </p>
                  </div>

                  {/* Hover options like Zerodha */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <BarChart2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-1 rounded hover:bg-red-500 hover:text-white">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
