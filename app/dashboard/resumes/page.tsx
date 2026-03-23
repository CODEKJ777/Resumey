"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { 
  FileText, 
  Edit2, 
  Trash2, 
  Download, 
  Plus, 
  Eye, 
  Copy,
  Code,
  FileCode,
  MoreVertical,
  Share2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Resume {
  id: string
  title: string
  domain: string
  personal_info?: {
    fullName?: string
    email?: string
    phone?: string
    summary?: string
  }
  created_at: string
  updated_at: string
}

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      setIsLoading(true)
      console.log("Fetching resumes...")
      const response = await fetch("/api/resumes")
      console.log("Response status:", response.status)
      if (!response.ok) throw new Error("Failed to fetch resumes")
      const data = await response.json()
      console.log("Received data:", data)
      setResumes(data || [])
    } catch (error) {
      console.error("Error fetching resumes:", error)
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      const response = await fetch(`/api/resumes?id=${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete resume")
      setResumes(resumes.filter((r) => r.id !== id))
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      })
    }
  }

  const handleExportPDF = async (resume: Resume) => {
    try {
      // Fetch full resume data
      const response = await fetch(`/api/resumes?id=${resume.id}`)
      if (!response.ok) throw new Error("Failed to fetch resume data")
      
      const fullResumeData = await response.json()
      
      // Use the new export system
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(fullResumeData)
      await exporter.exportToPDF()
      
      toast({
        title: "PDF Export Complete",
        description: "Resume saved as PDF successfully.",
      })
    } catch (error: any) {
      console.error('PDF export error:', error)
      
      let description = "Failed to export PDF. Please try again."
      if (error.message && error.message.includes('popups')) {
        description = "Please allow popups for this site to export PDF."
      }
      
      toast({
        title: "Export Failed",
        description: description,
        variant: "destructive",
      })
    }
  }

  const handleExportHTML = async (resume: Resume) => {
    try {
      // Fetch full resume data
      const response = await fetch(`/api/resumes?id=${resume.id}`)
      if (!response.ok) throw new Error("Failed to fetch resume data")
      
      const fullResumeData = await response.json()
      
      // Use the new export system
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(fullResumeData)
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

  const handleExportText = async (resume: Resume) => {
    try {
      // Fetch full resume data
      const response = await fetch(`/api/resumes?id=${resume.id}`)
      if (!response.ok) throw new Error("Failed to fetch resume data")
      
      const fullResumeData = await response.json()
      
      // Use the new export system
      const { ResumeExporter } = await import('@/lib/export')
      const exporter = new ResumeExporter(fullResumeData)
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

  const handleExportPNG = async (resume: Resume) => {
    toast({
      title: "PNG Export",
      description: "Use HTML export and take a screenshot for PNG format.",
      variant: "default",
    })
  }

  const handleExportWord = async (resume: Resume) => {
    toast({
      title: "Word Export",
      description: "Use HTML export and open in Word for editing.",
      variant: "default",
    })
  }

  const handleDuplicate = async (resume: Resume) => {
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...resume,
          title: `${resume.title} (Copy)`,
          id: undefined, // Create new resume
        }),
      })

      if (!response.ok) throw new Error("Failed to duplicate resume")
      
      const newResume = await response.json()
      setResumes([newResume, ...resumes])
      
      toast({
        title: "Success",
        description: "Resume duplicated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate resume",
        variant: "destructive",
      })
    }
  }

  const handleShare = (resume: Resume) => {
    // Copy share link to clipboard
    const shareUrl = `${window.location.origin}/dashboard/resumes/${resume.id}`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link Copied",
      description: "Resume link copied to clipboard",
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view all your saved resumes
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button className="gap-2">
            <Plus className="size-4" />
            New Resume
          </Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <FileText className="size-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first professional resume to get started on your job search journey
            </p>
            <Link href="/dashboard/create">
              <Button size="lg" className="gap-2">
                <Plus className="size-4" />
                Create Your First Resume
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <Card key={resume.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              {/* Resume Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{resume.title}</h3>
                    <p className="text-sm text-muted-foreground">{resume.domain}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare(resume)}>
                        <Share2 className="size-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(resume)}>
                        <Copy className="size-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(resume.id)} className="text-destructive">
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Resume Content Preview */}
              <div className="p-4">
                {resume.personal_info?.fullName && (
                  <div className="mb-3">
                    <p className="font-medium text-sm">{resume.personal_info.fullName}</p>
                    {resume.personal_info.email && (
                      <p className="text-xs text-muted-foreground">{resume.personal_info.email}</p>
                    )}
                    {resume.personal_info.phone && (
                      <p className="text-xs text-muted-foreground">{resume.personal_info.phone}</p>
                    )}
                  </div>
                )}
                
                {resume.personal_info?.summary && (
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                    {resume.personal_info.summary}
                  </p>
                )}

                <div className="text-xs text-muted-foreground mb-4">
                  <p>Updated {new Date(resume.updated_at).toLocaleDateString()}</p>
                  <p>Created {new Date(resume.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex gap-2">
                <Link href={`/dashboard/resumes/${resume.id}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Edit2 className="size-4" />
                    Edit
                  </Button>
                </Link>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setSelectedResume(resume)}>
                      <Eye className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{resume.title}</DialogTitle>
                      <DialogDescription>
                        Preview of your resume
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Resume Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Title:</strong> {resume.title}</p>
                          <p><strong>Domain:</strong> {resume.domain}</p>
                          <p><strong>Last Updated:</strong> {new Date(resume.updated_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={() => handleExportPDF(resume)} className="gap-2">
                          <FileText className="size-4" />
                          Export PDF
                        </Button>
                        <Button onClick={() => handleExportHTML(resume)} variant="outline" className="gap-2">
                          <FileCode className="size-4" />
                          Export HTML
                        </Button>
                        <Button onClick={() => handleExportText(resume)} variant="outline" className="gap-2">
                          <Code className="size-4" />
                          Export Text
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleExportPDF(resume)}>
                      <FileText className="size-4 mr-2" />
                      Export PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExportHTML(resume)}>
                      <FileCode className="size-4 mr-2" />
                      Export HTML
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExportText(resume)}>
                      <Code className="size-4 mr-2" />
                      Export Text (ATS)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
