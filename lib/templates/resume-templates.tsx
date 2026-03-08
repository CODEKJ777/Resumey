import React from 'react'
import { ResumeFormData } from '@/components/resume/resume-form'

// Template styles
export const ModernStyles = `
.modern-template {
  font-family: 'Calibri', 'Arial', sans-serif;
  line-height: 1.4;
  color: #2c3e50;
  max-width: 210mm;
  margin: 0 auto;
  padding: 15mm;
  background: white;
}

.template-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 3px solid #3498db;
}

.name {
  font-size: 24pt;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.contact-info {
  font-size: 11pt;
  color: #7f8c8d;
}

.separator {
  margin: 0 8px;
}

.template-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14pt;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  color: #2c3e50;
}

.company, .school {
  font-size: 11pt;
  color: #7f8c8d;
  font-style: italic;
}

.date {
  font-size: 10pt;
  color: #95a5a6;
  white-space: nowrap;
}

.description, .summary {
  font-size: 11pt;
  text-align: justify;
  margin-top: 5px;
}

.skills-grid {
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
}

.project-item, .certificate-item, .achievement-item {
  margin-bottom: 12px;
}

.project-title, .cert-name, .achievement-title {
  font-size: 12pt;
  font-weight: bold;
  color: #2c3e50;
}

.project-description, .cert-issuer, .achievement-description {
  font-size: 11pt;
  color: #7f8c8d;
  margin-top: 2px;
}

.project-tech {
  font-size: 10pt;
  color: #95a5a6;
  margin-top: 2px;
}

.language-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.language-name {
  font-size: 11pt;
  font-weight: bold;
}

.language-level {
  font-size: 11pt;
  color: #7f8c8d;
}

@media print {
  .modern-template {
    padding: 10mm;
    font-size: 10pt;
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
  
  .description, .summary {
    font-size: 10pt;
  }
  
  .skill-tag {
    font-size: 9pt;
  }
}
`

export const ClassicStyles = `
.classic-template {
  font-family: 'Times New Roman', serif;
  line-height: 1.5;
  color: #333;
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm;
  background: white;
}

.template-header {
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #333;
}

.name {
  font-size: 24pt;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
}

.contact-info {
  font-size: 12pt;
  font-style: italic;
  color: #666;
}

.separator {
  margin: 0 10px;
}

.template-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 14pt;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  letter-spacing: 1px;
}

.experience-item, .education-item {
  margin-bottom: 15px;
}

.position, .degree {
  font-size: 12pt;
  font-weight: bold;
}

.company, .school {
  font-size: 11pt;
  font-style: italic;
  color: #666;
  margin-bottom: 5px;
}

.date {
  font-size: 10pt;
  color: #666;
}

.description, .summary {
  font-size: 12pt;
  text-align: justify;
  margin-top: 8px;
}

.skills-text {
  font-size: 12pt;
  margin-top: 10px;
}

@media print {
  .classic-template {
    padding: 15mm;
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
  
  .description, .summary {
    font-size: 11pt;
  }
}
`

export const MinimalStyles = `
.minimal-template {
  font-family: 'Helvetica', 'Arial', sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm;
  background: white;
}

.template-header {
  margin-bottom: 30px;
}

.name {
  font-size: 20pt;
  font-weight: 300;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.contact-info {
  font-size: 11pt;
  color: #7f8c8d;
}

.separator {
  margin: 0 8px;
}

.template-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 12pt;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.experience-item, .education-item {
  margin-bottom: 15px;
}

.experience-header, .education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.position, .degree {
  font-size: 11pt;
  font-weight: 500;
  color: #2c3e50;
}

.company-date, .school-date {
  font-size: 10pt;
  color: #7f8c8d;
}

.description, .summary {
  font-size: 11pt;
  color: #7f8c8d;
  margin-top: 8px;
  line-height: 1.5;
}

.skills-text {
  font-size: 11pt;
  color: #7f8c8d;
  margin-top: 10px;
}

@media print {
  .minimal-template {
    padding: 15mm;
    font-size: 10pt;
  }
  
  .name {
    font-size: 18pt;
  }
  
  .section-title {
    font-size: 11pt;
  }
  
  .position, .degree {
    font-size: 10pt;
  }
  
  .description, .summary {
    font-size: 10pt;
  }
}
`

