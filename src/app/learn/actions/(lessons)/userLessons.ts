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

type Status = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

/**
 * Sync module & course progress after a lesson is completed
 */
export async function syncProgressAfterLessonCompletion(
  userId: string,
  lessonId: string
) {
  const supabase = await createClient();

  /**
   * 1. Get lesson → module → course
   */
  const { data: lesson, error: lessonErr } = await supabase
    .from("lessons")
    .select(`
      id,
      module_id,
      modules (
        id,
        course_id
      )
    `)
    .eq("id", lessonId)
    .single();

  if (lessonErr || !lesson) throw lessonErr;

  const moduleId = lesson.module_id;
  const courseId = lesson.modules?.[0]?.course_id;

  const now = new Date().toISOString();

  /**
   * 2. Ensure user_module exists & mark IN_PROGRESS if first lesson
   */
  const { data: userModule } = await supabase
    .from("user_modules")
    .select("status")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .maybeSingle();

  if (!userModule || userModule.status === "NOT_STARTED") {
    await supabase.from("user_modules").upsert(
      {
        user_id: userId,
        module_id: moduleId,
        status: "IN_PROGRESS",
        started_at: now,
      },
      { onConflict: "user_id,module_id" }
    );
  }

  /**
   * 3. Ensure user_course exists & mark IN_PROGRESS if first lesson
   */
  const { data: userCourse } = await supabase
    .from("user_courses")
    .select("status")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (!userCourse || userCourse.status === "NOT_STARTED") {
    await supabase.from("user_courses").upsert(
      {
        user_id: userId,
        course_id: courseId,
        status: "IN_PROGRESS",
        started_at: now,
      },
      { onConflict: "user_id,course_id" }
    );
  }

  /**
   * 4. Check if ALL lessons in module are completed
   */
  const { data: moduleLessons } = await supabase
    .from("lessons")
    .select("id")
    .eq("module_id", moduleId);

  const lessonIds = moduleLessons?.map(l => l.id) ?? [];

  const { data: completedLessons } = await supabase
    .from("user_lessons")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("status", "COMPLETED")
    .in("lesson_id", lessonIds);

  const moduleCompleted =
    lessonIds.length > 0 &&
    completedLessons?.length === lessonIds.length;

  if (moduleCompleted) {
    await supabase
      .from("user_modules")
      .update({
        status: "COMPLETED",
        progress: 100,
        completed_at: now,
      })
      .eq("user_id", userId)
      .eq("module_id", moduleId);
  }

  /**
   * 5. Check if ALL modules in course are completed
   */
  const { data: courseModules } = await supabase
    .from("modules")
    .select("id")
    .eq("course_id", courseId);

  const moduleIds = courseModules?.map(m => m.id) ?? [];

  const { data: completedModules } = await supabase
    .from("user_modules")
    .select("module_id")
    .eq("user_id", userId)
    .eq("status", "COMPLETED")
    .in("module_id", moduleIds);

  const courseCompleted =
    moduleIds.length > 0 &&
    completedModules?.length === moduleIds.length;

  if (courseCompleted) {
    await supabase
      .from("user_courses")
      .update({
        status: "COMPLETED",
        progress: 100,
        completed_at: now,
      })
      .eq("user_id", userId)
      .eq("course_id", courseId);
  }

  return true;
}

export async function completeLessonAction(userId: string, lessonId: string) {
  await markLessonComplete(userId, lessonId);
  await syncProgressAfterLessonCompletion(userId, lessonId);
  return true;
}