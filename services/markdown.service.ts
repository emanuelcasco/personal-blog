import { remark } from 'remark'
import remarkHTML from 'remark-html'
import remarkPrism from 'remark-prism'
import remarkGFM from 'remark-gfm'
import remarkGithubBlockquote from 'remark-github-beta-blockquote-admonitions'
import remarkSlug from 'remark-slug'
import remarkHeadingId from 'remark-heading-id'

export async function markdownToHtml(markdown: string) {
  if (!markdown) return ''

  const processor = remark()
    .use(remarkSlug)
    .use(remarkHeadingId)
    .use(remarkHTML, { sanitize: false })
    .use(remarkPrism)
    .use(remarkGFM)
    .use(remarkGithubBlockquote)

  const processedContent = await processor.process(markdown)

  return processedContent.toString()
}
