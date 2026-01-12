'use client';

import { useEffect, useMemo, useState } from "react";
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
import { useStockSearch } from "@/app/hooks/useStockSearch";
import Link from "next/link";

/* -------------------- TYPES -------------------- */

interface WatchlistStock {
  id: string;
  symbol: string;
}

interface Watchlist {
  id: string;
  name: string;
  stocks: WatchlistStock[];
}

interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

interface InstrumentMeta {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  sheetPrice: number | null;
  sheetChangePct: number | null;
  delay: number | null;
}

/* -------------------- COMPONENT -------------------- */

export default function WatchlistSidebar({
  initialWatchlists = [],
}: {
  initialWatchlists: Watchlist[];
}) {
  const [watchlists, setWatchlists] =
    useState<Watchlist[]>(initialWatchlists);

  const [activeId, setActiveId] = useState<string | undefined>();

  useEffect(() => {
    if (!activeId && watchlists.length > 0) {
      setActiveId(watchlists[0].id);
    }
  }, [watchlists, activeId]);

  const activeWatchlist = watchlists.find(
    (w) => w.id === activeId
  );

  const [instrumentMap, setInstrumentMap] = useState<
    Record<string, InstrumentMeta>
  >({});

  useEffect(() => {
    let mounted = true;

    async function loadInstruments() {
      try {
        const res = await fetch("/api/instruments");
        const data: InstrumentMeta[] = await res.json();

        if (!mounted) return;

        const map = Object.fromEntries(
          data.map((i) => [i.symbol, i])
        );

        setInstrumentMap(map);
      } catch (e) {
        console.error("Failed to load instruments");
      }
    }

    loadInstruments();

    return () => {
      mounted = false;
    };
  }, []);


  /* ---------------- Search ---------------- */

  const {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    isSearchOpen,
    setIsSearchOpen,
    searchInputRef,
  } = useStockSearch();

  return (
    <aside className="hidden md:flex flex-col w-75 h-screen border-r bg-background">
      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          {/* Search icon */}
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

          {/* Input */}
          <Input
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search & add"
            className="pl-8 pr-20 h-9 text-sm"
          />

          {/* Ctrl + K hint */}
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
              Ctrl
            </kbd>
            <span>+</span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
              K
            </kbd>
          </div>
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

      <ScrollArea className="flex-1">
        {isSearchOpen ? (
          <SearchResults
            results={results as SearchResult[]}
            loading={loading}
            onSelect={() => {
              setSearchTerm("");
              setIsSearchOpen(false);
            }}
          />
        ) : (
          activeWatchlist && (
            <WatchlistStocks
              watchlist={activeWatchlist}
              // prices={prices}
              instrumentMap={instrumentMap}
            />
          )
        )}
      </ScrollArea>
    </aside>
  );
}

/* -------------------- WATCHLIST STOCKS -------------------- */

function WatchlistStocks({
  watchlist,
  instrumentMap,
}: {
  watchlist: Watchlist;
  instrumentMap: Record<string, InstrumentMeta>;
}) {
  if (!watchlist.stocks.length) {
    return (
      <p className="text-sm text-muted-foreground p-4 text-center">
        No stocks in this watchlist
      </p>
    );
  }

  return (
    <div className="divide-y">
      {watchlist.stocks.map((stock) => {
        const info = instrumentMap[stock.symbol];

        const price = info?.sheetPrice;
        const changePct = info?.sheetChangePct;
        const isPositive = (changePct ?? 0) >= 0;

        const hasChange =
          typeof changePct === "number" && !Number.isNaN(changePct);

        // console.log(stock.symbol, live.price, live.changePercent)

        return (
          <div
            key={stock.id}
            className="group flex items-center px-3 py-2 hover:bg-muted"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{stock.symbol}</p>
              <p className="text-xs text-muted-foreground">
                {info?.exchange ?? "—"} · {info?.type ?? "EQ"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">
                {price !== null && price !== undefined
                  ? `${info?.exchange === "NSE" || info?.exchange === "BSE" ? "₹" : "$"}${price.toFixed(2)}`
                  : "--"}
              </p>

              <p
                className={cn(
                  "text-xs",
                  hasChange
                    ? isPositive
                      ? "text-green-600"
                      : "text-red-600"
                    : "text-muted-foreground"
                )}
              >
                {hasChange
                  ? `${isPositive ? "+" : ""}${changePct.toFixed(2)}%`
                  : "--"}
              </p>
            </div>

            {/* NEEDS DYNAMIC ROUTING ! */}
            <div className="ml-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <Link
                href={`/trade/stocks/${stock.symbol}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted/10 transition-colors"
                title="Open in new tab"
              >
                <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-blue-500 transition-colors" />
              </Link>

              <button
                onClick={() => console.log("Chart clicked")}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted/10 transition-colors"
                title="View chart"
              >
                <BarChart2 className="w-4 h-4 text-muted-foreground hover:text-green-500 transition-colors" />
              </button>

              <button
                onClick={() => console.log("Delete clicked")}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600 transition-colors" />
              </button>
            </div>


          </div>
        );
      })}
    </div>
  );
}

/* -------------------- SEARCH RESULTS -------------------- */

function SearchResults({
  results,
  loading,
  onSelect,
}: {
  results: SearchResult[];
  loading: boolean;
  onSelect: () => void;
}) {
  if (loading) {
    return (
      <p className="text-sm text-muted-foreground p-4 text-center">
        Searching…
      </p>
    );
  }

  if (!results.length) {
    return (
      <p className="text-sm text-muted-foreground p-4 text-center">
        No instruments found
      </p>
    );
  }

  return (
    <div className="divide-y">
      {results.map((stock) => (
        <div
          key={stock.symbol}
          onClick={onSelect}
          className="group flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
        >
          <div className="flex-1">
            <p className="text-sm font-medium">{stock.name}</p>
            <p className="text-xs text-muted-foreground">
              {stock.symbol} | {stock.exchange} | {stock.type}
            </p>
          </div>

          <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
        </div>
      ))}
    </div>
  );
}
