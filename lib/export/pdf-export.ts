import { ResumeFormData } from '@/components/resume/resume-form'

// PDF Export using browser print dialog (most reliable method)
export class PDFExporter {
  private data: ResumeFormData

  constructor(data: ResumeFormData) {
    this.data = data
  }

  // Export to PDF using direct download
  async exportToPDF(): Promise<void> {
    try {
      // Generate HTML content
      const htmlContent = this.generatePrintableHTML()
      
      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${this.sanitizeFilename(this.data.title || 'resume')}.html`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      URL.revokeObjectURL(url)
      
      // Show user instructions
      this.showPDFInstructions()
      
    } catch (error) {
      console.error('PDF export error:', error)
      throw new Error('Failed to export PDF')
    }
  }

  // Show instructions for converting HTML to PDF
  private showPDFInstructions(): void {
    // Create instruction modal
    const modal = document.createElement('div')
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `
    
    const content = document.createElement('div')
    content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 8px;
      max-width: 500px;
      text-align: center;
      font-family: Arial, sans-serif;
    `
    
    content.innerHTML = `
      <h2 style="color: #333; margin-bottom: 20px;">📄 PDF Export Instructions</h2>
      <p style="color: #666; margin-bottom: 15px;">Your resume has been downloaded as an HTML file.</p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0; text-align: left;">
        <h3 style="color: #333; margin-bottom: 10px;">To convert to PDF:</h3>
        <ol style="color: #666; margin: 0; padding-left: 20px;">
          <li>Open the downloaded HTML file in your browser</li>
          <li>Press <strong>Ctrl+P</strong> (Windows) or <strong>Cmd+P</strong> (Mac)</li>
          <li>Choose "Save as PDF" from the print dialog</li>
          <li>Save as "resume.pdf"</li>
        </ol>
      </div>
      <p style="color: #999; font-size: 14px; margin-top: 20px;">This method ensures perfect formatting and A4 paper size.</p>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: #007acc;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 20px;
      ">Got it!</button>
    `
    
    modal.appendChild(content)
    document.body.appendChild(modal)
    
    // Auto-close after 15 seconds
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal)
      }
    }, 15000)
  }

  // Generate HTML content for printing
  private generatePrintableHTML(): string {
    const personalInfo = (this.data as any).personal_info || this.data.personalInfo || {}
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.escapeHtml(this.data.title || 'Resume')}</title>
        <style>
          ${this.getPrintStyles()}
        </style>
      </head>
      <body>
        <div class="resume-print">
          <header class="resume-header">
            <h1 class="name">${this.escapeHtml(personalInfo?.fullName || 'Your Name')}</h1>
            <div class="contact-info">
              <span>${this.escapeHtml(personalInfo?.email || 'email@example.com')}</span>
              <span class="separator">|</span>
              <span>${this.escapeHtml(personalInfo?.phone || 'Phone')}</span>
              <span class="separator">|</span>
              <span>${this.escapeHtml(personalInfo?.location || 'Location')}</span>
            </div>
          </header>

          ${personalInfo?.summary ? `
            <section class="resume-section">
              <h2 class="section-title">Professional Summary</h2>
              <p class="summary">${this.escapeHtml(personalInfo.summary)}</p>
            </section>
          ` : ''}

          ${(this.data as any).objective ? `
            <section class="resume-section">
              <h2 class="section-title">Objective</h2>
              <p class="objective">${this.escapeHtml((this.data as any).objective)}</p>
            </section>
          ` : ''}

          ${(this.data as any).experience && (this.data as any).experience.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Work Experience</h2>
              ${(this.data as any).experience.map((exp: any) => `
                <div class="experience-item">
                  <h3 class="position">${this.escapeHtml(exp.position)}</h3>
                  <p class="company">${this.escapeHtml(exp.company)} | ${this.escapeHtml(exp.startDate)} - ${this.escapeHtml(exp.endDate)}</p>
                  <p class="description">${this.escapeHtml(exp.description)}</p>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${(this.data as any).education && (this.data as any).education.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Education</h2>
              ${(this.data as any).education.map((edu: any) => `
                <div class="education-item">
                  <h3 class="degree">${this.escapeHtml(edu.degree)} in ${this.escapeHtml(edu.field)}</h3>
                  <p class="school">${this.escapeHtml(edu.school)} | ${this.escapeHtml(edu.startYear)} - ${this.escapeHtml(edu.endYear)}</p>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${(this.data as any).skills && (this.data as any).skills.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Skills</h2>
              <div class="skills-list">
                ${(this.data as any).skills.map((skill: any) => `
                  <span class="skill-tag">${this.escapeHtml(skill)}</span>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${(this.data as any).projects && (this.data as any).projects.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Projects</h2>
              ${(this.data as any).projects.map((project: any) => `
                <div class="project-item">
                  <h3 class="project-title">${this.escapeHtml(project.title)}</h3>
                  <p class="project-description">${this.escapeHtml(project.description)}</p>
                  ${project.technologies ? `
                    <p class="project-tech"><strong>Technologies:</strong> ${this.escapeHtml(project.technologies)}</p>
                  ` : ''}
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${(this.data as any).certificates && (this.data as any).certificates.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Certificates</h2>
              ${(this.data as any).certificates.map((cert: any) => `
                <div class="certificate-item">
                  <h3 class="cert-name">${this.escapeHtml(cert.name)}</h3>
                  <p class="cert-issuer">${this.escapeHtml(cert.issuer)} - ${this.escapeHtml(cert.date)}</p>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${(this.data as any).achievements && (this.data as any).achievements.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Achievements</h2>
              ${(this.data as any).achievements.map((achievement: any) => `
                <div class="achievement-item">
                  <h3 class="achievement-title">${this.escapeHtml(achievement.title)}</h3>
                  <p class="achievement-description">${this.escapeHtml(achievement.description)}</p>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${(this.data as any).languages && (this.data as any).languages.length > 0 ? `
            <section class="resume-section">
              <h2 class="section-title">Languages</h2>
              ${(this.data as any).languages.map((lang: any) => `
                <div class="language-item">
                  <span class="language-name">${typeof lang === 'string' ? lang : this.escapeHtml(lang.name || '')}</span>
                  <span class="language-level">${typeof lang === 'string' ? '' : this.escapeHtml(lang.level || '')}</span>
                </div>
              `).join('')}
            </section>
          ` : ''}
        </div>
      </body>
      </html>
    `
  }

  // Professional print styles for A4 paper
  private getPrintStyles(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Calibri', 'Arial', sans-serif;
        line-height: 1.4;
        color: #2c3e50;
        background: white;
        max-width: 210mm;
        margin: 0 auto;
        padding: 15mm;
        size: A4;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .resume-print {
        width: 100%;
        height: 100%;
      }
      
      .resume-header {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #2c3e50;
        text-align: center;
      }
      
      .name {
        font-size: 24pt;
        font-weight: bold;
        color: #2c3e50;
        margin: 0 0 8px 0;
        letter-spacing: 1px;
      }
      
      .contact-info {
        font-size: 11pt;
        color: #7f8c8d;
        margin-top: 8px;
      }
      
      .separator {
        margin: 0 8px;
      }
      
      .resume-section {
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      
      .section-title {
        font-size: 14pt;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .experience-item, .education-item {
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
      
      .position, .degree, .project-title, .cert-name, .achievement-title {
        font-size: 12pt;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 5px;
      }
      
      .company, .school, .cert-issuer {
        font-size: 11pt;
        color: #7f8c8d;
        font-style: italic;
        margin-bottom: 5px;
      }
      
      .date {
        font-size: 10pt;
        color: #7f8c8d;
      }
      
      .description, .summary, .project-description, .achievement-description {
        font-size: 11pt;
        text-align: justify;
        margin-top: 5px;
        line-height: 1.4;
      }
      
      .skills-list, .projects-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .skill-tag {
        background: #ecf0f1;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10pt;
        border: 1px solid #bdc3c7;
        margin-bottom: 4px;
      }
      
      .project-tech {
        font-size: 10pt;
        color: #7f8c8d;
        margin-top: 5px;
      }
      
      .language-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
      
      .language-name, .language-level {
        font-size: 11pt;
      }
      
      .language-level {
        color: #7f8c8d;
      }
      
      @page {
        size: A4;
        margin: 0;
        padding: 0;
      }
      
      @media print {
        body {
          font-size: 10pt;
        }
        
        .name {
          font-size: 20pt;
        }
        
        .section-title {
          font-size: 12pt;
        }
        
        .position, .degree, .project-title, .cert-name, .achievement-title {
          font-size: 11pt;
        }
        
        .company, .school, .cert-issuer {
          font-size: 10pt;
        }
        
        .date {
          font-size: 9pt;
        }
        
        .description, .summary, .project-description, .achievement-description {
          font-size: 10pt;
        }
        
        .skill-tag {
          font-size: 9pt;
          padding: 3px 6px;
        }
      }
    `
  }

  // Helper function to escape HTML
  private escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  // Helper function to sanitize filename
  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }
}

