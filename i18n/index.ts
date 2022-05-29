import type { serverSideTranslations as ServerSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextComponentType, NextPageContext } from 'next/types'

export { appWithTranslation, Trans } from 'next-i18next'
export { useTranslation } from 'react-i18next'

import { i18n } from '../next-i18next.config'

export type i18nConfig = typeof i18n

export type i18nPageContext<P = Record<string, never>> = NextPageContext &
  i18nConfig &
  P

export type I18nPage<P = Record<string, never>> = NextComponentType<
  NextPageContext,
  i18nConfig,
  P & i18nConfig
>

export const DEFAULT_NAMESPACES = ['common', '_error']

export const includeDefaultNamespaces = (namespaces: string[]) =>
  DEFAULT_NAMESPACES.concat(namespaces)

export const i18nApply = (
  serverSideTranslations: typeof ServerSideTranslations,
  initialLocale = i18n.defaultLocale,
  namespacesRequired: string[] = []
) =>
  serverSideTranslations(
    initialLocale,
    includeDefaultNamespaces(namespacesRequired)
  )
