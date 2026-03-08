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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  AlertCircle,
  Info,
  BarChart3,
  Code2,
  Wrench,
  Database,
  Users,
  Lightbulb,
  Target,
  Briefcase,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react"
import {
  analyzeResume,
  type ATSAnalysisResult,
  type ScoreBreakdown,
} from "@/lib/ats-scorer"

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
  education: Array<{ id: string; school: string }>
  experience: Array<{ id: string; company: string }>
}

// ─── Score Circle SVG ──────────────────────────────────────────────
function ScoreCircle({
  score,
  category,
  size = 180,
}: {
  score: number
  category: string
  size?: number
}) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const strokeWidth = size * 0.08
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 150)
    return () => clearTimeout(timer)
  }, [score])

  const getColor = (s: number) => {
    if (s >= 80) return "#22c55e"
    if (s >= 60) return "#f59e0b"
    if (s >= 40) return "#f97316"
    return "#ef4444"
  }

  const color = getColor(score)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted/20"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-4xl font-bold" style={{ color }}>
          {animatedScore}
        </span>
        <span className="text-xs text-muted-foreground mt-1">out of 100</span>
      </div>
      <Badge
        variant={
          score >= 80
            ? "default"
            : score >= 60
            ? "secondary"
            : "destructive"
        }
        className="text-xs"
      >
        {category}
      </Badge>
    </div>
  )
}

