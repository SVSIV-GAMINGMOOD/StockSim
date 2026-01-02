"use server";

import { createClient } from "@/lib/supabase/server";

export type UserBadge = {
    id: string;
    user_id: string;
    badge_id: string;
    earned_at: string;
};

async function supabaseServer() {
    return await createClient();
}

async function requireUser() {
    const supabase = await supabaseServer();
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");
    return user;
}

export async function getUserBadges(): Promise<UserBadge[]> {
    const user = await requireUser();
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("user_badges")
    .select("id, user_id, badge_id, earned_at, badges(*)")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
}

export async function addUserBadge(badge_id: string): Promise<UserBadge> {
    const user = await requireUser();
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("user_badges")
    .insert({ user_id: user.id, badge_id })
    .select()
    .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function removeUserBadge(badge_id: string): Promise<boolean> {
    const user = await requireUser();
    const supabase = await supabaseServer();

    const { error } = await supabase
    .from("user_badges")
    .delete()
    .eq("user_id", user.id)
    .eq("badge_id", badge_id);

    if (error) throw new Error(error.message);
    return true;
}

export async function getUsersByBadge(badge_id: string): Promise<UserBadge[]> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("user_badges")
    .select("id, user_id, badge_id, earned_at, profiles(*)")
    .eq("badge_id", badge_id);

    if (error) throw new Error(error.message);
    return data || [];
}

export async function getUserBadgeCount(): Promise<number> {
    const user = await requireUser();
    const supabase = await supabaseServer();

    const { count, error } = await supabase
    .from("user_badges")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

    if (error) throw new Error(error.message);
    return count || 0;
}

