// ATS Resume Scoring Engine
// Inspired by ATS Resume Analyzer documentation
// Performs client-side analysis of resume data for ATS compatibility

// ─── Skill Databases ───────────────────────────────────────────────
const PROGRAMMING_LANGUAGES = new Set([
  "python", "java", "javascript", "typescript", "c++", "c#", "c",
  "ruby", "go", "rust", "swift", "kotlin", "php", "sql", "r",
  "scala", "perl", "matlab", "dart", "lua", "assembly", "bash",
  "shell", "powershell", "objective-c", "haskell", "elixir",
])

const FRAMEWORKS = new Set([
  "react", "angular", "vue", "next.js", "nuxt.js", "django", "flask",
  "spring", "express", "fastapi", "tensorflow", "pytorch", "node.js",
  "rails", "laravel", ".net", "asp.net", "svelte", "gatsby",
  "bootstrap", "tailwind", "jquery", "ember", "backbone",
  "flutter", "react native", "electron", "unity", "unreal engine",
])

const TOOLS = new Set([
  "docker", "kubernetes", "aws", "azure", "gcp", "git", "github",
  "gitlab", "jenkins", "jira", "figma", "postman", "webpack",
  "nginx", "apache", "linux", "terraform", "ansible", "circleci",
  "travis ci", "heroku", "vercel", "netlify", "firebase",
  "redis", "elasticsearch", "grafana", "prometheus",
])

const DATABASES = new Set([
  "mysql", "postgresql", "mongodb", "sqlite", "oracle",
  "sql server", "dynamodb", "cassandra", "redis", "firebase",
  "supabase", "neo4j", "mariadb", "couchdb",
])

const SOFT_SKILLS = new Set([
  "leadership", "communication", "teamwork", "problem solving",
  "critical thinking", "time management", "adaptability",
  "creativity", "collaboration", "project management",
  "decision making", "analytical", "presentation",
  "negotiation", "mentoring", "organization",
])

// ─── Domain Keywords ───────────────────────────────────────────────
const DOMAIN_KEYWORDS: Record<string, {
  keywords: string[]
  skills: string[]
  titles: string[]
}> = {
  "Software / IT": {
    keywords: ["software", "developer", "programming", "api", "cloud", "web", "application", "backend", "frontend", "full stack", "devops", "microservices"],
    skills: ["python", "java", "react", "docker", "aws", "javascript", "typescript", "node.js", "git"],
    titles: ["software engineer", "developer", "tech lead", "programmer", "sde", "web developer"],
  },
  "Data / AI": {
    keywords: ["data", "machine learning", "analytics", "statistics", "neural", "deep learning", "nlp", "computer vision", "model"],
    skills: ["tensorflow", "pytorch", "pandas", "sql", "python", "r", "scikit-learn", "numpy"],
    titles: ["data scientist", "ml engineer", "data analyst", "ai engineer", "data engineer"],
  },
  "Cybersecurity": {
    keywords: ["security", "penetration", "vulnerability", "firewall", "encryption", "threat", "compliance", "audit"],
    skills: ["wireshark", "nmap", "burp suite", "metasploit", "linux", "python", "networking"],
    titles: ["security analyst", "security engineer", "penetration tester", "soc analyst"],
  },
  "Web Development": {
    keywords: ["website", "web application", "responsive", "frontend", "backend", "full stack", "ui", "ux", "seo"],
    skills: ["html", "css", "javascript", "react", "node.js", "typescript", "tailwind", "next.js"],
    titles: ["web developer", "frontend developer", "backend developer", "full stack developer"],
  },
  "AI/Machine Learning": {
    keywords: ["artificial intelligence", "machine learning", "deep learning", "neural network", "training", "model", "prediction"],
    skills: ["python", "tensorflow", "pytorch", "scikit-learn", "keras", "opencv", "numpy"],
    titles: ["ai engineer", "ml engineer", "research scientist", "ai developer"],
  },
  "Mobile Development": {
    keywords: ["mobile", "android", "ios", "app", "responsive", "cross-platform"],
    skills: ["react native", "flutter", "swift", "kotlin", "java", "dart", "xcode"],
    titles: ["mobile developer", "android developer", "ios developer", "app developer"],
  },
  "Design": {
    keywords: ["design", "ui", "ux", "user interface", "user experience", "prototype", "wireframe", "visual"],
    skills: ["figma", "sketch", "adobe xd", "photoshop", "illustrator", "invision"],
    titles: ["ui designer", "ux designer", "product designer", "graphic designer"],
  },
}

