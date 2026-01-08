'use client'

import { useEffect } from "react"
import { usePriceStore } from "../stores/price.store"
import { getWatchlistQuotes } from "@/lib/finnhub/search"

export function useLivePrices(symbols: string[]) {
  const setPrices = usePriceStore((s) => s.setPrices)

  useEffect(() => {
    if (!symbols.length) return

    let cancelled = false

    async function fetchPrices() {
      try {
        // ✅ SERVER ACTION (cached + revalidated)
        const quotes = await getWatchlistQuotes(symbols)

        if (cancelled) return

        // 🔄 Normalize into Zustand format
        const priceMap: Record<string, { price: number; change: number; changePercent?: number }> =
          {}

        for (const q of quotes) {
          priceMap[q.symbol] = {
            price: q.price,
            change: q.change,
            changePercent: q.changePercent,
          }
        }

        setPrices(priceMap)
      } catch (err) {
        console.error("Live price fetch failed:", err)
      }
    }

    // Initial fetch
    fetchPrices()

    // ✅ Free-tier safe polling (60–120s recommended)
    const interval = setInterval(fetchPrices, 60_000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [symbols.join(",")])
}
