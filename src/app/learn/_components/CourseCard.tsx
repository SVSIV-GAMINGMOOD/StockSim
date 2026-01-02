"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation" 

interface CourseCardProps {
  title: string
  description: string
  progress: number
  xp_reward?: number
  level?: string
  slug: string
}

export function CourseCard({
  title,
  description,
  progress,
  xp_reward = 0,
  level = "Beginner",
  slug,
}: CourseCardProps) {
  const router = useRouter()
  const isCompleted = progress >= 100
  const inProgress = progress > 0 && progress < 100

  const buttonLabel = isCompleted
    ? "Revise"
    : inProgress
    ? "Continue Learning"
    : "Start Course"

  const progressLabel = isCompleted
    ? "Completed 🎉"
    : inProgress
    ? `${Math.round(progress)}% Completed`
    : "Not Started"

  const handleCTA = () => {
    router.push(`/learn/${slug}`) 
  }

  return (
    <div className="glass-card-hover glow-effect animate-fade-in p-5 rounded-2xl flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold leading-tight">
          {title}
        </h3>

        <span className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground shadow-sm">
          ⭐ {xp_reward} XP
        </span>
      </div>

      {/* Level */}
      <span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground tracking-wide">
        {level}
      </span>

      {/* Description */}
      <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
        {description}
      </p>

      {/* Progress */}
      <div className="mt-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {progressLabel}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-5 flex justify-center">
        <Button
          size="lg"
          className="w-full sm:w-auto px-6 rounded-xl btn-primary-glow"
          variant={isCompleted ? "secondary" : "default"}
          onClick={handleCTA}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
