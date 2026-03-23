"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ResumeForm, ResumeFormData } from "@/components/resume/resume-form"
import { useToast } from "@/hooks/use-toast"
import { 
  FileText, 
  Download, 
  FileCode,
  Code
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { TemplateSelector } from "@/components/template-selector"

export default function EditResumePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'templates'>('edit')

  const resumeId = params.id as string

  useEffect(() => {
    if (resumeId) {
      fetchResume()
    }
  }, [resumeId])

  const fetchResume = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch resume")
      const data = await response.json()
      setResumeData({
        id: data.id,
        title: data.title,
        domain: data.domain,
        personalInfo: data.personal_info,
        objective: data.objective || '',
        skills: data.skills || [],
        education: data.education || [],
        experience: data.experience || [],
        certificates: data.certificates || [],
        internships: data.internships || [],
        projects: data.projects || [],
        presentations: data.presentations || [],
        achievements: data.achievements || [],
        extracurricular: data.extracurricular || [],
        languages: data.languages || [],
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resume",
        variant: "destructive",
      })
      router.push("/dashboard/resumes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: ResumeFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: resumeId }),
      })

      if (!response.ok) {
        throw new Error("Failed to save resume")
      }

      // Update local state immediately
      setResumeData(data)
      
      toast({
        title: "Success",
        description: "Resume updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save resume",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportPDF = async () => {
    if (!resumeData) return
    
    try {
      // Fetch fresh resume data to ensure latest changes
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch latest resume data")
      
      const freshResumeData = await response.json()
      const formattedData = {
        id: freshResumeData.id,
        title: freshResumeData.title,
        domain: freshResumeData.domain,
        personalInfo: freshResumeData.personal_info,
        personal_info: freshResumeData.personal_info,
        objective: freshResumeData.objective || '',
        skills: freshResumeData.skills || [],
        education: freshResumeData.education || [],
        experience: freshResumeData.experience || [],
        certificates: freshResumeData.certificates || [],
        internships: freshResumeData.internships || [],
        projects: freshResumeData.projects || [],
        presentations: freshResumeData.presentations || [],
        achievements: freshResumeData.achievements || [],
        extracurricular: freshResumeData.extracurricular || [],
        languages: freshResumeData.languages || [],
      }
      
      const { PDFExporter } = await import('@/lib/export/pdf-export')
      const exporter = new PDFExporter(formattedData)
      await exporter.exportToPDF()
      
      toast({
        title: "PDF Export Complete",
        description: "Resume saved as PDF successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export PDF",
        variant: "destructive",
      })
    }
  }

  const handleExportHTML = async () => {
    if (!resumeData) return
    
    try {
      // Fetch fresh resume data to ensure latest changes
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch latest resume data")
      
      const freshResumeData = await response.json()
      const formattedData = {
        id: freshResumeData.id,
        title: freshResumeData.title,
        domain: freshResumeData.domain,
        personalInfo: freshResumeData.personal_info,
        personal_info: freshResumeData.personal_info,
        objective: freshResumeData.objective || '',
        skills: freshResumeData.skills || [],
        education: freshResumeData.education || [],
        experience: freshResumeData.experience || [],
        certificates: freshResumeData.certificates || [],
        internships: freshResumeData.internships || [],
        projects: freshResumeData.projects || [],
        presentations: freshResumeData.presentations || [],
        achievements: freshResumeData.achievements || [],
        extracurricular: freshResumeData.extracurricular || [],
        languages: freshResumeData.languages || [],
      }
      
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(formattedData)
      exporter.exportToHTML()
      
      toast({
        title: "HTML Export Complete",
        description: "Resume downloaded as HTML file.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export HTML file.",
        variant: "destructive",
      })
    }
  }

  const handleExportText = async () => {
    if (!resumeData) return
    
    try {
      // Fetch fresh resume data to ensure latest changes
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch latest resume data")
      
      const freshResumeData = await response.json()
      const formattedData = {
        id: freshResumeData.id,
        title: freshResumeData.title,
        domain: freshResumeData.domain,
        personalInfo: freshResumeData.personal_info,
        personal_info: freshResumeData.personal_info,
        objective: freshResumeData.objective || '',
        skills: freshResumeData.skills || [],
        education: freshResumeData.education || [],
        experience: freshResumeData.experience || [],
        certificates: freshResumeData.certificates || [],
        internships: freshResumeData.internships || [],
        projects: freshResumeData.projects || [],
        presentations: freshResumeData.presentations || [],
        achievements: freshResumeData.achievements || [],
        extracurricular: freshResumeData.extracurricular || [],
        languages: freshResumeData.languages || [],
      }
      
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(formattedData)
      exporter.exportToText()
      
      toast({
        title: "Text Export Complete",
        description: "Resume downloaded as plain text (ATS-friendly).",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export text file.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading resume...</p>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Resume not found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Resume</h1>
          <p className="text-muted-foreground mt-2">
            Update your resume information and choose professional templates
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Download className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportPDF}>
              <FileText className="size-4 mr-2" />
              Export PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportHTML}>
              <FileCode className="size-4 mr-2" />
              Export HTML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportText}>
              <Code className="size-4 mr-2" />
              Export Text (ATS)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'edit' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('edit')}
          className="gap-2"
        >
          Edit Resume
        </Button>
        <Button
          variant={activeTab === 'templates' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('templates')}
          className="gap-2"
        >
          Templates
        </Button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'edit' ? (
        <ResumeForm
          initialData={resumeData}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      ) : (
        <TemplateSelector key={resumeData?.id || 'template'} resumeData={resumeData} />
      )}
    </div>
  )
}
