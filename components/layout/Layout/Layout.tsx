import { ReactNode } from 'react'

import { themes, composeStyles } from '@styles/theme'

import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import useDarkMode from '@hooks/useDarkMode'

import styles from './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {
  const [darkModeEnabled] = useDarkMode()
  return (
    <div
      id="app"
      className={composeStyles([
        darkModeEnabled ? themes.dark : themes.light,
        styles.layout,
      ])}
    >
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout
