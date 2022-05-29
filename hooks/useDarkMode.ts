import { useEffect, useState } from 'react'

import useMediaQuery from '@hooks/useMediaQuery'

function useDarkMode() {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [darkModeEnabled, setDarkModeEnabled] = useState(systemPrefersDark)

  useEffect(() => {
    setDarkModeEnabled(systemPrefersDark)
  }, [systemPrefersDark])

  return [darkModeEnabled, setDarkModeEnabled]
}

export default useDarkMode
