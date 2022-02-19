import usePassage from "./usePassage"

export type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; text: string }

export default function usePassageText(): { state: State; passage?: Passage } {
  const { state, passage } = usePassage()

  if (state.status !== "loaded") return { state, passage }

  const text = state.sections
    .map(s =>
      s.type === "paragraph text" || s.type === "line text" ? s.value : null
    )
    .filter(Boolean)
    .join("")

  return { state: { status: "loaded", text }, passage }
}
