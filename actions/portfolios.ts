"use server"
import { createClient } from "@/lib/supabase/server"

export async function getPortfolios() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("created_at", { ascending: true });
    
    if (error) throw error;
    return data;
}

export async function getPortfolioById(portfolioId: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const {data, error} = await supabase
        .from("portfolios")
        .select("*")
        .eq("id", portfolioId)
        .single();

    if (error) throw error;
    return data;
}

export async function createPortfolio(name?: string, startingBalance: number= 100000) {
    const supabase = await createClient();

    const {
        data: {user},
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated")

    const { data, error } = await supabase
        .from("portfolios")
        .insert({
            user_id: user.id,
            name: name || "Main Portfolio",
            starting_balance: startingBalance,
            cash_balance: startingBalance
        })
        .select()
        .single()
    
    if (error) throw error;
    return data;
}

export async function updateCashBalance(portfolioId: string, newBalance: number) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("portfolios")
        .update({cash_balance: newBalance})
        .eq("id", portfolioId)
        .select()
        .single() 

    if (error) throw error;
    return data;
}

export async function renamePortfolio(portfolioId: string, newName: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("portfolios")
        .update({name: newName})
        .eq("id", portfolioId)
        .select()
        .single()

    if (error) throw error;
    return data;
}

export async function deletePortfolio(portfolioId:string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("portfolios")
        .delete()
        .eq("id", portfolioId)

    if (error) throw error;
    return { success: true };
}

export async function getPortfolioReturn(portfolioId: string) {
    const supabase = await createClient();

    const { data: portfolio, error: portfolioError } = await supabase
        .from("portfolios")
        .select("*")
        .eq("id", portfolioId)
        .single();

    if (portfolioError || !portfolio) throw new Error("Portfolio not found");

    const starting_balance = Number(portfolio.starting_balance);
    const cash_balance = Number(portfolio.cash_balance);

    const { data: holdings, error: holdingsError } = await supabase
        .from("holdings")
        .select("symbol, quantity")
        .eq("portfolio_id", portfolioId);

    if (holdingsError) throw holdingsError;

    let holdings_value = 0;

    if (holdings && holdings.length > 0) {
        const symbolsList = holdings.map(h => h.symbol);

        const { data: symbolsData, error: symbolsError } = await supabase
            .from("symbols")
            .select("symbol, current_price")
            .in("symbol", symbolsList);

        if (symbolsError) throw symbolsError;

        holdings_value = holdings.reduce((total: number, h: any) => {
            const price = symbolsData.find(s => s.symbol === h.symbol)?.current_price || 0;
            return total + Number(h.quantity) * Number(price);
        }, 0);
    }

    const total_value = cash_balance + holdings_value;
    const profit_loss = total_value - starting_balance;
    const return_percent = (profit_loss / starting_balance) * 100;

    return {
        portfolio_id: portfolio.id,
        starting_balance: Number(starting_balance.toFixed(2)),
        cash_balance: Number(cash_balance.toFixed(2)),
        holdings_value: Number(holdings_value.toFixed(2)),
        total_value: Number(total_value.toFixed(2)),
        profit_loss: Number(profit_loss.toFixed(2)),
        return_percent: Number(return_percent.toFixed(2)), 
    };
}
