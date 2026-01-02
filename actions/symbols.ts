"use server"
import { createClient } from "@/lib/supabase/server"

export async function getAllSymbols() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("symbols")
        .select("*")
        .order("symbol", { ascending: true })
    
    if (error) throw error;
    return data;
}

export async function getSymbol(symbol: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("symbols")
        .select("*")
        .eq("symbol", symbol)
        .single()
    
    if (error) throw error;
    return data;
}

export async function searchSymbols(query: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("symbols")
        .select("*")
        .or(`symbol.ilike.%${query}%,name.ilike.%${query}%`)
        .limit(20)

    if (error) throw error;
    return data;
}

export async function addSymbol({
    symbol,
    name,
    exchange,
    sector,
    currency = "INR",
    }: {
    symbol: string
    name: string
    exchange: string
    sector: string
    currency?: string
}) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("symbols")
        .insert({
            symbol,
            name,
            exchange,
            sector,
            currency,
        })
        .select()
        .single()

    if (error) throw error;
    return data;
}

export async function updateSymbol(
    symbol: string,
    updates: Partial<{
        name: string
        exchange: string
        sector: string
        currency: string
    }>
) {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from("symbols")
    .update(updates)
    .eq("symbol", symbol)
    .select()
    .single()

    if (error) throw error;
    return data;
}

export async function deleteSymbol(symbol: string) {
    const supabase = await createClient();

    const { error } = await supabase
    .from("symbols")
    .delete()
    .eq("symbol", symbol)

    if (error) throw error;

    return { success: true };
}