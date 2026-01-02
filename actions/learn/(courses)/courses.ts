"use server"

import { createClient } from "@/lib/supabase/server"

export async function getCourses() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("order_index", {ascending: true});

    if (error) throw error;
    return data;
}

export async function getCoursesBySlug(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .single()
    
    if (error) throw error;
    return data;
}

export async function createCourse(input: {
    title: string;
    slug: string;
    description?: string;
    level?: "beginner" | "intermediate" | "advanced";
    xp_reward?: number;
    order_index?: number;
}) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .insert(input)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateCourse(
    courseId: string,
    updates: Partial<{
    title: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    xp_reward: number;
    order_index: number;
    is_published: boolean;
    }>
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("course")
        .update(updates)
        .eq("id", courseId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getCourseLessonCount(courseId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("lessons")
    .select("id, modules!inner(course_id)", {
      count: "exact",
      head: true
    })
    .eq("modules.course_id", courseId);

  if (error) throw error;

  return count ?? 0;
}

export async function getCourseReadTime(courseId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("est_read_time, modules!inner(course_id)")
    .eq("modules.course_id", courseId);

  if (error) throw error;

  const totalMinutes = data.reduce((sum, l) => sum + (l.est_read_time || 0), 0);

  const hours = +(totalMinutes / 60).toFixed(1); // rounded nicely
  return { minutes: totalMinutes, hours };
}

export async function getRandomRelatedCourses(currentCourseId: string, limit = 6) {
  const supabase = await createClient();

  // Fetch all published courses except the current one
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, title, slug") // include slug
    .eq("is_published", true)
    .neq("id", currentCourseId);

  if (error) throw error;

  if (!courses || courses.length === 0) return [];

  // Shuffle and pick random courses
  const shuffled = courses.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, limit);

  // Get duration for each selected course
  const related = await Promise.all(
    selected.map(async (course) => {
      const { hours, minutes } = await getCourseReadTime(course.id);
      const duration = `${hours}h ${minutes % 60}m`;
      return { title: course.title, duration, slug: course.slug }; // include slug
    })
  );

  return related;
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

