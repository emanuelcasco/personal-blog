import StackContainer from '@components/UI/Containers/StackContainer'
import AirDivider from '@components/UI/Dividers/AirDivider'
import Heading from '@components/UI/Heading'
import Glitch from '@components/UI/Glitch'
import { useTranslation } from '@i18n'

import styles from './NotFoundHero.css'

function NotFound() {
  const { t } = useTranslation('notFound')
  return (
    <StackContainer className={styles.content}>
      <Heading type="h1">
        <Glitch className={styles.title}>404.</Glitch>
        <span>Uups!</span>
      </Heading>
      <p>{t('description')}</p>
      <AirDivider />
    </StackContainer>
  )
}

export default NotFound
