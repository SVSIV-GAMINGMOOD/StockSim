"use server"
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getProfile = cache(async () => {
    const supabase = await createClient();

    const {
    data: { user },
    error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

    if (profileError) throw profileError;

    return { user, profile };
});

export async function updateProfile(values: {
    username?: string;
    avatar_url?: string;
    level?: number;
    xp?: number;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
    .from("profiles")
    .update(values)
    .eq("id", user.id)
    .select()
    .single();

    if (error) throw error;

    revalidatePath("/profile");
    return data;
}

export async function createProfile({
    id,
    username,
    avatar_url,
}: {
    id: string;
    username?: string;
    avatar_url?: string;
}) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id,
            username,
            avatar_url,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteProfile(){
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

    if (error) throw error;
    return true;
}

export async function updateLoginStreak() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // fetch streak fields
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("current_streak, longest_streak, last_active_date")
        .eq("id", user.id)
        .single();

    if (error) throw error;

    const today = new Date();
    const todayDate = today.toISOString().split("T")[0]; // yyyy-mm-dd

    let currentStreak = 1;
    let longestStreak = profile?.longest_streak || 0;

    if (profile?.last_active_date) {
        const last = new Date(profile.last_active_date);
        const diffInDays =
            Math.floor(
                (today.setHours(0, 0, 0, 0) -
                 last.setHours(0, 0, 0, 0)) /
                (1000 * 60 * 60 * 24)
            );

        if (diffInDays === 0) {
            // already logged in today -> do nothing
            return profile;
        }

        if (diffInDays === 1) {
            currentStreak = (profile.current_streak || 0) + 1;
        }
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    const { data: updated, error: updateError } = await supabase
        .from("profiles")
        .update({
            current_streak: currentStreak,
            longest_streak: longestStreak,
            last_active_date: todayDate,
        })
        .eq("id", user.id)
        .select()
        .single();

    if (updateError) throw updateError;
    return updated;
}

export async function setSelectedPortfolio(portfolioId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Not authenticated")

    const { error } = await supabase
    .from("profiles")
    .update({ selected_portfolio_id: portfolioId })
    .eq("id", user.id)

    if (error) throw new Error(error.message);
}