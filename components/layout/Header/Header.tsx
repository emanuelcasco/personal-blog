import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LanguagePicker from '@components/UI/LanguagePicker'
import Glitch from '@components/UI/Glitch'
import { useTranslation } from '@i18n'
import useRandomRoleAndEmoji from '@hooks/useRandomRoleAndEmoji'

import styles from './Header.css'
import { composeStyles } from '@styles/theme'

function Header() {
  const router = useRouter()
  const random = useRandomRoleAndEmoji()
  const { t } = useTranslation('common')

  const isActive = (path: string) => {
    const base = router.pathname.split('/')[1] || 'home'
    return path === base
  }

  return (
    <header className={styles.header}>
      <Link href="/" locale={router.locale}>
        <figure className={styles.brand}>
          <Image
            loading="lazy"
            decoding="async"
            alt="Emanuel Casco Logo"
            src="/assets/logo.png"
            width="32px"
            height="32px"
            className={styles.brand__image}
          />
          <figcaption className={styles.brand__text}>
            <strong className={styles.brand__textName}>Emanuel Casco</strong>
            <p className={styles.brand__textRole}>
              <Glitch>{random.text}</Glitch>
            </p>
          </figcaption>
        </figure>
      </Link>
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
    </header>
  )
}

export default Header
