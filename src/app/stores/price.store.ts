import { create } from "zustand"

export interface LivePrice {
  price: number
  change: number
  changePercent?: number
}

interface PriceStore {
  prices: Record<string, LivePrice>
  setPrices: (p: Record<string, LivePrice>) => void
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: {},
  setPrices: (prices) =>
    set((state) => ({
      prices: {
        ...state.prices,
        ...prices,
      },
    })),
}))