// ─── Breakdown Bar ─────────────────────────────────────────────────
function BreakdownBar({
  label,
  value,
  weight,
  icon: Icon,
}: {
  label: string
  value: number
  weight: string
  icon: React.ElementType
}) {
  const getColor = (v: number) => {
    if (v >= 80) return "bg-green-500"
    if (v >= 60) return "bg-yellow-500"
    if (v >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{weight}</span>
          <span className="font-semibold w-8 text-right">{value}</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

// ─── Skill Tag ─────────────────────────────────────────────────────
function SkillTag({ skill, color }: { skill: string; color: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${color}`}
    >
      {skill}
    </span>
  )
}

export default function ATSScorePage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResumeId, setSelectedResumeId] = useState<string>("")
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["breakdown", "skills", "issues", "suggestions"])
  )
  const { toast } = useToast()

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) next.delete(section)
      else next.add(section)
      return next
    })
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  useEffect(() => {
    if (selectedResumeId) {
      runAnalysis(selectedResumeId)
    }
  }, [selectedResumeId])

  const fetchResumes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/resumes")
      if (!response.ok) throw new Error("Failed to fetch resumes")
      const data = await response.json()
      setResumes(data || [])
    } catch {
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const runAnalysis = async (resumeId: string) => {
    try {
      setIsCalculating(true)
      const response = await fetch(`/api/resumes?id=${resumeId}`)
      if (!response.ok) throw new Error("Failed to fetch resume")
      const resume = await response.json()

      // Run the ATS analysis engine
      const result = analyzeResume(resume)
      setAnalysis(result)
    } catch {
      toast({
        title: "Error",
        description: "Failed to analyze resume",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ATS Score Analyzer</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive ATS compatibility analysis with scoring breakdown, skill detection, and improvements
        </p>
      </div>

      {/* Resume Selector */}
      <div className="max-w-md">
        <label className="text-sm font-medium">Select Resume</label>
        <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Choose a resume to analyze" />
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

      {/* Loading State */}
      {isCalculating && (
        <Card className="p-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing your resume...</p>
          </div>
        </Card>
      )}

      {/* Results */}
      {analysis && !isCalculating && (
        <div className="space-y-4">
          {/* ── Score Overview ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score Circle */}
            <Card className="p-6 flex items-center justify-center relative">
              <ScoreCircle
                score={analysis.score}
                category={analysis.scoreCategory}
              />
            </Card>

            {/* Domain & Quick Stats */}
            <Card className="p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="size-5 text-primary" />
                Detected Domain
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {analysis.domain.primary}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Confidence: {Math.round(analysis.domain.confidence * 100)}%
                </span>
              </div>
              {analysis.domain.keywordsMatched.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    Keywords matched:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.domain.keywordsMatched.map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary capitalize"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {analysis.detectedSkills.totalCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Skills Detected</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {analysis.strengths.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Strengths</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {analysis.issues.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Issues Found</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {analysis.suggestions.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Suggestions</p>
                </div>
              </div>
            </Card>
          </div>

          {/* ── Score Breakdown ────────────────────────────────── */}
          <Card className="p-6">
            <button
              onClick={() => toggleSection("breakdown")}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="size-5 text-primary" />
                Score Breakdown
              </h3>
              {expandedSections.has("breakdown") ? (
                <ChevronUp className="size-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-5 text-muted-foreground" />
              )}
            </button>
            {expandedSections.has("breakdown") && (
              <div className="mt-4 space-y-4">
                <BreakdownBar
                  label="Keyword Relevance"
                  value={analysis.scoreBreakdown.keywordRelevance}
                  weight="20%"
                  icon={Target}
                />
                <BreakdownBar
                  label="Section Completeness"
                  value={analysis.scoreBreakdown.sectionCompleteness}
                  weight="20%"
                  icon={GraduationCap}
                />
                <BreakdownBar
                  label="Formatting Quality"
                  value={analysis.scoreBreakdown.formattingScore}
                  weight="15%"
                  icon={BarChart3}
                />
                <BreakdownBar
                  label="Skill Relevance"
                  value={analysis.scoreBreakdown.skillRelevance}
                  weight="20%"
                  icon={Code2}
                />
                <BreakdownBar
                  label="Experience Clarity"
                  value={analysis.scoreBreakdown.experienceClarity}
                  weight="15%"
                  icon={Briefcase}
                />
                <BreakdownBar
                  label="Project Impact"
                  value={analysis.scoreBreakdown.projectImpact}
                  weight="10%"
                  icon={Wrench}
                />
              </div>
            )}
          </Card>

          {/* ── Detected Skills ────────────────────────────────── */}
          <Card className="p-6">
            <button
              onClick={() => toggleSection("skills")}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code2 className="size-5 text-primary" />
                Detected Skills ({analysis.detectedSkills.totalCount})
              </h3>
              {expandedSections.has("skills") ? (
                <ChevronUp className="size-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-5 text-muted-foreground" />
              )}
            </button>
            {expandedSections.has("skills") && (
              <div className="mt-4 space-y-4">
                {analysis.detectedSkills.programmingLanguages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Code2 className="size-3.5" /> Programming Languages
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.detectedSkills.programmingLanguages.map((s) => (
                        <SkillTag key={s} skill={s} color="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" />
                      ))}
                    </div>
                  </div>
                )}
                {analysis.detectedSkills.frameworks.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Wrench className="size-3.5" /> Frameworks & Libraries
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.detectedSkills.frameworks.map((s) => (
                        <SkillTag key={s} skill={s} color="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" />
                      ))}
                    </div>
                  </div>
                )}
                {analysis.detectedSkills.tools.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Wrench className="size-3.5" /> Tools & Platforms
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.detectedSkills.tools.map((s) => (
                        <SkillTag key={s} skill={s} color="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" />
                      ))}
                    </div>
                  </div>
                )}
                {analysis.detectedSkills.databases.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Database className="size-3.5" /> Databases
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.detectedSkills.databases.map((s) => (
                        <SkillTag key={s} skill={s} color="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" />
                      ))}
                    </div>
                  </div>
                )}
                {analysis.detectedSkills.softSkills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Users className="size-3.5" /> Soft Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.detectedSkills.softSkills.map((s) => (
                        <SkillTag key={s} skill={s} color="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" />
                      ))}
                    </div>
                  </div>
                )}
                {analysis.detectedSkills.totalCount === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No recognizable skills detected. Add specific skill names to your resume.
                  </p>
                )}
              </div>
            )}
          </Card>

          {/* ── Strengths ──────────────────────────────────────── */}
          {analysis.strengths.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-600" />
                Strengths
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-green-50 dark:bg-green-900/10"
                  >
                    <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                    {strength}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── Issues ─────────────────────────────────────────── */}
          {analysis.issues.length > 0 && (
            <Card className="p-6">
              <button
                onClick={() => toggleSection("issues")}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle className="size-5 text-yellow-600" />
                  Issues Found ({analysis.issues.length})
                </h3>
                {expandedSections.has("issues") ? (
                  <ChevronUp className="size-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-5 text-muted-foreground" />
                )}
              </button>
              {expandedSections.has("issues") && (
                <div className="mt-4 space-y-3">
                  {analysis.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-l-4 ${
                        issue.severity === "High"
                          ? "border-l-red-500 bg-red-50 dark:bg-red-900/10"
                          : issue.severity === "Medium"
                          ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                          : "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            issue.severity === "High"
                              ? "destructive"
                              : issue.severity === "Medium"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {issue.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{issue.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <ArrowRight className="size-3" />
                        {issue.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* ── Suggestions ────────────────────────────────────── */}
          {analysis.suggestions.length > 0 && (
            <Card className="p-6">
              <button
                onClick={() => toggleSection("suggestions")}
                className="w-full flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lightbulb className="size-5 text-blue-600" />
                  Suggestions ({analysis.suggestions.length})
                </h3>
                {expandedSections.has("suggestions") ? (
                  <ChevronUp className="size-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-5 text-muted-foreground" />
                )}
              </button>
              {expandedSections.has("suggestions") && (
                <div className="mt-4 space-y-3">
                  {analysis.suggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-muted/30 border"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {sug.category}
                        </Badge>
                        <Badge
                          variant={
                            sug.priority === "High"
                              ? "destructive"
                              : sug.priority === "Medium"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {sug.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{sug.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sug.description}
                      </p>
                      {sug.examples && sug.examples.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {sug.examples.map((ex, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary capitalize"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* ── ATS Tips ───────────────────────────────────────── */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="size-5 text-blue-600" />
              ATS Optimization Tips
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Use standard fonts and formatting for better parsing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Include relevant keywords from the target job description
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Avoid graphics, tables, and special formatting characters
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Start bullet points with strong action verbs (developed, implemented, managed)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Quantify achievements with numbers (e.g., &quot;improved performance by 30%&quot;)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Keep dates in a consistent format throughout the resume
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Export as PDF for maximum ATS compatibility
              </li>
            </ul>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!selectedResumeId && !isCalculating && (
        <Card className="p-12 text-center">
          <BarChart3 className="size-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            {resumes.length === 0
              ? "Create a resume first to check its ATS score"
              : "Select a resume above to start the ATS analysis"}
          </p>
        </Card>
      )}
    </div>
  )
}
