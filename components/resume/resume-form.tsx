"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SkillsInput } from "./skills-input"
import { EducationSection } from "./education-section"
import { ExperienceSection } from "./experience-section"
import { GenericListSection } from "./generic-list-section"
import { LanguagesInput } from "./languages-input"

export interface ResumeFormData {
  id?: string
  title: string
  domain: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  objective: string
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
  certificates: Array<{
    id: string
    name: string
    issuer: string
    date: string
  }>
  internships: Array<{
    id: string
    company: string
    position: string
    duration: string
    description: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string
  }>
  presentations: Array<{
    id: string
    title: string
    event: string
    date: string
  }>
  achievements: Array<{
    id: string
    title: string
    description: string
  }>
  extracurricular: Array<{
    id: string
    activity: string
    description: string
  }>
  languages: string[]
}

interface ResumeFormProps {
  initialData?: Partial<ResumeFormData>
  onSubmit: (data: ResumeFormData) => Promise<void>
  isLoading?: boolean
}

const DOMAINS = [
  "Cybersecurity",
  "Web Development",
  "AI/Machine Learning",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Cloud Architecture",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
]

export function ResumeForm({
  initialData = {},
  onSubmit,
  isLoading = false,
}: ResumeFormProps) {
  const [formData, setFormData] = useState<ResumeFormData>({
    id: initialData.id,
    title: initialData.title || "",
    domain: initialData.domain || "",
    personalInfo: {
      fullName: initialData.personalInfo?.fullName || "",
      email: initialData.personalInfo?.email || "",
      phone: initialData.personalInfo?.phone || "",
      location: initialData.personalInfo?.location || "",
      summary: initialData.personalInfo?.summary || "",
    },
    objective: initialData.objective || "",
    skills: initialData.skills || [],
    education: initialData.education || [],
    experience: initialData.experience || [],
    certificates: initialData.certificates || [],
    internships: initialData.internships || [],
    projects: initialData.projects || [],
    presentations: initialData.presentations || [],
    achievements: initialData.achievements || [],
    extracurricular: initialData.extracurricular || [],
    languages: initialData.languages || [],
  })
  
  const [showCustomDomain, setShowCustomDomain] = useState(
    initialData.domain && !DOMAINS.includes(initialData.domain)
  )
  const [customDomain, setCustomDomain] = useState(
    showCustomDomain ? initialData.domain || "" : ""
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Resume Title</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Developer Resume"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="domain">Domain</Label>
            {!showCustomDomain ? (
              <Select
                value={formData.domain}
                onValueChange={(value) => {
                  if (value === "other") {
                    setShowCustomDomain(true)
                    setCustomDomain("")
                  } else {
                    setFormData({ ...formData, domain: value })
                  }
                }}
              >
                <SelectTrigger id="domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {DOMAINS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other (specify below)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Enter your domain"
                  value={customDomain}
                  onChange={(e) => {
                    setCustomDomain(e.target.value)
                    setFormData({ ...formData, domain: e.target.value })
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCustomDomain(false)
                    setFormData({ ...formData, domain: "" })
                  }}
                >
                  Choose from list
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.personalInfo.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      fullName: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.personalInfo.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      email: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.personalInfo.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      phone: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                value={formData.personalInfo.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      location: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              placeholder="Brief summary of your professional background and goals"
              value={formData.personalInfo.summary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalInfo: {
                    ...formData.personalInfo,
                    summary: e.target.value,
                  },
                })
              }
              className="min-h-24"
            />
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <SkillsInput
          value={formData.skills}
          onChange={(skills) => setFormData({ ...formData, skills })}
        />
      </Card>

      {/* Objective */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Objective</h3>
        <p className="text-sm text-muted-foreground mb-4">Express your interest and enthusiasm, be realistic, and ensure it aligns with the employer's needs.</p>
        <Textarea
          placeholder="State your career objective and professional goals..."
          value={formData.objective}
          onChange={(e) =>
            setFormData({ ...formData, objective: e.target.value })
          }
          className="min-h-24"
        />
      </Card>

      {/* Education */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        <EducationSection
          value={formData.education}
          onChange={(education) => setFormData({ ...formData, education })}
        />
      </Card>

      {/* Experience */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Experience</h3>
        <ExperienceSection
          value={formData.experience}
          onChange={(experience) => setFormData({ ...formData, experience })}
        />
      </Card>

      {/* Certificates */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Certificates & Courses</h3>
        <GenericListSection
          value={formData.certificates}
          onChange={(certificates) => setFormData({ ...formData, certificates })}
          fields={[
            { name: "name", label: "Certificate/Course Name", placeholder: "e.g., AWS Solutions Architect" },
            { name: "issuer", label: "Issuer/Organization", placeholder: "e.g., Amazon Web Services" },
            { name: "date", label: "Date Obtained", placeholder: "MM/YYYY" },
          ]}
          title="Certificate"
        />
      </Card>

      {/* Internships */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Internship Experiences</h3>
        <GenericListSection
          value={formData.internships}
          onChange={(internships) => setFormData({ ...formData, internships })}
          fields={[
            { name: "company", label: "Company", placeholder: "Company name" },
            { name: "position", label: "Position", placeholder: "e.g., Software Engineering Intern" },
            { name: "duration", label: "Duration", placeholder: "e.g., Jun 2023 - Aug 2023" },
            { name: "description", label: "Description", type: "textarea", placeholder: "What you did during the internship..." },
          ]}
          title="Internship"
        />
      </Card>

      {/* Projects */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <GenericListSection
          value={formData.projects}
          onChange={(projects) => setFormData({ ...formData, projects })}
          fields={[
            { name: "title", label: "Project Title", placeholder: "Project name" },
            { name: "description", label: "Description", type: "textarea", placeholder: "What the project is about..." },
            { name: "technologies", label: "Technologies Used", placeholder: "e.g., React, Node.js, PostgreSQL" },
          ]}
          title="Project"
        />
      </Card>

      {/* Presentations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Paper Presentations</h3>
        <GenericListSection
          value={formData.presentations}
          onChange={(presentations) => setFormData({ ...formData, presentations })}
          fields={[
            { name: "title", label: "Presentation Title", placeholder: "Title of presentation" },
            { name: "event", label: "Event/Conference", placeholder: "Event or conference name" },
            { name: "date", label: "Date", placeholder: "MM/YYYY" },
          ]}
          title="Presentation"
        />
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Achievements & Awards</h3>
        <GenericListSection
          value={formData.achievements}
          onChange={(achievements) => setFormData({ ...formData, achievements })}
          fields={[
            { name: "title", label: "Award/Achievement Title", placeholder: "Award name" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Details about the achievement..." },
          ]}
          title="Achievement"
        />
      </Card>

      {/* Extracurricular */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Extracurricular Activities & Hobbies</h3>
        <GenericListSection
          value={formData.extracurricular}
          onChange={(extracurricular) => setFormData({ ...formData, extracurricular })}
          fields={[
            { name: "activity", label: "Activity/Hobby", placeholder: "e.g., Leadership in Student Club" },
            { name: "description", label: "Description", type: "textarea", placeholder: "More details..." },
          ]}
          title="Activity"
        />
      </Card>

      {/* Languages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Languages Known</h3>
        <LanguagesInput
          value={formData.languages}
          onChange={(languages) => setFormData({ ...formData, languages })}
        />
      </Card>

      {/* Actions */}
      <div className="flex gap-3 sticky bottom-0 bg-background pt-4 border-t">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : "Save Resume"}
        </Button>
      </div>
    </form>
  )
}
