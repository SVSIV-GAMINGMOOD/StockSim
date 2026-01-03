import { getCourses } from "../actions/(courses)/courses";
import { getUserCourses } from "../actions/(courses)/userCourses";
import { CourseCard } from "./CourseCard";

export async function CoursesSection() {
  const coursesData = await getCourses();
  const userCourses = await getUserCourses();

  const courseProgressMap = new Map(
    userCourses.map((uc) => [uc.course_id, uc.progress ?? 0])
  );

  const courses = coursesData.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    xp_reward: c.xp_reward,
    level: c.level,
    progress: courseProgressMap.get(c.id) ?? 0,
  }));

  if (courses.length === 0) {
    return (
      <div className="p-8 border rounded-2xl text-center text-muted-foreground">
        No courses enrolled yet. Start learning and track progress here ✨
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
}
