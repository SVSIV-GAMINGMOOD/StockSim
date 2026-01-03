"use server"

import { createClient } from "@/lib/supabase/client";
import { cacheLife, cacheTag } from "next/cache";

// Fetch a single lesson with its Markdown content
export async function getLessonWithContent(lessonId: string) {
    'use cache'
    cacheLife('weeks');
    cacheTag("lessons");

    const supabase = await createClient();

    const { data, error } = await supabase
    .from("lessons")
    .select("*") // content is part of lessons now
    .eq("id", lessonId)
    .single();

    if (error) throw error;
    return data;
}

export async function getLessonWithNavigation(lessonId: string) {
  const supabase = await createClient();

  // 1️⃣ Get lesson
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("id, title, order_index, module_id")
    .eq("id", lessonId)
    .single();

  if (lessonError || !lesson) throw lessonError ?? new Error("Lesson not found");

  // 2️⃣ Get module
  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("id, slug, course_id")
    .eq("id", lesson.module_id)
    .single();

  if (moduleError || !module) throw moduleError ?? new Error("Module not found");

  // 3️⃣ Get course
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("slug")
    .eq("id", module.course_id)
    .single();

  if (courseError || !course) throw courseError ?? new Error("Course not found");

  // 4️⃣ Get ordered lessons in same module
  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, title, order_index")
    .eq("module_id", module.id)
    .order("order_index", { ascending: true });

  if (lessonsError) throw lessonsError;

  const index = lessons.findIndex((l) => l.id === lessonId);

  const prevLesson = index > 0 ? lessons[index - 1] : null;
  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : null;

  return {
    currentLesson: lesson,

    moduleSlug: module.slug,
    courseSlug: course.slug,

    prevLesson: prevLesson
      ? {
          ...prevLesson,
          moduleSlug: module.slug,
          courseSlug: course.slug,
        }
      : null,

    nextLesson: nextLesson
      ? {
          ...nextLesson,
          moduleSlug: module.slug,
          courseSlug: course.slug,
        }
      : null,
  };
}
