'use client'

import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function ThemeToggleWrapper() {
  const pathname = usePathname()
  if (pathname === '/dashboard/create') return null
  return <ThemeToggle />
}
