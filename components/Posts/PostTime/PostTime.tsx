import { useRouter } from 'next/router'

import TimeFormatter from '@components/UI/TimeFormatter'
import { Post } from '@entities'
import { useTranslation } from '@i18n'

import styles from './PostTime.css'

type PostTimeDataProps = Pick<Post, 'date' | 'readTime'> & {
  className?: string
}

const PostTimeData = ({ date, readTime, className }: PostTimeDataProps) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  const text = ` · ${readTime} ${t('blog.readingTime')}`
  return (
    <span className={className || styles.time}>
      <TimeFormatter locale={locale} format="LLLL	d, yyyy" dateString={date} />{' '}
      {text}
    </span>
  )
}

export default PostTimeData
