import Link from 'next/link'
import { ArrowRight, CheckCircle2, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function postLink(task: TaskKey, route: string, post: SitePost) {
  return postHref(task, post, route)
}

function BrowserFrame({ post, href, className = '', tall = false }: { post: SitePost; href: string; className?: string; tall?: boolean }) {
  return (
    <Link href={href} className={`mk-browser-card mk-reveal group block overflow-hidden ${className}`}>
      <div className={`relative overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] ${tall ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="pt-5">
        <h3 className="line-clamp-1 text-xl font-semibold tracking-[-0.02em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-1 text-base text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</p>
      </div>
    </Link>
  )
}

function SoftFeature({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const colors = ['bg-[var(--slot4-gray)]', 'bg-[var(--slot4-lavender)]', 'bg-[var(--slot4-warm)]', 'bg-[var(--slot4-cream)]']
  return (
    <Link href={href} className={`group block overflow-hidden rounded-2xl ${colors[index % colors.length]} p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.09)]`}>
      <p className="text-center text-2xl font-extrabold tracking-[-0.03em] text-[var(--slot4-page-text)]">{index % 2 ? 'Variant Image Product' : 'Advance Portfolio Preview'}</p>
      <p className="mx-auto mt-3 max-w-lg text-center text-base leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105) || 'A polished visual profile with room for images, notes, categories, and context.'}</p>
      <div className="mx-auto mt-8 max-w-xl">
        <div className="mk-browser-card shadow-none">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts[0]
  const fallbackTitle = pagesContent.home.hero.title.join(' ')
  return (
    <section className="mk-dark-pattern relative overflow-hidden">
      <span className="mk-drift pointer-events-none absolute left-[13%] top-[18%] h-9 w-9 rounded-full border border-[var(--slot4-accent)]" />
      <span className="mk-drift pointer-events-none absolute right-[9%] top-[12%] h-3 w-3 rounded-full bg-[var(--slot4-accent)]" />
      <span className="mk-float pointer-events-none absolute -left-8 bottom-[18%] h-32 w-32 rounded-full border-[5px] border-[var(--slot4-accent)]/60" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
        <p className="mx-auto max-w-fit rounded-full border border-white/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
        <h1 className="mx-auto mt-8 max-w-5xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
          The <span className="text-[var(--slot4-accent)]">{taskLabel(primaryTask).toLowerCase()}</span> showcase creative professionals have been waiting for.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/68">{pagesContent.home.hero.description || fallbackTitle}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href={primaryRoute} className="rounded-full bg-[var(--slot4-accent-fill)] px-10 py-4 text-base font-extrabold text-white shadow-[0_18px_38px_rgba(245,134,82,0.28)] transition hover:-translate-y-0.5">Front-end</Link>
          <Link href="/search" className="rounded-full border border-[var(--slot4-accent)] px-10 py-4 text-base font-extrabold text-white transition hover:bg-[var(--slot4-accent-fill)]">Back-end</Link>
        </div>
        {featured ? (
          <div className="mx-auto mt-14 max-w-6xl">
            <div className="mk-browser-card mk-float bg-[var(--slot4-dark-bg)] p-3 pt-11 shadow-[0_36px_90px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[16/8] overflow-hidden rounded-md bg-[var(--slot4-surface-bg)]">
                <img src={getEditablePostImage(featured)} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-left">
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Featured visual</p>
                  <h2 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight text-white">{featured.title}</h2>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const demos = posts.slice(0, 9)
  if (!demos.length) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--slot4-page-text)] sm:text-5xl">Exclusive ready-to-use showcases</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--slot4-muted-text)]">Discover visual profiles, image stories, and portfolio-led posts in a clean demo gallery.</p>
        </div>
        <div className="mt-14 grid gap-x-9 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {demos.map((post, index) => (
            <BrowserFrame key={post.id || post.slug} post={post} href={postLink(primaryTask, primaryRoute, post)} tall={index % 4 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ posts }: HomeSectionProps) {
  const featurePosts = posts.slice(9, 15).length ? posts.slice(9, 15) : posts.slice(0, 6)
  if (!featurePosts.length) return null
  return (
    <section className="mk-dark-pattern overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pooled = timeSections.flatMap((section) => section.posts)
  const featurePosts = (pooled.length ? pooled : posts).slice(0, 8)
  if (!featurePosts.length) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--slot4-page-text)] sm:text-5xl">All the things needed for the perfect website</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--slot4-muted-text)]">Search, categories, detail pages, image grids, comments, and related content all stay connected to the current data.</p>
        </div>
        <form action="/search" className="mx-auto mt-10 flex max-w-2xl rounded-full border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <input name="q" placeholder="Search portfolios, visuals, and profiles" className="min-w-0 flex-1 bg-transparent px-5 text-sm font-medium outline-none" />
          <button className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-6 py-3 text-sm font-extrabold text-[var(--slot4-surface-bg)]"><Search className="h-4 w-4" /> Search</button>
        </form>
        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {featurePosts.slice(0, 4).map((post, index) => (
            <SoftFeature key={post.id || post.slug} post={post} href={postLink(primaryTask, primaryRoute, post)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[var(--slot4-surface-bg)] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-[var(--slot4-gray)] px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Sparkles className="h-6 w-6" /></div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--slot4-page-text)] sm:text-5xl">A community of creative discovery</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">Browse public visual posts, professional profiles, useful resources, and showcase-ready stories from one polished interface.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/image" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-8 py-4 text-sm font-extrabold text-white">Browse visuals <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] px-8 py-4 text-sm font-extrabold text-[var(--slot4-page-text)]"><CheckCircle2 className="h-4 w-4" /> Contact</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
