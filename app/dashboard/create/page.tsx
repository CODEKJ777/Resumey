"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ResumeForm, ResumeFormData } from "@/components/resume/resume-form"
import { useToast } from "@/hooks/use-toast"

export default function CreateResumePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ResumeFormData) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save resume")
      }

      const result = await response.json()
      toast({
        title: "Success",
        description: "Resume created successfully! (Class project - not saved to database)",
      })
      router.push(`/dashboard/resumes/${result.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save resume",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Resume</h1>
        <p className="text-muted-foreground mt-2">
          Build a professional resume tailored to your career goals (Class Project Demo)
        </p>
      </div>
      <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
