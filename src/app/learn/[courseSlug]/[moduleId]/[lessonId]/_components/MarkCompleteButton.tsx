"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { completeLessonAction } from "@/app/learn/actions/(lessons)/userLessons";

export default function MarkCompleteButton({
  userId,
  lessonId,
  isCompleted
}: {
  userId: string;
  lessonId: string;
  isCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(isCompleted);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        setCompleted(true);

        await completeLessonAction(userId, lessonId);
      } catch (err) {
        console.error(err);
        setCompleted(false);
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={completed || isPending}
      className="flex items-center gap-2"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : completed ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : null}

      {completed ? "Completed" : "Mark as Completed"}
    </Button>
  );
}
