const Meta = () => {
  return (
    <>
      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#1E1926"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      {/* Page manifests */}
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      {/* PWA Theme */}
      <meta name="msapplication-TileColor" content="#1E1926" />
      <meta name="theme-color" content="#1E1926" />
      {/* Fonts & External Styles */}
      <link
        media="all"
        href={`https://unpkg.com/prism-themes@1.6.0/themes/prism-xonokai.css`}
        rel="stylesheet"
      />
      {/* Feed */}
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      {/* Meta */}
      <meta
        name="description"
        content={`//TODO: Replace with a real description.A statically generated blog example using Next.js and.`}
      />
    </>
  )
}

export default Meta