export const CreativeStyles = `
.creative-template {
  font-family: 'Segoe UI', 'Arial', sans-serif;
  line-height: 1.5;
  color: #2c3e50;
  max-width: 210mm;
  margin: 0 auto;
  padding: 15mm;
  background: white;
}

.template-header {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 4px solid #e74c3c;
}

.name-section {
  text-align: center;
}

.name {
  font-size: 26pt;
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.contact-info {
  font-size: 11pt;
  color: #7f8c8d;
}

.separator {
  margin: 0 10px;
}

.template-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 14pt;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 2px;
  background: #e74c3c;
}

.experience-list, .projects-list {
  margin-left: 15px;
}

.experience-item, .project-item {
  margin-bottom: 15px;
  padding-left: 15px;
  border-left: 2px solid #ecf0f1;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.position, .project-title {
  font-size: 12pt;
  font-weight: bold;
  color: #2c3e50;
}

.company-date {
  text-align: right;
}

.company, .date {
  font-size: 10pt;
  color: #7f8c8d;
  display: block;
}

.description, .project-description {
  font-size: 11pt;
  color: #7f8c8d;
  margin-top: 8px;
}

.project-tech {
  font-size: 10pt;
  color: #e74c3c;
  margin-top: 5px;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-tag {
  background: #e74c3c;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 10pt;
  font-weight: 500;
}

@media print {
  .creative-template {
    padding: 10mm;
    font-size: 10pt;
  }
  
  .name {
    font-size: 22pt;
  }
  
  .section-title {
    font-size: 12pt;
  }
  
  .position, .project-title {
    font-size: 11pt;
  }
  
  .description, .project-description {
    font-size: 10pt;
  }
  
  .skill-tag {
    font-size: 9pt;
    padding: 4px 8px;
  }
}
`

export const ExecutiveStyles = `
.executive-template {
  font-family: 'Georgia', serif;
  line-height: 1.5;
  color: #2c3e50;
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm;
  background: white;
}

.template-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 3px solid #34495e;
}

.name-section {
  text-align: center;
}

.name {
  font-size: 24pt;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.contact-info {
  font-size: 11pt;
  color: #7f8c8d;
  font-style: italic;
}

.separator {
  margin: 0 12px;
}

.template-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 14pt;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 5px;
}

.experience-list, .education-list, .certificates-list {
  margin-top: 15px;
}

.experience-item, .education-item, .certificate-item {
  margin-bottom: 20px;
}

.experience-header, .education-header {
  margin-bottom: 8px;
}

.position, .degree, .cert-name {
  font-size: 12pt;
  font-weight: bold;
  color: #2c3e50;
}

.company-date, .school-date {
  font-size: 11pt;
  color: #7f8c8d;
  font-style: italic;
  margin-bottom: 5px;
}

.company, .school, .cert-issuer {
  margin-right: 10px;
}

.date {
  font-weight: normal;
}

.description, .summary {
  font-size: 11pt;
  text-align: justify;
  margin-top: 8px;
  line-height: 1.5;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.skill-tag {
  background: #34495e;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 10pt;
  font-weight: 500;
  text-align: center;
}

@media print {
  .executive-template {
    padding: 15mm;
    font-size: 11pt;
  }
  
  .name {
    font-size: 20pt;
  }
  
  .section-title {
    font-size: 12pt;
  }
  
  .position, .degree, .cert-name {
    font-size: 11pt;
  }
  
  .description, .summary {
    font-size: 10pt;
  }
  
  .skill-tag {
    font-size: 9pt;
    padding: 6px 10px;
  }
}
`

// Professional resume templates for A4 page size
export const RESUME_TEMPLATES = {
  MODERN: {
    name: 'Modern Professional',
    component: ModernTemplate,
    styles: ModernStyles
  },
  CLASSIC: {
    name: 'Classic Professional',
    component: ClassicTemplate,
    styles: ClassicStyles
  },
  MINIMAL: {
    name: 'Minimal Clean',
    component: MinimalTemplate,
    styles: MinimalStyles
  },
  CREATIVE: {
    name: 'Creative Designer',
    component: CreativeTemplate,
    styles: CreativeStyles
  },
  EXECUTIVE: {
    name: 'Executive Professional',
    component: ExecutiveTemplate,
    styles: ExecutiveStyles
  }
}

