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
import { Badge } from "@/components/ui/badge"

interface Resume {
  id: string
  title: string
  domain: string
  personal_info: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  skills: string[]
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    startYear: string
    endYear: string
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
}

export default function CompareResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [resume1Id, setResume1Id] = useState<string>("")
  const [resume2Id, setResume2Id] = useState<string>("")
  const [resume1, setResume1] = useState<Resume | null>(null)
  const [resume2, setResume2] = useState<Resume | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchResumes()
  }, [])

  useEffect(() => {
    if (resume1Id) fetchResumeDetail(resume1Id, setResume1)
  }, [resume1Id])

  useEffect(() => {
    if (resume2Id) fetchResumeDetail(resume2Id, setResume2)
  }, [resume2Id])

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

  const fetchResumeDetail = async (
    id: string,
    setFn: (resume: Resume | null) => void
  ) => {
    try {
      const response = await fetch(`/api/resumes?id=${id}`)
      if (!response.ok) throw new Error("Failed to fetch resume")
      const data = await response.json()
      setFn(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resume details",
        variant: "destructive",
      })
    }
  }

  const ComparisonSection = ({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  )

  const ResumeField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-medium text-sm">{value || "-"}</p>
    </div>
  )

  const SkillsComparison = ({ resume }: { resume: Resume | null }) => (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Skills</p>
      <div className="flex flex-wrap gap-2">
        {resume?.skills && resume.skills.length > 0 ? (
          resume.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No skills added</p>
        )}
      </div>
    </div>
  )

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
        <h1 className="text-3xl font-bold tracking-tight">Compare Resumes</h1>
        <p className="text-muted-foreground mt-2">
          View two resumes side-by-side to compare them
        </p>
      </div>

      {/* Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Resume 1</label>
          <Select value={resume1Id} onValueChange={setResume1Id}>
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
        <div>
          <label className="text-sm font-medium">Resume 2</label>
          <Select value={resume2Id} onValueChange={setResume2Id}>
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
      </div>

      {resume1 && resume2 && (
        <Card className="p-6 space-y-6">
          {/* Personal Info */}
          <ComparisonSection title="Personal Information">
            <div className="space-y-2">
              <ResumeField
                label="Name"
                value={resume1.personal_info.fullName}
              />
              <ResumeField
                label="Email"
                value={resume1.personal_info.email}
              />
              <ResumeField
                label="Phone"
                value={resume1.personal_info.phone}
              />
              <ResumeField
                label="Location"
                value={resume1.personal_info.location}
              />
            </div>
            <div className="space-y-2">
              <ResumeField
                label="Name"
                value={resume2.personal_info.fullName}
              />
              <ResumeField
                label="Email"
                value={resume2.personal_info.email}
              />
              <ResumeField
                label="Phone"
                value={resume2.personal_info.phone}
              />
              <ResumeField
                label="Location"
                value={resume2.personal_info.location}
              />
            </div>
          </ComparisonSection>

          {/* Skills */}
          <ComparisonSection title="Skills">
            <SkillsComparison resume={resume1} />
            <SkillsComparison resume={resume2} />
          </ComparisonSection>

          {/* Education Count */}
          <ComparisonSection title="Education">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total entries: {resume1.education?.length || 0}
              </p>
              {resume1.education && resume1.education.length > 0 && (
                <div className="space-y-1 text-sm">
                  {resume1.education.map((edu) => (
                    <p key={edu.id}>{edu.school}</p>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total entries: {resume2.education?.length || 0}
              </p>
              {resume2.education && resume2.education.length > 0 && (
                <div className="space-y-1 text-sm">
                  {resume2.education.map((edu) => (
                    <p key={edu.id}>{edu.school}</p>
                  ))}
                </div>
              )}
            </div>
          </ComparisonSection>

          {/* Experience Count */}
          <ComparisonSection title="Experience">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total entries: {resume1.experience?.length || 0}
              </p>
              {resume1.experience && resume1.experience.length > 0 && (
                <div className="space-y-1 text-sm">
                  {resume1.experience.map((exp) => (
                    <p key={exp.id}>{exp.position}</p>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total entries: {resume2.experience?.length || 0}
              </p>
              {resume2.experience && resume2.experience.length > 0 && (
                <div className="space-y-1 text-sm">
                  {resume2.experience.map((exp) => (
                    <p key={exp.id}>{exp.position}</p>
                  ))}
                </div>
              )}
            </div>
          </ComparisonSection>
        </Card>
      )}

      {!resume1 && !resume2 && resumes.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Create at least two resumes to compare them
          </p>
        </Card>
      )}
    </div>
  )
}
