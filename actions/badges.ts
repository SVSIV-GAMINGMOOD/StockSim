"use server";

import { createClient } from "@/lib/supabase/server";

export type Badge = {
    id: string;
    title: string;
    description: string;
    icon: string;
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

export async function getBadges(): Promise<Badge[]> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("badges")
    .select("*")
    .order("title", { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
}

export async function getBadgeById(id: string): Promise<Badge | null> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("id", id)
    .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function createBadge(input: {
    title: string;
    description: string;
    icon: string;
}) {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("badges")
    .insert(input)
    .select()
    .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function updateBadge(
    id: string,
    input: Partial<Omit<Badge, "id">>
) {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
    .from("badges")
    .update(input)
    .eq("id", id)
    .select()
    .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function deleteBadge(id: string) {

    const supabase = await supabaseServer();

    const { error } = await supabase.from("badges").delete().eq("id", id);

    if (error) throw new Error(error.message);
    return true;
}
