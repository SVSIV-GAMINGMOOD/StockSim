"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Clock, Circle } from "lucide-react";

interface CourseModulesAccordionProps {
  courseSlug: string;
  modules: {
    title: string;
    moduleSlug: string;
    lessons: {
      id: string;
      title: string;
      status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";
    }[];
  }[];
}

export default function CourseModulesAccordion({ courseSlug, modules }: CourseModulesAccordionProps) {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(0);

  const statusMap = {
    COMPLETED: "completed",
    IN_PROGRESS: "in-progress",
    NOT_STARTED: "pending",
  } as const;

  const statusUI = {
    completed: {
      label: "Completed",
      border: "border-green-500",
      bg: "bg-green-50 dark:bg-green-950",
      text: "text-green-600",
      Icon: CheckCircle2,
      buttonVariant: "secondary" as const,
      buttonText: "Review",
    },
    "in-progress": {
      label: "In Progress",
      border: "border-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950",
      text: "text-amber-600",
      Icon: Clock,
      buttonVariant: "hero" as const,
      buttonText: "Continue",
    },
    pending: {
      label: "Not Started",
      border: "border-gray-400",
      bg: "bg-muted",
      text: "text-gray-500",
      Icon: Circle,
      buttonVariant: "outline" as const,
      buttonText: "Start",
    },
  };

  const goToLesson = (slug: string, lessonId: string) => {
    router.push(`/learn/${courseSlug}/${slug}/${lessonId}`);
  };

  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-card space-y-5">
      <h2 className="text-2xl font-semibold">Course Modules</h2>

      {modules.map((module, i) => {
        const isOpen = open === i;

        return (
          <div
            key={i}
            className="border rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-md transition"
          >
            {/* Module Header */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition"
            >
              <div>
                <h3 className="font-semibold text-lg">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.lessons.length} Lessons</p>
              </div>

              <span
                className={`transition-transform duration-200 text-xl ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {/* Lessons */}
            {isOpen && (
              <div className="px-4 pb-4 space-y-2 animate-in fade-in-50 slide-in-from-top-2">
                {module.lessons.map((lesson, idx) => {
                  const key = statusMap[lesson.status];
                  const style = statusUI[key];
                  const Icon = style.Icon;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${style.bg}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`${style.text}`} size={20} />
                        <span className="font-medium">{lesson.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${style.border} ${style.text} border`}
                        >
                          {style.label}
                        </span>

                        <Button
                          variant={style.buttonVariant}
                          size="sm"
                          onClick={() => goToLesson(module.moduleSlug, lesson.id)}
                        >
                          {style.buttonText}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
