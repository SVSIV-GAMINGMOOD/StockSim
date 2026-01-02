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

export async function enrollInCourse(courseId: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const { data, error } = await supabase
        .from("user_courses")
        .insert({
            user_id: user.id,
            course_id: courseId,
            status: "IN_PROGRESS",
            started_at: new Date().toISOString()
        })
        .select()
        .single();
    
    if (error) throw error;
    return data;
}

export async function updateUserCourseProgress(courseId: string, progress: number) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const updates: any = { progress };

    if (progress === 100) {
        updates.status = "COMPLETED";
        updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
        .from("user_courses")
        .update(updates)
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .select()
        .single();

    if (error) throw error;
    return data;
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
