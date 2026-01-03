"use server";

import { createClient } from "@/lib/supabase/server"; 

export async function getModuleLessonsWithUserProgress(
  lessonId: string,
  userId: string
) {
  const supabase = await createClient();

  // Get lesson → module_id
  const { data: lessonRef, error: lessonErr } = await supabase
    .from("lessons")
    .select("id, module_id")
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonErr) throw lessonErr;
  if (!lessonRef) throw new Error(`Lesson not found for id: ${lessonId}`);
  if (!lessonRef.module_id) throw new Error("Lesson has no module");

  const moduleId = lessonRef.module_id;

  // Fetch module title (SAFE single row)
  const { data: module, error: moduleErr } = await supabase
    .from("modules")
    .select("title")
    .eq("id", moduleId)
    .maybeSingle();

  if (moduleErr) throw moduleErr;

  const moduleTitle = module?.title ?? "Module";

  // Fetch lessons + user progress
  const { data, error } = await supabase
    .from("lessons")
    .select(`
      id,
      title,
      order_index,
      est_read_time,
      user_lessons!left (
        user_id,
        status,
        progress
      )
    `)
    .eq("module_id", moduleId)
    .order("order_index", { ascending: true });

  if (error) throw error;

  const lessons = data.map((lesson: any) => {
    const ul = lesson.user_lessons?.find(
      (ul: any) => ul.user_id === userId
    );

    return {
      id: lesson.id,
      title: lesson.title,
      readTime: `${lesson.est_read_time ?? 5} min read`,
      status: ul?.status ?? "NOT_STARTED",
      progress: ul?.progress ?? 0,
    };
  });

  return {
    moduleTitle,
    lessons,
  };
}