// ─── Action Verbs ──────────────────────────────────────────────────
const ACTION_VERBS = [
  "achieved", "built", "created", "designed", "developed", "implemented",
  "improved", "managed", "led", "optimized", "launched", "delivered",
  "established", "increased", "reduced", "analyzed", "streamlined",
  "collaborated", "mentored", "resolved", "automated", "integrated",
  "engineered", "architected", "deployed", "maintained", "contributed",
]

// ─── Types ─────────────────────────────────────────────────────────
export interface ScoreBreakdown {
  keywordRelevance: number
  sectionCompleteness: number
  formattingScore: number
  skillRelevance: number
  experienceClarity: number
  projectImpact: number
}

export interface DetectedSkills {
  programmingLanguages: string[]
  frameworks: string[]
  tools: string[]
  databases: string[]
  softSkills: string[]
  totalCount: number
}

export interface DomainInfo {
  primary: string
  confidence: number
  keywordsMatched: string[]
}

export interface ATSIssue {
  type: "content" | "formatting" | "keywords" | "structure"
  severity: "High" | "Medium" | "Low"
  description: string
  suggestion: string
}

export interface ATSSuggestion {
  category: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  examples?: string[]
}

export interface ATSAnalysisResult {
  score: number
  scoreCategory: "Excellent" | "Good" | "Needs Improvement" | "Poor"
  scoreBreakdown: ScoreBreakdown
  detectedSkills: DetectedSkills
  domain: DomainInfo
  issues: ATSIssue[]
  suggestions: ATSSuggestion[]
  strengths: string[]
}

// ─── Resume type matching Resumey's data ───────────────────────────
interface ResumeData {
  id?: string
  title: string
  domain: string
  personal_info: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  objective: string
  skills: string[]
  education: Array<{ id: string; school: string; degree: string; field: string; startYear: string; endYear: string }>
  experience: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }>
  certificates: Array<{ id: string; name: string; issuer: string; date: string }>
  internships: Array<{ id: string; company: string; position: string; duration: string; description: string }>
  projects: Array<{ id: string; title: string; description: string; technologies: string }>
  presentations: Array<{ id: string; title: string; event: string; date: string }>
  achievements: Array<{ id: string; title: string; description: string }>
  extracurricular: Array<{ id: string; activity: string; description: string }>
  languages: string[]
}

// ─── Helper: Build full text from resume ───────────────────────────
function buildFullText(resume: ResumeData): string {
  const parts: string[] = []

  parts.push(resume.title || "")
  parts.push(resume.domain || "")

  if (resume.personal_info) {
    parts.push(resume.personal_info.fullName || "")
    parts.push(resume.personal_info.summary || "")
  }

  parts.push(resume.objective || "")

  if (resume.skills) {
    parts.push(resume.skills.join(" "))
  }

  for (const edu of resume.education || []) {
    parts.push(`${edu.school} ${edu.degree} ${edu.field}`)
  }

  for (const exp of resume.experience || []) {
    parts.push(`${exp.company} ${exp.position} ${exp.description}`)
  }

  for (const cert of resume.certificates || []) {
    parts.push(`${cert.name} ${cert.issuer}`)
  }

  for (const intern of resume.internships || []) {
    parts.push(`${intern.company} ${intern.position} ${intern.description}`)
  }

  for (const proj of resume.projects || []) {
    parts.push(`${proj.title} ${proj.description} ${proj.technologies}`)
  }

  for (const pres of resume.presentations || []) {
    parts.push(`${pres.title} ${pres.event}`)
  }

  for (const ach of resume.achievements || []) {
    parts.push(`${ach.title} ${ach.description}`)
  }

  for (const extra of resume.extracurricular || []) {
    parts.push(`${extra.activity} ${extra.description}`)
  }

  return parts.join(" ")
}

