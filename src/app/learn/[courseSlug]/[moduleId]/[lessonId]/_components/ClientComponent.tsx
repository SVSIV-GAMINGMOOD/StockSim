'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ClientComponent() {
  // useParams gets dynamic route segments
  const params = useParams<{
    courseSlug: string
    moduleSlug: string
    lessonId: string
  }>()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      if (!params?.moduleSlug || !params?.lessonId) return

      // Example API call using moduleSlug and lessonId
      const res = await fetch(
        `/api/lessons?moduleSlug=${params.moduleSlug}&lessonId=${params.lessonId}`
      )
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [params])

  return (
    <div>
      <h2>Module: {params?.moduleSlug}</h2>
      <h2>Lesson: {params?.lessonId}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
