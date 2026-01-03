import DashboardLayout from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { getProfile } from "../../../actions/profiles";
import { getUserBadgeCount } from "../../../actions/userBadges";
import { Button } from "@/components/ui/button";
import { getUserProgress } from "./actions/(courses)/userCourses";
import { Suspense } from "react";
import { CoursesSection } from "./_components/CoursesSection";  

export interface CourseUI {
  id: string;
  slug: string; 
  title: string;
  description: string;
  progress: number;
  xp_reward: number;
  level: string;
}

export default async function LearnPage() {
  const data = await getProfile();
  if (!data) {
    return <div>Not authenticated</div>;
    }
  const { user, profile } = data;
  const total_badges = await getUserBadgeCount();

  // overall Courses progress
  const user_progress = await getUserProgress();
  const totalProgress =
    user_progress.length > 0
      ? user_progress.reduce((sum, m) => sum + (m.progress ?? 0), 0) /
        user_progress.length
      : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
            <h1 className="font-display text-2xl xm:text-3xl">
                Learning <span className="gradient-text">Center</span>
            </h1>
            <p className="text-muted-foreground mt-1">
                Master stock market step by step
            </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border shadow-sm">
                <p className="text-sm text-primary">Total XP</p>
                <h2 className="text-3xl font-semibold mt-1">{profile.xp}</h2>
            </div>

            <div className="p-5 rounded-2xl border shadow-sm">
                <p className="text-sm text-primary mb-1">Overall Progress</p>
                <Progress value={totalProgress} />
                <p className="text-sm text-muted-foreground  mt-2">{Math.round(totalProgress)}% Completed</p>
            </div>

            <div className="p-5 rounded-2xl border shadow-sm">
                <p className="text-sm text-primary ">Badges Earned</p>
                <h2 className="text-3xl font-semibold mt-1">{total_badges}</h2>
            </div>
        </div>

        {/* Resume Learning */}
        <div className="p-6 rounded-2xl border bg-linear-to-r from-indigo-600/90 via-indigo-500 to-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <p className="text-sm opacity-80 mb-1 tracking-wide">
            Resume Learning
          </p>

          <h2 className="text-2xl font-semibold leading-tight">
            Stock Market Basics — Lesson 4
          </h2>

          <p className="opacity-80 mt-1">
            Estimated time: <span className="font-medium">8 mins</span>
          </p>

          <div className="mt-4">
            <Button
              variant="secondary"
              size="lg"
              className="py-2 px-6 font-medium hover:scale-105 transition-all"
            >
              Continue
            </Button>
          </div>
        </div>

        {/* Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Courses</h2>
          </div>

          <Suspense
            fallback={
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 rounded-2xl border animate-pulse bg-muted"
                  />
                ))}
              </div>
            }
          >
            <CoursesSection />
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  );

}
