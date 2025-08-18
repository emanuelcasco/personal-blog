import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { calculateReadingTime } from 'markdown-reading-time'
import { Post } from '@entities'

const MARKDOWN_EXTENSION = '.md'
const POSTS_DIRECTORY = join(process.cwd(), './posts')

const defaultPostRequestOptions = {
  pagination: { limit: 50, from: 0 },
  filter: () => true,
}

const getPostSlugs = (lang: string) =>
  fs
    .readdirSync(join(POSTS_DIRECTORY, lang))
    .filter((filename) => filename.includes(MARKDOWN_EXTENSION))
    .map((filename) => filename.replace(MARKDOWN_EXTENSION, ''))

export const getPostBySlug = (slug: string, locale = 'en-US') => {
  const fullPath = join(POSTS_DIRECTORY, locale, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return {
    slug,
    content: content,
    readTime: calculateReadingTime(content).minutes,
    date: data.date,
    tags: data.tags || [],
    ...data,
  } as unknown as Post
}

interface GetAllPostsArgs {
  pagination?: { limit: number; from?: number }
  filterBy?: (post: Post) => boolean
}

export const getAllPosts = (
  locale = 'en-US',
  options: GetAllPostsArgs = defaultPostRequestOptions
) => {
  const { pagination, filterBy = () => true } = {
    ...defaultPostRequestOptions,
    ...options,
  }
  const posts = getPostSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale))
    .filter(filterBy)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(pagination.from, (pagination.from ?? 0) + pagination.limit)

  console.log(
    '🚀 ~ posts:',
    posts.map((p) => ({ name: p.title, date: p.date }))
  )
  return posts
}