// Modern Template - Clean and professional
function ModernTemplate({ data }: { data: ResumeFormData }) {
  const personalInfo = (data as any).personalInfo || (data as any).personal_info || {}
  
  return (
    <div className="modern-template">
      {/* Header */}
      <header className="template-header">
        <div className="name-section">
          <h1 className="name">{personalInfo?.fullName || ''}</h1>
          <div className="contact-info">
            <span>{personalInfo?.email || ''}</span>
            <span className="separator">|</span>
            <span>{personalInfo?.phone || ''}</span>
            <span className="separator">|</span>
            <span>{personalInfo?.location || ''}</span>
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="template-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {/* Objective */}
      {data.objective && (
        <section className="template-section">
          <h2 className="section-title">Objective</h2>
          <p className="objective">{data.objective}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Work Experience</h2>
          <div className="experience-list">
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3 className="position">{exp.position}</h3>
                  <div className="company-date">
                    <span className="company">{exp.company}</span>
                    <span className="date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                </div>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Education</h2>
          <div className="education-list">
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h3 className="degree">{edu.degree} in {edu.field}</h3>
                  <div className="school-date">
                    <span className="school">{edu.school}</span>
                    <span className="date">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-list">
            {data.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.technologies && (
                  <p className="project-tech"><strong>Technologies:</strong> {project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {data.certificates && data.certificates.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Certificates</h2>
          <div className="certificates-list">
            {data.certificates.map((cert, index) => (
              <div key={index} className="certificate-item">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer} - {cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-list">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-list">
            {data.languages.map((lang: any, index) => (
              <div key={index} className="language-item">
                <span className="language-name">{typeof lang === 'string' ? lang : lang.name || ''}</span>
                <span className="language-level">{typeof lang === 'string' ? '' : lang.level || ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Classic Template - Traditional and formal
function ClassicTemplate({ data }: { data: ResumeFormData }) {
  const personalInfo = (data as any).personalInfo || (data as any).personal_info || {}
  
  return (
    <div className="classic-template">
      <header className="template-header">
        <h1 className="name">{personalInfo?.fullName || ''}</h1>
        <div className="contact-info">
          <span>{personalInfo?.email || ''}</span>
          <span className="separator">|</span>
          <span>{personalInfo?.phone || ''}</span>
          <span className="separator">|</span>
          <span>{personalInfo?.location || ''}</span>
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="template-section">
          <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3 className="position">{exp.position}</h3>
              <p className="company">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3 className="degree">{edu.degree} in {edu.field}</h3>
              <p className="school">{edu.school} | {edu.startYear} - {edu.endYear}</p>
            </div>
          ))}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">SKILLS</h2>
          <p className="skills-text">{data.skills.join(', ')}</p>
        </section>
      )}
      
      {data.projects && data.projects.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.technologies && (
                <p className="project-tech"><strong>Technologies:</strong> {project.technologies}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

// Minimal Template - Clean and simple
function MinimalTemplate({ data }: { data: ResumeFormData }) {
  const personalInfo = (data as any).personalInfo || (data as any).personal_info || {}
  
  return (
    <div className="minimal-template">
      <header className="template-header">
        <h1 className="name">{personalInfo?.fullName || ''}</h1>
        <div className="contact-info">
          <span>{personalInfo?.email || ''}</span>
          <span className="separator">|</span>
          <span>{personalInfo?.phone || ''}</span>
          <span className="separator">|</span>
          <span>{personalInfo?.location || ''}</span>
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="template-section">
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <span className="position">{exp.position}</span>
                <span className="company-date">{exp.company} | {exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <span className="degree">{edu.degree} in {edu.field}</span>
                <span className="school-date">{edu.school} | {edu.startYear} - {edu.endYear}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Skills</h2>
          <p className="skills-text">{data.skills.join(', ')}</p>
        </section>
      )}
      
      {data.projects && data.projects.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.technologies && (
                <p className="project-tech"><strong>Technologies:</strong> {project.technologies}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

// Creative Template - Modern and visually appealing
function CreativeTemplate({ data }: { data: ResumeFormData }) {
  const personalInfo = (data as any).personalInfo || (data as any).personal_info || {}
  
  return (
    <div className="creative-template">
      <header className="template-header">
        <div className="name-section">
          <h1 className="name">{personalInfo?.fullName || ''}</h1>
          <div className="contact-info">
            <span>{personalInfo?.email || ''}</span>
            <span className="separator">|</span>
            <span>{personalInfo?.phone || ''}</span>
            <span className="separator">|</span>
            <span>{personalInfo?.location || ''}</span>
          </div>
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="template-section">
          <h2 className="section-title">About Me</h2>
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Experience</h2>
          <div className="experience-list">
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3 className="position">{exp.position}</h3>
                  <div className="company-date">
                    <span className="company">{exp.company}</span>
                    <span className="date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                </div>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-list">
            {data.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.technologies && (
                  <p className="project-tech"><strong>Tech:</strong> {project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Executive Template - Professional and formal
function ExecutiveTemplate({ data }: { data: ResumeFormData }) {
  const personalInfo = (data as any).personalInfo || (data as any).personal_info || {}
  
  return (
    <div className="executive-template">
      <header className="template-header">
        <div className="name-section">
          <h1 className="name">{personalInfo?.fullName || ''}</h1>
          <div className="contact-info">
            <span>{personalInfo?.email || ''}</span>
            <span className="separator">|</span>
            <span>{personalInfo?.phone || ''}</span>
            <span className="separator">|</span>
            <span>{personalInfo?.location || ''}</span>
          </div>
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="template-section">
          <h2 className="section-title">EXECUTIVE SUMMARY</h2>
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
          <div className="experience-list">
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3 className="position">{exp.position}</h3>
                  <div className="company-date">
                    <span className="company">{exp.company}</span>
                    <span className="date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                </div>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">EDUCATION & CREDENTIALS</h2>
          <div className="education-list">
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h3 className="degree">{edu.degree} in {edu.field}</h3>
                  <div className="school-date">
                    <span className="school">{edu.school}</span>
                    <span className="date">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certificates && data.certificates.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">CERTIFICATIONS</h2>
          <div className="certificates-list">
            {data.certificates.map((cert, index) => (
              <div key={index} className="certificate-item">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer} - {cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">CORE COMPETENCIES</h2>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
