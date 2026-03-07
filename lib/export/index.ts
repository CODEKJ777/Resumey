import { ResumeFormData } from '@/components/resume/resume-form'

// Real-world export system using browser-native APIs
export class ResumeExporter {
  private data: ResumeFormData

  constructor(data: ResumeFormData) {
    this.data = data
  }

  // Export to PDF using browser print dialog (most reliable method)
  async exportToPDF(): Promise<void> {
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) {
      throw new Error('Please allow popups for this site to export PDF')
    }

    const htmlContent = this.generatePrintableHTML()
    
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 1000)
    }
  }

  // Export to HTML file (for manual PDF conversion or editing)
  exportToHTML(): void {
    const htmlContent = this.generatePrintableHTML()
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${this.sanitizeFilename(this.data.title)}_resume.html`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  // Export to plain text (for ATS systems)
  exportToText(): void {
    const textContent = this.generatePlainText()
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${this.sanitizeFilename(this.data.title)}_resume.txt`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  // Generate professional HTML for printing
  private generatePrintableHTML(): string {
    const personalInfo = (this.data as any).personal_info
    
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
        <div class="resume">
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
            <section class="section">
              <h2 class="section-title">Professional Summary</h2>
              <p class="summary">${this.escapeHtml(personalInfo.summary)}</p>
            </section>
          ` : ''}

          ${this.data.objective ? `
            <section class="section">
              <h2 class="section-title">Objective</h2>
              <p class="objective">${this.escapeHtml(this.data.objective)}</p>
            </section>
          ` : ''}

          ${this.data.experience && this.data.experience.length > 0 ? `
            <section class="section">
              <h2 class="section-title">Work Experience</h2>
              ${this.data.experience.map(exp => `
                <div class="experience-item">
                  <div class="experience-header">
                    <h3 class="position">${this.escapeHtml(exp.position || 'Position')}</h3>
                    <span class="company">${this.escapeHtml(exp.company || 'Company')}</span>
                    <span class="date">${this.escapeHtml(exp.startDate || '')} - ${this.escapeHtml(exp.endDate || '')}</span>
                  </div>
                  <p class="description">${this.escapeHtml(exp.description || '')}</p>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${this.data.education && this.data.education.length > 0 ? `
            <section class="section">
              <h2 class="section-title">Education</h2>
              ${this.data.education.map(edu => `
                <div class="education-item">
                  <div class="education-header">
                    <h3 class="degree">${this.escapeHtml(edu.degree || '')} in ${this.escapeHtml(edu.field || '')}</h3>
                    <span class="school">${this.escapeHtml(edu.school || '')}</span>
                    <span class="date">${this.escapeHtml(edu.startYear || '')} - ${this.escapeHtml(edu.endYear || '')}</span>
                  </div>
                </div>
              `).join('')}
            </section>
          ` : ''}

          ${this.data.skills && this.data.skills.length > 0 ? `
            <section class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills">
                ${this.data.skills.map(skill => `
                  <span class="skill-tag">${this.escapeHtml(skill)}</span>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </body>
      </html>
    `
  }

  // Generate plain text for ATS systems
  private generatePlainText(): string {
    const personalInfo = (this.data as any).personal_info
    let text = ''
    
    // Header
    text += `${personalInfo?.fullName || 'Your Name'}\n`
    text += `${personalInfo?.email || 'email@example.com'} | ${personalInfo?.phone || 'Phone'} | ${personalInfo?.location || 'Location'}\n\n`
    
    // Summary
    if (personalInfo?.summary) {
      text += `PROFESSIONAL SUMMARY\n${personalInfo.summary}\n\n`
    }
    
    // Objective
    if (this.data.objective) {
      text += `OBJECTIVE\n${this.data.objective}\n\n`
    }
    
    // Experience
    if (this.data.experience && this.data.experience.length > 0) {
      text += `WORK EXPERIENCE\n`
      this.data.experience.forEach(exp => {
        text += `${exp.position} - ${exp.company} (${exp.startDate} - ${exp.endDate})\n`
        text += `${exp.description}\n\n`
      })
    }
    
    // Education
    if (this.data.education && this.data.education.length > 0) {
      text += `EDUCATION\n`
      this.data.education.forEach(edu => {
        text += `${edu.degree} in ${edu.field} - ${edu.school} (${edu.startYear} - ${edu.endYear})\n\n`
      })
    }
    
    // Skills
    if (this.data.skills && this.data.skills.length > 0) {
      text += `SKILLS\n${this.data.skills.join(', ')}\n`
    }
    
    return text
  }

  // Professional print styles
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
        color: #333;
        background: white;
        max-width: 8.5in;
        margin: 0 auto;
        padding: 0.5in;
      }
      
      .resume {
        width: 100%;
      }
      
      .resume-header {
        text-align: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #333;
      }
      
      .name {
        font-size: 24pt;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 8px;
        letter-spacing: 2px;
      }
      
      .contact-info {
        font-size: 11pt;
        color: #666;
      }
      
      .separator {
        margin: 0 8px;
      }
      
      .section {
        margin-bottom: 20px;
      }
      
      .section-title {
        font-size: 14pt;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
        letter-spacing: 1px;
      }
      
      .experience-item, .education-item {
        margin-bottom: 15px;
      }
      
      .experience-header, .education-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5px;
      }
      
      .position, .degree {
        font-size: 12pt;
        font-weight: bold;
      }
      
      .company, .school {
        font-size: 11pt;
        font-style: italic;
        color: #666;
      }
      
      .date {
        font-size: 10pt;
        color: #666;
        white-space: nowrap;
      }
      
      .description {
        font-size: 11pt;
        margin-top: 5px;
        text-align: justify;
      }
      
      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .skill-tag {
        background: #f0f0f0;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 10pt;
        border: 1px solid #ddd;
      }
      
      @media print {
        body {
          margin: 0;
          padding: 0.25in;
          font-size: 11pt;
        }
        
        .name {
          font-size: 20pt;
        }
        
        .section-title {
          font-size: 12pt;
        }
        
        .position, .degree {
          font-size: 11pt;
        }
        
        .company, .school {
          font-size: 10pt;
        }
        
        .date {
          font-size: 9pt;
        }
        
        .description {
          font-size: 10pt;
        }
        
        .skill-tag {
          font-size: 9pt;
        }
      }
    `
  }

  // Helper functions
  private escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }
}
