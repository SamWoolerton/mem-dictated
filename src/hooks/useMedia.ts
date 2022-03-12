import { useEffect, useState } from "react"

// from https://usehooks.com/useMedia/
export function useMedia<X>(queries: string[], values: X[], defaultValue: X) {
  const mediaQueryLists = queries.map(window.matchMedia)

  // Function that gets value based on matching media query
  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches)
    return values[index] ?? defaultValue
  }
  const [value, setValue] = useState(getValue)

  useEffect(
    () => {
      const handler = () => setValue(getValue)
      mediaQueryLists.forEach(mql => mql.addListener(handler))
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler))
    },
    // only run on mount and unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return value
}
