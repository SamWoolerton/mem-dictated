import { useMedia } from "./useMedia"

export function usePrefersDarkMode() {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false)
}
