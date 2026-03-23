'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Check, 
  Zap, 
  Target, 
  FileText, 
  Brain, 
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react'
import WaveBackground from '@/components/wave-background'

export default function LandingPage() {
  const router = useRouter()
  const [openItems, setOpenItems] = useState<boolean[]>(new Array(10).fill(false)) // Assuming 10 FAQ items

  const toggleItem = (idx: number) => {
    setOpenItems(prev => prev.map((open, i) => i === idx ? !open : open))
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Intelligent suggestions tailored to your industry'
    },
    {
      icon: Target,
      title: 'ATS Optimized',
      description: '89% pass-through rate with leading applicant systems'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create a professional resume in minutes'
    },
    {
      icon: FileText,
      title: 'Multiple Formats',
      description: 'Download as PDF, Word, or plain text'
    },
    {
      icon: Brain,
      title: 'Smart Matching',
      description: 'Match your skills to job descriptions'
    },
    {
      icon: CheckCircle2,
      title: 'Templates',
      description: 'Choose from 50+ professionally designed templates'
    }
  ]

  const howItWorks = [
    {
      number: '1',
      title: 'Fill Your Information',
      description: 'Enter your education, experience, and skills'
    },
    {
      number: '2',
      title: 'Choose a Template',
      description: 'Pick from professional, modern, or creative designs'
    },
    {
      number: '3',
      title: 'Check ATS Score',
      description: 'Optimize for applicant tracking systems'
    },
    {
      number: '4',
      title: 'Download & Apply',
      description: 'Export as PDF and start applying today'
    }
  ]

  const faqItems = [
    {
      q: 'Is Resumey ATS-friendly?',
      a: 'Yes. Every template is structured to pass Applicant Tracking Systems (ATS). We use clean formatting, proper section hierarchy, and keyword optimization to ensure your resume can be read by automated systems before it reaches a recruiter.'
    },
    {
      q: 'Can I edit everything the AI writes?',
      a: 'Absolutely. The AI generates a strong starting point, but you have full control. You can rewrite, remove, or customize any section at any time.'
    },
    {
      q: 'Is AI-generated content detectable?',
      a: 'Resumey doesn\'t generate generic filler text. It builds structured, professional bullet points based on your real experience. The final content reflects your input — not robotic templates.'
    },
    {
      q: 'Can students or fresh graduates use Resumey?',
      a: 'Yes. We guide you even if you have no work experience, only internships, academic projects, or freelance work. The system suggests alternatives like skills, coursework, and achievements.'
    },
    {
      q: 'What file formats can I download?',
      a: 'You can export your resume as PDF (recommended for job applications) and Word (.docx). Formatting remains intact after download.'
    },
    {
      q: 'Can I tailor my resume for each job?',
      a: 'Yes. Paste a job description and Resumey will suggest adjustments to match keywords and responsibilities.'
    },
    {
      q: 'Do recruiters see my resume automatically?',
      a: 'Only if you enable Recruiter Match (premium feature). Otherwise, your resume stays private.'
    },
    {
      q: 'Is my data secure?',
      a: 'We use encrypted storage and secure authentication. Your personal information is never sold or shared.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. Subscriptions can be cancelled at any time from your dashboard.'
    },
    {
      q: 'Do I own my resume?',
      a: '100%. Everything you create belongs to you.'
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Wave Background */}
      <WaveBackground 
        lineColor="rgba(255, 255, 255, 0.3)"
        backgroundColor="#0f172a"
        waveSpeed={0.01}
      />
      
      {/* Content Wrapper */}
      <div className="relative z-50 wave-background-content">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-lg group-hover:shadow-lg transition-shadow">
                R
              </div>
              <span className="text-xl font-bold text-foreground">Resumey</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push('/auth/signin')}
                className="border-primary/50 hover:bg-primary/10 gap-2"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-20 sm:pb-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-40 animate-bounce" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl opacity-50 animate-float" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500/10 rounded-full blur-2xl opacity-45 animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-12">
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight text-balance animate-in slide-in-from-bottom-4 duration-1000">
                Land more interviews with a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient-x">
                  job-winning resume
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                Resumey uses AI to craft ATS-optimized resumes tailored to your target role. Get hired faster with proven formatting and content strategies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push('/dashboard/create')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all gap-2 text-base"
              >
                Create My Resume
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 text-base"
              >
                View Templates
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                      <path d="M10 1.5l2.4 7.4h7.7l-6.2 4.5 2.4 7.4-6.3-4.5-6.3 4.5 2.4-7.4-6.2-4.5h7.7l2.4-7.4z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">4.8/5</p>
                  <p className="text-sm text-muted-foreground">from 12,000+ users</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-border pl-8">
                <div>
                  <p className="font-semibold text-foreground">50,000+</p>
                  <p className="text-sm text-muted-foreground">resumes created</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-32 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a resume that gets results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/95 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 hover:-rotate-1 transition-all duration-300 cursor-pointer">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all mb-4 group-hover:scale-110 duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your perfect resume in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={idx} className={`relative animate-in slide-in-from-bottom-4 duration-1000 delay-${idx * 200} hover:scale-105 transition-all duration-300`}>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent animate-pulse" />
                )}
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white dark:text-black font-bold text-lg hover:scale-110 hover:rotate-12 transition-all duration-300">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-muted-foreground hover:text-foreground/80 transition-colors duration-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <h2 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
              Ready to land your dream job?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of job seekers who have already created their perfect resume with Resumey.
            </p>
            <Button
              size="lg"
              onClick={() => router.push('/dashboard/current')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all gap-2 text-base px-8"
            >
              Work on Current Resume
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-32 border-t border-border bg-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Resumey
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <button
                  onClick={() => toggleItem(idx)}
                  className="flex items-center justify-between font-semibold text-foreground w-full text-left cursor-pointer"
                >
                  {item.q}
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${openItems[idx] ? 'rotate-90' : ''}`} />
                </button>
                <div className={`mt-4 overflow-hidden transition-all duration-300 ${openItems[idx] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">© 2024 Resumey. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
