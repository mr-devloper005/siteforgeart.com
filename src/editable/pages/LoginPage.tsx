import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Images, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)]">
        <section className="grid min-h-[720px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="mk-dark-pattern relative flex overflow-hidden px-5 py-16 sm:px-10 lg:px-14 lg:py-20">
            <span className="mk-drift pointer-events-none absolute left-[12%] top-[16%] h-8 w-8 rounded-full border border-[var(--slot4-accent)]" />
            <span className="mk-float pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[6px] border-[var(--slot4-accent)]/50" />
            <div className="relative z-10 my-auto max-w-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--slot4-accent-fill)] text-white shadow-[0_18px_36px_rgba(245,134,82,0.28)]">
                <Images className="h-7 w-7" />
              </div>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-white sm:text-6xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/62">{pagesContent.auth.login.description}</p>
              <div className="mt-9 grid gap-3 text-sm font-bold text-white/72">
                <p className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" /> Continue managing visual submissions.</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" /> Return to your publishing workspace.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-16 sm:px-8 lg:px-14">
            <div className="w-full max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Welcome back</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{pagesContent.auth.login.formTitle}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--slot4-muted-text)]">Enter your account details to continue.</p>
              <div className="mk-browser-card mt-9 p-4 pt-12 sm:p-7 sm:pt-14">
                <div className="rounded-2xl bg-[var(--slot4-surface-bg)] p-6 shadow-[0_20px_48px_rgba(23,23,25,0.07)] sm:p-8">
                  <EditableLocalLoginForm />
                  <p className="mt-6 border-t border-[var(--slot4-line)] pt-5 text-sm text-[var(--slot4-muted-text)]">
                    New here? <Link href="/signup" className="inline-flex items-center gap-1 font-extrabold text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]">{pagesContent.auth.login.createCta} <ArrowRight className="h-4 w-4" /></Link>
                  </p>
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs font-bold text-[var(--slot4-muted-text)]"><Sparkles className="h-4 w-4 text-[var(--slot4-accent)]" /> Your session stays on this device.</p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
