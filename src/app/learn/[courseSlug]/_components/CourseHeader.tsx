interface CourseHeaderProps {
  title: string;
  description: string;
  img_url: string;
  totalLessons: number;
  totalHours: { minutes: number; hours: number };
  xp_reward: number;
}

export default function CourseHeader({ img_url, title, description, totalLessons, totalHours, xp_reward }: CourseHeaderProps) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-card flex flex-col lg:flex-row gap-6">
      {/* Course Image */}
      <img
        src={img_url}
        alt="Course cover"
        className="h-44 w-full lg:w-64 rounded-xl object-cover"
      />

      {/* Course Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-muted text-sm font-medium">
            📚 {totalLessons} Chapters
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-muted text-sm font-medium">
            ⏱ {Math.round(totalHours.hours)} hours
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-muted text-sm font-medium">
            ⭐ Earn {xp_reward} XP
          </div>
        </div>
      </div>
    </div>
  );
}
