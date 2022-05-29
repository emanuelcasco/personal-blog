import { FunctionComponent } from 'react'

import Link from 'next/link'

import styles from './SocialLinks.css'
import GithubIcon from './Icons/GithubIcon'
import LinkedinIcon from './Icons/LinkedinIcon'
import MediumIcon from './Icons/MediumIcon'
import TwitterIcon from './Icons/TwitterIcon'

const SocialLinks: FunctionComponent<{ size: number }> = (props) => {
  const size = { height: props.size, width: props.size }
  return (
    <aside className={styles.social}>
      <Link href="https://github.com/emanuelcasco">
        <GithubIcon className={styles.social__link} {...size} />
      </Link>
      <Link href="https://emanuelcasco.medium.com/">
        <LinkedinIcon className={styles.social__link} {...size} />
      </Link>
      <Link href="https://www.linkedin.com/in/emanuelcasco/">
        <MediumIcon className={styles.social__link} {...size} />
      </Link>
      <Link href="https://twitter.com/Emanuel_Casco">
        <TwitterIcon className={styles.social__link} {...size} />
      </Link>
    </aside>
  )
}

export default SocialLinks