// ─── Skill Extraction ──────────────────────────────────────────────
function extractSkills(text: string, userSkills: string[]): DetectedSkills {
  const textLower = text.toLowerCase()
  const allText = textLower + " " + userSkills.map(s => s.toLowerCase()).join(" ")

  const found: DetectedSkills = {
    programmingLanguages: [],
    frameworks: [],
    tools: [],
    databases: [],
    softSkills: [],
    totalCount: 0,
  }

  for (const skill of PROGRAMMING_LANGUAGES) {
    if (allText.includes(skill)) {
      found.programmingLanguages.push(skill)
    }
  }

  for (const skill of FRAMEWORKS) {
    if (allText.includes(skill)) {
      found.frameworks.push(skill)
    }
  }

  for (const skill of TOOLS) {
    if (allText.includes(skill)) {
      found.tools.push(skill)
    }
  }

  for (const skill of DATABASES) {
    if (allText.includes(skill)) {
      found.databases.push(skill)
    }
  }

  for (const skill of SOFT_SKILLS) {
    if (allText.includes(skill)) {
      found.softSkills.push(skill)
    }
  }

  found.totalCount =
    found.programmingLanguages.length +
    found.frameworks.length +
    found.tools.length +
    found.databases.length +
    found.softSkills.length

  return found
}

// ─── Domain Classification ─────────────────────────────────────────
function classifyDomain(text: string, userDomain: string, skills: DetectedSkills): DomainInfo {
  const textLower = text.toLowerCase()
  const allUserSkills = [
    ...skills.programmingLanguages,
    ...skills.frameworks,
    ...skills.tools,
    ...skills.databases,
  ]

  const domainScores: Record<string, { score: number; matched: string[] }> = {}

  for (const [domain, data] of Object.entries(DOMAIN_KEYWORDS)) {
    let score = 0
    const matched: string[] = []

    // Check keywords (weight: 1)
    for (const keyword of data.keywords) {
      if (textLower.includes(keyword)) {
        score += 1
        matched.push(keyword)
      }
    }

    // Check titles (weight: 3)
    for (const title of data.titles) {
      if (textLower.includes(title)) {
        score += 3
        matched.push(title)
      }
    }

    // Check skills (weight: 2)
    for (const skill of data.skills) {
      if (allUserSkills.includes(skill)) {
        score += 2
        matched.push(skill)
      }
    }

    // Boost if user selected this domain
    if (userDomain.toLowerCase().includes(domain.toLowerCase().split(" ")[0])) {
      score += 5
    }

    domainScores[domain] = { score, matched }
  }

  const sorted = Object.entries(domainScores).sort((a, b) => b[1].score - a[1].score)
  const [primaryDomain, primaryData] = sorted[0]
  const maxPossible = 30 // rough max
  const confidence = Math.min(1, primaryData.score / maxPossible)

  return {
    primary: primaryDomain,
    confidence: Math.round(confidence * 100) / 100,
    keywordsMatched: [...new Set(primaryData.matched)],
  }
}

// ─── Score Calculations ────────────────────────────────────────────

function calculateKeywordScore(text: string, domain: DomainInfo): number {
  const textLower = text.toLowerCase()
  const domainData = DOMAIN_KEYWORDS[domain.primary]

  if (!domainData) return 50

  const keywords = domainData.keywords
  const found = keywords.filter(kw => textLower.includes(kw)).length
  const keywordRatio = found / keywords.length

  // Count action verbs
  const verbCount = ACTION_VERBS.filter(v => textLower.includes(v)).length
  const verbRatio = Math.min(1, verbCount / 5)

  const score = (keywordRatio * 60) + (verbRatio * 40)
  return Math.min(100, Math.round(score))
}

function calculateSectionScore(resume: ResumeData): number {
  let score = 0

  // Required sections (60 points)
  if (resume.experience?.length > 0) score += 20
  if (resume.education?.length > 0) score += 20
  if (resume.skills?.length > 0) score += 20

  // Contact info (20 points)
  if (resume.personal_info?.email) score += 10
  if (resume.personal_info?.phone) score += 10

  // Optional but helpful (20 points)
  if (resume.personal_info?.summary && resume.personal_info.summary.length > 20) score += 7
  if (resume.projects?.length > 0) score += 7
  if (resume.certificates?.length > 0) score += 6

  return Math.min(100, score)
}

