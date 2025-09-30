import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRef } from 'react'

import PostBody from '@components/Posts/PostBody'
import PostHeader from '@components/Posts/PostHeader'
import StackContainer from '@components/UI/Containers/StackContainer'
import Heading from '@components/UI/Heading'
import ScrollProgressIndicator from '@components/UI/ScrollProgressIndicator'
import { Post } from '@entities'
import { i18nApply, I18nPage, i18nPageContext } from '@i18n'
import { markdownToHtml } from '@services/markdown.service'
import { getAllPosts, getPostBySlug } from '@services/posts.service'

type BlogPostPageStatic = I18nPage<{
  locale: string
  post: Post
  morePosts: Post[]
  preview?: boolean
}>

const BlogPostPage: BlogPostPageStatic = ({ post }) => {
  const router = useRouter()
  const bodyRef = useRef<HTMLDivElement | null>(null)

  if (!router.isFallback && !post?.slug) return <>Error</>
  return (
    <>
      <Head>
        <title>{post.title} | Emanuel Casco</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Emanuel Casco" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={post.tags.join(', ')} />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:image"
          content={`https://emanuelcasco.com${post.coverImage}`}
        />
        <meta
          property="og:url"
          content={`https://emanuelcasco.com/blog/${post.slug}`}
        />
        <meta property="og:site_name" content="Emanuel Casco Blog" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@emanuelcasco" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta
          name="twitter:image"
          content={`https://emanuelcasco.com${post.coverImage}`}
        />

        {/* Article specific */}
        <meta property="article:author" content="Emanuel Casco" />
        <meta property="article:published_time" content={post.date} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://emanuelcasco.com/blog/${post.slug}`}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              image: `https://emanuelcasco.com${post.coverImage}`,
              author: {
                '@type': 'Person',
                name: 'Emanuel Casco',
                url: 'https://emanuelcasco.com',
              },
              publisher: {
                '@type': 'Person',
                name: 'Emanuel Casco',
                url: 'https://emanuelcasco.com',
              },
              datePublished: post.date,
              dateModified: post.date,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://emanuelcasco.com/blog/${post.slug}`,
              },
              keywords: post.tags.join(', '),
              url: `https://emanuelcasco.com/blog/${post.slug}`,
            }),
          }}
        />
      </Head>
      <StackContainer tag="article">
        {router.isFallback ? (
          <Heading type="h1">Loading...</Heading>
        ) : (
          <PostHeader post={post} />
        )}
        {!router.isFallback && (
          <PostBody ref={bodyRef} content={post.content} />
        )}
        <ScrollProgressIndicator showOnRef={bodyRef} />
      </StackContainer>
    </>
  )
}

export async function getStaticProps(
  context: i18nPageContext<{ params: { slug: string } }>
) {
  const post = getPostBySlug(context.params.slug, context.locale)

  const morePosts = getAllPosts(context.locale, {
    pagination: { limit: 3 },
    filterBy: (post) => post.slug !== context.params.slug,
  })

  return {
    props: {
      ...(await i18nApply(serverSideTranslations, context.locale, ['post'])),
      post: { ...post, content: await markdownToHtml(post.content || '') },
      morePosts,
    },
  }
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  let paths: { params: { slug: string }; locale: string }[] = []
  for (const locale of locales) {
    const posts = getAllPosts(locale)
    paths = paths.concat(
      posts.map((post) => ({
        params: { slug: post.slug },
        locale,
      }))
    )
  }
  return {
    paths,
    fallback: false,
  }
}

export default BlogPostPage
