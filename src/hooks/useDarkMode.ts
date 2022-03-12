import { useEffect } from "react"

import { usePrefersDarkMode } from "./usePrefersDarkMode"

// adapted from https://usehooks.com/useDarkMode/
export function useDarkMode() {
  const prefersDarkMode = usePrefersDarkMode()

  useEffect(() => {
    const className = "dark"
    const element = window.document.body
    if (prefersDarkMode) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }, [prefersDarkMode])
}
