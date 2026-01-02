"use server";

import { createClient } from "@/lib/supabase/server"; 

export async function getAllModules() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getModuleBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getModuleById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createModule(module: {
  title: string;
  description?: string;
  slug: string;
  level: "beginner" | "intermediate" | "advanced";
  order_index?: number;
  xp_reward?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .insert(module)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateModule(
  id: string,
  updates: Partial<{
    title: string;
    description: string;
    slug: string;
    level: string;
    order_index: number;
    xp_reward: number;
  }>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("modules")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteModule(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) throw error;

  return true;
}

export async function getModuleReadTime(moduleId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("est_read_time", { head: false })
    .eq("module_id", moduleId);

  if (error) throw error;

  return data.reduce((acc, r) => acc + r.est_read_time, 0);
}

