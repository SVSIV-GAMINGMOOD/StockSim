import Footer from "@/components/footer";
import LessonBottomNav from "./_components/LessonBottomNav";
import LessonContent from "./_components/LessonContent";
import LessonRightBar from "./_components/LessonRightBar";
import LessonSidebar from "./_components/LessonSidebar";
import CourseNavbar from "../../_components/CourseNavbar";

import { getProfile } from "../../../../../../actions/profiles";
import { getLessonWithContent, getLessonWithNavigation } from "../../../../../../actions/learn/(lessons)/lessons";
import { getModuleLessonsWithUserProgress } from "../../../../../../actions/learn/(modules)/user_modules";
import MarkCompleteButton from "./_components/MarkCompleteButton";

interface PageProps {
  params: {
    courseSlug: string;
    moduleSlug: string;
    lessonId: string;
  };
}

export default async function LessonPreviewPage({ params }: PageProps) {
  const { courseSlug, moduleSlug, lessonId } = await params;

  const profile = await getProfile();
  const sidebarData = await getModuleLessonsWithUserProgress(
    lessonId,
    profile.id
  );
  const currentLesson = sidebarData.lessons.find(l => l.id === lessonId);
  const isCompleted = currentLesson?.status === "COMPLETED";
  const lesson = await getLessonWithContent(lessonId);
  const nav = await getLessonWithNavigation(lessonId);

  const completedLessons = sidebarData.lessons.filter(l => l.status === "COMPLETED").length;
  const totalLessons = sidebarData.lessons.length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <CourseNavbar
        avatar_url={profile?.avatar_url}
        username={profile?.username}
      />

      {/* MAIN WRAPPER */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[280px_1fr_300px]">
          
          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <LessonSidebar
              courseSlug={courseSlug}
              moduleSlug={moduleSlug}
              moduleTitle={sidebarData.moduleTitle}
              lessons={sidebarData.lessons}
              currentLessonId={lessonId}
            />
          </aside>

          {/* MAIN CONTENT */}
          <section className="min-w-0 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <LessonContent data={lesson.content} />

            {/* Mark As Completed */}
            <div className="mt-10 flex justify-end">
              <MarkCompleteButton
                userId={profile.id}
                lessonId={lessonId}
                isCompleted={isCompleted}
              />
            </div>

            <div className="mt-12">
              <LessonBottomNav
                prevLesson={
                  nav.prevLesson
                    ? {
                        title: nav.prevLesson.title,
                        href: `/learn/${nav.prevLesson.courseSlug}/${nav.prevLesson.moduleSlug}/${nav.prevLesson.id}`,
                      }
                    : undefined
                }
                nextLesson={
                  nav.nextLesson
                    ? {
                        title: nav.nextLesson.title,
                        href: `/learn/${nav.nextLesson.courseSlug}/${nav.nextLesson.moduleSlug}/${nav.nextLesson.id}`,
                      }
                    : undefined
                }
              />
            </div>
          </section>

          {/* RIGHT BAR */}
          <aside className="hidden xl:block sticky top-24 self-start">
            <LessonRightBar completedLessons={completedLessons} totalLessons={totalLessons} />
          </aside>
        </div>
      </main>

      {/* Ensure Footer never sticks to content */}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
