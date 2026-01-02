"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CourseRelatedProps {
  randomCourses: { title: string; duration: string; slug: string }[];
}

export default function CourseRelated({randomCourses} : CourseRelatedProps) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-card mt-6">
      <h2 className="text-2xl font-semibold mb-6">Related Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {randomCourses.slice(0, 6).map((course, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-background shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="mb-4">
              <p className="font-medium text-lg text-foreground">{course.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{course.duration}</p>
            </div>

            <Button 
              className="mt-auto px-3 py-2 border rounded-md text-sm hover:bg-muted transition-colors"
              onClick = {() => router.push(`/learn/${course.slug}`)}
            >
              View Course →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
