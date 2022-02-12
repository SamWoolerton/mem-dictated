import { useState } from "@hookstate/core"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import globalState from "state"

export type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; verses: { verse: number; text: string }[] }

export default function usePassage() {
  let params = useParams<"passage">()
  const global = useState(globalState)
  const state = useState({ status: "loading" } as State)
  const s = state.get()

  const passages = global.passages.get()
  const passage = passages.find(p => p.id === params.passage)

  useEffect(() => {
    if (!passage) return

    fetch(`/kjv/${passage.book}_${passage.chapter}.json`)
      .then(res => res.json())
      .then((ls: { verse: string; text: string }[]) =>
        state.set({
          status: "loaded",
          verses: ls
            .map(v => ({
              verse: Number(v.verse),
              text: v.text,
            }))
            .filter(
              ({ verse }) =>
                verse >= passage.startVerse && verse <= passage.endVerse
            ),
        })
      )
      .catch(err => {
        console.error(err)
        state.set({ status: "error" })
      })
    // eslint-disable-next-line
  }, [])

  return { state: s, passage }
}
