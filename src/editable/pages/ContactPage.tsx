'use client'

import { ArrowUpRight, Image as ImageIcon, Mail, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  {
    icon: ImageIcon,
    title: 'Creator collaborations',
    body: 'Discuss portfolio launches, creator features, visual campaigns, and gallery partnerships.',
  },
  {
    icon: Sparkles,
    title: 'Licensing and use',
    body: 'Reach out about usage rights, commercial requests, and professional visual partnerships.',
  },
  {
    icon: Mail,
    title: 'Media and features',
    body: 'Request creator decks, editorial support, or placement for a visual profile or project.',
  },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)]">
        <section className="mk-dark-pattern relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <span className="mk-drift pointer-events-none absolute left-[8%] top-[24%] h-9 w-9 rounded-full border border-[var(--slot4-accent)]" />
          <span className="mk-float pointer-events-none absolute -right-10 bottom-5 h-32 w-32 rounded-full border-[5px] border-[var(--slot4-accent)]/55" />
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-0.05em] text-white sm:text-6xl">
              Let&apos;s create something <span className="text-[var(--slot4-accent)]">worth seeing.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Choose a conversation</p>
            <h2 className="mt-4 max-w-xl text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Tell us what you are building.</h2>
            <div className="mt-9 grid gap-4">
              {lanes.map((lane, index) => (
                <article key={lane.title} className="group grid grid-cols-[56px_minmax(0,1fr)_auto] items-start gap-4 border-b border-[var(--slot4-line)] py-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:bg-[var(--slot4-accent)] group-hover:text-white">
                    <lane.icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">0{index + 1}</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{lane.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                  </div>
                  <ArrowUpRight className="mt-2 h-5 w-5 text-[var(--slot4-accent)]" />
                </article>
              ))}
            </div>
          </div>

          <div className="mk-browser-card bg-[var(--slot4-gray)] p-4 pt-12 sm:p-7 sm:pt-14">
            <div className="rounded-2xl bg-[var(--slot4-surface-bg)] p-6 shadow-[0_22px_55px_rgba(23,23,25,0.08)] sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Start a project</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
