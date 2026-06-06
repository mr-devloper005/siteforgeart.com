'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#1f1f20', '--editable-footer-text': '#ffffff' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="mk-dark-pattern overflow-hidden bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#151619] shadow-[0_12px_28px_rgba(0,0,0,0.28)] ring-1 ring-white/10">
              <img src="/favicon.png?v=20260606" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
            </span>
            <span className="text-4xl font-black tracking-[-0.06em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <Link href="/image" className="mt-7 inline-flex rounded-full bg-[#f58652] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(245,134,82,0.24)]">
            Explore visual demos
          </Link>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#f58652]">Explore</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#f58652]">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/70 hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/70 hover:text-white">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-bold text-white/45">
        &copy; {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
