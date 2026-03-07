'use client'

import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function ThemeToggleWrapper() {
  const pathname = usePathname()
  if (pathname === '/dashboard/create' || pathname === '/dashboard/resumes' || pathname === '/dashboard/compare' || pathname === '/dashboard/ats-score') return null
  return <ThemeToggle />
}
