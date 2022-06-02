import { ReactNode } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '@i18n'

import styles from './BackButton.css'

interface BackButtonProps {
  children?: ReactNode
}

function BackButton({ children }: BackButtonProps) {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <button className={styles.backButton} onClick={() => router.back()}>
      ← {children || t('navigation.back')}
    </button>
  )
}

export default BackButton
