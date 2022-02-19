import { useState } from "@hookstate/core"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import globalState from "state"

export type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; sections: ChapterSection[] }

export default function usePassage(): { state: State; passage?: Passage } {
  let params = useParams<"passage">()
  const global = useState(globalState)
  const state = useState({ status: "loading" } as State)
  const s = state.get()

  const passages = global.passages.get()
  const passage = passages.find(p => p.id === params.passage)

  useEffect(() => {
    if (!passage) return

    fetch(`/web_bible/${passage.book}_${passage.chapter}.json`)
      .then(res => res.json())
      .then((sections: ChapterSection[]) => {
        const { filtered } = sections.reduce(
          (acc, s) => {
            if (s.type === "paragraph text" || s.type === "line text") {
              acc.verse = s.verseNumber
            }
            if (
              acc.verse >= passage.startVerse &&
              acc.verse <= passage.endVerse
            )
              acc.filtered.push(s)
            return acc
          },
          { filtered: [] as ChapterSection[], verse: 0 }
        )

        state.set({
          status: "loaded",
          sections: filtered,
        })
      })
      .catch(err => {
        console.error(err)
        state.set({ status: "error" })
      })
    // eslint-disable-next-line
  }, [])

  return { state: s, passage }
}
