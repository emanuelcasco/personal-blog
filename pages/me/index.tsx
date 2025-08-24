import type { NextPage } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nApply, i18nPageContext, useTranslation } from '@i18n'

import AboutMe from '@components/UI/AboutMe/AboutMe'

const AboutMePage: NextPage = () => {
  const { t } = useTranslation('me')

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
      </Head>

      <AboutMe />
    </>
  )
}

export async function getStaticProps(context: i18nPageContext) {
  return {
    props: {
      ...(await i18nApply(serverSideTranslations, context.locale, ['me'])),
    },
  }
}

export default AboutMePage
