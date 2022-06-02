import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'

import styles from './LanguagePicker.css'

function LanguagePicker() {
  const router = useRouter()

  const handleLocaleChange = (event: ChangeEvent<{ value: string }>) => {
    router.push(router.route, router.asPath, {
      locale: event.target.value,
    })
  }

  return (
    <select
      name="language-picker"
      className={styles.languagePicker}
      value={router.locale}
      onChange={handleLocaleChange}
    >
      <option
        key="es-ES"
        value="es-ES"
        className={styles.languagePicker__option}
      >
        🇪🇸 ESP
      </option>
      <option
        key="en-US"
        value="en-US"
        className={styles.languagePicker__option}
      >
        🇺🇸 ENG
      </option>
    </select>
  )
}

export default LanguagePicker
