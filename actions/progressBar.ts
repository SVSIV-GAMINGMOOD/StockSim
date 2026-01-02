"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateLessonProgress({
  userId,
  lessonId,
  markComplete = false,
  progress = 0
}: {
  userId: string;
  lessonId: string;
  markComplete?: boolean;
  progress?: number;
}) {
  const supabase = await createClient();

  const finalProgress = markComplete ? 100 : progress;

  // Get lesson → module → course
  const { data: lesson, error: lessonErr } = await supabase
    .from("lessons")
    .select("id, module_id, modules(course_id)")
    .eq("id", lessonId)
    .single();

  if (lessonErr || !lesson) throw lessonErr || new Error("Lesson not found");

  const moduleId = lesson.module_id;
  const courseId = lesson.modules?.[0]?.course_id;

  // UPSERT user_lessons
  const status =
    markComplete
      ? "COMPLETED"
      : finalProgress > 0
      ? "IN_PROGRESS"
      : "NOT_STARTED";

  const { error: lessonUpsertErr } = await supabase
    .from("user_lessons")
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      status,
      progress: finalProgress,
      last_accessed: new Date().toISOString(),
      completed_at: markComplete ? new Date().toISOString() : null
    }, { onConflict: "user_id,lesson_id" });

  if (lessonUpsertErr) throw lessonUpsertErr;

  // RECALC MODULE PROGRESS
  const { data: moduleLessons, error: moduleLessonsErr } = await supabase
    .from("lessons")
    .select(`
      id,
      user_lessons!left (
        status
      )
    `)
    .eq("module_id", moduleId)
    .eq("user_lessons.user_id", userId);

  if (moduleLessonsErr) throw moduleLessonsErr;

  const totalLessons = moduleLessons.length;
  const completedLessons = moduleLessons.filter(l => l.user_lessons[0]?.status === "COMPLETED").length;

  const moduleProgress =
    totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  const moduleStatus =
    moduleProgress === 0
      ? "NOT_STARTED"
      : moduleProgress === 100
      ? "COMPLETED"
      : "IN_PROGRESS";

  await supabase
    .from("user_modules")
    .upsert({
      user_id: userId,
      module_id: moduleId,
      status: moduleStatus,
      progress: moduleProgress,
      started_at: new Date().toISOString(),
      completed_at: moduleStatus === "COMPLETED" ? new Date().toISOString() : null
    }, { onConflict: "user_id,module_id" });

  // RECALC COURSE PROGRESS (based on module completion)
  const { data: courseModules } = await supabase
    .from("modules")
    .select(`
      id,
      user_modules!left(status)
    `)
    .eq("course_id", courseId)
    .eq("user_modules.user_id", userId);

  const totalModules = courseModules?.length ?? 0;
  const completedModules =
    courseModules?.filter(m => m.user_modules[0]?.status === "COMPLETED").length ?? 0;

  const courseProgress =
    totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);

  const courseStatus =
    courseProgress === 0
      ? "NOT_STARTED"
      : courseProgress === 100
      ? "COMPLETED"
      : "IN_PROGRESS";

  await supabase
    .from("user_courses")
    .upsert({
      user_id: userId,
      course_id: courseId,
      status: courseStatus,
      progress: courseProgress,
      started_at: new Date().toISOString(),
      completed_at: courseStatus === "COMPLETED" ? new Date().toISOString() : null
    }, { onConflict: "user_id,course_id" });

  return {
    ok: true,
    lesson: { progress: finalProgress, status },
    module: { progress: moduleProgress, status: moduleStatus },
    course: { progress: courseProgress, status: courseStatus }
  };
}