function calculateFormattingScore(resume: ResumeData, fullText: string): number {
  let score = 100

  // Check word count
  const wordCount = fullText.split(/\s+/).filter(Boolean).length
  if (wordCount < 100) score -= 25
  else if (wordCount < 200) score -= 15
  else if (wordCount > 1500) score -= 10

  // Check if summary is too short or missing
  if (!resume.personal_info?.summary || resume.personal_info.summary.length < 20) {
    score -= 10
  }

  // Check bullet point usage in experience descriptions
  const descriptions = (resume.experience || []).map(e => e.description).join(" ")
  const bulletCount = (descriptions.match(/[•\-\*]/g) || []).length
  if (resume.experience?.length > 0 && bulletCount < 2) {
    score -= 10
  }

  // Reward consistent date formatting
  const dates = (resume.experience || []).map(e => e.startDate)
  const hasConsistentDates = dates.every(d => /^\d{4}-\d{2}$/.test(d || ""))
  if (hasConsistentDates && dates.length > 0) score += 5

  return Math.max(0, Math.min(100, score))
}

function calculateSkillScore(skills: DetectedSkills, userSkillCount: number): number {
  // Based on total skills detected
  const total = skills.totalCount

  let score = 0

  // Having programming languages
  if (skills.programmingLanguages.length >= 3) score += 30
  else if (skills.programmingLanguages.length >= 1) score += 15

  // Having frameworks
  if (skills.frameworks.length >= 2) score += 25
  else if (skills.frameworks.length >= 1) score += 12

  // Having tools
  if (skills.tools.length >= 2) score += 20
  else if (skills.tools.length >= 1) score += 10

  // Having databases
  if (skills.databases.length >= 1) score += 15

  // Having soft skills
  if (skills.softSkills.length >= 2) score += 10
  else if (skills.softSkills.length >= 1) score += 5

  // Bonus for listing many skills explicitly
  if (userSkillCount >= 8) score += 5

  return Math.min(100, score)
}

function calculateExperienceScore(resume: ResumeData): number {
  const experiences = resume.experience || []
  if (experiences.length === 0) return 0

  let score = 0

  // Having experience entries
  score += Math.min(30, experiences.length * 15)

  // Check for action verbs in descriptions
  const allDescs = experiences.map(e => e.description.toLowerCase()).join(" ")
  const verbsUsed = ACTION_VERBS.filter(v => allDescs.includes(v)).length
  score += Math.min(30, verbsUsed * 5)

  // Check for metrics/numbers in descriptions
  const hasMetrics = /\d+%|\d+ (users|clients|percent|million|thousand|projects|team)/i.test(allDescs)
  if (hasMetrics) score += 20

  // Having descriptions of reasonable length
  const avgDescLength = experiences.reduce((acc, e) => acc + e.description.length, 0) / experiences.length
  if (avgDescLength > 100) score += 20
  else if (avgDescLength > 50) score += 10

  return Math.min(100, score)
}

function calculateProjectScore(resume: ResumeData): number {
  const projects = resume.projects || []
  if (projects.length === 0) return 0

  let score = 0

  // Having projects
  score += Math.min(40, projects.length * 20)

  // Projects with technologies listed
  const withTech = projects.filter(p => p.technologies && p.technologies.length > 0).length
  score += Math.min(30, withTech * 15)

  // Projects with good descriptions
  const withDesc = projects.filter(p => p.description && p.description.length > 30).length
  score += Math.min(30, withDesc * 15)

  return Math.min(100, score)
}

