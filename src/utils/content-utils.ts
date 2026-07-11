import { getCollection } from 'astro:content'
import type { BlogPostData } from '@/types/config'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

type SortedPost = { body: string; data: BlogPostData; slug: string }

export type Tag = {
  name: string
  count: number
}

export type Category = {
  name: string
  count: number
}

// 构建 / 同一次请求内复用，避免侧栏 Heatmap/Tags/Categories 重复扫库
let sortedPostsPromise: Promise<SortedPost[]> | null = null
let tagListPromise: Promise<Tag[]> | null = null
let categoryListPromise: Promise<Category[]> | null = null

export async function getSortedPosts(): Promise<SortedPost[]> {
  if (sortedPostsPromise) return sortedPostsPromise

  sortedPostsPromise = (async () => {
    const allBlogPosts = (await getCollection('posts', ({ data }) => {
      return import.meta.env.PROD ? data.draft !== true : true
    })) as unknown as SortedPost[]

    const sorted = allBlogPosts.sort(
      (a: { data: BlogPostData }, b: { data: BlogPostData }) => {
        const pinnedA = a.data.pinned ? 1 : 0
        const pinnedB = b.data.pinned ? 1 : 0
        if (pinnedA !== pinnedB) {
          return pinnedB - pinnedA
        }
        const dateA = new Date(a.data.published)
        const dateB = new Date(b.data.published)
        return dateA > dateB ? -1 : 1
      },
    )

    for (let i = 1; i < sorted.length; i++) {
      sorted[i].data.nextSlug = sorted[i - 1].slug
      sorted[i].data.nextTitle = sorted[i - 1].data.title
    }
    for (let i = 0; i < sorted.length - 1; i++) {
      sorted[i].data.prevSlug = sorted[i + 1].slug
      sorted[i].data.prevTitle = sorted[i + 1].data.title
    }

    return sorted
  })()

  return sortedPostsPromise
}

export async function getTagList(): Promise<Tag[]> {
  if (tagListPromise) return tagListPromise

  tagListPromise = (async () => {
    const allBlogPosts = await getCollection<'posts'>('posts', ({ data }) => {
      return import.meta.env.PROD ? data.draft !== true : true
    })

    const countMap: { [key: string]: number } = {}
    allBlogPosts.map((post: { data: { tags: string[] } }) => {
      post.data.tags.map((tag: string) => {
        if (!countMap[tag]) countMap[tag] = 0
        countMap[tag]++
      })
    })

    const keys: string[] = Object.keys(countMap).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })

    return keys.map(key => ({ name: key, count: countMap[key] }))
  })()

  return tagListPromise
}

export async function getCategoryList(): Promise<Category[]> {
  if (categoryListPromise) return categoryListPromise

  categoryListPromise = (async () => {
    const allBlogPosts = await getCollection<'posts'>('posts', ({ data }) => {
      return import.meta.env.PROD ? data.draft !== true : true
    })
    const count: { [key: string]: number } = {}
    allBlogPosts.map((post: { data: { category: string | number } }) => {
      if (!post.data.category) {
        const ucKey = i18n(I18nKey.uncategorized)
        count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1
        return
      }
      count[post.data.category] = count[post.data.category]
        ? count[post.data.category] + 1
        : 1
    })

    const lst = Object.keys(count).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })

    const ret: Category[] = []
    for (const c of lst) {
      ret.push({ name: c, count: count[c] })
    }
    return ret
  })()

  return categoryListPromise
}
