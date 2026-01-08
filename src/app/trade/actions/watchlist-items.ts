"use server"
import { createClient } from "@/lib/supabase/server"

async function requireUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) throw new Error("Not authenticated")
  return { supabase, user }
}

/**
 * Add symbol to a watchlist group
 */
export async function addWatchlistItem(watchlistId: string, symbol: string) {
  const { supabase } = await requireUser()

  const { data, error } = await supabase
    .from("watchlist_items")
    .insert({
      watchlist_id: watchlistId,
      symbol,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getWatchlistItems(watchlistId: string) {
  const { supabase } = await requireUser()

  const { data, error } = await supabase
    .from("watchlist_items")
    .select(
      `
      id,
      symbol,
      created_at,
      symbols ( name, exchange, sector, currency )
    `
    )
    .eq("watchlist_id", watchlistId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function deleteWatchlistItem(id: string) {
  const { supabase } = await requireUser()

  const { error } = await supabase
    .from("watchlist_items")
    .delete()
    .eq("id", id)

  if (error) throw error
  return { success: true }
}

export async function getUserWatchlists() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("watchlist_groups")
    .select(`
      id,
      name,
      watchlist_items (
        id,
        symbol
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  if (error) throw error

  return data.map((wl) => ({
    id: wl.id,
    name: wl.name,
    stocks: wl.watchlist_items.map((item) => ({
      id: item.id,
      symbol: item.symbol,
    })),
  }))
}

