import SocialLinks from '@components/SocialLinks'
import Heading from '@components/UI/Heading'
import { useTranslation, Trans } from '@i18n'

import styles from './Introduction.css'
import StackContainer from '@components/UI/Containers/StackContainer'

const AnchorText = (props: {
  to?: string
  title?: string
  children?: string
}) => {
  return (
    <a
      href={props.to || '#'}
      title={props.title || ''}
      className={styles.introduction__link}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  )
}

const Paragraph = (props: { children?: string }) => {
  return <p>{props.children}</p>
}

function Introduction() {
  const { t } = useTranslation('home')
  return (
    <StackContainer tag="section">
      <span className={styles.introduction__greeting}>
        {t('introduction.greeting')}
      </span>
      <div className={styles.introduction__presentation}>
        <Heading type="h1">{t('introduction.name')}</Heading>
        <Trans
          i18nKey="introduction.presentation"
          components={{
            link1: (
              <AnchorText to="https://www.waterplan.com/" title="Waterplan" />
            ),
            link2: <AnchorText to="mailto:cascoemanuel@gmail.com" />,
            paragraph: <Paragraph />,
          }}
          t={t}
        />
        <SocialLinks size={24} />
      </div>
    </StackContainer>
  )
}

export default Introduction
