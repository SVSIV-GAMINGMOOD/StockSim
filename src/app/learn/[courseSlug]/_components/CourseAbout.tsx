interface CourseAboutProps {
  about: string;
  skills: string[];
}

export default function CourseAbout({ about, skills }: CourseAboutProps) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-card">
      <div className="grid gap-8 md:grid-cols-2">
        {/* ABOUT */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About this Course</h3>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {about}
          </p>
        </div>

        {/* SKILLS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Skills You Will Gain</h3>
          <div className="grid gap-3">
            {skills?.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border p-3 bg-background">
                <span className="text-green-500">✔</span>
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
