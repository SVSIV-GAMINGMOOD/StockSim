"use server"

import { createClient } from "@/lib/supabase/server"

export async function getUserCourses() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const { data, error } = await supabase
        .from("user_courses")
        .select("*, courses(*)")
        .eq("user_id", user.id);
    
    if (error) throw error;
    return data;
}

export async function getUserProgress() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("user_courses")
    .select("course_id, progress");

  if (error) throw error;

  return data ?? [];
}


export async function getUserCourseProgress(courseId: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const { data, error } = await supabase
        .from("user_courses")
        .select("course_id, status, progress, started_at, completed_at")
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .single();

    if (error) throw error;

    return data;
}

export async function getModulesWithLessons(userId: string, courseId: string) {
  const supabase = await createClient();

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select(`
      id,
      title,
      slug,
      lessons (
        id,
        title,
        order_index
      )
    `)
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })
    .order("order_index", { ascending: true, foreignTable: "lessons" });

  if (modulesError) throw modulesError;

  const { data: userLessons, error: userLessonsError } = await supabase
    .from("user_lessons")
    .select("lesson_id, status")
    .eq("user_id", userId);

  if (userLessonsError) throw userLessonsError;

  const statusMap = new Map(userLessons?.map((u) => [u.lesson_id, u.status]));

  return modules.map((m) => ({
    title: m.title,
    moduleSlug: m.slug,
    lessons:
      m.lessons?.map((l) => ({
        id: l.id,
        title: l.title,
        status: statusMap.get(l.id) ?? "NOT_STARTED",
      })) ?? [],
  }));
}