import { getUserWatchlists } from "../../actions/watchlist-items"
import WatchlistSidebar from "./WatchlistSidebar.client"

// DB shape
export interface WatchlistStock {
  id: string
  symbol: string
}

// Live price shape
export interface LivePrice {
  price: number
  change: number
}

// UI shape (merged)
export interface WatchlistStockUI extends WatchlistStock {
  live?: LivePrice
}

export default async function WatchlistSidebarServer() {
  const watchlists = await getUserWatchlists()

  return (
    <WatchlistSidebar initialWatchlists={watchlists} />
  )
}
