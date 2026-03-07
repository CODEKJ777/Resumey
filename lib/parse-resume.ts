export interface ParsedResume {
  title: string
  personal_info: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  skills: string[]
  education: Array<{
    school: string
    degree: string
    field: string
    startYear: string
    endYear: string
  }>
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
}

// Extract text from PDF file
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Dynamic import to avoid SSR issues
    const pdfjs = await import('pdfjs-dist')
    
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.0.269/legacy/build/pdf.worker.min.js`
    
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise

    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      text += pageText + '\n'
    }

    return text
  } catch (error) {
    console.error('PDF parsing error:', error)
    throw new Error('Failed to extract text from PDF. The PDF may be corrupted or encrypted. Please try uploading a TXT file instead.')
  }
}

// Read text from TXT file
export function readTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

// Parse text into resume structure using regex
export function parseResumeText(text: string): ParsedResume {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)

  // Initialize empty resume
  const resume: ParsedResume = {
    title: 'Uploaded Resume',
    personal_info: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    skills: [],
    education: [],
    experience: []
  }

  let currentSection = ''
  let summaryLines: string[] = []

  for (const line of lines) {
    // Detect sections
    if (line.toLowerCase().includes('summary') || line.toLowerCase().includes('objective')) {
      currentSection = 'summary'
      continue
    } else if (line.toLowerCase().includes('experience') || line.toLowerCase().includes('work')) {
      currentSection = 'experience'
      continue
    } else if (line.toLowerCase().includes('education')) {
      currentSection = 'education'
      continue
    } else if (line.toLowerCase().includes('skills')) {
      currentSection = 'skills'
      continue
    }

    // Extract name (usually first non-empty line)
    if (!resume.personal_info.fullName && !line.includes('@') && !/\d{3}/.test(line) && line.length > 2) {
      resume.personal_info.fullName = line
      continue
    }

    // Extract email
    const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/)
    if (emailMatch && !resume.personal_info.email) {
      resume.personal_info.email = emailMatch[0]
    }

    // Extract phone
    const phoneMatch = line.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
    if (phoneMatch && !resume.personal_info.phone) {
      resume.personal_info.phone = phoneMatch[0]
    }

    // Extract location (simple heuristic)
    if (line.includes(',') && !resume.personal_info.location && !line.includes('@')) {
      resume.personal_info.location = line
    }

    // Process sections
    switch (currentSection) {
      case 'summary':
        if (summaryLines.length < 3) { // Limit summary to a few lines
          summaryLines.push(line)
          resume.personal_info.summary = summaryLines.join(' ')
        }
        break
      case 'skills':
        // Split by commas or bullets
        const skillItems = line.split(/[,•]/).map(s => s.trim()).filter(s => s.length > 1)
        resume.skills.push(...skillItems)
        break
      case 'experience':
        // Simple parsing for job entries
        if (line.includes('|') || line.includes('-')) {
          const parts = line.split(/[|-]/).map(p => p.trim())
          if (parts.length >= 2) {
            resume.experience.push({
              company: parts[0],
              position: parts[1],
              startDate: '',
              endDate: '',
              description: line
            })
          }
        }
        break
      case 'education':
        // Simple parsing for education
        if (line.includes('university') || line.includes('college') || line.includes('school')) {
          resume.education.push({
            school: line,
            degree: '',
            field: '',
            startYear: '',
            endYear: ''
          })
        }
        break
    }
  }

  // Clean up skills (remove duplicates)
  resume.skills = [...new Set(resume.skills)]

  return resume
}

// Main function to parse file
export async function parseResumeFile(file: File): Promise<ParsedResume> {
  if (file.type !== 'text/plain') {
    throw new Error('Please upload a TXT file only.')
  }

  const text = await readTextFromFile(file)
  return parseResumeText(text)
}
