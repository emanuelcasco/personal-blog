import Document, { Html, Head, Main, NextScript } from 'next/document'

import AnalyticsScript from '@components/Head/Analytics'
import Meta from '@components/Head/Meta'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <Meta />
          <AnalyticsScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
