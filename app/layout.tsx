import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggleWrapper } from '@/components/theme-toggle-wrapper'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Resumey - AI-Powered Resume Builder',
  description: 'Create professional, ATS-optimized resumes with our easy-to-use resume builder. Customize templates, track ATS scores, and compare resumes for better job applications.',
  keywords: ['resume builder', 'CV maker', 'ATS optimization', 'job application', 'resume templates', 'professional resume'],
  authors: [{ name: 'Resumey Team' }],
  creator: 'Resumey',
  publisher: 'Resumey',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Resumey - AI-Powered Resume Builder',
    description: 'Create professional, ATS-optimized resumes with our easy-to-use resume builder.',
    url: 'https://resumey.app',
    siteName: 'Resumey',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resumey Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resumey - AI-Powered Resume Builder',
    description: 'Create professional, ATS-optimized resumes with our easy-to-use resume builder.',
    images: ['/og-image.png'],
    creator: '@resumeyapp',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased relative" suppressHydrationWarning>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/gradient-background.jpg)",
          }}
        />
        <div className="relative z-10">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="absolute top-4 right-4 z-20">
              <ThemeToggleWrapper />
            </div>
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
