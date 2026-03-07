"use client"

import { useState } from "react"
import { ResumeFormData } from "@/components/resume/resume-form"
import { RESUME_TEMPLATES } from "@/lib/templates/resume-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Eye, Download, FileText } from "lucide-react"
import { PDFExporter } from "@/lib/export/pdf-export"

interface TemplateSelectorProps {
  resumeData: ResumeFormData
}

export function TemplateSelector({ resumeData }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof RESUME_TEMPLATES>('MODERN')
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const currentTemplate = RESUME_TEMPLATES[selectedTemplate]
  const TemplateComponent = currentTemplate.component

  const handleExportPDF = async () => {
    try {
      setIsExporting(true)
      const exporter = new PDFExporter(resumeData)
      await exporter.exportToPDF()
      
      toast({
        title: "PDF Download Started",
        description: "HTML file downloaded. Follow instructions to convert to PDF.",
      })
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export PDF",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handlePreview = () => {
    const previewWindow = window.open('', '_blank', 'width=800,height=600')
    if (!previewWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Template Preview</title>
        <style>
          ${currentTemplate.styles}
        </style>
      </head>
      <body>
        <div class="preview-header" style="position: fixed; top: 10px; right: 10px; background: #f0f0f0; padding: 10px; border-radius: 5px; z-index: 1000;">
          <p><strong>Preview Mode</strong></p>
          <small>Template: ${currentTemplate.name}</small>
        </div>
        <div id="template-preview"></div>
        <script>
          // Render the template
          const templateData = ${JSON.stringify(resumeData)};
          // This would be replaced with actual template rendering
          document.getElementById('template-preview').innerHTML = '<p>Template preview would render here</p>';
        </script>
      </body>
      </html>
    `
    
    previewWindow.document.write(htmlContent)
    previewWindow.document.close()
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Resume Templates</h3>
            <p className="text-sm text-muted-foreground">Choose a professional template for your resume</p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline" size="sm" className="gap-2">
              <Eye className="size-4" />
              Preview
            </Button>
            <Button onClick={handleExportPDF} disabled={isExporting} size="sm" className="gap-2">
              <FileText className="size-4" />
              {isExporting ? "Downloading..." : "Download PDF"}
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Select value={selectedTemplate} onValueChange={(value: keyof typeof RESUME_TEMPLATES) => setSelectedTemplate(value)}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(RESUME_TEMPLATES).map(([key, template]) => (
                <SelectItem key={key} value={key}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="mb-4">
            <h4 className="font-medium text-sm text-muted-foreground mb-2">
              Template: {currentTemplate.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              Preview of your resume with the selected template
            </p>
          </div>
          
          <div 
            className="template-preview-container"
            style={{
              transform: 'scale(0.7)',
              transformOrigin: 'top left',
              width: '142%',
              height: '600px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              background: 'white'
            }}
          >
            <style>{currentTemplate.styles}</style>
            <div className="template-wrapper">
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Template Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h5 className="font-medium text-sm">✨ Professional Design</h5>
            <p className="text-xs text-muted-foreground">
              Clean, modern layouts optimized for A4 paper size
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-sm">📄 Print-Ready</h5>
            <p className="text-xs text-muted-foreground">
              Optimized CSS for high-quality PDF exports
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-sm">🎨 Multiple Styles</h5>
            <p className="text-xs text-muted-foreground">
              Choose from Modern, Classic, Minimal, Creative, and Executive templates
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-sm">📱 Responsive</h5>
            <p className="text-xs text-muted-foreground">
              Templates adapt to different screen sizes
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-sm">⚡ Fast Export</h5>
            <p className="text-xs text-muted-foreground">
              Quick PDF generation with browser print dialog
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-sm">🔧 Customizable</h5>
            <p className="text-xs text-muted-foreground">
              Easy to modify styles and add new templates
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
