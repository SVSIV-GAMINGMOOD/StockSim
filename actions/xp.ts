"use server";
import { createClient } from "@/lib/supabase/server";

type Timezone = string | null;

function getTZDayBounds(tz: Timezone) {
  // If no timezone, use UTC
  return {
    start: tz
      ? `date_trunc('day', now() AT TIME ZONE '${tz}')`
      : `date_trunc('day', now())`,
    end: tz
      ? `date_trunc('day', now() AT TIME ZONE '${tz}') + interval '1 day'`
      : `date_trunc('day', now()) + interval '1 day'`,
  };
}

export async function addXP(
  userId: string,
  xp: number,
  source: string,
  metadata?: Record<string, any>
) {
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("xp_events").insert({
    user_id: userId,
    xp,
    source,
    metadata: metadata ?? null,
  });

  if (insertError) throw insertError;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ xp: supabase.rpc("increment", { amount: xp }) }) 
    .eq("id", userId);

  if (updateError) throw updateError;

  return { success: true };
}

export async function getTodayXP(userId: string, timezone: Timezone = null) {
  const supabase = await createClient();
  const { start, end } = getTZDayBounds(timezone);

  const { data, error } = await supabase.rpc("get_today_xp", {
    p_user: userId,
    start_expr: start,
    end_expr: end,
  });

  if (error) throw error;
  return data ?? 0;
}

export async function getTotalXP(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("xp_events")
    .select("xp", { count: "exact", head: false })
    .eq("user_id", userId);

  if (error) throw error;

  return data?.reduce((sum, e: any) => sum + e.xp, 0) ?? 0;
}

export async function getXPBetween(
  userId: string,
  from: string,
  to: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("xp_events")
    .select("xp")
    .eq("user_id", userId)
    .gte("created_at", from)
    .lte("created_at", to);

  if (error) throw error;

  return data?.reduce((sum, e: any) => sum + e.xp, 0) ?? 0;
}

export async function getDailyBreakdown(
  userId: string,
  days: number = 7
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("xp_daily_breakdown", {
    p_user: userId,
    p_days: days,
  });

  if (error) throw error;
  return data ?? [];
}

export async function listXPEvents(
  userId: string,
  limit = 20,
  offset = 0
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("xp_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data ?? [];
}

export async function syncProfileXP(userId: string) {
  const total = await getTotalXP(userId);
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ xp: total })
    .eq("id", userId);

  if (error) throw error;

  return { success: true, total };
}

export async function deleteXPEvent(eventId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("xp_events")
    .delete()
    .eq("id", eventId);

  if (error) throw error;

  return { success: true };
}
