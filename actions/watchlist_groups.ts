"use server"

import { createClient } from "@/lib/supabase/server"



async function getUser() {
    const supabase = await createClient();

    const {
    data: { user },
    error,
    } = await supabase.auth.getUser()

    if (error || !user) throw new Error("Not authenticated");
    return user;
}

export async function createWatchlistGroup(name: string) {
    const supabase = await createClient();
    const user = await getUser();

    const { data, error } = await supabase
    .from("watchlist_groups")
    .insert({
        name,
        user_id: user.id,
    })
    .select()
    .single()

    if (error) throw error;
    return data;
}

export async function getWatchlistGroups() {
    const supabase = await createClient();
    const user = await getUser();

    const { data, error } = await supabase
    .from("watchlist_groups")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

    if (error) throw error;
    return data;
}

export async function updateWatchlistGroup(id: string, name: string) {
    const supabase = await createClient();
    await getUser();

    const { data, error } = await supabase
    .from("watchlist_groups")
    .update({ name })
    .eq("id", id)
    .select()
    .single()

    if (error) throw error;
    return data;
}

export async function deleteWatchlistGroup(id: string) {
    const supabase = await createClient();
    await getUser();

    const { error } = await supabase
    .from("watchlist_groups")
    .delete()
    .eq("id", id)

    if (error) throw error;
    return { success: true };
}