// ─── Issue Identification ──────────────────────────────────────────
function identifyIssues(resume: ResumeData, skills: DetectedSkills, fullText: string): ATSIssue[] {
  const issues: ATSIssue[] = []

  // Missing contact info
  if (!resume.personal_info?.email) {
    issues.push({ type: "content", severity: "High", description: "No email address found", suggestion: "Add a professional email address to your contact information" })
  }
  if (!resume.personal_info?.phone) {
    issues.push({ type: "content", severity: "High", description: "No phone number found", suggestion: "Add your phone number for recruiter follow-ups" })
  }

  // Missing or short summary
  if (!resume.personal_info?.summary || resume.personal_info.summary.length < 20) {
    issues.push({ type: "content", severity: "High", description: "Professional summary is missing or too short", suggestion: "Write a 2-3 sentence professional summary highlighting your key strengths" })
  }

  // No skills listed
  if (!resume.skills || resume.skills.length === 0) {
    issues.push({ type: "content", severity: "High", description: "No skills listed", suggestion: "Add at least 5-8 relevant technical and soft skills" })
  } else if (resume.skills.length < 5) {
    issues.push({ type: "content", severity: "Medium", description: `Only ${resume.skills.length} skills listed`, suggestion: "Add more skills (aim for at least 5-8 for better ATS matching)" })
  }

  // No experience
  if (!resume.experience || resume.experience.length === 0) {
    issues.push({ type: "content", severity: "High", description: "No work experience listed", suggestion: "Add relevant work experience, internships, or volunteer work" })
  }

  // Short experience descriptions
  const shortDescs = (resume.experience || []).filter(e => e.description.length < 50)
  if (shortDescs.length > 0) {
    issues.push({ type: "content", severity: "Medium", description: `${shortDescs.length} experience entries have short descriptions`, suggestion: "Expand experience descriptions with specific achievements and responsibilities" })
  }

  // No action verbs
  const allDescs = (resume.experience || []).map(e => e.description.toLowerCase()).join(" ")
  const verbsUsed = ACTION_VERBS.filter(v => allDescs.includes(v)).length
  if (resume.experience && resume.experience.length > 0 && verbsUsed < 3) {
    issues.push({ type: "keywords", severity: "Medium", description: "Few action verbs in experience descriptions", suggestion: "Use strong action verbs like: developed, implemented, managed, improved, built" })
  }

  // No education
  if (!resume.education || resume.education.length === 0) {
    issues.push({ type: "content", severity: "High", description: "No education history", suggestion: "Add your educational background" })
  }

  // No projects
  if (!resume.projects || resume.projects.length === 0) {
    issues.push({ type: "content", severity: "Low", description: "No projects listed", suggestion: "Add relevant projects to showcase your practical skills" })
  }

  // Low word count
  const wordCount = fullText.split(/\s+/).filter(Boolean).length
  if (wordCount < 150) {
    issues.push({ type: "formatting", severity: "High", description: "Resume content is very thin", suggestion: "Add more detailed descriptions and content to improve keyword density" })
  }

  // Missing objective
  if (!resume.objective || resume.objective.length < 10) {
    issues.push({ type: "content", severity: "Low", description: "Career objective is missing", suggestion: "Add a brief career objective to show your goals" })
  }

  // No programming languages detected
  if (skills.programmingLanguages.length === 0) {
    issues.push({ type: "keywords", severity: "Medium", description: "No programming languages detected", suggestion: "List specific programming languages you know in your skills section" })
  }

  return issues
}

// ─── Suggestion Generation ─────────────────────────────────────────
function generateSuggestions(resume: ResumeData, domain: DomainInfo, skills: DetectedSkills): ATSSuggestion[] {
  const suggestions: ATSSuggestion[] = []
  const domainData = DOMAIN_KEYWORDS[domain.primary]

  // Suggest missing domain keywords
  if (domainData) {
    const fullText = buildFullText(resume).toLowerCase()
    const missingKeywords = domainData.keywords.filter(kw => !fullText.includes(kw))
    if (missingKeywords.length > 0) {
      suggestions.push({
        category: "Keywords",
        title: "Add industry keywords",
        description: `Your resume is missing some keywords commonly searched for in ${domain.primary}`,
        priority: "High",
        examples: missingKeywords.slice(0, 5),
      })
    }

    // Suggest domain-relevant skills
    const allSkills = [...skills.programmingLanguages, ...skills.frameworks, ...skills.tools, ...skills.databases]
    const missingSkills = domainData.skills.filter(s => !allSkills.includes(s))
    if (missingSkills.length > 0) {
      suggestions.push({
        category: "Skills",
        title: "Add domain-specific skills",
        description: `Consider adding these commonly expected skills for ${domain.primary}`,
        priority: "High",
        examples: missingSkills.slice(0, 5),
      })
    }
  }

  // Suggest action verbs
  const allDescs = (resume.experience || []).map(e => e.description.toLowerCase()).join(" ")
  const unusedVerbs = ACTION_VERBS.filter(v => !allDescs.includes(v))
  if (unusedVerbs.length > 0 && resume.experience?.length) {
    suggestions.push({
      category: "Experience",
      title: "Use more action verbs",
      description: "Start your bullet points with strong action verbs for better impact",
      priority: "Medium",
      examples: unusedVerbs.slice(0, 6),
    })
  }

  // Suggest quantifying achievements
  if (resume.experience?.length && !/\d+%|\d+ (users|clients|projects)/i.test(allDescs)) {
    suggestions.push({
      category: "Experience",
      title: "Quantify your achievements",
      description: "Add numbers and metrics to your experience (e.g., 'Improved performance by 30%')",
      priority: "Medium",
    })
  }

  // Suggest certificates
  if (!resume.certificates || resume.certificates.length === 0) {
    suggestions.push({
      category: "Credentials",
      title: "Add certifications",
      description: "Relevant certifications can boost your ATS score and credibility",
      priority: "Low",
      examples: domainData ? domainData.skills.slice(0, 3).map(s => `${s} certification`) : undefined,
    })
  }

  // Suggest languages
  if (!resume.languages || resume.languages.length === 0) {
    suggestions.push({
      category: "Languages",
      title: "Add language proficiency",
      description: "Many ATS systems look for language skills, especially for international roles",
      priority: "Low",
    })
  }

  return suggestions
}

