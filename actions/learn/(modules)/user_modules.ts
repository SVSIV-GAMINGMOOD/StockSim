"use server";

import { createClient } from "@/lib/supabase/server"; 

export async function markModuleComplete(userId: string, moduleId: string) {
  const supabase = await createClient();

  // Get module XP
  const { data: module, error: modErr } = await supabase
    .from("modules")
    .select("xp_reward")
    .eq("id", moduleId)
    .single();

  if (modErr) throw modErr;

  const { error } = await supabase
    .from("user_modules")
    .upsert(
      {
        user_id: userId,
        module_id: moduleId,
        status: "COMPLETED",
        progress: 100,
        xp_earned: module?.xp_reward ?? 0,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id" }
    );

  if (error) throw error;
  return true;
}

export async function getUserProgress(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_modules")
    .select(
      `
        *,
        modules (*)
      `
    )
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function getModuleLessonsWithUserProgress(
  lessonId: string,
  userId: string
) {
  const supabase = await createClient();

  // 1️⃣ Get lesson → module_id
  const { data: lessonRef, error: lessonErr } = await supabase
    .from("lessons")
    .select("id, module_id")
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonErr) throw lessonErr;
  if (!lessonRef) throw new Error(`Lesson not found for id: ${lessonId}`);
  if (!lessonRef.module_id) throw new Error("Lesson has no module");

  const moduleId = lessonRef.module_id;

  // 2️⃣ Fetch module title (SAFE single row)
  const { data: module, error: moduleErr } = await supabase
    .from("modules")
    .select("title")
    .eq("id", moduleId)
    .maybeSingle();

  if (moduleErr) throw moduleErr;

  const moduleTitle = module?.title ?? "Module";

  // 3️⃣ Fetch lessons + user progress
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



// export async function getModuleLessonsWithUserProgress(
//   moduleSlug: string,
//   userId: string
// ) {
//   const supabase = await createClient();

//   // 1️⃣ Get the module
//   const { data: module, error: moduleErr } = await supabase
//     .from("modules")
//     .select("id, title")
//     .eq("slug", moduleSlug)
//     .single();

//   if (moduleErr) throw moduleErr;

//   // 2️⃣ Get lessons + user progress (LEFT JOIN + filter user)
//   const { data, error } = await supabase
//     .from("lessons")
//     .select(
//       `
//       id,
//       title,
//       order_index,
//       est_read_time,
//       user_lessons!left (
//         user_id,
//         status,
//         progress
//       )
//     `
//     )
//     .eq("module_id", module.id)
//     .eq("user_lessons.user_id", userId)  
//     .order("order_index", { ascending: true });

//   if (error) throw error;

//   // 3️⃣ Normalize
//   const lessons = data.map((lesson: any) => {
//     const ul = lesson.user_lessons?.[0];

//     return {
//       id: lesson.id,
//       title: lesson.title,
//       readTime: `${lesson.est_read_time ?? 5} min read`,
//       status: ul?.status ?? "NOT_STARTED",
//       progress: ul?.progress ?? 0,
//     };
//   });

//   return {
//     moduleTitle: module.title,
//     lessons,
//   };
// }
