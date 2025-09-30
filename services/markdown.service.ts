import { remark } from 'remark'
import remarkHTML from 'remark-html'
import type { Options as RemarkHtmlOptions } from 'remark-html'
import remarkPrism from 'remark-prism'
import remarkGFM from 'remark-gfm'
import remarkGithubBlockquote from 'remark-github-beta-blockquote-admonitions'
import remarkSlug from 'remark-slug'
import remarkHeadingId from 'remark-heading-id'
import type { Plugin } from 'unified'
import type { Root } from 'mdast'

export async function markdownToHtml(markdown: string) {
  if (!markdown) return ''

  const processor = remark()

  processor.use(remarkSlug)
  processor.use(remarkHeadingId)
  processor.use(
    remarkHTML as unknown as Plugin<[RemarkHtmlOptions?], Root, string>,
    { sanitize: false }
  )
  processor.use(remarkPrism)
  processor.use(remarkGFM)
  processor.use(remarkGithubBlockquote)

  const processedContent = await processor.process(markdown)

  return processedContent.toString()
}
