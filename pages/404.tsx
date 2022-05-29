import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import StackContainer from '@components/UI/Containers/StackContainer'
import Heading from '@components/UI/Heading'
import NotFoundHero from '@components/NotFoundHero'
import PostsList from '@components/Posts/PostsList'
import { Post } from '@entities'
import { i18nApply, I18nPage, i18nPageContext, useTranslation } from '@i18n'
import { getAllPosts } from '@services/posts.service'

type Page404Static = I18nPage<{
  morePosts: Post[]
}>

const Page404: Page404Static = ({ morePosts }) => {
  const { t } = useTranslation('notFound')
  return (
    <>
      <Head>
        <title>Emanuel Casco | {t('meta.title')}</title>
        <meta name="description" content="Page not found." />
      </Head>
      <StackContainer tag="article">
        <NotFoundHero />
        <Heading type="h2">Blog.</Heading>
        <PostsList posts={morePosts} />
      </StackContainer>
    </>
  )
}

export async function getStaticProps(context: i18nPageContext) {
  const morePosts = getAllPosts(context.locale, {
    pagination: { limit: 3 },
  })

  return {
    props: {
      ...(await i18nApply(serverSideTranslations, context.locale, [
        'notFound',
      ])),
      morePosts,
    },
  }
}

export default Page404
