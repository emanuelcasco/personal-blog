import { ReactNode } from 'react'
import { useRouter } from 'next/router'

import styles from './BackButton.css'
import { useTranslation } from '@i18n'

interface BackButtonProps {
  children?: ReactNode
}

function BackButton({ children }: BackButtonProps) {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <button className={styles.backButton} onClick={() => router.back()}>
      ⏪ {children || t('navigation.back')}
    </button>
  )
}

export default BackButton
