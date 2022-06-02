import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Glitch from '@components/UI/Glitch'
import Navbar from '@components/layout/Navbar'
import useRandomRoleAndEmoji from '@hooks/useRandomRoleAndEmoji'

import styles from './Header.css'

function Header() {
  const router = useRouter()
  const random = useRandomRoleAndEmoji()

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
      <Navbar />
    </header>
  )
}

export default Header
