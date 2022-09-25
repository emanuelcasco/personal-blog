import useDarkMode from '@hooks/useDarkMode'

import styles from './ThemePicker.css'

function ThemePicker() {
  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode()

  return (
    <button
      name="language-picker"
      className={styles.themePicker}
      onClick={() => {
        setDarkModeEnabled((state) => !state)
      }}
    >
      {darkModeEnabled ? '🌕' : '🌞'}
    </button>
  )
}

export default ThemePicker
