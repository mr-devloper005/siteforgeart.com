'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#ffffff', '--editable-nav-text': '#242426', '--editable-nav-active': '#f58652', '--editable-nav-active-text': '#f58652', '--editable-cta-bg': '#f58652', '--editable-cta-text': '#ffffff', '--editable-search-bg': preset.colors.surface, '--editable-border': '#eeeeee', '--editable-container': '1500px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.key === 'image' ? 'Image' : task.label, href: task.route })),
    []
  )
  const desktopItems = [{ label: 'Home', href: '/' }, ...navItems.slice(0, 5), { label: 'Contact', href: '/contact' }]

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_10px_28px_rgba(23,23,25,0.04)]">
      <nav className="mx-auto flex min-h-[82px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#151619] shadow-[0_8px_22px_rgba(23,23,25,0.16)] ring-1 ring-black/10 transition duration-300 group-hover:-rotate-2 group-hover:scale-105">
            <img src="/favicon.png?v=20260606" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[220px] truncate text-4xl font-black leading-none tracking-[-0.06em]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="mx-auto hidden items-center justify-center gap-7 lg:flex">
          {desktopItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`text-[15px] font-bold transition hover:text-[var(--editable-nav-active)] ${active ? 'text-[var(--editable-nav-active)]' : ''}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-7 py-3.5 text-sm font-black text-[var(--editable-cta-text)] shadow-[0_12px_26px_rgba(245,134,82,0.24)] sm:inline-flex"><PlusCircle className="h-4 w-4" /> Create</Link>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-black/5 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-7 py-3.5 text-sm font-black text-[var(--editable-cta-text)] shadow-[0_12px_26px_rgba(245,134,82,0.24)] sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {[...desktopItems, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
