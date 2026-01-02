"use client";

import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface LessonSidebarProps {
  courseSlug: string;
  moduleSlug: string;
  moduleTitle: string;
  lessons: {
    id: string;
    title: string;
    readTime: string;
    status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";
  }[];
  currentLessonId: string;
}

export default function LessonSidebar({
  courseSlug,
  moduleSlug,
  moduleTitle,
  lessons,
  currentLessonId,
}: LessonSidebarProps) {
  return (
    <aside
      className="
        w-full md:w-72 
        rounded-2xl border 
        bg-white dark:bg-zinc-900 
        shadow-sm dark:shadow-none 
        p-5 sticky top-20 h-fit
      "
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
        <BookOpen className="w-5 h-5 text-primary" />
        {moduleTitle}
      </h3>

      <ul className="space-y-4">
        {lessons.map((lesson) => {
          const isActive = lesson.id === currentLessonId;
          const isCompleted = lesson.status === "COMPLETED";

          const lessonUrl = `/learn/${courseSlug}/${moduleSlug}/${lesson.id}`;

          return (
            <li key={lesson.id} className="flex gap-3 items-start">
              {/* Icon */}
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
              ) : (
                <Circle
                  className={clsx(
                    "w-6 h-6 mt-1 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-zinc-300 dark:text-zinc-600"
                  )}
                />
              )}

              {/* Card */}
              <Link
                href={lessonUrl}
                className={clsx(
                  "flex-1 rounded-xl p-3 border transition-all",
                  "bg-zinc-50/70 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800",
                  isActive
                    ? "border-primary/50 bg-primary/10 dark:bg-primary/20"
                    : "border-zinc-200 dark:border-zinc-700"
                )}
              >
                <p
                  className={clsx(
                    "font-medium line-clamp-2",
                    isActive
                      ? "text-primary"
                      : "text-zinc-800 dark:text-zinc-200"
                  )}
                >
                  {lesson.title}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {lesson.readTime}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
