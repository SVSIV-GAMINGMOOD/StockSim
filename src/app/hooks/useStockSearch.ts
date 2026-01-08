'use client';

import { searchStocks } from "@/lib/finnhub/search";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";

type Stock = {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
};

type StockWithWatchlistStatus = Stock & {
  isInWatchlist: boolean;
};

export function useStockSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<StockWithWatchlistStatus[]>([]);
  const [loading, setLoading] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isSearchMode = searchTerm.trim().length > 0;

  /* ================= INITIAL POPULAR ================= */

  const loadPopular = async () => {
    setLoading(true);
    try {
      const data = await searchStocks();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopular();
  }, []);

  /* ================= SEARCH ================= */

  const handleSearch = async () => {
    if (!isSearchMode) {
      await loadPopular();
      return;
    }

    setLoading(true);
    try {
      const data = await searchStocks(searchTerm.trim());
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  /* ================= KEYBOARD ================= */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setSearchTerm("");
        searchInputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchTerm("");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    isSearchMode,
    isSearchOpen,
    setIsSearchOpen,
    searchInputRef,
  };
}
