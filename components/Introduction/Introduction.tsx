import SocialLinks from '@components/SocialLinks'
import Avatar from '@components/UI/Avatar'
import FlexContainer from '@components/UI/Containers/FlexContainer'
import Heading from '@components/UI/Heading'
import { useTranslation, Trans } from '@i18n'

import styles from './Introduction.css'

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
    <FlexContainer tag="section">
      <div>
        <span className={styles.introduction__greeting}>
          {t('introduction.greeting')}
        </span>
        <Heading type="h1">{t('introduction.name')}</Heading>
      </div>
      <div className={styles.introduction__multimedia}>
        <Avatar />
        <SocialLinks size={24} />
      </div>
      <div className={styles.introduction__presentation}>
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
      </div>
    </FlexContainer>
  )
}

export default Introduction
