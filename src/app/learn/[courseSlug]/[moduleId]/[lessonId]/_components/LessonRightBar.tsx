interface LessonRightBarProps {
  completedLessons: number;
  totalLessons: number;
}

export default function LessonRightBar({ completedLessons, totalLessons }: LessonRightBarProps) {
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-4">

        {/* Progress Section */}
        <div className="p-4 rounded-2xl border bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Progress</h3>
          <div className="w-full bg-muted h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedLessons} / {totalLessons} lessons completed
          </p>
        </div>

        {/* Key Takeaways (hard-coded) */}
        <div className="p-4 rounded-2xl border bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Key Takeaways</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Learn basics of investing</li>
            <li>• Understand markets</li>
            <li>• Build discipline</li>
          </ul>
        </div>

        {/* Notes (hard-coded placeholder) */}
        <div className="p-4 rounded-2xl border bg-card shadow-sm">
          <h3 className="font-semibold mb-2">Your Notes</h3>
          <textarea
            className="w-full h-24 text-sm rounded-xl bg-muted p-2 outline-none"
            placeholder="Write notes here..."
          />
        </div>

      </div>
    </aside>
  );
}
