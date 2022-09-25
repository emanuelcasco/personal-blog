import useMediaQuery from '@hooks/useMediaQuery'
import useLocalStorageState from '@hooks/useLocalStorage'

function useDarkMode() {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const state = useLocalStorageState<boolean>(
    'is-dark-mode-enabled',
    systemPrefersDark
  )

  // const [darkModeEnabled, setDarkModeEnabled] = state

  // useEffect(() => {
  //   setDarkModeEnabled(systemPrefersDark)
  // }, [setDarkModeEnabled, systemPrefersDark])

  return state
}

export default useDarkMode
