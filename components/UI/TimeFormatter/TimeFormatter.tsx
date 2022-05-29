import { parseISO, format as applyFormat } from 'date-fns'

import enUsLocale from 'date-fns/locale/en-US'
import esLocale from 'date-fns/locale/es'

type Locale = keyof typeof LocaleDictionary
type DateFormatterProps = {
  dateString: string
  format: string
  locale?: string
}

const LocaleDictionary = {
  'en-US': enUsLocale,
  'es-ES': esLocale,
}

const DateFormatter = ({ dateString, format, locale }: DateFormatterProps) => {
  const date = parseISO(dateString)
  const options = locale ? { locale: LocaleDictionary[locale as Locale] } : {}
  return (
    <time dateTime={dateString}>
      {applyFormat(date, format, options).toUpperCase()}
    </time>
  )
}

export default DateFormatter
