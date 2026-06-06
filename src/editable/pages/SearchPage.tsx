import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Image as ImageIcon, Search, SearchX, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const style = index % 5

  if (style === 0 && image) {
    return (
      <Link href={href} className="group relative min-h-[440px] overflow-hidden rounded-[1.5rem] bg-[#1f1f20] text-white shadow-[0_24px_65px_rgba(23,23,25,0.16)] md:col-span-2">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.82))]" />
        <div className="relative flex min-h-[440px] flex-col justify-end p-7 sm:p-10">
          <span className="w-fit rounded-full bg-[#f58652] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">{taskLabel}</span>
          <h2 className="mt-5 max-w-4xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">{post.title}</h2>
          {summary ? <p className="mt-4 max-w-3xl line-clamp-2 text-sm leading-7 text-white/70">{summary}</p> : null}
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-black">Open featured result <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </div>
      </Link>
    )
  }

  if (style === 1) {
    return (
      <Link href={href} className="group grid overflow-hidden rounded-[1.5rem] border border-[#eeeeee] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(23,23,25,0.1)] md:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative min-h-[180px] overflow-hidden rounded-xl bg-[#f3f3f3]">
          {image ? <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <ImageIcon className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-[#b8bac0]" />}
        </div>
        <div className="min-w-0 p-3 sm:p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f58652]">{taskLabel}</p>
          <h2 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
          {summary ? <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#777981]">{summary}</p> : null}
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]">Open result <ArrowRight className="h-4 w-4" /></span>
        </div>
      </Link>
    )
  }

  if (style === 2 && image) {
    return (
      <Link href={href} className="mk-browser-card group block transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_64px_rgba(23,23,25,0.12)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f58652]">{taskLabel}</p>
        <h2 className="mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.03em]">{post.title}</h2>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group block rounded-[1.5rem] border border-[#eeeeee] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(23,23,25,0.09)] ${style === 3 ? 'bg-[#fff0e8]' : 'bg-[#f8f8f8]'}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#f58652] shadow-sm">{taskLabel}</span>
        <span className="text-xs font-black text-[#a2a4ab]">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h2 className="mt-8 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {summary ? <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#777981]">{summary}</p> : null}
      <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]">Open result <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[#171719]">
        <section className="mk-dark-pattern relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <span className="mk-drift pointer-events-none absolute left-[7%] top-[18%] h-9 w-9 rounded-full border border-[#f58652]" />
          <span className="mk-float pointer-events-none absolute -right-10 bottom-0 h-36 w-36 rounded-full border-[5px] border-[#f58652]/50" />
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="relative z-10">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#f58652] text-white shadow-[0_18px_34px_rgba(245,134,82,0.28)]"><Search className="h-6 w-6" /></div>
              <p className="mt-7 text-xs font-black uppercase tracking-[0.24em] text-[#f58652]">{pagesContent.search.hero.badge}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-6xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/62">{pagesContent.search.hero.description}</p>
            </div>

            <div className="mk-browser-card bg-[#202124] p-3 pt-11 shadow-[0_32px_76px_rgba(0,0,0,0.3)]">
              <form action="/search" className="rounded-xl bg-white p-5 sm:p-7">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 rounded-xl border border-[#dfdfe2] bg-[#fafafa] px-4 py-3.5 focus-within:border-[#f58652] focus-within:ring-4 focus-within:ring-[#f58652]/10">
                  <Search className="h-5 w-5 text-[#96989f]" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-[#a2a4ab]" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-xl border border-[#dfdfe2] bg-[#fafafa] px-4 py-3">
                    <Filter className="h-4 w-4 text-[#96989f]" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[#a2a4ab]" />
                  </label>
                  <select name="task" defaultValue={task} className="rounded-xl border border-[#dfdfe2] bg-[#fafafa] px-4 py-3 text-sm font-black outline-none focus:border-[#f58652]">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#f58652] px-6 text-sm font-black text-white shadow-[0_14px_30px_rgba(245,134,82,0.26)] transition hover:-translate-y-0.5" type="submit">
                  Search archive <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f58652]">{results.length} results</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/image" className="inline-flex items-center gap-2 rounded-full border border-[#eeeeee] bg-white px-6 py-3 text-sm font-black shadow-sm transition hover:border-[#f58652] hover:text-[#f58652]">Browse visuals <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-9 rounded-[1.5rem] border border-dashed border-[#dedee1] bg-[#f8f8f8] p-10 text-center sm:p-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0e8] text-[#f58652]"><SearchX className="h-7 w-7" /></div>
              <p className="mt-6 text-3xl font-black tracking-[-0.04em]">No matching posts found.</p>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#777981]">Try a different keyword, content type, or category to discover more visual work.</p>
              <Link href="/search" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171719] px-6 py-3 text-sm font-black text-white"><Sparkles className="h-4 w-4 text-[#f58652]" /> Clear search</Link>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
