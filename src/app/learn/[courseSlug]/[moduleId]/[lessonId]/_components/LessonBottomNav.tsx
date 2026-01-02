"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LessonBottomNavProps {
  prevLesson?: {
    title: string;
    href: string;
  };
  nextLesson?: {
    title: string;
    href: string;
  };
}

export default function LessonBottomNav({
  prevLesson,
  nextLesson,
}: LessonBottomNavProps) {
  const bothButtons = prevLesson && nextLesson;

  return (
    <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {prevLesson ? (
        <Button
          asChild
          variant="outline"
          size="lg"
          className={bothButtons ? "w-full sm:flex-1 min-w-0" : "inline-flex"}
        >
          <Link href={prevLesson.href} className="flex items-center gap-1 min-w-0">
            <span className="shrink-0">← Previous Lesson (</span>
            <span className="truncate min-w-0 flex-1">{prevLesson.title}</span>
            <span className="shrink-0">)</span>
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {nextLesson && (
        <Button
          asChild
          size="lg"
          className={bothButtons ? "w-full sm:flex-1 min-w-0" : "inline-flex"}
        >
          <Link href={nextLesson.href} className="flex items-center gap-1 min-w-0 justify-end">
            <span className="shrink-0">Next Lesson (</span>
            <span className="truncate min-w-0 flex-1 text-right">
              {nextLesson.title}
            </span>
            <span className="shrink-0">) →</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
