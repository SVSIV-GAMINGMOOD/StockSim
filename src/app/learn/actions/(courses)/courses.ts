"use server"

import { createClient } from "@/lib/supabase/client"
import { cacheLife, cacheTag } from 'next/cache'

export async function getCourses() {
    'use cache'
    cacheLife('days');
    cacheTag("courses");
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
    'use cache'
    cacheLife('days');
    cacheTag("courses");
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .single()
    
    if (error) throw error;
    return data;
}

export async function getCourseLessonCount(courseId: string) {
    'use cache'
    cacheLife('days');
    cacheTag("courses_lesson_count");
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
    'use cache'
    cacheLife('days');
    cacheTag("courses_read_time");
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