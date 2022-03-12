import { usePrefersDarkMode } from "./usePrefersDarkMode"

// note that this needs to be manually kept in sync with `tailwind.config.js`
export const theme = {
  light: {
    mode: "light" as "light",
    screen: "#61B8E8",
    actionBackground: "#2F77A1",
    actionContent: "#EA9F86",
    card: "white",
    text: "#444",
    buttonText: "white",
    secondaryBackground: "white",
    secondaryContent: "#2F77A1",
    input: "#f5f5f5",
    destructive: "#E67474",
  },
  dark: {
    mode: "dark" as "dark",
    screen: "#194E6D",
    actionBackground: "#EA9F86",
    actionContent: "#194E6D",
    card: "#2F77A1",
    text: "white",
    buttonText: "#0a1e29",
    secondaryBackground: "#2F77A1",
    secondaryContent: "white",
    input: "#194E6D",
    destructive: "#EA8686",
  },
}

export function useTheme() {
  const darkMode = usePrefersDarkMode()

  return theme[darkMode ? "dark" : "light"]
}
