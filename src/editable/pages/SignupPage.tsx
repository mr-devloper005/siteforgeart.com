import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ImagePlus, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#171719]">
        <section className="grid min-h-[760px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex items-center justify-center px-4 py-16 sm:px-8 lg:px-14">
            <div className="w-full max-w-xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f58652]">Join the showcase</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{pagesContent.auth.signup.formTitle}</h1>
              <p className="mt-4 text-base leading-7 text-[#777981]">Create your account and start shaping your visual presence.</p>
              <div className="mk-browser-card mt-9 p-4 pt-12 sm:p-7 sm:pt-14">
                <div className="rounded-2xl bg-white p-6 shadow-[0_20px_48px_rgba(23,23,25,0.07)] sm:p-8">
                  <EditableLocalSignupForm />
                  <p className="mt-6 border-t border-[#eeeeee] pt-5 text-sm text-[#777981]">
                    Already have an account? <Link href="/login" className="inline-flex items-center gap-1 font-black text-[#171719] hover:text-[#f58652]">{pagesContent.auth.signup.loginCta} <ArrowRight className="h-4 w-4" /></Link>
                  </p>
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs font-bold text-[#96989f]"><Sparkles className="h-4 w-4 text-[#f58652]" /> Simple local access with no extra setup.</p>
            </div>
          </div>

          <div className="mk-dark-pattern relative flex overflow-hidden px-5 py-16 sm:px-10 lg:px-14 lg:py-20">
            <span className="mk-drift pointer-events-none absolute right-[13%] top-[15%] h-9 w-9 rounded-full border border-[#f58652]" />
            <span className="mk-float pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full border-[6px] border-[#f58652]/50" />
            <div className="relative z-10 my-auto max-w-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f58652] text-white shadow-[0_18px_36px_rgba(245,134,82,0.28)]">
                <ImagePlus className="h-7 w-7" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-[#f58652]">{pagesContent.auth.signup.badge}</p>
              <h2 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-6xl">{pagesContent.auth.signup.title}</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/62">{pagesContent.auth.signup.description}</p>
              <div className="mt-9 grid gap-3 text-sm font-bold text-white/72">
                <p className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-[#f58652]" /> Publish image-led posts and profiles.</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-[#f58652]" /> Keep your creative work connected.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
