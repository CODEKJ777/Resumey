"use client"

import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"

interface Resume {
  id: string
  title: string
  personal_info: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  skills: string[]
  education: Array<{ id: string; school: string }>
  experience: Array<{ id: string; company: string }>
}

interface ATSScore {
  score: number
  strengths: string[]
  improvements: string[]
}

export default function ATSScorePage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResumeId, setSelectedResumeId] = useState<string>("")
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchResumes()
  }, [])

  useEffect(() => {
    if (selectedResumeId) {
      calculateATSScore(selectedResumeId)
    }
  }, [selectedResumeId])

  const fetchResumes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/resumes")
      if (!response.ok) throw new Error("Failed to fetch resumes")
      const data = await response.json()
      setResumes(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateATSScore = async (resumeId: string) => {
    try {
      setIsCalculating(true)
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch resume")
      const resume = await response.json()

      // Calculate ATS score based on resume completeness
      let score = 0
      const strengths: string[] = []
      const improvements: string[] = []

      // Check personal info (25 points)
      if (resume.personal_info.fullName) {
        score += 5
        strengths.push("Full name included")
      } else {
        improvements.push("Add your full name")
      }

      if (resume.personal_info.email) {
        score += 5
        strengths.push("Email provided")
      } else {
        improvements.push("Add your email address")
      }

      if (resume.personal_info.phone) {
        score += 5
        strengths.push("Phone number included")
      } else {
        improvements.push("Add your phone number")
      }

      if (resume.personal_info.summary && resume.personal_info.summary.length > 20) {
        score += 10
        strengths.push("Professional summary completed")
      } else {
        improvements.push("Write a professional summary (20+ characters)")
      }

      // Check skills (20 points)
      if (resume.skills && resume.skills.length >= 5) {
        score += 15
        strengths.push(`${resume.skills.length} skills listed`)
      } else if (resume.skills && resume.skills.length > 0) {
        score += 10
        improvements.push("Add more skills (aim for 5+)")
      } else {
        improvements.push("Add relevant skills")
      }

      // Check education (20 points)
      if (resume.education && resume.education.length > 0) {
        score += 20
        strengths.push(
          `${resume.education.length} education ${
            resume.education.length === 1 ? "entry" : "entries"
          } included`
        )
      } else {
        improvements.push("Add your education history")
      }

      // Check experience (35 points)
      if (resume.experience && resume.experience.length > 0) {
        score += Math.min(35, resume.experience.length * 10)
        strengths.push(
          `${resume.experience.length} experience ${
            resume.experience.length === 1 ? "entry" : "entries"
          } included`
        )
      } else {
        improvements.push("Add your work experience")
      }

      setAtsScore({
        score: Math.min(100, score),
        strengths,
        improvements,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate ATS score",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ATS Score</h1>
        <p className="text-muted-foreground mt-2">
          Check how well your resume is optimized for ATS systems
        </p>
      </div>

      {/* Selection */}
      <div className="max-w-md">
        <label className="text-sm font-medium">Select Resume</label>
        <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a resume" />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {atsScore && (
        <div className="space-y-4">
          {/* Score Display */}
          <Card className="p-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div
                  className={`text-5xl font-bold ${getScoreColor(atsScore.score)}`}
                >
                  {atsScore.score}
                </div>
                <p className="text-muted-foreground text-sm mt-2">out of 100</p>
              </div>
              <div className="flex-1">
                <Progress value={atsScore.score} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {atsScore.score >= 80
                    ? "Excellent ATS optimization"
                    : atsScore.score >= 60
                    ? "Good ATS compatibility"
                    : "Needs improvement"}
                </p>
              </div>
            </div>
          </Card>

          {/* Strengths */}
          {atsScore.strengths.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-600" />
                Strengths
              </h3>
              <div className="space-y-2">
                {atsScore.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="size-1.5 rounded-full bg-green-600" />
                    {strength}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Improvements */}
          {atsScore.improvements.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="size-5 text-yellow-600" />
                Areas for Improvement
              </h3>
              <div className="space-y-2">
                {atsScore.improvements.map((improvement, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="size-1.5 rounded-full bg-yellow-600" />
                    {improvement}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tips */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="size-5 text-blue-600" />
              ATS Optimization Tips
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Use standard fonts and formatting for better parsing</li>
              <li>• Include relevant keywords from job descriptions</li>
              <li>• Avoid graphics, tables, and special formatting</li>
              <li>• Use standard section headings (Experience, Skills, etc.)</li>
              <li>• Keep dates in a consistent format</li>
              <li>• Use common file formats like PDF or DOCX</li>
            </ul>
          </Card>
        </div>
      )}

      {!selectedResumeId && resumes.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Create a resume first to check its ATS score
          </p>
        </Card>
      )}
    </div>
  )
}
