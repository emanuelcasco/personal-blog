import Link from 'next/link'
import { useRouter } from 'next/router'

import LanguagePicker from '@components/UI/LanguagePicker'
import { useTranslation } from '@i18n'
import { composeStyles } from '@styles/theme'

import styles from './Navbar.css'

function Header() {
  const router = useRouter()
  const { t } = useTranslation('common')

  const isActive = (path: string) => {
    const base = router.pathname.split('/')[1] || 'home'
    return path === base
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/" locale={router.locale}>
        <a
          className={composeStyles([
            styles.navbar__link,
            { style: styles.navbar__linkActive, condition: isActive('home') },
          ])}
          href="/"
        >
          {t('navigation.home')}
        </a>
      </Link>
      <Link href="/blog" locale={router.locale}>
        <a
          className={composeStyles([
            styles.navbar__link,
            { style: styles.navbar__linkActive, condition: isActive('blog') },
          ])}
          href="/blog"
        >
          {t('navigation.blog')}
        </a>
      </Link>
      <Link href="/me" locale={router.locale}>
        <a
          className={composeStyles([
            styles.navbar__link,
            { style: styles.navbar__linkActive, condition: isActive('me') },
          ])}
          href="/me"
        >
          {t('navigation.me')}
        </a>
      </Link>
      <LanguagePicker />
    </nav>
  )
}

export default Header