// ─── Strength Detection ────────────────────────────────────────────
function detectStrengths(resume: ResumeData, skills: DetectedSkills, breakdown: ScoreBreakdown): string[] {
  const strengths: string[] = []

  if (resume.personal_info?.fullName && resume.personal_info?.email && resume.personal_info?.phone) {
    strengths.push("Complete contact information")
  }
  if (resume.personal_info?.summary && resume.personal_info.summary.length > 50) {
    strengths.push("Detailed professional summary")
  }
  if (resume.skills?.length >= 8) {
    strengths.push(`${resume.skills.length} skills showcased`)
  }
  if (skills.programmingLanguages.length >= 3) {
    strengths.push(`${skills.programmingLanguages.length} programming languages detected`)
  }
  if (skills.frameworks.length >= 2) {
    strengths.push(`${skills.frameworks.length} frameworks/libraries listed`)
  }
  if (resume.experience?.length >= 2) {
    strengths.push(`${resume.experience.length} work experiences documented`)
  }
  if (resume.projects?.length >= 2) {
    strengths.push(`${resume.projects.length} projects showcased`)
  }
  if (resume.certificates?.length > 0) {
    strengths.push("Professional certifications included")
  }
  if (resume.education?.length > 0) {
    strengths.push("Education background included")
  }
  if (breakdown.keywordRelevance >= 70) {
    strengths.push("Strong keyword relevance")
  }
  if (breakdown.experienceClarity >= 70) {
    strengths.push("Clear experience descriptions")
  }

  return strengths
}

// ─── Main Scoring Function ─────────────────────────────────────────
export function analyzeResume(resume: ResumeData): ATSAnalysisResult {
  const fullText = buildFullText(resume)

  // Extract skills
  const detectedSkills = extractSkills(fullText, resume.skills || [])

  // Classify domain
  const domain = classifyDomain(fullText, resume.domain || "", detectedSkills)

  // Calculate individual scores
  const keywordRelevance = calculateKeywordScore(fullText, domain)
  const sectionCompleteness = calculateSectionScore(resume)
  const formattingScore = calculateFormattingScore(resume, fullText)
  const skillRelevance = calculateSkillScore(detectedSkills, (resume.skills || []).length)
  const experienceClarity = calculateExperienceScore(resume)
  const projectImpact = calculateProjectScore(resume)

  // Weighted final score
  const finalScore = Math.round(
    keywordRelevance * 0.20 +
    sectionCompleteness * 0.20 +
    formattingScore * 0.15 +
    skillRelevance * 0.20 +
    experienceClarity * 0.15 +
    projectImpact * 0.10
  )

  const scoreBreakdown: ScoreBreakdown = {
    keywordRelevance,
    sectionCompleteness,
    formattingScore,
    skillRelevance,
    experienceClarity,
    projectImpact,
  }

  // Determine category
  let scoreCategory: ATSAnalysisResult["scoreCategory"]
  if (finalScore >= 80) scoreCategory = "Excellent"
  else if (finalScore >= 60) scoreCategory = "Good"
  else if (finalScore >= 40) scoreCategory = "Needs Improvement"
  else scoreCategory = "Poor"

  // Identify issues and generate suggestions
  const issues = identifyIssues(resume, detectedSkills, fullText)
  const suggestions = generateSuggestions(resume, domain, detectedSkills)
  const strengths = detectStrengths(resume, detectedSkills, scoreBreakdown)

  return {
    score: Math.min(100, Math.max(0, finalScore)),
    scoreCategory,
    scoreBreakdown,
    detectedSkills,
    domain,
    issues,
    suggestions,
    strengths,
  }
}
