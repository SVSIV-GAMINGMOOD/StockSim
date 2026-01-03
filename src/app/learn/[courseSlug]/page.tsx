import Footer from "@/components/footer";
import { getProfile } from "actions/profiles";

import {
  getCourseLessonCount,
  getCourseReadTime,
  getCoursesBySlug,
  getRandomRelatedCourses,
} from "../actions/(courses)/courses";
import { getModulesWithLessons } from "../actions/(courses)/userCourses";

import CourseNavbar from "./_components/CourseNavbar";
import CourseHeader from "./_components/CourseHeader";
import CourseAbout from "./_components/CourseAbout";
import CourseModulesAccordion from "./_components/CourseModulesAccordion";
import CourseRelated from "./_components/CourseRelated";


export default async function CoursePage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  // fetch user details 
  const data = await getProfile();
  if (!data) {
  return <div>Not authenticated</div>;
  }
  const { user, profile } = data;

  // GET course 
  const course = await getCoursesBySlug(courseSlug);
  if (!course) return <div>Course not found</div>;

  // GET courses stats 
  const totalLessons = await getCourseLessonCount(course.id);
  const totalReadTime = await getCourseReadTime(course.id);

  const modules = await getModulesWithLessons(profile.id, course.id);   
  const randomCourses = await getRandomRelatedCourses(course.id)

  return (
    <div className="min-h-screen flex flex-col">
      <CourseNavbar avatar_url={profile.avatar_url} username={profile.username} />

      <main className="flex-1 container mx-auto p-6 space-y-8">
        <CourseHeader
          img_url={course.img}
          title={course.title}
          description={course.description}
          totalLessons={totalLessons}
          totalHours={totalReadTime}
          xp_reward={course.xp_reward ?? 0}
        />

        <CourseAbout about={course.about} skills={course.skills} />

        <CourseModulesAccordion courseSlug={courseSlug} modules={modules} />  

        <CourseRelated randomCourses={randomCourses} />
      </main>

      <Footer />
    </div>
  );
}


