import SocialLinks from '@components/SocialLinks'

import styles from './Footer.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        © 2019-{new Date().getFullYear()} Emanuel Casco. All rights reserved.
      </span>
      <span>
        <SocialLinks size={16} />
      </span>
    </footer>
  )
}

export default Footer
