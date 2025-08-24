import type { NextPage } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nApply, i18nPageContext, useTranslation, Trans } from '@i18n'
import Heading from '@components/UI/Heading'
import StackContainer from '@components/UI/Containers/StackContainer'
import AirDivider from '@components/UI/Dividers/AirDivider'
import FancyDivider from '@components/UI/Dividers/FancyDivider'
import SocialLinks from '@components/SocialLinks'

import styles from './me.css'
import { useCallback } from 'react'

const AnchorText = (props: {
  to?: string
  title?: string
  children?: string
}) => {
  return (
    <a
      href={props.to || '#'}
      title={props.title || ''}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  )
}

const AboutMePage: NextPage = () => {
  const { t } = useTranslation('me')

  const getItemsFromTranslation = useCallback(
    (key: string) => {
      return t(key, { returnObjects: true }) as string[]
    },
    [t]
  )

  // Experience data
  const waterplanDescription = getItemsFromTranslation(
    'experience.waterplan.description'
  )
  const waterplanTechnologies = getItemsFromTranslation(
    'experience.waterplan.technologies'
  )
  const woloxArchitectDescription = getItemsFromTranslation(
    'experience.wolox_architect.description'
  )
  const woloxArchitectTechnologies = getItemsFromTranslation(
    'experience.wolox_architect.technologies'
  )
  const woloxDeveloperDescription = getItemsFromTranslation(
    'experience.wolox_developer.description'
  )
  const woloxDeveloperTechnologies = getItemsFromTranslation(
    'experience.wolox_developer.technologies'
  )
  const woloxQaDescription = getItemsFromTranslation(
    'experience.wolox_qa.description'
  )
  const woloxQaTechnologies = getItemsFromTranslation(
    'experience.wolox_qa.technologies'
  )
  const freelanceDescription = getItemsFromTranslation(
    'experience.freelance.description'
  )
  const freelanceTechnologies = getItemsFromTranslation(
    'experience.freelance.technologies'
  )

  // Education data
  const educationDescription = getItemsFromTranslation(
    'education.utn.description'
  )

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
      </Head>

      <StackContainer tag="article" className={styles.aboutPage}>
        <AirDivider />

        {/* Header Section */}
        <StackContainer tag="section" className={styles.header}>
          <Heading type="h1">{t('header.title')}</Heading>
          <div className={styles.intro}>
            <Trans
              i18nKey="header.intro"
              components={{
                link1: (
                  <AnchorText
                    to="https://www.waterplan.com/"
                    title="Waterplan"
                  />
                ),
                strong: <strong />,
              }}
              t={t}
            />
          </div>
          <div className={styles.socialLinks}>
            <SocialLinks size={28} />
          </div>
        </StackContainer>

        <FancyDivider />

        {/* Experience Section */}
        <StackContainer tag="section">
          <Heading type="h2">{t('sections.experience')}</Heading>
          <div className={styles.experienceList}>
            {/* Waterplan Experience */}
            <div className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <Heading type="h3">{t('experience.waterplan.role')}</Heading>
                <span className={styles.company}>
                  {t('experience.waterplan.company')}
                </span>
                <span className={styles.period}>
                  {t('experience.waterplan.period')}
                </span>
              </div>
              <ul className={styles.description}>
                {waterplanDescription.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className={styles.technologies}>
                <strong>{t('sections.technologies')}</strong>
                <div className={styles.techTags}>
                  {waterplanTechnologies.map((tech: string, i: number) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Wolox Software Architect */}
            <div className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <Heading type="h3">
                  {t('experience.wolox_architect.role')}
                </Heading>
                <span className={styles.company}>
                  {t('experience.wolox_architect.company')}
                </span>
                <span className={styles.period}>
                  {t('experience.wolox_architect.period')}
                </span>
              </div>
              <ul className={styles.description}>
                {woloxArchitectDescription.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className={styles.technologies}>
                <strong>{t('sections.technologies')}</strong>
                <div className={styles.techTags}>
                  {woloxArchitectTechnologies.map((tech: string, i: number) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Wolox Software Developer */}
            <div className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <Heading type="h3">
                  {t('experience.wolox_developer.role')}
                </Heading>
                <span className={styles.company}>
                  {t('experience.wolox_developer.company')}
                </span>
                <span className={styles.period}>
                  {t('experience.wolox_developer.period')}
                </span>
              </div>
              <ul className={styles.description}>
                {woloxDeveloperDescription.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className={styles.technologies}>
                <strong>{t('sections.technologies')}</strong>
                <div className={styles.techTags}>
                  {woloxDeveloperTechnologies.map((tech: string, i: number) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Wolox QA Analyst */}
            <div className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <Heading type="h3">{t('experience.wolox_qa.role')}</Heading>
                <span className={styles.company}>
                  {t('experience.wolox_qa.company')}
                </span>
                <span className={styles.period}>
                  {t('experience.wolox_qa.period')}
                </span>
              </div>
              <ul className={styles.description}>
                {woloxQaDescription.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className={styles.technologies}>
                <strong>{t('sections.technologies')}</strong>
                <div className={styles.techTags}>
                  {woloxQaTechnologies.map((tech: string, i: number) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Freelance Experience */}
            <div className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <Heading type="h3">{t('experience.freelance.role')}</Heading>
                <span className={styles.company}>
                  {t('experience.freelance.company')}
                </span>
                <span className={styles.period}>
                  {t('experience.freelance.period')}
                </span>
              </div>
              <ul className={styles.description}>
                {freelanceDescription.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className={styles.technologies}>
                <strong>{t('sections.technologies')}</strong>
                <div className={styles.techTags}>
                  {freelanceTechnologies.map((tech: string, i: number) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </StackContainer>

        <AirDivider />

        {/* Education Section */}
        <StackContainer tag="section">
          <Heading type="h2">{t('sections.education')}</Heading>
          <div className={styles.educationList}>
            <div className={styles.educationItem}>
              <div className={styles.educationHeader}>
                <Heading type="h3">{t('education.utn.degree')}</Heading>
                <span className={styles.institution}>
                  {t('education.utn.institution')}
                </span>
                <span className={styles.period}>
                  {t('education.utn.period')}
                </span>
              </div>
              <ul className={styles.description}>
                {educationDescription.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        </StackContainer>
      </StackContainer>
    </>
  )
}

export async function getStaticProps(context: i18nPageContext) {
  return {
    props: {
      ...(await i18nApply(serverSideTranslations, context.locale, ['me'])),
    },
  }
}

export default AboutMePage
