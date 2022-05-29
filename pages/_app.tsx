import type { AppProps } from 'next/app'
import { Suspense } from 'react'
import Router from 'next/router'

// Loader bar (nprogress module)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@components/layout/Layout'
import { appWithTranslation } from '@i18n'

// Global Styles
import '../styles/globals.css'

//Binding events (nprogress module)
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback="loading">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Suspense>
  )
}

export default appWithTranslation(MyApp)
