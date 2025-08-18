import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '@services/posts.service'
import { Post } from '@entities'

const generateSiteMap = (posts: Post[], locales: string[]) => {
  const baseUrl = 'https://emanuelcasco.com'

  // Static pages
  const staticPages = ['', '/blog', '/me']

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`

  // Add static pages for each locale
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const url = locale === 'en-US' ? page : `/${locale}${page}`
      const cleanUrl = url === '' ? '/' : url

      sitemap += `
<url>
  <loc>${baseUrl}${cleanUrl}</loc>
  <changefreq>weekly</changefreq>
  <priority>${page === '' ? '1.0' : '0.8'}</priority>`

      // Add alternate language links
      locales.forEach((altLocale) => {
        const altUrl = altLocale === 'en-US' ? page : `/${altLocale}${page}`
        const cleanAltUrl = altUrl === '' ? '/' : altUrl
        sitemap += `
  <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${cleanAltUrl}"/>`
      })

      sitemap += `
</url>`
    })
  })

  // Add blog posts for each locale
  locales.forEach((locale) => {
    const localePosts = getAllPosts(locale)

    localePosts.forEach((post) => {
      const postUrl =
        locale === 'en-US'
          ? `/blog/${post.slug}`
          : `/${locale}/blog/${post.slug}`

      sitemap += `
<url>
  <loc>${baseUrl}${postUrl}</loc>
  <lastmod>${new Date(post.date).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>`

      // Add alternate language links for posts
      locales.forEach((altLocale) => {
        const altPostUrl =
          altLocale === 'en-US'
            ? `/blog/${post.slug}`
            : `/${altLocale}/blog/${post.slug}`
        sitemap += `
  <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${altPostUrl}"/>`
      })

      sitemap += `
</url>`
    })
  })

  sitemap += `
</urlset>`

  return sitemap
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locales = ['en-US', 'es-ES']
    const posts = getAllPosts('en-US') // Get all posts for sitemap generation

    const sitemap = generateSiteMap(posts, locales)

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate'
    )
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).json({ error: 'Error generating sitemap' })
  }
}
