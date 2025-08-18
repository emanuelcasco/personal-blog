const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const baseUrl = 'https://emanuelcasco.com'
const postsDirectory = path.join(process.cwd(), 'posts')
const locales = ['en-US', 'es-ES']

// Get all post slugs for a locale
const getPostSlugs = (locale) => {
  const dir = path.join(postsDirectory, locale)
  return fs.readdirSync(dir)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => filename.replace('.md', ''))
}

// Get post metadata
const getPostBySlug = (slug, locale) => {
  const fullPath = path.join(postsDirectory, locale, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  return {
    slug,
    date: data.date,
    ...data
  }
}

const generateSitemap = () => {
  const staticPages = ['', '/blog', '/me']
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`

  // Add static pages
  staticPages.forEach(page => {
    locales.forEach(locale => {
      const url = locale === 'en-US' ? page : `/${locale}${page}`
      const cleanUrl = url === '' ? '/' : url
      
      sitemap += `
  <url>
    <loc>${baseUrl}${cleanUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>`
      
      // Add alternate language links
      locales.forEach(altLocale => {
        const altUrl = altLocale === 'en-US' ? page : `/${altLocale}${page}`
        const cleanAltUrl = altUrl === '' ? '/' : altUrl
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${cleanAltUrl}"/>`
      })
      
      sitemap += `
  </url>`
    })
  })

  // Add blog posts
  locales.forEach(locale => {
    const slugs = getPostSlugs(locale)
    
    slugs.forEach(slug => {
      const post = getPostBySlug(slug, locale)
      const postUrl = locale === 'en-US' ? `/blog/${slug}` : `/${locale}/blog/${slug}`
      
      sitemap += `
  <url>
    <loc>${baseUrl}${postUrl}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>`
      
      // Add alternate language links
      locales.forEach(altLocale => {
        const altPostUrl = altLocale === 'en-US' ? `/blog/${slug}` : `/${altLocale}/blog/${slug}`
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

// Generate and save sitemap
const sitemap = generateSitemap()
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap)
console.log('✅ Sitemap generated successfully!')