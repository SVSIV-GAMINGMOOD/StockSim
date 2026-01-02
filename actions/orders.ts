"use server"

import { createClient } from "@/lib/supabase/server"

type OrderSide = "BUY" | "SELL"
type OrderType = "MARKET" | "LIMIT" | "SL" | "SLM"

async function requireUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) throw new Error("Not authenticated")
  return { supabase, user: data.user }
}

export async function createOrder(input: {
    portfolioId: string
    symbol: string
    side: OrderSide
    orderType: OrderType
    quantity: number
    limitPrice?: number | null
    stopPrice?: number | null
}) {
    const { supabase } = await requireUser()

    // === Basic Validation ===
    if (!input.portfolioId) throw new Error("portfolioId is required")
    if (!input.symbol) throw new Error("symbol is required")
    if (!input.side) throw new Error("side is required")
    if (!input.orderType) throw new Error("orderType is required")
    if (!input.quantity || input.quantity <= 0)
    throw new Error("quantity must be greater than 0")

    // === Order Type Validation ===
    if (input.orderType === "LIMIT" && !input.limitPrice) {
    throw new Error("limit_price is required for LIMIT orders")
    }

    if ((input.orderType === "SL" || input.orderType === "SLM") && !input.stopPrice) {
    throw new Error("stop_price is required for SL / SLM orders")
    }

    const { data, error } = await supabase
        .from("orders")
        .insert({
            portfolio_id: input.portfolioId,
            symbol: input.symbol,
            side: input.side,
            order_type: input.orderType,
            quantity: input.quantity,
            limit_price: input.limitPrice ?? null,
            stop_price: input.stopPrice ?? null
        })
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data
}

export async function getOrdersByPortfolio(portfolioId: string) {
    const { supabase } = await requireUser()

    const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)
    return data
}

export async function getOrder(id: string) {
    const { supabase } = await requireUser()

    const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single()

    if (error) throw new Error(error.message)
    return data
}

export async function cancelOrder(id: string) {
    const { supabase } = await requireUser()

    const { data, error } = await supabase
    .from("orders")
    .update({ status: "CANCELLED" })
    .eq("id", id)
    .eq("status", "PENDING")
    .select()
    .single()

    if (error) throw new Error(error.message)
    return data
}

export async function getWinRateByPortfolio(portfolioId: string) {
  const { supabase } = await requireUser()

  if (!portfolioId) throw new Error("portfolioId is required")

  const { data: orders, error } = await supabase
    .from("orders")
    .select("symbol, side, quantity, limit_price, status")
    .eq("portfolio_id", portfolioId)
    .eq("status", "FILLED")

  if (error) throw new Error(error.message)
  if (!orders || orders.length === 0) return 0

  // group cashflow by symbol
  const results: Record<string, number> = {}

  orders.forEach(order => {
    const price = Number(order.limit_price || 0)
    const qty = Number(order.quantity || 0)
    const value = price * qty

    if (!results[order.symbol]) results[order.symbol] = 0

    if (order.side === "BUY") {
      results[order.symbol] -= value   // money spent
    } else if (order.side === "SELL") {
      results[order.symbol] += value   // money received
    }
  })

  const symbolResults = Object.values(results)

  const totalTrades = symbolResults.length
  if (totalTrades === 0) return 0

  const winningTrades = symbolResults.filter(pl => pl > 0).length

  const winRate = (winningTrades / totalTrades) * 100

  return Math.round(winRate)
}
