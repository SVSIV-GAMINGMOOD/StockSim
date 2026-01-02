import CourseNavbar from "./_components/CourseNavbar";
import CourseHeader from "./_components/CourseHeader";
import CourseAbout from "./_components/CourseAbout";
import CourseModulesAccordion from "./_components/CourseModulesAccordion";
import CourseRelated from "./_components/CourseRelated";
import { getCourseLessonCount, getCourseReadTime, getCoursesBySlug, getModulesWithLessons, getRandomRelatedCourses } from "../../../../actions/learn/(courses)/courses";
import { getProfile } from "../../../../actions/profiles";
import Footer from "@/components/footer";


export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const { courseSlug } = await params;
  const course = await getCoursesBySlug(courseSlug);
  if (!course) return <div>Course not found</div>;

  const totalLessons = await getCourseLessonCount(course.id);
  const totalReadTime = await getCourseReadTime(course.id);
  const profile = await getProfile();

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


