"use server";

import { createClient } from "@/lib/supabase/server";

export type LessonStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface UserLesson {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  progress: number;
  xp_earned: number;
  last_accessed: string;
  completed_at?: string | null;
}

/**
 * Ensure a user_lesson row exists
 */
export async function ensureUserLesson(
  userId: string,
  lessonId: string
): Promise<UserLesson> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_lessons")
    .select("*")
    .match({ user_id: userId, lesson_id: lessonId })
    .single();

  if (data) return data as UserLesson;

  const { data: inserted, error: insertErr } = await supabase
    .from("user_lessons")
    .insert({
      user_id: userId,
      lesson_id: lessonId,
      status: "NOT_STARTED",
      progress: 0,
    })
    .select("*")
    .single();

  if (insertErr) throw insertErr;
  return inserted as UserLesson;
}

/**
 * Get single lesson progress
 */
export async function getUserLesson(
  userId: string,
  lessonId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_lessons")
    .select("*")
    .match({ user_id: userId, lesson_id: lessonId })
    .single();

  if (error) throw error;
  return data as UserLesson;
}

/**
 * Get all lessons for user
 */
export async function getUserLessons(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_lessons")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data as UserLesson[];
}

/**
 * Start lesson
 */
export async function startLesson(userId: string, lessonId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_lessons")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        status: "IN_PROGRESS",
        last_accessed: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    )
    .select("*")
    .single();

  if (error) throw error;
  return data as UserLesson;
}

/**
 * Update progress
 * Expects 0–100
 */
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  progress: number
) {
  const supabase = await createClient();

  const safeProgress = Math.min(100, Math.max(0, Math.floor(progress)));

  const { data, error } = await supabase
    .from("user_lessons")
    .update({
      progress: safeProgress,
      status: safeProgress >= 100 ? "COMPLETED" : "IN_PROGRESS",
      last_accessed: new Date().toISOString(),
      completed_at: safeProgress >= 100 ? new Date().toISOString() : null,
    })
    .match({ user_id: userId, lesson_id: lessonId })
    .select("*")
    .single();

  if (error) throw error;
  return data as UserLesson;
}

/**
 * Mark completed + award XP
 */
export async function markLessonComplete(userId: string, lessonId: string) {
  const supabase = await createClient();

  // Get lesson XP
  const { data: lesson, error: lessonErr } = await supabase
    .from("lessons")
    .select("xp_reward")
    .eq("id", lessonId)
    .single();

  if (lessonErr) throw lessonErr;

  const xpReward = lesson?.xp_reward ?? 0;

//   check if event already marked completed 
  const { data: existing } = await supabase
    .from("user_lessons")
    .select("status")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const alreadyCompleted = existing?.status === "COMPLETED";

//   update user_lesson table 
  const { error: upsertErr } = await supabase
    .from("user_lessons")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        status: "COMPLETED",
        progress: 100,
        completed_at: new Date().toISOString(),
        last_accessed: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );

  if (upsertErr) throw upsertErr;

  if (alreadyCompleted || xpReward === 0) return true;

//   update xp_events table 
  const { error: xpEventErr } = await supabase
    .from("xp_events")
    .upsert(
        {
            user_id: userId,
            source: "LESSON_COMPLETED",
            xp: lesson?.xp_reward ?? 0,
        }
    );

  if (xpEventErr) throw xpEventErr;

//   fetch profile XP 
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .single();

  if (profileErr) throw profileErr;

  const currentXp = profile?.xp ?? 0;
  const newXp = currentXp + xpReward;

  // Update profile XP
  const { error: updateErr } = await supabase
    .from("profiles")
    .update({ xp: newXp })
    .eq("id", userId);

  if (updateErr) throw updateErr;

  return true;
}

export async function completeLessonAction(userId: string, lessonId: string) {
  return await markLessonComplete(userId, lessonId);
}